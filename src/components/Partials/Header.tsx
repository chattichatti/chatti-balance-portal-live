'use client';

export default function Header() {
  return (
    <header className="bg-white border-b p-4 shadow text-sm text-gray-600">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div>Welcome to Chatti Admin</div>
        <div className="text-xs opacity-70">v1.0</div>
      </div>
    </header>
  );
}
