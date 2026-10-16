# Builds one self-contained HTML document holding every screen as a fixed-size frame, for import into Figma
# with the html_to_figma tool. Output: design/figma-screens.html (not deployed).
# Run from the repo root: python -I tools/figma_doc.py
import base64, re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SITE = ROOT / "site"
css = (SITE / "assets/site.css").read_text(encoding="utf-8")
html = (SITE / "index.html").read_text(encoding="utf-8")

def b64(path, mime):
    return f"data:{mime};base64," + base64.b64encode((SITE / path).read_bytes()).decode()

css = re.sub(r'url\("fonts/([^"]+)"\)', lambda m: f'url("{b64("assets/fonts/" + m.group(1), "font/woff2")}")', css)
body = html.split('<div class="page">', 1)[1].rsplit("</div>\n<script", 1)[0]
body = body.replace(' data-reveal', '')  # Figma gets the settled state of every entrance

def stage_only(markup):
    return markup.split('<section class="stage"', 1)[1].split("</section>", 1)[0].join(['<section class="stage"', "</section>"])

def for_width(markup, mobile):
    if mobile:
        markup = re.sub(r'<source media="\(max-width: 760px\)" srcset="([^"]+)"[^>]*>\s*<img src="[^"]+" width="\d+" height="\d+"', r'<img src="\1"', markup)
    else:
        markup = re.sub(r'<source media="\(max-width: 760px\)"[^>]*>\s*', "", markup)
    markup = re.sub(r'src="(assets/img/[^"]+\.webp)"', lambda m: f'src="{b64(m.group(1), "image/webp")}"', markup)
    return markup.replace(' loading="lazy"', "")

def off_classes(p):
    # mirrors the visibility toggles in site.js
    return {"a": p >= 0.2, "b": p <= 0.4 or p >= 0.65, "c": p <= 0.74}

def stage_state(markup, p):
    markup = markup.replace('<section class="stage"', f'<section class="stage" style="--p:{p}"', 1)
    for k, off in off_classes(p).items():
        if off:
            markup = markup.replace(f'class="copy copy--{k}"', f'class="copy copy--{k} is-off"', 1)
    return markup

FRAMES = []
for label, width, height, mobile in (("Desktop 1440", 1440, 900, False), ("Phone 390", 390, 844, True)):
    page = for_width(body, mobile)
    FRAMES.append((f"{label} — Home", width, height, stage_state(page, 0)))
    for p, name in ((0.3, "scroll 2: the camera moves in"), (0.45, "scroll 3: sunrise"), (0.85, "scroll 4: daylight")):
        FRAMES.append((f"{label} — Hero {name}", width, height, stage_state(stage_only(page), p)))

frames_html = "\n".join(
    f'<div class="page shot" data-name="{name}" style="width:{w}px;--vh:{h}px">{markup}</div>'
    for name, w, h, markup in FRAMES)

doc = f"""<!doctype html>
<html lang="en-NG" class="js">
<head><meta charset="utf-8"><title>Undeify screens</title>
<style>
{css}
/* capture-only: each frame is a still; the stage shows one moment instead of pinning */
body {{ background: #888; display: flex; flex-wrap: wrap; gap: 120px; padding: 120px; align-items: flex-start; }}
.shot {{ flex: none; background: var(--ivory); }}
.shot .stage {{ height: var(--vh); }}
.shot .stage__pin {{ position: relative; }}
.copy--a .clock::after {{ content: ""; }}
</style></head>
<body>
{frames_html}
</body></html>
"""
out = ROOT / "design/figma-screens.html"
out.write_text(doc.replace("data-clock>Based in Nigeria.", "data-clock>It is 9:40 pm in Nigeria right now."), encoding="utf-8")
print(out, round(out.stat().st_size / 1e6, 2), "MB,", len(FRAMES), "frames")
