import { View, Text, ScrollView, Pressable, TextInput, Image } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { useAuthStore } from "@/lib/store/auth";
import { useColors } from "@/hooks/use-colors";

export default function CreatePostScreen() {
  const router = useRouter();
  const colors = useColors();
  const { user } = useAuthStore();
  const [caption, setCaption] = useState("");
  const [selectedMedia, setSelectedMedia] = useState<string[]>([]);
  const [location, setLocation] = useState("");
  const [isAdvanced, setIsAdvanced] = useState(false);

  const handleAddMedia = () => {
    // TODO: Implement image picker
  };

  const handlePost = async () => {
    if (!caption && selectedMedia.length === 0) return;

    // TODO: Call API to create post
    router.back();
  };

  return (
    <ScreenContainer className="p-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row items-center justify-between mb-6">
          <Pressable onPress={() => router.back()}>
            <Text className="text-lg text-primary font-semibold">← Cancel</Text>
          </Pressable>
          <Text className="text-2xl font-bold text-foreground">Create Post</Text>
          <Pressable onPress={handlePost}>
            <Text className="text-lg text-primary font-semibold">Post</Text>
          </Pressable>
        </View>

        {/* User Info */}
        <View className="flex-row items-center gap-3 mb-6">
          <Avatar
            size="md"
            source={user?.avatar}
            initials={user?.displayName.slice(0, 2)}
          />
          <View>
            <Text className="text-base font-semibold text-foreground">
              {user?.displayName}
            </Text>
            <Text className="text-xs text-muted">@{user?.username}</Text>
          </View>
        </View>

        {/* Caption Input */}
        <View className="mb-6">
          <View
            style={{
              backgroundColor: colors.surface,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: colors.border,
              paddingHorizontal: 12,
              paddingVertical: 10,
              minHeight: 120,
            }}
          >
            <TextInput
              placeholder="What's on your mind?"
              placeholderTextColor={colors.muted}
              value={caption}
              onChangeText={setCaption}
              multiline
              maxLength={2200}
              style={{
                color: colors.foreground,
                fontSize: 16,
                fontFamily: "System",
              }}
            />
          </View>
          <Text className="text-xs text-muted mt-2 text-right">
            {caption.length}/2200
          </Text>
        </View>

        {/* Media Section */}
        <View className="mb-6">
          <Text className="text-sm font-semibold text-foreground mb-3">Media</Text>
          {selectedMedia.length > 0 ? (
            <View className="flex-row flex-wrap gap-2 mb-3">
              {selectedMedia.map((media, index) => (
                <View key={index} className="relative">
                  <Image
                    source={{ uri: media }}
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 8,
                    }}
                  />
                  <Pressable
                    onPress={() =>
                      setSelectedMedia(selectedMedia.filter((_, i) => i !== index))
                    }
                    className="absolute top-1 right-1 bg-black/50 rounded-full w-6 h-6 items-center justify-center"
                  >
                    <Text className="text-white text-sm">✕</Text>
                  </Pressable>
                </View>
              ))}
            </View>
          ) : null}
          <Button
            variant="secondary"
            onPress={handleAddMedia}
          >
            + Add Photo/Video
          </Button>
        </View>

        {/* Location */}
        <View className="mb-6">
          <Text className="text-sm font-semibold text-foreground mb-2">Location</Text>
          <View
            style={{
              backgroundColor: colors.surface,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: colors.border,
              paddingHorizontal: 12,
              paddingVertical: 10,
            }}
          >
            <TextInput
              placeholder="Add location..."
              placeholderTextColor={colors.muted}
              value={location}
              onChangeText={setLocation}
              style={{
                color: colors.foreground,
                fontSize: 14,
              }}
            />
          </View>
        </View>

        {/* Advanced Options */}
        <View className="mb-6">
          <Pressable
            onPress={() => setIsAdvanced(!isAdvanced)}
            className="flex-row items-center justify-between"
          >
            <Text className="text-sm font-semibold text-foreground">Advanced Options</Text>
            <Text className="text-lg text-muted">{isAdvanced ? "−" : "+"}</Text>
          </Pressable>

          {isAdvanced && (
            <View className="mt-4 gap-4">
              {/* Visibility */}
              <Card variant="default">
                <View className="gap-2">
                  <Text className="text-sm font-semibold text-foreground">Who can see this?</Text>
                  {["Everyone", "Close Friends", "Private"].map((option) => (
                    <Pressable key={option} className="flex-row items-center gap-2">
                      <View
                        style={{
                          width: 16,
                          height: 16,
                          borderRadius: 8,
                          borderWidth: 2,
                          borderColor: colors.primary,
                        }}
                      />
                      <Text className="text-sm text-foreground">{option}</Text>
                    </Pressable>
                  ))}
                </View>
              </Card>

              {/* Comments */}
              <Card variant="default">
                <View className="gap-2">
                  <Text className="text-sm font-semibold text-foreground">Comments</Text>
                  <Pressable className="flex-row items-center gap-2">
                    <View
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: 8,
                        borderWidth: 2,
                        borderColor: colors.primary,
                      }}
                    />
                    <Text className="text-sm text-foreground">Allow comments</Text>
                  </Pressable>
                </View>
              </Card>

              {/* Likes */}
              <Card variant="default">
                <View className="gap-2">
                  <Text className="text-sm font-semibold text-foreground">Likes</Text>
                  <Pressable className="flex-row items-center gap-2">
                    <View
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: 8,
                        borderWidth: 2,
                        borderColor: colors.primary,
                      }}
                    />
                    <Text className="text-sm text-foreground">Show like count</Text>
                  </Pressable>
                </View>
              </Card>
            </View>
          )}
        </View>

        {/* Post Button */}
        <Button
          size="lg"
          onPress={handlePost}
          disabled={!caption && selectedMedia.length === 0}
          className="mb-4"
        >
          Post
        </Button>
      </ScrollView>
    </ScreenContainer>
  );
}
