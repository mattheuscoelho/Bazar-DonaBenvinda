import { listAvailableItems } from "@/lib/data/items";
import ItemCard from "@/components/ItemCard";
import CategoryCard from "@/components/CategoryCard";
import { Sparkles } from "lucide-react";

export default function Home() {
  const itemsTask = listAvailableItems();
  
  // Categorias principais
  const categories = [
    { title: "Feminino", slug: "feminino", color: "#F8D0C8", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800" },
    { title: "Masculino", slug: "masculino", color: "#B8D0C8", image: "https://images.unsplash.com/photo-1516257984877-283d99c13078?auto=format&fit=crop&q=80&w=800" },
    { title: "Acessórios", slug: "acessorios", color: "#F8D8D0", image: "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&q=80&w=800" },
    { title: "Casas e Afeto", slug: "casa", color: "#C8D8D0", image: "https://images.unsplash.com/photo-1534349762230-e0cadf78f5db?auto=format&fit=crop&q=80&w=800" },
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-warm-50">
        <div className="container mx-auto px-4 text-center z-10">
          <span className="inline-block bg-white px-4 py-2 rounded-full text-warm-400 font-bold tracking-widest text-sm mb-6 shadow-sm uppercase">
            Curadoria poética e consciente
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-text-primary mb-8 max-w-4xl mx-auto leading-tight">
            Moda com história, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-warm-300 via-warm-400 to-cold-300">
              afeto e poesia.
            </span>
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            O brechó da Dona Benvinda é um encontro entre o passado e o futuro, onde cada peça conta uma nova história.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#novidades" className="btn btn-primary text-lg">Explorar Novidades</a>
            <a href="/sobre" className="btn btn-secondary text-lg">Nossa História</a>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] aspect-square bg-warm-200/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] aspect-square bg-cold-200/20 rounded-full blur-[100px]" />
      </section>

      {/* Categories Grid */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-10 tracking-tight flex items-center gap-3">
          Por Categorias
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <CategoryCard key={cat.slug} {...cat} />
          ))}
        </div>
      </section>

      {/* New Arrivals Section */}
      <section id="novidades" className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="flex items-center gap-2 text-warm-400 font-bold uppercase tracking-widest text-sm mb-2">
              <Sparkles className="w-4 h-4" /> Fresquinhos no bazar
            </span>
            <h2 className="text-4xl font-bold tracking-tight">Novidades</h2>
          </div>
          <a href="/c/todas" className="text-text-secondary hover:text-warm-400 font-medium border-b border-transparent hover:border-warm-200 transition-all">
            Ver tudo →
          </a>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {/* We'll handle data fetching here - Next.js 15 Server Component style */}
          <NewArrivalsList />
        </div>
      </section>
    </div>
  );
}

async function NewArrivalsList() {
  const items = await listAvailableItems();
  return (
    <>
      {items.slice(0, 8).map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
      {items.length === 0 && (
        <p className="col-span-full py-20 text-center text-text-secondary text-lg italic">
          Preparando novas peças cheias de poesia... Volte em breve!
        </p>
      )}
    </>
  );
}
