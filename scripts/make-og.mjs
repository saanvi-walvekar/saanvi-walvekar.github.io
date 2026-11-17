// node scripts/make-og.mjs  →  regenerates public/og.png, the image shown when
// the site is shared. Re-run after changing the palette or your name.
import sharp from 'sharp';

const c = { paper: '#faf6ec', ink: '#1d1d2b', a: '#ff4fa3', b: '#ff6b2c', c: '#1f6fe0', d: '#ffd21f', e: '#7a54c7', f: '#0fa36b' };
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="${c.paper}"/>
  <text x="80" y="270" font-family="Georgia, 'Times New Roman', serif" font-size="150" font-weight="700" fill="${c.ink}">Saanvi</text>
  <text x="130" y="410" font-family="Georgia, 'Times New Roman', serif" font-size="150" font-style="italic" fill="${c.ink}">Walvekar</text>
  <rect x="80" y="470" width="330" height="60" fill="${c.d}" transform="rotate(-3 80 470)"/>
  <text x="100" y="512" font-family="Georgia, serif" font-size="34" fill="${c.ink}" transform="rotate(-3 80 470)">IEOR · IIT Bombay</text>
  ${[c.a, c.b, c.c, c.d, c.e, c.f].map((col, i) => `<circle cx="${1010 + (i % 2) * 90}" cy="${150 + Math.floor(i / 2) * 110}" r="36" fill="${col}" stroke="${c.ink}" stroke-width="3"/>`).join('')}
</svg>`;

await sharp(Buffer.from(svg)).png().toFile('public/og.png');
console.log('Wrote public/og.png');