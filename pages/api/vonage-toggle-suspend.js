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
    const response = await fetch(`https://api.nexmo.com/accounts/${masterKey}/subaccounts/${apiKey}`, {
      method: 'PUT',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ suspended: suspend })
    });

    const result = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: result.error || 'Vonage API error' });
    }

    return res.status(200).json({ message: `Subaccount ${suspend ? 'suspended' : 'reactivated'}` });
  } catch (err) {
    return res.status(500).json({ error: 'Server error', detail: err.message });
  }
}
