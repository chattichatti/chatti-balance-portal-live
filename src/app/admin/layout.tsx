
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-black p-6">
      {children}
    </div>
  );
}
