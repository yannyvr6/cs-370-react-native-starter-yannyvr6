import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

interface Video {
  title: string;
  thumbnail: string | number;
  creator: {
    username: string;
    avatar: string | number;
  };
}

export default function VideoCard({ video }: { video: Video }) {
  // Handle both local images (require) and remote URLs
  const avatarSource = typeof video.creator.avatar === 'number' 
    ? video.creator.avatar 
    : { uri: video.creator.avatar };

  const thumbnailSource = typeof video.thumbnail === 'number'
    ? video.thumbnail
    : { uri: video.thumbnail };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Image
            source={avatarSource}
            style={styles.avatar}
            resizeMode="cover"
          />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.title} numberOfLines={1}>
            {video.title}
          </Text>
          <Text style={styles.creator}>{video.creator.username}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.thumbnailContainer}>
        <Image
          source={thumbnailSource}
          style={styles.thumbnail}
          resizeMode="cover"
        />
        <View style={styles.playButton}>
          <Text style={styles.playIcon}>▶</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  avatarContainer: {
    marginRight: 12,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#FF9C01",
  },
  headerText: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  creator: {
    color: "#CDCDE0",
    fontSize: 12,
  },
  thumbnailContainer: {
    width: "100%",
    height: 200,
    borderRadius: 16,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: "#1E1E2D",
  },
  thumbnail: {
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