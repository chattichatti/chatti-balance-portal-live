export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const { apiKey, suspend } = req.body;

  const masterKey = process.env.VONAGE_API_KEY;
  const masterSecret = process.env.VONAGE_API_SECRET;

  if (!apiKey || suspend === undefined) {
    return res.status(400).json({ error: 'Missing apiKey or suspend flag' });
  }

  const auth = Buffer.from(`${masterKey}:${masterSecret}`).toString('base64');

  try {
    const url = `https://api.nexmo.com/accounts/${masterKey}/subaccounts/${apiKey}`;

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({ suspended: suspend })
    });

    const raw = await response.text();

    // Always return raw text — no JSON parsing
    return res.status(response.status).json({
      status: response.status,
      ok: response.ok,
      raw
    });
  } catch (err) {
    return res.status(500).json({ error: 'Server error', detail: err.message });
  }
}
