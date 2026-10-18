# Design tokens

The site's visual system. The live values are the custom properties at the top of `site/assets/site.css`; keep them in sync with this file and `docs/DESIGN.md`.

## Colour

| Token | Value | Use |
|-------|-------|-----|
| `--bg` | #f1e8e4 | Warm page background |
| `--surface` | #fbf8f5 | Cards and light panels |
| `--fill` | #e5efeb | Quiet panel fill |
| `--ink` | #090909 | Main text and outlines |
| `--ink-2` | #49413d | Secondary text |
| `--ink-3` | #756a65 | Small labels |
| `--line` | #746963 | Fine rules and outlines |
| `--sky` | #78c9e7 | Illustration accent |
| `--teal` | #168e78 | Illustration accent |
| `--coral` | #ed565a | Illustration accent |
| `--yellow` | #ffc544 | Illustration accent |
| `--blue` | #315fa7 | Illustration accent and focus ring |
| `--focus` | #315fa7 | Keyboard focus ring |

Use the accents in illustrations and selected section details, not as extra copy. Keep page text black or neutral. Outlines are fine 1px rules; do not add decorative drop shadows.

## Type

Geist Sans (variable, 100–900) for everything; Geist Mono for small uppercase labels, pills and the facts strip. Self-hosted from `site/assets/fonts/`.

| Token | Size | Use |
|-------|------|-----|
| `--h1` | 48–136px, weight 700, tracking -0.07em | Hero headline |
| `--h2` | 32–72px, weight 650, tracking -0.06em | Section headings |
| `--h3` | 24px, weight 600 | Card titles |
| `--lead` | 20–24px | Claims and about text |
| `--body` | 16px | Running text, buttons |
| `--small` | 14px | Nav, lists, footer |
| `--label` | 12px mono, uppercase | Labels and pills |

## Space and shape

- Side margin `--margin` 24px; content width `--max` 1392px.
- Section gap `--section` 96–192px.
- Header 64px, sticky, fine bottom rule.
- Buttons: 40px high, outlined or ink-filled with compact corners; 32px small and 44px full-width on phones. Cards and frames use square or lightly softened corners.

## Breakpoints

The page is a container: tablet layout at 1000px wide or less, phone layout at 720px or less.
