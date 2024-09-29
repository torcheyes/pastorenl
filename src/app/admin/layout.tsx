import AdminNavWrapper from '@components/Admin/AdminNavWrapper';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      <AdminNavWrapper />
      <main className="max-w-[1200px] mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}

// path: src/app/admin/layout.tsx