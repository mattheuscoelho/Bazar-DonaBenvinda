import Link from "next/link";
import Image from "next/image";
import { Item } from "@/lib/data/items";
import { formatPrice } from "@/lib/utils";

interface ItemCardProps {
  item: Item;
}

export default function ItemCard({ item }: ItemCardProps) {
  return (
    <Link href={`/p/${item.id}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-warm-50 mb-4 transition-all group-hover:shadow-lg">
        {item.photos?.[0] ? (
          <Image
            src={item.photos[0]}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-warm-300">
            <span className="text-4xl">🌸</span>
            <span className="text-xs text-text-secondary">Sem foto</span>
          </div>
        )}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-warm-400">
            {item.condition.replace('_', ' ')}
          </span>
          <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-cold-300">
            {item.size}
          </span>
        </div>
      </div>
      <h3 className="text-lg font-medium text-text-primary mb-1 group-hover:text-warm-300 transition-colors">
        {item.title}
      </h3>
      <p className="text-xl font-bold text-warm-400">
        {formatPrice(item.price_cents)}
      </p>
    </Link>
  );
}
