import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";

interface Video {
  id: string;
  title: string;
  url: string;
  thumbnail_url?: string; // added thumbnail
  creator_id?: string;    // optional creator ID
  created_at: string;
}

export function useVideos() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchVideos = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("videos")
      .select("id, title, url, thumbnail_url, creator_id, created_at")
      .order("created_at", { ascending: false });

    if (!error && data) setVideos(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return {
    videos,
    loading,
    refetch: fetchVideos,
  };
}
