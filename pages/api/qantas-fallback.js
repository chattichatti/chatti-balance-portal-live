export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  try {
    const body = req.body;

    // TODO: Optional - send to a Slack, Airtable, or log service
    console.log('Qantas Fallback Received:', body);

    // Return success response
    return res.status(200).json({ message: 'Webhook received and logged' });
  } catch (err) {
    return res.status(500).json({ error: 'Server error', detail: err.message });
  }
}
