# Saanvi's portfolio

A static site built with [Astro](https://astro.build). One hub, six worlds. All
content lives in `content/` as small text files; the pages build themselves
from it.

## Everyday use

```bash
npm run dev      # preview at http://localhost:4321 (updates as you save)
npm run build    # build the final site into dist/
```

Publishing is `git add -A`, `git commit -m "..."`, `git push`. GitHub rebuilds
and deploys the site in about a minute.

## Adding things

`npm run new <world> "Title"` creates the file for you with today's date:

```bash
npm run new photos "Kashmir"
npm run new words "The name of the poem"
npm run new wonders "Why is the sky blue?"
npm run new projects "Warehouse layout study"
npm run new music "Teentaal practice"
npm run new sport "Inter-IIT 2026"
```

| World | Where it goes | What you do |
| --- | --- | --- |
| Photos | `content/photos/<album>/index.md` | Drop the photos into the same folder. Every image there appears in the gallery. The first one (by file name) is the cover unless you set `cover:`. |
| Words | `content/words/<name>.md` | Paste the text under the `---` block. Line breaks are kept, so poems keep their shape. |
| Wonders | `content/wonders/<name>.md` | `question`, `short` (one-line answer), `sources`; the body is what you found out. |
| Projects | `content/projects/<name>/index.md` | `skills: [A, B]` decides the edges of the network: two projects sharing a skill get connected. Spell skills the same way each time. |
| Music | `content/music/<name>/index.md` | `beat: 1`–`16` places the clip on the cycle. Use `url:` for a link or `audio:` for a file in the folder. |
| Sport | `content/sport/<name>.md` | `sport: basketball` or `athletics`; `order` sorts them. |

Rules worth knowing:

- **Quote any value containing a colon**, e.g. `title: "Kashmir: day one"`.
  An unquoted colon is the most likely cause of a build error.
- A file or folder whose name starts with `_` is ignored. Use that for drafts.
- If a field is missing or misspelt, the build stops and names the file.
  That is deliberate: a broken item never reaches the live site.
- Phone photos in **HEIC** format are not supported. Export as JPEG first.
- Before committing new photos, run `npm run shrink`. It caps stored photos at
  2400 px on the long side so the repository stays small. The site makes the
  smaller per-screen versions itself at build time.

## Things about you

`src/site.config.ts` holds your name, intro, links, résumé link and palette.
While `npm run dev` is running, a small switcher in the corner lets you try the
three palettes; set the one you want in `palette:`. The colours themselves are
in `src/styles/palettes.css`. After changing the palette or your name, run
`node scripts/make-og.mjs` to regenerate the share-preview image.

## First deployment

1. On GitHub, create a **public** repository named exactly
   `saanvi-walvekar.github.io` (that name is what gives the site the root URL).
2. In this folder:
   ```bash
   git remote add origin https://github.com/saanvi-walvekar/saanvi-walvekar.github.io.git
   git push -u origin main
   ```
3. In the repository: Settings → Pages → Source → **GitHub Actions**.

The site is then at https://saanvi-walvekar.github.io.

## Custom domain, later

1. Buy the domain.
2. At the registrar, add DNS records pointing to GitHub Pages (a `CNAME` for
   `www`, and `A` records for the bare domain; GitHub's Pages docs list the
   current addresses).
3. Repository Settings → Pages → Custom domain: enter it, tick Enforce HTTPS.
4. In this project: change `site` in `astro.config.mjs`, the Sitemap line in
   `public/robots.txt`, and add a file `public/CNAME` containing the domain.

Nothing else changes. All links in the site are root-relative, and the old
`github.io` address redirects to the new domain automatically.

## Layout of the code

- `content/` — everything you write.
- `src/content.config.ts` — the fields each kind of item must have.
- `src/pages/` — one file per page type.
- `src/layouts/Base.astro` — shared head (titles, share tags), top bar, footer.
- `src/styles/` — palettes and shared typography.
- `scripts/` — `new`, `shrink`, `make-og`.
- `.github/workflows/deploy.yml` — the deploy recipe.
