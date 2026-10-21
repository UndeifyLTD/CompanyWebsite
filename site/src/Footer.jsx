// Undeify UI kit — sitemap footer + closing call.
function Footer({ onNav }) {
  const go = (to) => (e) => { e.preventDefault(); onNav(to); };
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__cols">
          <nav><h2>Products</h2><ul><li><a href={routeHref('home#now')} onClick={go('home#now')}>NOW</a></li><li><a href={routeHref('home#shiftos')} onClick={go('home#shiftos')}>ShiftOS</a></li><li><a href={routeHref('about')} onClick={go('about')}>In research</a></li></ul></nav>
          <nav><h2>Company</h2><ul><li><a href={routeHref('about')} onClick={go('about')}>About</a></li><li><a href={routeHref('home#beta')} onClick={go('home#beta')}>NOW beta</a></li><li><a href={routeHref('contact')} onClick={go('contact')}>Contact</a></li></ul></nav>
          <nav><h2>Legal</h2><ul><li><a href={routeHref('privacy')} onClick={go('privacy')}>Privacy notice</a></li><li><a href={routeHref('terms')} onClick={go('terms')}>Terms of use</a></li><li><button type="button" onClick={() => window.undeifyConsent.open(true)}>Cookie settings</button></li></ul></nav>
          <div><h2>Contact</h2><ul><li><a href="mailto:hello@undeify.com">hello@undeify.com</a></li></ul></div>
          <div><h2>Location</h2><ul><li><span>Nigeria</span></li></ul></div>
        </div>
        <div className="footer__bottom">
          <Brand onNav={onNav} />
          <span>© 2026 Undeify.</span>
        </div>
      </div>
    </footer>
  );
}

function CopyEmail({ email = 'hello@undeify.com' }) {
  const [done, setDone] = React.useState(false);
  return (
    <button className="copy" type="button" data-done={done ? '' : undefined}
      onClick={() => {
        if (!navigator.clipboard) { window.location.href = `mailto:${email}`; return; }
        navigator.clipboard.writeText(email).then(() => {
          setDone(true);
          setTimeout(() => setDone(false), 1500);
        }).catch(() => { window.location.href = `mailto:${email}`; });
      }}>
      <span className="mono">{email}</span><i><Icon name="copy" size={15} /></i>
    </button>
  );
}

// The one place on the home page that asks for an email: it opens the visitor's mail app
// straight away, and says who answers and when.
function Closing({ title = 'Built in Nigeria, by its founders' }) {
  return (
    <section className="closing wrap">
      <h2 data-reveal>{title}</h2>
      <p className="closing__lede" data-reveal>Questions about NOW or ShiftOS? Write to us. A founder reads every email and replies within two working days.</p>
      <div className="closing__actions" data-reveal style={{ '--d': '120ms' }}>
        <Button variant="dark" href="mailto:hello@undeify.com">Email a founder</Button>
        <CopyEmail />
      </div>
    </section>
  );
}

Object.assign(window, { Footer, CopyEmail, Closing });
