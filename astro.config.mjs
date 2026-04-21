import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';

const SITE = 'https://databerganalytics.nl';

// Turnstile public site key. Public by design — shipped to browsers in the
// form's widget script. Hardcoded here (and not in Cloudflare runtime vars)
// because `wrangler deploy` wipes dashboard-set Variables on every deploy,
// and we need it available at build time for `import.meta.env.PUBLIC_*` to
// be inlined into the contact pages. Override for dev by setting the var
// in your local `.env`.
if (!process.env.PUBLIC_TURNSTILE_SITE_KEY) {
  process.env.PUBLIC_TURNSTILE_SITE_KEY = '0x4AAAAAADAwQ9JTZCi01uBO';
}

export default defineConfig({
  site: SITE,
  // Most pages stay static; server routes opt-in via `export const prerender = false`.
  // The Cloudflare adapter enables hybrid rendering on CF Pages (deploy target).
  output: 'static',
  adapter: cloudflare(),
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
      // /dev/ui is the visual-QA page (noindex, to be deleted in Phase 15).
      // Keep it out of the sitemap so it doesn't end up in Google's index.
      filter: (page) => !page.includes('/dev/ui'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});