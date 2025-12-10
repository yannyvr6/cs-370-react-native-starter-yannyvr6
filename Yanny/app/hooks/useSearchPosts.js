import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabaseClient";

export function useSearchPosts(query) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchResults = useCallback(async () => {
    if (!query) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("videos")
        .select("id, title, description, url, creator")
        .ilike("title", `%${query}%`) // search by title, case-insensitive

      if (error) {
        console.error("Search error:", error);
        setResults([]);
      } else {
        setResults(data || []);
      }
    } catch (err) {
      console.error("Search error:", err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    fetchResults();
  }, [fetchResults]);

  return { results, loading, refetch: fetchResults };
}