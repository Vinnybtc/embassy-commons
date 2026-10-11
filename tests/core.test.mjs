import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { zipFiles, crc32 } from '../dist/lib/zip.js';
import { createStarterFiles, resourceMarkdown, validateConfig } from '../dist/lib/kit.js';
import { includeSourceFile } from '../scripts/build.mjs';
import { projectRoot, readProjectData, validateRelations, validateSchema, datasetNames } from '../scripts/validate.mjs';

const config = { schemaVersion: '1.0.0', name: 'Lisbon Bitcoin Community', countryCode: 'PT', country: 'Portugal', city: 'Lisbon', language: 'en', accent: '#f7931a', mission: 'Independent education and a welcoming local community.', status: 'draft' };
function template() {
  return { files: { 'package.json': '{}', 'dist/index.html': '<html></html>', 'dist/app.js': '// source', 'dist/lib/kit.js': '// source', 'scripts/build.mjs': '// source', 'docs/API.md': '# API', '.gitignore': 'node_modules', '.github/workflows/check.yml': 'name: checks', '.openai/project.json': 'PRIVATE ID', '.env': 'SECRET', 'docs/credentials.json': 'SECRET', 'dist/downloads/archive.zip': 'STALE', 'dist/source-template.json': 'RECURSIVE' } };
}

test('CRC-32 matches a standard known vector', () => {
  assert.equal(crc32(new TextEncoder().encode('123456789')), 0xcbf43926);
  assert.equal(crc32(new Uint8Array()), 0);
});

test('ZIP preserves Unicode bytes, checksums, offsets and is reproducible', () => {
  const files = { 'z.txt': '', 'docs/日本語.md': 'São Paulo — onderwijs', 'config.json': '{"ok":true}' };
  const bytes = zipFiles(files), view = new DataView(bytes.buffer);
  assert.deepEqual(bytes, zipFiles(files));
  const decoded = {}, decoder = new TextDecoder();
  let offset = 0;
  while (view.getUint32(offset, true) === 0x04034b50) {
    assert.equal(view.getUint16(offset + 6, true), 0x0800);
    assert.equal(view.getUint16(offset + 8, true), 0);
    const size = view.getUint32(offset + 18, true), nameLength = view.getUint16(offset + 26, true);
    const name = decoder.decode(bytes.slice(offset + 30, offset + 30 + nameLength));
    const data = bytes.slice(offset + 30 + nameLength, offset + 30 + nameLength + size);
    assert.equal(crc32(data), view.getUint32(offset + 14, true));
    decoded[name] = decoder.decode(data);
    offset += 30 + nameLength + size;
  }
  assert.deepEqual(decoded, files);
  const centralStart = offset;
  for (const expected of Object.keys(files).sort((a, b) => a.localeCompare(b))) {
    assert.equal(view.getUint32(offset, true), 0x02014b50);
    const length = view.getUint16(offset + 28, true);
    const name = decoder.decode(bytes.slice(offset + 46, offset + 46 + length));
    assert.equal(name, expected);
    assert.equal(view.getUint32(view.getUint32(offset + 42, true), true), 0x04034b50);
    offset += 46 + length;
  }
  assert.equal(view.getUint32(offset, true), 0x06054b50);
  assert.equal(view.getUint16(offset + 10, true), 3);
  assert.equal(view.getUint32(offset + 16, true), centralStart);
  assert.equal(bytes.length, offset + 22);
});

test('ZIP rejects unsafe paths and non-text entries', () => {
  for (const path of ['../escape', '/absolute', 'C:/absolute', 'a\\b', 'a/../b', 'a//b', './a', 'a\0b']) assert.throws(() => zipFiles({ [path]: 'text' }), /Unsafe ZIP path/);
  assert.throws(() => zipFiles({ 'ok.txt': new Uint8Array() }), /must be text/);
});

test('configuration validates text, status, version, color and language', () => {
  assert.deepEqual(validateConfig(config), []);
  for (const [field, invalid] of Object.entries({ name: '<script>alert(1)</script>', countryCode: '../', language: 'de', accent: 'url(javascript:alert(1))', mission: 'short', status: 'verified', schemaVersion: '2.0.0' })) assert.ok(validateConfig({ ...config, [field]: invalid }).length, field);
  assert.ok(validateConfig({ ...config, privateKey: 'unnecessary' }).length);
  assert.ok(validateConfig({ ...config, countryCode: ['PT'] }).length);
  assert.ok(validateConfig({ ...config, accent: ['#f7931a'] }).length);
  assert.ok(validateConfig(null).length);
});

test('country starter contains only local draft and removes private identity and stale builds', () => {
  const source = template();
  const files = createStarterFiles(source, { ...config, name: '../../My Independent Embassy' });
  const registry = JSON.parse(files['dist/data/registry.json']);
  assert.equal(registry.chapters.length, 1);
  assert.equal(registry.chapters[0].status, 'draft');
  assert.equal(registry.chapters[0].countryCode, 'PT');
  assert.equal(registry.chapters[0].coordinates, null);
  assert.match(registry.chapters[0].id, /^pt-[a-z0-9-]+$/);
  assert.ok(files['README.local.md']);
  assert.ok(files['.github/workflows/check.yml']);
  for (const path of ['.openai/project.json', '.env', 'docs/credentials.json', 'dist/source-template.json', 'dist/downloads/archive.zip']) assert.equal(files[path], undefined, path);
  assert.equal(source.files['.openai/project.json'], 'PRIVATE ID', 'input template is unchanged');
});

