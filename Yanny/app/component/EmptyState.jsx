import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import CustomButton from "./customButton";
import { useRouter } from "expo-router";

export default function EmptyState() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/empty.png")} // change to your actual path
        style={styles.image}
      />

      <Text style={styles.title}>No videos found</Text>
      <Text style={styles.subtitle}>Be the first to upload a video</Text>

      <CustomButton
        title="Create Video"
        handlePress={() => router.push("/create")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 20,
    opacity: 0.8,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 4,
    color: "#fff",
  },
  subtitle: {
    color: "#b3b3b3",
    marginBottom: 16,
  },
});
