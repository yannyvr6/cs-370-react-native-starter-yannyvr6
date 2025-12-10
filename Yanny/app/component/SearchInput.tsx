import { View, TextInput, Image, TouchableOpacity, Alert } from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";

export default function SearchInput({ initialQuery = "" }) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();

  // Update local state if initialQuery changes (when navigating back)
  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const onSearch = () => {
    if (!query.trim()) {
      Alert.alert("Please enter a search term");
      return;
    }
    router.push(`/search/${encodeURIComponent(query.trim())}`);
  };

  return (
    <View className="bg-neutral-800 rounded-xl flex-row items-center px-4 py-3 mt-4">
      <TextInput
        placeholder="Search for a video topic"
        placeholderTextColor="#aaa"
        className="flex-1 text-white"
        value={query}
        onChangeText={setQuery}
      />
      <TouchableOpacity onPress={onSearch}>
        <Image
          source={require("../../assets/images/search.png")}
          className="w-5 h-5 ml-2"
        />
      </TouchableOpacity>
    </View>
  );
}
