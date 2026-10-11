import { safeFilePath } from './zip.js';

const allowedConfigKeys = new Set(['schemaVersion', 'name', 'countryCode', 'country', 'city', 'language', 'accent', 'mission', 'status']);
const textLimits = { name: [3, 100], country: [2, 80], city: [2, 100], mission: [10, 600] };

export function validateConfig(config) {
  const errors = [];
  if (!config || typeof config !== 'object' || Array.isArray(config)) return ['Configuration must be an object.'];
  for (const key of Object.keys(config)) if (!allowedConfigKeys.has(key)) errors.push(`Unknown configuration field: ${key}`);
  if (config.schemaVersion !== '1.0.0') errors.push('schemaVersion must be 1.0.0.');
  for (const [key, [min, max]] of Object.entries(textLimits)) {
    const value = config[key];
    if (typeof value !== 'string' || [...value.trim()].length < min || [...value].length > max || /[\u0000-\u001f\u007f<>]/.test(value)) errors.push(`${key} must contain ${min}–${max} plain text characters.`);
  }
  if (typeof config.countryCode !== 'string' || !/^[A-Z]{2}$/.test(config.countryCode)) errors.push('countryCode must be a two-letter uppercase country code.');
  if (!['nl', 'en'].includes(config.language)) errors.push('language must be nl or en.');
  if (typeof config.accent !== 'string' || !/^#[0-9a-fA-F]{6}$/.test(config.accent)) errors.push('accent must be a six-digit hexadecimal color.');
  if (config.status !== 'draft') errors.push('A new chapter must have status draft.');
  return errors;
}

function localId(config) {
  const slug = config.name.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60).replace(/-$/g, '') || 'embassy';
  return `${config.countryCode.toLowerCase()}-${slug}`;
}

function forbiddenSourcePath(path) {
  const segments = path.split('/');
  return segments.some(segment => segment.startsWith('.') && segment !== '.github' && segment !== '.gitignore') ||
    segments.some(segment => /^(credentials?|secrets?|tokens?|service[-_]account)([._-]|$)/i.test(segment)) ||
    segments.some(segment => ['node_modules', 'downloads', 'coverage'].includes(segment)) ||
    /(^|\/)source-template\.json$/.test(path) || /(?:\.pem|\.key|\.p12|\.pfx|\.sqlite|\.db)$/i.test(path);
}

export function createStarterFiles(template, config) {
  const errors = validateConfig(config);
  if (errors.length) throw new Error(errors.join('\n'));
  if (!template?.files || typeof template.files !== 'object' || Array.isArray(template.files)) throw new Error('A source template with text files is required.');
  const files = Object.create(null);
  for (const [path, content] of Object.entries(template.files)) {
    if (!safeFilePath(path)) throw new Error(`Unsafe source template path: ${path}`);
    if (forbiddenSourcePath(path)) continue;
    if (typeof content !== 'string') throw new Error(`Source template file must be text: ${path}`);
    files[path] = content;
  }
  for (const path of ['package.json', 'dist/index.html', 'dist/app.js', 'dist/lib/kit.js', 'scripts/build.mjs']) {
    if (!(path in files)) throw new Error(`Incomplete source template: ${path}`);
  }
  files['dist/data/config.json'] = JSON.stringify(config, null, 2) + '\n';
  files['dist/data/registry.json'] = JSON.stringify({
    schemaVersion: '1.0.0', updatedAt: new Date().toISOString().slice(0, 10),
    chapters: [{ id: localId(config), countryCode: config.countryCode,
      country: { nl: config.country, en: config.country }, name: config.name,
      city: config.city, status: 'draft', languages: [config.language],
      summary: { nl: config.mission, en: config.mission }, website: null,
      source: null, coordinates: null }]
  }, null, 2) + '\n';
  if (files['dist/data/manifest.json']) {
    const manifest = JSON.parse(files['dist/data/manifest.json']);
    manifest.name = config.name;
    manifest.updatedAt = new Date().toISOString().slice(0, 10);
    manifest.integrity = {};
    manifest.stats = { ...manifest.stats, chapters: 1, sourceRecords: 0, demoTemplates: 0 };
    files['dist/data/manifest.json'] = JSON.stringify(manifest, null, 2) + '\n';
  }
  files['README.local.md'] = `# Local chapter\n\nThis installation is an independent draft chapter. Its configuration is in dist/data/config.json. It has no network membership or endorsement.\n\n1. Install Node.js 22 or later.\n2. Run npm run build.\n3. Run npm test.\n4. Run npm start and open http://127.0.0.1:4173.\n5. Translate your country name and mission in dist/data/registry.json before publication.\n6. Edit your local content and review its sources, rights, and language.\n7. Deploy the contents of dist/ to any static host.\n\nThe registry contains only this local draft. Publish confirmed contact details only after permission.\n`;
  return files;
}

export function resourceMarkdown(resource, lang = 'en') {
  if (!['nl', 'en'].includes(lang)) throw new Error('Language must be nl or en.');
  if (!resource?.title?.[lang] || !Array.isArray(resource.sections) || !Array.isArray(resource.checklist?.[lang])) throw new Error('Incomplete resource.');
  const lines = [`# ${resource.title[lang]}`, '', resource.summary[lang], '', `${lang === 'nl' ? 'Duur' : 'Duration'}: ${resource.durationMinutes} min · ${resource.level}`, ''];
  for (const section of resource.sections) lines.push(`## ${section.title[lang]}`, '', ...section.paragraphs[lang].flatMap(paragraph => [paragraph, '']));
  lines.push(`## ${lang === 'nl' ? 'Checklist' : 'Checklist'}`, '', ...resource.checklist[lang].map(item => `- [ ] ${item}`), '', '---', '', '© 2026 Embassy Commons contributors · CC BY 4.0', 'https://creativecommons.org/licenses/by/4.0/', '', 'Adapted versions must credit Embassy Commons, link the license, and indicate changes.', '');
  return lines.join('\n');
}
