"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogOut, LayoutDashboard, PlusCircle, ArrowLeft } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Mock checking para facilitar teste local/StackBlitz
  const isMock = process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true";

  useEffect(() => {
    if (isMock) {
      setSession({ user: { email: "admin@benvinda.com" } });
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, [isMock]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-warm-50">
        <div className="w-16 h-16 border-4 border-warm-300 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-warm-100 p-4">
        <div className="bg-white p-12 rounded-[2.5rem] shadow-xl w-full max-w-lg text-center border-4 border-warm-200">
          <h2 className="text-4xl font-bold mb-8 text-text-primary">Acesso Restrito</h2>
          <p className="text-xl text-text-secondary mb-10">Este painel é exclusivo para a administração do bazar.</p>
          <Link href="/" className="btn btn-secondary w-full text-xl py-5 rounded-2xl">
            Voltar para o Catálogo
          </Link>
          <div className="mt-8 pt-8 border-t border-warm-100 p-4 bg-warm-50 rounded-2xl">
            <p className="text-sm text-text-secondary">Se você é a Dona Benvinda, entre em contato para suporte técnico ou utilize seu acesso seguro.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-100 flex flex-col md:flex-row">
      {/* Sidebar Admin - Focada em botões GRANDES */}
      <aside className="w-full md:w-80 bg-white border-r border-warm-200 p-8 flex flex-col gap-8 shadow-lg">
        <div>
          <h1 className="text-2xl font-bold text-warm-400 flex items-center gap-2 mb-2">
            Benvinda
          </h1>
          <p className="text-sm font-bold text-text-secondary uppercase tracking-widest">Painel de Gestão</p>
        </div>

        <nav className="flex flex-col gap-4">
          <Link 
            href="/admin" 
            className="flex items-center gap-4 p-5 text-xl font-bold rounded-2xl bg-warm-50 hover:bg-warm-100 transition-colors border-2 border-transparent hover:border-warm-200"
          >
            <LayoutDashboard className="w-8 h-8 text-warm-400" /> Ver Estoque
          </Link>
          <Link 
            href="/admin/novo" 
            className="flex items-center gap-4 p-5 text-xl font-bold rounded-2xl bg-warm-300 text-white hover:bg-warm-400 shadow-md transition-all active:scale-95"
          >
            <PlusCircle className="w-8 h-8" /> CADASTRAR PEÇA
          </Link>
        </nav>

        <div className="mt-auto space-y-4 pt-8 border-t border-warm-100">
          <Link href="/" className="flex items-center gap-2 text-text-secondary hover:text-warm-400 font-bold transition-colors mb-4">
            <ArrowLeft className="w-5 h-5" /> Ir para o site
          </Link>
          <button 
            onClick={() => isMock ? alert('Saindo do modo demonstração...') : supabase.auth.signOut()}
            className="w-full flex items-center justify-center gap-2 p-4 text-lg font-bold text-red-400 bg-red-50 hover:bg-red-100 rounded-2xl transition-colors"
          >
            <LogOut className="w-6 h-6" /> Sair com Segurança
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
