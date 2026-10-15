export const RESOURCE_CATEGORIES = [
  'Academic Writing',
  'Research and Evidence',
  'Reading and Annotation',
  'Critical Thinking',
  'AI Literacy',
  'Academic Navigation',
  'Institutional Analysis',
] as const;

export type ResourceCategory = (typeof RESOURCE_CATEGORIES)[number];

export interface Resource {
  readonly slug: string;
  readonly title: string;
  readonly summary: string;
  readonly category: ResourceCategory;
  readonly format: 'PDF' | 'Web tool';
  readonly status: 'available' | 'upcoming';
  /** Direct file or tool URL. Only set when status is "available". */
  readonly href?: string;
  /** Page that explains the resource, if different from href. */
  readonly infoHref?: string;
  readonly meta?: string;
}

// Only list a resource as "available" when its file or tool exists in /public.
export const RESOURCES: readonly Resource[] = [
  {
    slug: 'read-the-fine-print',
    title: 'Read the Fine Print: Syllabus Quick Check',
    summary:
      'A two-page fillable worksheet for decoding attendance, late-work, participation and grade-appeal rules, plus the fog words and grade-weight math that hide in a syllabus.',
    category: 'Academic Navigation',
    format: 'PDF',
    status: 'available',
    href: '/downloads/Read_the_Fine_Print_Free_Syllabus_Quick_Check.pdf',
    infoHref: '/free-syllabus-check/',
    meta: '2 pages · about 10 minutes · fillable',
  },
  {
    slug: 'gpa-calculator',
    title: 'Grade & GPA Impact Terminal',
    summary: 'A browser tool for seeing how a grade changes your GPA before it lands.',
    category: 'Academic Navigation',
    format: 'Web tool',
    status: 'available',
    href: '/tools/gpa-calculator.html',
    meta: 'Runs in your browser',
  },
  {
    slug: 'decode-your-assignment',
    title: 'Decode Your Assignment',
    summary:
      'A guided worksheet for turning an assignment prompt into what is actually being asked, what counts as evidence, and what to do first. In development; not yet available.',
    category: 'Academic Writing',
    format: 'PDF',
    status: 'upcoming',
  },
];
