"use client";

import { useAuth } from "@hooks/useAuth";
import AdminInsights from "@containers/Admin/AdminInsights";

export default function AdminDashboardPage() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return null; // Redirect is handled by useAuth
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <AdminInsights />
    </div>
  );
}

// path: src/app/admin/dashboard/page.tsx
