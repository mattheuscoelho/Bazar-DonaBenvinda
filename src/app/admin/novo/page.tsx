"use client";

import AdminLayout from "@/components/AdminLayout";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Camera, CheckCircle, ChevronLeft, ChevronRight, Info, Package, Sparkles } from "lucide-react";
import Image from "next/image";

export default function NewItemWizard() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    segment: "feminino",
    size: "",
    color: "",
    condition: "como_novo",
    description: "",
    price: "",
    photos: [] as string[]
  });
  const router = useRouter();

  const nextStep = () => setStep((s) => Math.min(s + 1, 3));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleFinish = () => {
    alert("Peça cadastrada com sucesso! (Modo Demonstração)");
    router.push("/admin");
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 flex justify-between items-center bg-white p-6 rounded-3xl shadow-sm border border-warm-200">
          <div className="flex gap-4">
            {[1, 2, 3].map((s) => (
              <div 
                key={s} 
                className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold shadow-sm transition-all ${
                  step === s ? "bg-warm-300 text-white scale-110 ring-4 ring-warm-100" : 
                  step > s ? "bg-cold-200 text-white" : "bg-warm-50 text-text-secondary"
                }`}
              >
                {step > s ? <CheckCircle className="w-6 h-6" /> : s}
              </div>
            ))}
          </div>
          <p className="text-xl font-bold text-warm-400 uppercase tracking-widest">
            {step === 1 ? "Fotos da Peça" : step === 2 ? "Dados Básicos" : "Finalização"}
          </p>
        </div>

        <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl border-4 border-warm-50 animate-in fade-in zoom-in duration-500">
          
          {/* STEP 1: FOTOS */}
          {step === 1 && (
            <div className="space-y-10">
              <div className="text-center">
                <h3 className="text-3xl font-bold mb-4">Primeiro, as fotos!</h3>
                <p className="text-xl text-text-secondary">Escolha as melhores fotos da peça para mostrar sua beleza.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <button 
                  onClick={() => setFormData({...formData, photos: ["https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600"]})}
                  className="aspect-[3/4] border-4 border-dashed border-warm-200 rounded-[2.5rem] flex flex-col items-center justify-center gap-4 hover:bg-warm-50 hover:border-warm-300 transition-all group"
                >
                  <Camera className="w-16 h-16 text-warm-200 group-hover:text-warm-400 group-hover:scale-110 transition-all" />
                  <span className="text-2xl font-bold text-text-secondary">Adicionar Foto</span>
                </button>
                
                {formData.photos.length > 0 && (
                  <div className="aspect-[3/4] relative rounded-[2.5rem] overflow-hidden border-4 border-warm-200 shadow-md">
                    <Image src={formData.photos[0]} alt="Preview" fill className="object-cover" />
                    <button 
                      onClick={() => setFormData({...formData, photos: []})}
                      className="absolute top-4 right-4 bg-red-500 text-white p-3 rounded-full shadow-lg"
                    >
                      Remover
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 2: DADOS */}
          {step === 2 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold">Conte-nos sobre ela</h3>
                <p className="text-xl text-text-secondary">Preencha os campos abaixo com letras grandes e claras.</p>
              </div>

              <div className="space-y-10">
                <div className="group">
                  <label className="block text-2xl font-bold mb-4 text-text-primary flex items-center gap-2">
                    <Package className="w-6 h-6 text-warm-300" /> Nome da Peça
                  </label>
                  <input 
                    type="text" 
                    placeholder="Ex: Vestido Amarelo de Seda"
                    className="w-full text-2xl p-6 bg-warm-50 border-2 border-warm-100 rounded-2xl focus:border-warm-300 focus:bg-white transition-all outline-none"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div>
                    <label className="block text-2xl font-bold mb-4">Categoria</label>
                    <select 
                      className="w-full text-2xl p-6 bg-warm-50 border-2 border-warm-100 rounded-2xl focus:border-warm-300 outline-none"
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                    >
                      <option value="">Selecione...</option>
                      <option value="vestidos">Vestidos</option>
                      <option value="blusas">Blusas</option>
                      <option value="calças">Calças</option>
                      <option value="acessorios">Acessórios</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-2xl font-bold mb-4">Tamanho</label>
                    <input 
                      type="text" 
                      placeholder="Ex: M ou 42"
                      className="w-full text-2xl p-6 bg-warm-50 border-2 border-warm-100 rounded-2xl focus:border-warm-300 outline-none"
                      value={formData.size}
                      onChange={(e) => setFormData({...formData, size: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                   <div>
                    <label className="block text-2xl font-bold mb-4">Cor Principal</label>
                    <input 
                      type="text" 
                      placeholder="Ex: Vermelho"
                      className="w-full text-2xl p-6 bg-warm-50 border-2 border-warm-100 rounded-2xl focus:border-warm-300 outline-none"
                      value={formData.color}
                      onChange={(e) => setFormData({...formData, color: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-2xl font-bold mb-4 text-warm-400">Preço (R$)</label>
                    <input 
                      type="number" 
                      placeholder="Ex: 85"
                      className="w-full text-2xl p-6 bg-warm-300/10 border-2 border-warm-200 rounded-2xl focus:border-warm-300 outline-none font-bold"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: REVISÃO */}
          {step === 3 && (
            <div className="space-y-10">
              <div className="text-center">
                <h3 className="text-3xl font-bold">Quase lá!</h3>
                <p className="text-xl text-text-secondary">Revise os dados e escreva uma pequena história para a peça.</p>
              </div>

              <div className="group">
                <label className="block text-2xl font-bold mb-4 text-text-primary flex items-center gap-3">
                   <Sparkles className="w-6 h-6 text-warm-300" /> Descrição Poética
                </label>
                <textarea 
                  rows={4}
                  placeholder="Conte um pouco sobre essa peça..."
                  className="w-full text-2xl p-6 bg-warm-50 border-2 border-warm-100 rounded-2xl focus:border-warm-300 focus:bg-white transition-all outline-none resize-none"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <div className="p-8 bg-cold-100/20 rounded-3xl flex gap-6 items-start border-2 border-cold-100">
                <Info className="w-10 h-10 text-cold-300 shrink-0 mt-1" />
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-text-primary">Dica da Benvinda:</p>
                  <p className="text-xl text-text-secondary italic">"Lembre-se de mencionar se o tecido é leve ou se a peça tem algum detalhe especial como botões vintage."</p>
                </div>
              </div>
            </div>
          )}

          {/* NAV BUTTONS */}
          <div className="flex gap-6 mt-16 pt-12 border-t border-warm-100">
            {step > 1 && (
              <button 
                onClick={prevStep}
                className="flex-1 btn btn-secondary text-2xl py-6 rounded-2xl flex items-center justify-center gap-3"
              >
                <ChevronLeft className="w-8 h-8" /> Voltar
              </button>
            )}
            {step < 3 ? (
              <button 
                onClick={nextStep}
                disabled={step === 1 && formData.photos.length === 0}
                className="flex-[2] btn btn-primary text-2xl py-6 rounded-2xl flex items-center justify-center gap-3 shadow-lg disabled:grayscale"
              >
                Próximo Passo <ChevronRight className="w-8 h-8" />
              </button>
            ) : (
              <button 
                onClick={handleFinish}
                className="flex-[2] bg-cold-300 text-white text-2xl py-6 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl hover:bg-cold-200 active:scale-95 transition-all"
              >
                <Sparkles className="w-8 h-8" /> PUBLICAR AGORA
              </button>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
