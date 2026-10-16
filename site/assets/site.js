// Undeify website: the scroll-driven stage, pointer tilt, the Nigeria clock and reveal-on-entry.
// All motion reads one number, --p on .stage (0 at the top of the stage, 1 at its end); site.css does the rest.

(() => {
  const stage = document.querySelector('.stage');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');

  if (stage) {
    const copies = { a: stage.querySelector('.copy--a'), b: stage.querySelector('.copy--b'), c: stage.querySelector('.copy--c') };
    let queued = false;
    const update = () => {
      queued = false;
      const range = stage.offsetHeight - innerHeight;
      const p = range > 0 ? Math.min(1, Math.max(0, (scrollY - stage.offsetTop) / range)) : 0;
      stage.style.setProperty('--p', p.toFixed(4));
      // keep these ranges in step with the ramps at the top of .stage in site.css
      copies.a.classList.toggle('is-off', p >= 0.2);
      copies.b.classList.toggle('is-off', p <= 0.4 || p >= 0.65);
      copies.c.classList.toggle('is-off', p <= 0.74);
    };
    const queue = () => { if (!queued) { queued = true; requestAnimationFrame(update); } };
    addEventListener('scroll', queue, { passive: true });
    addEventListener('resize', queue);
    update();

    // Desktop only: the framed scene leans a little toward the pointer, eased so it never jumps.
    if (matchMedia('(pointer: fine)').matches && !reduce.matches) {
      let tx = 0, ty = 0, x = 0, y = 0, running = false;
      const step = () => {
        x += (tx - x) * 0.08; y += (ty - y) * 0.08;
        stage.style.setProperty('--mx', x.toFixed(3));
        stage.style.setProperty('--my', y.toFixed(3));
        running = Math.abs(tx - x) > 0.001 || Math.abs(ty - y) > 0.001;
        if (running) requestAnimationFrame(step);
      };
      addEventListener('pointermove', (e) => {
        tx = (e.clientX / innerWidth) * 2 - 1; ty = (e.clientY / innerHeight) * 2 - 1;
        if (!running) { running = true; requestAnimationFrame(step); }
      }, { passive: true });
    }
  }

  // The live line in the hero: the current time in Nigeria.
  const clock = document.querySelector('[data-clock]');
  if (clock) {
    const fmt = new Intl.DateTimeFormat('en-NG', { timeZone: 'Africa/Lagos', hour: 'numeric', minute: '2-digit', hour12: true });
    const tick = () => { clock.textContent = `It is ${fmt.format(new Date()).toLowerCase()} in Nigeria right now.`; };
    tick(); setInterval(tick, 20000);
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
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.1 });
  targets.forEach((el) => io.observe(el));
  addEventListener('load', () => setTimeout(() => {
    targets.forEach((el) => { const r = el.getBoundingClientRect(); if (r.top < innerHeight && r.bottom > 0) el.classList.add('is-in'); });
  }, 2500));
})();
