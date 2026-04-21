# QA — databerganalytics

> Append-only log of quality-gate verification runs. Each run records what was measured, when, against which build, and where scores fell short.

## Lighthouse — 2026-04-21 — Phase 13 gate

- **Build:** commit on `main` at time of run (wrangler devDependency fix).
- **Target:** `https://databerg.akara061806.workers.dev/` (Cloudflare Workers deploy).
- **Tool:** Google PageSpeed Insights API v5 (Lighthouse runs Google-side, same engine as pagespeed.web.dev).
- **Strategy:** mobile + desktop, both captured.
- **Gate:** CLAUDE.md §11 and roadmap Phase 13 require mobile ≥ 95 on every page, every category.

### Mobile

| URL | Perf | A11y | BP | SEO |
|---|---|---|---|---|
| `/` | 95 | 100 | 100 | 100 |
| `/services` | 98 | 100 | 100 | 100 |
| `/services/cloud-cost` | 99 | 100 | 100 | 100 |
| `/work` | 98 | 100 | 100 | 100 |
| `/work/health-insurer-analytics` | 99 | 100 | 100 | 100 |
| `/about` | 99 | 100 | 100 | 100 |
| `/contact` | 99 | 100 | 100 | 100 |
| `/insights` | 99 | 100 | 100 | 100 |
| `/insights/why-analytical-reports-got-slow` | 99 | 100 | 100 | 100 |
| `/nl/` | 99 | 100 | 100 | 100 |
| `/nl/diensten` | 98 | 100 | 100 | 100 |
| `/nl/cases` | 99 | 100 | 100 | 100 |
| `/nl/over-ons` | 98 | 100 | 100 | 100 |
| `/nl/contact` | 99 | 100 | 100 | 100 |
| `/nl/insights` | 99 | 100 | 100 | 100 |

### Desktop

| URL | Perf | A11y | BP | SEO |
|---|---|---|---|---|
| all 15 routes above | 100 | 100 | 100 | 100 |

(Captured individually; every route scored 100/100/100/100 on desktop. Rolled up to save space.)

### Result

**Pass.** Mobile floor is 95 (home page); 14/15 pages sit at 98–99. Accessibility, Best Practices, and SEO are 100 across the board. Desktop is a flat 100.

### Known drag — recorded for Phase 15 polish, not blocking

- **Trailing-slash redirect tax.** Every non-root route (`/services`, `/work`, `/nl/diensten`, etc.) 307s to its trailing-slash variant before the Worker serves HTML, costing ~750 ms per cold navigation. PSI's `redirects` audit flags it. This is a Cloudflare Workers default, not an Astro default. Two ways to fix:
  1. Configure the Worker to serve the canonical (trailing-slash) body directly on both URLs.
  2. Reverse Astro's `trailingSlash` setting so non-slash is canonical and the redirect disappears.
  Fix would lift the mobile 98s to 100 and the 95 on `/` a notch too. Target: Phase 15.
- **EN home page performance floor = 95 (mobile).** Driven by Total Blocking Time / render-blocking audits on the Optimization Dashboard's critical CSS. Inlining the above-the-fold CSS on `/` is the single-biggest lever if we want the last point. Target: optional, Phase 15 polish.

## Lighthouse — future runs

Append new blocks above this line, newest first. Never delete history — a regression over time is more useful than a clean slate.

---

## Keyboard walkthrough — pending Phase 14

Planned coverage:

- Tab order from skip-link through Nav, hero / dashboard tablist (arrow keys, Home/End), main content, form fields, footer.
- `:focus-visible` ring present on every interactive element.
- Esc / Enter behavior on tablist and form.
- No keyboard traps on the contact form during loading / error states.

## axe DevTools — pending Phase 14

Run against every route in the sitemap. Zero violations required. Record any needs-review items with a note on why they're accepted.
