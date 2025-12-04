import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Pressable,
  ListRenderItem,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobal } from "../../context/GlobalContext";
import { signOut } from "../../lib/supabaseClient";
import { useRouter } from "expo-router";

import SearchInput from "../component/SearchInput";
import Trending from "../component/Trending";
import VideoCard from "../component/VideoCard";
import EmptyState from "../component/EmptyState";
import { icons, images } from "../../constants";

// ---------- Types ----------
interface Creator {
  username: string;
  avatar: any;
}

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  creator: Creator;
}

interface TrendingVideo {
  id: string;
  title: string;
  thumbnail: string;
}

// ---------- Mock Data ----------
const MOCK_VIDEOS: Video[] = [
  {
    id: "1",
    title: "Introduction to React Native",
    thumbnail: "https://via.placeholder.com/300x200/FF9C01/ffffff?text=Video+1",
    creator: {
      username: "John Doe",
      avatar: icons.profile,
    },
  },
  {
    id: "2",
    title: "Building Mobile Apps with Expo",
    thumbnail: "https://via.placeholder.com/300x200/2563EB/ffffff?text=Video+2",
    creator: {
      username: "Jane Smith",
      avatar: icons.profile,
    },
  },
  {
    id: "3",
    title: "Mastering FlatList Component",
    thumbnail: "https://via.placeholder.com/300x200/10B981/ffffff?text=Video+3",
    creator: {
      username: "Mike Johnson",
      avatar: icons.profile,
    },
  },
];

const TRENDING_VIDEOS: TrendingVideo[] = [
  {
    id: "t1",
    title: "Trending Video 1",
    thumbnail: "https://via.placeholder.com/200x280/FF9C01/ffffff?text=Trending+1",
  },
  {
    id: "t2",
    title: "Trending Video 2",
    thumbnail: "https://via.placeholder.com/200x280/2563EB/ffffff?text=Trending+2",
  },
  {
    id: "t3",
    title: "Trending Video 3",
    thumbnail: "https://via.placeholder.com/200x280/10B981/ffffff?text=Trending+3",
  },
];

// ---------- Component ----------
export default function Home() {
  const { user, setUser, setIsLoggedIn } = useGlobal();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      setUser(null);
      setIsLoggedIn(false);
      router.push("./auth/sign-in");
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const username: string =
    user?.user_metadata?.username ?? user?.email ?? "Guest";

  const renderVideo: ListRenderItem<Video> = ({ item }) => (
    <VideoCard video={item} />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={MOCK_VIDEOS}
        keyExtractor={(item) => item.id}
        renderItem={renderVideo}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            {/* -------- Header Section -------- */}
            <View style={styles.welcomeContainer}>
              <View style={styles.welcomeSection}>
                <View>
                  <Text style={styles.welcomeText}>Welcome Back 👋</Text>
                  <Text style={styles.username}>{username}</Text>
                  <Text style={styles.appName}>
                    Yanny's App with Expo Router
                  </Text>
                </View>

                <View style={styles.logoContainer}>
                  <Image
                    source={images.icon}
                    style={styles.logo}
                    resizeMode="contain"
                  />
                </View>
              </View>

              {/* Buttons */}
              <View style={styles.buttonContainer}>
                <Pressable
                  style={styles.profileButton}
                  onPress={() => router.push("./profile")}
                >
                  <Text style={styles.profileButtonText}>Go to Profile</Text>
                </Pressable>

                <Pressable style={styles.signOutButton} onPress={handleSignOut}>
                  <Text style={styles.signOutButtonText}>Sign Out</Text>
                </Pressable>
              </View>

              <View style={styles.infoBox}>
                <Text style={styles.infoText}>
                  Using NativeWind + Tailwind CSS for styling
                </Text>
              </View>
            </View>

            {/* Search Bar */}
            <SearchInput initialQuery="" />

            {/* Trending */}
            <View style={styles.trendingSection}>
              <Text style={styles.sectionTitle}>Trending Videos</Text>
              <Trending posts={TRENDING_VIDEOS} />
            </View>

            <Text style={styles.latestTitle}>Latest Videos</Text>
          </View>
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#FF9C01"
            colors={["#FF9C01"]}
          />
        }
        ListEmptyComponent={() => <EmptyState />}
      />
    </SafeAreaView>
  );
}

// ---------- Styles ----------
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#161622" },
  header: { marginBottom: 24 },
  welcomeContainer: { paddingHorizontal: 16, paddingTop: 24, paddingBottom: 16 },
  welcomeSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    color: "#FFFFFF",
    fontWeight: "bold",
    marginBottom: 4,
  },
  username: {
    fontSize: 18,
    color: "#FF9C01",
    fontWeight: "600",
    marginTop: 4,
  },
  appName: { fontSize: 14, color: "#CDCDE0", marginTop: 8 },
  logoContainer: { marginTop: 6 },
  logo: { width: 50, height: 50 },
  buttonContainer: { flexDirection: "row", marginBottom: 16 },
  profileButton: {
    flex: 1,
    backgroundColor: "#2563EB",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginRight: 12,
  },
  profileButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "600" },
  signOutButton: {
    flex: 1,
    backgroundColor: "#DC2626",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  signOutButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "600" },
  infoBox: { backgroundColor: "#1E3A8A", padding: 16, borderRadius: 8 },
  infoText: { color: "#CDCDE0", fontSize: 12, textAlign: "center" },
  trendingSection: { marginTop: 20 },
  sectionTitle: {
    fontSize: 18,
    color: "#CDCDE0",
    fontWeight: "600",
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  latestTitle: {
    fontSize: 18,
    color: "#CDCDE0",
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 12,
    paddingHorizontal: 16,
  },
});
