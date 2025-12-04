import React, { useState } from "react";
import {
  FlatList,
  RefreshControl,
  Text,
  View,
  StyleSheet,
} from "react-native";
import EmptyState from "./EmptyState"; // this must exist

export default function Trending({ posts }) {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000); // simulate refresh
  };

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.itemBox}>
          <Text style={styles.text}>{item.id}</Text>
        </View>
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
      ListEmptyComponent={<EmptyState />}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  itemBox: {
    width: 120,
    height: 120,
    backgroundColor: "#333",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  text: {
    color: "#fff",
    fontSize: 18,
  },
});
