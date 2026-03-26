import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key) {
  console.error("Erro: Variáveis NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY não encontradas no .env.local");
  process.exit(1);
}

const supabase = createClient(url, key);

async function createAdmin() {
  console.log("Criando usuário admin@donabenvinda.com...");
  
  // Importante: No Supabase, signUp cadastra o usuário no Auth (auth.users)
  const { data, error } = await supabase.auth.signUp({
    email: 'admin@donabenvinda.com',
    password: 'benvinda2025',
    options: {
      data: {
        role: 'admin'
      }
    }
  });

  if (error) {
    if (error.message.includes('already registered')) {
         console.log("Usuário já existe no banco de dados!");
    } else {
         console.error("Erro ao criar usuário:", error.message);
    }
  } else {
    console.log("Sucesso! Usuário admin criado.");
    console.log("ID do usuário:", data.user?.id);
    console.log("Aviso: Se o 'Confirm Email' estiver ativado no painel do Supabase, você precisará confirmar o e-mail ou desativar a confirmação no Dashboard > Authentication > Providers > Email.");
  }
}

createAdmin();
