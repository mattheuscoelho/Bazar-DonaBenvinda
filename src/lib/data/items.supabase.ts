// src/lib/data/items.supabase.ts
import { createServerClient } from "../supabase/server";

export async function listSupabaseAvailableItems() {
  const supabase = await createServerClient();

  const { data, error } = await supabase
    .from("items")
    .select("*")
    .eq("status", "available")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}
