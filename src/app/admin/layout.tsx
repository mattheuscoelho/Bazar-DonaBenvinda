"use client";

import { ReactNode } from "react";
import AdminSidebar from "./_components/AdminSidebar";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      <AdminSidebar />
      <main className="flex-1 p-6 md:p-8 lg:p-12 overflow-y-auto w-full">
        <div className="mx-auto max-w-5xl">
          {children}
        </div>
      </main>
    </div>
  );
}
