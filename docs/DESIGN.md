# DESIGN.md: Vercel's design language, adapted for Undeify (v1, superseded)

> **Superseded on 2026-10-17 (proposal W15 in `docs/decisions.md`).** The site now has its own look, documented in `docs/tokens.md`. This file records how v1 was built and is kept for history; do not follow it for new work.

## Source
- URL: https://vercel.com (home page)
- Capture date: 2026-10-16
- Evidence: Firecrawl `branding` and page markdown; headless Chrome screenshots at 1440px and 390px, plus computed styles of the headings, buttons, header, footer and borders. The scrape files are in `.firecrawl/` on Isaac's machine and are not committed: the screenshots contain Vercel's and its customers' artwork.

## What we take, and what we don't
We take the **design language**: palette, type treatment, spacing, the grid, component shapes, section patterns. Layout and style ideas can't be owned.

We do **not** take anything Vercel owns: its wording, its logo or triangle mark, its illustrations and 3D renders, product screenshots, customer logos and statistics, or its HTML, CSS and code. Everything in `site/` is written from scratch. The one thing we reuse directly is the Geist typeface, which Vercel publishes under the SIL Open Font License (the licence file sits next to the fonts).

## Design summary
Quiet, light, precise. An off-white page, near-black text, one sans-serif with tight negative tracking on big headings, a monospace face for small labels, black and white pill buttons, and white cards outlined by 1px light-grey borders. Big headings sit top-left with plenty of space. Each section pairs a heading, one framed visual and a narrow column of facts. Colour is almost absent: the interest comes from type, alignment and one 3D object in the hero.

## Design tokens

### Colours (observed)
| Role | Value |
|------|-------|
| Page background | #fafafa |
| Card / raised surface | #ffffff |
| Text, buttons | #171717 |
| Secondary text | #4d4d4d |
| Tertiary text (labels) | #8f8f8f (inferred) |
| Border | #ebebeb |
| Subtle fill | #f2f2f2 |
| Focus / link accent | #0070f3-ish blue, hsl(212 100% 48%) |

### Typography (observed)
- Geist Sans for everything; Geist Mono for small uppercase labels and the eyebrow pill.
- H1 64px, weight 400, line-height 1.0, tracking -0.06em.
- H2 56px, weight 450, line-height 1.0, tracking -0.06em.
- Body 16px / 24px. Secondary paragraphs in #4d4d4d.
- Nav and footer 14–16px, weight 400.
- Phone: H1 and H2 come down to about 28–32px.

### Spacing and layout (observed)
- Base unit 4px. Content width 1392px at a 1440px viewport (24px side margins).
- Header 64px tall, sticky, page-coloured with a 1px bottom border.
- Radius: 6px on cards and inputs (observed 6px on the base); buttons are full pills.
- Shadows: none. Edges are 1px borders (a 1px ring on white buttons).
- Sections separated by about 160–200px of space on desktop.

## Components
- **Header:** mark at the left, 3–4 plain links, then a white pill and a black pill at the right. Phone: mark plus a menu icon.
- **Buttons:** 40px tall pills, 12px side padding, weight 500. Primary black with white text; secondary white with a 1px #ebebeb ring.
- **Eyebrow pill:** small monospace uppercase text in a white pill with a border, with a chevron.
- **Hero:** heading and buttons on the left, one 3D object in the centre, a short list of links on the right; a strip of logos below.
- **Feature section:** big heading top-left; a framed card in the middle holding a product visual; on the right, one sentence (dark lead words, grey rest) and a "Features" list in small type.
- **Bento grid:** cards with 1px borders on a white ground, each with a title, one line and a visual.
- **Closing call to action:** centred heading, one black pill.
- **Footer:** a full-width sitemap in 5–7 columns with small headings, then a bottom row with legal links.

## Page patterns
Hero → logo strip → three feature sections → bento grid → centred call to action → sitemap footer. On phones everything stacks into one column: the 3D object first, then the heading centred, full-width buttons, then each feature section as heading, visual, sentence and list.

## Content style
Short declarative headings (5–8 words), sentence case. CTAs are verbs ("Deploy now", "Talk to sales"). Each section's proof is a single concrete sentence.

## How Undeify uses it (agent build instructions)
1. Tokens as above, as custom properties in `site/assets/site.css`. Fonts self-hosted.
2. Our own mark (a black U) and wordmark. Never a triangle.
3. Hero: our own headline and buttons; the centre object is Undeify's: three product panes stacked in CSS 3D that lean toward the pointer and fan apart as you scroll.
4. The logo strip becomes a strip of true facts (we have no customer logos and won't fake them).
5. Feature sections for NOW and ShiftOS. Their visuals are simple diagrams drawn in HTML and CSS, labelled as illustrations, until real screenshots exist. Feature lists only name things the products really do or plan.
6. The bento grid holds how we work: security, Nigerian law, own products, size, plus the product in research.
7. Closing call to action: email us. Footer: our sitemap and legal links.
8. Reduced motion: no 3D movement. No JavaScript: everything still readable.

## Rerun inputs
workflow: firecrawl-website-design-clone
source_url: https://vercel.com
target_stack: static HTML and CSS
output: docs/DESIGN.md
