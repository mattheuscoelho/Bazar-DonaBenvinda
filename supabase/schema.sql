-- Tabela de itens do catálogo
CREATE TABLE items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    category TEXT NOT NULL,         -- camisetas, calças, vestidos, acessórios
    segment TEXT NOT NULL,          -- feminino | masculino | unissex
    size TEXT NOT NULL,             -- P/M/G/numérico/outro
    color TEXT NOT NULL,
    condition TEXT NOT NULL,        -- como_novo | otimo | bom | usado
    description TEXT DEFAULT '',
    measurements JSONB,             -- { "busto": 92, "cintura": 78, "comprimento": 65 }
    price_cents INTEGER,            -- opcional no MVP
    status TEXT NOT NULL DEFAULT 'available', -- available | unavailable
    photos JSONB NOT NULL DEFAULT '[]'::jsonb, -- array de URLs
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Índices para performance
CREATE INDEX idx_items_category_status ON items(category, status) WHERE status = 'available';
CREATE INDEX idx_items_created_at ON items(created_at DESC);
