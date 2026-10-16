# Builds the share card and the icon set from the logo in docs/brand.
# Run from the repo root: python tools/make_icons.py docs/brand/undeify-logo.jpg site/assets
# then move site/assets/favicon.ico to site/favicon.ico.
import sys
from PIL import Image, ImageDraw, ImageFilter, ImageStat
src, out = sys.argv[1], sys.argv[2]
im = Image.open(src).convert("RGB")
cx, cy, r = 626, 625, 610
bg = (20, 21, 20)  # the black at the circle's edge, where the card meets it

# Open Graph card, 1200x630: the logo's contents on the circle's black, circle edge feathered away
s = 0.74
small = im.resize((round(im.width * s), round(im.height * s)), Image.LANCZOS)
mask = Image.new("L", im.size, 0)
ImageDraw.Draw(mask).ellipse((cx - 530, cy - 530, cx + 530, cy + 530), fill=255)
mask = mask.filter(ImageFilter.GaussianBlur(40)).resize(small.size, Image.LANCZOS)
card = Image.new("RGB", (1200, 630), bg)
content_cx, content_cy = 630 * s, 668 * s   # middle of the mark, wordmark and rule
card.paste(small, (round(600 - content_cx), round(315 - content_cy)), mask)
card.save(f"{out}/og-image.png", optimize=True)

# Icons: the U mark on black, square
side = 390
mark = im.crop((round(630.5 - side / 2), round(472 - side / 2), round(630.5 + side / 2), round(472 + side / 2)))
for name, size in [("apple-touch-icon.png", 180), ("icon-192.png", 192), ("icon-512.png", 512), ("favicon-32.png", 32)]:
    mark.resize((size, size), Image.LANCZOS).save(f"{out}/{name}", optimize=True)
mark.resize((256, 256), Image.LANCZOS).save(f"{out}/favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
print("bg", bg)
