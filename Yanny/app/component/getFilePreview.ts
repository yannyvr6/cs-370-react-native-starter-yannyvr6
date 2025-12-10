import { supabase } from "../../lib/supabaseClient";

/**
 * Generate public URL for video or thumbnail stored in Supabase
 * @param folder - "videos" or "thumbnails"
 * @param filePath - path of the file in storage
 * @returns public URL
 */
export function getFilePreview(folder: string, filePath: string) {
  const { data: { publicUrl } } = supabase.storage.from(folder).getPublicUrl(filePath);
  return publicUrl;
}
