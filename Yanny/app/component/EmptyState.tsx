import { View, Text, Image } from "react-native";
import CustomButton from "./customButton";
import { useRouter } from "expo-router";

export default function EmptyState() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center p-6">
      <Image
        source={require("../assets/empty.png")}
        className="w-40 h-40 mb-6"
      />
      <Text className="text-2xl font-bold mb-2">No videos found</Text>
      <Text className="text-gray-500 text-center mb-6">
        Be the first one to upload a video
      </Text>
      <CustomButton
        title="Create Video"
        handlePress={() => router.push("./create-video")}
        isLoading={false}
      />

    </View>
  );
}
