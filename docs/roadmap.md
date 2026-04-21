# Roadmap — databerganalytics

> The itinerary. The rulebook is `CLAUDE.md`. Work one phase at a time. Do not leap phases without explicit user confirmation.

**Current phase:** Phase 13 complete. Preview deployed to `databerg.akara061806.workers.dev`; Lighthouse run captured in `docs/qa.md` — mobile passes ≥95 across all 15 routes (floor 95 on `/`, rest at 98–99), desktop is 100 across the board. A11y / Best Practices / SEO = 100 everywhere. Two non-blocking polish items logged to Phase 15: trailing-slash redirect tax and EN-home TBT. Ready to start Phase 14 (axe + OG + sitemap + structured data).

---

## Phase 0 — Decisions locked ✅

- `CLAUDE.md` slots filled (project, aesthetic, typography, signature moment).
- Docs scaffolded: `roadmap.md`, `sitemap.md`, `decisions.md`.
- No code yet.

## Phase 1 — Repo scaffold

Goal: an empty Astro site that builds, typechecks, and serves a blank `index.astro`.

- [x] `package.json` with scripts: `dev`, `build`, `preview`, `check`.
- [x] `astro.config.mjs` with `@tailwindcss/vite` + sitemap + i18n.
- [x] `tsconfig.json` strict mode.
- [x] `.nvmrc` pinning Node LTS.
- [x] `.gitignore`, `.editorconfig`, `.prettierrc`, `.prettierignore` (opinionated minimal).
- [x] `src/styles/tokens.css` — Tailwind v4 `@theme` block: seven color tokens (dark canvas + light inversion), spacing scale, type scale, easing, font-family vars.
- [x] `src/styles/global.css` — `@import "tailwindcss"`, resets, base styles, commented font-face TODOs.
- [x] Folder structure from `CLAUDE.md` §4 created (empty but present, with `.gitkeep`).
- [x] `public/fonts/` placeholder with a README listing the woff2 files we need (all commercial — user must provide).
- [x] `src/pages/index.astro` — placeholder holding page in tone (not lorem).
- [x] Stop. Run `pnpm check` and `pnpm build`. Report.

## Phase 2 — Base layout, Nav, Footer

- [x] `BaseLayout.astro` with `<head>`, commented preload TODO, meta defaults, hreflang alternates, skip-link.
- [x] `Nav.astro` — wordmark only, 4 links (Services/Work/About/Contact), EN/NL toggle, book-a-call CTA. Mobile: wordmark + CTA only; footer carries wayfinding.
- [x] `Footer.astro` — tagline, placeholder contact email (TODO), 4-link navigate, language toggle, copyright.
- [x] `src/lib/i18n.ts` — locale detection, path swap, labels for EN + NL.
- [x] Keyboard nav works: skip-link, focus rings via global `:focus-visible`, logical tab order.

## Phase 3 — UI primitives

- [x] `Button` — primary/secondary/ghost, sm/md/lg, hard-edge, full state set (`:hover`, `:focus-visible`, `:disabled`, `:active`). Renders `<a>` with `href`, else `<button>`.
- [x] `Link` — inline, arrow (animated chevron), external (new-tab + `↗`).
- [x] `Input`, `Textarea`, `Select` — shared field shell, real `<label>`, `hint` slot, required marker.
- [x] `Tag` — default + accent variants.
- [x] Visual QA page at `/dev/ui` (noindex, not linked from nav, removed before launch). Note: `/_dev/ui` as originally written is not possible — Astro excludes underscore-prefixed directories from routing.
- [x] Refactored: Nav CTA, home hero CTAs, 404 wayfinding links now consume the new primitives.

## Phase 4 — Home page (non-signature sections)

