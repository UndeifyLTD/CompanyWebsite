// Screenshots the stage at chosen scroll points and the full page, at desktop and phone size.
// Run from the repo root: node tools/capture.mjs [outDir]
// Uses the taste-skill's zero-dependency Chrome driver.
import { pathToFileURL } from 'node:url';
import { resolve, join } from 'node:path';
import { mkdirSync } from 'node:fs';
import { homedir } from 'node:os';

const { Browser } = await import(pathToFileURL(join(homedir(), '.claude/skills/taste-skill/scripts/lib/cdp.mjs')).href);
const out = resolve(process.argv[2] || '.taste-skill/capture');
mkdirSync(out, { recursive: true });
const url = pathToFileURL(resolve('site/index.html')).href;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await Browser.launch();
try {
  for (const [label, width, height] of [['desktop', 1440, 900], ['mobile', 390, 844]]) {
    const page = await browser.newPage({ width, height, dsf: 1, mobile: width < 600 });
    await page.goto(url, { settleMs: 800 });
    await page.eval('document.fonts.ready.then(() => true)');
    for (const p of [0, 0.3, 0.45, 0.7, 0.85, 1]) {
      await page.eval(`(() => { const s = document.querySelector('.stage'); scrollTo(0, s.offsetTop + ${p} * (s.offsetHeight - innerHeight)); })()`);
      await sleep(500);
      await page.screenshot({ path: join(out, `${label}-stage-${String(p * 100).padStart(3, '0')}.jpg`), quality: 80 });
    }
    // the rest of the page, with every reveal finished
    await page.eval(`document.querySelectorAll('[data-reveal]').forEach((e) => e.classList.add('is-in'))`);
    const stageEnd = await page.eval(`(() => { const s = document.querySelector('.stage'); return s.offsetTop + s.offsetHeight; })()`);
    const total = await page.eval('document.documentElement.scrollHeight');
    for (let y = stageEnd, i = 0; y < total; y += height, i++) {
      await page.eval(`scrollTo(0, ${y})`);
      await sleep(1600);
      await page.screenshot({ path: join(out, `${label}-page-${i}.jpg`), quality: 78 });
    }
  }
} finally {
  await browser.close();
}
console.log('saved to', out);
