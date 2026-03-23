// src/lib/data/items.ts
import mock from "./mock.json";

export const USE_MOCK =
  (process.env.NEXT_PUBLIC_USE_MOCK_DATA ?? process.env.USE_MOCK_DATA ?? "true") === "true";

// Tipos básicos (ajuste conforme seu projeto)
export type Item = {
  id: string;
  title: string;
  category: string;
  segment: string;
  size: string;
  color: string;
  condition: string;
  description?: string;
  status: "available" | "unavailable";
  photos: string[];
  created_at?: string;
};

async function listMockAvailableItems(): Promise<Item[]> {
  // aqui depende do formato do seu mock.json
  const items = (mock as any).items ?? mock;
  return items.filter((i: Item) => i.status === "available");
}

export async function listAvailableItems(): Promise<Item[]> {
  if (USE_MOCK) return listMockAvailableItems();

  // Import dinâmico: só carrega supabase quando realmente precisar
  const { listSupabaseAvailableItems } = await import("./items.supabase");
  return listSupabaseAvailableItems();
}
``