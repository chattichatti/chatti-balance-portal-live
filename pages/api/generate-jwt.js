import jwt from 'jsonwebtoken';

export default function handler(req, res) {
  const privateKey = process.env.VONAGE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  const applicationId = process.env.VONAGE_APPLICATION_ID;

  if (!privateKey || !applicationId) {
    return res.status(500).json({ error: 'Missing environment variables' });
  }

  try {
    const token = jwt.sign(
      {
        application_id: applicationId
      },
      privateKey,
      {
        algorithm: 'RS256',
        expiresIn: '10m'
      }
    );

    res.status(200).json({ jwt: token });
  } catch (err) {
    res.status(500).json({ error: 'JWT generation failed', detail: err.message });
  }
}
