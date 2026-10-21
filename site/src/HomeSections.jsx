// Undeify UI kit — home page sections: hero, facts strip, feature, bento.
const TYPED = ['for businesses in Nigeria.', 'for everyday people.', 'built by its founders.'];

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
          <h1>Our Own Software</h1>
          <TypedLine />
          <div className="hero__actions">
            <Button variant="dark" onClick={() => onNav('contact')}>Email us</Button>
            <Button variant="light" onClick={() => onNav('home#now')}>See products <Icon name="chevron-down" size={12} style={{ opacity: 0.7 }} /></Button>
          </div>
        </div>
      </div>
      <FactsStrip />
    </section>
  );
}

function FactsStrip({ facts = [['NDPA 2023'], ['Lagos first'], ['2 founders', 1], ['Built in Nigeria']] }) {
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

function Feature({ id, title, flip, eyebrow, media, stat, statRest, features, more, onMore }) {
  return (
    <section className={`feature${flip ? ' feature--flip' : ''}`} id={id}>
      {eyebrow && <Eyebrow {...eyebrow} />}
      <h2 data-reveal>{title}</h2>
      <figure className="feature__media" data-reveal style={{ '--d': '80ms' }}>{media}</figure>
      <div className="feature__aside" data-reveal style={{ '--d': '200ms' }}>
        <p className="stat"><strong>{stat}</strong> {statRest}</p>
        <ul className="flist"><li>Features</li>{features.map((f) => <li key={f}>{f}</li>)}</ul>
        <TextLink href={routeHref('contact')} onClick={(e) => { e.preventDefault(); onMore && onMore(); }}>{more} <Icon name="chevron-right" size={12} /></TextLink>
      </div>
    </section>
  );
}

function Tile({ title, desc, children, onClick, delay = 0 }) {
  const Tag = onClick ? 'a' : 'article';
  return (
    <Tag className="tile" data-reveal style={{ '--d': delay + 'ms' }} href={onClick ? routeHref('about') : undefined} onClick={onClick ? (e) => { e.preventDefault(); onClick(); } : undefined}>
      <div className="tile__art">{children}</div>
      <div className="tile__head"><h3>{title}{onClick && <img className="tile__go" src="assets/icons/chevron-right.svg" alt="" />}</h3><p>{desc}</p></div>
    </Tag>
  );
}

function Shipped({ onNav }) {
  return (
    <section className="shipped wrap" id="shipped">
      <p className="eyebrow" data-reveal><i className="dot"></i><b>Shipped</b></p>
      <h2 data-reveal>Recently shipped</h2>
      <div className="bento">
        <Tile title="ShiftOS" desc="Scheduling and operations for teams that work in shifts. Running in production.">
          <ul className="tile-list"><li>Shift scheduling and rotas</li><li>Attendance</li><li>Leave requests</li><li>Team roles</li></ul>
        </Tile>
        <Tile delay={80} title="This website" desc="A responsive company site with self-hosted type and accessible page navigation." onClick={() => onNav('about')}>
          <div className="code-card"><b>type</b>: self-hosted<br /><b>pages</b>: home, about, privacy, terms<br /><b>contact</b>: hello@undeify.com</div>
        </Tile>
      </div>
    </section>
  );
}

Object.assign(window, { Hero, TypedLine, FactsStrip, Eyebrow, Feature, Tile, Shipped });
