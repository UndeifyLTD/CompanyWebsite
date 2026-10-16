// Resolves the scroll-driven styles in design/figma-screens.html to plain values, because the Figma importer
// does not evaluate calc() with custom properties, clamp() or sin(). Writes design/figma-screens.flat.html.
// Run from the repo root after tools/figma_doc.py: node tools/figma_flatten.mjs
import { pathToFileURL } from 'node:url';
import { join, resolve } from 'node:path';
import { homedir } from 'node:os';
import { writeFileSync } from 'node:fs';
const { Browser } = await import(pathToFileURL(join(homedir(), '.claude/skills/taste-skill/scripts/lib/cdp.mjs')).href);
const b = await Browser.launch({ width: 2400, height: 1200 });
try {
  const p = await b.newPage({ width: 2400, height: 1200 });
  await p.goto(pathToFileURL(resolve('design/figma-screens.html')).href, { settleMs: 1500 });
  const html = await p.eval(`(() => {
    const props = ['opacity', 'transform', 'clip-path', 'color', 'visibility', 'transform-origin'];
    for (const el of document.querySelectorAll('.shot .stage, .shot .stage *, .shot .folder__tab')) {
      const cs = getComputedStyle(el);
      el.style.cssText += ';' + props.map((k) => k + ':' + cs.getPropertyValue(k)).join(';');
    }
    // The importer also ignores clip-path, so: fully clipped or transparent layers are removed, and the
    // framed window becomes a box with overflow hidden whose pictures are shifted back into place.
    // inset() values in order top, right, bottom, left; percentages resolved against the element's box
    const px = (s, r) => s.match(/-?[\\d.]+(px|%)?/g).map((v, i) => v.endsWith('%') ? parseFloat(v) / 100 * (i % 2 ? r.width : r.height) : parseFloat(v));
    for (const el of document.querySelectorAll('.shot .stage *')) {
      const cs = getComputedStyle(el); const r = el.getBoundingClientRect();
      const clip = cs.clipPath.startsWith('inset(') ? px(cs.clipPath.slice(6), r) : null;
      if (+cs.opacity < 0.01 || (clip && clip[0] >= r.height - 1)) { el.style.display = 'none'; continue; }
      if (el.classList.contains('frame') && clip) {
        const [t, rt = t, bt = t, l = rt] = clip;
        const W = el.offsetWidth, H = el.offsetHeight;
        el.style.cssText += ';clip-path:none;transform:none;top:' + t + 'px;left:' + l + 'px;width:' + (W - l - rt) + 'px;height:' + (H - t - bt) + 'px;right:auto;bottom:auto';
        for (const s of el.querySelectorAll('.scene')) s.style.cssText += ';inset:auto;top:' + -t + 'px;left:' + -l + 'px;width:' + W + 'px;height:' + H + 'px';
      }
    }
    return '<!doctype html>' + document.documentElement.outerHTML;
  })()`);
  writeFileSync(resolve('design/figma-screens.flat.html'), html);
  console.log('flat', Math.round(html.length / 1e5) / 10, 'MB');
} finally { await b.close(); }
