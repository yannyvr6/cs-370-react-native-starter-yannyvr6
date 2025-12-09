import { useState, useEffect, useCallback } from "react";
import { getAllVideos } from "../hooks/useAppwrite"; 
export function useVideos() {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchVideos = useCallback(async () => {
    setLoading(true);
    const data = await getAllVideos();
    setVideos(data || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  return { videos, loading, refetch: fetchVideos };
}
