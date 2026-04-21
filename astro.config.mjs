import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';

const SITE = 'https://databerganalytics.com';

export default defineConfig({
  site: SITE,
  // Most pages stay static; server routes opt-in via `export const prerender = false`.
  // The Cloudflare adapter enables hybrid rendering on CF Pages (deploy target).
  output: 'static',
  adapter: cloudflare({
    imageService: 'compile',
  }),
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'nl'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', nl: 'nl-NL' },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
