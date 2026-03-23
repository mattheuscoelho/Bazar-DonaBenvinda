import { adminListAll } from "@/lib/data/items";
import Link from "next/link";
import { Plus, Edit2, Copy, EyeOff, Trash2 } from "lucide-react";

export default async function AdminPage() {
  const items = await adminListAll();

  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-text-primary tracking-tight">
              Painel Admin
            </h1>
            <p className="text-xl text-text-secondary">
              Gerencie as peças do brechó
            </p>
          </div>

          <Link
            href="/admin/novo"
            className="admin-btn-large bg-cold-200 text-text-primary flex items-center justify-center gap-3 hover:bg-cold-300 transition-colors"
            aria-label="Adicionar nova peça ao catálogo"
          >
            <Plus size={28} strokeWidth={3} />
            <span>Adicionar nova peça</span>
          </Link>
        </header>

        {/* List Section */}
        <div className="bg-white rounded-3xl shadow-sm border border-warm-100 overflow-hidden">
          {items.length === 0 ? (
            <div className="p-12 text-center space-y-4">
              <p className="text-2xl text-text-secondary font-medium">
                Nenhuma peça cadastrada ainda.
              </p>
              <p className="text-lg text-text-secondary/70">
                Toque no botão acima para começar a adicionar!
              </p>
            </div>
          ) : (
            <div className="divide-y divide-warm-100">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="p-6 md:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-8 hover:bg-warm-50/50 transition-colors"
                >
                  {/* Item Info */}
                  <div className="flex-1 space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-2xl font-bold text-text-primary">
                        {item.title}
                      </h2>
                      <span
                        className={`px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider ${
                          item.status === "available"
                            ? "bg-cold-100 text-teal-800"
                            : "bg-slate-200 text-slate-600"
                        }`}
                      >
                        {item.status === "available" ? "Disponível" : "Indisponível"}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-8">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-text-secondary uppercase tracking-tight">
                          Categoria
                        </span>
                        <span className="text-xl">{item.category}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-text-secondary uppercase tracking-tight">
                          Segmento
                        </span>
                        <span className="text-xl">{item.segment}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-text-secondary uppercase tracking-tight">
                          Tamanho
                        </span>
                        <span className="text-xl font-semibold">{item.size}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-text-secondary uppercase tracking-tight">
                          Condição
                        </span>
                        <span className="text-xl">{item.condition}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3 mt-4 lg:mt-0">
                    <button
                      disabled
                      className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-6 py-4 bg-white border-2 border-warm-200 text-text-primary font-bold rounded-2xl opacity-60 cursor-not-allowed hover:bg-warm-50 transition-colors"
                      title="Em breve"
                    >
                      <Edit2 size={20} />
                      <span>Editar</span>
                    </button>
                    <button
                      disabled
                      className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-6 py-4 bg-white border-2 border-warm-200 text-text-primary font-bold rounded-2xl opacity-60 cursor-not-allowed hover:bg-warm-50 transition-colors"
                      title="Em breve"
                    >
                      <Copy size={20} />
                      <span>Duplicar</span>
                    </button>
                    <button
                      disabled
                      className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-6 py-4 bg-white border-2 border-warm-200 text-orange-700 font-bold rounded-2xl opacity-60 cursor-not-allowed hover:bg-warm-50 transition-colors"
                      title="Em breve"
                    >
                      <EyeOff size={20} />
                      <span>Ocultar</span>
                    </button>
                    <button
                      disabled
                      className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-6 py-4 bg-white border-2 border-red-200 text-red-600 font-bold rounded-2xl opacity-60 cursor-not-allowed hover:bg-red-50 transition-colors"
                      title="Em breve"
                    >
                      <Trash2 size={20} />
                      <span>Excluir</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Accessibility Note */}
        <footer className="text-center pb-8 border-t border-warm-100 pt-8">
          <p className="text-text-secondary flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cold-200" aria-hidden="true" />
            Visualização otimizada para leitura fácil
          </p>
        </footer>
      </div>
    </main>
  );
}
