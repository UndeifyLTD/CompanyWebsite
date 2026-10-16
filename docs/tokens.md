# Design tokens

The only colours, type and spacing the site may use. The live values are the custom properties at the top of `site/assets/site.css`; this file must match them. Where they come from: `docs/DESIGN.md`.

## Colour

| Token | Value | Use |
|-------|-------|-----|
| `--bg` | #fafafa | Page background |
| `--surface` | #ffffff | Cards, frames, white buttons |
| `--fill` | #f2f2f2 | Subtle fills inside diagrams, hover on white buttons |
| `--ink` | #171717 | Text, black buttons, the logo |
| `--ink-2` | #4d4d4d | Secondary text |
| `--ink-3` | #737373 | Small labels (4.6:1 on the background) |
| `--line` | #ebebeb | Every border and divider, always 1px |
| `--focus` | hsl(212 100% 48%) | Keyboard focus ring only |

No shadows except 1px rings. No colour accents.

## Type

Geist Sans (variable, 100–900) for everything; Geist Mono for small uppercase labels, pills and the facts strip. Self-hosted from `site/assets/fonts/`.

| Token | Size | Use |
|-------|------|-----|
| `--h1` | 40–64px, weight 400, tracking -0.06em | Hero headline |
| `--h2` | 32–56px, weight 450, tracking -0.06em | Section headings |
| `--h3` | 24px, weight 500 | Card titles |
| `--lead` | 20–24px | Claims and about text |
| `--body` | 16px | Running text, buttons |
| `--small` | 14px | Nav, lists, footer |
| `--label` | 12px mono, uppercase | Labels and pills |

## Space and shape

- Side margin `--margin` 24px; content width `--max` 1392px.
- Section gap `--section` 96–192px.
- Header 64px, sticky, 1px bottom line.
- Buttons: 40px pills (32px small, 44px full-width on phones). Cards and frames: 12px radius.

## Breakpoints

The page is a container: tablet layout at 1000px wide or less, phone layout at 720px or less.
