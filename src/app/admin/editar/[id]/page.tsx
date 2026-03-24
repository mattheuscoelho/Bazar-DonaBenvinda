import { getAdminItem } from "../../../_lib/mockData";
import ItemForm from "../../../_components/ItemForm";
import { notFound } from "next/navigation";

interface PageProps {
  params: { id: string };
}

export default async function EditarItemPage({ params }: PageProps) {
  const item = await getAdminItem(params.id);

  if (!item) {
    notFound();
  }

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Editar Peça</h1>
        <p className="text-gray-500 mt-2">Você está editando as informações da peça: <span className="font-semibold text-gray-800">"{item.title}"</span>.</p>
      </header>
      
      <ItemForm initialData={item} />
    </div>
  );
}
