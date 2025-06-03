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

    const result = await response.json();

    if (!response.ok) {
      console.error("Vonage API error:", response.status, result);
      return res.status(response.status).json({
        error: result?.error || 'Vonage API error',
        detail: result
      });
    }

    return res.status(200).json({ message: `Subaccount ${suspend ? 'suspended' : 'reactivated'}` });
  } catch (err) {
    console.error("Server exception:", err);
    return res.status(500).json({ error: 'Server error', detail: err.message });
  }
}
