import { readFile, writeFile, readdir, mkdir, copyFile, rm } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve, relative, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { zipFiles } from '../dist/lib/zip.js';
import { buildPublicIntroduction } from './build-introduction.mjs';
import { isCommonsPublisher } from '../dist/lib/publisher.js';
import { projectRoot, readProjectData, validateSchema, validateRelations, datasetNames } from './validate.mjs';

const allowedRootFiles = new Set(['README.md', 'README.local.md', 'LICENSE', 'CONTENT-LICENSE.md', 'DATA-LICENSE.md', 'SECURITY.md', 'CONTRIBUTING.md', 'CODE_OF_CONDUCT.md', 'NOTICE', 'package.json', 'CITATION.cff', 'Dockerfile', 'compose.yaml', '.gitignore']);
const allowedRoots = new Set(['dist', 'scripts', 'schema', 'tests', 'docs', 'introduction', '.github']);
const textExtensions = new Set(['.html', '.js', '.mjs', '.css', '.json', '.md', '.svg', '.txt', '.yml', '.yaml', '.cff']);

export function includeSourceFile(path) {
  const segments = path.split('/');
  if (segments.length === 1) return allowedRootFiles.has(path);
  if (!allowedRoots.has(segments[0])) return false;
  if (segments.some(part => ['node_modules', 'downloads', 'coverage', '.openai', '.git'].includes(part))) return false;
  if (segments.some(part => part.startsWith('.') && part !== '.github')) return false;
  if (segments.some(part => /^(credentials?|secrets?|tokens?|service[-_]account)([._-]|$)/i.test(part))) return false;
  if (path === 'dist/source-template.json' || path.startsWith('dist/docs/') || path.startsWith('dist/schema/') || path.startsWith('dist/public-introduction/')) return false;
  const extension = path.slice(path.lastIndexOf('.')).toLowerCase();
  return textExtensions.has(extension);
}

async function walk(root, current = root) {
  const paths = [];
  for (const entry of await readdir(current, { withFileTypes: true })) {
    const absolute = join(current, entry.name), path = relative(root, absolute).split('\\').join('/');
    if (entry.isSymbolicLink()) continue;
    if (entry.isDirectory()) {
      const segments = path.split('/');
      if (segments.length === 1 && !allowedRoots.has(entry.name)) continue;
      if (segments.some(part => ['node_modules', 'downloads', 'coverage', '.openai', '.git'].includes(part))) continue;
      if (path === 'dist/docs' || path === 'dist/schema' || path === 'dist/public-introduction') continue;
      paths.push(...await walk(root, absolute));
    } else if (entry.isFile() && includeSourceFile(path)) paths.push(path);
  }
  return paths.sort();
}

async function copyPublicDirectory(root, directory) {
  const targetRoot = resolve(root, 'dist', directory);
  await rm(targetRoot, { recursive: true, force: true });
  await mkdir(targetRoot, { recursive: true });
  const sourceRoot = resolve(root, directory);
  async function copy(current) {
    for (const entry of await readdir(current, { withFileTypes: true })) {
      const source = join(current, entry.name);
      if (entry.isSymbolicLink()) continue;
      if (entry.isDirectory()) await copy(source);
      else if (entry.isFile() && includeSourceFile(relative(root, source).split('\\').join('/'))) {
        const target = resolve(targetRoot, relative(sourceRoot, source));
        await mkdir(resolve(target, '..'), { recursive: true });
        await copyFile(source, target);
      }
    }
  }
  await copy(sourceRoot);
}

export async function buildProject(root = projectRoot) {
  const data = await readProjectData(root), errors = [];
  data.manifest.name = data.config.name;
  data.manifest.stats = {
    chapters: data.registry.chapters?.length ?? 0,
    resources: data.resources.resources?.length ?? 0,
    sourceRecords: data.registry.chapters?.filter(item => item?.status === 'source').length ?? 0,
    demoTemplates: data.registry.chapters?.filter(item => item?.status === 'template').length ?? 0
  };
  for (const name of datasetNames) {
    const schema = JSON.parse(await readFile(resolve(root, `schema/${name}.schema.json`), 'utf8'));
    errors.push(...validateSchema(data[name], schema, name));
  }
  if (errors.length) throw new Error(errors.join('\n'));
  errors.push(...validateRelations(data));
  if (errors.length) throw new Error(errors.join('\n'));
  data.manifest.integrity = {};
  for (const name of ['config', 'registry', 'resources', 'dbe-public']) {
    data.manifest.integrity[`data/${name}.json`] = createHash('sha256').update(await readFile(resolve(root, `dist/data/${name}.json`))).digest('hex');
  }
  await writeFile(resolve(root, 'dist/data/manifest.json'), JSON.stringify(data.manifest, null, 2) + '\n');
  await copyPublicDirectory(root, 'docs');
  await copyPublicDirectory(root, 'schema');
  if (isCommonsPublisher(data.config,data.registry)) await buildPublicIntroduction(root);
  else await rm(resolve(root, 'dist/public-introduction'), {recursive:true, force:true});
  const files = Object.create(null);
  for (const path of await walk(root)) {
    const bytes = await readFile(resolve(root, path));
    if (bytes.includes(0) || bytes.length > 5 * 1024 * 1024) throw new Error(`Source file is binary or unexpectedly large: ${path}`);
    files[path] = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
  }
  for (const path of ['dist/index.html', 'dist/app.js', 'dist/styles.css', 'README.md', 'package.json']) if (!(path in files)) throw new Error(`Source is incomplete: ${path}`);
  const template = { schemaVersion: '1.0.0', version: data.manifest.version, licenses: data.manifest.licenses, files };
  await writeFile(resolve(root, 'dist/source-template.json'), JSON.stringify(template));
  await mkdir(resolve(root, 'dist/downloads'), { recursive: true });
  const archive = zipFiles(files);
  await writeFile(resolve(root, 'dist/downloads/embassy-commons.zip'), archive);
  return { sourceFiles: Object.keys(files).length, archiveBytes: archive.length, chapters: data.registry.chapters.length, resources: data.resources.resources.length };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { console.log('Build complete:', JSON.stringify(await buildProject())); }
  catch (error) { console.error(error.message); process.exitCode = 1; }
}
