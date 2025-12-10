import React, { useRef, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity, Dimensions } from "react-native";
import * as Animatable from "react-native-animatable";
import VideoCard from "./VideoCard";

const { width: screenWidth } = Dimensions.get("window");
const ITEM_WIDTH = Math.round(screenWidth * 0.7); // active item width
const ITEM_SPACING = 12;

export default function Trending({ posts = [], onPlayVideo }: { posts: any[]; onPlayVideo?: (item: any) => void }) {
  const viewabilityConfig = { itemVisiblePercentThreshold: 50 };
  const activeIndexRef = useRef(0);

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: any[] }) => {
    if (viewableItems && viewableItems.length > 0) {
      const active = viewableItems[0].index ?? 0;
      activeIndexRef.current = active;
    }
  }).current;

  const renderItem = useCallback(
    ({ item, index }: { item: any; index: number }) => {
      const isActive = index === activeIndexRef.current;

      return (
        <View style={{ width: ITEM_WIDTH, marginRight: ITEM_SPACING }}>
          <Animatable.View
            animation={isActive ? "zoomIn" : "zoomOut"}
            duration={300}
            useNativeDriver
            style={{
              borderRadius: 14,
              overflow: "hidden",
              backgroundColor: "#fff",
              elevation: isActive ? 6 : 2,
            }}
          >
            <TouchableOpacity activeOpacity={0.9} onPress={() => onPlayVideo?.(item)}>
              <VideoCard video={item} compact />
            </TouchableOpacity>
          </Animatable.View>
        </View>
      );
    },
    [onPlayVideo]
  );

  return (
    <View>
      <FlatList
        data={posts}
        horizontal
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        snapToInterval={ITEM_WIDTH + ITEM_SPACING}
        decelerationRate="fast"
        pagingEnabled={false} // keep false; snapToInterval + decelerationRate gives smooth snap
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={onViewableItemsChanged}
        renderItem={renderItem}
        ListEmptyComponent={() => (
          <Text style={{ color: "#6B7280", textAlign: "center" }}>No trending videos</Text>
        )}
      />
    </View>
  );
}