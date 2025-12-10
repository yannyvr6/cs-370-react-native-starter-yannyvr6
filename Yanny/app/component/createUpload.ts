import { supabase } from "../../lib/supabaseClient";

/**
 * Upload a file (video or image) to Supabase storage
 * @param file - file object from DocumentPicker
 * @param folder - "videos" or "thumbnails"
 * @returns public URL of uploaded file
 */
export async function uploadFile(file: any, folder: string) {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `${folder}/${fileName}`;

  const { error } = await supabase.storage
    .from(folder)
    .upload(filePath, await fetch(file.uri).then((r) => r.blob()));

  if (error) throw error;

  // Generate public URL
  const { data: { publicUrl } } = supabase.storage.from(folder).getPublicUrl(filePath);
  return publicUrl;
}

/**
 * Upload video and thumbnail, then insert metadata into videos table
 * @param params
 *  - title: string
 *  - videoFile: DocumentPicker result
 *  - thumbnailFile: DocumentPicker result
 *  - aiPrompt: string
 *  - creatorId: string
 */
export async function createVideo({ title, videoFile, thumbnailFile, aiPrompt, creatorId }: any) {
  try {
    // Upload video and thumbnail simultaneously
    const [videoUrl, thumbnailUrl] = await Promise.all([
      uploadFile(videoFile, "videos"),
      uploadFile(thumbnailFile, "thumbnails"),
    ]);

    // Insert metadata into Supabase videos table
    const { error } = await supabase.from("videos").insert([
      {
        title,
        url: videoUrl,
        thumbnail_url: thumbnailUrl,
        ai_prompt: aiPrompt,
        creator_id: creatorId,
      },
    ]);

    if (error) throw error;

    return { success: true };
  } catch (error: any) {
    console.error("Error creating video:", error);
    return { success: false, error: error.message };
  }
}
