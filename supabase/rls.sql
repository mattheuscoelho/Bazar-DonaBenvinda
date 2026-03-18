-- Ativar RLS
ALTER TABLE items ENABLE ROW LEVEL SECURITY;

-- Política de leitura pública (apenas disponíveis)
CREATE POLICY "Public items are viewable by everyone" 
ON items FOR SELECT 
USING (status = 'available');

-- Políticas de escrita para o admin
-- Nota: Substitua 'seu-email-admin@exemplo.com' pelo valor de ADMIN_EMAIL
CREATE POLICY "Admin can do everything" 
ON items FOR ALL 
TO authenticated
USING (auth.jwt() ->> 'email' = current_setting('app.admin_email', true))
WITH CHECK (auth.jwt() ->> 'email' = current_setting('app.admin_email', true));

-- Configuração do bucket de storage
-- Criar bucket 'items' manualmente no painel do Supabase e definir como público
