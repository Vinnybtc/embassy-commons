import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, readdir, rm, mkdir, copyFile, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { once } from 'node:events';
import { createStaticServer } from '../scripts/serve.mjs';
import { buildPublicIntroduction } from '../scripts/build-introduction.mjs';
import { projectRoot } from '../scripts/validate.mjs';

test('public introduction is a separate build without toolkit data or source archives', async () => {
  const fixture=await mkdtemp(resolve(tmpdir(),'commons-intro-fixture-'));
  const sources=['introduction/index.html','introduction/app.js',...['styles.css','fonts.css','brand.js','icon.svg','commons-entry.js','lib/introduction.js',...['Schibsted-OFL.txt','SourceSerif-OFL.txt','JetBrainsMono-OFL.txt'].map(name=>'font-licenses/'+name)].map(name=>'dist/'+name)];
  for(const path of sources){const target=resolve(fixture,path);await mkdir(resolve(target,'..'),{recursive:true});await copyFile(resolve(projectRoot,path),target);}
  await mkdir(resolve(fixture,'dist/data'),{recursive:true});await writeFile(resolve(fixture,'dist/data/resources.json'),'PRIVATE FIXTURE');
  const result=await buildPublicIntroduction(fixture);
  async function list(path,prefix='') { const found=[];for(const entry of await readdir(path,{withFileTypes:true})){const name=prefix+entry.name;if(entry.isDirectory())found.push(...await list(resolve(path,entry.name),name+'/'));else found.push(name);}return found; }
  const paths=await list(result.directory);
  assert.deepEqual(paths.sort(),result.files.slice().sort());
  assert.ok(paths.includes('lib/introduction.js'));
  assert.ok(!paths.some(path=>/\.json$|\.zip$|(^|\/)data\/|source-template|\.openai/.test(path)));
  const app=await readFile(resolve(result.directory,'app.js'),'utf8');
  assert.ok(!/\bfetch\s*\(/.test(app),'public entry must not load toolkit data');
  const server=createStaticServer(result.directory);server.listen(0,'127.0.0.1');await once(server,'listening');
  try {
    const base=`http://127.0.0.1:${server.address().port}`;
    const page=await fetch(base+'/');assert.equal(page.status,200);assert.match(await page.text(),/<html lang="en">/);
    for(const path of ['data/resources.json','source-template.json','downloads/embassy-commons.zip','schema/registry.schema.json'])assert.equal((await fetch(base+'/'+path)).status,404,path);
    for(const path of ['app.js','commons-entry.js','lib/introduction.js','fonts.css'])assert.equal((await fetch(base+'/'+path)).status,200,path);
  } finally {server.close();await once(server,'close');await rm(fixture,{recursive:true,force:true});}
});

test('public builder cannot replace an arbitrary directory', async () => {
  const target=await mkdtemp(resolve(tmpdir(),'commons-intro-output-'));
  try {await assert.rejects(()=>buildPublicIntroduction(projectRoot,target),/must be dist\/public-introduction/);}finally{await rm(target,{recursive:true,force:true});}
});
