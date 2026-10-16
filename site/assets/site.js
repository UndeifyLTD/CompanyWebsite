// Undeify website: the 3D product stack in the hero, and reveal-on-entry.
(() => {
  const stack = document.querySelector('.stack');
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (stack && !still) {
    // Scroll fans the panes apart as the hero leaves the screen.
    let queued = false;
    const spread = () => {
      queued = false;
      const r = stack.getBoundingClientRect();
      const s = Math.min(1, Math.max(0, (innerHeight * 0.5 - r.top) / (r.height + innerHeight * 0.5)));
      stack.style.setProperty('--spread', s.toFixed(3));
    };
    addEventListener('scroll', () => { if (!queued) { queued = true; requestAnimationFrame(spread); } }, { passive: true });
    spread();

    // Desktop: the stack leans toward the pointer (the CSS transition smooths it).
    if (matchMedia('(pointer: fine)').matches) {
      addEventListener('pointermove', (e) => {
        stack.style.setProperty('--rx', ((e.clientX / innerWidth) * 2 - 1).toFixed(3));
        stack.style.setProperty('--ry', ((e.clientY / innerHeight) * 2 - 1).toFixed(3));
      }, { passive: true });
    }
  }

  // Close the phone menu after a link in it is chosen.
  const menu = document.querySelector('.menu');
  if (menu) menu.addEventListener('click', (e) => { if (e.target.closest('a')) menu.open = false; });

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
