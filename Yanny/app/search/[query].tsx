import React from "react";
import { View, Text, FlatList, SafeAreaView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useSearchPosts } from "../hooks/useSearchPosts";
import VideoCard from "../component/VideoCard";
import SearchInput from "../component/SearchInput";
import EmptyState from "../component/EmptyState";

export default function SearchPage() {
  const { query } = useLocalSearchParams();
  const queryString = typeof query === "string" ? query : query?.[0] || "";
  const { results, loading }: { results: Array<{ id: string; title: string; url: string; creator: string }>; loading: boolean } = useSearchPosts(queryString);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8FAFC", padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: "700", marginBottom: 12 }}>
        Search Results for: {query}
      </Text>
      {/* Search Input prefilled with previous query */}
      <SearchInput initialQuery={queryString} />

      {loading ? (
        <Text style={{ marginTop: 20 }}>Loading...</Text>
      ) : results.length === 0 ? (
        <EmptyState message={`No videos found for "${query}"`} />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <VideoCard
              video={{
                id: item.id,
                title: item.title,
                url: item.url,
                creator: item.creator,
              }}
            />
          )}
          contentContainerStyle={{ paddingTop: 12 }}
        />
      )}
    </SafeAreaView>
  );
}
