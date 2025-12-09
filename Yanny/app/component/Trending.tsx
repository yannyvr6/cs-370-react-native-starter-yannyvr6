import { View, Text, FlatList } from "react-native";

interface Video {
  id: string;
  title: string;
}

interface TrendingProps {
  posts: Video[];
}

export default function Trending({ posts }: TrendingProps) {
  return (
    <FlatList
      data={posts}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View className="bg-white h-40 w-60 mr-4 rounded-xl justify-center items-center">
          <Text className="text-black font-semibold">{item.title}</Text>
        </View>
      )}
      ListEmptyComponent={() => (
        <Text className="text-gray-500 text-center mt-4">
          No trending videos
        </Text>
      )}
    />
  );
}
