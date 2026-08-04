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
  return data; // { notConfigured?: true, contacts: [{ name, title, email, phone }] }
}
