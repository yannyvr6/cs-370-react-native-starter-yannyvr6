import React, { useState } from "react";
import { SafeAreaView, FlatList, View, Text, RefreshControl } from "react-native";
import SearchInput from "../component/SearchInput";
import Trending from "../component/Trending";
import EmptyState from "../component/EmptyState";
import VideoCard from "../component/VideoCard";
import { useVideos } from "../component/useVideos";

export default function Home() {
  const { videos, loading, refetch } = useVideos();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <FlatList
        data={videos}
        keyExtractor={(item) => item.id}
        refreshControl={<RefreshControl refreshing={refreshing || loading} onRefresh={onRefresh} />}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="px-4 pt-10 pb-6">
            <Text className="text-4xl font-bold text-text mb-2">Welcome back, Yanny 👋</Text>
            <Text className="text-lg text-gray-500 mb-4">Check out the latest content!</Text>

            {/* Search Bar */}
            <SearchInput />

            {/* Trending Section */}
            <Text className="text-2xl font-semibold text-text mt-8 mb-3">Trending Videos</Text>
            {videos.length > 0 ? <Trending posts={videos} /> : <EmptyState />}
          </View>
        )}
        ListEmptyComponent={<EmptyState />}
      />
    </SafeAreaView>
  );
}
