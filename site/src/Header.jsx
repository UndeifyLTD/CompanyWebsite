// Undeify UI kit — sticky header with hover dropdowns, and the phone menu.
const NAV_PRODUCTS = [
  { icon: 'map-pin', title: 'NOW', desc: 'A social map of places, starting in Lagos', to: 'home#now' },
  { icon: 'calendar', title: 'ShiftOS', desc: 'Scheduling and operations for shift teams', to: 'home#shiftos' },
  { icon: 'lines', title: 'In research', desc: 'Learning Yorùbá, for families abroad', to: 'about' },
];
const NAV_COMPANY = [
  { icon: 'user', title: 'About', desc: 'Who we are and how we work', to: 'about' },
  { icon: 'lock', title: 'Privacy', desc: 'What this site collects and why', to: 'privacy' },
  { icon: 'doc', title: 'Terms', desc: 'Using this website', to: 'terms' },
];

function NavDrop({ label, title, items, onNav }) {
  return (
    <div className="nav__item">
      <a className="nav__link" href={routeHref(label === 'Products' ? 'home#now' : 'about')} onClick={(e) => e.preventDefault()}>{label} <Icon name="chevron-down" size={12} /></a>
      <div className="drop">
        <p className="drop__title">{title}</p>
        {items.map((it) => (
          <a key={it.title} href={routeHref(it.to)} onClick={(e) => { e.preventDefault(); onNav(it.to); }}>
            <span className="ico"><Icon name={it.icon} /></span><b>{it.title}</b><span>{it.desc}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

function Header({ onNav, menuOpen, setMenuOpen }) {
  const go = (to) => (e) => { e.preventDefault(); onNav(to); };
  const scrolled = useScrolled();
  React.useEffect(() => { document.body.style.overflow = menuOpen ? 'hidden' : ''; }, [menuOpen]);
  React.useEffect(() => { const k = (e) => e.key === 'Escape' && setMenuOpen(false); addEventListener('keydown', k); return () => removeEventListener('keydown', k); }, []);
  return (
    <>
      <header className={`header${scrolled || menuOpen ? ' is-scrolled' : ''}`}>
        <div className="header__in">
          <Brand onNav={onNav} />
          <nav className="nav" aria-label="Main">
            <NavDrop label="Products" title="Products" items={NAV_PRODUCTS} onNav={onNav} />
            <NavDrop label="Company" title="Company" items={NAV_COMPANY} onNav={onNav} />
            <a className="nav__link" href={routeHref('home#shipped')} onClick={go('home#shipped')}>Shipped</a>
            <a className="nav__link" href={routeHref('contact')} onClick={go('contact')}>Contact</a>
          </nav>
          <div className="header__actions">
            <Button variant="light" size="sm" onClick={go('about')}>About</Button>
            <Button variant="dark" size="sm" onClick={() => onNav('contact')}>Email us</Button>
          </div>
          <button className="burger" type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="mmenu" onClick={() => setMenuOpen(!menuOpen)}><i></i></button>
        </div>
      </header>
      <nav className={`mmenu${menuOpen ? ' is-open' : ''}`} id="mmenu" aria-label="Menu">
        <div className="mmenu__group"><p>Products</p>
          <a href={routeHref('home#now')} onClick={go('home#now')}>NOW</a><a href={routeHref('home#shiftos')} onClick={go('home#shiftos')}>ShiftOS</a><a href={routeHref('about')} onClick={go('about')}>In research</a>
        </div>
        <div className="mmenu__group"><p>Company</p>
          <a href={routeHref('about')} onClick={go('about')}>About</a><a href={routeHref('contact')} onClick={go('contact')}>Contact</a><a href={routeHref('privacy')} onClick={go('privacy')}>Privacy</a><a href={routeHref('terms')} onClick={go('terms')}>Terms of use</a><a href={routeHref('home#shipped')} onClick={go('home#shipped')}>Shipped</a>
        </div>
        <div className="mmenu__actions">
          <Button variant="dark" onClick={() => onNav('contact')}>Email us</Button>
        </div>
      </nav>
    </>
  );
}

Object.assign(window, { Header, NavDrop });
