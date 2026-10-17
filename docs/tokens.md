# Design tokens

The only colours, type and spacing the site may use. The live values are the custom properties at the top of `site/assets/site.css`; this file must match them. Direction: `docs/decisions.md` W15 (Undeify's own look; v1's Vercel look is described in `docs/DESIGN.md` for history).

## Colour

| Token | Value | Use |
|-------|-------|-----|
| `--bg` | #f4f1e8 | Page background (warm paper) |
| `--surface` | #fbf9f2 | Cards, illustration frames |
| `--fill` | #eae5d6 | Hover fills, empty cells |
| `--ink` | #10231a | Text, dark buttons, the facts band and the Security section |
| `--ink-2` | #3c4f45 | Secondary text |
| `--ink-3` | #5e6f65 | Small labels |
| `--line` / `--line-2` | #cfc9b6 / #ddd7c6 | Dividers and card rings, always 1px |
| `--green` | #0f6b3c | The one accent: ShiftOS panel, labels, big figures, links on hover |
| `--gold` | #f2c230 | The one highlight: NOW panel, the word "here.", stickers, morning shifts |
| `--night` | #0a1710 | Code panels inside the dark Security section |
| `--focus` | hsl(212 100% 48%) | Keyboard focus ring only |

Never put gold text on paper (too little contrast); gold is a background or sits on dark. No gradients. No shadows except a 1px ring or a soft card shadow on illustrations.

## Type

Bricolage Grotesque (variable, 200-800) for headlines and numbers; Geist Sans for running text; Geist Mono for small uppercase labels, the facts band and code. All self-hosted from `site/assets/fonts/`.

| Token | Size | Use |
|-------|------|-----|
| hero h1 | 48-116px, weight 700, tracking -0.045em | Home headline |
| `.h2` | 36-68px, weight 700, tracking -0.04em | Section headings |
| panel h3 | 34-60px, weight 700 | Product panel headings |
| card h3 | 26px, weight 700 | Cards |
| lede | 19-20px | Intro sentences |
| body | 17px | Running text |
| label | 12-13px mono, uppercase, tracking 0.08em | Eyebrows, statuses, footer headings |

## Space and shape

- Side margin `--margin` 24px; content width `--max` 1280px.
- Section gap 80px on phones, 120px on desktop.
- Header 72px, sticky, no border.
- Buttons are 44px pills (40px small, 52px large). Panels 28px radius (22px on phones), cards 24px, code panels 16px.
- Illustrations tilt by 1.5 degrees; nothing else rotates except the "Lagos first" sticker.

## Breakpoints

The page is a container: tablet layout at 1000px wide or less, phone layout at 720px or less.
