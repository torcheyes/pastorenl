import AdminNavWrapper from "@components/Admin/AdminNavWrapper";
import { CookiesProvider } from 'next-client-cookies/server';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <AdminNavWrapper />
      <CookiesProvider>
      <main className="max-w-[1200px] mx-auto px-4 py-8">{children}</main>
      </CookiesProvider>
    </div>
  );
}

// path: src/app/admin/layout.tsx
