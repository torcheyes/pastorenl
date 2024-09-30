import { CookiesProvider } from 'next-client-cookies/server';

export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <CookiesProvider>
      {children}
      </CookiesProvider>
    </div>
  );
}

// path: src/app/admin/login/layout.tsx
