-- MercadoLista - Schema Supabase
-- Execute este SQL no SQL Editor do seu projeto Supabase

-- Tabela principal de itens
create table if not exists public.itens (
  id          uuid default gen_random_uuid() primary key,
  nome        text not null check (length(trim(nome)) > 0),
  quantidade  numeric not null default 1 check (quantidade > 0),
  unidade     text not null default 'un',
  categoria   text not null default 'outros',
  concluido   boolean not null default false,
  created_at  timestamptz default now() not null
);

-- Índices para performance
create index if not exists idx_itens_categoria on public.itens(categoria);
create index if not exists idx_itens_concluido on public.itens(concluido);
create index if not exists idx_itens_created_at on public.itens(created_at desc);

-- Habilitar Row Level Security (RLS)
alter table public.itens enable row level security;

-- Política: permitir acesso público (ajuste conforme necessidade de autenticação)
-- Para uso pessoal sem auth:
create policy "Acesso publico aos itens"
  on public.itens
  for all
  using (true)
  with check (true);

-- Habilitar realtime (opcional - para sync em tempo real)
alter publication supabase_realtime add table public.itens;
