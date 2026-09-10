alter table public.reviews
add column if not exists image_url text;

insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
values (
  'review-images',
  'review-images',
  true,
  2097152,
  array[
    'image/jpeg',
    'image/png',
    'image/webp'
  ]
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists
  "Anyone can upload review images"
on storage.objects;

create policy
  "Anyone can upload review images"
on storage.objects
for insert
to anon, authenticated
with check (
  bucket_id = 'review-images'
);