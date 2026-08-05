// Vercel serverless function - reveals a single contact field (email or mobile
// number) on demand, so the Map tab can let a rep reveal each field
// independently instead of always spending credits on both at once.
import { ENDPOINTS, callLeadMagic, domainFromWebsite } from './_leadmagic.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const apiKey = process.env.LEADMAGIC_API_KEY;
  if (!apiKey) {
    res.status(200).json({ notConfigured: true });
    return;
  }

  const { field, firstName, lastName, website, workEmail } = req.body || {};
  const domain = domainFromWebsite(website);

  try {
    if (field === 'email') {
      const result = await callLeadMagic(ENDPOINTS.emailFinder, apiKey, { first_name: firstName, last_name: lastName, domain });
      const email = (result.ok && result.data?.status !== 'not_found') ? (result.data?.email || null) : null;
      res.status(200).json({ email });
      return;
    }

    if (field === 'phone') {
      if (!workEmail) {
        res.status(400).json({ error: 'workEmail is required to reveal a phone number' });
        return;
      }
      const result = await callLeadMagic(ENDPOINTS.mobileFinder, apiKey, { work_email: workEmail });
      res.status(200).json({ phone: (result.ok && result.data?.mobile_number) || null });
      return;
    }

    res.status(400).json({ error: 'field must be "email" or "phone"' });
  } catch (err) {
    console.error('[api/reveal-contact] fetch to LeadMagic threw:', err.message);
    res.status(502).json({ error: 'Could not reach LeadMagic' });
  }
}
