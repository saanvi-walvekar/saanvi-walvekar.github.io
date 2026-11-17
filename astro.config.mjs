import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// `site` is the one place the public address lives. When a custom domain is
// attached later, change this line (and add public/CNAME) — nothing else.
export default defineConfig({
  site: 'https://saanvi-walvekar.github.io',
  trailingSlash: 'always',
  integrations: [sitemap()],
});
