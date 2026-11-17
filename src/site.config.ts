// Everything about *you* that isn't a content item lives here.

export const site = {
  name: 'Saanvi Walvekar',
  shortName: 'Saanvi',
  affiliation: 'IEOR · IIT Bombay',
  // PLACEHOLDER — replace with your own words.
  intro:
    'I study how to make systems work better, and I spend the rest of my time behind a camera, on a court, at a tabla, or chasing a question I can’t put down. This is all of it in one place.',
  description:
    'Saanvi Walvekar — IEOR at IIT Bombay. Photographs, basketball and athletics, projects, tabla, writing, and the questions in between.',

  // One of: 'rangoli' | 'chinar' | 'riso'  (see src/styles/palettes.css)
  palette: 'riso',

  links: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/saanvi-walvekar-262891379/' },
    { label: 'Instagram', href: 'https://www.instagram.com/saanvi_unfiltered/' },
    { label: 'GitHub', href: 'https://github.com/saanvi-walvekar' },
    { label: 'Email', href: 'mailto:saanviwalvekar2@gmail.com' },
  ],

  // Put the PDF at public/resume.pdf and set this to '/resume.pdf'. Empty = link hidden.
  resume: '',
} as const;

export const worlds = [
  { id: 'photos', href: '/photos/', name: 'Postcards', kind: 'Photographs', blurb: 'Albums sent as postcards, from Kashmir to campus.' },
  { id: 'sport', href: '/sport/', name: 'Court & Track', kind: 'Basketball + athletics', blurb: 'Two sports, the teams and events, and how they went.' },
  { id: 'projects', href: '/projects/', name: 'The Network', kind: 'Projects', blurb: 'Projects drawn as a graph. Shared skills are the edges.' },
  { id: 'music', href: '/music/', name: 'Sixteen Beats', kind: 'Tabla & more', blurb: 'Music laid out on the sixteen beats of teentaal.' },
  { id: 'words', href: '/words/', name: 'The Notebook', kind: 'Poems & stories', blurb: 'Poems and short stories on plain ruled paper.' },
  { id: 'wonders', href: '/wonders/', name: 'Wandering Wonders', kind: 'Questions I chased', blurb: 'Things I could not stop wondering about, and what I found.' },
] as const;

export type WorldId = (typeof worlds)[number]['id'];
