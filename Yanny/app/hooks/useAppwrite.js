import { supabase } from "../lib/supabaseClient";

export async function getAllVideos() {
  const { data, error } = await supabase
    .from("videos")
    .select("id, title, description, url, creator")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching videos:", error);
    return [];
  }
  return data;
}