test('country starter rejects malicious template paths and incomplete source', () => {
  for (const path of ['../outside', '/outside', 'C:/outside', 'dist/../outside']) assert.throws(() => createStarterFiles({ files: { ...template().files, [path]: 'attack' } }, config), /Unsafe source template/);
  assert.throws(() => createStarterFiles({ files: { 'package.json': '{}' } }, config), /Incomplete source template/);
});

test('source packaging permits canonical public files and excludes identity, secrets and generated copies', () => {
  for (const path of ['README.md', 'CONTENT-LICENSE.md', 'DATA-LICENSE.md', 'SECURITY.md', 'CONTRIBUTING.md', 'CODE_OF_CONDUCT.md', 'docs/API.md', 'dist/data/resources.json', 'schema/config.schema.json', 'tests/core.test.mjs']) assert.equal(includeSourceFile(path), true, path);
  for (const path of ['.openai/project.json', '.env', 'credentials.json', 'docs/credentials.json', 'dist/data/secrets.json', 'dist/source-template.json', 'dist/docs/API.md', 'dist/schema/config.schema.json', 'dist/downloads/x.zip', 'node_modules/x.json', 'work/private.md']) assert.equal(includeSourceFile(path), false, path);
});

test('public data is fully multilingual, licensed and meets published schemas and relations', async () => {
  const data = await readProjectData();
  for (const name of datasetNames) {
    const schema = JSON.parse(await readFile(resolve(projectRoot, `schema/${name}.schema.json`), 'utf8'));
    assert.deepEqual(validateSchema(data[name], schema), [], name);
  }
  assert.deepEqual(validateRelations(data), []);
  assert.equal(data.resources.resources.length, 8);
  for (const resource of data.resources.resources) {
    for (const language of ['nl', 'en']) {
      const markdown = resourceMarkdown(resource, language);
      assert.ok(markdown.startsWith(`# ${resource.title[language]}`));
      assert.match(markdown, /CC BY 4.0/);
      assert.match(markdown, /- \[ \]/);
    }
  }
  assert.throws(() => resourceMarkdown(data.resources.resources[0], 'fr'), /Language/);
});

test('validation catches duplicate records, false template links and manifest count drift', async () => {
  const data = await readProjectData();
  data.registry.chapters.push({ ...data.registry.chapters[0] });
  assert.ok(validateRelations(data).some(error => error.includes('duplicate')));
  data.registry.chapters.push({ ...data.registry.chapters[0], id: 'demo-relation-test', status: 'template', website: 'https://example.com', source: { url: null, accessedAt: data.registry.updatedAt, rights: 'Original demo, CC0-1.0' } });
  assert.ok(validateRelations(data).some(error => error.includes('demonstration template')));
  assert.ok(validateRelations(data).some(error => error.includes('manifest.stats')));
});

test('schema checker catches real date, coordinate, bounds, required and unknown-property errors', async () => {
  const schema = JSON.parse(await readFile(resolve(projectRoot, 'schema/registry.schema.json'), 'utf8'));
  const { registry } = await readProjectData();
  const changed = structuredClone(registry);
  changed.updatedAt = '2026-02-30';
  changed.chapters[0].coordinates = [181, 91];
  delete changed.chapters[0].summary.en;
  changed.chapters[0].privateKey = 'forbidden';
  const errors = validateSchema(changed, schema);
  for (const expected of ['calendar date', 'allowed shape', '.summary.en', 'unknown field']) assert.ok(errors.some(error => error.includes(expected)), expected);
  assert.ok(validateSchema(181, { type: 'number', maximum: 180 }).some(error => error.includes('above maximum')));
});

test('all schema validation keywords are implemented by the minimal validator', async () => {
  const keywords = new Set(['$schema', 'title', 'description', 'type', 'additionalProperties', 'properties', 'required', 'items', 'prefixItems', 'minItems', 'maxItems', 'minLength', 'maxLength', 'minimum', 'maximum', 'const', 'enum', 'pattern', 'format', 'anyOf']);
  function visit(schema) {
    if (typeof schema !== 'object' || schema === null) return;
    for (const key of Object.keys(schema)) assert.ok(keywords.has(key), `Unsupported schema keyword: ${key}`);
    for (const entry of Object.values(schema.properties ?? {})) visit(entry);
    for (const key of ['items', 'additionalProperties']) visit(schema[key]);
    for (const entry of [...(schema.anyOf ?? []), ...(schema.prefixItems ?? [])]) visit(entry);
  }
  for (const name of datasetNames) visit(JSON.parse(await readFile(resolve(projectRoot, `schema/${name}.schema.json`), 'utf8')));
});
