# Decisions

Every choice for the site, with its status. Copilot builds only what is **Approved**. A founder (Isaac or Tolu) moves an item to Approved; nothing is approved by being written here.

Statuses: Proposed · Approved · Rejected

On 2026-10-16 Isaac handed every v1 decision to Junior ("make all the decisions and build the site"). They are marked **Junior's call** below: built into v1, waiting for a founder to approve or change them.

| # | Decision | Status | Notes |
|---|----------|--------|-------|
| W1 | The site's job: pass company verification (Apple, Google Play, D-U-N-S, payment providers) and make a stranger trust Undeify in 30 seconds. | Approved | Isaac accepted Junior's recommendation, 2026-10-16. |
| W2 | Pages: Home (stage, intro, products, about, contact), Privacy notice, Terms of use, Security, plus `/.well-known/security.txt`. Company details live in the About section until CAC registration is done. | Junior's call | No blog, careers, contact form or analytics. |
| W3 | Stack: plain HTML and CSS with one small script (`site/assets/site.js`), no framework, no dependencies. Hosted on Cloudflare Pages, serving the `site/` folder. | Junior's call | Cloudflare Pages is free and allows commercial use. |
| W4 | Contact: `mailto:` links to hello@undeify.com. | Junior's call | undeify.com uses Namecheap email forwarding (MX records checked 2026-10-16); confirm hello@ is set up to forward. |
| W5 | Company name on the site: "Undeify" only, no "Ltd", until CAC registration is complete. The reservation number never appears. | Approved | Isaac, 2026-10-16. |
| W6 | Domain: undeify.com | Junior's call | Registered, Namecheap nameservers (checked 2026-10-16). Tolu to confirm it is ours. |
| W7 | Logo: the word "Undeify" set in Boska 500; favicon is an amber U on navy (`site/assets/favicon.svg`). | Junior's call | A drawn mark can come later. |
| W8 | Colours and type: see `docs/tokens.md`. One typeface, Boska (Fontshare, free for commercial use), self-hosted. | Junior's call | |
| W9 | Products listed: NOW (in design, private beta in Lagos), ShiftOS (running in production), and a Yorùbá learning app "in research" without its working name (trademark search pending). MindBridge and BakeFlow are left off. | Junior's call | No invented features, customers or numbers. |
| W10 | The hero: one pinned scroll scene. Night room → the frame swings into a window (3D tilt) → sunrise → daylight rising from the bottom edge. Desktop leans toward the pointer. Reduced motion keeps only cross-fades; without JavaScript it is one still screen. | Junior's call | From the ChatGPT brief, cut to one transition (Isaac accepted the cut). |
| W11 | Imagery: three scenes cropped from the AI reference collage (`design/source/`), labelled "Scenes generated for Undeify" in the footer; two Unsplash architecture photographs for ShiftOS and the research band, credited in the footer. | Junior's call | The scenes are upscaled from about 600px wide and look soft on large screens. Replace with the full-size originals. |
| W12 | Security headers in `site/_headers`: a strict Content-Security-Policy (no third-party anything), HSTS, no framing, no sniffing. | Junior's call | |
