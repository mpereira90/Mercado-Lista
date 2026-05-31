# 🛒 MercadoLista

Aplicativo iOS/PWA para gerenciar sua lista de compras do mercado. Desenvolvido em React com integração ao Supabase.

## Funcionalidades

- ✅ Adicionar itens com nome, quantidade, unidade e categoria
- ✅ 10 categorias: Mercearia, Hortifruti, Açougue, Limpeza, Frios, Padaria, Bebidas, Higiene, Congelados e Outros
- ✅ Marcar itens como comprados
- ✅ Remover itens (botão ou swipe no mobile)
- ✅ Filtrar por categoria
- ✅ Busca por nome
- ✅ Barra de progresso da compra
- ✅ Limpar itens concluídos
- ✅ Funciona offline (localStorage como fallback)
- ✅ PWA instalável no iOS

## Stack

- **Frontend**: React 18
- **Backend**: Supabase (PostgreSQL)
- **CI/CD**: GitLab CI + Vercel
- **Hospedagem**: Vercel

## Configuração

### 1. Supabase

1. Crie um projeto em [supabase.com](https://supabase.com)
2. No **SQL Editor**, execute o conteúdo de `supabase-schema.sql`
3. Copie a **URL** e a **anon key** do projeto (Settings → API)

### 2. Variáveis de ambiente

```bash
cp .env.example .env.local
```

Preencha `.env.local`:
```
REACT_APP_SUPABASE_URL=https://xxxx.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGci...
```

### 3. Rodar localmente

```bash
npm install
npm start
```

### 4. Deploy no Vercel

```bash
npm install -g vercel
vercel
```

Adicione as variáveis de ambiente no painel do Vercel:
- `REACT_APP_SUPABASE_URL`
- `REACT_APP_SUPABASE_ANON_KEY`

### 5. GitLab CI/CD

Configure as variáveis no GitLab (Settings → CI/CD → Variables):
- `REACT_APP_SUPABASE_URL`
- `REACT_APP_SUPABASE_ANON_KEY`
- `VERCEL_TOKEN` (gerado em vercel.com/account/tokens)

## Instalar como app no iPhone

1. Abra o site no Safari
2. Toque em **Compartilhar** (ícone de upload)
3. Toque em **"Adicionar à Tela de Início"**
4. Toque em **Adicionar**

## Estrutura do projeto

```
mercadolista/
├── public/
│   ├── index.html          # HTML com meta tags PWA/iOS
│   └── manifest.json       # Manifesto PWA
├── src/
│   ├── components/
│   │   ├── FiltroCategoria.js  # Filtros por categoria
│   │   ├── ItemCard.js         # Card de item com swipe
│   │   └── ModalAdicionar.js   # Modal de adição
│   ├── hooks/
│   │   └── useItens.js         # Lógica Supabase + localStorage
│   ├── lib/
│   │   ├── categorias.js       # Definição das categorias
│   │   └── supabase.js         # Cliente Supabase
│   ├── App.js                  # Componente principal
│   └── App.css                 # Animações globais
├── supabase-schema.sql     # SQL para criar tabela
├── vercel.json             # Config Vercel
├── .gitlab-ci.yml          # Pipeline GitLab
└── .env.example            # Template de variáveis
```