- [x] `Hero.astro` — plain editorial hero (dashboard replaces it in Phase 5).
- [x] `ServicesGrid.astro` — 4 services (Cloud cost / Data & pipelines / Process automation / Systems strategy), 2×2 grid. `TODO(copy)` on names + summaries.
- [ ] ~~Proof row~~ — intentionally skipped until real client logos exist (CLAUDE.md §2.10).
- [x] `HowWeWork.astro` — 3 numbered steps (Listen / Scope / Ship). `TODO(copy)` for user refinement.
- [x] `ClosingCTA.astro` — centered final CTA block.
- [x] `index.astro` composes the sections.
- [ ] **Deferred to Phase 12:** `/nl/` home page. Dutch copy written by a human, not machine-translated.

## Phase 5 — Signature moment: The Optimization Dashboard

- [x] Static "after" view rendered server-side. No-JS users see the default scenario's after state.
- [x] Scenario picker (3 scenarios: cloud cost / process time / data quality). WAI-ARIA tablist pattern with full keyboard navigation (Arrow / Home / End).
- [x] Animated bar-width transitions on scenario switch (700ms, `ease-out`). No chart library — hand-rolled divs.
- [x] `prefers-reduced-motion`: animation skipped, bars swap instantly.
- [x] Replaces the plain hero from Phase 4 (`Hero.astro` kept but unused; remove if still unused at Phase 15).
- [x] **Deferred — no absolute numbers.** `TODO(data)` at top of `OptimizationDashboard.astro` for when real engagement outcomes are available. Current delta labels and bar proportions are qualitative by design (CLAUDE.md §8).

## Phase 6 — Services page

- [x] `src/lib/services.ts` — typed data for 4 services (cloud-cost / data-pipelines / process-automation / systems-strategy). Shared between home grid, `/services` overview, `/services/[slug]`.
- [x] `/services` overview — editorial list, one big row per service, ledes, row-level hover.
- [x] `/services/[slug]` dynamic detail — Problem (01) → Approach (02) → Outcome (03) → Shape of engagement (04). Each section numbered, Swiss-precision rhythm. Closing CTA + "Other services" block at the bottom.
- [x] Home `ServicesGrid.astro` refactored to import from `lib/services.ts`.
- [ ] ~~Links to case studies~~ — placeholder block on each detail page; real filtered lists land in Phase 8 when the case-study index exists.
- [ ] **Deferred to Phase 12:** `/nl/diensten` + `/nl/diensten/[slug]`.

## Phase 7 — Case-study template + first case study

