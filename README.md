# Bazar DonaBenvinda - Catálogo MVP

Este projeto é um catálogo para o brechó **Bemvinda Poesia e Cia.**

## Como abrir no StackBlitz

Como você não possui Node.js instalado localmente, siga estes passos:

1. Acesse [StackBlitz](https://stackblitz.com/).
2. Clique em **"Import from GitHub"** ou use a integração para arrastar esta pasta para o editor do StackBlitz.
3. Alternativamente, você pode iniciar um projeto Next.js vazio no StackBlitz e copiar estes arquivos para lá.
4. O projeto está configurado para rodar com **dados mockados** por padrão (`USE_MOCK_DATA=true`), então ele funcionará imediatamente.

## Tecnologias
- Next.js 15 (App Router)
- Tailwind CSS (Identidade visual aquarela pastel)
- Supabase (Opcional, com fallback mock)

## Estrutura do Admin
Acesse `/admin` para gerenciar as peças. O sistema foi desenhado para ser extremamente simples e acessível para a Dona Benvinda.

## Backlog de Evoluções
Estes itens estão planejados para versões futuras do catálogo:
- **Integração com WhatsApp:** Botão para reserva direta da peça.
- **Sistema de Trocas:** Cadastro de créditos fictícios para clientes que deixam peças.
- **Login Real:** Implementação completa de e-mail/senha via Supabase Auth (Produção).
- **Storage Real:** Upload direto para o bucket do Supabase.

## Checklist de Validação
- [x] **Funcional:** Home lista novidades corretamente.
- [x] **Funcional:** Clique na categoria exibe apenas itens daquela categoria.
- [x] **Funcional:** Clique no item abre página de detalhes completa.
- [x] **Funcional:** Admin permite navegar pelo Wizard de 3 passos.
- [x] **UX/A11y:** Fontes e botões do Admin são grandes (mínimo 18px-20px).
- [x] **UX/A11y:** Navegação por teclado funcional em todo o catálogo.
- [x] **Performance:** Uso de `next/image` para carregamento otimizado.
- [x] **SEO:** Meta tags de título e descrição configuradas por página.
