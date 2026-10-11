import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateConfig } from '../dist/lib/kit.js';

export const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
export const datasetNames = ['config', 'registry', 'resources', 'dbe-public', 'manifest'];
const own = (object, key) => Object.hasOwn(object, key);

// Implements exactly the JSON Schema keywords used by our checked-in schemas.
// Unsupported keywords cannot silently weaken a check: schema fixtures assert
// the supported keyword inventory in tests.
export function validateSchema(value, schema, path = '$') {
  const errors = [];
  if (schema === false) return [`${path}: value is not allowed`];
  if (schema === true) return errors;
  if (schema.anyOf && !schema.anyOf.some(choice => validateSchema(value, choice, path).length === 0)) return [`${path}: does not match any allowed shape`];
  if (own(schema, 'const') && value !== schema.const) errors.push(`${path}: must equal ${JSON.stringify(schema.const)}`);
  if (schema.enum && !schema.enum.includes(value)) errors.push(`${path}: unsupported value`);
  if (schema.type) {
    const matches = schema.type === 'null' ? value === null : schema.type === 'array' ? Array.isArray(value) : schema.type === 'object' ? value !== null && typeof value === 'object' && !Array.isArray(value) : schema.type === 'integer' ? Number.isInteger(value) : typeof value === schema.type;
    if (!matches) return [...errors, `${path}: expected ${schema.type}`];
  }
  if (typeof value === 'string') {
    if (schema.minLength !== undefined && [...value].length < schema.minLength) errors.push(`${path}: text is too short`);
    if (schema.maxLength !== undefined && [...value].length > schema.maxLength) errors.push(`${path}: text is too long`);
    if (schema.pattern && !new RegExp(schema.pattern, 'u').test(value)) errors.push(`${path}: does not match the required format`);
    if (schema.format === 'date' && (!/^\d{4}-\d{2}-\d{2}$/.test(value) || Number.isNaN(Date.parse(value)) || new Date(value).toISOString().slice(0, 10) !== value)) errors.push(`${path}: invalid calendar date`);
    if (schema.format === 'uri') {
      try { const uri = new URL(value); if (!['https:', 'http:'].includes(uri.protocol) || uri.username || uri.password) throw new Error(); }
      catch { errors.push(`${path}: expected an HTTP(S) URL without credentials`); }
    }
  }
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) errors.push(`${path}: expected a finite number`);
    if (schema.minimum !== undefined && value < schema.minimum) errors.push(`${path}: below minimum`);
    if (schema.maximum !== undefined && value > schema.maximum) errors.push(`${path}: above maximum`);
  }
  if (Array.isArray(value)) {
    if (schema.minItems !== undefined && value.length < schema.minItems) errors.push(`${path}: too few items`);
    if (schema.maxItems !== undefined && value.length > schema.maxItems) errors.push(`${path}: too many items`);
    value.forEach((item, index) => {
      const definition = schema.prefixItems?.[index] ?? schema.items;
      if (definition !== undefined) errors.push(...validateSchema(item, definition, `${path}[${index}]`));
    });
  }
  if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
    for (const key of schema.required ?? []) if (!own(value, key)) errors.push(`${path}.${key}: required field is missing`);
    for (const [key, item] of Object.entries(value)) {
      if (schema.properties && own(schema.properties, key)) errors.push(...validateSchema(item, schema.properties[key], `${path}.${key}`));
      else if (schema.additionalProperties === false) errors.push(`${path}.${key}: unknown field`);
      else if (schema.additionalProperties && typeof schema.additionalProperties === 'object') errors.push(...validateSchema(item, schema.additionalProperties, `${path}.${key}`));
    }
  }
  return errors;
}

function duplicateErrors(items, field, label) {
  if (!Array.isArray(items)) return [];
  const seen = new Set(), errors = [];
  for (const item of items) {
    const value = field ? item?.[field] : item;
    if (seen.has(value)) errors.push(`${label}: duplicate ${field ?? 'value'} ${value}`);
    seen.add(value);
  }
  return errors;
}

