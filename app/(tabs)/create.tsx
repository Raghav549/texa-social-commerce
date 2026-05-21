import { View, Text, Pressable } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { Card } from "@/components/ui/card";

export default function CreateScreen() {
  const createOptions = [
    { id: "1", icon: "📸", label: "Post", description: "Share a photo or video" },
    { id: "2", icon: "🎬", label: "Reel", description: "Create a short video" },
    { id: "3", icon: "📖", label: "Story", description: "Share a 24-hour story" },
    { id: "4", icon: "🔴", label: "Live", description: "Go live with your followers" },
  ];

  return (
    <ScreenContainer className="p-6">
      <View className="flex-1 justify-center gap-4">
        <View className="gap-2 mb-6">
          <Text className="text-3xl font-bold text-foreground">Create</Text>
          <Text className="text-base text-muted">Choose what you want to create</Text>
        </View>

        {createOptions.map((option) => (
          <Pressable key={option.id}>
            <Card variant="default" className="flex-row items-center gap-4">
              <Text style={{ fontSize: 32 }}>{option.icon}</Text>
              <View className="flex-1">
                <Text className="text-lg font-semibold text-foreground">{option.label}</Text>
                <Text className="text-sm text-muted">{option.description}</Text>
              </View>
              <Text className="text-lg text-primary">→</Text>
            </Card>
          </Pressable>
        ))}
      </View>
    </ScreenContainer>
  );
}
