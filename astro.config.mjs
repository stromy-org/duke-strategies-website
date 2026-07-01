import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://dukestrategies.com',
  trailingSlash: 'never',
  // Reserve a redirects map for future use (301/302 rules go here).
  redirects: {},
  integrations: [
    mdx(),
    sitemap({
      // Exclude utility pages from the sitemap.
      filter: (page) =>
        !page.endsWith('/404') && !page.endsWith('/search'),
    }),
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'nl'],
    routing: {
      prefixDefaultLocale: true,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
