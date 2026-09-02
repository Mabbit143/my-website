// The eight locked editorial series — names, one-line descriptions, and slugs
// are approved brand copy from the DA Foundation Files (Rebuild 01). Do not
// reword these; they are not placeholders.
//
// `palette` assigns each series one of the candidate collage palettes from
// the DA Notion "palette candidate" table (fetched 1 Sep 2026), matched by
// theme to that series — Claude's proposal, approved by Lori 1 Sep 2026:
//   red-pen        → grading/certification, myth-busting ("Red Pen Society")
//   archive        → source work, historical context ("Archive After Dark")
//   field-notes    → anthropology, lived/qualitative knowledge ("Field Notes")
//   public-record  → institutional/bureaucratic, resource-pointing ("Public Record")
//   electric       → activism, movement culture, loud ("Electric Playground")
//   chalkboard     → citation tracing, fact-checking ("Chalkboard") — added
//                    2 Sep 2026 as an ADDITION to the brand (Lori's chalkboard
//                    reference images), not a replacement of the system above.
//                    Approved for "Receipts or It Didn't Happen" specifically —
//                    the one series literally about tracing sources. The
//                    reusable inline version of the same look lives in
//                    src/components/ChalkCallout.astro and can be dropped into
//                    any article regardless of its series.
// This mapping is an implementation detail Claude chose for consistent UI
// theming (series pill, card border, headline emphasis color) — swap it any
// time, it's not locked brand copy. Hex values live in src/styles/global.css.

export type Palette =
  | 'red-pen'
  | 'archive'
  | 'field-notes'
  | 'public-record'
  | 'electric'
  | 'chalkboard';

export interface Series {
  slug: string;
  name: string;
  description: string;
  palette: Palette;
}

export const SERIES: Series[] = [
  {
    slug: 'whose-peers',
    name: 'Whose Peers?',
    description: 'Who certifies knowledge, and who is missing from the room.',
    palette: 'red-pen',
  },
  {
    slug: 'academic-autopsy',
    name: 'Academic Autopsy',
    description:
      'Cut open neutral-looking language, conventions, policy, or statistics and show what they hide.',
    palette: 'red-pen',
  },
  {
    slug: 'receipts-or-it-didnt-happen',
    name: "Receipts or It Didn't Happen",
    description: 'Source verification, citation tracing, statistics, funding, and methodology.',
    palette: 'chalkboard',
  },
  {
    slug: 'field-notes-from-the-other-side',
    name: 'Field Notes From the Other Side',
    description:
      'Lived knowledge in conversation with institutional claims, without spectacle.',
    palette: 'field-notes',
  },
  {
    slug: 'the-syllabus-left-this-out',
    name: 'The Syllabus Left This Out',
    description:
      'Recover histories, scholars, movements, community knowledge, and political context omitted from standard explanations.',
    palette: 'archive',
  },
  {
    slug: 'use-the-damn-tool',
    name: 'Use the Damn Tool',
    description: 'Practical research methods people can use today.',
    palette: 'public-record',
  },
  {
    slug: 'dog-eared-dissent',
    name: 'Dog-Eared Dissent',
    description:
      'Activism, prison, abolition, bail, inequality, policy, political theory, research, and movement books — by argument, not inspirational quotes.',
    palette: 'electric',
  },
  {
    slug: 'where-the-work-is',
    name: 'Where the Work Is',
    description:
      'Point toward active, transparent, accountable, directly affected-led work and resources.',
    palette: 'public-record',
  },
];

export function getSeries(slug: string): Series | undefined {
  return SERIES.find((s) => s.slug === slug);
}
