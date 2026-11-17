// npm run new <world> "Title"   →  creates the folder/file for a new item.
import { mkdir, writeFile, access } from 'node:fs/promises';
import { join } from 'node:path';

const [world, ...rest] = process.argv.slice(2);
const title = rest.join(' ').trim();
const today = new Date().toISOString().slice(0, 10);

const templates = {
  photos: (t) => `---\ntitle: ${JSON.stringify(t)}\ndate: ${today}\ncategory: Travel   # Travel | Campus | People | Sport\nlocation: \n---\n\nA short note about this album.\n`,
  projects: (t) => `---\ntitle: ${JSON.stringify(t)}\nsummary: One sentence.\ndate: ${today}\nskills: []\n# repo: https://github.com/...\n---\n\n## Problem\n\n## What I did\n\n## Result\n`,
  words: (t) => `---\ntitle: ${JSON.stringify(t)}\ndate: ${today}\nkind: poem   # poem | story | essay\n---\n\n`,
  wonders: (t) => `---\nquestion: ${JSON.stringify(t)}\ndate: ${today}\nshort: The one-line answer.\nsources:\n  - label: Where I found it\n    url: https://example.com\n---\n\nWhat I found out.\n`,
  music: (t) => `---\ntitle: ${JSON.stringify(t)}\ndate: ${today}\ninstrument: Tabla\nbeat: 1\n# url: https://...\n# audio: clip.mp3\n---\n`,
  sport: (t) => `---\ntitle: ${JSON.stringify(t)}\nsport: basketball   # basketball | athletics\nwhen: ${today.slice(0, 4)}\norder: 10\n---\n\n`,
};

if (!templates[world] || !title) {
  console.error(`Usage: npm run new <${Object.keys(templates).join('|')}> "Title"`);
  process.exit(1);
}

const slug = title.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
// Worlds whose items carry files get a folder; text-only ones get a single file.
const folder = ['photos', 'projects', 'music'].includes(world);
const dir = folder ? join('content', world, slug) : join('content', world);
const file = folder ? join(dir, 'index.md') : join(dir, `${slug}.md`);

try {
  await access(file);
  console.error(`${file} already exists.`);
  process.exit(1);
} catch {}

await mkdir(dir, { recursive: true });
await writeFile(file, templates[world](title));
console.log(`Created ${file}${world === 'photos' ? `\nNow drop the photos into ${dir}` : ''}`);