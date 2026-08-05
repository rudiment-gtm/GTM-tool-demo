// Vercel serverless function - lists employees at a company (name + title only,
// no email/phone) so the Prospect tab can show a picklist filtered by job title
// before spending credits on any one person's contact info. See find-contacts.js
// for the one-click flow that enriches a single best-titled employee outright.
import { ENDPOINTS, callLeadMagic, domainFromWebsite, resolveCompanyName } from './_leadmagic.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const apiKey = process.env.LEADMAGIC_API_KEY;
  if (!apiKey) {
    res.status(200).json({ notConfigured: true, employees: [] });
    return;
  }

  const { companyName, website } = req.body || {};
  const domain = domainFromWebsite(website);

  try {
    const resolvedCompanyName = await resolveCompanyName(apiKey, domain, companyName);

    const employeeResult = await callLeadMagic(ENDPOINTS.employeeFinder, apiKey, { company_name: resolvedCompanyName, per_page: 20 });
    if (!employeeResult.ok) {
      res.status(200).json({ employees: [] });
      return;
    }

    // LeadMagic's other endpoints (profile-search, mobile-finder, company-search) all key
    // LinkedIn links as "profile_url" - employee-finder's exact field name isn't verified
    // live from this environment, so a couple of likely alternates are covered too.
    const employees = (employeeResult.data?.data || [])
      .filter((e) => e.first_name && e.last_name)
      .map((e) => ({
        firstName: e.first_name,
        lastName: e.last_name,
        title: e.title || null,
        linkedinUrl: e.profile_url || e.linkedin_url || e.li_url || null,
      }));

    res.status(200).json({ employees });
  } catch (err) {
    console.error('[api/find-employees] fetch to LeadMagic threw:', err.message);
    res.status(502).json({ error: 'Could not reach LeadMagic' });
  }
}
