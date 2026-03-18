"use client";

import AdminLayout from "@/components/AdminLayout";
import { useEffect, useState, use } from "react";
import { getItemById } from "@/lib/data/items";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, Info } from "lucide-react";

export default function EditItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    getItemById(id).then(item => {
      if (item) {
        setFormData({
          title: item.title,
          category: item.category,
          size: item.size,
          color: item.color,
          price: item.price_cents ? (item.price_cents / 100).toString() : "",
          description: item.description,
          status: item.status
        });
      }
      setLoading(false);
    });
  }, [id]);

  if (loading) return <div className="p-20 text-center text-2xl font-bold">Carregando dados da peça...</div>;
  if (!formData) return <div className="p-20 text-center text-2xl font-bold text-red-500">Peça não encontrada.</div>;

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
           <button onClick={() => router.back()} className="flex items-center gap-2 text-xl font-bold text-text-secondary hover:text-warm-400 mb-6">
            <ArrowLeft className="w-6 h-6" /> Voltar
          </button>
          <h1 className="text-4xl font-bold text-text-primary">Editar Peça</h1>
          <p className="text-xl text-text-secondary mt-2">ID: {id}</p>
        </div>

        <div className="bg-white rounded-[3rem] p-12 shadow-xl border-t-8 border-warm-300">
           <div className="space-y-10">
              <div className="group">
                <label className="block text-2xl font-bold mb-4">Nome da Peça</label>
                <input 
                  type="text" 
                  className="w-full text-2xl p-6 bg-warm-50 border-2 border-warm-100 rounded-2xl focus:border-warm-300 outline-none"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-10">
                <div>
                  <label className="block text-2xl font-bold mb-4">Status no Site</label>
                  <select 
                    className="w-full text-2xl p-6 bg-warm-50 border-2 border-warm-100 rounded-2xl focus:border-warm-300 outline-none"
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                  >
                    <option value="available">Visível (Disponível)</option>
                    <option value="unavailable">Oculto (Vendido/Removido)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-2xl font-bold mb-4">Preço (R$)</label>
                  <input 
                    type="number" 
                    className="w-full text-2xl p-6 bg-warm-50 border-2 border-warm-100 rounded-2xl focus:border-warm-300 outline-none"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                  />
                </div>
              </div>

              <div className="p-8 bg-warm-50 rounded-3xl flex gap-6 items-start">
                <Info className="w-8 h-8 text-warm-300 shrink-0" />
                <p className="text-xl text-text-secondary italic">Por ser um MVP no StackBlitz com dados mockados, as alterações não serão persistidas permanentemente na memória do navegador após atualizar a página.</p>
              </div>

              <button 
                onClick={() => { alert('Alterações salvas com sucesso!'); router.push('/admin'); }}
                className="w-full bg-warm-300 text-white text-2xl py-8 rounded-3xl font-bold flex items-center justify-center gap-4 shadow-xl hover:bg-warm-400 transition-all active:scale-95"
              >
                <Save className="w-8 h-8" /> SALVAR ALTERAÇÕES
              </button>
           </div>
        </div>
      </div>
    </AdminLayout>
  );
}
