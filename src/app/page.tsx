import Link from "next/link";

const categorias = [
  {
    slug: "feminino",
    label: "Feminino",
    descricao: "Vestidos, blusas, saias e muito mais com história e afeto.",
    emoji: "🌸",
    bg: "#FADADD",
    border: "#F9C4C4",
  },
  {
    slug: "masculino",
    label: "Masculino",
    descricao: "Camisas, calças e peças clássicas que nunca saem de moda.",
    emoji: "🌿",
    bg: "#C8DDD9",
    border: "#A8C5BF",
  },
  {
    slug: "acessorios",
    label: "Acessórios",
    descricao: "Bolsas, cintos, lenços e detalhes que completam o look.",
    emoji: "✨",
    bg: "#FADADD",
    border: "#F9C4C4",
  },
];

export default function HomePage() {
  return (
    <div style={{ backgroundColor: "#FAF7F5" }}>
      {/* Hero */}
      <section className="container mx-auto px-4 py-20 text-center">
        <p className="text-sm font-medium tracking-widest uppercase mb-4" style={{ color: "#A8C5BF" }}>
          Moda Cíclica & Poesia
        </p>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight" style={{ color: "#2D2D2D" }}>
          Brechó Benvinda
          <br />
          <span style={{ color: "#E8527A" }}>Poesia e Cia.</span>
        </h1>
        <p className="text-lg md:text-xl max-w-xl mx-auto mb-10" style={{ color: "#6B6B6B" }}>
          Peças únicas com história e afeto, escolhidas com carinho para encontrar um novo lar.
        </p>
        <Link
          href="/c/feminino"
          className="inline-block px-8 py-4 rounded-full font-semibold text-white transition-all hover:opacity-90 active:scale-95"
          style={{ backgroundColor: "#E8527A" }}
        >
          Ver o catálogo
        </Link>
      </section>

      {/* Divisor decorativo */}
      <div className="text-center text-2xl tracking-widest opacity-30 mb-2" style={{ color: "#E8527A" }}>
        ✦ ✦ ✦
      </div>

      {/* Categorias */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-semibold text-center mb-10" style={{ color: "#2D2D2D" }}>
          Explore por categoria
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categorias.map((cat) => (
            <Link
              key={cat.slug}
              href={`/c/${cat.slug}`}
              className="group block rounded-3xl p-8 text-center border-2 transition-all hover:-translate-y-1 hover:shadow-lg"
              style={{ backgroundColor: cat.bg, borderColor: cat.border }}
            >
              <div className="text-5xl mb-4">{cat.emoji}</div>
              <h3 className="text-xl font-bold mb-2" style={{ color: "#2D2D2D" }}>
                {cat.label}
              </h3>
              <p className="text-sm" style={{ color: "#6B6B6B" }}>
                {cat.descricao}
              </p>
              <span
                className="inline-block mt-4 text-sm font-medium underline underline-offset-2"
                style={{ color: "#E8527A" }}
              >
                Ver peças →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Sobre */}
      <section
        className="py-16 mt-8"
        style={{ backgroundColor: "#C8DDD9" }}
      >
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <p className="text-3xl mb-4">💚</p>
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#2D2D2D" }}>
            Moda que respeita o planeta e as pessoas
          </h2>
          <p className="mb-6" style={{ color: "#2D2D2D", opacity: 0.8 }}>
            Cada peça do nosso brechó tem uma história. Ao escolher moda cíclica, você cuida do meio ambiente e apoia um comércio mais justo e afetivo.
          </p>
          <Link
            href="/sobre"
            className="inline-block px-6 py-3 rounded-full font-medium border-2 transition-all hover:bg-white"
            style={{ borderColor: "#2D2D2D", color: "#2D2D2D" }}
          >
            Conheça nossa história
          </Link>
        </div>
      </section>
    </div>
  );
}
