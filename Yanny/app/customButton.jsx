import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from "react-native";

export default function CustomButton({ title, handlePress, isLoading }) {
  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[styles.button, isLoading && styles.disabled]}
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
    backgroundColor: "#2563EB", 
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 9999,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  disabled: {
    opacity: 0.7,
  },
  text: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
