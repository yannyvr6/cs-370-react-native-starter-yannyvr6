import { useState, useEffect, useCallback } from "react";
import { getAllPosts } from "../../lib/posts";

export function useVideos() {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchVideos = useCallback(async () => {
    setLoading(true);
    const data = await getAllPosts();
    setVideos(data || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  return { videos, loading, refetch: fetchVideos };
}