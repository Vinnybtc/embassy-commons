import test from 'node:test';
import assert from 'node:assert/strict';
import { prepareIntroduction } from '../dist/lib/introduction.js';

const fields = { fullName: 'Amina de Vries', email: 'amina+embassy@example.org', country: 'Portugal', city: 'Lisbon', team: 'Two volunteer educators', plans: 'We plan monthly local Bitcoin workshops.', website: 'https://example.org/community?city=Lisbon&lang=en' };

test('draft mailto preserves the exact recipient, subject and body without adding headers', () => {
  const input = Object.freeze({ ...fields, plans: 'We plan workshops.\nIdeas: ?bcc=other@example.org&subject=changed' });
  const before = { ...input }, draft = prepareIntroduction(input), url = new URL(draft.mailto);
  assert.equal(draft.subject, 'Embassy Commons introduction — Portugal / Lisbon');
  assert.equal(url.pathname, 'info@dutchbitcoinembassy.com');
  assert.deepEqual([...url.searchParams.keys()], ['subject', 'body']);
  assert.equal(url.searchParams.get('subject'), draft.subject);
  assert.equal(url.searchParams.get('body'), draft.body);
  assert.match(draft.body, /Ideas: \?bcc=other@example.org&subject=changed/);
  for (const value of Object.values(input)) assert.ok(draft.body.includes(value), value);
  assert.deepEqual(input, before, 'input is not changed');
});

test('draft trims boundaries, retains allowed LF line breaks and accepts no website', () => {
  const draft = prepareIntroduction({ ...fields, fullName: '  Amina de Vries  ', team: '  Two educators\nOne organiser  ', plans: '  Workshops for beginners.\nA welcoming local community.  ', website: '' });
  assert.match(draft.body, /Full name: Amina de Vries\n/);
  assert.match(draft.body, /Team:\nTwo educators\nOne organiser\n\nPlans:/);
  assert.match(draft.body, /Plans:\nWorkshops for beginners\.\nA welcoming local community\.\n\nWebsite: Not provided/);
  const { website, ...required } = fields;
  assert.match(prepareIntroduction(required).body, /Website: Not provided/);
});

test('required fields, bounds, object shape and unexpected fields are rejected', () => {
  for (const invalid of [null, [], 'text', new Date(), { ...fields, privateKey: 'unnecessary' }, { ...fields, [Symbol('extra')]: 'unnecessary' }]) assert.throws(() => prepareIntroduction(invalid));
  for (const [field, [min, max]] of Object.entries({ fullName: [2, 100], country: [2, 80], city: [2, 100], team: [2, 300], plans: [20, 1000] })) {
    for (const value of [undefined, 'x'.repeat(min - 1), 'x'.repeat(max + 1), '<script>alert(1)</script>']) assert.throws(() => prepareIntroduction({ ...fields, [field]: value }), new RegExp(field));
  }
});

test('malformed contact details and control characters cannot inject mail headers', () => {
  for (const email of ['a@@example.org', '.a@example.org', 'a..b@example.org', 'a@example', 'a@example.org?bcc=other@example.org', 'a@example.org\r\nBcc: other@example.org', 'a@example.org\nBcc: other@example.org', 'x'.repeat(65) + '@example.org']) assert.throws(() => prepareIntroduction({ ...fields, email }), /email/);
  for (const website of ['http://example.org', 'javascript:alert(1)', 'https://user:password@example.org', 'https://example.org/a b', 'https://example.org\n', 'https://', 'https://example.org/' + 'x'.repeat(300)]) assert.throws(() => prepareIntroduction({ ...fields, website }), /website/);
  for (const field of Object.keys(fields)) {
    for (const control of ['\0', '\t', '\r\n', '\u0085']) assert.throws(() => prepareIntroduction({ ...fields, [field]: fields[field] + control + 'Bcc: other@example.org' }), new RegExp(field));
    if (!['team', 'plans'].includes(field)) assert.throws(() => prepareIntroduction({ ...fields, [field]: fields[field] + '\nextra' }), new RegExp(field));
  }
});
