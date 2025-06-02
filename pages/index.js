import { useState } from 'react';
import Head from 'next/head';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function Home() {
  const [apiKey, setApiKey] = useState('');
  const [balanceInfo, setBalanceInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBalance = async () => {
    setLoading(true);
    setError(null);
    setBalanceInfo(null);

    try {
      const response = await fetch(`/api/check-sms-balance?apikey=${apiKey}`);
      if (!response.ok) throw new Error('Invalid API Key or server error');
      const data = await response.json();
      setBalanceInfo(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4 font-sans">
      <Head>
        <title>Chatti Balance Portal</title>
      </Head>
      <h1 className="text-2xl font-bold mb-4">Check SMS Balance & Points</h1>
      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 w-full"
          placeholder="Enter your API Key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2"
          onClick={fetchBalance}
          disabled={loading || !apiKey}
        >
          {loading ? 'Checking...' : 'Check Balance'}
        </button>
      </div>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      {balanceInfo && (
        <div className="space-y-4 bg-gray-100 p-4 rounded">
          <div>
            <p><strong>Customer:</strong> {balanceInfo.customerName}</p>
            <p><strong>Plan Type:</strong> {balanceInfo.planType}</p>
            <p><strong>SMS Limit:</strong> {balanceInfo.smsLimit}</p>
            <p><strong>SMS Used:</strong> {balanceInfo.smsUsed}</p>
            <p><strong>Balance Remaining:</strong> {balanceInfo.smsLimit - balanceInfo.smsUsed}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Monthly SMS Usage</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={balanceInfo.smsUsageChart}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#00B9F1" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Qantas Points</h3>
            <p><strong>Total Points:</strong> {balanceInfo.qantasPointsTotal}</p>
            <ul className="text-sm mt-2 list-disc list-inside">
              {balanceInfo.qantasPointsHistory.map((item, index) => (
                <li key={index}>{item.date}: {item.points} points</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
