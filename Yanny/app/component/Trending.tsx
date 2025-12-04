import React from "react";
import { FlatList, View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";

interface TrendingPost {
  id: string;
  thumbnail: string;
}

const TrendingItem = ({ item }: { item: TrendingPost }) => {
  return (
    <TouchableOpacity style={styles.trendingItem}>
      <Image
        source={{ uri: item.thumbnail }}
        style={styles.trendingImage}
        resizeMode="cover"
      />
      <View style={styles.playButton}>
        <Text style={styles.playIcon}>▶</Text>
      </View>
    </TouchableOpacity>
  );
};

export default function Trending({ posts }: { posts: TrendingPost[] }) {
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <TrendingItem item={item} />}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    gap: 20,
  },
  trendingItem: {
    width: 200,
    height: 280,
    borderRadius: 16,
    overflow: "hidden",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1E1E2D",
  },
  trendingImage: {
    width: "100%",
    height: "100%",
  },
  playButton: {
    position: "absolute",
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  playIcon: {
    color: "#FFFFFF",
    fontSize: 20,
    marginLeft: 4,
  },
});