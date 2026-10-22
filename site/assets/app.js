(() => {
const prefersStill = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
function useReveal(dep) {
  React.useEffect(() => {
    const root = document.documentElement;
    root.classList.add('js-reveal');
    const els = [...document.querySelectorAll('[data-reveal]:not([data-in])')];
    if (prefersStill() || document.hidden || !('IntersectionObserver' in window)) {
      els.forEach(e => e.setAttribute('data-in', ''));
      return;
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.setAttribute('data-in', '');
          io.unobserve(en.target);
        }
      });
    }, {
      rootMargin: '0px 0px -8% 0px',
      threshold: 0.08
    });
    els.forEach(e => io.observe(e));
    const t = setTimeout(() => els.forEach(e => {
      const r = e.getBoundingClientRect();
      if (r.top < innerHeight) e.setAttribute('data-in', '');
    }), 2000);
    return () => {
      io.disconnect();
      clearTimeout(t);
    };
  }, [dep]);
}
function useScrolled(px = 8) {
  const [s, setS] = React.useState(false);
  React.useEffect(() => {
    const on = () => setS((document.scrollingElement.scrollTop || 0) > px);
    on();
    addEventListener('scroll', on, {
      passive: true
    });
    return () => removeEventListener('scroll', on);
  }, [px]);
  return s;
}
function useActiveHeading(ids, dep) {
  const [active, setActive] = React.useState(ids[0]);
  React.useEffect(() => {
    const on = () => {
      let cur = ids[0];
      ids.forEach(id => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 140) cur = id;
      });
      setActive(cur);
    };
    on();
    addEventListener('scroll', on, {
      passive: true
    });
    return () => removeEventListener('scroll', on);
  }, [dep]);
  return active;
}
Object.assign(window, {
  useReveal,
  useScrolled,
  useActiveHeading,
  prefersStill
});
})();
(() => {
const ICON_BASE = 'assets/icons/';
function mailtoHello(subject, body) {
  const params = [subject && 'subject=' + encodeURIComponent(subject), body && 'body=' + encodeURIComponent(body)].filter(Boolean);
  return 'mailto:hello@undeify.com' + (params.length ? '?' + params.join('&') : '');
}
function LogoMark({
  size = 24
}) {
  return React.createElement("img", {
    src: "assets/logo-mark.svg",
    width: size,
    height: size,
    alt: "",
    style: {
      width: size,
      height: size
    }
  });
}
function Brand({
  onNav
}) {
  return React.createElement("a", {
    className: "brand",
    href: routeHref('home'),
    "aria-label": "Undeify, home",
    onClick: e => {
      e.preventDefault();
      onNav && onNav('home');
    }
  }, React.createElement(LogoMark, null), " Undeify");
}
function Icon({
  name,
  size = 16,
  style
}) {
  return React.createElement("img", {
    src: ICON_BASE + name + '.svg',
    width: size,
    height: size,
    alt: "",
    style: {
      width: size,
      height: size,
      ...style
    }
  });
}
function Button({
  variant = 'dark',
  size = 'md',
  children,
  onClick,
  href,
  style
}) {
  const cls = `btn btn--${variant}${size === 'sm' ? ' btn--sm' : ''}`;
  if (href) return React.createElement("a", {
    className: cls,
    href: href,
    onClick: onClick,
    style: style
  }, children);
  return React.createElement("button", {
    type: "button",
    className: cls,
    onClick: onClick,
    style: style
  }, children);
}
function TextLink({
  children,
  href = '#',
  onClick
}) {
  return React.createElement("a", {
    className: "flist__more",
    href: href,
    onClick: onClick
  }, children);
}
Object.assign(window, {
  LogoMark,
  Brand,
  Icon,
  Button,
  TextLink,
  mailtoHello
});
})();
(() => {
function NowIllustration() {
  const places = [['a', 'Yaba', 'food'], ['b', 'Ikeja', 'live music'], ['c', 'Victoria Island', 'art'], ['d', 'Lekki', 'beach']];
  const posts = [['', 'Yaba', 'food', 'Worth it'], ['av--2', 'Lekki', 'beach', 'Worth it'], ['av--3', 'Ikeja', 'live music', 'Skip'], ['', 'Victoria Island', 'art', 'Worth it']];
  return React.createElement("div", {
    className: "shot shot--panel"
  }, React.createElement("div", {
    className: "win"
  }, React.createElement("div", {
    className: "win__bar"
  }, React.createElement("i", null), React.createElement("i", null), React.createElement("i", null), React.createElement("b", null, "NOW"), React.createElement("span", {
    className: "win__search"
  }, "Search places in Lagos")), React.createElement("div", {
    className: "win__body map"
  }, ['a', 'b', 'c', 'd'].map(r => React.createElement("i", {
    key: r,
    className: `road road--${r}`
  })), places.map(([k, n, t]) => React.createElement("div", {
    key: k,
    className: `place place--${k}`
  }, React.createElement("span", null, n, " ", React.createElement("em", null, "\xB7 ", t)))))), React.createElement("div", {
    className: "phone"
  }, React.createElement("p", {
    className: "phone__title"
  }, "Near you"), posts.map(([av, n, t, v], i) => React.createElement("div", {
    className: "post",
    key: i
  }, React.createElement("i", {
    className: `av ${av}`
  }), React.createElement("div", null, React.createElement("b", null, n), React.createElement("span", null, t)), React.createElement("em", {
    className: v === 'Skip' ? 'meh' : ''
  }, v)))), React.createElement("figcaption", {
    className: "shot__caption"
  }, "Illustration of NOW, not a screenshot"));
}
const ROTA = {
  'Front desk': ['am', 'am', 'pm', 'am', 'leave', 'pm', ''],
  Kitchen: ['pm', '', 'am', 'am', 'pm', 'am', 'am'],
  Service: ['am', 'pm', 'pm', '', 'am', 'am', 'pm'],
  Cleaning: ['', 'am', 'leave', 'leave', 'am', 'pm', 'am']
};
function ShiftIllustration() {
  const [active, setActive] = React.useState('Rota');
  return React.createElement("div", {
    className: "shot shot--panel"
  }, React.createElement("div", {
    className: "win win--wide"
  }, React.createElement("div", {
    className: "win__bar"
  }, React.createElement("i", null), React.createElement("i", null), React.createElement("i", null), React.createElement("b", null, "ShiftOS"), React.createElement("span", {
    className: "win__search"
  }, "This week")), React.createElement("div", {
    className: "win__body win__split"
  }, React.createElement("ul", {
    className: "side"
  }, ['Rota', 'Attendance', 'Leave', 'Team'].map(s => React.createElement("li", {
    key: s,
    className: s === active ? 'on' : '',
    onClick: () => setActive(s),
    style: {
      cursor: 'pointer'
    }
  }, s))), React.createElement("div", {
    className: "rota"
  }, React.createElement("span", null), ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => React.createElement("span", {
    key: d,
    className: "day"
  }, d)), Object.entries(ROTA).map(([team, cells]) => React.createElement(React.Fragment, {
    key: team
  }, React.createElement("span", null, team), cells.map((c, i) => React.createElement("b", {
    key: i,
    className: c
  }))))))), React.createElement("div", {
    className: "phone"
  }, React.createElement("p", {
    className: "phone__title"
  }, "My shifts"), React.createElement("div", {
    className: "post"
  }, React.createElement("i", {
    className: "sq"
  }), React.createElement("div", null, React.createElement("b", null, "Mon"), React.createElement("span", null, "Morning \xB7 Front desk"))), React.createElement("div", {
    className: "post"
  }, React.createElement("i", {
    className: "sq"
  }), React.createElement("div", null, React.createElement("b", null, "Tue"), React.createElement("span", null, "Morning \xB7 Front desk"))), React.createElement("div", {
    className: "post"
  }, React.createElement("i", {
    className: "sq sq--pm"
  }), React.createElement("div", null, React.createElement("b", null, "Wed"), React.createElement("span", null, "Evening \xB7 Front desk"))), React.createElement("div", {
    className: "post"
  }, React.createElement("i", {
    className: "sq sq--leave"
  }), React.createElement("div", null, React.createElement("b", null, "Fri"), React.createElement("span", null, "Leave approved")))), React.createElement("figcaption", {
    className: "shot__caption"
  }, "Illustration of ShiftOS, not a screenshot"));
}
Object.assign(window, {
  NowIllustration,
  ShiftIllustration
});
})();
(() => {
const TYPED = ['for teams that work in shifts.', 'for finding Lagos spots worth it.', 'made in Nigeria, by its founders.'];
function TypedLine() {
  const [text, setText] = React.useState(TYPED[0]);
  React.useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let w = 0,
      n = TYPED[0].length,
      dir = -1,
      t;
    const tick = () => {
      n += dir;
      setText(TYPED[w].slice(0, n));
      if (dir < 0 && n === 0) {
        w = (w + 1) % TYPED.length;
        dir = 1;
        t = setTimeout(tick, 300);
        return;
      }
      if (dir > 0 && n === TYPED[w].length) {
        dir = -1;
        t = setTimeout(tick, 2200);
        return;
      }
      t = setTimeout(tick, dir < 0 ? 28 : 55);
    };
    t = setTimeout(tick, 2600);
    return () => clearTimeout(t);
  }, []);
  return React.createElement("p", {
    className: "typed"
  }, text);
}
function Hero({
  onNav
}) {
  return React.createElement("section", {
    className: "hero wrap"
  }, React.createElement("div", {
    className: "hero__body"
  }, React.createElement("div", {
    className: "hero__copy"
  }, React.createElement("p", {
    className: "recap"
  }, React.createElement("a", {
    href: routeHref('about'),
    onClick: e => {
      e.preventDefault();
      onNav('about');
    }
  }, "Built in Nigeria ", React.createElement(Icon, {
    name: "chevron-right",
    size: 12
  }))), React.createElement("h1", null, "Software we build and stand behind"), React.createElement(TypedLine, null), React.createElement("div", {
    className: "hero__actions"
  }, React.createElement(Button, {
    variant: "dark",
    href: routeHref('home#beta'),
    onClick: e => {
      e.preventDefault();
      onNav('home#beta');
    }
  }, "Join the NOW beta"), React.createElement(Button, {
    variant: "light",
    onClick: () => onNav('home#now')
  }, "See products ", React.createElement(Icon, {
    name: "chevron-down",
    size: 12,
    style: {
      opacity: 0.7
    }
  }))))), React.createElement(FactsStrip, null));
}
function FactsStrip({
  facts = [['Our own products'], ['Lagos first'], ['2 founders', 1], ['Built in Nigeria']]
}) {
  const renderFacts = group => facts.map(([f, m]) => React.createElement("li", {
    key: `${group}-${f}`,
    className: m ? 'm' : ''
  }, f));
  return React.createElement("div", {
    className: "marks",
    role: "region",
    "aria-label": "At a glance"
  }, React.createElement("div", {
    className: "marks__viewport"
  }, React.createElement("div", {
    className: "marks__track"
  }, React.createElement("ul", {
    className: "marks__group"
  }, renderFacts('visible')), React.createElement("ul", {
    className: "marks__group",
    "aria-hidden": "true"
  }, renderFacts('duplicate-1')), React.createElement("ul", {
    className: "marks__group",
    "aria-hidden": "true"
  }, renderFacts('duplicate-2')), React.createElement("ul", {
    className: "marks__group",
    "aria-hidden": "true"
  }, renderFacts('duplicate-3')))));
}
function Eyebrow({
  name,
  status,
  dot
}) {
  return React.createElement("p", {
    className: "eyebrow",
    "data-reveal": true
  }, React.createElement("i", {
    className: `dot${dot ? ' dot--' + dot : ''}`
  }), React.createElement("b", null, name), status && React.createElement("span", null, "\xB7 ", status));
}
function Feature({
  id,
  title,
  flip,
  eyebrow,
  media,
  stat,
  statRest,
  features,
  more,
  moreTo = 'contact',
  onMore
}) {
  return React.createElement("section", {
    className: `feature${flip ? ' feature--flip' : ''}`,
    id: id
  }, eyebrow && React.createElement(Eyebrow, eyebrow), React.createElement("h2", {
    "data-reveal": true
  }, title), React.createElement("figure", {
    className: "feature__media",
    "data-reveal": true,
    style: {
      '--d': '80ms'
    }
  }, media), React.createElement("div", {
    className: "feature__aside",
    "data-reveal": true,
    style: {
      '--d': '200ms'
    }
  }, React.createElement("p", {
    className: "stat"
  }, React.createElement("strong", null, stat), " ", statRest), React.createElement("ul", {
    className: "flist"
  }, React.createElement("li", null, "Features"), features.map(f => React.createElement("li", {
    key: f
  }, f))), React.createElement(TextLink, {
    href: routeHref(moreTo),
    onClick: e => {
      e.preventDefault();
      onMore && onMore();
    }
  }, more, " ", React.createElement(Icon, {
    name: "chevron-right",
    size: 12
  }))));
}
function Waitlist({
  onNav,
  onContact
}) {
  return React.createElement("section", {
    className: "waitlist wrap",
    id: "beta"
  }, React.createElement("div", {
    className: "waitlist__intro"
  }, React.createElement("p", {
    className: "eyebrow",
    "data-reveal": true
  }, React.createElement("i", {
    className: "dot dot--hollow"
  }), React.createElement("b", null, "NOW"), React.createElement("span", null, "\xB7 Private beta in Lagos")), React.createElement("h2", {
    "data-reveal": true
  }, "Be first to see where Lagos actually goes"), React.createElement("p", {
    className: "waitlist__lede",
    "data-reveal": true
  }, "NOW opens to a small group of testers in Lagos first. Join the waitlist and we will email you once, when your invite is ready. No newsletter, no spam.")), React.createElement("div", {
    className: "email-card",
    "data-reveal": true
  }, React.createElement("p", {
    className: "email-card__title"
  }, "Join the beta waitlist"), React.createElement("ol", {
    className: "steps"
  }, React.createElement("li", null, "Enter your email address and a message."), React.createElement("li", null, "Confirm you are 18 or over. NOW is for adults only."), React.createElement("li", null, "We will email you when your invite is ready.")), React.createElement("div", {
    className: "email-card__actions"
  }, React.createElement(Button, {
    variant: "dark",
    onClick: () => onContact('Join the NOW beta', 'waitlist')
  }, "Email to join the beta"), React.createElement(CopyEmail, null)), React.createElement("p", {
    className: "email-card__note"
  }, "We use your details to manage your beta invitation. Read our ", React.createElement("a", {
    href: routeHref('privacy'),
    onClick: e => {
      e.preventDefault();
      onNav('privacy');
    }
  }, "Privacy notice"), ".")));
}
Object.assign(window, {
  Hero,
  TypedLine,
  FactsStrip,
  Eyebrow,
  Feature,
  Waitlist
});
})();
(() => {
const NAV_PRODUCTS = [{
  icon: 'map-pin',
  title: 'NOW',
  desc: 'A social map of places, starting in Lagos',
  to: 'home#now'
}, {
  icon: 'calendar',
  title: 'ShiftOS',
  desc: 'Scheduling and operations for shift teams',
  to: 'home#shiftos'
}, {
  icon: 'lines',
  title: 'In research',
  desc: 'Learning Yorùbá, for families abroad',
  to: 'about'
}];
const NAV_COMPANY = [{
  icon: 'user',
  title: 'About',
  desc: 'Who we are and how we work',
  to: 'about'
}, {
  icon: 'lock',
  title: 'Privacy',
  desc: 'What this site collects and why',
  to: 'privacy'
}, {
  icon: 'doc',
  title: 'Terms',
  desc: 'Using this website',
  to: 'terms'
}];
function NavDrop({
  label,
  title,
  items,
  onNav
}) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  const id = `drop-${label.toLowerCase()}`;
  React.useEffect(() => {
    if (!open) return;
    const outside = e => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const esc = e => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', outside);
    document.addEventListener('keydown', esc);
    return () => {
      document.removeEventListener('pointerdown', outside);
      document.removeEventListener('keydown', esc);
    };
  }, [open]);
  return React.createElement("div", {
    className: `nav__item${open ? ' is-open' : ''}`,
    ref: ref
  }, React.createElement("button", {
    className: "nav__link",
    type: "button",
    "aria-expanded": open,
    "aria-controls": id,
    onClick: () => setOpen(!open)
  }, label, " ", React.createElement(Icon, {
    name: "chevron-down",
    size: 12
  })), React.createElement("div", {
    className: "drop",
    id: id
  }, React.createElement("p", {
    className: "drop__title"
  }, title), items.map(it => React.createElement("a", {
    key: it.title,
    href: routeHref(it.to),
    onClick: e => {
      e.preventDefault();
      setOpen(false);
      onNav(it.to);
    }
  }, React.createElement("span", {
    className: "ico"
  }, React.createElement(Icon, {
    name: it.icon
  })), React.createElement("b", null, it.title), React.createElement("span", null, it.desc)))));
}
function Header({
  onNav,
  menuOpen,
  setMenuOpen
}) {
  const go = to => e => {
    e.preventDefault();
    onNav(to);
  };
  const scrolled = useScrolled();
  React.useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);
  React.useEffect(() => {
    const k = e => e.key === 'Escape' && setMenuOpen(false);
    addEventListener('keydown', k);
    return () => removeEventListener('keydown', k);
  }, []);
  return React.createElement(React.Fragment, null, React.createElement("header", {
    className: `header${scrolled || menuOpen ? ' is-scrolled' : ''}`
  }, React.createElement("div", {
    className: "header__in"
  }, React.createElement(Brand, {
    onNav: onNav
  }), React.createElement("nav", {
    className: "nav",
    "aria-label": "Main"
  }, React.createElement(NavDrop, {
    label: "Products",
    title: "Products",
    items: NAV_PRODUCTS,
    onNav: onNav
  }), React.createElement(NavDrop, {
    label: "Company",
    title: "Company",
    items: NAV_COMPANY,
    onNav: onNav
  }), React.createElement("a", {
    className: "nav__link",
    href: routeHref('contact'),
    onClick: go('contact')
  }, "Contact")), React.createElement("div", {
    className: "header__actions"
  }, React.createElement(Button, {
    variant: "dark",
    size: "sm",
    href: routeHref('home#beta'),
    onClick: go('home#beta')
  }, "Join the beta")), React.createElement("button", {
    className: "burger",
    type: "button",
    "aria-label": menuOpen ? 'Close menu' : 'Open menu',
    "aria-expanded": menuOpen,
    "aria-controls": "mmenu",
    onClick: () => setMenuOpen(!menuOpen)
  }, React.createElement("i", null)))), React.createElement("nav", {
    className: `mmenu${menuOpen ? ' is-open' : ''}`,
    id: "mmenu",
    "aria-label": "Menu"
  }, React.createElement("div", {
    className: "mmenu__group"
  }, React.createElement("p", null, "Products"), React.createElement("a", {
    href: routeHref('home#now'),
    onClick: go('home#now')
  }, "NOW"), React.createElement("a", {
    href: routeHref('home#shiftos'),
    onClick: go('home#shiftos')
  }, "ShiftOS"), React.createElement("a", {
    href: routeHref('about'),
    onClick: go('about')
  }, "In research")), React.createElement("div", {
    className: "mmenu__group"
  }, React.createElement("p", null, "Company"), React.createElement("a", {
    href: routeHref('about'),
    onClick: go('about')
  }, "About"), React.createElement("a", {
    href: routeHref('contact'),
    onClick: go('contact')
  }, "Contact"), React.createElement("a", {
    href: routeHref('privacy'),
    onClick: go('privacy')
  }, "Privacy"), React.createElement("a", {
    href: routeHref('terms'),
    onClick: go('terms')
  }, "Terms of use")), React.createElement("div", {
    className: "mmenu__actions"
  }, React.createElement(Button, {
    variant: "dark",
    href: routeHref('home#beta'),
    onClick: go('home#beta')
  }, "Join the NOW beta"))));
}
Object.assign(window, {
  Header,
  NavDrop
});
})();
(() => {
function Footer({
  onNav
}) {
  const go = to => e => {
    e.preventDefault();
    onNav(to);
  };
  return React.createElement("footer", {
    className: "footer"
  }, React.createElement("div", {
    className: "wrap"
  }, React.createElement("div", {
    className: "footer__cols"
  }, React.createElement("nav", null, React.createElement("h2", null, "Products"), React.createElement("ul", null, React.createElement("li", null, React.createElement("a", {
    href: routeHref('home#now'),
    onClick: go('home#now')
  }, "NOW")), React.createElement("li", null, React.createElement("a", {
    href: routeHref('home#shiftos'),
    onClick: go('home#shiftos')
  }, "ShiftOS")), React.createElement("li", null, React.createElement("a", {
    href: routeHref('about'),
    onClick: go('about')
  }, "In research")))), React.createElement("nav", null, React.createElement("h2", null, "Company"), React.createElement("ul", null, React.createElement("li", null, React.createElement("a", {
    href: routeHref('about'),
    onClick: go('about')
  }, "About")), React.createElement("li", null, React.createElement("a", {
    href: routeHref('home#beta'),
    onClick: go('home#beta')
  }, "NOW beta")), React.createElement("li", null, React.createElement("a", {
    href: routeHref('contact'),
    onClick: go('contact')
  }, "Contact")))), React.createElement("nav", null, React.createElement("h2", null, "Legal"), React.createElement("ul", null, React.createElement("li", null, React.createElement("a", {
    href: routeHref('privacy'),
    onClick: go('privacy')
  }, "Privacy notice")), React.createElement("li", null, React.createElement("a", {
    href: routeHref('terms'),
    onClick: go('terms')
  }, "Terms of use")), React.createElement("li", null, React.createElement("button", {
    type: "button",
    onClick: () => window.undeifyConsent.open(true)
  }, "Cookie settings")))), React.createElement("div", null, React.createElement("h2", null, "Contact"), React.createElement("ul", null, React.createElement("li", null, React.createElement("a", {
    href: "mailto:hello@undeify.com"
  }, "hello@undeify.com")))), React.createElement("div", null, React.createElement("h2", null, "Location"), React.createElement("ul", null, React.createElement("li", null, React.createElement("span", null, "Nigeria"))))), React.createElement("div", {
    className: "footer__bottom"
  }, React.createElement(Brand, {
    onNav: onNav
  }), React.createElement("span", null, "\xA9 2026 Undeify."))));
}
function CopyEmail({
  email = 'hello@undeify.com'
}) {
  const [done, setDone] = React.useState(false);
  return React.createElement("button", {
    className: "copy",
    type: "button",
    "data-done": done ? '' : undefined,
    onClick: () => {
      if (!navigator.clipboard) {
        window.location.href = `mailto:${email}`;
        return;
      }
      navigator.clipboard.writeText(email).then(() => {
        setDone(true);
        setTimeout(() => setDone(false), 1500);
      }).catch(() => {
        window.location.href = `mailto:${email}`;
      });
    }
  }, React.createElement("span", {
    className: "mono"
  }, email), React.createElement("i", null, React.createElement(Icon, {
    name: "copy",
    size: 15
  })));
}
function Closing({
  title = 'Built in Nigeria, by its founders',
  onContact
}) {
  return React.createElement("section", {
    className: "closing wrap"
  }, React.createElement("h2", {
    "data-reveal": true
  }, title), React.createElement("p", {
    className: "closing__lede",
    "data-reveal": true
  }, "Questions about NOW or ShiftOS? Write to us. A founder reads every email and replies within two working days."), React.createElement("div", {
    className: "closing__actions",
    "data-reveal": true,
    style: {
      '--d': '120ms'
    }
  }, React.createElement(Button, {
    variant: "dark",
    onClick: () => onContact('Hello')
  }, "Email a founder"), React.createElement(CopyEmail, null)));
}
Object.assign(window, {
  Footer,
  CopyEmail,
  Closing
});
})();
(() => {
const slug = t => String(t).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
function DocPage({
  title,
  updated = 'Last updated 21 October 2026',
  children
}) {
  const kids = React.Children.toArray(children);
  const heads = kids.filter(k => k.type === 'h2').map(k => ({
    id: slug(k.props.children),
    label: k.props.children
  }));
  const withIds = kids.map(k => k.type === 'h2' ? React.cloneElement(k, {
    id: k.props.id || slug(k.props.children)
  }) : k);
  const active = useActiveHeading(heads.map(h => h.id), title);
  const jump = id => e => {
    e.preventDefault();
    const el = document.getElementById(id);
    document.scrollingElement.scrollTo({
      top: el.getBoundingClientRect().top + document.scrollingElement.scrollTop - 96,
      behavior: prefersStill() ? 'auto' : 'smooth'
    });
  };
  return React.createElement("div", {
    className: "doc-layout wrap"
  }, React.createElement("nav", {
    className: "toc",
    "aria-label": "On this page"
  }, React.createElement("p", null, "On this page"), heads.map(h => React.createElement("a", {
    key: h.id,
    href: '#' + h.id,
    className: active === h.id ? 'on' : '',
    onClick: jump(h.id)
  }, h.label))), React.createElement("main", {
    className: "doc",
    id: "main"
  }, React.createElement("h1", null, title), React.createElement("p", {
    className: "updated"
  }, updated), withIds));
}
const Mail = ({
  subject
}) => React.createElement("a", {
  href: `mailto:hello@undeify.com${subject ? '?subject=' + encodeURIComponent(subject) : ''}`
}, "hello@undeify.com");
function AboutPage({
  onNav
}) {
  const openContact = e => {
    e.preventDefault();
    onNav('contact');
  };
  return React.createElement(DocPage, {
    title: "About Undeify"
  }, React.createElement("p", {
    className: "lede"
  }, React.createElement("strong", null, "Undeify is a product company, not an agency."), " We pick problems we understand, build software for them, and stay to run and improve it long after launch."), React.createElement("h2", null, "Who we are"), React.createElement("p", null, "Undeify was started by Isaac and Tolu, who design, build and support everything themselves. Isaac leads the company; Tolu leads development. The people who wrote the code are the people who answer your email."), React.createElement("p", null, "We are completing our registration with the Corporate Affairs Commission. Our registered name and number will appear on this page once it is done."), React.createElement("h2", null, "How we work"), React.createElement("ul", null, React.createElement("li", null, React.createElement("b", null, "Our own products."), " We do not build websites or apps for clients. Everything we make carries our name, so we decide what goes in, what stays out, and when it is ready."), React.createElement("li", null, React.createElement("b", null, "Built for Nigerian law."), " We design every product around the Nigeria Data Protection Act 2023: collect only what a feature needs, say plainly why, and keep it no longer than necessary.")), React.createElement("h2", null, "What we are building"), React.createElement("ul", null, React.createElement("li", null, React.createElement("b", null, "NOW"), ", a social map of places, starting with a private beta in Lagos. In development; ", React.createElement("a", {
    href: routeHref('home#beta'),
    onClick: e => {
      e.preventDefault();
      onNav('home#beta');
    }
  }, "join the beta waitlist"), "."), React.createElement("li", null, React.createElement("b", null, "ShiftOS"), ", scheduling and operations for teams that work in shifts. Running in production.")), React.createElement("h2", null, "In research"), React.createElement("p", null, "We are researching an app for learning Yor\xF9b\xE1, made for families who live abroad, starting with parents who want to learn it themselves. It is on hold while NOW comes first, and we will build it only once people tell us they need it."), React.createElement("h2", null, "Contact"), React.createElement("p", null, "Write to ", React.createElement(Mail, null), ", or see our ", React.createElement("a", {
    href: routeHref('contact'),
    onClick: openContact
  }, "contact page"), ". A founder replies within two working days."));
}
function PrivacyPage() {
  return React.createElement(DocPage, {
    title: "Privacy notice",
    updated: "Last updated 22 October 2026"
  }, React.createElement("p", null, "This notice explains how Undeify handles personal data on this website, undeify.com. Each of our products has its own privacy notice, shown before that product collects anything."), React.createElement("h2", null, "Who we are"), React.createElement("p", null, "Undeify is a software company in Nigeria. We are completing our registration with the Corporate Affairs Commission, and our registered name and number will be added here when it is done. For anything about your data, write to ", React.createElement(Mail, null), "."), React.createElement("h2", null, "What this website collects"), React.createElement("p", null, "This website has no accounts or advertising. Its fonts, images, React runtime and page code are served from this site."), React.createElement("ul", null, React.createElement("li", null, React.createElement("b", null, "Visit counts, without cookies."), " Vercel Web Analytics counts page views on visits. It records the page, referring site, country, and device, browser and operating system type. It sets no cookies and stores nothing on your device."), React.createElement("li", null, React.createElement("b", null, "Analytics, only if you agree."), " If you choose Accept, Google Analytics counts visits and the pages read. Google receives standard request details, including your IP address and browser information. We have disabled Google advertising features."), React.createElement("li", null, React.createElement("b", null, "Server logs."), " Our hosting provider receives the technical details needed to deliver the site and protect it, including your IP address, browser type and requested pages."), React.createElement("li", null, React.createElement("b", null, "Cookie choice."), " Your browser stores whether you accepted or declined analytics in local storage so we can remember your choice. It is not sent to us."), React.createElement("li", null, React.createElement("b", null, "Contact form messages."), " If you send us a message, we receive your email address, subject and message so we can respond. The form sends this information through Resend to our hello@undeify.com mailbox. Please do not include passwords, card details or other sensitive information."), React.createElement("li", null, React.createElement("b", null, "NOW beta waitlist."), " If you join the waitlist, we also receive your first name and confirmation that you are 18 or over. We use your details only to manage your beta invitation and check you are old enough to use NOW.")), React.createElement("h2", {
    id: "analytics"
  }, "Cookies and analytics"), React.createElement("p", null, "On your first visit, we ask whether you allow Google Analytics. It does not load unless you choose Accept. If you decline, it does not load. If you later change your mind, use Cookie settings in the footer. When you withdraw consent after accepting, we tell Google Analytics to stop and delete its cookies from this browser where possible."), React.createElement("p", null, "If you accept, Google Analytics uses the ", React.createElement("code", null, "_ga"), " and ", React.createElement("code", null, "_ga_YMEL5ZY0SJ"), " cookies for up to 13 months. We have disabled Google signals and advertising personalisation. Vercel Web Analytics runs separately and does not use cookies."), React.createElement("h2", null, "Why we use this information"), React.createElement("p", null, "We rely on our legitimate interests in operating this website, including cookie-free visit counts, and on your consent for Google Analytics. We use contact form messages to respond and keep a record of the conversation. We rely on your consent for the NOW waitlist, and you can withdraw it at any time by writing to us. We never sell personal data or use it for advertising."), React.createElement("h2", null, "How long we keep it"), React.createElement("p", null, "Google keeps detailed analytics data for two months; after that, only totals remain. Hosting logs and visit counts are kept by Vercel for the period its service provides. We keep emails for as long as the conversation is active and for up to two years afterwards, unless the law requires us to keep them longer. We keep NOW waitlist details until we have sent your beta invite, or for 12 months at most, and delete them sooner if you ask."), React.createElement("h2", null, "Where it is processed"), React.createElement("p", null, "Google, Vercel, Resend and our email provider, Zoho Mail, may process data outside Nigeria, including in the United States. Where that happens, we rely on the safeguards the Nigeria Data Protection Act 2023 allows for transfers abroad. Resend processes contact form messages to deliver them to us; its ", React.createElement("a", {
    href: "https://resend.com/legal/privacy-policy"
  }, "privacy policy"), " describes its handling of service data."), React.createElement("h2", null, "Your rights"), React.createElement("p", null, "Under the Nigeria Data Protection Act 2023 you can ask us to tell you what personal data we hold about you, to correct it, to delete it, to stop or limit how we use it, and to give you a copy. Write to ", React.createElement(Mail, {
    subject: "Data request"
  }), " and we will answer within 30 days. If you are not satisfied with our answer, you can complain to the Nigeria Data Protection Commission."), React.createElement("h2", null, "Changes"), React.createElement("p", null, "If we change this notice, we will update the date at the top of this page."));
}
function TermsPage() {
  return React.createElement(DocPage, {
    title: "Terms of use"
  }, React.createElement("p", null, "These terms cover your use of this website, undeify.com. Each Undeify product has its own terms, which you will see before you use it."), React.createElement("h2", null, "Using this website"), React.createElement("p", null, "You may read, link to and share the pages on this website. Please use it lawfully and do not use it to harm anyone."), React.createElement("h2", null, "Our content"), React.createElement("p", null, "The text, design, images and names on this website belong to Undeify or are used with permission. You may not copy them for commercial use without our written agreement."), React.createElement("h2", null, "Accuracy"), React.createElement("p", null, "We keep this website accurate and up to date, but it describes products that are still being built and may change. Nothing here is a contract to provide a product or service."), React.createElement("h2", null, "Liability"), React.createElement("p", null, "This website is provided as it is. As far as the law allows, Undeify is not liable for any loss caused by relying on it or by it being unavailable."), React.createElement("h2", null, "Law"), React.createElement("p", null, "These terms are governed by the laws of the Federal Republic of Nigeria."), React.createElement("h2", null, "Contact"), React.createElement("p", null, "Questions about these terms: ", React.createElement(Mail, {
    subject: "Terms"
  }), "."));
}
Object.assign(window, {
  DocPage,
  AboutPage,
  PrivacyPage,
  TermsPage
});
})();
(() => {
function ContactDialog({
  request,
  onClose
}) {
  const dialogRef = React.useRef(null);
  const [status, setStatus] = React.useState({
    type: 'idle',
    message: ''
  });
  const waitlist = request && request.purpose === 'waitlist';
  React.useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && request && !dialog.open) {
      dialog.showModal();
      const firstField = dialog.querySelector('.contact-form__field input');
      if (firstField) firstField.focus();
    }
    return () => {
      if (dialog && dialog.open) dialog.close();
    };
  }, [request]);
  if (!request) return null;
  const submit = async event => {
    event.preventDefault();
    if (status.type === 'sending') return;
    setStatus({
      type: 'sending',
      message: 'Sending your message…'
    });
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      email: data.get('email'),
      subject: data.get('subject'),
      message: data.get('message'),
      name: data.get('name') || '',
      purpose: waitlist ? 'waitlist' : 'contact',
      adultConfirmed: data.get('adultConfirmed') === 'on',
      website: data.get('website') || ''
    };
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || 'Your message could not be sent.');
      setStatus({
        type: 'success',
        message: 'Your message has been sent. A founder will reply within two working days.'
      });
      form.reset();
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message || 'We could not send your message. Please email hello@undeify.com instead.'
      });
    }
  };
  return React.createElement("dialog", {
    className: "contact-dialog",
    ref: dialogRef,
    "aria-labelledby": "contact-dialog-title",
    "aria-describedby": "contact-dialog-description",
    onKeyDown: event => {
      if (event.key === 'Escape') {
        event.preventDefault();
        dialogRef.current.close();
      }
    },
    onCancel: event => {
      event.preventDefault();
      dialogRef.current.close();
    },
    onClose: onClose
  }, React.createElement("div", {
    className: "contact-dialog__header"
  }, React.createElement("div", null, React.createElement("h2", {
    id: "contact-dialog-title"
  }, waitlist ? 'Join the NOW beta' : 'Send a message'), React.createElement("p", {
    id: "contact-dialog-description"
  }, "A founder reads every message and replies within two working days.")), React.createElement("button", {
    className: "contact-dialog__close",
    type: "button",
    onClick: () => dialogRef.current.close(),
    "aria-label": "Close contact form"
  }, "Close")), status.type === 'success' ? React.createElement("div", {
    className: "contact-dialog__result",
    role: "status"
  }, React.createElement("p", null, status.message), React.createElement("button", {
    className: "btn btn--dark",
    type: "button",
    onClick: () => dialogRef.current.close()
  }, "Close")) : React.createElement("form", {
    className: "contact-form",
    onSubmit: submit
  }, waitlist && React.createElement("div", {
    className: "contact-form__field"
  }, React.createElement("label", {
    htmlFor: "contact-name"
  }, "First name"), React.createElement("input", {
    id: "contact-name",
    name: "name",
    type: "text",
    autoComplete: "given-name",
    maxLength: "100",
    autoFocus: true,
    required: true
  })), React.createElement("div", {
    className: "contact-form__field"
  }, React.createElement("label", {
    htmlFor: "contact-email"
  }, "Your email"), React.createElement("input", {
    id: "contact-email",
    name: "email",
    type: "email",
    autoComplete: "email",
    maxLength: "254",
    autoFocus: !waitlist,
    required: true
  })), React.createElement("div", {
    className: "contact-form__field"
  }, React.createElement("label", {
    htmlFor: "contact-subject"
  }, "Subject"), React.createElement("input", {
    id: "contact-subject",
    name: "subject",
    type: "text",
    maxLength: "160",
    defaultValue: request.subject,
    required: true
  })), React.createElement("div", {
    className: "contact-form__field"
  }, React.createElement("label", {
    htmlFor: "contact-message"
  }, "Message"), React.createElement("textarea", {
    id: "contact-message",
    name: "message",
    rows: "6",
    maxLength: "5000",
    required: true
  })), waitlist && React.createElement("label", {
    className: "contact-form__consent"
  }, React.createElement("input", {
    type: "checkbox",
    name: "adultConfirmed",
    required: true
  }), React.createElement("span", null, "I agree to use my details to manage my NOW beta invitation, and I confirm I am 18 or over.")), React.createElement("div", {
    className: "contact-form__trap",
    "aria-hidden": "true"
  }, React.createElement("label", {
    htmlFor: "contact-website"
  }, "Leave this field empty"), React.createElement("input", {
    id: "contact-website",
    name: "website",
    type: "text",
    tabIndex: "-1",
    autoComplete: "off"
  })), React.createElement("p", {
    className: "contact-form__privacy"
  }, "Please do not include passwords, card details or other sensitive information. Read our ", React.createElement("a", {
    href: routeHref('privacy')
  }, "Privacy notice"), "."), React.createElement("div", {
    className: "contact-form__actions"
  }, React.createElement("button", {
    className: "btn btn--dark",
    type: "submit",
    disabled: status.type === 'sending'
  }, status.type === 'sending' ? 'Sending…' : 'Send message'), React.createElement("button", {
    className: "btn btn--light",
    type: "button",
    onClick: () => dialogRef.current.close()
  }, "Cancel")), status.message && React.createElement("p", {
    className: `contact-form__status contact-form__status--${status.type}`,
    role: status.type === 'error' ? 'alert' : 'status',
    "aria-live": "polite"
  }, status.message, status.type === 'error' && React.createElement(React.Fragment, null, " ", React.createElement("a", {
    href: mailtoHello()
  }, "Email hello@undeify.com instead.")))));
}
Object.assign(window, {
  ContactDialog
});
})();
(() => {
const CONTACT_TOPICS = [['NOW', 'The beta, a place listing or a problem with the app', 'NOW'], ['ShiftOS', 'A demo, or a question about rotas, attendance and leave', 'ShiftOS'], ['Your data', 'A request about personal data we hold about you', 'Data request'], ['Anything else', 'Partnerships, press or a general question', 'Hello']];
function ContactPage({
  onNav,
  onContact
}) {
  return React.createElement("main", {
    className: "contact-page wrap",
    id: "main"
  }, React.createElement("div", {
    className: "contact-page__intro"
  }, React.createElement("h1", null, "Contact Undeify"), React.createElement("p", {
    className: "contact-page__lede"
  }, "Email us at ", React.createElement("a", {
    href: mailtoHello()
  }, "hello@undeify.com"), ". A founder reads every message and replies within two working days."), React.createElement("p", {
    className: "contact-page__fallback"
  }, "Please do not send passwords, card details or other sensitive information by email. Read our ", React.createElement("a", {
    href: routeHref('privacy'),
    onClick: e => {
      e.preventDefault();
      onNav('privacy');
    }
  }, "Privacy notice"), ".")), React.createElement("div", {
    className: "email-card"
  }, React.createElement("p", {
    className: "email-card__title"
  }, "Choose a topic for your message"), React.createElement("ul", {
    className: "topics"
  }, CONTACT_TOPICS.map(([title, desc, subject]) => React.createElement("li", {
    key: title
  }, React.createElement("button", {
    type: "button",
    onClick: () => onContact(subject)
  }, React.createElement("b", null, title), React.createElement("span", null, desc), React.createElement(Icon, {
    name: "chevron-right",
    size: 12
  }))))), React.createElement("div", {
    className: "email-card__actions"
  }, React.createElement(Button, {
    variant: "dark",
    onClick: () => onContact('Hello')
  }, "Email hello@undeify.com"), React.createElement(CopyEmail, null))));
}
Object.assign(window, {
  ContactPage
});
})();
(() => {
const ROUTE_PATHS = {
  home: "/",
  about: "/about.html",
  privacy: "/privacy.html",
  terms: "/terms.html",
  contact: "/contact.html"
};
const PAGE_META = {
  home: {
    title: "Undeify: software we build and stand behind, made in Nigeria",
    description: "Undeify is a Nigerian software company that builds and runs its own products: ShiftOS for teams that work in shifts, and NOW, a social map of Lagos places. Join the NOW beta."
  },
  about: {
    title: "About Undeify",
    description: "Who Undeify is, how we work and what we are building: our own software, designed and built in Nigeria."
  },
  privacy: {
    title: "Privacy notice | Undeify",
    description: "How Undeify handles personal data on this website, including opt-in analytics and contact enquiries."
  },
  terms: {
    title: "Terms of use | Undeify",
    description: "Terms governing your use of the Undeify website."
  },
  contact: {
    title: "Contact Undeify",
    description: "Contact Undeify, a Nigerian software company building its own products."
  }
};
function routeFromPath(pathname) {
  return Object.keys(ROUTE_PATHS).find(route => ROUTE_PATHS[route] === pathname) || "home";
}
function routeHref(to) {
  const [page, hash] = to.split("#");
  return `${ROUTE_PATHS[page] || ROUTE_PATHS.home}${hash ? `#${hash}` : ""}`;
}
window.routeHref = routeHref;
function HomePage({
  onNav,
  onContact
}) {
  return React.createElement("main", {
    id: "main"
  }, React.createElement(Hero, {
    onNav: onNav
  }), React.createElement("div", {
    className: "features wrap"
  }, React.createElement(Feature, {
    id: "now",
    eyebrow: {
      name: "NOW",
      status: "In development · private beta",
      dot: "hollow"
    },
    title: "See where people in Lagos actually go",
    media: React.createElement(NowIllustration, null),
    stat: "NOW is a social map of places,",
    statRest: "starting with a private beta in Lagos.",
    features: ["Posts about places you have been", "Follow friends and see where they go", "Worth-it ratings from real visits", "A map that starts with Lagos"],
    more: "Join the beta waitlist",
    moreTo: "home#beta",
    onMore: () => onNav("home#beta")
  }), React.createElement(Feature, {
    id: "shiftos",
    flip: true,
    eyebrow: {
      name: "ShiftOS",
      status: "Running in production",
      dot: "live"
    },
    title: "Run every shift from one schedule",
    media: React.createElement(ShiftIllustration, null),
    stat: "ShiftOS runs in production",
    statRest: "for teams that work in shifts.",
    features: ["Shift scheduling and rotas", "Attendance", "Leave requests", "Roles for managers, supervisors and staff"],
    more: "Ask about ShiftOS",
    onMore: () => onNav("contact")
  })), React.createElement(Waitlist, {
    onNav: onNav,
    onContact: onContact
  }), React.createElement(Closing, {
    onContact: onContact
  }));
}
function App() {
  const [route, setRoute] = React.useState(() => routeFromPath(window.location.pathname));
  const [hash, setHash] = React.useState(() => window.location.hash);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [contactRequest, setContactRequest] = React.useState(null);
  const contactSequence = React.useRef(0);
  React.useEffect(() => {
    const onPopState = () => {
      setRoute(routeFromPath(window.location.pathname));
      setHash(window.location.hash);
      setMenuOpen(false);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);
  React.useEffect(() => {
    const meta = PAGE_META[route];
    document.title = meta.title;
    document.querySelector('meta[name="description"]').content = meta.description;
    document.querySelector('meta[property="og:title"]').content = meta.title;
    document.querySelector('meta[property="og:description"]').content = meta.description;
    document.querySelector('meta[property="og:url"]').content = `https://www.undeify.com${ROUTE_PATHS[route]}`;
    document.querySelector('meta[name="twitter:title"]').content = meta.title;
    document.querySelector('meta[name="twitter:description"]').content = meta.description;
    document.querySelector('link[rel="canonical"]').href = `https://www.undeify.com${ROUTE_PATHS[route]}`;
  }, [route]);
  React.useEffect(() => {
    const target = hash && document.getElementById(hash.slice(1));
    window.requestAnimationFrame(() => {
      if (!target) {
        window.scrollTo({
          top: 0,
          behavior: "auto"
        });
        return;
      }
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top,
        behavior: prefersStill() ? "auto" : "smooth"
      });
    });
  }, [route, hash]);
  const onNav = to => {
    const [page, section] = to.split("#");
    const nextRoute = ROUTE_PATHS[page] ? page : "home";
    const nextHash = section ? `#${section}` : "";
    const nextUrl = `${ROUTE_PATHS[nextRoute]}${nextHash}`;
    if (`${window.location.pathname}${window.location.hash}` !== nextUrl) {
      window.history.pushState({}, "", nextUrl);
    }
    setRoute(nextRoute);
    setHash(nextHash);
    setMenuOpen(false);
  };
  const openContact = (subject = 'Hello', purpose = 'contact') => {
    setContactRequest({
      subject,
      purpose,
      id: ++contactSequence.current
    });
  };
  const Page = {
    about: AboutPage,
    privacy: PrivacyPage,
    terms: TermsPage,
    contact: ContactPage
  }[route];
  useReveal(route);
  return React.createElement("div", {
    className: "page"
  }, React.createElement("a", {
    className: "skip",
    href: "#main"
  }, "Skip to content"), React.createElement(Header, {
    onNav: onNav,
    menuOpen: menuOpen,
    setMenuOpen: setMenuOpen
  }), React.createElement("div", {
    className: "route",
    key: route
  }, Page ? React.createElement(Page, {
    onNav: onNav,
    onContact: openContact
  }) : React.createElement(HomePage, {
    onNav: onNav,
    onContact: openContact
  })), React.createElement(Footer, {
    onNav: onNav,
    onContact: openContact
  }), React.createElement(ContactDialog, {
    key: contactRequest ? contactRequest.id : 'closed',
    request: contactRequest,
    onClose: () => setContactRequest(null)
  }));
}
ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App, null));
})();
