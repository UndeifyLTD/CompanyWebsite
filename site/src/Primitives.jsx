// Undeify UI kit — primitives: logo, buttons, icons, and email links.
const ICON_BASE = 'assets/icons/';

// Keep a direct email fallback for links outside the contact form.
function mailtoHello(subject, body) {
  const params = [subject && 'subject=' + encodeURIComponent(subject), body && 'body=' + encodeURIComponent(body)].filter(Boolean);
  return 'mailto:hello@undeify.com' + (params.length ? '?' + params.join('&') : '');
}

function LogoMark({ size = 24 }) {
  return <img src="assets/logo-mark.svg" width={size} height={size} alt="" style={{ width: size, height: size }} />;
}

function Brand({ onNav }) {
  return (
    <a className="brand" href={routeHref('home')} aria-label="Undeify, home" onClick={(e) => { e.preventDefault(); onNav && onNav('home'); }}>
      <LogoMark /> Undeify
    </a>
  );
}

function Icon({ name, size = 16, style }) {
  return <img src={ICON_BASE + name + '.svg'} width={size} height={size} alt="" style={{ width: size, height: size, ...style }} />;
}

// variant: 'dark' | 'light'; size: 'md' | 'sm'
function Button({ variant = 'dark', size = 'md', children, onClick, href, style }) {
  const cls = `btn btn--${variant}${size === 'sm' ? ' btn--sm' : ''}`;
  if (href) return <a className={cls} href={href} onClick={onClick} style={style}>{children}</a>;
  return <button type="button" className={cls} onClick={onClick} style={style}>{children}</button>;
}

function TextLink({ children, href = '#', onClick }) {
  return <a className="flist__more" href={href} onClick={onClick}>{children}</a>;
}

Object.assign(window, { LogoMark, Brand, Icon, Button, TextLink, mailtoHello });
