# Builds the document pages (privacy, terms, security) from one shared layout.
# Run from the repo root: python -I tools/build_docs.py
from pathlib import Path

SITE = Path(__file__).resolve().parent.parent / "site"
UPDATED = "16 October 2026"

INDEX = (SITE / "index.html").read_text(encoding="utf-8")
def block(name):
    # the header and footer are copied from index.html, so every page shares one source
    return INDEX.split(f"<!-- {name} -->", 1)[1].split(f"<!-- /{name} -->", 1)[0].strip()

HEAD = """<!doctype html>
<html lang="en-NG">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{title} | Undeify</title>
  <meta name="description" content="{desc}">
  <meta name="theme-color" content="#fafafa">
  <link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="assets/site.css">
</head>
<body>
<div class="page">
""" + block("header").replace("{", "{{").replace("}", "}}") + """
  <main class="doc wrap" id="main">
    <h1>{title}</h1>
    <p class="updated">Last updated {updated}</p>
{body}
  </main>
""" + block("footer").replace("{", "{{").replace("}", "}}") + """
</div>
<script src="assets/site.js" defer></script>
</body>
</html>
"""

PRIVACY = """
    <p>This notice explains how Undeify handles personal data on this website, undeify.com. Each of our products has its own privacy notice, shown before that product collects anything.</p>
    <h2>Who we are</h2>
    <p>Undeify is a software company in Nigeria. We are completing our registration with the Corporate Affairs Commission, and our registered name and number will be added here when it is done. For anything about your data, write to <a class="link" href="mailto:hello@undeify.com?subject=Privacy">hello@undeify.com</a>.</p>
    <h2>What this website collects</h2>
    <p>Very little. This website has no forms, no accounts, no cookies, no analytics and no advertising or tracking scripts. Our fonts and images are served from our own site, not from third parties.</p>
    <ul>
      <li><b>Server logs.</b> Our hosting provider, Cloudflare, receives the technical details every website receives: your IP address, browser type and the pages requested. Cloudflare uses them to deliver the site and protect it from attacks. We do not use them to identify or profile visitors.</li>
      <li><b>Emails you send us.</b> If you write to us, we receive your email address, your name if you include it, and your message. We use them only to reply and to keep a record of the conversation.</li>
    </ul>
    <h2>Why we may use it</h2>
    <p>We rely on our legitimate interest in running a secure website for server logs, and on your request for emails you send us. We never sell personal data, and we do not use it for marketing unless you have asked us to.</p>
    <h2>How long we keep it</h2>
    <p>Hosting logs are kept by Cloudflare for the short period its service needs. We keep emails for as long as the conversation is active and for up to two years afterwards, then delete them, unless the law requires us to keep them longer.</p>
    <h2>Where it is processed</h2>
    <p>Cloudflare and our email provider may process data outside Nigeria. Where that happens, we rely on the safeguards the Nigeria Data Protection Act 2023 allows for transfers abroad.</p>
    <h2>Your rights</h2>
    <p>Under the Nigeria Data Protection Act 2023 you can ask us to tell you what personal data we hold about you, to correct it, to delete it, to stop or limit how we use it, and to give you a copy. Write to <a class="link" href="mailto:hello@undeify.com?subject=Data%20request">hello@undeify.com</a> and we will answer within 30 days. If you are not satisfied with our answer, you can complain to the Nigeria Data Protection Commission.</p>
    <h2>Changes</h2>
    <p>If we change this notice, we will update the date at the top of this page.</p>
"""

TERMS = """
    <p>These terms cover your use of this website, undeify.com. Each Undeify product has its own terms, which you will see before you use it.</p>
    <h2>Using this website</h2>
    <p>You may read, link to and share the pages on this website. Please do not try to disrupt it, break into it, or use it to harm anyone. If you find a security problem, see our <a class="link" href="security.html">security page</a> for how to tell us.</p>
    <h2>Our content</h2>
    <p>The text, design, images and names on this website belong to Undeify or are used with permission. You may not copy them for commercial use without our written agreement.</p>
    <h2>Accuracy</h2>
    <p>We keep this website accurate and up to date, but it describes products that are still being built and may change. Nothing here is a contract to provide a product or service.</p>
    <h2>Liability</h2>
    <p>This website is provided as it is. As far as the law allows, Undeify is not liable for any loss caused by relying on it or by it being unavailable.</p>
    <h2>Law</h2>
    <p>These terms are governed by the laws of the Federal Republic of Nigeria.</p>
    <h2>Contact</h2>
    <p>Questions about these terms: <a class="link" href="mailto:hello@undeify.com?subject=Terms">hello@undeify.com</a>.</p>
"""

