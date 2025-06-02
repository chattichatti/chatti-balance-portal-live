export default function handler(req, res) {
  const { apikey } = req.query;

  if (apikey === 'demo-00fdcd31') {
    return res.status(200).json({
      customerName: 'Acme Pty Ltd',
      planType: 'Prepaid',
      smsLimit: 10000,
      smsUsed: 4280,
      smsUsageChart: [
        { date: '2025-05-01', count: 150 },
        { date: '2025-05-08', count: 320 },
        { date: '2025-05-15', count: 950 },
        { date: '2025-05-22', count: 1200 },
        { date: '2025-05-29', count: 1660 }
      ],
      qantasPointsTotal: 28500,
      qantasPointsHistory: [
        { date: '2025-05-01', points: 4000 },
        { date: '2025-04-01', points: 3000 },
        { date: '2025-03-01', points: 5000 },
        { date: '2025-02-01', points: 8500 },
        { date: '2025-01-01', points: 6000 }
      ]
    });
  }

  res.status(404).json({ error: 'Invalid API Key' });
}
