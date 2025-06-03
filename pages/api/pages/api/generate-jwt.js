import jwt from 'jsonwebtoken';

export default function handler(req, res) {
  const privateKey = process.env.VONAGE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  const token = jwt.sign(
    {
      application_id: process.env.VONAGE_APPLICATION_ID
    },
    privateKey,
    {
      algorithm: 'RS256',
      expiresIn: '10m'
    }
  );

  res.status(200).json({ jwt: token });
}
