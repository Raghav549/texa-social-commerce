import { View, Text, TextInput, FlatList, Image, Pressable } from "react-native";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";

export default function ExploreScreen() {
  const colors = useColors();
  const [searchQuery, setSearchQuery] = useState("");

  const trendingHashtags = [
    { id: "1", name: "texa", posts: "125K" },
    { id: "2", name: "creators", posts: "89K" },
    { id: "3", name: "commerce", posts: "56K" },
  ];

  const exploreGrid = [
    { id: "1", image: "https://via.placeholder.com/150" },
    { id: "2", image: "https://via.placeholder.com/150" },
    { id: "3", image: "https://via.placeholder.com/150" },
    { id: "4", image: "https://via.placeholder.com/150" },
    { id: "5", image: "https://via.placeholder.com/150" },
    { id: "6", image: "https://via.placeholder.com/150" },
  ];

  return (
    <ScreenContainer className="p-4">
      <FlatList
        data={exploreGrid}
        numColumns={2}
        columnWrapperStyle={{ gap: 8 }}
        ListHeaderComponent={
          <View className="mb-6 gap-4">
            {/* Search Bar */}
            <View
              style={{
                backgroundColor: colors.surface,
                borderRadius: 12,
                paddingHorizontal: 12,
                paddingVertical: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 18, marginRight: 8 }}>🔍</Text>
              <TextInput
                placeholder="Search posts, creators, hashtags..."
                placeholderTextColor={colors.muted}
                value={searchQuery}
                onChangeText={setSearchQuery}
                style={{
                  flex: 1,
                  color: colors.foreground,
                  fontSize: 14,
                }}
              />
            </View>

            {/* Trending Section */}
            <View className="gap-3">
              <Text className="text-lg font-bold text-foreground">Trending</Text>
              {trendingHashtags.map((hashtag) => (
                <Pressable key={hashtag.id} className="flex-row justify-between items-center py-2">
                  <View>
                    <Text className="text-base font-semibold text-foreground">#{hashtag.name}</Text>
                    <Text className="text-xs text-muted">{hashtag.posts} posts</Text>
                  </View>
                  <Text className="text-lg">→</Text>
                </Pressable>
              ))}
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <Pressable className="flex-1">
            <Image
              source={{ uri: item.image }}
              style={{
                width: "100%",
                aspectRatio: 1,
                borderRadius: 12,
                backgroundColor: colors.surface,
              }}
            />
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
      />
    </ScreenContainer>
  );
}
