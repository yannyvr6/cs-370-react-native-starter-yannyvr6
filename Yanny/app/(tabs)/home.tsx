// app/home.tsx
import React, { useState } from "react";
import { SafeAreaView, FlatList, View, Text, RefreshControl, Modal, TouchableOpacity, StyleSheet, } from "react-native";
import SearchInput from "../component/SearchInput";
import Trending from "../component/Trending";
import EmptyState from "../component/EmptyState";
import VideoCard from "../component/VideoCard";
import { useVideos } from "../component/useVideos";
import { useLatestPosts } from "../hooks/useLastestPost";

interface Video {
  id: string;
  title: string;
  url: string;
  creator?: string;
  thumbnail?: string;
}

export default function Home() {
  const { videos, loading: loadingAll, refetch: refetchAll } = useVideos();
  const { latestVideos, loading: loadingLatest, refetch: refetchLatest } = useLatestPosts(7);

  const [refreshing, setRefreshing] = useState(false);
  const [playingVideo, setPlayingVideo] = useState<Video | null>(null);

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([refetchAll(), refetchLatest()]);
    setRefreshing(false);
  };

  const onPlayVideo = (video: Video) => {
    setPlayingVideo(video);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8FAFC" }}>
      <FlatList
        data={videos}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing || loadingAll} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View style={{ paddingHorizontal: 16, paddingTop: 28, paddingBottom: 12 }}>
            <Text style={{ fontSize: 32, fontWeight: "800", marginBottom: 8 }}>
              Welcome back, Yanny 👋
            </Text>
            <Text style={{ fontSize: 16, color: "#6B7280", marginBottom: 12 }}>
              Check out the latest content!
            </Text>

            {/* Search Bar */}
            <SearchInput />

            {/* Trending Section */}
            <Text style={{ fontSize: 20, fontWeight: "700", marginTop: 20, marginBottom: 8 }}>
              Trending Videos
            </Text>
            {latestVideos.length > 0 ? (
              <Trending posts={latestVideos} onPlayVideo={onPlayVideo} />
            ) : loadingLatest ? (
              <Text>Loading trending...</Text>
            ) : (
              <EmptyState />
            )}
          </View>
        )}
        ListEmptyComponent={<EmptyState />}
      />

      {/* Fullscreen modal to play selected trending video */}
      <Modal
        visible={!!playingVideo}
        animationType="slide"
        onRequestClose={() => setPlayingVideo(null)}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setPlayingVideo(null)} style={styles.closeBtn}>
              <Text style={{ color: "#007AFF", fontSize: 16 }}>Close</Text>
            </TouchableOpacity>
          </View>

          {playingVideo && (
            <View style={{ padding: 16 }}>
              <VideoCard video={playingVideo} />
            </View>
          )}
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  modalHeader: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#E5E7EB",
  },
  closeBtn: { padding: 8 },
});
