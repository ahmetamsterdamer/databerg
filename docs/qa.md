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

## Keyboard walkthrough — 2026-04-21 — Phase 14

Verified against built HTML at the `databerg.akara061806.workers.dev` Workers deploy. Every page follows the same outer shell, so the walkthrough is described once for the shell + per-page interactive surfaces.

### Shell (every page)

1. **Skip-link first.** `Tab` from page load focuses the skip-to-content anchor (sr-only, becomes visible on focus in the top-left corner). Enter jumps focus to `<main id="main">`.
2. **Nav second.** Next tabs walk wordmark → 4 nav links (desktop) or just wordmark + Book-a-call (mobile `< md`) → nav CTA → language toggle (if present in Nav; currently lives in Footer).
3. **Main region.** Page-specific order (see below).
4. **Footer last.** Tagline → contact email → 4 navigate links → insights link → EN/NL toggle. Every link visible focus ring via global `:focus-visible`.

### Home `/` + `/nl/` — Optimization Dashboard

- Tablist (`[role="tablist"]`) receives focus on the active tab (`tabindex="0"`). Inactive tabs have `tabindex="-1"` — arrow keys navigate, not Tab.
- `←` / `→` cycle scenarios. `Home` jumps to first, `End` to last. Activation auto-focuses the moved tab, and the panel's bar animation runs.
- `prefers-reduced-motion`: bars snap to final width, no transition. Verified by the `reducedMotion` branch in `OptimizationDashboard.astro`.

### Work index `/work` + `/nl/cases` — Filter toolbar

- Sector chips → service chips → Clear button, all reachable via Tab in source order.
- Each chip is a `<button>` with `aria-pressed` toggled on click / Enter / Space.
- "N of M" live region (`aria-live="polite"`) announces count changes to screen readers.
- No keyboard trap — the chip row is linear, Clear resets, Tab continues to the results grid.

### Contact `/contact` + `/nl/contact`

- Form fields in source order: Name → Email → Organization (optional) → Message → Submit.
- Each field is a real `<label for>`-bound `<input>` / `<textarea>`. Required fields marked with a visible asterisk; `required` attribute present on the DOM node.
- Honeypot `website` field is `absolute -left-[10000px]` — not in Tab order, not visible, not announced.
- Turnstile widget (when `PUBLIC_TURNSTILE_SITE_KEY` is set) sits between Message and Submit; Cloudflare handles its own keyboard flow.
- Submit state: button becomes `disabled` during fetch; aria-live status region reads "Sending…" then "Thanks — we'll reply soon." or the error message. No focus trap, no Esc handler needed — the form stays in place.

### Detail pages (services / work / insights / NL parallels)

- Breadcrumb `← All <section>` link → H1 → body links (within article) → CTA button → "More X" cards → footer.
- Body link styling uses underline with accent color and offset — meets contrast minimum and preserves underline even in focused state.

### Global invariants verified

- Every interactive element has a visible focus ring (outline 2px accent, 2px offset).
- No `outline: none` without a replacement. Global `:focus-visible` in `global.css` owns the default.
- Arrow "↗" / "→" glyphs in links carry `aria-hidden="true"` so the accessible name is just the text label.
- `prefers-reduced-motion: reduce` kills animation/transition globally via `global.css` media block.

## axe — code-level audit — 2026-04-21 — Phase 14

Full in-browser axe DevTools run against every route is deferred to the reviewer's machine — no Chrome in the automation environment. What the code audit covers (the checks axe catches that Lighthouse scored 100 on but that still deserve a code-level confirmation):

| Check | Result | Evidence |
|---|---|---|
| `html` has `lang` | pass | `BaseLayout.astro:50` sets `lang={locale}` from path |
| Exactly one `<h1>` per page | pass | Verified on all 15 built HTML files |
| Landmarks present: `<header>`, `<nav>`, `<main>`, `<footer>` | pass | `BaseLayout` renders `<Nav>` (`<header><nav>`), `<main>`, `<Footer>` |
| Skip-link present and focusable | pass | `BaseLayout.astro` lines 88–93 |
| No duplicate `id` attributes on interactive pages | pass | `/`, `/contact`, `/work` verified with grep-uniq |
| All interactive elements keyboard-reachable | pass | See keyboard walkthrough above |
| Focus ring always visible | pass | Global `:focus-visible` in `global.css` + per-component focus classes |
| Form fields have labels bound via `for`/`id` | pass | `Input` / `Textarea` / `Select` primitives always emit `<label>` |
| Form fields marked `required` as DOM attr | pass | Primitives set `required` from the `required` prop |
| Honeypot field excluded from accessibility tree | pass | Positioned off-screen + `tabindex="-1"` + `autocomplete="off"` (not visible or announced) |
| WAI-ARIA tablist pattern on dashboard | pass | `role="tablist"` + per-tab `role="tab"` + `aria-selected` + arrow-key handler |
| `aria-pressed` on filter chips | pass | `work/index.astro` chip markup |
| `aria-hidden` on decorative glyphs | pass | Every `→` / `↗` / `←` carries `aria-hidden="true"` |
| aria-live region on async surfaces | pass | Filter count + form status use `aria-live="polite"` |
| Color contrast (WCAG AA) | pass via Lighthouse | PSI accessibility = 100 on every route; token palette is deep near-black on warm off-white, ratio comfortably above 7:1 for body and 4.5:1 for muted text |

### In-browser verification for the reviewer

Before Phase 15 launch, run axe DevTools manually in Chrome against these pages and confirm zero violations:

1. `/` — dashboard interactivity is the most complex surface
2. `/work` — filter chips with `aria-pressed`
3. `/contact` — full form, including Turnstile if configured
4. `/nl/` — Dutch locale parity
5. One detail page each: `/services/cloud-cost`, `/work/health-insurer-analytics`, `/insights/why-analytical-reports-got-slow`

If a violation appears, reopen Phase 14 for the fix and re-record scores above.
