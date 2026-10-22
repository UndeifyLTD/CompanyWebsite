function ContactDialog({ request, onClose }) {
  const dialogRef = React.useRef(null);
  const [status, setStatus] = React.useState({ type: 'idle', message: '' });
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

  const submit = async (event) => {
    event.preventDefault();
    if (status.type === 'sending') return;
    setStatus({ type: 'sending', message: 'Sending your message…' });

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      email: data.get('email'),
      subject: data.get('subject'),
      message: data.get('message'),
      name: data.get('name') || '',
      purpose: waitlist ? 'waitlist' : 'contact',
      adultConfirmed: data.get('adultConfirmed') === 'on',
      website: data.get('website') || '',
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || 'Your message could not be sent.');
      setStatus({ type: 'success', message: 'Your message has been sent. A founder will reply within two working days.' });
      form.reset();
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message || 'We could not send your message. Please email hello@undeify.com instead.',
      });
    }
  };

  return (
    <dialog className="contact-dialog" ref={dialogRef} aria-labelledby="contact-dialog-title" aria-describedby="contact-dialog-description"
      onKeyDown={(event) => { if (event.key === 'Escape') { event.preventDefault(); dialogRef.current.close(); } }}
      onCancel={(event) => { event.preventDefault(); dialogRef.current.close(); }}
      onClose={onClose}>
      <div className="contact-dialog__header">
        <div>
          <h2 id="contact-dialog-title">{waitlist ? 'Join the NOW beta' : 'Send a message'}</h2>
          <p id="contact-dialog-description">A founder reads every message and replies within two working days.</p>
        </div>
        <button className="contact-dialog__close" type="button" onClick={() => dialogRef.current.close()} aria-label="Close contact form">Close</button>
      </div>
      {status.type === 'success' ? (
        <div className="contact-dialog__result" role="status">
          <p>{status.message}</p>
          <button className="btn btn--dark" type="button" onClick={() => dialogRef.current.close()}>Close</button>
        </div>
      ) : (
        <form className="contact-form" onSubmit={submit}>
          {waitlist && (
            <div className="contact-form__field">
              <label htmlFor="contact-name">First name</label>
              <input id="contact-name" name="name" type="text" autoComplete="given-name" maxLength="100" autoFocus required />
            </div>
          )}
          <div className="contact-form__field">
            <label htmlFor="contact-email">Your email</label>
            <input id="contact-email" name="email" type="email" autoComplete="email" maxLength="254" autoFocus={!waitlist} required />
          </div>
          <div className="contact-form__field">
            <label htmlFor="contact-subject">Subject</label>
            <input id="contact-subject" name="subject" type="text" maxLength="160" defaultValue={request.subject} required />
          </div>
          <div className="contact-form__field">
            <label htmlFor="contact-message">Message</label>
            <textarea id="contact-message" name="message" rows="6" maxLength="5000" required />
          </div>
          {waitlist && (
            <label className="contact-form__consent">
              <input type="checkbox" name="adultConfirmed" required />
              <span>I agree to use my details to manage my NOW beta invitation, and I confirm I am 18 or over.</span>
            </label>
          )}
          <div className="contact-form__trap" aria-hidden="true">
            <label htmlFor="contact-website">Leave this field empty</label>
            <input id="contact-website" name="website" type="text" tabIndex="-1" autoComplete="off" />
          </div>
          <p className="contact-form__privacy">Please do not include passwords, card details or other sensitive information. Read our <a href={routeHref('privacy')}>Privacy notice</a>.</p>
          <div className="contact-form__actions">
            <button className="btn btn--dark" type="submit" disabled={status.type === 'sending'}>{status.type === 'sending' ? 'Sending…' : 'Send message'}</button>
            <button className="btn btn--light" type="button" onClick={() => dialogRef.current.close()}>Cancel</button>
          </div>
          {status.message && <p className={`contact-form__status contact-form__status--${status.type}`} role={status.type === 'error' ? 'alert' : 'status'} aria-live="polite">{status.message}{status.type === 'error' && <> <a href={mailtoHello()}>Email hello@undeify.com instead.</a></>}</p>}
        </form>
      )}
    </dialog>
  );
}

Object.assign(window, { ContactDialog });
