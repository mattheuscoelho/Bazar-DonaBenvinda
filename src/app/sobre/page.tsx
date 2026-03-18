import Image from "next/image";
import { Heart, Sparkles, Sprout } from "lucide-react";

export default function SobrePage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="text-center mb-16">
        <span className="inline-block bg-warm-100 text-warm-400 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest mb-4">
          Nossa História
        </span>
        <h1 className="text-5xl font-bold tracking-tight text-text-primary mb-6">
          Benvinda Poesia e Cia.
        </h1>
        <p className="text-2xl text-text-secondary font-light leading-relaxed">
          Onde a moda encontra o afeto e as histórias ganham novos começos.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
        <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-xl rotate-2 hover:rotate-0 transition-transform duration-500">
          <Image 
            src="https://images.unsplash.com/photo-1534349762230-e0cadf78f5db?auto=format&fit=crop&q=80&w=800" 
            alt="Dona Benvinda no seu bazar" 
            fill 
            className="object-cover"
          />
        </div>
        <div className="space-y-6 text-lg text-text-secondary leading-relaxed">
          <p>
            O **Bazar Dona Benvinda** nasceu de um desejo profundo de resgatar o valor das coisas simples. Para nós, uma peça de roupa não é apenas tecido; é uma memória, um momento, um poema.
          </p>
          <p>
            Dona Benvinda, com seu olhar atento e coração generoso, seleciona cada item deste catálogo como quem escolhe flores em um jardim. Nossa curadoria é focada na **moda cíclica**, acreditando que o que já foi amado merece ser amado novamente.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        {[
          { 
            icon: Heart, 
            title: "Feito com Afeto", 
            text: "Cuidamos de cada peça como se fosse para nossa própria família.",
            color: "bg-warm-200"
          },
          { 
            icon: Sprout, 
            title: "Moda Consciente", 
            text: "Reduzimos o impacto ambiental através do reuso e do consumo gentil.",
            color: "bg-cold-200"
          },
          { 
            icon: Sparkles, 
            title: "Curadoria Única", 
            text: "Peças exclusivas, vintage e contemporâneas com alma.",
            color: "bg-warm-100 text-warm-400"
          }
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

      <div className="bg-warm-50 rounded-[3rem] p-12 text-center border border-warm-100">
        <h2 className="text-3xl font-bold mb-6">Venha nos visitar</h2>
        <p className="text-xl text-text-secondary mb-8">
          Além do nosso catálogo digital, adoramos receber amigos e clientes para um café e uma boa conversa entre cabides.
        </p>
        <div className="flex justify-center gap-6">
          <div className="text-left bg-white p-6 rounded-2xl shadow-sm border border-warm-100">
            <p className="font-bold text-warm-400 uppercase text-xs tracking-widest mb-1">Localização</p>
            <p className="font-medium">Rua das Flores, 123 - Poesia, SP</p>
          </div>
        </div>
      </div>
    </div>
  );
}
