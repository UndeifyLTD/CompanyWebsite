import { transformFileSync } from "@babel/core";
import presetReact from "@babel/preset-react";
import { copyFileSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const site = resolve(root, "site");
const source = resolve(site, "src");
const template = readFileSync(resolve(source, "index.template.html"), "utf8");
const components = [
  "Motion.jsx",
  "Primitives.jsx",
  "Illustrations.jsx",
  "HomeSections.jsx",
  "Header.jsx",
  "Footer.jsx",
  "DocPages.jsx",
  "ContactPage.jsx",
  "App.jsx",
];

const compiled = components.map((file) => {
  const result = transformFileSync(resolve(source, file), {
    babelrc: false,
    configFile: false,
    presets: [[presetReact, { runtime: "classic" }]],
    sourceType: "script",
    comments: false,
  });
  return `(() => {\n${result.code}\n})();`;
});
writeFileSync(resolve(site, "assets/app.js"), `${compiled.join("\n")}\n`);

const vendor = resolve(site, "assets/vendor");
mkdirSync(vendor, { recursive: true });
copyFileSync(resolve(root, "node_modules/react/umd/react.production.min.js"), resolve(vendor, "react.production.min.js"));
copyFileSync(resolve(root, "node_modules/react-dom/umd/react-dom.production.min.js"), resolve(vendor, "react-dom.production.min.js"));

const pages = {
  "index.html": {
    canonical: "https://www.undeify.com/",
    title: "Undeify: software we build and stand behind, made in Nigeria",
    description: "Undeify is a Nigerian software company that builds and runs its own products: ShiftOS for teams that work in shifts, and NOW, a social map of Lagos places. Join the NOW beta.",
  },
  "about.html": {
    canonical: "https://www.undeify.com/about.html",
    title: "About Undeify",
    description: "Who Undeify is, how we work and what we are building: our own software, designed and built in Nigeria.",
  },
  "privacy.html": {
    canonical: "https://www.undeify.com/privacy.html",
    title: "Privacy notice | Undeify",
    description: "How Undeify handles personal data on this website, including opt-in analytics and contact enquiries.",
  },
  "terms.html": {
    canonical: "https://www.undeify.com/terms.html",
    title: "Terms of use | Undeify",
    description: "Terms governing your use of the Undeify website.",
  },
  "contact.html": {
    canonical: "https://www.undeify.com/contact.html",
    title: "Contact Undeify",
    description: "Contact Undeify, a Nigerian software company building its own products.",
  },
};

const escapeAttribute = (value) => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
for (const [file, meta] of Object.entries(pages)) {
  const html = template
    .replaceAll("{{TITLE}}", escapeAttribute(meta.title))
    .replaceAll("{{DESCRIPTION}}", escapeAttribute(meta.description))
    .replaceAll("{{CANONICAL}}", escapeAttribute(meta.canonical));
  writeFileSync(resolve(site, file), html);
}

rmSync(resolve(site, "security.html"), { force: true });
rmSync(resolve(site, ".well-known/security.txt"), { force: true });
console.log(`Built ${components.length} JSX modules and ${Object.keys(pages).length} page shells.`);
