// Undeify UI kit — home page sections: hero, facts strip, feature, NOW beta waitlist.
const TYPED = ['for teams that work in shifts.', 'for finding Lagos spots worth it.', 'made in Nigeria, by its founders.'];

function TypedLine() {
  const [text, setText] = React.useState(TYPED[0]);
  React.useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let w = 0, n = TYPED[0].length, dir = -1, t;
    const tick = () => {
      n += dir; setText(TYPED[w].slice(0, n));
      if (dir < 0 && n === 0) { w = (w + 1) % TYPED.length; dir = 1; t = setTimeout(tick, 300); return; }
      if (dir > 0 && n === TYPED[w].length) { dir = -1; t = setTimeout(tick, 2200); return; }
      t = setTimeout(tick, dir < 0 ? 28 : 55);
    };
    t = setTimeout(tick, 2600);
    return () => clearTimeout(t);
  }, []);
  return <p className="typed">{text}</p>;
}

function Hero({ onNav }) {
  return (
    <section className="hero wrap">
      <div className="hero__body">
        <div className="hero__copy">
          <p className="recap"><a href={routeHref('about')} onClick={(e) => { e.preventDefault(); onNav('about'); }}>Built in Nigeria <Icon name="chevron-right" size={12} /></a></p>
          <h1>Software we build and stand behind</h1>
          <TypedLine />
          <div className="hero__actions">
            <Button variant="dark" href={routeHref('home#beta')} onClick={(e) => { e.preventDefault(); onNav('home#beta'); }}>Join the NOW beta</Button>
            <Button variant="light" onClick={() => onNav('home#now')}>See products <Icon name="chevron-down" size={12} style={{ opacity: 0.7 }} /></Button>
          </div>
        </div>
      </div>
      <FactsStrip />
    </section>
  );
}

function FactsStrip({ facts = [['Our own products'], ['Lagos first'], ['2 founders', 1], ['Built in Nigeria']] }) {
  const renderFacts = (group) => facts.map(([f, m]) => <li key={`${group}-${f}`} className={m ? 'm' : ''}>{f}</li>);

  return (
    <div className="marks" role="region" aria-label="At a glance">
      <div className="marks__viewport">
        <div className="marks__track">
          <ul className="marks__group">{renderFacts('visible')}</ul>
          <ul className="marks__group" aria-hidden="true">{renderFacts('duplicate-1')}</ul>
          <ul className="marks__group" aria-hidden="true">{renderFacts('duplicate-2')}</ul>
          <ul className="marks__group" aria-hidden="true">{renderFacts('duplicate-3')}</ul>
        </div>
      </div>
    </div>
  );
}

// flip: visual on the right column (2fr) with copy on the left
// eyebrow: { name, status, dot: 'live' | 'hollow' | undefined }
function Eyebrow({ name, status, dot }) {
  return <p className="eyebrow" data-reveal><i className={`dot${dot ? ' dot--' + dot : ''}`}></i><b>{name}</b>{status && <span>· {status}</span>}</p>;
}

// moreTo: the route the "more" link points at (contact unless set)
function Feature({ id, title, flip, eyebrow, media, stat, statRest, features, more, moreTo = 'contact', onMore }) {
  return (
    <section className={`feature${flip ? ' feature--flip' : ''}`} id={id}>
      {eyebrow && <Eyebrow {...eyebrow} />}
      <h2 data-reveal>{title}</h2>
      <figure className="feature__media" data-reveal style={{ '--d': '80ms' }}>{media}</figure>
      <div className="feature__aside" data-reveal style={{ '--d': '200ms' }}>
        <p className="stat"><strong>{stat}</strong> {statRest}</p>
        <ul className="flist"><li>Features</li>{features.map((f) => <li key={f}>{f}</li>)}</ul>
        <TextLink href={routeHref(moreTo)} onClick={(e) => { e.preventDefault(); onMore && onMore(); }}>{more} <Icon name="chevron-right" size={12} /></TextLink>
      </div>
    </section>
  );
}

function Waitlist({ onNav, onContact }) {
  return (
    <section className="waitlist wrap" id="beta">
      <div className="waitlist__intro">
        <p className="eyebrow" data-reveal><i className="dot dot--hollow"></i><b>NOW</b><span>· Private beta in Lagos</span></p>
        <h2 data-reveal>Be first to see where Lagos actually goes</h2>
        <p className="waitlist__lede" data-reveal>NOW opens to a small group of testers in Lagos first. Join the waitlist and we will email you once, when your invite is ready. No newsletter, no spam.</p>
      </div>
      <div className="email-card" data-reveal>
        <p className="email-card__title">Join the beta waitlist</p>
        <ol className="steps">
          <li>Enter your email address and a message.</li>
          <li>Confirm you are 18 or over. NOW is for adults only.</li>
          <li>We will email you when your invite is ready.</li>
        </ol>
        <div className="email-card__actions">
          <Button variant="dark" onClick={() => onContact('Join the NOW beta', 'waitlist')}>Email to join the beta</Button>
          <CopyEmail />
        </div>
        <p className="email-card__note">We use your details to manage your beta invitation. Read our <a href={routeHref('privacy')} onClick={(e) => { e.preventDefault(); onNav('privacy'); }}>Privacy notice</a>.</p>
      </div>
    </section>
  );
}

Object.assign(window, { Hero, TypedLine, FactsStrip, Eyebrow, Feature, Waitlist });
