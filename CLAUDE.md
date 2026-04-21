# CLAUDE.md — Agent Instructions

> This file is auto-loaded by Claude Code at the start of every session in this repo.
> It contains the rules, constraints, and conventions for building this website.
> The full phase-by-phase plan lives in `docs/roadmap.md`. This file is the rulebook; the roadmap is the itinerary.

---

## 1. Project

**What this is:** databerganalytics — a senior-feeling business & tech optimization consultancy website. Wordmark is lowercase one word ("databerganalytics") — never capitalize or space it.
**Quality bar:** Better than mooijdatasolutions.nl. The site should feel like a studio-built product, not a template.
**Primary conversion:** book-a-call. Secondary: proposal-request and download-case-study (both reachable from the home page but not the hero CTA).
**Audience:** enterprise IT directors, startup CTOs, and business owners who are feeling the cost of unoptimized systems — slow processes, expensive cloud bills, siloed data, manual work that shouldn't be manual.
**Niche:** business and tech optimization — process, data, and systems. We find the drag in a company's operations and remove it.
**Language(s):** en + nl. English is primary; Dutch is a full parallel, not a machine translation.
**Tone:** warm and quietly authoritative. Confident without being loud. Think "senior peer who's seen this problem before and is happy to help."

---

## 2. Hard rules (never violate)

These are non-negotiable. If a request would break one of these, flag it and ask before proceeding.

1. **No banned fonts.** Never use Inter, Roboto, Arial, Poppins, Montserrat, or system-ui stacks for display or body. Allowed pairings are defined in section 6.
2. **No generic AI aesthetics.** No purple-to-pink gradient heroes. No `rounded-2xl` on every component. No stock photos of smiling people. No emoji used as iconography.
3. **No hardcoded colors in components.** All colors come from CSS variables in `src/styles/tokens.css`. If a new token is needed, add it to tokens first, then use it.
4. **No lorem ipsum in committed code.** Either write real placeholder copy in the project's tone, or leave a `TODO(copy):` comment and stop — ask the user for content.
5. **No component without states.** Every interactive component ships with `:hover`, `:focus-visible`, `:disabled`, and `:active` at minimum. No exceptions.
6. **No motion without reduced-motion support.** Every animation must be disabled or reduced when `prefers-reduced-motion: reduce` is set.
7. **No new dependencies without justification.** If adding an npm package, briefly state in the commit/PR why a native or existing-lib solution wouldn't work.
8. **No unscoped CSS.** All styles live in Tailwind classes or component-scoped files. No global selectors that aren't explicitly part of `global.css` resets.
9. **No JS shipped to pages that don't need it.** Default to Astro static. Add an island (`client:load` / `client:visible`) only when the component is genuinely interactive.
10. **No placeholder/fake testimonials or metrics on the live site.** If real ones aren't available yet, that section stays behind a feature flag or is omitted.

---

## 3. Tech stack (locked)

- **Framework:** Astro (latest) + TypeScript strict mode.
- **Styling:** Tailwind CSS v4 (CSS-first config). All design tokens live in `src/styles/tokens.css` inside a `@theme` block — that is the only source of truth. There is no `tailwind.config.ts`. Tokens are auto-exposed as utilities (e.g. `--color-ink` → `text-ink`, `--color-bg` → `bg-bg`, `--spacing-4` → `p-4`). Tailwind v4 integrates via the `@tailwindcss/vite` plugin in `astro.config.mjs`.
- **Content:** Astro content collections — `src/content/work/` for case studies, `src/content/posts/` for insights. Markdown with frontmatter.
- **Icons:** Lucide or Phosphor, or custom SVGs inline. Never emoji-as-icon.
- **Animation:** CSS keyframes + Intersection Observer by default. GSAP only for scroll-driven sequences on the signature moment. Motion/framer-motion only inside React islands if React is introduced.
- **Forms:** Astro API route → Resend for email. Honeypot field + Cloudflare Turnstile.
- **Analytics:** Plausible (self-hosted or cloud). Never Google Analytics without explicit user request.
- **Hosting:** Cloudflare Pages or Netlify. Preview deploys per PR.
- **Node:** use the version pinned in `.nvmrc`. Never assume latest.

If any of the above must change, update this file in the same commit as the change.

---

## 4. Folder structure (enforce)

