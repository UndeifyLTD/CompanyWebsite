# Undeify website: spec

This folder is the specification for the Undeify company website. The founders and Junior write it; the code in `site/` follows it (Copilot rules: `.github/copilot-instructions.md`).

| File | What it holds |
|------|---------------|
| `decisions.md` | Every choice and its status |
| `tokens.md` | Colours, type, spacing |
| `../site/` | The built site, the source of truth for copy and layout in v1 |
| `../design/source/` | The AI reference collage and the scene crops the site's images come from |
| `../tools/` | `build_docs.py` (privacy, terms, security pages), `capture.mjs` (screenshots), `figma_doc.py` + `figma_flatten.mjs` (export to Figma) |

Figma file: https://www.figma.com/design/Hwsdaunvh7t4BMdTTnmM9U (page "Website v1": desktop and phone home, plus three hero scroll moments each). Text in Figma shows a fallback font until Boska is installed on the viewing machine (free from fontshare.com).

## Run it locally

Open `site/index.html` in a browser. To change the legal pages, edit `tools/build_docs.py` and run `python -I tools/build_docs.py`.

## Deploy

Cloudflare Pages, connected to this repo: build command none, output directory `site`. Custom domain undeify.com.
