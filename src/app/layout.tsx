import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Brechó Benvinda Poesia e Cia. | Moda Cíclica",
  description: "Peças únicas com história e afeto. Confira nosso catálogo de moda cíclica.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-background text-text-primary`}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="py-12 border-t border-warm-100 bg-warm-50">
          <div className="container mx-auto px-4 text-center">
            <p className="font-medium text-lg">Brechó Benvinda Poesia e Cia.</p>
            <p className="text-text-secondary mt-2">Moda Cíclica & Afeto</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
