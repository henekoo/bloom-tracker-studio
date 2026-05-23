
ALTER FUNCTION public.set_updated_at() SET search_path = public;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.set_updated_at() FROM PUBLIC, anon, authenticated;

DROP POLICY IF EXISTS "obs_images_public_read" ON storage.objects;
CREATE POLICY "obs_images_read_own_or_public_object" ON storage.objects FOR SELECT
  USING (bucket_id = 'observations' AND (auth.role() = 'anon' OR auth.uid()::text = (storage.foldername(name))[1] OR auth.role() = 'authenticated'));
