import { View, Text, FlatList, Pressable, Image } from "react-native";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { Avatar } from "@/components/ui/avatar";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useColors } from "@/hooks/use-colors";

interface Notification {
  id: string;
  type: "like" | "comment" | "follow" | "message" | "mention";
  userId: string;
  userName: string;
  userAvatar: string;
  action: string;
  postId?: string;
  postImage?: string;
  timestamp: string;
  isRead: boolean;
}

export default function NotificationsScreen() {
  const router = useRouter();
  const colors = useColors();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"all" | "likes" | "comments" | "follows">("all");

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      // TODO: Call API to fetch notifications
      const mockNotifications: Notification[] = [
        {
          id: "1",
          type: "like",
          userId: "user1",
          userName: "Sarah Chen",
          userAvatar: "https://via.placeholder.com/48",
          action: "liked your post",
          postId: "post1",
          postImage: "https://via.placeholder.com/100",
          timestamp: "2m ago",
          isRead: false,
        },
        {
          id: "2",
          type: "follow",
          userId: "user2",
          userName: "Alex Kumar",
          userAvatar: "https://via.placeholder.com/48",
          action: "started following you",
          timestamp: "1h ago",
          isRead: false,
        },
        {
          id: "3",
          type: "comment",
          userId: "user3",
          userName: "Emma Wilson",
          userAvatar: "https://via.placeholder.com/48",
          action: "commented on your post",
          postId: "post2",
          postImage: "https://via.placeholder.com/100",
          timestamp: "3h ago",
          isRead: true,
        },
      ];
      setNotifications(mockNotifications);
    } catch (error) {
      console.error("Failed to load notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "like":
        return "❤️";
      case "comment":
        return "💬";
      case "follow":
        return "👤";
      case "message":
        return "💌";
      case "mention":
        return "@";
      default:
        return "🔔";
    }
  };

  const filteredNotifications = notifications.filter((notif) => {
    if (activeTab === "all") return true;
    if (activeTab === "likes") return notif.type === "like";
    if (activeTab === "comments") return notif.type === "comment";
    if (activeTab === "follows") return notif.type === "follow";
    return true;
  });

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  const renderNotification = ({ item }: { item: Notification }) => (
    <Pressable
      onPress={() => {
        if (item.postId) {
          router.push(`/post/${item.postId}`);
        }
      }}
      className={`flex-row items-center gap-3 p-4 border-b ${
        !item.isRead ? "bg-primary/5" : ""
      }`}
      style={{ borderColor: colors.border }}
    >
      <Avatar
        size="lg"
        source={item.userAvatar}
        initials={item.userName.slice(0, 2)}
      />

      <View className="flex-1">
        <View className="flex-row items-center gap-2 mb-1">
          <Text className="text-base font-semibold text-foreground">{item.userName}</Text>
          <Text className="text-sm text-muted">{item.action}</Text>
        </View>
        <Text className="text-xs text-muted">{item.timestamp}</Text>
      </View>

      {item.postImage && (
        <Image
          source={{ uri: item.postImage }}
          style={{
            width: 50,
            height: 50,
            borderRadius: 8,
          }}
        />
      )}

      {!item.isRead && (
        <View
          style={{
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: colors.primary,
          }}
        />
      )}
    </Pressable>
  );

  return (
    <ScreenContainer className="p-0">
      {/* Header */}
      <View className="px-4 pt-4 pb-2">
        <Text className="text-3xl font-bold text-foreground mb-4">Notifications</Text>

        {/* Tabs */}
        <View className="flex-row gap-2 mb-4">
          {(["all", "likes", "comments", "follows"] as const).map((tab) => (
            <Pressable
              key={tab}
              onPress={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full ${
                activeTab === tab
                  ? "bg-primary"
                  : "bg-surface"
              }`}
            >
              <Text
                className={`text-sm font-semibold capitalize ${
                  activeTab === tab
                    ? "text-background"
                    : "text-foreground"
                }`}
              >
                {tab}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Notifications List */}
      {filteredNotifications.length > 0 ? (
        <FlatList
          data={filteredNotifications}
          renderItem={renderNotification}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />
      ) : (
        <View className="flex-1 items-center justify-center">
          <Text style={{ fontSize: 48 }} className="mb-2">
            🔔
          </Text>
          <Text className="text-lg font-semibold text-foreground mb-2">No notifications</Text>
          <Text className="text-sm text-muted">You're all caught up!</Text>
        </View>
      )}
    </ScreenContainer>
  );
}