export function validateRelations(data) {
  const errors = [], chapters = data.registry?.chapters, resources = data.resources?.resources;
  errors.push(...validateConfig(data.config));
  errors.push(...duplicateErrors(chapters, 'id', 'registry'), ...duplicateErrors(resources, 'id', 'resources'));
  const reference = data['dbe-public'];
  if (reference) {
    errors.push(...duplicateErrors(reference.circles, 'id', 'dbe-public.circles'), ...duplicateErrors(reference.events, 'id', 'dbe-public.events'));
    if (reference.source?.url !== reference.organization?.website) errors.push('dbe-public: organization website must match the cited official source');
    if (!/externally sourced public facts/i.test(reference.source?.rights ?? '')) errors.push('dbe-public: source rights must distinguish external public facts');
    for (const event of reference.events ?? []) {
      if (event.status !== 'past' || event.date >= reference.source.accessedAt) errors.push(`dbe-public.${event.id}: a past event must precede the source access date`);
    }
  }
  for (const chapter of chapters ?? []) {
    errors.push(...duplicateErrors(chapter.languages, null, chapter.id));
    if (chapter.status === 'source' && (!chapter.website || !chapter.source?.url || !chapter.coordinates)) errors.push(`${chapter.id}: source record requires a website, source URL and city coordinates`);
    if (chapter.status === 'template' && (chapter.website !== null || chapter.source?.url !== null || !/demo/i.test(chapter.source?.rights ?? ''))) errors.push(`${chapter.id}: demonstration template must have no website and explicit demo rights`);
    if (chapter.status === 'draft' && (chapter.source !== null || chapter.website !== null)) errors.push(`${chapter.id}: draft record must not assert a public source or website`);
  }
  if (data.manifest?.licenses?.code?.id !== 'MIT') errors.push('manifest: source code license must be MIT');
  if (data.manifest?.licenses?.originalContent?.id !== 'CC-BY-4.0') errors.push('manifest: original content license must be CC-BY-4.0');
  if (data.manifest?.licenses?.originalData?.id !== 'CC0-1.0') errors.push('manifest: original demonstration data license must be CC0-1.0');
  if (data.manifest?.stats && chapters && resources) {
    const expected = { chapters: chapters.length, resources: resources.length,
      sourceRecords: chapters.filter(chapter => chapter.status === 'source').length,
      demoTemplates: chapters.filter(chapter => chapter.status === 'template').length };
    for (const [key, count] of Object.entries(expected)) if (data.manifest.stats[key] !== count) errors.push(`manifest.stats.${key}: expected ${count}`);
  }
  if (chapters?.filter(chapter => chapter.status === 'draft').length === 1 && chapters.length === 1) {
    const chapter = chapters[0];
    if (chapter.countryCode !== data.config.countryCode || chapter.name !== data.config.name || chapter.city !== data.config.city) errors.push('local draft registry must match the configuration');
  }
  return errors;
}

export async function readProjectData(root = projectRoot) {
  const pairs = await Promise.all(datasetNames.map(async name => [name, JSON.parse(await readFile(resolve(root, `dist/data/${name}.json`), 'utf8'))]));
  return Object.fromEntries(pairs);
}

export async function validateProject(root = projectRoot, { checkIntegrity = true } = {}) {
  const errors = [], data = await readProjectData(root);
  const schemas = await Promise.all(datasetNames.map(async name => JSON.parse(await readFile(resolve(root, `schema/${name}.schema.json`), 'utf8'))));
  datasetNames.forEach((name, index) => errors.push(...validateSchema(data[name], schemas[index], name)));
  if (errors.length) return errors;
  errors.push(...validateRelations(data));
  for (const [name, relative] of Object.entries(data.manifest.endpoints ?? {})) {
    if (['sourceTemplate', 'sourceArchive'].includes(name)) continue;
    if (relative !== `data/${name}.json`) errors.push(`manifest.endpoints.${name}: expected data/${name}.json`);
  }
  for (const [name, relative] of Object.entries(data.manifest.schemas ?? {})) if (relative !== `schema/${name}.schema.json`) errors.push(`manifest.schemas.${name}: expected matching schema path`);
  if (checkIntegrity) for (const [relative, digest] of Object.entries(data.manifest.integrity ?? {})) {
    if (!/^data\/(config|registry|resources|dbe-public)\.json$/.test(relative)) { errors.push(`integrity: unsupported path ${relative}`); continue; }
    const actual = createHash('sha256').update(await readFile(resolve(root, 'dist', relative))).digest('hex');
    if (actual !== digest) errors.push(`integrity: ${relative} SHA-256 mismatch; run npm run build`);
  }
  return errors;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const errors = await validateProject();
    if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
    else console.log('Configuration, multilingual content, registry relations and manifest integrity are valid.');
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
