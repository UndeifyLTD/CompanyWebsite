# Undeify website: spec

This folder is the specification for the Undeify company website. The founders and Junior write it; the code in `site/` follows it (Copilot rules: `.github/copilot-instructions.md`).

| File | What it holds |
|------|---------------|
| `decisions.md` | Every choice and its status |
| `tokens.md` | Colours, type, spacing |
| `../site/` | The built site, the source of truth for copy and layout in v1 |
| `DESIGN.md` | Vercel's design language as we use it, and what we must not copy |
| `../tools/` | `build_docs.py` (privacy, terms, security pages), `capture.mjs` (screenshots) |

Figma file: https://www.figma.com/design/Hwsdaunvh7t4BMdTTnmM9U holds the first design, which was dropped on 2026-10-16. The current design is not in Figma yet.

## Run it locally

Open `site/index.html` in a browser. To change the legal pages, edit `tools/build_docs.py` and run `python -I tools/build_docs.py`.

## Deploy

Cloudflare Pages, connected to this repo: build command none, output directory `site`. Custom domain undeify.com.
