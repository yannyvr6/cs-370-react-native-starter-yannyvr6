import { View, TextInput, Image, TouchableOpacity } from "react-native";
import { useState } from "react";

export default function SearchInput() {
  const [query, setQuery] = useState("");

  return (
    <View className="bg-neutral-800 rounded-xl flex-row items-center px-4 py-3 mt-4">
      <TextInput
        placeholder="Search for a video topic"
        placeholderTextColor="#aaa"
        className="flex-1 text-white"
        value={query}
        onChangeText={setQuery}
      />

      <TouchableOpacity onPress={() => console.log("Search clicked!")}>
        <Image
          source={require("../../assets/images/search.png")}
          className="w-5 h-5 ml-2"
        />
      </TouchableOpacity>
    </View>
  );
}
