import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Video, ResizeMode } from "expo-av";

interface VideoCardProps {
  video: {
    id: string;
    title: string;
    url: string;
    creator: string;
  };
}

export default function VideoCard({ video }: VideoCardProps) {
  const videoRef = useRef<Video>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = async () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      await videoRef.current.pauseAsync();
    } else {
      await videoRef.current.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={togglePlay} activeOpacity={0.9}>
        <Video
          ref={videoRef}
          source={{ uri: video.url }}
          style={styles.video}
          resizeMode={ResizeMode.COVER}
          isLooping
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{video.title}</Text>
          <Text style={styles.creator}>By {video.creator}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: 20, borderRadius: 12, overflow: "hidden" },
  video: { width: "100%", height: 200, backgroundColor: "#000" },
  textContainer: { padding: 8, backgroundColor: "#fff" },
  title: { fontSize: 16, fontWeight: "bold" },
  creator: { fontSize: 14, color: "#666" },
});
