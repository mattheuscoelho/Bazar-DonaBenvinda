import { listByCategory } from "@/lib/data/items";
import ItemCard from "@/components/ItemCard";
import { notFound } from "next/navigation";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const items = await listByCategory(slug);
  
  // No MVP simplificamos a verificação de categoria válida pelo retorno da lista ou slug conhecido
  const categoryNames: Record<string, string> = {
    feminino: "Feminino",
    masculino: "Masculino",
    acessorios: "Acessórios",
    casa: "Casas e Afeto",
    vestidos: "Vestidos",
    camisetas: "Camisetas",
    calças: "Calças",
    todas: "Todas as Peças"
  };

  const categoryTitle = categoryNames[slug] || slug.charAt(0).toUpperCase() + slug.slice(1);

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-12">
        <nav className="text-sm text-text-secondary mb-4 flex gap-2">
          <a href="/" className="hover:text-warm-400">Início</a>
          <span>/</span>
          <span className="font-medium text-text-primary">{categoryTitle}</span>
        </nav>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-text-primary capitalize">
          {categoryTitle}
        </h1>
        <p className="text-xl text-text-secondary mt-4 font-light">
          {items.length} {items.length === 1 ? 'peça encontrada' : 'peças encontradas'} com curadoria especial.
        </p>
      </header>

      {items.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-warm-50 rounded-[2rem] border-2 border-dashed border-warm-200">
          <p className="text-xl text-text-secondary italic">
            Ainda não temos peças nesta categoria, mas estamos garimpando novidades!
          </p>
          <a href="/" className="btn btn-primary mt-8">Voltar ao Início</a>
        </div>
      )}
    </div>
  );
}
