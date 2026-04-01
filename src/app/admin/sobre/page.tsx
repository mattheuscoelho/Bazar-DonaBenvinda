"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

type SobreConfig = {
  titulo: string;
  subtitulo: string;
  historia_1: string;
  historia_2: string;
  foto_1_url: string;
  foto_2_url: string;
  foto_3_url: string;
  localizacao: string;
};

const DEFAULTS: SobreConfig = {
  titulo: "",
  subtitulo: "",
  historia_1: "",
  historia_2: "",
  foto_1_url: "",
  foto_2_url: "",
  foto_3_url: "",
  localizacao: "",
};

export default function AdminSobrePage() {
  const [form, setForm] = useState<SobreConfig>(DEFAULTS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "ok" | "erro"; msg: string } | null>(null);

  useEffect(() => {
    supabase
      .from("sobre_config")
      .select("*")
      .eq("id", 1)
      .single()
      .then(({ data }) => {
        if (data) setForm(data as SobreConfig);
        setLoading(false);
      });
  }, []);

  const set = (field: keyof SobreConfig) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSave = async () => {
    setSaving(true);
    setFeedback(null);
    const { error } = await supabase
      .from("sobre_config")
      .upsert({ id: 1, ...form, updated_at: new Date().toISOString() });
    setSaving(false);
    setFeedback(error ? { type: "erro", msg: "Erro ao salvar. Tente novamente." } : { type: "ok", msg: "Salvo com sucesso! ✓" });
    setTimeout(() => setFeedback(null), 4000);
  };

  if (loading) return <div className="p-8 text-gray-500">Carregando...</div>;

  return (
    <div className="max-w-2xl space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Nossa História</h1>
        <p className="text-gray-500 mt-1">Edite o texto e as fotos da página "Sobre" da loja.</p>
      </header>

      {feedback && (
        <div className={`px-5 py-4 rounded-xl font-medium text-sm ${feedback.type === "ok" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
          {feedback.msg}
        </div>
      )}

      <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-5">
        <h2 className="font-semibold text-gray-700 text-lg border-b pb-3">Título e subtítulo</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nome da loja</label>
          <input
            type="text"
            value={form.titulo}
            onChange={set("titulo")}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Subtítulo</label>
          <input
            type="text"
            value={form.subtitulo}
            onChange={set("subtitulo")}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
        </div>
      </section>

      <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-5">
        <h2 className="font-semibold text-gray-700 text-lg border-b pb-3">A sua história</h2>
        <p className="text-sm text-gray-500">Escreva sobre quem você é, de onde veio essa paixão e o que o brechó significa pra você. Use quantas palavras quiser 💛</p>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Primeiro parágrafo</label>
          <textarea
            rows={5}
            value={form.historia_1}
            onChange={set("historia_1")}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-pink-300 resize-y"
            placeholder="Ex: O Brechó Benvinda nasceu de..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Segundo parágrafo</label>
          <textarea
            rows={5}
            value={form.historia_2}
            onChange={set("historia_2")}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-pink-300 resize-y"
            placeholder="Ex: Cada peça escolhida com carinho..."
          />
        </div>
      </section>

      <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-5">
        <h2 className="font-semibold text-gray-700 text-lg border-b pb-3">Fotos</h2>
        <p className="text-sm text-gray-500">Cole o link (URL) de até 3 fotos. Você pode usar fotos do Google Fotos, WhatsApp Web ou qualquer site de imagens.</p>

        {([
          { field: "foto_1_url" as const, label: "Foto principal (aparece em destaque)" },
          { field: "foto_2_url" as const, label: "Foto 2" },
          { field: "foto_3_url" as const, label: "Foto 3" },
        ]).map(({ field, label }) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input
              type="url"
              value={form[field]}
              onChange={set(field)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-pink-300"
              placeholder="https://..."
            />
            {form[field] && (
              <img
                src={form[field]}
                alt="Pré-visualização"
                className="mt-2 h-32 w-auto rounded-xl object-cover border border-gray-100"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
            )}
          </div>
        ))}
      </section>

      <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-5">
        <h2 className="font-semibold text-gray-700 text-lg border-b pb-3">Localização</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Endereço ou referência</label>
          <input
            type="text"
            value={form.localizacao}
            onChange={set("localizacao")}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-pink-300"
            placeholder="Ex: Rua das Flores, 123 - Guarujá, SP"
          />
        </div>
      </section>

      <button
        onClick={handleSave}
        disabled={saving}
        className="w-full py-5 rounded-2xl bg-pink-500 hover:bg-pink-600 text-white font-bold text-xl transition-colors shadow-md disabled:opacity-60"
      >
        {saving ? "Salvando..." : "Salvar alterações"}
      </button>
    </div>
  );
}
