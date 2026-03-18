import mockItems from './mock.json';
import { createServerClient } from '../supabase/server';

export interface Item {
  id: string;
  title: string;
  category: string;
  segment: string;
  size: string;
  color: string;
  condition: string;
  description: string;
  measurements?: Record<string, any>;
  price_cents: number | null;
  status: 'available' | 'unavailable';
  photos: string[];
  created_at: string;
}

const USE_MOCK = process.env.USE_MOCK_DATA === 'true';

export async function listAvailableItems(): Promise<Item[]> {
  if (USE_MOCK) {
    return (mockItems as Item[]).filter(i => i.status === 'available');
  }

  const supabase = createServerClient();
  const { data, error } = await supabase
    .from('items')
    .select('*')
    .eq('status', 'available')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Item[];
}

export async function getItemById(id: string): Promise<Item | null> {
  if (USE_MOCK) {
    return (mockItems as Item[]).find(i => i.id === id) || null;
  }

  const supabase = createServerClient();
  const { data, error } = await supabase
    .from('items')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return null;
  return data as Item;
}

export async function listByCategory(category: string): Promise<Item[]> {
  if (USE_MOCK) {
    return (mockItems as Item[]).filter(i => i.category === category && i.status === 'available');
  }

  const supabase = createServerClient();
  const { data, error } = await supabase
    .from('items')
    .select('*')
    .eq('category', category)
    .eq('status', 'available')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Item[];
}

// Admin functions (Simplified for MVP, would use real auth in production)
export async function adminListAll(): Promise<Item[]> {
  if (USE_MOCK) {
    return mockItems as Item[];
  }

  const supabase = createServerClient();
  const { data, error } = await supabase
    .from('items')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Item[];
}
