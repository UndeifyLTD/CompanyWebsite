# Decisions

Every choice for the site, with its status. Copilot builds only what is **Approved**. A founder (Isaac or Tolu) moves an item to Approved; nothing is approved by being written here.

Statuses: Proposed · Approved · Rejected

On 2026-10-16 Isaac handed every v1 decision to Junior ("make all the decisions and build the site"). They are marked **Junior's call** below: built into v1, waiting for a founder to approve or change them.

| # | Decision | Status | Notes |
|---|----------|--------|-------|
| W1 | The site's job: pass company verification (Apple, Google Play, D-U-N-S, payment providers) and make a stranger trust Undeify in 30 seconds. | Approved | Isaac accepted Junior's recommendation, 2026-10-16. |
| W2 | Pages: Home (hero, facts row, NOW, ShiftOS, Recently shipped, closing call, footer), About, Privacy notice, Terms of use and Contact. Company details live in About until CAC registration is done. | Approved | Isaac selected the handoff prototype to replace the production interface on 2026-10-21. The prior Security page and `/.well-known/security.txt` are removed from the site. |
| W3 | Stack: React with JSX precompiled at build time; self-host the React runtime and fonts. No runtime Babel or `unsafe-eval`. | Approved | Isaac approved the production replacement on 2026-10-21. Build command `npm run build`, output directory `site`. |
| W4 | Contact: shared form for Contact and Email us; keep submission disabled until its Formspree endpoint and privacy, retention and transfer settings are approved. | Approved | Isaac approved the prototype's contact form on 2026-10-21. Direct email remains available as fallback; no submission may be claimed while the endpoint is blank. |
| W5 | Company name on the site: "Undeify" only, no "Ltd", until CAC registration is complete. The reservation number never appears. | Approved | Isaac, 2026-10-16. |
| W6 | Domain: undeify.com | Junior's call | Registered, Namecheap nameservers (checked 2026-10-16). Tolu to confirm it is ours. |
| W7 | Logo: the copper U holding a white dot, in a black rounded square, beside the word "Undeify" in Geist 600 (`site/assets/favicon.svg`, drawn from `docs/brand/undeify-logo.jpg`). | Junior's call | Replaced the Boska wordmark on 2026-10-16. A designed mark can come later. On 2026-10-16 the favicon, app icons and share card moved to the new copper U logo (`docs/brand/undeify-logo.jpg`, built by `tools/make_icons.py`); the header and footer switched to the same mark the same day. |
| W8 | Visual style: Vercel's design language (Isaac, 2026-10-16), described in `docs/DESIGN.md`; tokens in `docs/tokens.md`. Geist Sans and Geist Mono, self-hosted under the SIL Open Font License. | Approved (style) | Isaac chose the Vercel look and dropped the first design. Nothing Vercel owns is copied: no copy, logo, images or code. |
| W9 | Products listed: NOW (in design, private beta in Lagos), ShiftOS (running in production), and a Yorùbá learning app "in research" without its working name (trademark search pending). MindBridge and BakeFlow are left off. | Junior's call | No invented features, customers or numbers. |
| W10 | The hero has no 3D object or product-link list: headline, buttons and the "Built in Nigeria" pill are centered. | Approved | Updated at founder request on 2026-10-18. |
| W11 | Imagery: no photographs. NOW and ShiftOS are shown with simple diagrams drawn in HTML and CSS, each captioned "Illustration, not a screenshot". | Junior's call | Swap in real screenshots when the products have them. |
| W12 | Protective response headers in `site/vercel.json`: strict Content-Security-Policy, HSTS with subdomains, no framing, no sniffing, a locked-down Permissions-Policy and cross-origin isolation (COOP, COEP, CORP). | Junior's call | Keep these controls even though the Security page and `security.txt` are removed. CSP does not allow `unsafe-eval` or `unsafe-inline`. |
| W13 | Analytics: Google Analytics 4 (`G-YMEL5ZY0SJ`), loaded only after the visitor accepts in a consent banner (`site/assets/consent.js`). Ad storage, Google signals and ad personalisation are off; cookies last 13 months; "Cookie settings" in the footer withdraws consent and deletes the cookies. The privacy notice describes it. | Approved | Requested by the founder (GitHub: Steezy7) on 2026-10-16. |
| W14 | Visit counts for every visitor: Vercel Web Analytics (`/_vercel/insights/script.js`), cookie-free, so it runs without the consent banner. Google Analytics stays behind consent (W13). | Approved | Requested by the founder (GitHub: Steezy7) on 2026-10-16 to see every visit; enabled in the Vercel project's Analytics tab. |
| W15 | Replace the production interface with the handoff prototype; test locally before deployment. Preserve consent and analytics; keep the prototype form fail-closed; remove the Security page and `security.txt`. | Approved | Isaac approved the scope and precompiled React approach on 2026-10-21. Deployment is not authorized by this decision. |
