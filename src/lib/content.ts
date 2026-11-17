import type { ImageMetadata } from 'astro';

// Every image under /content, discovered at build time. An item's images are
// simply the image files sitting in its folder — nothing has to be listed.
const imageModules = import.meta.glob<{ default: ImageMetadata }>(
  '/content/**/*.{jpg,jpeg,png,webp,avif,gif,JPG,JPEG,PNG,WEBP,AVIF,GIF}',
  { eager: true },
);

const audioModules = import.meta.glob<string>('/content/**/*.{mp3,m4a,ogg,wav}', {
  eager: true,
  query: '?url',
  import: 'default',
});

const natural = new Intl.Collator('en', { numeric: true, sensitivity: 'base' });

export interface FolderImage {
  name: string;
  src: ImageMetadata;
}

export function imagesIn(world: string, id: string): FolderImage[] {
  const prefix = `/content/${world}/${id}/`;
  return Object.entries(imageModules)
    .filter(([path]) => path.startsWith(prefix) && !path.slice(prefix.length).includes('/'))
    .map(([path, mod]) => ({ name: path.slice(prefix.length), src: mod.default }))
    .sort((a, b) => natural.compare(a.name, b.name));
}

export function coverOf(world: string, id: string, cover?: string): FolderImage | undefined {
  const all = imagesIn(world, id);
  if (cover) {
    const hit = all.find((i) => i.name.toLowerCase() === cover.toLowerCase());
    if (!hit) throw new Error(`content/${world}/${id}: cover "${cover}" is not a file in that folder`);
    return hit;
  }
  return all[0];
}

export function audioIn(world: string, id: string, file: string): string {
  const url = audioModules[`/content/${world}/${id}/${file}`];
  if (!url) throw new Error(`content/${world}/${id}: audio "${file}" is not a file in that folder`);
  return url;
}

export const byNewest = <T extends { data: { date: Date } }>(a: T, b: T) =>
  b.data.date.getTime() - a.data.date.getTime();

const longFmt = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
const monthFmt = new Intl.DateTimeFormat('en-GB', { month: 'short', year: 'numeric', timeZone: 'UTC' });

export const fmtDate = (d: Date) => longFmt.format(d);
export const fmtMonth = (d: Date) => monthFmt.format(d);
export const isoDate = (d: Date) => d.toISOString().slice(0, 10);
