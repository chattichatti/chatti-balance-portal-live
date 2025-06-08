```tsx
'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import React from 'react';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const chartOptions = {
  chart: { id: 'sms-bar' },
  xaxis: {
    categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  },
};

const chartSeries = [
  {
    name: 'SMS Sent',
    data: [120, 200, 150, 300, 250],
  },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-chatti-primary mb-8">Chatti Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Link href="/admin/accounts" className="bg-chatti-primary text-white text-center py-6 px-4 rounded shadow hover:opacity-90">
          <div className="text-lg font-semibold">🔐 Account Management</div>
          <p className="text-sm">Suspend, reactivate, reset or create API keys</p>
        </Link>
        <Link href="/admin/credit" className="bg-[#FEA901] text-white text-center py-6 px-4 rounded shadow hover:opacity-90">
          <div className="text-lg font-semibold">💰 Credit Management</div>
          <p className="text-sm">Billing, pricing, top-ups, Xero sync</p>
        </Link>
        <Link href="/admin/qantas" className="bg-[#DD0000] text-white text-center py-6 px-4 rounded shadow hover:opacity-90">
          <div className="text-lg font-semibold">🎯 Qantas Points</div>
          <p className="text-sm">Track and manage Qantas Business Rewards</p>
        </Link>
      </div>

      <div className="bg-white rounded shadow p-6">
        <h2 className="text-xl font-semibold mb-4">📊 Daily SMS Traffic</h2>
        <Chart options={chartOptions} series={chartSeries} type="bar" height={300} />
      </div>
    </div>
  );
}
