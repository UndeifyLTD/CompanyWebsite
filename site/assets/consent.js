// Undeify website: analytics consent. Google Analytics loads only after a visitor says yes,
// and "Cookie settings" in the footer lets them change their mind at any time.
(() => {
  const ID = 'G-YMEL5ZY0SJ';
  const KEY = 'undeify-consent';            // "granted" or "denied"; nothing stored until they choose
  const read = () => { try { return localStorage.getItem(KEY); } catch { return null; } };
  const save = (v) => { try { localStorage.setItem(KEY, v); } catch {} };

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }

  let loaded = false;
  const load = () => {
    if (loaded) return;
    loaded = true;
    gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    gtag('js', new Date());
    gtag('config', ID, { allow_google_signals: false, allow_ad_personalization_signals: false, cookie_expires: 60 * 60 * 24 * 395 });
    const s = document.createElement('script');
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${ID}`;
    document.head.append(s);
  };

  // Remove Google Analytics cookies on this domain and its parent (_ga, _ga_<container>).
  const clearCookies = () => {
    const host = location.hostname;
    const domains = ['', host, `.${host}`, `.${host.split('.').slice(-2).join('.')}`];
    for (const c of document.cookie.split(';')) {
      const name = c.split('=')[0].trim();
      if (!/^_ga(_|$)/.test(name)) continue;
      for (const d of domains) document.cookie = `${name}=; Max-Age=0; path=/${d ? `; domain=${d}` : ''}`;
    }
  };

  let banner;
  const close = () => { if (banner) { banner.remove(); banner = null; } };
  const choose = (v) => {
    save(v);
    close();
    if (v === 'granted') return load();
    if (loaded) {
      gtag('consent', 'update', { analytics_storage: 'denied' });
      window[`ga-disable-${ID}`] = true;
    }
    clearCookies();
  };

  const open = () => {
    if (banner) return banner.querySelector('button').focus();
    banner = document.createElement('section');
    banner.className = 'consent';
    banner.setAttribute('aria-label', 'Cookie choice');
    banner.innerHTML = `
      <p class="consent__text">May we use Google Analytics cookies to count visits and see which pages are read? We do not use them for advertising. <a class="link" href="privacy.html#analytics">Privacy notice</a></p>
      <div class="consent__actions">
        <button type="button" class="btn btn--sm btn--light" data-choice="denied">Decline</button>
        <button type="button" class="btn btn--sm btn--dark" data-choice="granted">Accept</button>
      </div>`;
    banner.addEventListener('click', (e) => {
      const b = e.target.closest('[data-choice]');
      if (b) choose(b.dataset.choice);
    });
    document.body.append(banner);
  };

  const start = () => {
    for (const b of document.querySelectorAll('[data-consent-open]')) b.addEventListener('click', open);
    const v = read();
    if (v === 'granted') load();
    else if (v !== 'denied') open();
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
