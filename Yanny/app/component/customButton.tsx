import React from "react";
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from "react-native";

interface CustomButtonProps {
  title: string;
  handlePress: () => void;
  isLoading: boolean;
}

export default function CustomButton({ title, handlePress, isLoading }: CustomButtonProps) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={handlePress}
      disabled={isLoading}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    padding: 14,
    backgroundColor: "#2563EB",
    borderRadius: 8,
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
