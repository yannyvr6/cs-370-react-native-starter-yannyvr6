import { SafeAreaView, FlatList, View, Text, RefreshControl } from "react-native";
import { useState, useEffect } from "react";
import SearchInput from "../component/SearchInput";
import Trending from "../component/Trending";
import EmptyState from "../component/EmptyState";

interface Video {
  id: string;
  title: string;
}

export default function HomeScreen() {
  const [videos, setVideos] = useState<Video[]>([
    { id: "0568aa70-db41-4b88-a672-1bcaf25384c7", title: "Amanda" },
    { id: "a59ac202-b1df-427d-b945-9b84446dfec7", title: "Dad" },
    { id: "cd116fb0-5584-4df3-914d-43a7334e5217", title: "Me" },
  ]);
  const [refreshing, setRefreshing] = useState(false);

  // Simulate fetching new data
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      // You could fetch from Supabase here instead
      setVideos(videos); 
      setRefreshing(false);
    }, 1000);
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <FlatList
        data={videos}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <View className="bg-white h-40 rounded-xl mx-4 mb-4 justify-center items-center">
            <Text className="text-black font-semibold">{item.title}</Text>
          </View>
        )}
        ListHeaderComponent={() => (
          <View className="px-4 pt-10 pb-6">
            {/* Welcome Section */}
            <Text className="text-4xl font-bold text-text mb-2">
              Welcome back, Yanny 👋
            </Text>
            <Text className="text-lg text-gray-500 mb-4">
              Check out the latest content!
            </Text>

            {/* Search Bar */}
            <SearchInput />

            {/* Trending Section */}
            <Text className="text-2xl font-semibold text-text mt-8 mb-3">
              Trending Videos
            </Text>

            {videos.length > 0 ? (
              <Trending posts={videos} />
            ) : (
              <EmptyState />
            )}
          </View>
        )}
        ListEmptyComponent={<EmptyState />}
      />
    </SafeAreaView>
  );
}
