// Undeify website: phone menu, the hanging crate in the hero, the typed line, copy-email, reveal-on-entry.
(() => {
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Phone menu
  const burger = document.querySelector('.burger');
  const menu = document.getElementById('mmenu');
  if (burger && menu) {
    const set = (open) => { burger.setAttribute('aria-expanded', String(open)); burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu'); menu.classList.toggle('is-open', open); document.body.style.overflow = open ? 'hidden' : ''; };
    burger.addEventListener('click', () => set(burger.getAttribute('aria-expanded') !== 'true'));
    menu.addEventListener('click', (e) => { if (e.target.closest('a')) set(false); });
    addEventListener('keydown', (e) => { if (e.key === 'Escape') set(false); });
  }

  // The crate is hoisted up out of view as the hero scrolls away, and leans toward the pointer on desktop.
  const rig = document.querySelector('.rig');
  if (rig && !still) {
    let queued = false;
    const lift = () => { queued = false; rig.style.setProperty('--lift', `${Math.round(-scrollY * 1.15)}px`); };
    addEventListener('scroll', () => { if (!queued) { queued = true; requestAnimationFrame(lift); } }, { passive: true });
    lift();
    if (matchMedia('(pointer: fine)').matches) {
      addEventListener('pointermove', (e) => {
        rig.style.setProperty('--rx', ((e.clientX / innerWidth) * 2 - 1).toFixed(3));
        rig.style.setProperty('--ry', ((e.clientY / innerHeight) * 2 - 1).toFixed(3));
      }, { passive: true });
    }
  }

  // The typed line under the headline cycles through its phrases.
  const typed = document.querySelector('[data-typed]');
  if (typed && !still) {
    const words = typed.dataset.typed.split('|');
    let w = 0, n = words[0].length, dir = -1;
    const tick = () => {
      n += dir;
      typed.textContent = words[w].slice(0, n);
      if (dir < 0 && n === 0) { w = (w + 1) % words.length; dir = 1; return setTimeout(tick, 300); }
      if (dir > 0 && n === words[w].length) { dir = -1; return setTimeout(tick, 2200); }
      setTimeout(tick, dir < 0 ? 28 : 55);
    };
    setTimeout(tick, 2600);
  }

  // Copy the email address
  for (const btn of document.querySelectorAll('[data-copy]')) {
    btn.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(btn.dataset.copy); btn.dataset.done = ''; setTimeout(() => delete btn.dataset.done, 1500); }
      catch { location.href = `mailto:${btn.dataset.copy}`; }
    });
  }

  // Reveal once when an element enters the viewport. Never replays, never leaves content hidden.
  const targets = document.querySelectorAll('[data-reveal]');
  if (!('IntersectionObserver' in window)) { targets.forEach((el) => el.classList.add('is-in')); return; }
  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-in');
      io.unobserve(entry.target);
    }
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
  targets.forEach((el) => io.observe(el));
  addEventListener('load', () => setTimeout(() => {
    targets.forEach((el) => { const r = el.getBoundingClientRect(); if (r.top < innerHeight && r.bottom > 0) el.classList.add('is-in'); });
  }, 2500));
})();
