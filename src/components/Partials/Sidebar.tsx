'use client';

import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-chatti-primary text-white flex flex-col">
      <div className="p-6 font-bold text-xl border-b border-white/20">
        Chatti Admin
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <Link href="/admin" className="block hover:bg-white hover:text-chatti-primary px-3 py-2 rounded">
          📊 Dashboard
        </Link>
        <Link href="/admin/accounts" className="block hover:bg-white hover:text-chatti-primary px-3 py-2 rounded">
          🔐 Account Management
        </Link>
        <Link href="/admin/credit" className="block hover:bg-white hover:text-chatti-primary px-3 py-2 rounded">
          💰 Credit Management
        </Link>
        <Link href="/admin/qantas" className="block hover:bg-white hover:text-chatti-primary px-3 py-2 rounded">
          🎯 Qantas Points
        </Link>
      </nav>
    </aside>
  );
}
