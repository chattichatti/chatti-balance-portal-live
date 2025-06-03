export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Only GET allowed' });
  }

  const apiKey = process.env.VONAGE_API_KEY;
  const apiSecret = process.env.VONAGE_API_SECRET;

  if (!apiKey || !apiSecret) {
    return res.status(500).json({ error: 'Missing Vonage API credentials' });
  }

  const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');

  try {
    const response = await fetch(`https://api.nexmo.com/accounts/${apiKey}/subaccounts`, {
      headers: {
        Authorization: `Basic ${auth}`,
        Accept: 'application/json'
      }
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.error || 'Vonage API error' });
    }

    return res.status(200).json(data._embedded?.subaccounts || []);
  } catch (err) {
    return res.status(500).json({ error: 'Server error', detail: err.message });
  }
}
