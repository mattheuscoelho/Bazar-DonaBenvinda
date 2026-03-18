import { getItemById } from "@/lib/data/items";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, Ruler, ShieldCheck } from "lucide-react";

interface ItemPageProps {
  params: Promise<{ id: string }>;
}

export default async function ItemPage({ params }: ItemPageProps) {
  const { id } = await params;
  const item = await getItemById(id);

  if (!item) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <a 
        href="javascript:history.back()" 
        className="inline-flex items-center gap-2 text-text-secondary hover:text-warm-400 mb-8 font-medium transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Voltar
      </a>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Gallery */}
        <div className="space-y-4">
          <div className="aspect-[3/4] relative rounded-[2rem] overflow-hidden bg-warm-50 shadow-sm">
            <Image
              src={item.photos[0]}
              alt={item.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          {item.photos.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {item.photos.map((photo, idx) => (
                <div key={idx} className="aspect-square relative rounded-xl overflow-hidden bg-warm-50 cursor-pointer hover:ring-2 ring-warm-300 transition-all">
                  <Image src={photo} alt={`${item.title} ${idx + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-warm-100 text-warm-400 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
                {item.category}
              </span>
              <span className="flex items-center gap-1 text-cold-300 font-bold uppercase text-sm tracking-wider">
                <CheckCircle2 className="w-4 h-4" /> Disponível
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-text-primary leading-tight">
              {item.title}
            </h1>
            <p className="text-3xl font-bold text-warm-400 mt-4">
              {formatPrice(item.price_cents)}
            </p>
          </div>

          <div className="prose prose-lg text-text-secondary">
            <p className="leading-relaxed">{item.description || "Esta peça ainda não possui uma descrição detalhada, mas cada detalhe foi escolhido com carinho."}</p>
          </div>

          {/* Specs Grid */}
          <div className="grid grid-cols-2 gap-6 p-8 bg-warm-50 rounded-3xl border border-warm-100">
            <div>
              <p className="text-xs uppercase tracking-widest text-text-secondary font-bold mb-1">Tamanho</p>
              <p className="text-xl font-medium text-text-primary">{item.size}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-text-secondary font-bold mb-1">Cor</p>
              <p className="text-xl font-medium text-text-primary">{item.color}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-text-secondary font-bold mb-1">Condição</p>
              <p className="text-xl font-medium text-text-primary capitalize">{item.condition.replace('_', ' ')}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-text-secondary font-bold mb-1">Segmento</p>
              <p className="text-xl font-medium text-text-primary capitalize">{item.segment}</p>
            </div>
          </div>

          {/* Measurements Toggle/Section (Placeholder for MVP) */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Ruler className="w-5 h-5 text-warm-300" /> Medidas e Detalhes
            </h3>
            <div className="text-text-secondary text-sm space-y-2">
              <p>• Todas as peças são higienizadas com produtos biodegradáveis.</p>
              <p>• Peças vintage podem apresentar marcas do tempo que as tornam únicas.</p>
            </div>
          </div>

          <div className="pt-6">
            <div className="p-6 bg-cold-100/30 rounded-2xl flex gap-4 items-start border border-cold-100">
              <ShieldCheck className="w-6 h-6 text-cold-300 shrink-0" />
              <div>
                <p className="font-bold text-text-primary">Garantia de Curadoria</p>
                <p className="text-sm text-text-secondary">Cada peça passa por uma análise rigorosa de qualidade e autenticidade pela Dona Benvinda.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
