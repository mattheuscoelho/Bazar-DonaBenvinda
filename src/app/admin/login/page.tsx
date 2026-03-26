"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Lock } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("E-mail ou senha incorretos");
      setLoading(false);
    } else {
      router.push("/admin");
      router.refresh(); 
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden border border-pink-100">
        <div className="p-8 pb-6 bg-pink-100/50 text-center">
          <div className="w-16 h-16 bg-pink-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-pink-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Acesso Restrito</h1>
          <p className="text-gray-600 mt-2">Painel de Gestão - Bazar Dona Benvinda</p>
        </div>
        
        <form onSubmit={handleLogin} className="p-8 space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm border border-red-100 text-center font-medium">
              {error}
            </div>
          )}
          
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
              placeholder="admin@benvinda.com"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
              placeholder="••••••••"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-bold text-lg transition-colors shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Verificando..." : "Entrar no Painel"}
          </button>
        </form>
        
        <div className="p-6 bg-gray-50 text-center border-t border-gray-100">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-pink-600 font-medium transition-colors">
            <ArrowLeft className="w-4 h-4" /> Voltar para o Catálogo
          </Link>
        </div>
      </div>
    </div>
  );
}
