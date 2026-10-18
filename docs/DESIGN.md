# Undeify visual direction

## Direction

An editorial, art-school poster sensibility: warm paper, giant assertive typography, fine dark rules, and a small palette of vivid colors. Layouts feel composed rather than corporate, with large type and abstract geometric artwork creating energy around the real product information.

The user-provided reference is a mood reference, not an asset to reproduce. Do not reuse its artwork, people, wording, logos, layout, or attribution. Undeify's illustrations are original CSS and HTML abstractions: circles, cut-paper shapes, stripes, and simple diagrams. Do not invent customers, product claims, statistics, or visualized product behavior.

## Design tokens

The authoritative palette, typography, spacing, shapes, and breakpoints are in [`tokens.md`](./tokens.md). CSS custom properties in `site/assets/site.css` must match them. Accents belong to abstract artwork and selected visual details; keep the content readable with the documented neutral text colors.

## Typography

Use the self-hosted Geist family already in `site/assets/fonts/`. Heavy, tightly tracked uppercase display styling gives headings the poster-like character. Keep body copy at a comfortable reading size and preserve its wording and sentence case in the HTML. Use Geist Mono for labels, pills, and compact technical details.

## Components and page structure

- **Header:** compact sticky navigation on warm paper, fine rule, black wordmark, simple rectangular buttons. At phone widths, use the existing accessible menu.
- **Hero:** very large headline and existing calls to action. CSS-only abstract shapes provide a lively backdrop without competing with the words. Keep the product links and facts visible.
- **Product sections:** retain the approved section order and all existing copy. Give diagrams stronger editorial color-block composition, with their existing illustration captions.
- **Recently shipped:** keep the existing approved cards, using fine dark outlines, geometric accents, and strong type hierarchy.
- **Documents:** use the same paper background, display headings, fine rules, and body typography; prioritize legibility over decoration.
- **Consent:** keep the existing opt-in choices and privacy link accessible and visible without obscuring page content.
- **Footer:** preserve the existing sitemap and legal links.

## Behavior and accessibility

Keep semantic HTML, real links and buttons, visible keyboard focus, descriptive alt text where images exist, and reduced-motion support. CSS art is decorative and must not add accessible names or communicate product facts. The site remains plain HTML and CSS with its existing small scripts; add no dependencies, embeds, or tracking.

## Responsive layout

Support 390px, 768px, and 1440px viewports without horizontal page scrolling. Stack editorial layouts and diagrams at the documented phone breakpoint. Keep body text, controls, and navigation comfortably readable and operable.