- [x] `src/content.config.ts` — typed schema for `work` (title, sector, location, duration, stack, services, summary, outcomes, publishedAt, featured, draft) and `posts` (ready for Phase 11). Resolves the auto-generation deprecation warning that's been showing since Phase 1.
- [x] `src/pages/work/[slug].astro` — detail template: breadcrumb → header with tags → meta bar (duration/stack/services) → outcomes grid → narrative (markdown + scoped `prose-body` styles) → related services → closing CTA → more work.
- [x] **Three** real case studies (not just one — the user's CV had three engagements worth anonymizing):
  - `health-insurer-analytics.md` — Dutch health insurer, Azure Synapse analytics tuning (~60% / ~30%).
  - `banking-query-performance.md` — EMEA retail banking group, warehouse query performance (~40%).
  - `consulting-ssis-migration.md` — Global IT consulting partner, SSIS → Azure lakehouse modernization.
- [x] All three carry `TODO(review)` markers so the user can tighten anonymization if needed. No real client names appear in any source file (verified via grep).
- [ ] **Blocked on Phase 8:** no `/work/index.astro` yet. Nav "Work" link 404s until Phase 8 lands the filterable list. Detail pages are reachable via direct URL and from the related-work placeholders on service pages.

## Phase 8 — Work index

- [x] `/work/index.astro` — featured case gets full-width treatment, rest in 2-col grid. Empty state when filters hide everything.
- [x] Filter toolbar: sector chips + service chips + Clear button + "N of M" count (aria-live). Within-group OR, cross-group AND. Chips use `aria-pressed`.
- [x] Vanilla-JS filter script; no-JS fallback shows the full list.
- [x] Service detail pages (`/services/[slug]`) now surface real related cases via `getCollection` filter. Placeholder kept as a fallback for services with no cases yet.
- [ ] **Deferred to Phase 14:** OG image per case study.
- [ ] **Deferred to Phase 12:** `/nl/cases` index + `/nl/cases/[slug]`.

## Phase 9 — About

- [x] `/about` — hero, bio (3 paragraphs), anonymized experience timeline (3 engagements, links to case studies), 5 operating principles, credentials (education + certifications), volunteer note, closing CTA.
- [x] Real name used (Ahmet Karabaş); real credentials from the CV (DP-203 / AZ-900 / AZ-700, VU Amsterdam + METU).
- [x] No photo — placeholder slot in the bio block, `TODO(copy)` for when a real one is ready. Stock photos explicitly avoided per CLAUDE.md §2.
- [ ] **Deferred to Phase 12:** `/nl/over-ons`.

## Phase 10 — Contact + form

- [x] `@astrojs/cloudflare` adapter installed (pinned to `^12` for Astro-5 compatibility). Config switched to hybrid — static by default, `/api/contact` server-rendered.
- [x] `src/pages/api/contact.ts` — POST endpoint: honeypot (silent OK on bot), manual name/email/message validation, Turnstile siteverify, Resend `/emails` call with `reply_to: <sender>`.
- [x] `src/pages/contact.astro` — hero, primary Cal.com CTA, secondary form with Input / Textarea primitives, direct contact details (email + LinkedIn).
- [x] Inline vanilla JS for form submission — fetch → loading → success/error inline, aria-live status region, Turnstile widget reset on success.
- [x] Turnstile widget conditional on `PUBLIC_TURNSTILE_SITE_KEY` being set. Without it, the form works end-to-end without captcha (dev mode), and server skips siteverify.
- [x] `.env.example` commits the required var names and points to sign-up URLs for Resend + Turnstile.
- [x] `BaseLayout.astro` gained a `<slot name="head" />` so individual pages can inject scripts without polluting the global layout.
- [ ] **Blocked on user action before launch:**
  - Sign up for Resend, create API key, set `RESEND_API_KEY` in `.env` (dev) and in Cloudflare Pages project secrets (prod).
  - Sign up for Cloudflare Turnstile, create a site, set `PUBLIC_TURNSTILE_SITE_KEY` + `TURNSTILE_SECRET_KEY`.
  - Create a Cal.com (or equivalent) booking page, replace the placeholder URL in `contact.astro`.
  - At deploy time on Cloudflare Pages: enable the `nodejs_compat` compatibility flag for the worker.
- [ ] **Deferred to Phase 12:** `/nl/contact` Dutch version.

## Phase 11 — Insights (optional, gated)

- [x] `src/content/posts/` schema already defined in `src/content.config.ts` (Phase 7 foresight).
- [x] Three seed posts drafted in author's voice, drawn from his real technical patterns (T-SQL tuning / cloud audit / SSIS retirement). Each carries a `TODO(review)` comment at the top.
- [x] `/insights` index — date-sorted, no filter bar yet (threshold: 10+ posts).
- [x] `/insights/[slug]` detail template with scoped `prose-body` styling, "More insights" block, closing CTA.
- [x] Link added to Footer (Nav kept at 4 per CLAUDE.md §8).
- [ ] **User action:** read the three drafts. Flip `draft: true` on anything not ready, or edit in place and leave `draft: false` to publish.
- [ ] **Deferred to Phase 12:** `/nl/insights` Dutch version + Dutch translations of any posts the author chooses to carry over.

## Phase 12 — Dutch translations (i18n)

- [x] Astro i18n routing already scaffolded Phase 1; Phase 12 filled in the content.
- [x] UI strings externalized in `src/lib/i18n.ts` — 50+ labels across EN and NL. `t(locale, key)` lookup everywhere.
- [x] Translated path segments (`services` ↔ `diensten`, `work` ↔ `cases`, `about` ↔ `over-ons`). `alternateLocaleUrl` helper preserves intent when swapping.
- [x] Service data localized in `src/lib/services.ts` via `.nl` override field + `getLocalizedService` / `getLocalizedServices` helpers.
- [x] Case studies + insight posts have NL parallels (`src/content/{work,posts}/nl/*.md`) with `locale: nl` frontmatter. Schemas carry a `locale` field and an optional `slug` field to share URLs across locales.
- [x] Shared section components (Hero/Dashboard, ServicesGrid, HowWeWork, ClosingCTA) now auto-detect locale from URL and render localized copy.
- [x] Language toggle preserves route across translated segments.
- [x] **Deviation from the roadmap's "do not machine-translate" rule:** user explicitly asked me to write Dutch ("use dutch style"). I wrote it in warm-B2B-formal "u" register. Every Dutch file carries a `TODO(review-nl)` marker for a native speaker review before launch.

## Phase 13 — Performance pass

- [x] **`<Image>` everywhere — N/A for now.** No images exist in the project (CLAUDE.md §2.10 bans stock photos; `/public/images/` is empty; the About page uses a placeholder slot; the home "proof row" was intentionally skipped for lack of real logos). When the first real asset lands, it must route through Astro's `<Image>` with explicit width/height and AVIF/WebP; this is carried into the pre-launch Phase 15 checklist below rather than blocked here.
- [x] **Font preload verified, `font-display: swap`, subsetting considered.** `BaseLayout.astro` now preloads Geist Regular, Geist Medium, **and Geist Mono** (the Mono face is used above-the-fold via the numbered `font-mono` tags that sit on top of every section). `global.css` sets `font-display: swap` on all three `@font-face` declarations. Each woff2 is 44–49 KB; Geist's distribution is already Latin-subsetted, so no further subsetting is required to meet the budget.
- [x] **JS audit per route — clean.** Verified against the built HTML: `/services`, `/services/[slug]`, `/about`, `/insights`, `/insights/[slug]`, `/work/[slug]` and all their NL parallels ship **zero** `<script>` tags. Only three pages ship JS, and each has a real interactive surface: `/` + `/nl/` (the Optimization Dashboard tablist), `/work` + `/nl/cases` (the filter toolbar), `/contact` + `/nl/contact` (form submit + conditional Turnstile widget). All scripts are inline `type="module"`, minified by Astro, no external bundles (`dist/_astro/` holds one 27 KB shared CSS file and nothing else).
- [x] **Lighthouse mobile ≥ 95 on every page — verified.** Run on 2026-04-21 against the `databerg.akara061806.workers.dev` Workers deploy via Google PageSpeed Insights API. Mobile: 95/100/100/100 on `/`, 98–99/100/100/100 on the other 14 routes. Desktop: 100/100/100/100 everywhere. Full table + two non-blocking Phase 15 polish notes (trailing-slash redirect tax; home-page TBT headroom) are in [`docs/qa.md`](./qa.md).

## Phase 14 — Accessibility + SEO pass

- [ ] axe DevTools clean on every page.
- [ ] Keyboard walkthrough documented in `docs/qa.md`.
- [ ] `sitemap.xml`, `robots.txt`.
- [ ] OG images per page (Satori or hand-built SVG → PNG pipeline).
- [ ] Structured data where earned (Organization, Article).

## Phase 15 — Pre-launch

- [ ] Plausible analytics installed.
- [ ] Contact form end-to-end smoke test with real delivery.
- [ ] 404 and error-boundary copy in both languages.
- [ ] Final copy pass — no banned words (CLAUDE.md §9).
- [ ] Decision log reviewed — anything out of date?
- [ ] Deploy to Cloudflare Pages / Netlify. Custom domain. HTTPS.
- [ ] Post-launch checklist: monitor forms for 48h, confirm delivery.

---

## How to move between phases

1. Finish current-phase checklist.
2. Surface what was built, ask user to review.
3. Append any notable decisions to `docs/decisions.md`.
4. User confirms → advance "Current phase" at the top of this file.
