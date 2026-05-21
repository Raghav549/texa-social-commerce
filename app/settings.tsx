import { View, Text, ScrollView, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { Card } from "@/components/ui/card";

export default function SettingsScreen() {
  const router = useRouter();

  const settingsSections = [
    {
      title: "Account",
      items: [
        { label: "Edit Profile", icon: "👤" },
        { label: "Privacy Settings", icon: "🔒" },
        { label: "Security", icon: "🛡️" },
      ],
    },
    {
      title: "Preferences",
      items: [
        { label: "Notifications", icon: "🔔" },
        { label: "Theme", icon: "🎨" },
        { label: "Language", icon: "🌐" },
      ],
    },
    {
      title: "Support",
      items: [
        { label: "Help & Support", icon: "❓" },
        { label: "Terms of Service", icon: "📋" },
        { label: "Privacy Policy", icon: "📄" },
      ],
    },
  ];

  return (
    <ScreenContainer className="p-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Pressable onPress={() => router.back()} className="mb-4">
          <Text className="text-lg text-primary">← Back</Text>
        </Pressable>

        <Text className="text-3xl font-bold text-foreground mb-6">Settings</Text>

        {settingsSections.map((section) => (
          <View key={section.title} className="mb-6">
            <Text className="text-lg font-semibold text-foreground mb-3">{section.title}</Text>
            {section.items.map((item) => (
              <Pressable key={item.label}>
                <Card variant="default" className="flex-row items-center justify-between mb-2">
                  <View className="flex-row items-center gap-3">
                    <Text style={{ fontSize: 20 }}>{item.icon}</Text>
                    <Text className="text-base text-foreground font-medium">{item.label}</Text>
                  </View>
                  <Text className="text-lg text-muted">→</Text>
                </Card>
              </Pressable>
            ))}
          </View>
        ))}
      </ScrollView>
    </ScreenContainer>
  );
}
