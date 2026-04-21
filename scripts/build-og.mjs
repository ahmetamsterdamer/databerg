/**
 * Build-time Open Graph image generator.
 *
 * Generates one 1200×630 PNG per page into `public/og/`. Runs before
 * `astro build` via the `prebuild` script in package.json.
 *
 * Design: Swiss-precision dark canvas, matching the site aesthetic.
 */

import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// ---- Tokens (mirror src/styles/tokens.css) ----------------------------------
const T = {
  bg: '#0a0b0d',
  ink: '#ece9e0',
  inkMuted: '#9a9691',
  accent: '#d9a05b',
};

// ---- Fonts ------------------------------------------------------------------
const fontsDir = join(__dirname, 'og', 'fonts');
const fonts = [
  { name: 'Geist', weight: 400, style: 'normal', data: readFileSync(join(fontsDir, 'Geist-Regular.otf')) },
  { name: 'Geist', weight: 500, style: 'normal', data: readFileSync(join(fontsDir, 'Geist-Medium.otf')) },
  { name: 'Geist Mono', weight: 400, style: 'normal', data: readFileSync(join(fontsDir, 'GeistMono-Regular.otf')) },
];

// ---- Markdown frontmatter (minimal parser — top-level scalar fields only) --
function loadEntries(dir) {
  let files;
  try {
    files = readdirSync(dir).filter((f) => f.endsWith('.md'));
  } catch {
    return [];
  }
  return files.map((f) => {
    const raw = readFileSync(join(dir, f), 'utf8');
    const m = raw.match(/^---\r?\n([\s\S]+?)\r?\n---/);
    const fm = {};
    if (m) {
      for (const line of m[1].split(/\r?\n/)) {
        const kv = line.match(/^([a-zA-Z_]+):\s*(.*)$/);
        if (!kv) continue;
        fm[kv[1]] = kv[2].replace(/^["']|["']$/g, '').trim();
      }
    }
    fm._slug = f.replace(/\.md$/, '');
    return fm;
  }).filter((fm) => fm.draft !== 'true');
}

const workEn = loadEntries(join(ROOT, 'src/content/work'));
const workNl = loadEntries(join(ROOT, 'src/content/work/nl'));
const postsEn = loadEntries(join(ROOT, 'src/content/posts'));
const postsNl = loadEntries(join(ROOT, 'src/content/posts/nl'));

// ---- Services (source of truth is src/lib/services.ts) ----------------------
const serviceSlugs = ['cloud-cost', 'data-pipelines', 'process-automation', 'systems-strategy'];
const serviceLabels = {
  en: {
    'cloud-cost': { kicker: 'Infrastructure', title: 'Cloud cost optimization' },
    'data-pipelines': { kicker: 'Data', title: 'Data & pipelines' },
    'process-automation': { kicker: 'Process', title: 'Process automation' },
    'systems-strategy': { kicker: 'Strategy', title: 'Systems strategy' },
  },
  nl: {
    'cloud-cost': { kicker: 'Infrastructuur', title: 'Cloudkostenoptimalisatie' },
    'data-pipelines': { kicker: 'Data', title: 'Data en pipelines' },
    'process-automation': { kicker: 'Processen', title: 'Procesautomatisering' },
    'systems-strategy': { kicker: 'Strategie', title: 'Systeemstrategie' },
  },
};

// ---- All pages --------------------------------------------------------------
const pages = [
  // Static
  { slug: 'default', kicker: 'databerganalytics', title: 'Business and tech optimization' },
  { slug: 'home', kicker: 'databerganalytics', title: 'Business and tech optimization' },
  { slug: 'services', kicker: 'Services', title: 'Four engagements. One promise: less drag.' },
  { slug: 'work', kicker: 'Work', title: 'Selected engagements.' },
  { slug: 'about', kicker: 'About', title: 'A practice of one. That is on purpose.' },
  { slug: 'contact', kicker: 'Contact', title: 'A 30-minute call. No slides.' },
  { slug: 'insights', kicker: 'Insights', title: 'Notes from the field.' },

  // Dutch parallels
  { slug: 'nl-home', kicker: 'databerganalytics', title: 'Optimalisatie voor bedrijf en techniek' },
  { slug: 'nl-diensten', kicker: 'Diensten', title: 'Vier vormen van werk. Eén belofte: minder wrijving.' },
  { slug: 'nl-cases', kicker: 'Cases', title: 'Uitgelichte opdrachten.' },
  { slug: 'nl-over-ons', kicker: 'Over ons', title: 'Eén consultant. Met opzet.' },
  { slug: 'nl-contact', kicker: 'Contact', title: 'Een gesprek van 30 minuten. Geen slides.' },
  { slug: 'nl-insights', kicker: 'Inzichten', title: 'Notities uit de praktijk.' },

  // Services
  ...serviceSlugs.flatMap((s) => [
    { slug: `services-${s}`, ...serviceLabels.en[s] },
    { slug: `nl-diensten-${s}`, ...serviceLabels.nl[s] },
  ]),

  // Dynamic: work + insights (EN + NL)
  ...workEn.map((fm) => ({ slug: `work-${fm._slug}`, kicker: fm.sector ?? 'Case study', title: fm.title })),
  ...workNl.map((fm) => ({ slug: `nl-cases-${fm._slug}`, kicker: fm.sector ?? 'Case', title: fm.title })),
  ...postsEn.map((fm) => ({ slug: `insights-${fm._slug}`, kicker: 'Insights', title: fm.title })),
  ...postsNl.map((fm) => ({ slug: `nl-insights-${fm._slug}`, kicker: 'Inzichten', title: fm.title })),
];

// ---- Layout -----------------------------------------------------------------
function template({ kicker, title }) {
  return {
    type: 'div',
    props: {
      style: {
        width: '1200px',
        height: '630px',
        backgroundColor: T.bg,
        color: T.ink,
        fontFamily: 'Geist',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '80px',
      },
      children: [
        {
          type: 'div',
          props: {
            style: {
              fontFamily: 'Geist Mono',
              fontSize: '22px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: T.accent,
            },
            children: kicker,
          },
        },
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              fontSize: title.length > 60 ? '56px' : '72px',
              lineHeight: 1.05,
              letterSpacing: '-0.015em',
              fontWeight: 500,
              color: T.ink,
              maxWidth: '1040px',
            },
            children: title,
          },
        },
        {
          type: 'div',
          props: {
            style: { display: 'flex', flexDirection: 'column', gap: '24px' },
            children: [
              {
                type: 'div',
                props: {
                  style: { width: '80px', height: '3px', backgroundColor: T.accent },
                  children: '',
                },
              },
              {
                type: 'div',
                props: {
                  style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%' },
                  children: [
                    {
                      type: 'div',
                      props: {
                        style: { fontSize: '28px', fontWeight: 500, letterSpacing: '-0.01em', color: T.ink },
                        children: 'databerganalytics',
                      },
                    },
                    {
                      type: 'div',
                      props: {
                        style: {
                          fontFamily: 'Geist Mono',
                          fontSize: '16px',
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          color: T.inkMuted,
                        },
                        children: 'databerganalytics.nl',
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  };
}

// ---- Render -----------------------------------------------------------------
const outDir = join(ROOT, 'public/og');
mkdirSync(outDir, { recursive: true });

const t0 = Date.now();
let count = 0;
for (const page of pages) {
  if (!page.title) continue;
  const svg = await satori(template(page), { width: 1200, height: 630, fonts });
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
  writeFileSync(join(outDir, `${page.slug}.png`), png);
  count++;
}

console.log(`[og] ${count} images generated in ${Date.now() - t0}ms → public/og/`);
