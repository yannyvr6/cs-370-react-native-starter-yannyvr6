import React, { useState } from "react";
import { SafeAreaView, ScrollView, View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import CustomButton from "../component/customButton";
import CustomFormField from "../component/CustomFormField";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log("Signed in with", { email, password });
      router.push("/(tabs)/home"); // Navigate to your main app
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={require("../../assets/heroImage.png")} style={styles.logo} />
        <Text style={styles.title}>Sign In</Text>

        <CustomFormField
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
        />
        <CustomFormField
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <CustomButton title="Sign In" handlePress={handleSignIn} isLoading={isLoading} />

        <View style={{ flexDirection: "row", marginTop: 16 }}>
          <Text>Don't have an account? </Text>
          <TouchableOpacity onPress={() => router.push("/auth/SignUp")}>
            <Text style={{ color: "#2563EB", fontWeight: "bold" }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  container: { flexGrow: 1, justifyContent: "center", alignItems: "center", padding: 24 },
  logo: { width: 120, height: 120, marginBottom: 24 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 24 },
});
