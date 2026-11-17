// npm run shrink  →  shrinks oversized photos under content/ in place, so the
// git repository stays small. The site resizes again for each screen at build
// time; this only caps what is stored. Safe to run repeatedly.
import { readdir, readFile, writeFile, stat } from 'node:fs/promises';
import { join, extname } from 'node:path';
import sharp from 'sharp';

const MAX = 2400; // longest side in pixels, plenty for a full-screen view
let saved = 0;

async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) await walk(path);
    else if (/\.jpe?g$/i.test(extname(path))) await shrink(path);
  }
}

async function shrink(path) {
  const input = await readFile(path);
  const meta = await sharp(input).metadata();
  if (Math.max(meta.width ?? 0, meta.height ?? 0) <= MAX) return;
  const output = await sharp(input)
    .rotate() // bake in the phone's orientation flag
    .resize({ width: MAX, height: MAX, fit: 'inside' })
    .jpeg({ quality: 86, mozjpeg: true })
    .toBuffer();
  await writeFile(path, output);
  const before = input.length, after = (await stat(path)).size;
  saved += before - after;
  console.log(`${path}: ${(before / 1e6).toFixed(1)} MB → ${(after / 1e6).toFixed(1)} MB`);
}

await walk('content');
console.log(saved ? `Saved ${(saved / 1e6).toFixed(1)} MB.` : 'Nothing to shrink.');