SECURITY = """
    <p>Security is part of how we build every product. If you have found a weakness in this website or in any Undeify product, we want to hear about it.</p>
    <h2>How to report a problem</h2>
    <p>Email <a class="link" href="mailto:hello@undeify.com?subject=Security%20report">hello@undeify.com</a> with the subject "Security report". Please include what you found, where, and the steps to reproduce it. A screenshot or a short video helps.</p>
    <h2>What we ask of you</h2>
    <ul>
      <li>Give us a reasonable time to fix the problem before you tell anyone else.</li>
      <li>Do not access, change or delete data that is not yours. Stop as soon as you have shown the problem exists.</li>
      <li>Do not run denial-of-service tests, send spam, or use social engineering against our team or users.</li>
    </ul>
    <h2>What you can expect from us</h2>
    <ul>
      <li>A reply within two working days, confirming we have your report.</li>
      <li>Updates while we investigate and fix it.</li>
      <li>Credit for the find when it is fixed, if you would like it.</li>
    </ul>
    <p>We will not take legal action against anyone who reports a problem in good faith and follows the guidance on this page. Our security contact is also published in <a class="link" href=".well-known/security.txt">security.txt</a>.</p>
"""

ABOUT = """
    <p class="lede"><strong>Undeify is a product company, not an agency.</strong> We pick problems we understand, build software for them, and stay to run and improve it long after launch.</p>
    <h2>Who we are</h2>
    <p>Undeify was started by Isaac and Tolu, who design, build and support everything themselves. Isaac leads the company and its security; Tolu leads development. The people who wrote the code are the people who answer your email.</p>
    <p>We are completing our registration with the Corporate Affairs Commission. Our registered name and number will appear on this page once it is done.</p>
    <h2>How we work</h2>
    <ul>
      <li><b>Our own products.</b> We do not build websites or apps for clients. Everything we make carries our name, so we decide what goes in, what stays out, and when it is ready.</li>
      <li><b>Security from the start.</b> We ask how each feature could be abused before we build it. Secrets stay out of our code, and every service gets only the access it needs.</li>
      <li><b>Built for Nigerian law.</b> We design every product around the Nigeria Data Protection Act 2023: collect only what a feature needs, say plainly why, and keep it no longer than necessary.</li>
    </ul>
    <h2>What we are building</h2>
    <ul>
      <li><b>NOW</b>, a social map of places, starting with a private beta in Lagos. In design.</li>
      <li><b>ShiftOS</b>, scheduling and operations for teams that work in shifts. Running in production.</li>
    </ul>
    <h2 id="research">In research</h2>
    <p>We are researching an app for learning Yorùbá, made for families who live abroad, starting with parents who want to learn it themselves. It is on hold while NOW comes first, and we will build it only once people tell us they need it.</p>
    <h2>Contact</h2>
    <p>Write to <a href="mailto:hello@undeify.com">hello@undeify.com</a>. A founder replies within two working days.</p>
"""

PAGES = {
    "about.html": ("About Undeify", "Who Undeify is, how we work and what we are building.", ABOUT),
    "privacy.html": ("Privacy notice", "How the Undeify website handles personal data under the Nigeria Data Protection Act 2023.", PRIVACY),
    "terms.html": ("Terms of use", "The terms for using the Undeify website.", TERMS),
    "security.html": ("Security", "How to report a security problem in an Undeify website or product.", SECURITY),
}

for name, (title, desc, body) in PAGES.items():
    (SITE / name).write_text(HEAD.format(title=title, desc=desc, updated=UPDATED, body=body.rstrip()), encoding="utf-8", newline="\n")
    print("wrote", name)
