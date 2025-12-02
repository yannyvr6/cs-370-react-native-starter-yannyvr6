import React from "react";
import { SafeAreaView, ScrollView, View, Text, Image, StatusBar, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import CustomButton from "./component/customButton";

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.content}>
          <Image
            source={require('../assets/heroImage.png')}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.headline}>
            Discover Endless Possibilities with Aura
          </Text>
          <Text style={styles.subtitle}>
            Your journey starts here. Explore, learn, and grow with Aura.
          </Text>
          <CustomButton
            title="Get Started"
            handlePress={() => router.push("/sign-in")}
            isLoading={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  scrollContainer: { flexGrow: 1, justifyContent: "center", alignItems: "center", padding: 24 },
  content: { alignItems: "center", width: "100%" },
  image: { width: 288, height: 288, marginBottom: 24 },
  headline: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 8 },
  subtitle: { textAlign: "center", color: "#6B7280", marginBottom: 24 },
});
