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
      body: JSON.stringify({ suspended: suspend ? "true" : "false" })
    });

    const raw = await response.text();

    let json;
    try {
      json = JSON.parse(raw);
    } catch (parseErr) {
      console.error("Non-JSON response from Vonage:", raw);
      return res.status(response.status).json({ error: 'Invalid response from Vonage', raw });
    }

    if (!response.ok) {
      console.error("Vonage API error:", response.status, json);
      return res.status(response.status).json({
        error: json?.error || 'Vonage API error',
        detail: json
      });
    }

    return res.status(200).json({ message: `Subaccount ${suspend ? 'suspended' : 'reactivated'}` });
  } catch (err) {
    console.error("Server exception:", err);
    return res.status(500).json({ error: 'Server error', detail: err.message });
  }
}
