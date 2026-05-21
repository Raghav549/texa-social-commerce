import { FlatList, View, Text, Image, Pressable, RefreshControl } from "react-native";
import { useState, useEffect } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { apiClient } from "@/lib/services/api";
import { Post } from "@/types";

export default function HomeScreen() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [cursor, setCursor] = useState<string | undefined>();

  useEffect(() => {
    loadFeed();
  }, []);

  const loadFeed = async () => {
    try {
      setLoading(true);
      const response = await apiClient.getFeed();
      setPosts(response.data.data);
      setCursor(response.data.cursor);
    } catch (error) {
      console.error("Failed to load feed:", error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const response = await apiClient.getFeed();
      setPosts(response.data.data);
      setCursor(response.data.cursor);
    } catch (error) {
      console.error("Failed to refresh feed:", error);
    } finally {
      setRefreshing(false);
    }
  };

  const loadMore = async () => {
    if (!cursor) return;

    try {
      const response = await apiClient.getFeed(cursor);
      setPosts([...posts, ...response.data.data]);
      setCursor(response.data.cursor);
    } catch (error) {
      console.error("Failed to load more posts:", error);
    }
  };

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  const renderPost = ({ item }: { item: Post }) => (
    <Card variant="default" className="mb-4">
      {/* Post Header */}
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center gap-3 flex-1">
          <Avatar
            size="md"
            source={item.author?.avatar}
            initials={item.author?.displayName.slice(0, 2)}
            verified={item.author?.verified}
          />
          <View className="flex-1">
            <View className="flex-row items-center gap-2">
              <Text className="font-semibold text-foreground">
                {item.author?.displayName}
              </Text>
              {item.author?.verified && (
                <Badge variant="verified" label="✓" />
              )}
            </View>
            <Text className="text-xs text-muted">@{item.author?.username}</Text>
          </View>
        </View>
        <Pressable>
          <Text className="text-lg text-muted">•••</Text>
        </Pressable>
      </View>

      {/* Post Media */}
      {item.media.length > 0 && (
        <Image
          source={{ uri: item.media[0].url }}
          style={{
            width: "100%",
            height: 300,
            borderRadius: 12,
            marginBottom: 12,
          }}
        />
      )}

      {/* Post Caption */}
      {item.caption && (
        <Text className="text-sm text-foreground mb-3 leading-relaxed">
          {item.caption}
        </Text>
      )}

      {/* Post Stats */}
      <View className="flex-row justify-between text-xs text-muted mb-3 pb-3 border-b border-border">
        <Text>{item.likes} likes</Text>
        <Text>{item.comments} comments</Text>
        <Text>{item.shares} shares</Text>
      </View>

      {/* Post Actions */}
      <View className="flex-row justify-around">
        <Pressable className="flex-1 items-center py-2">
          <Text className="text-lg">❤️</Text>
        </Pressable>
        <Pressable className="flex-1 items-center py-2">
          <Text className="text-lg">💬</Text>
        </Pressable>
        <Pressable className="flex-1 items-center py-2">
          <Text className="text-lg">↗️</Text>
        </Pressable>
        <Pressable className="flex-1 items-center py-2">
          <Text className="text-lg">🔖</Text>
        </Pressable>
      </View>
    </Card>
  );

  return (
    <ScreenContainer className="p-4">
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center py-12">
            <Text className="text-lg font-semibold text-foreground mb-2">No posts yet</Text>
            <Text className="text-sm text-muted">Follow creators to see their posts</Text>
          </View>
        }
      />
    </ScreenContainer>
  );
}