```
src/
  components/
    ui/              # primitives: Button, Input, Link, Tag
    layout/          # Nav, Footer, BaseLayout
    sections/        # Hero, ServicesGrid, CaseStudyCard, Testimonials, CTA
  content/
    work/            # case study .md files
    posts/           # blog .md files
  layouts/
  pages/
    index.astro
    services.astro
    work/[slug].astro
    work/index.astro
    about.astro
    contact.astro
    404.astro
  styles/
    tokens.css       # CSS variables — source of truth for colors, type, spacing
    global.css       # resets + base
  lib/               # utilities, formatters, constants
public/
  fonts/             # self-hosted woff2
  images/
  og/                # generated OG images
docs/
  roadmap.md         # the phase-by-phase plan
  sitemap.md
  decisions.md       # append-only log of design/arch decisions
```

Never put components directly in `pages/`. Never put pages in `components/`. Never create a new top-level folder without updating this file.

---

## 5. Design tokens (single source of truth)

All tokens live in `src/styles/tokens.css`. Components reference them via Tailwind classes mapped in `tailwind.config.ts` (e.g. `bg-surface`, `text-ink`, `text-ink-muted`, `border-line`, `bg-accent`).

**Color tokens (exactly these, no more):**
`--bg`, `--surface`, `--ink`, `--ink-muted`, `--accent`, `--accent-ink`, `--line`.

**Spacing:** multiples of 4 only — `4, 8, 12, 16, 24, 32, 48, 64, 96, 128`. Use Tailwind's default spacing scale where it matches; avoid arbitrary values like `p-[13px]`.

**Radius philosophy:** hard-edge (0). Applied everywhere — buttons, inputs, cards, images. Never mix in rounded shapes.

**Easing:** default to `cubic-bezier(0.22, 1, 0.36, 1)`. One alternate easing allowed for special cases, documented in `decisions.md`.

**Motion durations:**
- Micro-interactions (hover, button): 150–250ms
- Section reveals: 400–700ms
- Hero entrance (once per session): 800–1500ms max

---

## 6. Typography (pick one pair, commit)

Active pairing: **Geist + Geist Mono** — `Geist` (weights 400, 500) for display and body, `Geist Mono` (weight 400) for numerical and technical emphasis (dashboard figures, code, KPI deltas). Both self-hosted from `/public/fonts/`, licensed under SIL OFL 1.1.

Aesthetic fit: Geist is a contemporary Swiss grotesque with tight rhythm and neutral character — a sibling in spirit to Neue Haas Grotesk / GT America, and a cleaner match for the atmospheric-dark canvas than the original pick.

**Why not the original pair (Neue Haas Grotesk + Berkeley Mono):** both are commercial and require paid licenses the project doesn't yet hold. If/when those licenses are acquired, swap by following the steps in `/public/fonts/README.md` and update this section.

| Direction              | Display                       | Body                      | Mono            |
|------------------------|-------------------------------|---------------------------|-----------------|
| **Active** (Geist)     | Geist (400 / 500)             | Geist (400)               | Geist Mono (400)|
| Editorial technical    | Fraunces or Instrument Serif  | Geist or IBM Plex Sans    | JetBrains Mono  |
| Swiss precision (paid) | Neue Haas Grotesk / GT America| same as display           | Berkeley Mono   |
| Atmospheric dark (paid)| PP Neue Montreal or Söhne     | same as display           | JetBrains Mono  |

All fonts self-hosted as `woff2` in `/public/fonts/`. Preload Geist Regular + Medium in `<head>` (done in `BaseLayout.astro`). `font-display: swap` on all.

No font imports from Google Fonts CDN in production builds. Download once, serve from origin.

---

## 7. Aesthetic direction (commit, don't hedge)

Chosen direction: **Swiss precision on an atmospheric dark canvas.**

- Swiss precision governs **layout and typography**: strict grid, generous whitespace, left-aligned headlines, tight vertical rhythm, no decorative flourishes.
- Atmospheric dark governs the **color palette**: deep near-black `--bg`, quiet `--surface` lift, warm off-white `--ink`, a single warm accent. Light mode exists as a tight inversion — not a separate aesthetic.

Commit to it across the entire site. If a component "feels off the brand", the component is wrong, not the brand. Fix the component. Soft gradients, glassmorphism, and decorative illustration are explicitly out of scope.

---

## 8. Signature moment (pick 1–2, build well)

Active signature concept: **The Optimization Dashboard** — an interactive hero module that plays the role of a warm, optimistic advisor ("the dashboard professor"). Visitors pick a scenario (cloud cost, process time, data quality) and watch live KPIs tilt from "before" to "after" with numbers, deltas, and a one-sentence plain-English read-out per metric.

Constraints:
- Numbers must be honest representative ranges from real engagements, never invented.
- Works without JS (static "after" view rendered server-side; interactivity is progressive).
- Respects `prefers-reduced-motion` — reduced mode fades between states instead of animating counters.
- No chart library on first load — hand-rolled SVG. A charting dep is only allowed if we introduce a second, genuinely dynamic moment later.

