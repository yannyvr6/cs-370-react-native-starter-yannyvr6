import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabaseClient";

/**
 * Hook to fetch videos created by a specific user
 * @param {string} userId - The ID of the logged-in user
 */
export function useUserPosts(userId) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = useCallback(async () => {
    if (!userId) return;

    setLoading(true);

    const { data, error } = await supabase
      .from("videos")
      .select("id, title, url, creator") 
      .eq("creator_id", userId) // filter by logged-in user
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching user posts:", error);
      setPosts([]);
    } else {
      setPosts(data || []);
    }

    setLoading(false);
  }, [userId]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return { posts, loading, refetch: fetchPosts };
}
