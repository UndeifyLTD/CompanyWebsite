// Shared contact page used by the site's email and contact entry points.
// Set this public ID only after the Formspree form targets hello@undeify.com.
const FORMSPREE_FORM_ID = '';
const FORMSPREE_ENDPOINT = FORMSPREE_FORM_ID
  ? `https://formspree.io/f/${FORMSPREE_FORM_ID}`
  : '';

function ContactPage({ onNav }) {
  const [status, setStatus] = React.useState('');
  const handleSubmit = (event) => {
    if (FORMSPREE_ENDPOINT) return;
    event.preventDefault();
    setStatus('The form is not configured yet, so nothing was sent. Email hello@undeify.com directly for now.');
  };

  return (
    <main className="contact-page wrap" id="main">
      <div className="contact-page__intro">
        <h1>Contact Undeify</h1>
        <p className="contact-page__lede">Tell us what you are working on. A founder replies within two working days.</p>
        <p className="contact-page__fallback">Need to reach us now? <a href="mailto:hello@undeify.com">hello@undeify.com</a></p>
      </div>
      <form className="contact-form" action={FORMSPREE_ENDPOINT || undefined} method="POST" onSubmit={handleSubmit}>
        <label htmlFor="contact-name">Full name</label>
        <input id="contact-name" name="name" type="text" autoComplete="name" maxLength="120" required />

        <label htmlFor="contact-email">Email address</label>
        <input id="contact-email" name="email" type="email" autoComplete="email" maxLength="254" required />

        <label htmlFor="contact-subject">Subject</label>
        <input id="contact-subject" name="subject" type="text" maxLength="160" required />

        <label htmlFor="contact-message">Message</label>
        <p className="contact-form__hint" id="contact-message-help">Do not include sensitive or confidential information.</p>
        <textarea id="contact-message" name="message" rows="6" maxLength="5000" aria-describedby="contact-message-help" required />

        <p className="contact-form__privacy">We use these details to respond to your enquiry. Read our <a href={routeHref('privacy')} onClick={(e) => { e.preventDefault(); onNav('privacy'); }}>Privacy notice</a>.</p>
        <p className="contact-form__status" role="status">{status || (!FORMSPREE_ENDPOINT && 'Submissions are not available yet. Email hello@undeify.com directly for now.')}</p>
        <button className="btn btn--dark" type="submit" disabled={!FORMSPREE_ENDPOINT}>Send message</button>
      </form>
    </main>
  );
}

Object.assign(window, { ContactPage });
