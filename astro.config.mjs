import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// TODO: once the domain is repointed and the site is actually live at
// deconstructingacademia.com, update `site` below — it powers the sitemap,
// RSS feed, and canonical/OG URLs. Until then it's set to the real domain
// so those files are correct on day one, even though the site isn't live there yet.
export default defineConfig({
  site: 'https://deconstructingacademia.com',
  integrations: [mdx(), sitemap()],
});
