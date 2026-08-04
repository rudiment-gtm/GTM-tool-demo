// Vercel serverless function - the only place the LeadMagic API key ever lives.
// Set LEADMAGIC_API_KEY in the Vercel project's Environment Variables (never commit it).
// Never call LeadMagic directly from the browser: that would ship the key in client JS.
//
// NOTE: the endpoint/payload below is our best-effort read of LeadMagic's contact-search
// API - it hasn't been verified against a live account from this environment (outbound
// network here is locked to an allowlist that excludes api.leadmagic.io). If the shape
// below doesn't match your LeadMagic docs, this is the only file that needs to change.
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const apiKey = process.env.LEADMAGIC_API_KEY;
  if (!apiKey) {
    res.status(200).json({ notConfigured: true, contacts: [] });
    return;
  }

  const { companyName, website } = req.body || {};
  const domain = (website || '')
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .split('/')[0];

  try {
    const upstream = await fetch('https://api.leadmagic.io/profile-search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey,
      },
      body: JSON.stringify({ company_name: companyName, domain }),
    });

    const data = await upstream.json();
    if (!upstream.ok) {
      res.status(upstream.status).json({ error: data?.message || 'LeadMagic request failed' });
      return;
    }

    const contacts = (data.profiles || data.contacts || []).map((p) => ({
      name: p.name || [p.first_name, p.last_name].filter(Boolean).join(' '),
      title: p.title || p.job_title,
      email: p.email || p.work_email,
      phone: p.phone || p.mobile_phone,
    }));

    res.status(200).json({ contacts });
  } catch (err) {
    res.status(502).json({ error: 'Could not reach LeadMagic' });
  }
}
