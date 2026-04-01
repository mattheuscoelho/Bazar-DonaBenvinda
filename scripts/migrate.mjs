import pg from 'pg';
const { Client } = pg;

const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const PROJECT_REF = 'fekmsuiwunznumkftxgb';

// Tenta conexão via pooler com JWT como senha (novo modelo Supabase)
const client = new Client({
  host: `aws-0-sa-east-1.pooler.supabase.com`,
  port: 6543,
  database: 'postgres',
  user: `postgres.${PROJECT_REF}`,
  password: SERVICE_ROLE_KEY,
  ssl: { rejectUnauthorized: false },
});

const SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    segment TEXT NOT NULL,
    size TEXT NOT NULL,
    color TEXT NOT NULL,
    condition TEXT NOT NULL,
    description TEXT DEFAULT '',
    measurements JSONB,
    price_cents INTEGER,
    status TEXT NOT NULL DEFAULT 'available',
    photos JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_items_category_status ON items(category, status) WHERE status = 'available';
CREATE INDEX IF NOT EXISTS idx_items_created_at ON items(created_at DESC);
`;

const RLS_SQL = `
ALTER TABLE items ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'items' AND policyname = 'Public items are viewable by everyone'
  ) THEN
    CREATE POLICY "Public items are viewable by everyone"
    ON items FOR SELECT
    USING (status = 'available');
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'items' AND policyname = 'Admin can do everything'
  ) THEN
    CREATE POLICY "Admin can do everything"
    ON items FOR ALL
    TO authenticated
    USING (auth.jwt() ->> 'email' = 'admin@donabenvinda.com')
    WITH CHECK (auth.jwt() ->> 'email' = 'admin@donabenvinda.com');
  END IF;
END $$;
`;

async function migrate() {
  try {
    console.log('Conectando ao banco...');
    await client.connect();
    console.log('✓ Conectado!\n');

    console.log('Criando tabela items...');
    await client.query(SCHEMA_SQL);
    console.log('✓ Tabela criada!\n');

    console.log('Aplicando RLS...');
    await client.query(RLS_SQL);
    console.log('✓ RLS aplicado!\n');

    console.log('✅ Migração concluída com sucesso!');
  } catch (err) {
    console.error('❌ Erro:', err.message);
  } finally {
    await client.end();
  }
}

migrate();
