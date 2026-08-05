// Vercel serverless function - the only place the LeadMagic API key ever lives.
// Set LEADMAGIC_API_KEY in the Vercel project's Environment Variables (never commit it).
// Never call LeadMagic directly from the browser: that would ship the key in client JS.
//
// LeadMagic has no single "find the main contact at this company" endpoint, so this
// chains four of their real endpoints together (see ENDPOINTS below for exact paths):
//   1. companySearch  (domain -> canonical company name)
//   2. employeeFinder (company name -> employees with name + title, no email/phone)
//   3. emailFinder    (best-titled employee + domain -> work email)
//   4. mobileFinder   (work email -> mobile number)
// Each step is best-effort: if a step fails or returns nothing, later steps are skipped
// and whatever was found so far is still returned.

const TITLE_PRIORITY = [/\bowner\b/i, /\bpresident\b/i, /general manager/i, /\bgm\b/i, /\bmanager\b/i, /\bdirector\b/i];

// Paths are versioned per-endpoint (confirmed against the account's own
// "manage endpoint access" page) - company search is on v3, the people
// endpoints below are still on v1. Don't assume they share a version.
const ENDPOINTS = {
  companySearch: 'v3/companies/search',
  employeeFinder: 'v1/people/employee-finder',
  emailFinder: 'v1/people/email-finder',
  mobileFinder: 'v1/people/mobile-finder',
};

async function callLeadMagic(path, apiKey, body) {
  const upstream = await fetch(`https://api.leadmagic.io/${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-API-Key': apiKey },
    body: JSON.stringify(body),
  });
  const rawBody = await upstream.text();
  console.log(`[api/find-contacts] ${path} status:`, upstream.status, 'body:', rawBody.slice(0, 1000));
  let data;
  try {
    data = JSON.parse(rawBody);
  } catch {
    return { ok: false, data: null };
  }
  return { ok: upstream.ok, data };
}

function pickBestEmployee(employees) {
  for (const pattern of TITLE_PRIORITY) {
    const match = employees.find((e) => e.title && pattern.test(e.title));
    if (match) return match;
  }
  return employees[0];
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const apiKey = process.env.LEADMAGIC_API_KEY;
  console.log('[api/find-contacts] LEADMAGIC_API_KEY present:', !!apiKey, 'length:', apiKey ? apiKey.length : 0);

  if (!apiKey) {
    console.error('[api/find-contacts] no LEADMAGIC_API_KEY in this runtime - returning notConfigured');
    res.status(200).json({ notConfigured: true, contacts: [] });
    return;
  }

  const { companyName, website } = req.body || {};
  const domain = (website || '')
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .split('/')[0];
  console.log('[api/find-contacts] request body:', { companyName, website, domain });

  try {
    let resolvedCompanyName = companyName;
    if (domain) {
      const company = await callLeadMagic(ENDPOINTS.companySearch, apiKey, { company_domain: domain });
      // v3 company-search's exact response shape hasn't been verified live from this
      // environment, so check a few likely spots for the name rather than one path.
      const foundName = company.ok
        && (company.data?.company_name || company.data?.name || company.data?.data?.company_name || company.data?.data?.name);
      if (foundName) resolvedCompanyName = foundName;
    }

    const employeeResult = await callLeadMagic(ENDPOINTS.employeeFinder, apiKey, { company_name: resolvedCompanyName, per_page: 20 });
    if (!employeeResult.ok) {
      res.status(200).json({ contacts: [] });
      return;
    }
    const employees = (employeeResult.data?.data || []).filter((e) => e.first_name && e.last_name);
    if (!employees.length) {
      res.status(200).json({ contacts: [] });
      return;
    }

    const best = pickBestEmployee(employees);
    let email = null;
    if (domain) {
      const emailResult = await callLeadMagic(ENDPOINTS.emailFinder, apiKey, {
        first_name: best.first_name,
        last_name: best.last_name,
        domain,
      });
      if (emailResult.ok && emailResult.data?.status !== 'not_found') email = emailResult.data?.email || null;
    }

    let phone = null;
    if (email) {
      const mobileResult = await callLeadMagic(ENDPOINTS.mobileFinder, apiKey, { work_email: email });
      if (mobileResult.ok) phone = mobileResult.data?.mobile_number || null;
    }

    res.status(200).json({
      contacts: [{
        name: [best.first_name, best.last_name].filter(Boolean).join(' '),
        title: best.title || null,
        email,
        phone,
      }],
    });
  } catch (err) {
    console.error('[api/find-contacts] fetch to LeadMagic threw:', err.message);
    res.status(502).json({ error: 'Could not reach LeadMagic' });
  }
}
