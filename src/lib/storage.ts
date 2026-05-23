import { supabase } from "@/integrations/supabase/client";

export async function uploadObservationImages(userId: string, files: File[]): Promise<string[]> {
  const urls: string[] = [];
  for (const file of files) {
    const ext = file.name.split(".").pop() || "jpg";
    const path = `${userId}/${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from("observations").upload(path, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type,
    });
    if (error) throw error;
    const { data } = supabase.storage.from("observations").getPublicUrl(path);
    urls.push(data.publicUrl);
  }
  return urls;
}
