const MAX_BODY_BYTES = 12_000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function respond(res, status, error) {
  res.setHeader('Cache-Control', 'no-store');
  res.status(status).json({ error });
}

function validSameOrigin(req) {
  const originHeader = req.headers.origin;
  const hostHeader = req.headers.host;
  if (!originHeader || !hostHeader) return false;

  try {
    const origin = new URL(originHeader);
    const isLocal = origin.hostname === 'localhost' || origin.hostname === '127.0.0.1';
    return origin.host.toLowerCase() === hostHeader.toLowerCase() &&
      (origin.protocol === 'https:' || (isLocal && origin.protocol === 'http:'));
  } catch {
    return false;
  }
}

function cleanText(value, maxLength) {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLength);
}

async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return respond(res, 405, 'Method not allowed.');
  }
  if (!validSameOrigin(req)) return respond(res, 403, 'This request could not be verified.');
  if (req.headers['content-type']?.split(';')[0].trim() !== 'application/json') {
    return respond(res, 415, 'Submit the form using the website.');
  }
  if (process.env.CONTACT_FORM_ENABLED !== 'true' || !process.env.Resend_API_key || !process.env.RESEND_FROM_EMAIL) {
    return respond(res, 503, 'The contact form is not available yet. Please email hello@undeify.com.');
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      return respond(res, 400, 'Check the form and try again.');
    }
  }
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return respond(res, 400, 'Check the form and try again.');
  }
  if (Buffer.byteLength(JSON.stringify(body), 'utf8') > MAX_BODY_BYTES) {
    return respond(res, 413, 'Your message is too long.');
  }
  if (typeof body.website === 'string' && body.website.trim()) {
    return respond(res, 400, 'Check the form and try again.');
  }

  const email = cleanText(body.email, 254);
  const subject = cleanText(body.subject, 160);
  const message = cleanText(body.message, 5000);
  const name = cleanText(body.name, 100);
  const purpose = body.purpose === 'waitlist' ? 'waitlist' : body.purpose === 'contact' ? 'contact' : '';
  if (!EMAIL_PATTERN.test(email) || /[\r\n]/.test(email) ||
      !subject || /[\r\n]/.test(subject) || !message || !purpose ||
      (purpose === 'waitlist' && (!name || body.adultConfirmed !== true))) {
    return respond(res, 400, 'Check the required fields and try again.');
  }
  if (/[\r\n]/.test(process.env.RESEND_FROM_EMAIL)) {
    return respond(res, 503, 'The contact form is not configured correctly.');
  }

  const text = [
    purpose === 'waitlist' ? 'NOW beta waitlist request' : 'Website contact message',
    '',
    `From: ${email}`,
    ...(purpose === 'waitlist' ? [`First name: ${name}`, 'Confirmed 18 or over: yes'] : []),
    `Subject: ${subject}`,
    '',
    message,
  ].join('\n');

  let providerResponse;
  try {
    providerResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.Resend_API_key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL,
        to: ['hello@undeify.com'],
        reply_to: email,
        subject: `[Website] ${subject}`,
        text,
      }),
      signal: AbortSignal.timeout(10_000),
    });
  } catch {
    return respond(res, 502, 'We could not send your message. Please email hello@undeify.com instead.');
  }

  if (!providerResponse.ok) {
    return respond(res, 502, 'We could not send your message. Please email hello@undeify.com instead.');
  }
  res.setHeader('Cache-Control', 'no-store');
  return res.status(200).json({ message: 'Your message has been sent.' });
}

module.exports = handler;
module.exports.config = { api: { bodyParser: { sizeLimit: '12kb' } } };
