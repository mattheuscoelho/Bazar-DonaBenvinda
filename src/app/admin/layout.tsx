import { ReactNode } from "react";
import AdminSidebar from "./_components/AdminSidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  // Guard simples (placeholder), configure em .env.local
  const isEnabled = process.env.NEXT_PUBLIC_ADMIN_ENABLED === "true";

  if (!isEnabled) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 text-gray-900 p-4 text-center">
        <div className="max-w-md space-y-4">
          <h1 className="text-3xl font-bold text-red-600">Acesso Restrito</h1>
          <p>O painel de administração está desativado neste ambiente.</p>
          <p className="text-sm text-gray-500">Defina NEXT_PUBLIC_ADMIN_ENABLED="true" para acessar.</p>
        </div>
      </div>
    );
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
