// Shared helper for the serverless functions that call LeadMagic - keeps the
// endpoint paths and request/response plumbing in one place instead of
// duplicated across find-contacts.js, find-employees.js, and reveal-contact.js.
//
// Paths are versioned per-endpoint (confirmed against the account's own
// "manage endpoint access" page): company search is on v3, the people
// endpoints below are still on v1. Don't assume they share a version.
export const ENDPOINTS = {
  companySearch: 'v3/companies/search',
  employeeFinder: 'v1/people/employee-finder',
  emailFinder: 'v1/people/email-finder',
  mobileFinder: 'v1/people/mobile-finder',
};

export async function callLeadMagic(path, apiKey, body) {
  const upstream = await fetch(`https://api.leadmagic.io/${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-API-Key': apiKey },
    body: JSON.stringify(body),
  });
  const rawBody = await upstream.text();
  console.log(`[leadmagic] ${path} status:`, upstream.status, 'body:', rawBody.slice(0, 1000));
  let data;
  try {
    data = JSON.parse(rawBody);
  } catch {
    return { ok: false, data: null };
  }
  return { ok: upstream.ok, data };
}

export function domainFromWebsite(website) {
  return (website || '')
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .split('/')[0];
}

// employee-finder matches on company name, not domain, so resolving the
// canonical name via company-search first (when we have a domain) gives it
// better odds than the raw Google Maps business name (which often carries
// suffixes/qualifiers company-search's own name won't have).
export async function resolveCompanyName(apiKey, domain, fallback) {
  if (!domain) return fallback;
  const company = await callLeadMagic(ENDPOINTS.companySearch, apiKey, { company_domain: domain });
  const foundName = company.ok
    && (company.data?.company_name || company.data?.name || company.data?.data?.company_name || company.data?.data?.name);
  return foundName || fallback;
}
