// Build-time index of every article (including drafts), full frontmatter +
// blocks included, for the canvas editor (/write/) to load into "Open
// existing article." Static JSON — no server, matches this site's static
// output. Regenerates on every build, so an article published through the
// editor itself shows up here after the next deploy.
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const prerender = true;

export const GET: APIRoute = async () => {
  const articles = await getCollection('articles');
  const payload = articles
    .map((entry) => ({
      // real filename in src/content/articles/, e.g. "Testing.md" — the editor
      // uses this to open/save the right file. (Since Astro 5, entry.id is the
      // URL slug and the filename lives in entry.filePath.)
      id: (entry.filePath ?? '').replace(/^(\.\/)?src\/content\/articles\//, ''),
      slug: entry.id,
      ...entry.data,
      pubDate: entry.data.pubDate.toISOString().slice(0, 10),
      updatedDate: entry.data.updatedDate ? entry.data.updatedDate.toISOString().slice(0, 10) : '',
    }))
    .sort((a, b) => b.pubDate.localeCompare(a.pubDate));

  return new Response(JSON.stringify(payload), {
    headers: { 'Content-Type': 'application/json' },
  });
};
