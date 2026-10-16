// Screenshots every screen of the home page at desktop and phone size, with every reveal finished.
// Run from the repo root: node tools/capture.mjs [outDir] [page.html]
// Uses the taste-skill's zero-dependency Chrome driver.
import { pathToFileURL } from 'node:url';
import { resolve, join } from 'node:path';
import { mkdirSync } from 'node:fs';
import { homedir } from 'node:os';

const { Browser } = await import(pathToFileURL(join(homedir(), '.claude/skills/taste-skill/scripts/lib/cdp.mjs')).href);
const out = resolve(process.argv[2] || '.taste-skill/capture');
mkdirSync(out, { recursive: true });
const url = pathToFileURL(resolve(process.argv[3] || 'site/index.html')).href;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await Browser.launch();
try {
  for (const [label, width, height] of [['desktop', 1440, 900], ['mobile', 390, 844]]) {
    const page = await browser.newPage({ width, height, dsf: 1, mobile: width < 600 });
    await page.goto(url, { settleMs: 1500 });
    await page.eval('document.fonts.ready.then(() => true)');
    await page.eval(`document.querySelectorAll('[data-reveal]').forEach((e) => e.classList.add('is-in'))`);
    const total = await page.eval('document.documentElement.scrollHeight');
    for (let y = 0, i = 0; y < total; y += height, i++) {
      await page.eval(`scrollTo(0, ${y})`);
      await sleep(900);
      await page.screenshot({ path: join(out, `${label}-${String(i).padStart(2, '0')}.jpg`), quality: 78 });
    }
  }
} finally {
  await browser.close();
}
console.log('saved to', out);
