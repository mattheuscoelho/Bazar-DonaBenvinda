import AdminLayout from "@/components/AdminLayout";
import { adminListAll } from "@/lib/data/items";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Edit, Eye, Search, Trash2, Filter } from "lucide-react";

export default async function AdminDashboard() {
  const items = await adminListAll();

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h2 className="text-4xl font-bold text-text-primary tracking-tight">Todas as Peças</h2>
          <p className="text-xl text-text-secondary mt-2">Você tem {items.length} itens cadastrados no total.</p>
        </div>
        <div className="flex bg-white p-2 rounded-2xl shadow-sm border border-warm-200 w-full md:w-auto">
          <div className="flex items-center gap-3 px-4 w-full md:w-80">
            <Search className="w-6 h-6 text-text-secondary" />
            <input 
              type="text" 
              placeholder="Buscar pelo título..." 
              className="w-full py-4 text-xl bg-transparent outline-none border-none placeholder:text-text-secondary/50"
            />
          </div>
          <button className="p-4 bg-warm-50 text-warm-400 rounded-xl hover:bg-warm-100 transition-colors">
            <Filter className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-warm-200">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-warm-50 border-b border-warm-200">
                <th className="px-8 py-6 text-sm font-bold text-text-secondary uppercase tracking-widest">Foto</th>
                <th className="px-8 py-6 text-sm font-bold text-text-secondary uppercase tracking-widest">Título</th>
                <th className="px-8 py-6 text-sm font-bold text-text-secondary uppercase tracking-widest">Info</th>
                <th className="px-8 py-6 text-sm font-bold text-text-secondary uppercase tracking-widest">Preço</th>
                <th className="px-8 py-6 text-sm font-bold text-text-secondary uppercase tracking-widest text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-warm-100">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-warm-50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="relative w-20 h-28 rounded-xl overflow-hidden shadow-sm bg-warm-100">
                      <Image src={item.photos[0]} alt={item.title} fill className="object-cover" />
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-2xl font-bold text-text-primary group-hover:text-warm-400 transition-colors">{item.title}</p>
                    <p className="text-lg text-text-secondary mt-1">{item.category} • {item.segment}</p>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-warm-100 px-3 py-1 rounded-full text-sm font-bold text-warm-400">{item.size}</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-bold ${item.status === 'available' ? 'bg-cold-100 text-cold-300' : 'bg-red-100 text-red-500'}`}>
                        {item.status === 'available' ? 'Público' : 'Oculto'}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-2xl font-bold text-text-primary">{formatPrice(item.price_cents)}</p>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex justify-end gap-3">
                      <Link href={`/p/${item.id}`} className="p-4 bg-warm-50 text-text-secondary rounded-2xl hover:bg-white hover:shadow-md transition-all">
                        <Eye className="w-8 h-8" />
                      </Link>
                      <button className="p-4 bg-warm-50 text-cold-300 rounded-2xl hover:bg-white hover:shadow-md transition-all">
                        <Edit className="w-8 h-8" />
                      </button>
                      <button className="p-4 bg-red-50 text-red-400 rounded-2xl hover:bg-white hover:shadow-md transition-all">
                        <Trash2 className="w-8 h-8" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {items.length === 0 && (
          <div className="py-32 text-center bg-white">
            <p className="text-2xl text-text-secondary italic">Nenhuma peça cadastrada ainda.</p>
            <Link href="/admin/novo" className="btn btn-primary mt-8 py-6 px-12 text-xl rounded-2xl">
              Cadastrar primeira peça
            </Link>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
