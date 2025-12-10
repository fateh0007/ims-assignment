const axios = require('axios');
const KEY = process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY;
let MODEL = (process.env.GEMINI_MODEL || 'gemini-2.5-pro').trim();
if (MODEL.startsWith('models/')) MODEL = MODEL.replace(/^models\//, '');
const BASES = ['https://generativelanguage.googleapis.com/v1beta2','https://generativelanguage.googleapis.com/v1','https://generativelanguage.googleapis.com/v1beta'];

async function tryPost(url, body) {
  try {
    const r = await axios.post(url, body, { headers: { 'Content-Type': 'application/json' }, timeout: 20000 });
    return { ok: true, data: r.data, url };
  } catch (err) {
    return { ok: false, err: err.response?.data || err.message || String(err), url };
  }
}

async function generateSummary(text) {
  if (!KEY) throw new Error('No GEMINI_API_KEY in env.');
  const prompt = `Summarize the following (short):\n\n${(text||'').slice(0,20000)}`;

  for (const base of BASES) {
    const urlContent = `${base}/models/${MODEL}:generateContent?key=${KEY}`;
    console.log('Attempting:', urlContent);
    const resContent = await tryPost(urlContent, { contents:[{parts:[{text:prompt}]}], temperature:0.2, maxOutputTokens:200 });
    if (resContent.ok) { console.log('Success URL:', resContent.url); return (resContent.data?.candidates?.[0]?.content || []).map(c=> (c.parts||[]).map(p=>p.text||'').join('')).join('\\n'); }
    console.log('Failed:', urlContent, JSON.stringify(resContent.err).slice(0,1000));

    const urlText = `${base}/models/${MODEL}:generateText?key=${KEY}`;
    console.log('Attempting:', urlText);
    const resText = await tryPost(urlText, { prompt:{text:prompt}, temperature:0.2, maxOutputTokens:200 });
    if (resText.ok) { console.log('Success URL:', resText.url); return resText.data?.text || JSON.stringify(resText.data); }
    console.log('Failed:', urlText, JSON.stringify(resText.err).slice(0,1000));
  }

  throw new Error('All attempts failed. See server logs above for exact URLs & responses.');
}

module.exports = { generateSummary };
