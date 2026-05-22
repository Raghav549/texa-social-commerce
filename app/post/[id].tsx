import { View, Text, Image, FlatList, Pressable, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useState, useRef } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useColors } from "@/hooks/use-colors";

interface Comment {
  id: string;
  authorName: string;
  authorUsername: string;
  authorAvatar: string;
  content: string;
  likes: number;
  timestamp: string;
  verified: boolean;
}

export default function PostDetailScreen() {
  const router = useRouter();
  const colors = useColors();
  const { id } = useLocalSearchParams();
  const [commentText, setCommentText] = useState("");
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const comments: Comment[] = [
    {
      id: "1",
      authorName: "Sarah Chen",
      authorUsername: "sarahchen",
      authorAvatar: "https://via.placeholder.com/48",
      content: "This is amazing! Love the composition 📸",
      likes: 24,
      timestamp: "2h ago",
      verified: true,
    },
    {
      id: "2",
      authorName: "Alex Kumar",
      authorUsername: "alexkumar",
      authorAvatar: "https://via.placeholder.com/48",
      content: "Where was this taken? Looks beautiful!",
      likes: 12,
      timestamp: "1h ago",
      verified: false,
    },
  ];

  const handlePostComment = () => {
    if (!commentText.trim()) return;
    // TODO: Call API to post comment
    setCommentText("");
  };

  const renderComment = ({ item }: { item: Comment }) => (
    <View className="flex-row gap-3 p-4 border-b" style={{ borderColor: colors.border }}>
      <Avatar
        size="md"
        source={item.authorAvatar}
        initials={item.authorName.slice(0, 2)}
      />

      <View className="flex-1">
        <View className="flex-row items-center gap-2 mb-1">
          <Text className="font-semibold text-foreground">{item.authorName}</Text>
          {item.verified && <Badge variant="verified" label="✓" />}
          <Text className="text-xs text-muted">@{item.authorUsername}</Text>
          <Text className="text-xs text-muted">•</Text>
          <Text className="text-xs text-muted">{item.timestamp}</Text>
        </View>

        <Text className="text-sm text-foreground mb-2">{item.content}</Text>

        <View className="flex-row gap-4">
          <Pressable className="flex-row items-center gap-1">
            <Text className="text-lg">❤️</Text>
            <Text className="text-xs text-muted">{item.likes}</Text>
          </Pressable>
          <Pressable className="flex-row items-center gap-1">
            <Text className="text-lg">💬</Text>
            <Text className="text-xs text-muted">Reply</Text>
          </Pressable>
        </View>
      </View>

      <Pressable>
        <Text className="text-lg">⋯</Text>
      </Pressable>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <ScreenContainer className="p-0" edges={["top", "left", "right"]}>
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 py-3 border-b" style={{ borderColor: colors.border }}>
          <Pressable onPress={() => router.back()}>
            <Text className="text-lg text-primary">←</Text>
          </Pressable>
          <Text className="text-lg font-bold text-foreground">Post</Text>
          <Pressable>
            <Text className="text-lg">⋯</Text>
          </Pressable>
        </View>

        {/* Post Content */}
        <FlatList
          ref={flatListRef}
          data={comments}
          renderItem={renderComment}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={
            <View className="border-b" style={{ borderColor: colors.border }}>
              {/* Post Author */}
              <View className="flex-row items-center justify-between p-4">
                <View className="flex-row items-center gap-3 flex-1">
                  <Avatar size="lg" initials="JD" />
                  <View>
                    <View className="flex-row items-center gap-2">
                      <Text className="text-base font-semibold text-foreground">John Doe</Text>
                      <Badge variant="verified" label="✓" />
                    </View>
                    <Text className="text-sm text-muted">@johndoe</Text>
                  </View>
                </View>
                <Pressable>
                  <Text className="text-lg">⋯</Text>
                </Pressable>
              </View>

              {/* Post Media */}
              <Image
                source={{ uri: "https://via.placeholder.com/400x400" }}
                style={{
                  width: "100%",
                  height: 400,
                  resizeMode: "cover",
                }}
              />

              {/* Post Caption */}
              <View className="p-4">
                <Text className="text-base text-foreground mb-2">
                  Beautiful sunset at the beach 🌅 #photography #nature
                </Text>
                <Text className="text-sm text-muted">2 hours ago</Text>
              </View>

              {/* Post Stats */}
              <View className="flex-row justify-between px-4 py-2 border-t border-b" style={{ borderColor: colors.border }}>
                <Text className="text-sm text-muted">1.2K likes</Text>
                <Text className="text-sm text-muted">24 comments</Text>
                <Text className="text-sm text-muted">56 shares</Text>
              </View>

              {/* Post Actions */}
              <View className="flex-row justify-around py-2">
                <Pressable
                  onPress={() => setLiked(!liked)}
                  className="flex-row items-center gap-2 py-2"
                >
                  <Text className="text-2xl">{liked ? "❤️" : "🤍"}</Text>
                  <Text className="text-sm text-muted">Like</Text>
                </Pressable>
                <Pressable className="flex-row items-center gap-2 py-2">
                  <Text className="text-2xl">💬</Text>
                  <Text className="text-sm text-muted">Comment</Text>
                </Pressable>
                <Pressable className="flex-row items-center gap-2 py-2">
                  <Text className="text-2xl">↗️</Text>
                  <Text className="text-sm text-muted">Share</Text>
                </Pressable>
                <Pressable
                  onPress={() => setBookmarked(!bookmarked)}
                  className="flex-row items-center gap-2 py-2"
                >
                  <Text className="text-2xl">{bookmarked ? "🔖" : "🔗"}</Text>
                  <Text className="text-sm text-muted">Save</Text>
                </Pressable>
              </View>

              {/* Comments Header */}
              <View className="px-4 py-3">
                <Text className="text-sm font-semibold text-foreground">Comments</Text>
              </View>
            </View>
          }
        />

        {/* Comment Input */}
        <View
          className="flex-row items-center gap-2 px-4 py-3 border-t"
          style={{ borderColor: colors.border }}
        >
          <Avatar size="md" initials="YO" />

          <View
            className="flex-1 flex-row items-center rounded-full px-4"
            style={{
              backgroundColor: colors.surface,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <TextInput
              placeholder="Add a comment..."
              placeholderTextColor={colors.muted}
              value={commentText}
              onChangeText={setCommentText}
              style={{
                flex: 1,
                color: colors.foreground,
                fontSize: 14,
                paddingVertical: 10,
              }}
            />
          </View>

          <Pressable
            onPress={handlePostComment}
            disabled={!commentText.trim()}
          >
            <Text className={`text-2xl ${commentText.trim() ? "text-primary" : "text-muted"}`}>
              ↗️
            </Text>
          </Pressable>
        </View>
      </ScreenContainer>
    </KeyboardAvoidingView>
  );
}
