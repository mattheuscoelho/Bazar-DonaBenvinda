// src/app/admin/page.tsx
import Link from "next/link";
import * as itemsRepo from "../../lib/data/items";

function labelCond(cond?: string) {
  const c = String(cond || "").toLowerCase();
  if (c.includes("novo")) return "Como novo";
  if (c.includes("otimo") || c.includes("ótimo")) return "Ótimo";
  if (c.includes("bom")) return "Bom";
  if (c.includes("usado")) return "Usado";
  return cond || "—";
}

function labelStatus(status?: string) {
  return status === "unavailable" ? "Indisponível" : "Disponível";
}

export default async function AdminPage() {
  // ✅ Compatível com qualquer parser: sem ?? e sem optional chaining
  const anyRepo = itemsRepo as any;

  let fn: any = null;
  if (typeof anyRepo.adminListAll === "function") fn = anyRepo.adminListAll;
  else if (typeof anyRepo.listAvailableItems === "function") fn = anyRepo.listAvailableItems;

  const items: any[] = fn ? await fn() : [];

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)] px-4 py-6">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Painel Admin
            </h1>
            <p className="mt-1 text-base md:text-lg text-[var(--text-2)]">
              Gerencie as peças do brechó (modo simples).
            </p>
          </div>

          <Link
            href="/admin/novo"
            className="inline-flex h-14 items-center justify-center rounded-2xl bg-[var(--mint-2)] px-6 text-lg font-semibold shadow-sm
                       focus:outline-none focus-visible:ring-4 focus-visible:ring-black/10"
            aria-label="Adicionar nova peça"
          >
            <span aria-hidden="true" className="mr-3 text-2xl leading-none">
              +
            </span>
            Adicionar nova peça
          </Link>
        </header>

        {/* List */}
        <section className="rounded-3xl bg-white shadow-sm border border-black/5 overflow-hidden">
          

          {items.length === 0 ? (
            <div className="px-5 py-10 text-center">
              <p className="text-lg font-medium text-[var(--text)]">
                Nenhuma peça cadastrada ainda.
              </p>
              <p className="mt-2 text-[var(--text-2)]">
                Clique em <strong>“Adicionar nova peça”</strong> para começar.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-black/5">
              {items.map((item: any) => (
                <div
                  key={item.id}
                  className="px-5 py-5 md:px-6 md:py-6 flex flex-col lg:flex-row lg:items-center gap-5 hover:bg-black/[0.02]"
                >
                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-2xl font-semibold">{item.title || "—"}</h3>
                      <span
                        className={
                          "rounded-full px-3 py-1 text-sm font-semibold " +
                          (item.status === "unavailable"
                            ? "bg-black/10 text-black/70"
                            : "bg-[var(--peach-1)] text-black")
                        }
                      >
                        {labelStatus(item.status)}
                      </span>
                    </div>

                    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-2)]">
                          Categoria
                        </p>
                        <p className="text-base font-medium block">{item.category}</p>
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-2)]">
                          Segmento
                        </p>
                        <p className="text-base font-medium">{item.segment || "—"}</p>
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-2)]">
                          Tamanho
                        </p>
                        <p className="text-base font-medium">{item.size || "—"}</p>
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-2)]">
                          Condição
                        </p>
                        <p className="text-base font-medium">{labelCond(item.condition)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions (UI apenas por enquanto) */}
                  <div className="flex flex-wrap gap-2 lg:justify-end">
                    {["Editar", "Duplicar", "Indisponível", "Excluir"].map((label) => (
                      <button
                        key={label}
                        disabled
                        title="Em breve"
                        className={
                          "h-12 rounded-2xl px-5 text-base font-semibold border opacity-60 cursor-not-allowed " +
                          "focus:outline-none focus-visible:ring-4 focus-visible:ring-black/10 " +
                          (label === "Excluir"
                            ? "border-red-200 text-red-600 bg-white hover:bg-red-50"
                            : label === "Indisponível"
                            ? "border-orange-200 text-orange-700 bg-white hover:bg-orange-50"
                            : "border-black/10 text-[var(--text)] bg-white hover:bg-black/[0.02]")
                        }
                      >
                        {label}
                      </button>
                    ))}
                    <p className="w-full mt-2 text-sm text-[var(--text-2)]">
                      Ações serão habilitadas no próximo passo (cadastro e edição).
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <footer className="pt-2 text-center text-sm text-[var(--text-2)]">
          Visualização otimizada para leitura fácil (botões grandes e alto contraste).
        </footer>
      </div>
    </main>
  );
}
