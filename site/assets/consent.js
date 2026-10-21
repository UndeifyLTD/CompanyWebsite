// Load Google Analytics only after explicit consent; keep cookie settings available on every route.
(() => {
  const ID = "G-YMEL5ZY0SJ";
  const KEY = "undeify-consent";
  const read = () => {
    try { return localStorage.getItem(KEY); } catch { return null; }
  };
  const save = (value) => {
    try { localStorage.setItem(KEY, value); } catch { return false; }
    return true;
  };

  let loaded = false;
  let banner = null;
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }

  const loadAnalytics = () => {
    if (loaded) return;
    loaded = true;
    window[`ga-disable-${ID}`] = false;
    gtag("consent", "default", {
      analytics_storage: "granted",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
    gtag("js", new Date());
    gtag("config", ID, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      cookie_expires: 60 * 60 * 24 * 395,
    });
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${ID}`;
    document.head.append(script);
  };

  const clearAnalyticsCookies = () => {
    const host = location.hostname;
    const domains = ["", host, `.${host}`, `.${host.split(".").slice(-2).join(".")}`];
    for (const cookie of document.cookie.split(";")) {
      const name = cookie.split("=")[0].trim();
      if (!/^_ga(_|$)/.test(name)) continue;
      for (const domain of domains) {
        document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ""}`;
      }
    }
  };

  const close = () => {
    banner?.remove();
    banner = null;
  };

  const placeBanner = () => {
    if (!banner) return;
    const main = document.querySelector("#root main");
    if (!main) return;

    const hero = main.querySelector(":scope > .hero");
    if (hero && (banner.parentElement !== main || hero.nextElementSibling !== banner)) {
      hero.after(banner);
    } else if (!hero && (banner.parentElement !== main || main.lastElementChild !== banner)) {
      main.append(banner);
    }
  };

  const root = document.getElementById("root");
  if (root) {
    new MutationObserver(placeBanner).observe(root, { childList: true, subtree: true });
  }

  const choose = (value) => {
    save(value);
    close();
    if (value === "granted") {
      loadAnalytics();
      return;
    }
    if (loaded) {
      gtag("consent", "update", { analytics_storage: "denied" });
      window[`ga-disable-${ID}`] = true;
    }
    clearAnalyticsCookies();
  };

  const open = (focus = false) => {
    if (banner?.isConnected) {
      if (focus) {
        banner.scrollIntoView({ block: "start" });
        banner.querySelector("button")?.focus();
      }
      return;
    }

    banner = document.createElement("section");
    banner.className = "consent";
    banner.setAttribute("aria-label", "Cookie choice");

    const text = document.createElement("p");
    text.className = "consent__text";
    text.append("May we use Google Analytics cookies to count visits and see which pages are read? We do not use them for advertising. ");
    const privacy = document.createElement("a");
    privacy.className = "link";
    privacy.href = "/privacy.html#analytics";
    privacy.textContent = "Privacy notice";
    text.append(privacy);

    const actions = document.createElement("div");
    actions.className = "consent__actions";
    for (const [value, label, variant] of [
      ["denied", "Decline", "light"],
      ["granted", "Accept", "dark"],
    ]) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `btn btn--sm btn--${variant}`;
      button.dataset.choice = value;
      button.textContent = label;
      actions.append(button);
    }
    banner.append(text, actions);

    const root = document.getElementById("root");
    if (root) placeBanner();
    else document.body.append(banner);
    if (focus) {
      banner.scrollIntoView({ block: "start" });
      banner.querySelector("button")?.focus();
    }
  };

  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-choice]");
    if (button) {
      choose(button.dataset.choice);
      return;
    }
    if (event.target.closest("[data-consent-open]")) open(true);
  });

  const stored = read();
  if (stored === "granted") loadAnalytics();
  else if (stored !== "denied") open();
  window.undeifyConsent = { open };
})();
