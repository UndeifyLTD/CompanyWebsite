# Instructions for GitHub Copilot

This repo is the Undeify company website. The design and content are decided by the founders and written down in `docs/`. Your job is to turn that spec into code exactly. You are not the designer or the copywriter.

## Source of truth, in order

1. `site/` — the built v1 site. Its copy and layout are approved content; change them only when asked.
2. `docs/decisions.md` — what is decided and why.
3. `docs/tokens.md` — the only colours, fonts, sizes and spacing allowed.
4. The Figma file linked in `docs/README.md` — visual reference for the spec. Where Figma and the spec disagree, stop and ask; do not pick one.

Only build pages and sections that have a status of **Approved** in `docs/decisions.md`. If a page is not approved, do not create it.

## Never

- Never write copy. No placeholder text, no "Lorem ipsum", no invented taglines, features, customers, testimonials, statistics, logos, prices or dates. If text you need is not already in `site/`, leave a visible `TODO(copy): <what is missing>` and say so.
- Never add a colour, font, size, shadow, gradient or spacing value that is not in `docs/tokens.md`.
- Never add a dependency, framework, build tool, analytics, tracking script, cookie or third-party embed. The site is plain HTML and CSS in `site/`, plus the one small script `site/assets/site.js`.
- Never add a form that sends data anywhere. Contact is a `mailto:` link.
- Never write "Ltd", "Limited", an RC number or a registration number unless a founder supplies it.
- Never put secrets, keys or tokens in the repo.

## Always

- Semantic HTML, real links and buttons, visible focus styles, alt text that describes the picture, and `prefers-reduced-motion` support.
- Works at 390px, 768px and 1440px wide with no horizontal scroll.
- When unsure, ask in the pull request instead of guessing.
