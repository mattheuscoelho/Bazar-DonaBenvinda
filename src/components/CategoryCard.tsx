import Link from "next/link";
import Image from "next/image";

interface CategoryCardProps {
  title: string;
  slug: string;
  image: string;
  color: string;
}

export default function CategoryCard({ title, slug, image, color }: CategoryCardProps) {
  return (
    <Link 
      href={`/c/${slug}`} 
      className="relative aspect-square md:aspect-[3/2] overflow-hidden rounded-[2rem] group"
    >
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className={`absolute inset-0 opacity-40 group-hover:opacity-30 transition-opacity`} style={{ backgroundColor: color }} />
      <div className="absolute inset-0 p-8 flex flex-col justify-end">
        <h3 className="text-3xl font-bold text-white tracking-tight drop-shadow-md">
          {title}
        </h3>
        <p className="text-white/90 font-medium mt-2 group-hover:translate-x-2 transition-transform">
          Ver coleção →
        </p>
      </div>
    </Link>
  );
}
