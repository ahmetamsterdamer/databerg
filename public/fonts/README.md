# /public/fonts/

Fonts are **self-hosted** (CLAUDE.md §6 bans Google Fonts CDN in production). All files are committed to the repo.

## Current typefaces

| Family       | File                      | Weight | License          |
|--------------|---------------------------|--------|------------------|
| Geist        | `Geist-Regular.woff2`     | 400    | SIL OFL 1.1      |
| Geist        | `Geist-Medium.woff2`      | 500    | SIL OFL 1.1      |
| Geist Mono   | `GeistMono-Regular.woff2` | 400    | SIL OFL 1.1      |

License text: [Geist-LICENSE.txt](./Geist-LICENSE.txt). Source: https://vercel.com/font (repo: https://github.com/vercel/geist-font).

## History

Originally scoped to Neue Haas Grotesk (Linotype/Monotype, commercial) + Berkeley Mono (Berkeley Graphics, commercial). Swapped to Geist / Geist Mono on 2026-04-21 because commercial licenses cannot be acquired without purchase. See `docs/decisions.md` for the decision record. If the user later licenses the commercial pair, swap by:

1. Dropping the new `woff2` files into this folder.
2. Updating the `@font-face` blocks in `src/styles/global.css`.
3. Updating `--font-display` / `--font-body` / `--font-mono` in `src/styles/tokens.css`.
4. Updating the `<link rel="preload">` tags in `src/layouts/BaseLayout.astro`.
5. Updating CLAUDE.md §6 and logging in `docs/decisions.md`.

## Not allowed

- Google Fonts CDN imports (banned by `CLAUDE.md` §6).
- Any of: Inter, Roboto, Arial, Poppins, Montserrat, or system-ui fallback stacks (banned by `CLAUDE.md` §2).
