// Undeify UI kit — motion helpers. All respect prefers-reduced-motion.
const prefersStill = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

// Reveal [data-reveal] elements once as they enter. Re-scans on route change.
function useReveal(dep) {
  React.useEffect(() => {
    const root = document.documentElement;
    root.classList.add('js-reveal');
    const els = [...document.querySelectorAll('[data-reveal]:not([data-in])')];
    if (prefersStill() || document.hidden || !('IntersectionObserver' in window)) { els.forEach((e) => e.setAttribute('data-in', '')); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.setAttribute('data-in', ''); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    els.forEach((e) => io.observe(e));
    // safety net: never leave content hidden
    const t = setTimeout(() => els.forEach((e) => { const r = e.getBoundingClientRect(); if (r.top < innerHeight) e.setAttribute('data-in', ''); }), 2000);
    return () => { io.disconnect(); clearTimeout(t); };
  }, [dep]);
}

function useScrolled(px = 8) {
  const [s, setS] = React.useState(false);
  React.useEffect(() => {
    const on = () => setS((document.scrollingElement.scrollTop || 0) > px);
    on(); addEventListener('scroll', on, { passive: true });
    return () => removeEventListener('scroll', on);
  }, [px]);
  return s;
}

// Active section tracking for doc TOCs.
function useActiveHeading(ids, dep) {
  const [active, setActive] = React.useState(ids[0]);
  React.useEffect(() => {
    const on = () => {
      let cur = ids[0];
      ids.forEach((id) => { const el = document.getElementById(id); if (el && el.getBoundingClientRect().top < 140) cur = id; });
      setActive(cur);
    };
    on(); addEventListener('scroll', on, { passive: true });
    return () => removeEventListener('scroll', on);
  }, [dep]);
  return active;
}

Object.assign(window, { useReveal, useScrolled, useActiveHeading, prefersStill });
