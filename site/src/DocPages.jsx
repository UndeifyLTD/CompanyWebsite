// Undeify UI kit — About, Privacy and Terms pages.
const slug = (t) => String(t).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
function DocPage({ title, updated = 'Last updated 21 October 2026', children }) {
  const kids = React.Children.toArray(children);
  const heads = kids.filter((k) => k.type === 'h2').map((k) => ({ id: slug(k.props.children), label: k.props.children }));
  const withIds = kids.map((k) => (k.type === 'h2' ? React.cloneElement(k, { id: k.props.id || slug(k.props.children) }) : k));
  const active = useActiveHeading(heads.map((h) => h.id), title);
  const jump = (id) => (e) => { e.preventDefault(); const el = document.getElementById(id); document.scrollingElement.scrollTo({ top: el.getBoundingClientRect().top + document.scrollingElement.scrollTop - 96, behavior: prefersStill() ? 'auto' : 'smooth' }); };
  return (
    <div className="doc-layout wrap">
      <nav className="toc" aria-label="On this page">
        <p>On this page</p>
        {heads.map((h) => <a key={h.id} href={'#' + h.id} className={active === h.id ? 'on' : ''} onClick={jump(h.id)}>{h.label}</a>)}
      </nav>
      <main className="doc" id="main">
        <h1>{title}</h1>
        <p className="updated">{updated}</p>
        {withIds}
      </main>
    </div>
  );
}
const Mail = ({ subject }) => <a href={`mailto:hello@undeify.com${subject ? '?subject=' + encodeURIComponent(subject) : ''}`}>hello@undeify.com</a>;

function AboutPage({ onNav }) {
  const openContact = (e) => { e.preventDefault(); onNav('contact'); };
  return (
    <DocPage title="About Undeify">
      <p className="lede"><strong>Undeify is a product company, not an agency.</strong> We pick problems we understand, build software for them, and stay to run and improve it long after launch.</p>
      <h2>Who we are</h2>
      <p>Undeify was started by Isaac and Tolu, who design, build and support everything themselves. Isaac leads the company; Tolu leads development. The people who wrote the code are the people who answer your email.</p>
      <p>We are completing our registration with the Corporate Affairs Commission. Our registered name and number will appear on this page once it is done.</p>
      <h2>How we work</h2>
      <ul>
        <li><b>Our own products.</b> We do not build websites or apps for clients. Everything we make carries our name, so we decide what goes in, what stays out, and when it is ready.</li>
        <li><b>Built for Nigerian law.</b> We design every product around the Nigeria Data Protection Act 2023: collect only what a feature needs, say plainly why, and keep it no longer than necessary.</li>
      </ul>
      <h2>What we are building</h2>
      <ul>
        <li><b>NOW</b>, a social map of places, starting with a private beta in Lagos. In development; <a href={routeHref('home#beta')} onClick={(e) => { e.preventDefault(); onNav('home#beta'); }}>join the beta waitlist</a>.</li>
        <li><b>ShiftOS</b>, scheduling and operations for teams that work in shifts. Running in production.</li>
      </ul>
      <h2>In research</h2>
      <p>We are researching an app for learning Yorùbá, made for families who live abroad, starting with parents who want to learn it themselves. It is on hold while NOW comes first, and we will build it only once people tell us they need it.</p>
      <h2>Contact</h2>
      <p>Write to <Mail />, or see our <a href={routeHref('contact')} onClick={openContact}>contact page</a>. A founder replies within two working days.</p>
    </DocPage>
  );
}

