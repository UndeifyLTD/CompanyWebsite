# Undeify Company Website

## Local development

```powershell
npm ci
npm run build
npm start
```

Open `http://127.0.0.1:5174/`. The production site remains unchanged until a separate deployment is authorized.

React and the fonts are self-hosted. JSX is compiled during the build; visitors do not load Babel. Google Analytics loads only after consent, and the contact form stays disabled until its endpoint and data-handling settings are approved.
