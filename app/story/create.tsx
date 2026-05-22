import { View, Text, Pressable, Image, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useColors } from "@/hooks/use-colors";

export default function CreateStoryScreen() {
  const router = useRouter();
  const colors = useColors();
  const [selectedType, setSelectedType] = useState<"image" | "video" | "text" | null>(null);
  const [caption, setCaption] = useState("");

  const storyTypes = [
    { id: "image", icon: "📸", label: "Photo", description: "Upload a photo" },
    { id: "video", icon: "🎥", label: "Video", description: "Record or upload video" },
    { id: "text", icon: "✍️", label: "Text", description: "Create text story" },
  ];

  const handleCreate = async () => {
    if (!selectedType) return;

    // TODO: Implement story creation API call
    router.back();
  };

  return (
    <ScreenContainer className="p-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row items-center justify-between mb-6">
          <Pressable onPress={() => router.back()}>
            <Text className="text-lg text-primary font-semibold">← Back</Text>
          </Pressable>
          <Text className="text-2xl font-bold text-foreground">Create Story</Text>
          <View style={{ width: 50 }} />
        </View>

        {/* Story Type Selection */}
        <View className="gap-3 mb-6">
          {storyTypes.map((type) => (
            <Pressable
              key={type.id}
              onPress={() => setSelectedType(type.id as any)}
            >
              <Card
                variant={selectedType === type.id ? "default" : "default"}
                className={`flex-row items-center gap-4 ${
                  selectedType === type.id ? "border-2 border-primary" : ""
                }`}
              >
                <Text style={{ fontSize: 32 }}>{type.icon}</Text>
                <View className="flex-1">
                  <Text className="text-lg font-semibold text-foreground">{type.label}</Text>
                  <Text className="text-sm text-muted">{type.description}</Text>
                </View>
                {selectedType === type.id && (
                  <Text className="text-lg text-primary">✓</Text>
                )}
              </Card>
            </Pressable>
          ))}
        </View>

        {/* Preview Area */}
        {selectedType && (
          <View className="mb-6">
            <Text className="text-sm font-semibold text-muted mb-2">Preview</Text>
            <View
              style={{
                backgroundColor: colors.surface,
                borderRadius: 12,
                height: 300,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 64 }}>
                {storyTypes.find((t) => t.id === selectedType)?.icon}
              </Text>
              <Text className="text-muted mt-2">Your story will appear here</Text>
            </View>
          </View>
        )}

        {/* Caption Input */}
        {selectedType && (
          <View className="mb-6">
            <Text className="text-sm font-semibold text-foreground mb-2">Add Caption (optional)</Text>
            <View
              style={{
                backgroundColor: colors.surface,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: colors.border,
                paddingHorizontal: 12,
                paddingVertical: 10,
                minHeight: 80,
              }}
            >
              <Text
                style={{
                  color: colors.foreground,
                  fontSize: 14,
                }}
              >
                {caption || "Add text to your story..."}
              </Text>
            </View>
          </View>
        )}

        {/* Visibility Options */}
        {selectedType && (
          <View className="mb-6">
            <Text className="text-sm font-semibold text-foreground mb-2">Who can see this?</Text>
            <View className="gap-2">
              {["Everyone", "Close Friends", "Private"].map((option) => (
                <Pressable key={option}>
                  <Card variant="default" className="flex-row items-center justify-between">
                    <Text className="text-sm text-foreground">{option}</Text>
                    <View
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                        borderWidth: 2,
                        borderColor: colors.primary,
                      }}
                    />
                  </Card>
                </Pressable>
              ))}
            </View>
          </View>
        )}

        {/* Action Buttons */}
        {selectedType && (
          <View className="gap-3 mb-4">
            <Button size="lg" onPress={handleCreate}>
              Post Story
            </Button>
            <Button
              size="lg"
              variant="secondary"
              onPress={() => router.back()}
            >
              Cancel
            </Button>
          </View>
        )}
      </ScrollView>
    </ScreenContainer>
  );
}
