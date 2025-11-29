import { View, Text } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';

export default function Search() {
  const { query } = useLocalSearchParams();

  return (
    <View>
      <Text>Search results for: {query}</Text>
    </View>
  );
}
