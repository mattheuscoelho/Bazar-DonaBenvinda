import ItemForm from "../../_components/ItemForm";

export default function NovoItemPage() {
  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Adicionar Nova Peça</h1>
        <p className="text-gray-500 mt-2">Preencha as informações necessárias para cadastrar uma nova peça no catálogo do brechó.</p>
      </header>
      
      <ItemForm />
    </div>
  );
}
