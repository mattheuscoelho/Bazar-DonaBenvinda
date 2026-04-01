import Image from "next/image";
import { Heart, Sparkles, Sprout } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 60; // atualiza a cada 60s

async function getSobreConfig() {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("sobre_config")
      .select("*")
      .eq("id", 1)
      .single();
    return data;
  } catch {
    return null;
  }
}

export default async function SobrePage() {
  const config = await getSobreConfig();

  const titulo = config?.titulo || "Benvinda Poesia e Cia.";
  const subtitulo = config?.subtitulo || "Onde a moda encontra o afeto e as histórias ganham novos começos.";
  const historia_1 = config?.historia_1 || "O Brechó Benvinda nasceu de um desejo profundo de resgatar o valor das coisas simples. Para nós, uma peça de roupa não é apenas tecido — é uma memória, um momento, um poema.";
  const historia_2 = config?.historia_2 || "Com olhar atento e coração generoso, cada item é escolhido como quem escolhe flores em um jardim. Nossa curadoria é focada na moda cíclica, acreditando que o que já foi amado merece ser amado novamente.";
  const foto_1_url = config?.foto_1_url || "https://images.unsplash.com/photo-1534349762230-e0cadf78f5db?auto=format&fit=crop&q=80&w=800";
  const localizacao = config?.localizacao || "";

  const fotos = [config?.foto_2_url, config?.foto_3_url].filter(Boolean);

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      {/* Cabeçalho */}
      <div className="text-center mb-16">
        <span className="inline-block bg-warm-100 text-warm-400 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest mb-4">
          Nossa História
        </span>
        <h1 className="text-5xl font-bold tracking-tight text-text-primary mb-6">
          {titulo}
        </h1>
        <p className="text-2xl text-text-secondary font-light leading-relaxed">
          {subtitulo}
        </p>
      </div>

      {/* Foto + história */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
        <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-xl rotate-2 hover:rotate-0 transition-transform duration-500">
          <Image
            src={foto_1_url}
            alt={titulo}
            fill
            className="object-cover"
          />
        </div>
        <div className="space-y-6 text-lg text-text-secondary leading-relaxed">
          {historia_1 && <p>{historia_1}</p>}
          {historia_2 && <p>{historia_2}</p>}
        </div>
      </div>

      {/* Fotos extras */}
      {fotos.length > 0 && (
        <div className={`grid gap-6 mb-24 ${fotos.length === 1 ? "grid-cols-1 max-w-sm mx-auto" : "grid-cols-2"}`}>
          {fotos.map((url, i) => (
            <div key={i} className="relative aspect-square rounded-3xl overflow-hidden shadow-md">
              <Image src={url!} alt={`Foto ${i + 2}`} fill className="object-cover" />
            </div>
          ))}
        </div>
      )}

      {/* Cards de valores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        {[
          { icon: Heart, title: "Feito com Afeto", text: "Cuidamos de cada peça como se fosse para nossa própria família.", color: "bg-warm-200" },
          { icon: Sprout, title: "Moda Consciente", text: "Reduzimos o impacto ambiental através do reuso e do consumo gentil.", color: "bg-cold-200" },
          { icon: Sparkles, title: "Curadoria Única", text: "Peças exclusivas, vintage e contemporâneas com alma.", color: "bg-warm-100" },
        ].map((item, idx) => (
          <div key={idx} className="p-8 rounded-3xl bg-white border border-warm-100 shadow-sm hover:shadow-md transition-shadow text-center">
            <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-6 text-white`}>
              <item.icon className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-4">{item.title}</h3>
            <p className="text-text-secondary">{item.text}</p>
          </div>
        ))}
      </div>

      {/* Localização */}
      {localizacao && (
        <div className="bg-warm-50 rounded-[3rem] p-12 text-center border border-warm-100">
          <h2 className="text-3xl font-bold mb-6">Venha nos visitar</h2>
          <p className="text-xl text-text-secondary mb-8">
            Além do catálogo digital, adoramos receber amigas e clientes para um café e uma boa conversa entre cabides.
          </p>
          <div className="inline-block text-left bg-white p-6 rounded-2xl shadow-sm border border-warm-100">
            <p className="font-bold text-warm-400 uppercase text-xs tracking-widest mb-1">Localização</p>
            <p className="font-medium">{localizacao}</p>
          </div>
        </div>
      )}
    </div>
  );
}
