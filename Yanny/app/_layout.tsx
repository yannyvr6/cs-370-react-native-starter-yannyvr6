import React from "react";
import { Slot } from "expo-router";
import { ThemeProvider, DarkTheme, DefaultTheme } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { GlobalProvider } from "../context/GlobalContext";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <GlobalProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        {/* The Slot MUST render immediately */}
        <Slot />
        <StatusBar style="auto" />
      </ThemeProvider>
    </GlobalProvider>
  );
}