One well-executed signature moment outranks five half-done ones. Polish this one to screenshot quality before proposing another.

---

## 9. Coding conventions

- **Components:** PascalCase filenames. One component per file. Props interface named `<Component>Props`, defined in the same file, exported only if reused.
- **Astro components:** use the `.astro` extension and keep them server-rendered. Add `client:*` directives only when interactivity is genuinely needed.
- **Styling:** Tailwind-first. If a style is used more than 3 times and is awkward as a class list, promote it to a component. Never promote to a global CSS utility class.
- **Accessibility:**
  - Semantic HTML — `<header>`, `<nav>`, `<main>`, `<footer>`, one `<h1>` per page.
  - All interactive elements keyboard-reachable with visible focus ring.
  - `alt` on every image (empty `alt=""` is valid only for decorative images — intentional, not missing).
  - Form fields have real `<label>` elements.
  - Color contrast passes WCAG AA.
- **Images:** use Astro's `<Image>` component. Always set explicit width/height. Default `loading="lazy"` except hero.
- **Copy:** write as a senior consultant talking to a peer. Short sentences. Numbers over adjectives. Never use: "solutions" as filler, "seamless", "cutting-edge", "best-in-class", "we empower", "we deliver". If the copy needs these words, the copy is weak — rewrite.

---

## 10. Workflow (how the agent should behave per task)

1. **Read this file and `docs/roadmap.md` before starting any new task.**
2. **Identify the current phase** (check the checklist at the bottom of the roadmap). Do not leap phases unless explicitly instructed.
3. **Before implementing, state briefly:**
   - which phase this task belongs to
   - which files will be created/modified
   - any decision not already covered by this file (flag it — don't silently decide)
4. **Implement in small, reviewable chunks.** After finishing a section (e.g., the Hero, or the Service grid), stop and surface what was built before moving on.
5. **Never "drive through" multiple phases in one turn** without the user confirming.
6. **After each significant decision** (a new dependency, a new pattern, a deviation from this file), append a one-line entry to `docs/decisions.md` with the date, decision, and one-sentence reason.
7. **When in doubt between two options, ask.** Ambiguity is cheaper to resolve with one question than to rework a section.
8. **When a task is done, run the project's checks** (typecheck, build, any tests) before declaring done. Report results.

---

## 11. Quality gates (must pass before any PR merges)

- [ ] Typecheck passes (`astro check`).
- [ ] Build succeeds with no warnings.
- [ ] Lighthouse mobile score ≥ 95 on changed pages (Performance, Accessibility, Best Practices, SEO).
- [ ] axe DevTools scan clean on changed pages.
- [ ] Keyboard nav works end-to-end on changed pages.
- [ ] `prefers-reduced-motion` respected on any new animation.
- [ ] No banned words in committed copy (see §9).
- [ ] No hardcoded colors in committed components (see §2).

---

## 12. Do / Don't quick reference

**Do**
- Commit to one aesthetic direction; execute it precisely.
- Use real numbers, real names, real outcomes in proof sections.
- Ship one signature moment polished to screenshot quality.
- Default to less JS, less motion, fewer sections, shorter copy.
- Write copy that a senior peer would respect.

**Don't**
- Add a new component when an existing one can be extended.
- Use Tailwind's default color palette (`bg-blue-500`, etc.). Use tokens.
- Add placeholder testimonials or made-up metrics.
- Ship animations without a reduced-motion fallback.
- Introduce a CMS, auth, database, or framework change without explicit request.

---

## 13. Context files the agent should always reference

- `docs/roadmap.md` — the 15-phase plan with prompts per phase.
- `docs/sitemap.md` — the URL structure.
- `docs/decisions.md` — append-only decision log. Read before making architectural choices.
- `src/styles/tokens.css` — source of truth for all design tokens (Tailwind v4 `@theme` block).

If any of these files don't exist yet, the first task of the current phase is to create them.

---

## 14. Escalation rules

Pause and ask the user before doing any of the following, even if instructed inside a larger task:

- Installing a package that introduces a new runtime concept (state manager, router, ORM, auth lib).
- Switching frameworks or major libraries.
- Adding tracking, analytics, or third-party scripts beyond Plausible.
- Publishing real client names, logos, or testimonials you weren't explicitly given.
- Deploying to production.
- Modifying this file (`CLAUDE.md`) itself.

---

*This file is short on purpose. Long agent files get skimmed. If a rule is added, make sure it earns its place.*
