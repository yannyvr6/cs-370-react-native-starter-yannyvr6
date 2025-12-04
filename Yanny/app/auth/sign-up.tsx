import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import CustomButton from "../component/customButton";
import { useRouter } from "expo-router";
import { useGlobal } from "../../context/GlobalContext";
import { createUser } from "../../lib/supabaseClient";

export default function SignUp() {
  const router = useRouter();
  const { setUser, setIsLoggedIn } = useGlobal();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    // Validate input
    if (!email || !password || !username) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    // Basic password validation
    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);

    try {
      const result = await createUser(email, password, username);

      if (result.success) {
        Alert.alert(
          "Success", 
          "Account created successfully!",
          [
            {
              text: "OK",
              onPress: () => {
                setUser(result.user);
                setIsLoggedIn(true);
                // Navigation will be handled automatically by GlobalContext
              }
            }
          ]
        );
      } else {
        Alert.alert("Sign Up Failed", result.error);
      }
    } catch (error) {
      Alert.alert("Error", "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <TextInput
        placeholder="Username"
        placeholderTextColor="#7B7B8B"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        editable={!isLoading}
      />

      <TextInput
        placeholder="Email"
        placeholderTextColor="#7B7B8B"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!isLoading}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#7B7B8B"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        editable={!isLoading}
      />

      <CustomButton 
        title="Sign Up" 
        handlePress={handleSignUp}
        isLoading={isLoading}
      />

      <Text style={styles.linkText}>
        Already have an account?{" "}
        <Text
          style={styles.link}
          onPress={() => router.push("./auth/sign-in")}
        >
          Sign In
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