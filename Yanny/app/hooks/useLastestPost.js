import { useState, useEffect, useCallback } from "react";
import { getLatestPosts } from "../../lib/posts";

export function useLatestPosts(limit = 7) {
  const [latestVideos, setLatestVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLatest = useCallback(async () => {
    setLoading(true);
    const data = await getLatestPosts(limit);
    setLatestVideos(data || []);
    setLoading(false);
  }, [limit]);

  useEffect(() => {
    fetchLatest();
  }, [fetchLatest]);

  return { latestVideos, loading, refetch: fetchLatest };
}