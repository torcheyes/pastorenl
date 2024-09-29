"use client";

import { usePathname } from "next/navigation";
import AdminNav from "@containers/Admin/AdminNav";

const AdminNavWrapper = () => {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return null;
  }

  return <AdminNav />;
};

export default AdminNavWrapper;

// path: src/components/Admin/AdminNavWrapper.tsx
