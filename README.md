# Undeify Company Website

## Local development

```powershell
npm ci
npm run build
npm start
```

Open `http://127.0.0.1:5174/`. This static preview does not run the Vercel API function; use Vercel's local development tooling for end-to-end form delivery. The production site remains unchanged until a separate deployment is authorized.

React and the fonts are self-hosted. JSX is compiled during the build; visitors do not load Babel. Google Analytics loads only after consent. The contact form sends messages to hello@undeify.com through a same-origin Vercel function and Resend. The API sends nothing until configured.

## Contact form setup

In the Vercel project, configure these environment variables without adding them to the repository:

- `Resend_API_key`: a Resend API key with permission to send email. The name must match the Vercel environment variable exactly.
- `RESEND_FROM_EMAIL`: a sender address on a domain verified in Resend.
- `CONTACT_FORM_ENABLED`: set to `true` only after the Resend account and sender are ready, Resend's data-processing and transfer safeguards have been reviewed, and a Vercel Firewall rate-limit rule protects `POST /api/contact`.

The recipient is fixed to `hello@undeify.com`. Until all three variables and the safeguards are in place, the API returns an explicit unavailable response and the form offers the direct email fallback. Do not commit secrets or enable the endpoint before the rate limit is active.
