# Undeify website: spec

This folder is the specification for the Undeify company website. The founders and Junior write it; the code in `site/` follows it (Copilot rules: `.github/copilot-instructions.md`).

| File | What it holds |
|------|---------------|
| `decisions.md` | Every choice and its status |
| `tokens.md` | Colours, type, spacing |
| `../site/src/` | React source for the page content and layout |
| `../site/` | Build output and static assets |
| `DESIGN.md` | Vercel's design language as we use it, and what we must not copy |
| `../tools/` | `build_site.mjs` (precompiles JSX and generates page shells), `capture.mjs` (screenshots) |

Figma file: https://www.figma.com/design/Hwsdaunvh7t4BMdTTnmM9U holds the first design, which was dropped on 2026-10-16. The current design is not in Figma yet.

## Run it locally

Install dependencies with `npm ci`, then run `npm run build`. Start a local server with `npm start` and open `http://localhost:5174/`. Page copy lives in `site/src/*.jsx`; the build precompiles it into the files served from `site/`.

## Deploy

The website is currently configured for Vercel with `site/` as the output directory. Do not deploy this replacement until it has been tested locally and Isaac separately authorizes deployment.
