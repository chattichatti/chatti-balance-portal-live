import { useState } from 'react';

export default function AdminDashboard() {
  const [jwt, setJwt] = useState(null);
  const [error, setError] = useState(null);

  const fetchJwt = async () => {
    try {
      const res = await fetch('/api/generate-jwt');
      const data = await res.json();
      if (res.ok) {
        setJwt(data.jwt);
        setError(null);
      } else {
        setError(data.error || 'Error generating JWT');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">Chatti Admin Dashboard</h1>

      <button
        onClick={fetchJwt}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Generate Vonage JWT
      </button>

      {error && <p className="text-red-500">{error}</p>}
      {jwt && (
        <div className="bg-gray-100 p-4 rounded">
          <p className="text-sm font-mono break-all"><strong>JWT:</strong> {jwt}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Section title="🔐 Subaccount Overview" />
        <Section title="💰 Credit Management" />
        <Section title="🔧 API Key Actions" />
        <Section title="🧾 Billing (Xero)" />
        <Section title="🎯 Qantas Points Tracking" />
      </div>
    </div>
  );
}

function Section({ title }) {
  return (
    <div className="bg-white border rounded shadow p-4">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="text-gray-500 text-sm">[placeholder for future controls]</p>
    </div>
  );
}
