# Decisions

Every choice for the site, with its status. Copilot builds only what is **Approved**. A founder (Isaac or Tolu) moves an item to Approved; nothing is approved by being written here.

Statuses: Proposed · Approved · Rejected

On 2026-10-16 Isaac handed every v1 decision to Junior ("make all the decisions and build the site"). They are marked **Junior's call** below: built into v1, waiting for a founder to approve or change them.

| # | Decision | Status | Notes |
|---|----------|--------|-------|
| W1 | The site's job: pass company verification (Apple, Google Play, D-U-N-S, payment providers) and make a stranger trust Undeify in 30 seconds. | Approved | Isaac accepted Junior's recommendation, 2026-10-16. |
| W2 | Pages: Home (hero, facts strip, NOW, ShiftOS, how we build, about, closing call), Privacy notice, Terms of use, Security, plus `/.well-known/security.txt`. Company details live in About until CAC registration is done. | Junior's call | No blog, careers, contact form or analytics. |
| W3 | Stack: plain HTML and CSS with one small script (`site/assets/site.js`), no framework, no dependencies. Hosted on Cloudflare Pages, serving the `site/` folder. | Junior's call | Cloudflare Pages is free and allows commercial use. |
| W4 | Contact: `mailto:` links to hello@undeify.com. | Junior's call | undeify.com uses Namecheap email forwarding (MX records checked 2026-10-16); confirm hello@ is set up to forward. |
| W5 | Company name on the site: "Undeify" only, no "Ltd", until CAC registration is complete. The reservation number never appears. | Approved | Isaac, 2026-10-16. |
| W6 | Domain: undeify.com | Junior's call | Registered, Namecheap nameservers (checked 2026-10-16). Tolu to confirm it is ours. |
| W7 | Logo: a white U in a black rounded square, beside the word "Undeify" in Geist 600 (`site/assets/favicon.svg`). | Junior's call | Replaced the Boska wordmark on 2026-10-16. A designed mark can come later. |
| W8 | Visual style: Vercel's design language (Isaac, 2026-10-16), described in `docs/DESIGN.md`; tokens in `docs/tokens.md`. Geist Sans and Geist Mono, self-hosted under the SIL Open Font License. | Approved (style) | Isaac chose the Vercel look and dropped the first design. Nothing Vercel owns is copied: no copy, logo, images or code. |
| W9 | Products listed: NOW (in design, private beta in Lagos), ShiftOS (running in production), and a Yorùbá learning app "in research" without its working name (trademark search pending). MindBridge and BakeFlow are left off. | Junior's call | No invented features, customers or numbers. |
| W10 | The hero's 3D object: three product panes (NOW, ShiftOS, in research) stacked in CSS 3D. They lean toward the pointer on desktop and fan apart as you scroll. Reduced motion: still. | Junior's call | Replaced the cinematic photo scroll on 2026-10-16. |
| W11 | Imagery: no photographs. NOW and ShiftOS are shown with simple diagrams drawn in HTML and CSS, each captioned "Illustration, not a screenshot". | Junior's call | Swap in real screenshots when the products have them. |
| W12 | Security headers in `site/_headers`: a strict Content-Security-Policy (no third-party anything), HSTS, no framing, no sniffing. | Junior's call | |
