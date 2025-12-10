import { View, Text, Image, StyleSheet } from "react-native";

export default function EmptyState({ message = "No items found" }) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/empty.png")}
        style={styles.image}
      />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  image: { width: 150, height: 150, marginBottom: 20 },
  text: { fontSize: 16, color: "#666", textAlign: "center" },
});
