// Vercel serverless function - calls the real Claude API via the official SDK.
// Set ANTHROPIC_API_KEY in the Vercel project's Environment Variables (never commit it).
import Anthropic from '@anthropic-ai/sdk';

const MAX_TOKENS = 2048;
const DEFAULT_MODEL = 'claude-sonnet-5';
const TABLE_COLUMNS = ['NAME', 'CITY', 'RATING', 'PHONE'];

// The system prompt asks Claude to reply with one bare JSON object for
// list-style questions ({text, total, rows: [{name, city, rating, phone}]}).
// Parse it into the shape the chat UI's ResultTable already expects (a/b/c/d);
// anything that isn't that exact shape is treated as an ordinary text reply.
function parseStructuredReply(text) {
  const trimmed = text.trim();
  if (!trimmed.startsWith('{') || !trimmed.endsWith('}')) return null;
  let parsed;
  try {
    parsed = JSON.parse(trimmed);
  } catch {
    return null;
  }
  if (!parsed || typeof parsed.text !== 'string' || !Array.isArray(parsed.rows)) return null;
  const rows = parsed.rows.slice(0, 20).map((r) => ({
    a: String(r.name ?? ''),
    b: String(r.city ?? ''),
    c: String(r.rating ?? ''),
    d: String(r.phone ?? ''),
  }));
  const total = Number.isFinite(parsed.total) ? parsed.total : rows.length;
  return {
    text: parsed.text,
    rows,
    columns: TABLE_COLUMNS,
    count: total,
    pin: parsed.text.slice(0, 60),
  };
}

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
    const structured = parseStructuredReply(text);
    console.log('[api/chat] Claude responded, stop_reason:', response.stop_reason, 'text length:', text.length, 'structured:', !!structured);
    res.status(200).json(structured || { text });
  } catch (err) {
    console.error('[api/chat] upstream error - status:', err.status, 'name:', err.name, 'message:', err.message, 'body:', JSON.stringify(err.error || null));
    res.status(502).json({ error: err.message || 'Claude request failed' });
  }
}
