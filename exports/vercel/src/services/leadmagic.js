// Calls our own serverless proxy (/api/find-contacts) rather than LeadMagic directly -
// that keeps the LeadMagic API key server-side only (see api/find-contacts.js).
export async function findContacts(business) {
  const res = await fetch('/api/find-contacts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      companyName: business.name,
      website: business.website,
      address: business.address,
    }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `find-contacts failed (${res.status})`);
  return data; // { notConfigured?: true, contacts: [{ firstName, lastName, name, title, email, phone }] }
}

// Lists employees at a company (name + title only) - the Prospect tab's picklist
// before spending credits on any one person's email/phone.
export async function findEmployees(business) {
  const res = await fetch('/api/find-employees', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      companyName: business.name,
      website: business.website,
    }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `find-employees failed (${res.status})`);
  return data; // { notConfigured?: true, employees: [{ firstName, lastName, title }] }
}

// Reveals one field (email or phone) for a specific contact at a business.
// Revealing phone requires contact.email - mobile-finder looks it up from a work email.
export async function revealContactField({ business, contact, field }) {
  const res = await fetch('/api/reveal-contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      field,
      firstName: contact.firstName,
      lastName: contact.lastName,
      website: business.website,
      workEmail: field === 'phone' ? contact.email : undefined,
    }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `reveal-contact failed (${res.status})`);
  return data; // { notConfigured?: true, email? } or { notConfigured?: true, phone? }
}
