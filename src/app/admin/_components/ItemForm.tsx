"use client";

import { AdminItem } from "../_types";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ItemFormProps {
  initialData?: AdminItem;
}

export default function ItemForm({ initialData }: ItemFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditing = !!initialData;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simula uma chamada API
    setTimeout(() => {
      alert(`O item foi ${isEditing ? "atualizado" : "criado"} com sucesso no MVP!`);
      router.push("/admin");
    }, 600);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">Título da Peça</label>
        <input 
          required 
          defaultValue={initialData?.title}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
          placeholder="Ex: Vestido Floral de Verão" 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Categoria</label>
          <input required defaultValue={initialData?.category} className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition" placeholder="Roupas, Calçados..." />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Tamanho</label>
          <input required defaultValue={initialData?.size} className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition" placeholder="Ex: M ou 40" />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">Status no Catálogo</label>
        <select defaultValue={initialData?.status || "available"} className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition bg-white appearance-none">
          <option value="available">Disponível para Compra</option>
          <option value="unavailable">Ocultar / Indisponível</option>
        </select>
      </div>

      <div className="pt-6 flex flex-col-reverse sm:flex-row gap-4 border-t border-gray-100">
        <button 
          type="button" 
          onClick={() => router.back()}
          disabled={isSubmitting}
          className="flex-1 py-3 px-4 rounded-xl border border-gray-300 font-semibold text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition disabled:opacity-50"
        >
          Cancelar
        </button>
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="flex-1 py-3 px-4 rounded-xl bg-blue-600 font-semibold text-white shadow-sm hover:bg-blue-700 transition active:scale-95 disabled:opacity-70 disabled:active:scale-100"
        >
          {isSubmitting ? "Salvando..." : isEditing ? "Salvar Alterações" : "Cadastrar Peça"}
        </button>
      </div>
    </form>
  );
}
