import { readFile, writeFile, mkdir, lstat, rm } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createStarterFiles } from '../dist/lib/kit.js';
import { buildProject } from './build.mjs';
import { projectRoot } from './validate.mjs';

export async function createEmbassy(configPath, outputPath, root = projectRoot) {
  const output = resolve(outputPath);
  try { await lstat(output); throw new Error('Output already exists. Choose a new directory; existing files are never overwritten.'); }
  catch (error) { if (error.code !== 'ENOENT') throw error; }
  const config = JSON.parse(await readFile(resolve(configPath), 'utf8'));
  await buildProject(root);
  const template = JSON.parse(await readFile(resolve(root, 'dist/source-template.json'), 'utf8'));
  const files = createStarterFiles(template, config);
  // Reserve the output directory atomically to avoid a check-then-write race.
  await mkdir(dirname(output), { recursive: true });
  await mkdir(output);
  try {
    for (const [path, content] of Object.entries(files)) {
      const target = resolve(output, path);
      await mkdir(dirname(target), { recursive: true });
      await writeFile(target, content, { flag: 'wx' });
    }
  } catch (error) { await rm(output, { recursive: true, force: true }); throw error; }
  return { output, files: Object.keys(files).length };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2), options = {};
  let invalid = args.length !== 4;
  for (let index = 0; index < args.length; index += 2) {
    if (!['--config', '--out'].includes(args[index]) || !args[index + 1] || options[args[index]]) invalid = true;
    options[args[index]] = args[index + 1];
  }
  if (invalid || !options['--config'] || !options['--out']) { console.error('Usage: npm run create -- --config path/config.json --out path/new-chapter'); process.exitCode = 1; }
  else {
    try { console.log('Created independent draft chapter:', JSON.stringify(await createEmbassy(options['--config'], options['--out']))); }
    catch (error) { console.error(error.message); process.exitCode = 1; }
  }
}
