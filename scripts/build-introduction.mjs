import { readFile, writeFile, mkdir, copyFile, rm } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const files = [
  ['introduction/index.html','index.html'], ['introduction/app.js','app.js'],
  ['dist/styles.css','styles.css'], ['dist/fonts.css','fonts.css'],
  ['dist/brand.js','brand.js'], ['dist/icon.svg','icon.svg'],
  ['dist/commons-entry.js','commons-entry.js'], ['dist/lib/introduction.js','lib/introduction.js'],
  ...['Schibsted-OFL.txt','SourceSerif-OFL.txt','JetBrainsMono-OFL.txt'].map(name=>[`dist/font-licenses/${name}`,`font-licenses/${name}`])
];
export async function buildPublicIntroduction(root, target = resolve(root, 'dist/public-introduction')) {
  const output=resolve(target);
  if(output!==resolve(root,'dist/public-introduction')) throw new Error('Public introduction output must be dist/public-introduction.');
  const source=await Promise.all(files.map(async([path,name])=>[name,await readFile(resolve(root,path))]));
  await rm(output,{recursive:true,force:true});
  await mkdir(output,{recursive:true});
  for(const[name,content]of source){const targetFile=resolve(output,name);await mkdir(dirname(targetFile),{recursive:true});await writeFile(targetFile,content);}
  return { files:files.map(([,name])=>name), directory:output };
}
if(process.argv[1] && resolve(process.argv[1])===fileURLToPath(import.meta.url)) {
  const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
  console.log('Public introduction built:',JSON.stringify(await buildPublicIntroduction(root)));
}
