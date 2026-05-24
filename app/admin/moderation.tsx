import { View, Text, ScrollView, Pressable, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useColors } from "@/hooks/use-colors";

interface Report {
  id: string;
  type: "post" | "comment" | "user" | "message";
  reporter: string;
  reporterAvatar: string;
  reason: string;
  content: string;
  status: "pending" | "approved" | "rejected";
  timestamp: string;
}

export default function ModerationScreen() {
  const router = useRouter();
  const colors = useColors();
  const [activeTab, setActiveTab] = useState<"pending" | "approved" | "rejected">("pending");

  const reports: Report[] = [
    {
      id: "1",
      type: "post",
      reporter: "User123",
      reporterAvatar: "https://via.placeholder.com/40",
      reason: "Inappropriate content",
      content: "Post contains explicit material",
      status: "pending",
      timestamp: "2 hours ago",
    },
    {
      id: "2",
      type: "comment",
      reporter: "SafeUser",
      reporterAvatar: "https://via.placeholder.com/40",
      reason: "Harassment",
      content: "Abusive comment targeting user",
      status: "pending",
      timestamp: "1 hour ago",
    },
    {
      id: "3",
      type: "user",
      reporter: "Admin",
      reporterAvatar: "https://via.placeholder.com/40",
      reason: "Spam account",
      content: "Account posting repetitive promotional content",
      status: "approved",
      timestamp: "30 minutes ago",
    },
  ];

  const filteredReports = reports.filter((r) => r.status === activeTab);

  const handleApprove = (id: string) => {
    // TODO: Call API to approve report
    console.log("Approved report:", id);
  };

  const handleReject = (id: string) => {
    // TODO: Call API to reject report
    console.log("Rejected report:", id);
  };

  const renderReport = ({ item }: { item: Report }) => (
    <Card variant="default" className="mb-3">
      <View className="flex-row gap-3 mb-3">
        <Avatar size="md" source={item.reporterAvatar} initials="U" />
        <View className="flex-1">
          <View className="flex-row items-center justify-between">
            <Text className="font-semibold text-foreground">{item.reporter}</Text>
            <Text className="text-xs text-muted">{item.timestamp}</Text>
          </View>
          <Text className="text-xs text-muted mt-1">Reported {item.type}</Text>
        </View>
      </View>

      <View className="bg-surface rounded-lg p-3 mb-3">
        <Text className="text-xs font-semibold text-muted mb-1">Reason: {item.reason}</Text>
        <Text className="text-sm text-foreground">{item.content}</Text>
      </View>

      {activeTab === "pending" && (
        <View className="flex-row gap-2">
          <Button
            variant="secondary"
            className="flex-1"
            onPress={() => handleReject(item.id)}
          >
            Reject
          </Button>
          <Button
            className="flex-1"
            onPress={() => handleApprove(item.id)}
          >
            Approve
          </Button>
        </View>
      )}

      {activeTab === "approved" && (
        <View className="px-3 py-2 bg-success rounded-lg">
          <Text className="text-xs font-semibold text-background text-center">✓ Approved</Text>
        </View>
      )}

      {activeTab === "rejected" && (
        <View className="px-3 py-2 bg-error rounded-lg">
          <Text className="text-xs font-semibold text-background text-center">✕ Rejected</Text>
        </View>
      )}
    </Card>
  );

  return (
    <ScreenContainer className="p-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row items-center justify-between mb-6">
          <Pressable onPress={() => router.back()}>
            <Text className="text-lg text-primary">←</Text>
          </Pressable>
          <Text className="text-2xl font-bold text-foreground">Moderation</Text>
          <Pressable>
            <Text className="text-lg">⚙️</Text>
          </Pressable>
        </View>

        {/* Stats */}
        <View className="flex-row gap-2 mb-6">
          <Card variant="default" className="flex-1 items-center py-3">
            <Text className="text-2xl font-bold text-primary">24</Text>
            <Text className="text-xs text-muted mt-1">Pending</Text>
          </Card>
          <Card variant="default" className="flex-1 items-center py-3">
            <Text className="text-2xl font-bold text-success">156</Text>
            <Text className="text-xs text-muted mt-1">Approved</Text>
          </Card>
          <Card variant="default" className="flex-1 items-center py-3">
            <Text className="text-2xl font-bold text-error">12</Text>
            <Text className="text-xs text-muted mt-1">Rejected</Text>
          </Card>
        </View>

        {/* Tabs */}
        <View className="flex-row gap-2 mb-4">
          {(["pending", "approved", "rejected"] as const).map((tab) => (
            <Pressable
              key={tab}
              onPress={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-lg ${
                activeTab === tab ? "bg-primary" : "bg-surface"
              }`}
            >
              <Text
                className={`text-xs font-semibold text-center capitalize ${
                  activeTab === tab ? "text-background" : "text-foreground"
                }`}
              >
                {tab}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Reports List */}
        <FlatList
          data={filteredReports}
          renderItem={renderReport}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />

        {filteredReports.length === 0 && (
          <View className="items-center justify-center py-8">
            <Text className="text-lg text-muted">No {activeTab} reports</Text>
          </View>
        )}
      </ScrollView>
    </ScreenContainer>
  );
}
