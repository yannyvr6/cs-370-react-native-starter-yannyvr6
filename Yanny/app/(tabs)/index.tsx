import { View, Text, Pressable, ScrollView } from 'react-native';
import { Link } from 'expo-router';


export default function HomeScreen() {
  return (
    <ScrollView className="flex-1 bg-background">
      <View className="flex-1 items-center justify-center p-6 pt-20">
        {/* Welcome Section */}
        <View className="items-center mb-8">
          <Text className="text-4xl font-bold text-text mb-2">Welcome! 👋</Text>
          <Text className="text-lg text-gray-600 text-center">
            Yanny's App with Expo Router
          </Text>
        </View>


   {/* Navigation Button to Profile */}
        <Link href="/profile" asChild>
          <Pressable className="mt-8 bg-primary px-8 py-4 rounded-lg shadow-md active:opacity-80">
            <Text className="text-white text-lg font-semibold text-center">
              Go to Profile
            </Text>
          </Pressable>
        </Link>

        {/* Additional Info */}
        <View className="mt-8 p-4 bg-blue-50 rounded-lg">
          <Text className="text-sm text-gray-600 text-center">
            Using NativeWind + Tailwind CSS for styling
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}