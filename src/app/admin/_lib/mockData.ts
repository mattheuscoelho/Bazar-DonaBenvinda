import { AdminItem } from "../_types";

export const adminMockItems: AdminItem[] = [
  { id: "1", title: "Camisa Floral", category: "Roupas", segment: "Feminino", size: "M", condition: "Usado - Bom", status: "available" },
  { id: "2", title: "Calça Jeans Vintage", category: "Roupas", segment: "Unissex", size: "40", condition: "Perfeito", status: "available" },
  { id: "3", title: "Jaqueta de Couro", category: "Roupas", segment: "Masculino", size: "G", condition: "Usado - Marcas de uso", status: "unavailable" },
];

export async function getAdminItems(): Promise<AdminItem[]> {
  // Simula delay de rede para testar loading states futuramente
  return new Promise((resolve) => {
    setTimeout(() => resolve(adminMockItems), 500);
  });
}

export async function getAdminItem(id: string): Promise<AdminItem | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(adminMockItems.find((i) => i.id === id)), 300);
  });
}
