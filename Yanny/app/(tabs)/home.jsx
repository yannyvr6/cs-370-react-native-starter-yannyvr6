import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useGlobal } from "../../context/GlobalContext";
import CustomButton from "../../component/customButton";
import { signOut } from "../../lib/supabaseClient";
import { useRouter } from "expo-router";

export default function Home() {
  const { user, setUser, setIsLoggedIn } = useGlobal();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);
    router.replace("/(auth)/sign-in");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Home!</Text>
      <Text style={styles.subtitle}>
        Logged in as: {user?.email}
      </Text>
      <Text style={styles.username}>
        Username: {user?.user_metadata?.username || "N/A"}
      </Text>
      
      <CustomButton title="Sign Out" handlePress={handleSignOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: "center" },
  title: { fontSize: 30, fontWeight: "bold", marginBottom: 12 },
  subtitle: { fontSize: 18, color: "#6B7280", marginBottom: 8 },
  username: { fontSize: 16, color: "#6B7280", marginBottom: 24 },
});