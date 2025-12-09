import { View, Text, FlatList, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "../component/SearchInput"; // matches your folder

export default function HomeScreen() {
  const videos = [
    { id: "0568aa70-db41-4b88-a672-1bcaf25384c7", title: "Amanda" },
    { id: "a59ac202-b1df-427d-b945-9b84446dfec7", title: "Dad" },
    { id: "cd116fb0-5584-4df3-914d-43a7334e5217", title: "Me" },
  ];

  return (
    <SafeAreaView className="flex-1 bg-background">
      <FlatList
        data={videos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="bg-white h-40 rounded-xl mx-4 mb-4 justify-center items-center">
            <Text className="text-black font-semibold">{item.title}</Text>
          </View>
        )}
        ListHeaderComponent={() => (
          <View className="px-4 pt-10 pb-6">
            {/* Welcome Section */}
            <Text className="text-4xl font-bold text-text mb-2">
              Welcome back, Yanny 👋
            </Text>
            <Text className="text-lg text-gray-500">
              Check out the latest content!
            </Text>

            {/* Logo */}
            <Image
              source={require("../assets/logo.png")}
              className="w-16 h-16 mt-6 mb-4"
            />

            {/* Search Bar */}
            <SearchInput />

            {/* Latest Videos Label */}
            <Text className="text-2xl font-semibold text-text mt-8 mb-3">
              Latest Videos
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}