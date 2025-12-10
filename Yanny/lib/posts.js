import { supabase } from "./supabaseClient";

export async function getAllPosts() {
  try {
    const { data, error } = await supabase
      .from("videos")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("getAllPosts error:", error);
      return [];
    }
    return data || [];
  } catch (err) {
    console.error("getAllPosts exception:", err);
    return [];
  }
}

export async function getLatestPosts(limit = 7) {
  try {
    const { data, error } = await supabase
      .from("videos")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      console.error("getLatestPosts error:", error);
      return [];
    }
    return data || [];
  } catch (err) {
    console.error("getLatestPosts exception:", err);
    return [];
  }
}