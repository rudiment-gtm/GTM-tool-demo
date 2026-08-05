// Vercel serverless function - the only place the LeadMagic API key ever lives.
// Set LEADMAGIC_API_KEY in the Vercel project's Environment Variables (never commit it).
// Never call LeadMagic directly from the browser: that would ship the key in client JS.
//
// One-click "Find contacts" flow: picks the best-titled employee at a company
// and enriches them fully (email + phone) in a single round trip. Chains:
//   1. company-search (domain -> canonical company name)
//   2. employee-finder (company name -> employees with name + title, no email/phone)
//   3. email-finder    (best-titled employee + domain -> work email)
//   4. mobile-finder    (work email -> mobile number)
// Each step is best-effort: if a step fails or returns nothing, later steps are skipped
// and whatever was found so far is still returned.
//
// See find-employees.js + reveal-contact.js for the Prospect-tab flow, which splits
// these same steps apart so a rep can browse employees and reveal fields on demand.
import { ENDPOINTS, callLeadMagic, domainFromWebsite, resolveCompanyName } from './_leadmagic.js';

const TITLE_PRIORITY = [/\bowner\b/i, /\bpresident\b/i, /general manager/i, /\bgm\b/i, /\bmanager\b/i, /\bdirector\b/i];

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
  const domain = domainFromWebsite(website);
  console.log('[api/find-contacts] request body:', { companyName, website, domain });

  try {
    const resolvedCompanyName = await resolveCompanyName(apiKey, domain, companyName);

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
        firstName: best.first_name,
        lastName: best.last_name,
        name: [best.first_name, best.last_name].filter(Boolean).join(' '),
        title: best.title || null,
        linkedinUrl: best.profile_url || best.linkedin_url || best.li_url || null,
        email,
        phone,
      }],
    });
  } catch (err) {
    console.error('[api/find-contacts] fetch to LeadMagic threw:', err.message);
    res.status(502).json({ error: 'Could not reach LeadMagic' });
  }
}
