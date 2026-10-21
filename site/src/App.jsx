const ROUTE_PATHS = {
  home: "/",
  about: "/about.html",
  privacy: "/privacy.html",
  terms: "/terms.html",
  contact: "/contact.html",
};

const PAGE_META = {
  home: {
    title: "Undeify: our own software, built in Nigeria",
    description: "Undeify is a Nigerian software company. We design, build and run our own products, like ShiftOS and NOW, for businesses and everyday people in Nigeria.",
  },
  about: {
    title: "About Undeify",
    description: "Who Undeify is, how we work and what we are building: our own software, designed and built in Nigeria.",
  },
  privacy: {
    title: "Privacy notice | Undeify",
    description: "How Undeify handles personal data on this website, including opt-in analytics and contact enquiries.",
  },
  terms: {
    title: "Terms of use | Undeify",
    description: "Terms governing your use of the Undeify website.",
  },
  contact: {
    title: "Contact Undeify",
    description: "Contact Undeify, a Nigerian software company building its own products.",
  },
};

function routeFromPath(pathname) {
  return Object.keys(ROUTE_PATHS).find((route) => ROUTE_PATHS[route] === pathname) || "home";
}

function routeHref(to) {
  const [page, hash] = to.split("#");
  return `${ROUTE_PATHS[page] || ROUTE_PATHS.home}${hash ? `#${hash}` : ""}`;
}
window.routeHref = routeHref;

function HomePage({ onNav }) {
  return (
    <main id="main">
      <Hero onNav={onNav} />
      <div className="features wrap">
        <Feature id="now" eyebrow={{ name: "NOW", status: "In design · private beta", dot: "hollow" }} title="See where people in Lagos actually go" media={<NowIllustration />}
          stat="NOW is a social map of places," statRest="starting with a private beta in Lagos."
          features={["Posts about places you have been", "Follow friends and see where they go", "Worth-it ratings from real visits", "A map that starts with Lagos"]}
          more="Ask about the beta" onMore={() => onNav("contact")} />
        <Feature id="shiftos" flip eyebrow={{ name: "ShiftOS", status: "Running in production", dot: "live" }} title="Run every shift from one schedule" media={<ShiftIllustration />}
          stat="ShiftOS runs in production" statRest="for teams that work in shifts."
          features={["Shift scheduling and rotas", "Attendance", "Leave requests", "Roles for managers, supervisors and staff"]}
          more="Ask about ShiftOS" onMore={() => onNav("contact")} />
      </div>
      <Shipped onNav={onNav} />
      <Closing onNav={onNav} />
    </main>
  );
}

function App() {
  const [route, setRoute] = React.useState(() => routeFromPath(window.location.pathname));
  const [hash, setHash] = React.useState(() => window.location.hash);
  const [menuOpen, setMenuOpen] = React.useState(false);

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
        window.scrollTo({ top: 0, behavior: "auto" });
        return;
      }
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: prefersStill() ? "auto" : "smooth" });
    });
  }, [route, hash]);

  const onNav = (to) => {
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

  const Page = {
    about: AboutPage,
    privacy: PrivacyPage,
    terms: TermsPage,
    contact: ContactPage,
  }[route];
  useReveal(route);

  return (
    <div className="page">
      <a className="skip" href="#main">Skip to content</a>
      <Header onNav={onNav} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div className="route" key={route}>{Page ? <Page onNav={onNav} /> : <HomePage onNav={onNav} />}</div>
      <Footer onNav={onNav} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
