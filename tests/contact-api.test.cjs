const assert = require('node:assert/strict');
const { after, test } = require('node:test');
const handler = require('../site/api/contact.js');

const savedEnvironment = {
  CONTACT_FORM_ENABLED: process.env.CONTACT_FORM_ENABLED,
  Resend_API_key: process.env.Resend_API_key,
  RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL,
};
const originalFetch = global.fetch;

after(() => {
  for (const [key, value] of Object.entries(savedEnvironment)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  global.fetch = originalFetch;
});

function invoke({ method = 'POST', origin = 'https://www.undeify.com', body = {}, contentType = 'application/json' } = {}) {
  const req = {
    method,
    headers: { origin, host: 'www.undeify.com', 'content-type': contentType },
    body,
  };
  const res = {
    headers: {},
    statusCode: 200,
    payload: null,
    setHeader(name, value) { this.headers[name] = value; return this; },
    status(code) { this.statusCode = code; return this; },
    json(payload) { this.payload = payload; return this; },
  };
  return Promise.resolve(handler(req, res)).then(() => res);
}

test('contact endpoint fails closed until Resend is configured', async () => {
  delete process.env.CONTACT_FORM_ENABLED;
  delete process.env.Resend_API_key;
  delete process.env.RESEND_FROM_EMAIL;
  const response = await invoke();
  assert.equal(response.statusCode, 503);
  assert.equal(response.headers['Cache-Control'], 'no-store');
});

test('contact endpoint rejects non-POST and cross-origin requests', async () => {
  assert.equal((await invoke({ method: 'GET' })).statusCode, 405);
  assert.equal((await invoke({ origin: 'https://attacker.example' })).statusCode, 403);
});

test('waitlist requires an 18-or-over confirmation', async () => {
  process.env.CONTACT_FORM_ENABLED = 'true';
  process.env.Resend_API_key = 'test-key';
  process.env.RESEND_FROM_EMAIL = 'contact@undeify.com';
  const response = await invoke({
    body: {
      purpose: 'waitlist',
      email: 'visitor@example.com',
      subject: 'Join the NOW beta',
      message: 'Please add me to the waitlist.',
      name: 'Alex',
      adultConfirmed: false,
    },
  });
  assert.equal(response.statusCode, 400);
});

test('contact messages go only to hello and set the visitor as reply-to', async () => {
  process.env.CONTACT_FORM_ENABLED = 'true';
  process.env.Resend_API_key = 'test-key';
  process.env.RESEND_FROM_EMAIL = 'contact@undeify.com';
  let sent;
  global.fetch = async (url, options) => {
    sent = { url, options, body: JSON.parse(options.body) };
    return { ok: true };
  };

  const response = await invoke({
    body: {
      purpose: 'contact',
      email: 'visitor@example.com',
      subject: 'Hello',
      message: 'I have a question.',
    },
  });

  assert.equal(response.statusCode, 200);
  assert.equal(sent.url, 'https://api.resend.com/emails');
  assert.deepEqual(sent.body.to, ['hello@undeify.com']);
  assert.equal(sent.body.reply_to, 'visitor@example.com');
  assert.equal(sent.options.headers.Authorization, 'Bearer test-key');
});