function PrivacyPage() {
  return (
    <DocPage title="Privacy notice" updated="Last updated 22 October 2026">
      <p>This notice explains how Undeify handles personal data on this website, undeify.com. Each of our products has its own privacy notice, shown before that product collects anything.</p>
      <h2>Who we are</h2>
      <p>Undeify is a software company in Nigeria. We are completing our registration with the Corporate Affairs Commission, and our registered name and number will be added here when it is done. For anything about your data, write to <Mail />.</p>
      <h2>What this website collects</h2>
      <p>This website has no accounts or advertising. Its fonts, images, React runtime and page code are served from this site.</p>
      <ul>
        <li><b>Visit counts, without cookies.</b> Vercel Web Analytics counts page views on visits. It records the page, referring site, country, and device, browser and operating system type. It sets no cookies and stores nothing on your device.</li>
        <li><b>Analytics, only if you agree.</b> If you choose Accept, Google Analytics counts visits and the pages read. Google receives standard request details, including your IP address and browser information. We have disabled Google advertising features.</li>
        <li><b>Server logs.</b> Our hosting provider receives the technical details needed to deliver the site and protect it, including your IP address, browser type and requested pages.</li>
        <li><b>Cookie choice.</b> Your browser stores whether you accepted or declined analytics in local storage so we can remember your choice. It is not sent to us.</li>
        <li><b>Contact form messages.</b> If you send us a message, we receive your email address, subject and message so we can respond. The form sends this information through Resend to our hello@undeify.com mailbox. Please do not include passwords, card details or other sensitive information.</li>
        <li><b>NOW beta waitlist.</b> If you join the waitlist, we also receive your first name and confirmation that you are 18 or over. We use your details only to manage your beta invitation and check you are old enough to use NOW.</li>
      </ul>
      <h2 id="analytics">Cookies and analytics</h2>
      <p>On your first visit, we ask whether you allow Google Analytics. It does not load unless you choose Accept. If you decline, it does not load. If you later change your mind, use Cookie settings in the footer. When you withdraw consent after accepting, we tell Google Analytics to stop and delete its cookies from this browser where possible.</p>
      <p>If you accept, Google Analytics uses the <code>_ga</code> and <code>_ga_YMEL5ZY0SJ</code> cookies for up to 13 months. We have disabled Google signals and advertising personalisation. Vercel Web Analytics runs separately and does not use cookies.</p>
      <h2>Why we use this information</h2>
      <p>We rely on our legitimate interests in operating this website, including cookie-free visit counts, and on your consent for Google Analytics. We use contact form messages to respond and keep a record of the conversation. We rely on your consent for the NOW waitlist, and you can withdraw it at any time by writing to us. We never sell personal data or use it for advertising.</p>
      <h2>How long we keep it</h2>
      <p>Google keeps detailed analytics data for two months; after that, only totals remain. Hosting logs and visit counts are kept by Vercel for the period its service provides. We keep emails for as long as the conversation is active and for up to two years afterwards, unless the law requires us to keep them longer. We keep NOW waitlist details until we have sent your beta invite, or for 12 months at most, and delete them sooner if you ask.</p>
      <h2>Where it is processed</h2>
      <p>Google, Vercel, Resend and our email provider, Zoho Mail, may process data outside Nigeria, including in the United States. Where that happens, we rely on the safeguards the Nigeria Data Protection Act 2023 allows for transfers abroad. Resend processes contact form messages to deliver them to us; its <a href="https://resend.com/legal/privacy-policy">privacy policy</a> describes its handling of service data.</p>
      <h2>Your rights</h2>
      <p>Under the Nigeria Data Protection Act 2023 you can ask us to tell you what personal data we hold about you, to correct it, to delete it, to stop or limit how we use it, and to give you a copy. Write to <Mail subject="Data request" /> and we will answer within 30 days. If you are not satisfied with our answer, you can complain to the Nigeria Data Protection Commission.</p>
      <h2>Changes</h2>
      <p>If we change this notice, we will update the date at the top of this page.</p>
    </DocPage>
  );
}

function TermsPage() {
  return (
    <DocPage title="Terms of use">
      <p>These terms cover your use of this website, undeify.com. Each Undeify product has its own terms, which you will see before you use it.</p>
      <h2>Using this website</h2>
      <p>You may read, link to and share the pages on this website. Please use it lawfully and do not use it to harm anyone.</p>
      <h2>Our content</h2>
      <p>The text, design, images and names on this website belong to Undeify or are used with permission. You may not copy them for commercial use without our written agreement.</p>
      <h2>Accuracy</h2>
      <p>We keep this website accurate and up to date, but it describes products that are still being built and may change. Nothing here is a contract to provide a product or service.</p>
      <h2>Liability</h2>
      <p>This website is provided as it is. As far as the law allows, Undeify is not liable for any loss caused by relying on it or by it being unavailable.</p>
      <h2>Law</h2>
      <p>These terms are governed by the laws of the Federal Republic of Nigeria.</p>
      <h2>Contact</h2>
      <p>Questions about these terms: <Mail subject="Terms" />.</p>
    </DocPage>
  );
}

Object.assign(window, { DocPage, AboutPage, PrivacyPage, TermsPage });
