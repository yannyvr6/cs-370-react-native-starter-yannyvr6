import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { useGlobal } from "../../context/GlobalContext";
import { useUserPosts } from "../hooks/useUserPosts";
import VideoCard from "../component/VideoCard";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const { user, setUser } = useGlobal();
  const router = useRouter();

  // Fetch videos created by the logged-in user
  const { posts, loading } = useUserPosts(user?.id || "");

  // Handle logout
  const handleLogout = async () => {
    setUser(null); // Clear global user
    router.replace("/(auth)/sign-in" as any); // Navigate to login
  };

  return (
    <View style={styles.container}>
      {/* User Info */}
      <View style={styles.userInfo}>
        <Image
          source={{ uri: user?.avatar_url || "https://foueonivzttceyeshqml.supabase.co/storage/v1/object/public/Pictures/IMG_0290.heic" }}
          style={styles.avatar}
        />
        <Text style={styles.username}>{user?.username || "Anonymous"}</Text>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      {/* User's Videos */}
      <Text style={styles.sectionTitle}>Your Videos</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : posts.length === 0 ? (
        <Text style={styles.noVideos}>You have not uploaded any videos yet.</Text>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item: any) => item.id}
          renderItem={({ item }) => <VideoCard video={item} compact />}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC", padding: 16 },
  userInfo: { alignItems: "center", marginBottom: 20 },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 12 },
  username: { fontSize: 20, fontWeight: "700" },
  logoutBtn: {
    backgroundColor: "#FF3B30",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: "center",
    marginBottom: 20,
  },
  logoutText: { color: "#fff", fontWeight: "600", fontSize: 16 },
  sectionTitle: { fontSize: 18, fontWeight: "700", marginBottom: 12 },
  noVideos: { textAlign: "center", color: "#666", marginTop: 20 },
});
