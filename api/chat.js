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
  console.log('[api/chat] ANTHROPIC_API_KEY present:', !!apiKey, 'length:', apiKey ? apiKey.length : 0);

  if (!apiKey) {
    console.error('[api/chat] no ANTHROPIC_API_KEY in this runtime - returning notConfigured');
    res.status(200).json({ notConfigured: true });
    return;
  }

  const { model, system, messages } = req.body || {};
  console.log('[api/chat] request body:', { model, hasSystem: !!system, messageCount: Array.isArray(messages) ? messages.length : 'not an array' });

  if (!Array.isArray(messages) || !messages.length) {
    res.status(400).json({ error: 'messages array is required' });
    return;
  }

  try {
    const client = new Anthropic({ apiKey });
    const response = await client.messages.create({
      model: model || DEFAULT_MODEL,
      max_tokens: MAX_TOKENS,
      system,
      messages,
    });

    const text = response.content.find((block) => block.type === 'text')?.text || '';
    console.log('[api/chat] Claude responded, stop_reason:', response.stop_reason, 'text length:', text.length);
    res.status(200).json({ text });
  } catch (err) {
    console.error('[api/chat] upstream error - status:', err.status, 'name:', err.name, 'message:', err.message, 'body:', JSON.stringify(err.error || null));
    res.status(502).json({ error: err.message || 'Claude request failed' });
  }
}
