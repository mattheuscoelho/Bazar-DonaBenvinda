"use client";

import Link from "next/link";
import { Menu, Heart } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-warm-100">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-warm-200 rounded-full flex items-center justify-center group-hover:bg-warm-300 transition-colors">
            <Heart className="w-5 h-5 text-white fill-white" />
          </div>
          <span className="text-xl font-semibold tracking-tight">DonaBenvinda</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 font-medium">
          <Link href="/c/feminino" className="hover:text-warm-300 transition-colors">Feminino</Link>
          <Link href="/c/masculino" className="hover:text-warm-300 transition-colors">Masculino</Link>
          <Link href="/c/acessorios" className="hover:text-warm-300 transition-colors">Acessórios</Link>
          <Link href="/sobre" className="hover:text-warm-300 transition-colors">Sobre</Link>
          <Link href="/admin" className="btn btn-secondary px-4 py-2">Painel Admin</Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Abrir menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <nav className="md:hidden border-t border-warm-100 p-4 space-y-4 bg-white animate-in slide-in-from-top duration-300">
          <Link href="/c/feminino" className="block text-lg py-2">Feminino</Link>
          <Link href="/c/masculino" className="block text-lg py-2">Masculino</Link>
          <Link href="/c/acessorios" className="block text-lg py-2">Acessórios</Link>
          <Link href="/sobre" className="block text-lg py-2">Sobre</Link>
          <Link href="/admin" className="block text-lg py-2 font-bold text-warm-400">Painel Admin</Link>
        </nav>
      )}
    </header>
  );
}
