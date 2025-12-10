import { useState, useEffect, useCallback } from "react";
import { supabase } from "../../lib/supabaseClient";

export function useLatestPosts(limit = 7) {
  const [latestVideos, setLatestVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLatest = useCallback(async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("videos")
      .select("id, title, url, thumbnail_url, creator_id, created_at")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (!error && data) setLatestVideos(data);
    else setLatestVideos([]);

    setLoading(false);
  }, [limit]);

  useEffect(() => {
    fetchLatest();
  }, [fetchLatest]);

  return { latestVideos, loading, refetch: fetchLatest };
}
