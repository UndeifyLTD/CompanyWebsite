// Contact page. Topic choices prefill the subject in the contact form.
const CONTACT_TOPICS = [
  ['NOW', 'The beta, a place listing or a problem with the app', 'NOW'],
  ['ShiftOS', 'A demo, or a question about rotas, attendance and leave', 'ShiftOS'],
  ['Your data', 'A request about personal data we hold about you', 'Data request'],
  ['Anything else', 'Partnerships, press or a general question', 'Hello'],
];

function ContactPage({ onNav, onContact }) {
  return (
    <main className="contact-page wrap" id="main">
      <div className="contact-page__intro">
        <h1>Contact Undeify</h1>
        <p className="contact-page__lede">Email us at <a href={mailtoHello()}>hello@undeify.com</a>. A founder reads every message and replies within two working days.</p>
        <p className="contact-page__fallback">Please do not send passwords, card details or other sensitive information by email. Read our <a href={routeHref('privacy')} onClick={(e) => { e.preventDefault(); onNav('privacy'); }}>Privacy notice</a>.</p>
      </div>
      <div className="email-card">
        <p className="email-card__title">Choose a topic for your message</p>
        <ul className="topics">
          {CONTACT_TOPICS.map(([title, desc, subject]) => (
            <li key={title}><button type="button" onClick={() => onContact(subject)}><b>{title}</b><span>{desc}</span><Icon name="chevron-right" size={12} /></button></li>
          ))}
        </ul>
        <div className="email-card__actions">
          <Button variant="dark" onClick={() => onContact('Hello')}>Email hello@undeify.com</Button>
          <CopyEmail />
        </div>
      </div>
    </main>
  );
}

Object.assign(window, { ContactPage });
