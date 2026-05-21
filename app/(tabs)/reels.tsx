import { View, Text, FlatList, Image, Pressable } from "react-native";
import { useState, useEffect } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { apiClient } from "@/lib/services/api";
import { Reel } from "@/types";

export default function ReelsScreen() {
  const [reels, setReels] = useState<Reel[]>([]);
  const [loading, setLoading] = useState(true);
  const [cursor, setCursor] = useState<string | undefined>();

  useEffect(() => {
    loadReels();
  }, []);

  const loadReels = async () => {
    try {
      setLoading(true);
      const response = await apiClient.getReels();
      setReels(response.data.data);
      setCursor(response.data.cursor);
    } catch (error) {
      console.error("Failed to load reels:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    if (!cursor) return;

    try {
      const response = await apiClient.getReels(cursor);
      setReels([...reels, ...response.data.data]);
      setCursor(response.data.cursor);
    } catch (error) {
      console.error("Failed to load more reels:", error);
    }
  };

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  const renderReel = ({ item }: { item: Reel }) => (
    <Pressable className="flex-1 h-96 mb-2 relative">
      <Image
        source={{ uri: item.thumbnail }}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 12,
        }}
      />
      <View className="absolute inset-0 flex-row items-center justify-center rounded-lg bg-black/20">
        <Text style={{ fontSize: 48 }}>▶️</Text>
      </View>
      <View className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
        <Text className="text-white font-semibold">{item.caption}</Text>
        <View className="flex-row gap-4 mt-2">
          <Text className="text-white text-xs">❤️ {item.likes}</Text>
          <Text className="text-white text-xs">💬 {item.comments}</Text>
          <Text className="text-white text-xs">↗️ {item.shares}</Text>
        </View>
      </View>
    </Pressable>
  );

  return (
    <ScreenContainer className="p-2">
      <FlatList
        data={reels}
        renderItem={renderReel}
        keyExtractor={(item) => item.id}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center py-12">
            <Text className="text-lg font-semibold text-foreground mb-2">No reels yet</Text>
            <Text className="text-sm text-muted">Check back later for new content</Text>
          </View>
        }
      />
    </ScreenContainer>
  );
}
