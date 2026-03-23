// src/app/p/[id]/page.tsx
import Link from "next/link";
import Image from "next/image";
import { listAvailableItems } from "@/lib/data/items";

type Props = { params: { id: string } };

export default async function ItemPage({ params }: Props) {
  const items = await listAvailableItems();
  const item = items.find((it: any) => String(it.id) === String(params.id));

  if (!item) {
    return (
      <main className="min-h-screen bg-[var(--bg)] px-4 py-10">
        <div className="mx-auto max-w-xl rounded-2xl bg-white p-6 shadow-sm">
          <h1 className="text-xl font-semibold">Peça não encontrada</h1>
          <p className="mt-2 text-[var(--text-2)]">
            Talvez ela tenha sido removida ou esteja indisponível.
          </p>
          <Link
            href="/"
            className="mt-5 inline-flex rounded-full border border-black/10 bg-white px-4 py-2 text-sm hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40"
          >
            Voltar para o início
          </Link>
        </div>
      </main>
    );
  }

  const photos: string[] = item.photos ?? item.images ?? [];
  const cover = photos[0];

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <div className="mx-auto max-w-5xl px-4 py-6">
        <Link
          href="/"
          className="inline-flex rounded-full border border-black/10 bg-white px-4 py-2 text-sm hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40"
        >
          ← Voltar
        </Link>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
            {cover ? (
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src={cover}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            ) : (
              <div className="flex aspect-[4/5] items-center justify-center text-[var(--text-2)]">
                Sem foto
              </div>
            )}
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-[var(--text-2)]">
              {item.category} • {item.segment}
            </p>
            <h1 className="mt-2 text-3xl font-semibold">{item.title}</h1>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-black/5 px-3 py-1 text-sm">
                Tamanho: {item.size}
              </span>
              <span className="rounded-full bg-black/5 px-3 py-1 text-sm">
                Cor: {item.color}
              </span>
              <span className="rounded-full bg-black/5 px-3 py-1 text-sm">
                Condição: {item.condition}
              </span>
            </div>

            {item.description ? (
              <p className="mt-4 text-[var(--text-2)] leading-relaxed">
                {item.description}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </main>
  );
}
``