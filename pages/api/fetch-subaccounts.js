import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  const privateKey = process.env.VONAGE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  const applicationId = process.env.VONAGE_APPLICATION_ID;

  if (!privateKey || !applicationId) {
    return res.status(500).json({ error: 'Missing Vonage credentials' });
  }

  try {
    const token = jwt.sign(
      { application_id: applicationId },
      privateKey,
      { algorithm: 'RS256', expiresIn: '10m' }
    );

    const apiRes = await fetch('https://api.vonage.com/accounts/subaccounts', {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      }
    });

    const data = await apiRes.json();

    if (!apiRes.ok) {
      return res.status(apiRes.status).json({ error: data.error || 'Vonage API error' });
    }

    return res.status(200).json(data._embedded?.subaccounts || []);
  } catch (err) {
    return res.status(500).json({ error: 'Server error', detail: err.message });
  }
}
