import { View, Text, Image, Pressable, Animated } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useState, useEffect, useRef } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { Avatar } from "@/components/ui/avatar";
import { useColors } from "@/hooks/use-colors";

interface Story {
  id: string;
  authorName: string;
  authorAvatar: string;
  media: string;
  caption?: string;
  createdAt: string;
  expiresAt: string;
}

export default function StoryViewerScreen() {
  const router = useRouter();
  const colors = useColors();
  const { storyId } = useLocalSearchParams();
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const progressAnim = useRef(new Animated.Value(0)).current;

  // Mock stories data
  const stories: Story[] = [
    {
      id: "1",
      authorName: "Sarah Chen",
      authorAvatar: "https://via.placeholder.com/48",
      media: "https://via.placeholder.com/400x600",
      caption: "Beautiful sunset 🌅",
      createdAt: "2 hours ago",
      expiresAt: "22 hours",
    },
    {
      id: "2",
      authorName: "Alex Kumar",
      authorAvatar: "https://via.placeholder.com/48",
      media: "https://via.placeholder.com/400x600",
      caption: "New product launch! 🚀",
      createdAt: "1 hour ago",
      expiresAt: "23 hours",
    },
  ];

  const currentStory = stories[currentStoryIndex];

  useEffect(() => {
    // Animate progress bar
    Animated.timing(progressAnim, {
      toValue: 100,
      duration: 5000,
      useNativeDriver: false,
    }).start(() => {
      if (currentStoryIndex < stories.length - 1) {
        setCurrentStoryIndex(currentStoryIndex + 1);
        progressAnim.setValue(0);
      } else {
        router.back();
      }
    });

    return () => progressAnim.setValue(0);
  }, [currentStoryIndex]);

  const handlePrevious = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
      progressAnim.setValue(0);
    }
  };

  const handleNext = () => {
    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
      progressAnim.setValue(0);
    } else {
      router.back();
    }
  };

  return (
    <ScreenContainer edges={["top", "left", "right", "bottom"]} className="p-0">
      {/* Story Container */}
      <View className="flex-1 relative bg-black">
        {/* Progress Bars */}
        <View className="flex-row gap-1 p-2 bg-black/30">
          {stories.map((_, index) => (
            <View
              key={index}
              style={{
                flex: 1,
                height: 2,
                backgroundColor: colors.border,
                borderRadius: 1,
                overflow: "hidden",
              }}
            >
              {index === currentStoryIndex && (
                <Animated.View
                  style={{
                    height: "100%",
                    backgroundColor: colors.primary,
                    width: progressAnim.interpolate({
                      inputRange: [0, 100],
                      outputRange: ["0%", "100%"],
                    }),
                  }}
                />
              )}
              {index < currentStoryIndex && (
                <View style={{ flex: 1, backgroundColor: colors.primary }} />
              )}
            </View>
          ))}
        </View>

        {/* Story Media */}
        <View className="flex-1 relative">
          <Image
            source={{ uri: currentStory.media }}
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "cover",
            }}
          />

          {/* Author Info */}
          <View className="absolute top-4 left-4 flex-row items-center gap-3">
            <Avatar
              size="md"
              source={currentStory.authorAvatar}
              initials={currentStory.authorName.slice(0, 2)}
            />
            <View>
              <Text className="text-white font-semibold">{currentStory.authorName}</Text>
              <Text className="text-white/70 text-xs">{currentStory.createdAt}</Text>
            </View>
          </View>

          {/* Caption */}
          {currentStory.caption && (
            <View className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <Text className="text-white text-base">{currentStory.caption}</Text>
            </View>
          )}

          {/* Close Button */}
          <Pressable
            onPress={() => router.back()}
            className="absolute top-4 right-4 w-10 h-10 items-center justify-center"
          >
            <Text className="text-white text-2xl">✕</Text>
          </Pressable>
        </View>

        {/* Navigation Areas */}
        <View className="absolute inset-0 flex-row">
          <Pressable
            onPress={handlePrevious}
            style={{ flex: 1 }}
          />
          <Pressable
            onPress={handleNext}
            style={{ flex: 1 }}
          />
        </View>
      </View>
    </ScreenContainer>
  );
}
