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
