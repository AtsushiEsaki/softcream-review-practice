create extension if not exists "pgcrypto";

create table public.profiles (
  id uuid primary key default gen_random_uuid(),
  nickname text not null check (char_length(trim(nickname)) between 1 and 30),
  created_at timestamptz not null default now()
);

create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  shop_name text not null check (char_length(trim(shop_name)) between 1 and 100),
  softcream_type text not null check (char_length(trim(softcream_type)) between 1 and 100),
  price integer not null check (price >= 0),
  eaten_on date not null check (eaten_on <= current_date),
  milk_richness smallint not null check (milk_richness between 1 and 5),
  smoothness smallint not null check (smoothness between 1 and 5),
  sweetness_balance smallint not null check (sweetness_balance between 1 and 5),
  value_volume smallint not null check (value_volume between 1 and 5),
  uniqueness smallint not null check (uniqueness between 1 and 5),
  overall_satisfaction smallint not null check (overall_satisfaction between 1 and 5),
  created_at timestamptz not null default now()
);

create index reviews_shop_name_idx on public.reviews (shop_name);
create index reviews_created_at_idx on public.reviews (created_at desc);

alter table public.profiles enable row level security;
alter table public.reviews enable row level security;

create policy "Anyone can read profiles"
on public.profiles for select
using (true);

create policy "Anyone can create profiles"
on public.profiles for insert
with check (true);

create policy "Anyone can read reviews"
on public.reviews for select
using (true);

create policy "Anyone can create reviews"
on public.reviews for insert
with check (
  milk_richness between 1 and 5
  and smoothness between 1 and 5
  and sweetness_balance between 1 and 5
  and value_volume between 1 and 5
  and uniqueness between 1 and 5
  and overall_satisfaction between 1 and 5
);