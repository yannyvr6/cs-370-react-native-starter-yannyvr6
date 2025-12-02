import { Tabs } from "expo-router";
import { View, Text, Image } from "react-native";
import { icons } from "../../constants";

interface TabIconProps {
  icon: any;
  color: string;
  name: string;
  focused: boolean;
}

const TabIcon = ({ icon, color, name, focused }: TabIconProps) => (
  <View style={{ alignItems: "center", justifyContent: "center" }}>
    <Image
      source={icon}
      style={{
        width: 24,
        height: 24,
        tintColor: color,
        resizeMode: "contain",
      }}
    />
    <Text
      style={{
        fontSize: 12,
        color,
        fontWeight: focused ? "bold" : "normal",
        marginTop: 4,
      }}
    >
      {name}
    </Text>
  </View>
);

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#888",
        tabBarStyle: {
          backgroundColor: "#000",
          borderTopWidth: 1,
          borderTopColor: "#222",
          height: 65,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon={icons.home} color={color} name="Home" focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="bookmark"
        options={{
          title: "Bookmark",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon={icons.bookmark} color={color} name="Bookmark" focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="create"
        options={{
          title: "Create",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon={icons.create} color={color} name="Create" focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon={icons.profile} color={color} name="Profile" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}
