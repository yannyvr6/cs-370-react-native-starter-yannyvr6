import React, { useRef, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Image } from "react-native";
import { Video, AVPlaybackStatus, ResizeMode } from "expo-av";
import { Ionicons } from "@expo/vector-icons";

interface VideoType {
  id?: string;
  title?: string;
  creator?: string;
  url?: string;
  thumbnail_url?: string; // add thumbnail
}

export default function VideoCard({ video = {}, compact = false }: { video?: VideoType; compact?: boolean }) {
  const videoRef = useRef<Video>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.unloadAsync?.();
      }
    };
  }, []);

  const onPressPlay = async () => {
    setIsPlaying(true);
    setLoading(true);
    try {
      if (videoRef.current) {
        await videoRef.current.playAsync();
      }
    } catch (err) {
      console.error("Video play error:", err);
    }
    setLoading(false);
  };

  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded && status.didJustFinish) {
      setIsPlaying(false);
    }
  };

  const containerStyle = compact ? styles.compactContainer : styles.container;
  const videoStyle = compact ? styles.compactVideo : styles.video;

  return (
    <View style={containerStyle}>
      {!isPlaying ? (
        <TouchableOpacity activeOpacity={0.8} onPress={onPressPlay} style={videoStyle}>
          {video.thumbnail_url ? (
            <Image source={{ uri: video.thumbnail_url }} style={videoStyle} />
          ) : (
            <View style={styles.placeholder}>
              <Ionicons name="play-circle" size={48} color="#fff" />
            </View>
          )}
          <View style={styles.overlay}>
            <Text style={styles.title} numberOfLines={1}>{video.title ?? "Untitled Video"}</Text>
            {video.creator && <Text style={styles.creator}>By {video.creator}</Text>}
          </View>
        </TouchableOpacity>
      ) : (
        <Video
          ref={videoRef}
          source={{ uri: video.url ?? "" }}
          style={videoStyle}
          resizeMode={ResizeMode.COVER}
          shouldPlay
          useNativeControls
          onPlaybackStatusUpdate={onPlaybackStatusUpdate}
          isLooping={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 20, borderRadius: 12, overflow: "hidden", backgroundColor: "#000" },
  compactContainer: { borderRadius: 12, overflow: "hidden", backgroundColor: "#000" },
  video: { width: "100%", height: 260 },
  compactVideo: { width: "100%", height: 180 },
  placeholder: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
  },
  overlay: {
    position: "absolute",
    bottom: 12,
    left: 12,
    right: 12,
  },
  title: { fontWeight: "700", color: "#fff", fontSize: 16 },
  creator: { marginTop: 4, color: "#ccc", fontSize: 13 },
});
