# Instructions for GitHub Copilot

This repo is the Undeify company website. The design and content are decided by the founders and written down in `docs/`. Your job is to turn that spec into code exactly. You are not the designer or the copywriter.

## Source of truth, in order

1. `site/src/` — the React source for the production website. `site/` also contains build output and static assets.
2. `docs/decisions.md` — what is decided and why.
3. `docs/tokens.md` — the only colours, fonts, sizes and spacing allowed.
4. The Figma file linked in `docs/README.md` — visual reference for the spec. Where Figma and the spec disagree, stop and ask; do not pick one.

Only build pages and sections that have a status of **Approved** in `docs/decisions.md`. If a page is not approved, do not create it.

## Never

- Never write copy. No placeholder text, no "Lorem ipsum", no invented taglines, features, customers, testimonials, statistics, logos, prices or dates. If text you need is not already in `site/`, leave a visible `TODO(copy): <what is missing>` and say so.
- Never add a colour, font, size, shadow, gradient or spacing value that is not in `docs/tokens.md`.
- Do not introduce unapproved dependencies or tracking. The React runtime is self-hosted; JSX must be precompiled before deployment, with no runtime Babel or `unsafe-eval`.
- Preserve opt-in Google Analytics consent and Vercel Web Analytics. Google Analytics must not load before explicit consent.
- Contact enquiries use the approved same-origin form and Resend backend. Keep sending fail-closed until `Resend_API_key` and a sender at a verified domain are configured in Vercel, transfer safeguards are reviewed, and a Vercel Firewall rate limit protects `POST /api/contact`. Never commit secrets. The form always sends only to `hello@undeify.com`; preserve the white copy-address controls.
- The Security page and `security.txt` are intentionally absent. Keep protective HTTP security headers and CSP restrictions.
- Never write "Ltd", "Limited", an RC number or a registration number unless a founder supplies it.
- Never put secrets, keys or tokens in the repo.

## Always

- Semantic HTML, real links and buttons, visible focus styles, alt text that describes the picture, and `prefers-reduced-motion` support.
- Works at 390px, 768px and 1440px wide with no horizontal scroll.
- Run `npm ci`, `npm run build` and local browser checks after changing app code.
- Never deploy or push without explicit founder authorization.
- When unsure, ask in the pull request instead of guessing.
