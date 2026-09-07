import { marked } from 'marked';

// One configured Markdown renderer for article block content (the `text`
// block and the body of `callout` blocks). Article content is authored by
// the site owner through the CMS, not submitted by visitors, so the output
// is trusted and not additionally sanitised.
marked.setOptions({
  gfm: true,
  breaks: false,
});

/** Render a Markdown string to an HTML string. Empty/whitespace → ''. */
export function md(source: string | undefined | null): string {
  if (!source || !source.trim()) return '';
  return marked.parse(source) as string;
}

/** Render a short Markdown string as inline HTML (no wrapping <p>). */
export function mdInline(source: string | undefined | null): string {
  if (!source || !source.trim()) return '';
  return marked.parseInline(source) as string;
}
