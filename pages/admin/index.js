import { useState, useEffect } from 'react';

function SubaccountsPanel() {
  const [jwt, setJwt] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJwtAndAccounts = async () => {
      try {
        const jwtRes = await fetch('/api/generate-jwt');
        const jwtData = await jwtRes.json();
        if (!jwtRes.ok) throw new Error(jwtData.error || 'JWT error');

        setJwt(jwtData.jwt);

        const accountRes = await fetch('https://api.vonage.com/accounts/subaccounts', {
          headers: {
            Authorization: `Bearer ${jwtData.jwt}`
          }
        });

        const accountData = await accountRes.json();
        if (!accountRes.ok) throw new Error(accountData.error || 'Subaccount fetch error');

        setAccounts(accountData._embedded?.subaccounts || []);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchJwtAndAccounts();
  }, []);

  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!jwt || accounts.length === 0) return <p>Loading subaccounts...</p>;

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold mb-2">Subaccount List</h2>
      <ul className="text-sm bg-white border rounded p-4 shadow">
        {accounts.map((acct) => (
          <li key={acct.api_key} className="border-b py-2">
            <strong>API Key:</strong> {acct.api_key} <br />
            <strong>Status:</strong> {acct.status} <br />
            {acct.name && <><strong>Name:</strong> {acct.name} <br /></>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Chatti Admin Dashboard</h1>

      <section style={{ marginTop: '2rem' }}>
        <h2>🔐 Subaccount Management</h2>
        <p>Subaccount controls (credit, suspend, reset key) coming soon.</p>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>💰 Credit Management</h2>
        <p>Manage prepaid top-ups and credit limits.</p>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <SubaccountsPanel />
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>🔧 API Key Actions</h2>
        <p>Reset or regenerate API keys securely.</p>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>🧾 Xero Billing Sync</h2>
        <p>Push and reconcile payments from Xero to prepaid accounts.</p>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>🎯 Qantas Points Tracking</h2>
        <p>Track points submissions and customer balances.</p>
      </section>
    </main>
  );
}
