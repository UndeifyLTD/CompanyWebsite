# Design tokens

The only colours, type and spacing the site may use. The live values are the custom properties at the top of `site/assets/site.css`; this file must match them.

## Colour

| Token | Value | Use |
|-------|-------|-----|
| `--navy` | #0e1726 | Dark ground: the stage at night, the contact band, the research band |
| `--navy-2` | #1a2638 | The NOW band (one tone step up from navy) |
| `--ivory` | #eeede9 | Paper: the page ground |
| `--stone` | #dedad2 | The ShiftOS band (one tone step down from ivory) |
| `--ink` | #141a24 | Text on ivory and stone |
| `--muted` | #554c42 | Secondary text on ivory and stone (7:1) |
| `--ink-inv` | #eeede9 | Text on navy |
| `--muted-inv` | #bdb5a8 | Secondary text on navy (8:1) |
| `--amber` | #e3a04a | The one accent: buttons, the footer field, the NOW tab |
| `--amber-ink` | #0e1726 | Text on amber |

No gradients, shadows, glass or outlines. The one exception is the dark scrim under the hero text on phones.

## Type

One family: **Boska** (400, 400 italic, 500), self-hosted from `site/assets/fonts/`. Fallback: Georgia.

| Step | Size | Use |
|------|------|-----|
| `--step-small` | 14px | Notes, meta lines, facts |
| `--step-body` | 17–19px | Running text |
| `--step-lead` | 22–34px | Statements, the intro lead, tabs, the wordmark |
| `--step-head` | 32–64px | Section headings |
| `--step-display` | 44–108px | The hero headline |

The footer email is set to fill the width (up to 160px). Headlines: tracking -0.02em, leading 0.95. Body: leading 1.5.

## Space

- Page margin `--margin`: 16–36px.
- Column gap `--gutter`: 16–32px. 12-column grid.
- Section gap `--section`: 96–192px.
- The axis `--axis`: 42% of the width. Headings and lead text start on it on desktop.
- One corner radius everywhere: 0.

## Breakpoint

One: the page is a container, and at 760px wide or less the phone layout applies (`@container page (max-width: 760px)`).
