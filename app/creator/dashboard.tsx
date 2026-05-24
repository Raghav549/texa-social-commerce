import { View, Text, ScrollView, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { Card } from "@/components/ui/card";
import { useColors } from "@/hooks/use-colors";

export default function CreatorDashboardScreen() {
  const router = useRouter();
  const colors = useColors();

  const stats = [
    { label: "Followers", value: "12.5K", change: "+2.3%" },
    { label: "Engagement", value: "8.2%", change: "+1.1%" },
    { label: "Reach", value: "245K", change: "+15.4%" },
    { label: "Impressions", value: "1.2M", change: "+22.1%" },
  ];

  const insights = [
    { title: "Best Posting Time", description: "Tuesday 7-9 PM" },
    { title: "Top Content", description: "Reels (45% engagement)" },
    { title: "Audience Growth", description: "Week over week +5.2%" },
  ];

  return (
    <ScreenContainer className="p-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row items-center justify-between mb-6">
          <Pressable onPress={() => router.back()}>
            <Text className="text-lg text-primary">←</Text>
          </Pressable>
          <Text className="text-2xl font-bold text-foreground">Creator Dashboard</Text>
          <Pressable>
            <Text className="text-lg">⚙️</Text>
          </Pressable>
        </View>

        {/* Stats Grid */}
        <View className="gap-3 mb-6">
          {stats.map((stat, index) => (
            <Card key={index} variant="default" className="flex-row justify-between items-center">
              <View>
                <Text className="text-sm text-muted">{stat.label}</Text>
                <Text className="text-2xl font-bold text-foreground mt-1">{stat.value}</Text>
              </View>
              <Text className="text-sm font-semibold text-success">{stat.change}</Text>
            </Card>
          ))}
        </View>

        {/* Performance Chart */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-foreground mb-3">Performance (Last 7 Days)</Text>
          <Card variant="default" className="h-48 items-center justify-center">
            <Text className="text-muted">📊 Chart visualization</Text>
          </Card>
        </View>

        {/* Insights */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-foreground mb-3">Insights</Text>
          <View className="gap-2">
            {insights.map((insight, index) => (
              <Card key={index} variant="default">
                <View className="flex-row items-center justify-between">
                  <View>
                    <Text className="text-sm font-semibold text-foreground">{insight.title}</Text>
                    <Text className="text-xs text-muted mt-1">{insight.description}</Text>
                  </View>
                  <Text className="text-lg">→</Text>
                </View>
              </Card>
            ))}
          </View>
        </View>

        {/* Creator Tools */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-foreground mb-3">Creator Tools</Text>
          <View className="gap-2">
            <Card variant="default" className="flex-row items-center justify-between">
              <View>
                <Text className="text-sm font-semibold text-foreground">AI Caption Generator</Text>
                <Text className="text-xs text-muted mt-1">Generate captions with AI</Text>
              </View>
              <Text className="text-lg">✨</Text>
            </Card>

            <Card variant="default" className="flex-row items-center justify-between">
              <View>
                <Text className="text-sm font-semibold text-foreground">Content Calendar</Text>
                <Text className="text-xs text-muted mt-1">Plan your content</Text>
              </View>
              <Text className="text-lg">📅</Text>
            </Card>

            <Card variant="default" className="flex-row items-center justify-between">
              <View>
                <Text className="text-sm font-semibold text-foreground">Detailed Analytics</Text>
                <Text className="text-xs text-muted mt-1">Deep dive into metrics</Text>
              </View>
              <Text className="text-lg">📈</Text>
            </Card>
          </View>
        </View>

        {/* Monetization */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-foreground mb-3">Monetization</Text>
          <Card variant="default" className="gap-3">
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-sm font-semibold text-foreground">Monthly Earnings</Text>
                <Text className="text-2xl font-bold text-primary mt-1">$1,245</Text>
              </View>
              <Pressable className="px-4 py-2 bg-primary rounded-lg">
                <Text className="text-sm font-semibold text-background">Withdraw</Text>
              </Pressable>
            </View>
          </Card>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
