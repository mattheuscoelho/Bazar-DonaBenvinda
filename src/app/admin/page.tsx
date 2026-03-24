import Link from "next/link";
import { getAdminItems } from "./_lib/mockData";

export default async function AdminDashboard() {
  const items = await getAdminItems();

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Catálogo de Peças</h1>
          <p className="text-gray-500 mt-1">Gerencie os itens disponíveis no brechó.</p>
        </div>
        <Link
          href="/admin/novo"
          className="inline-flex h-12 items-center justify-center rounded-xl bg-blue-600 px-6 text-white font-semibold shadow-sm hover:bg-blue-700 transition active:scale-95"
        >
          + Adicionar Peça
        </Link>
      </header>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {items.length === 0 ? (
          <div className="p-16 text-center text-gray-500">
            <p className="text-lg">Nenhuma peça encontrada no catálogo.</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {items.map((item) => (
              <li key={item.id} className="p-6 flex flex-col sm:flex-row sm:items-center gap-4 hover:bg-gray-50/50 transition">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                  <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600">
                    <span>{item.category} ({item.segment})</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                    <span>Tamanho: <strong className="text-gray-900">{item.size}</strong></span>
                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                    <span>Condição: {item.condition}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 mt-4 sm:mt-0">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    item.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {item.status === 'available' ? 'Disponível' : 'Indisponível'}
                  </span>
                  <Link
                    href={`/admin/editar/${item.id}`}
                    className="h-10 px-4 inline-flex items-center justify-center rounded-lg text-sm font-semibold border border-gray-200 hover:bg-gray-100 hover:text-blue-600 transition"
                  >
                    Editar
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
