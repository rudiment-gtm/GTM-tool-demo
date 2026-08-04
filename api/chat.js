// Vercel serverless function - calls the real Claude API via the official SDK.
// Set ANTHROPIC_API_KEY in the Vercel project's Environment Variables (never commit it).
import Anthropic from '@anthropic-ai/sdk';

const MAX_TOKENS = 1024;
const DEFAULT_MODEL = 'claude-sonnet-5';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    res.status(200).json({ notConfigured: true });
    return;
  }

  const { model, messages } = req.body || {};
  if (!Array.isArray(messages) || !messages.length) {
    res.status(400).json({ error: 'messages array is required' });
    return;
  }

  try {
    const client = new Anthropic({ apiKey });
    const response = await client.messages.create({
      model: model || DEFAULT_MODEL,
      max_tokens: MAX_TOKENS,
      messages,
    });

    const text = response.content.find((block) => block.type === 'text')?.text || '';
    res.status(200).json({ text });
  } catch (err) {
    res.status(502).json({ error: err.message || 'Claude request failed' });
  }
}
