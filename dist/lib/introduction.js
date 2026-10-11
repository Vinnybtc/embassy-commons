const recipient = 'info@dutchbitcoinembassy.com';
const textLimits = { fullName: [2, 100], country: [2, 80], city: [2, 100], team: [2, 300], plans: [20, 1000] };
const allowedFields = new Set([...Object.keys(textLimits), 'email', 'website']);

function plainText(value, field, min, max, multiline = false) {
  const forbidden = multiline ? /[\u0000-\u0009\u000b-\u001f\u007f-\u009f<>\u2028\u2029]/ : /[\u0000-\u001f\u007f-\u009f<>\u2028\u2029]/;
  if (typeof value !== 'string' || forbidden.test(value) || value.length > max || value.trim().length < min) {
    throw new Error(`${field} must contain ${min}–${max} plain text characters${multiline ? '; LF line breaks are allowed' : ' on one line'}.`);
  }
  return value.trim();
}

/** Prepare a draft only. This function does not send, store, or request anything. */
export function prepareIntroduction(fields) {
  if (!fields || typeof fields !== 'object' || Array.isArray(fields) || ![Object.prototype, null].includes(Object.getPrototypeOf(fields))) {
    throw new Error('Introduction fields must be a plain object.');
  }
  for (const key of Reflect.ownKeys(fields)) {
    if (!allowedFields.has(key)) throw new Error(`Unknown introduction field: ${String(key)}.`);
  }

  const clean = {};
  for (const [field, [min, max]] of Object.entries(textLimits)) {
    clean[field] = plainText(fields[field], field, min, max, ['team', 'plans'].includes(field));
  }
  clean.email = plainText(fields.email, 'email', 3, 254);
  const emailParts = clean.email.split('@');
  const emailPattern = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?)+$/;
  if (!emailPattern.test(clean.email) || emailParts[0].length > 64 || /^\.|\.$|\.\./.test(emailParts[0]) || emailParts[1].split('.').some(label => label.length > 63)) {
    throw new Error('email must be a valid email address.');
  }

  clean.website = '';
  if (fields.website !== undefined && fields.website !== '') {
    clean.website = plainText(fields.website, 'website', 1, 300);
    let website;
    try { website = new URL(clean.website); } catch { throw new Error('website must be a valid HTTPS URL without credentials.'); }
    if (!/^https:\/\//i.test(clean.website) || /\s/.test(clean.website) || website.protocol !== 'https:' || !website.hostname || website.username || website.password) {
      throw new Error('website must be a valid HTTPS URL without credentials.');
    }
  }

  const subject = `Embassy Commons introduction — ${clean.country} / ${clean.city}`;
  const body = [
    'Hello Dutch Bitcoin Embassy,', '',
    'I would like to introduce our team and discuss starting an independent Bitcoin embassy.', '',
    `Full name: ${clean.fullName}`,
    `Email: ${clean.email}`,
    `Country: ${clean.country}`,
    `City: ${clean.city}`, '',
    'Team:', clean.team, '',
    'Plans:', clean.plans, '',
    `Website: ${clean.website || 'Not provided'}`, '',
    `Please contact me at ${clean.email} to arrange an introduction.`
  ].join('\n');
  const mailto = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return { subject, body, mailto };
}
