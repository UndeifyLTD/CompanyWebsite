// Vercel Web Analytics is available on the deployed site, not in a local preview.
(() => {
  const host = location.hostname;
  if (host !== "undeify.com" && host !== "www.undeify.com" && !host.endsWith(".vercel.app")) return;
  const script = document.createElement("script");
  script.defer = true;
  script.src = "/_vercel/insights/script.js";
  document.head.append(script);
})();
