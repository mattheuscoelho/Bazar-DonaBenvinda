"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/novo", label: "Adicionar Peça" },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex-shrink-0 hidden md:flex md:flex-col">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-2xl font-bold tracking-tight text-gray-800">Painel Admin</h2>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-4 py-3 rounded-xl font-medium transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-gray-200">
        <Link 
          href="/" 
          className="block w-full text-center py-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          Voltar para a Loja
        </Link>
      </div>
    </aside>
  );
}
