import { useState, useEffect } from 'react';

function SubaccountsPanel() {
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const accountRes = await fetch('/api/fetch-subaccounts');
        const accountData = await accountRes.json();
        if (!accountRes.ok) throw new Error(accountData.error || 'Subaccount fetch error');
        setAccounts(accountData || []);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchAccounts();
  }, []);

  const toggleSuspend = async (apiKey, suspend) => {
    const confirmMsg = suspend
      ? 'Are you sure you want to suspend this API key?'
      : 'Reactivate this API key?';

    if (!confirm(confirmMsg)) return;

    const res = await fetch('/api/vonage-toggle-suspend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ apiKey, suspend })
    });

    const result = await res.json();
    alert(result.message || result.error || 'Done');
    location.reload(); // simple reload to refetch subaccounts
  };

  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (accounts.length === 0) return <p>Loading subaccounts...</p>;

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold mb-2">Subaccount List</h2>
      <ul className="text-sm bg-white border rounded p-4 shadow">
        {accounts.map((acct) => (
          <li key={acct.api_key} className="border-b py-2">
            <strong>API Key:</strong> {acct.api_key} <br />
            <strong>Status:</strong> {acct.status} <br />
            <strong>Suspended:</strong> {acct.suspended ? 'Yes' : 'No'} <br />
            {acct.name && (
              <>
                <strong>Name:</strong> {acct.name} <br />
              </>
            )}
            <button
              onClick={() => toggleSuspend(acct.api_key, !acct.suspended)}
              style={{
                marginTop: '6px',
                padding: '6px 12px',
                backgroundColor: acct.suspended ? '#4CAF50' : '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {acct.suspended ? 'Reactivate' : 'Suspend'}
            </button>
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
