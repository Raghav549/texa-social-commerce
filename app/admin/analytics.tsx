import { View, Text, ScrollView, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { Card } from "@/components/ui/card";
import { useColors } from "@/hooks/use-colors";

export default function AdminAnalyticsScreen() {
  const router = useRouter();
  const colors = useColors();
  const [timeRange, setTimeRange] = useState<"day" | "week" | "month" | "year">("week");

  const metrics = [
    { label: "Total Users", value: "245.3K", change: "+12.5%", icon: "👥" },
    { label: "Active Users", value: "89.2K", change: "+8.3%", icon: "🟢" },
    { label: "Total Posts", value: "1.2M", change: "+15.4%", icon: "📝" },
    { label: "Total Revenue", value: "$45.2K", change: "+22.1%", icon: "💰" },
  ];

  const topCreators = [
    { name: "Creator One", followers: "125K", engagement: "8.5%" },
    { name: "Creator Two", followers: "98K", engagement: "7.2%" },
    { name: "Creator Three", followers: "76K", engagement: "6.8%" },
  ];

  const topPosts = [
    { title: "Amazing sunset view", likes: "45.2K", comments: "2.1K" },
    { title: "Travel vlog - Paris", likes: "38.9K", comments: "1.8K" },
    { title: "DIY home decor", likes: "32.1K", comments: "1.5K" },
  ];

  return (
    <ScreenContainer className="p-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row items-center justify-between mb-6">
          <Pressable onPress={() => router.back()}>
            <Text className="text-lg text-primary">←</Text>
          </Pressable>
          <Text className="text-2xl font-bold text-foreground">Analytics</Text>
          <Pressable>
            <Text className="text-lg">📊</Text>
          </Pressable>
        </View>

        {/* Time Range Selector */}
        <View className="flex-row gap-2 mb-6">
          {(["day", "week", "month", "year"] as const).map((range) => (
            <Pressable
              key={range}
              onPress={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-full ${
                timeRange === range ? "bg-primary" : "bg-surface"
              }`}
            >
              <Text
                className={`text-xs font-semibold capitalize ${
                  timeRange === range ? "text-background" : "text-foreground"
                }`}
              >
                {range}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Key Metrics */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-foreground mb-3">Key Metrics</Text>
          <View className="gap-3">
            {metrics.map((metric, index) => (
              <Card key={index} variant="default" className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-3">
                  <Text style={{ fontSize: 24 }}>{metric.icon}</Text>
                  <View>
                    <Text className="text-sm text-muted">{metric.label}</Text>
                    <Text className="text-xl font-bold text-foreground mt-1">{metric.value}</Text>
                  </View>
                </View>
                <Text className="text-sm font-semibold text-success">{metric.change}</Text>
              </Card>
            ))}
          </View>
        </View>

        {/* Chart Placeholder */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-foreground mb-3">Growth Trend</Text>
          <Card variant="default" className="h-40 items-center justify-center">
            <Text className="text-muted">📈 Chart visualization</Text>
          </Card>
        </View>

        {/* Top Creators */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-foreground mb-3">Top Creators</Text>
          <View className="gap-2">
            {topCreators.map((creator, index) => (
              <Card key={index} variant="default">
                <View className="flex-row items-center justify-between">
                  <View>
                    <Text className="text-sm font-semibold text-foreground">{creator.name}</Text>
                    <Text className="text-xs text-muted mt-1">{creator.followers} followers</Text>
                  </View>
                  <View className="items-end">
                    <Text className="text-sm font-bold text-primary">{creator.engagement}</Text>
                    <Text className="text-xs text-muted mt-1">engagement</Text>
                  </View>
                </View>
              </Card>
            ))}
          </View>
        </View>

        {/* Top Posts */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-foreground mb-3">Top Posts</Text>
          <View className="gap-2">
            {topPosts.map((post, index) => (
              <Card key={index} variant="default">
                <View>
                  <Text className="text-sm font-semibold text-foreground">{post.title}</Text>
                  <View className="flex-row gap-4 mt-2">
                    <View>
                      <Text className="text-xs text-muted">Likes</Text>
                      <Text className="text-sm font-bold text-primary mt-1">{post.likes}</Text>
                    </View>
                    <View>
                      <Text className="text-xs text-muted">Comments</Text>
                      <Text className="text-sm font-bold text-primary mt-1">{post.comments}</Text>
                    </View>
                  </View>
                </View>
              </Card>
            ))}
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
