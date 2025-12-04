import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import CustomButton from "../component/customButton";
import { useRouter } from "expo-router";
import { useGlobal } from "../../context/GlobalContext";
import { signIn } from "../../lib/supabaseClient";

export default function SignIn() {
  const router = useRouter();
  const { setUser, setIsLoggedIn } = useGlobal();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    // Validate input
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setIsLoading(true);

    try {
      const result = await signIn(email, password);

      if (result.success) {
        setUser(result.user);
        setIsLoggedIn(true);
        // Navigation will be handled automatically by GlobalContext
      } else {
        Alert.alert("Login Failed", result.error || "Invalid credentials");
      }
    } catch (error) {
      Alert.alert("Error", "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!isLoading}
      />

      <TextInput
        placeholder="Password"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        editable={!isLoading}
      />

      <CustomButton 
        title="Sign In" 
        handlePress={handleLogin}
        isLoading={isLoading}
      />

      <Text style={styles.linkText}>
        Don't have an account?{" "}
        <Text
          style={styles.link}
          onPress={() => router.push("./auth/sign-up")}
        >
          Sign Up
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: "center", backgroundColor: "#161622" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 24, color: "#FFFFFF" },
  input: {
    borderWidth: 1,
    borderColor: "#232533",
    backgroundColor: "#1E1E2D",
    color: "#FFFFFF",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  linkText: {
    marginTop: 16,
    textAlign: "center",
    color: "#CDCDE0",
  },
  link: {
    color: "#FF9C01",
    fontWeight: "600",
  },
});