// src/app/c/[slug]/page.tsx
import Link from "next/link";
import ItemCard from "@/components/ItemCard";
import { listAvailableItems } from "@/lib/data/items";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function normalizeCategory(slug: string) {
  return decodeURIComponent(slug).toLowerCase();
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;           // ✅ resolve o erro do Next
  const categorySlug = normalizeCategory(slug);

  const items = await listAvailableItems();

  const filtered = items.filter((item: any) => {
    const segment = String(item.segment ?? "").toLowerCase();
    const category = String(item.category ?? "").toLowerCase();
    return segment === categorySlug || category === categorySlug;
  });

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <div className="mx-auto max-w-5xl px-4 py-6">
        <header className="flex items-center justify-between">
          <div>
            <p className="text-sm text-[var(--text-2)]">Categoria</p>
            <h1 className="text-2xl font-semibold capitalize">{categorySlug}</h1>
          </div>

          <Link href="/" className="rounded-full bg-white px-4 py-2 shadow-sm">
            Voltar
          </Link>
        </header>

        <section className="mt-6">
          {filtered.length === 0 ? (
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="text-[var(--text-2)]">
                Ainda não há peças disponíveis nesta categoria.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((item: any) => (
                <Link key={item.id} href={`/p/${item.id}`}>
                  <ItemCard item={item} />
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
