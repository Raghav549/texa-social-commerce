import { View, Text, FlatList, Pressable, Image, TextInput } from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { Avatar } from "@/components/ui/avatar";
import { useColors } from "@/hooks/use-colors";
// import { messagingService } from "@/lib/messaging"; // TODO: Wire up messaging service

interface Conversation {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  lastMessage: string;
  lastMessageTime: number;
  unreadCount: number;
  isOnline?: boolean;
}

export default function MessagesScreen() {
  const router = useRouter();
  const colors = useColors();
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "1",
      userId: "user_456",
      userName: "Alex Johnson",
      lastMessage: "Hey, how are you?",
      lastMessageTime: Date.now() - 3600000,
      unreadCount: 2,
      isOnline: true,
    },
    {
      id: "2",
      userId: "user_789",
      userName: "Sarah Smith",
      lastMessage: "Thanks for the update!",
      lastMessageTime: Date.now() - 86400000,
      unreadCount: 0,
      isOnline: false,
    },
  ]);
  const [searchText, setSearchText] = useState("");

  const handleNewMessage = () => {
    // TODO: Navigate to new message screen or show user selection
    console.log("Start new message");
  };

  useEffect(() => {
    // TODO: Subscribe to conversation updates via messagingService
    // For now, use mock data
  }, []);

  const formatTime = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return new Date(timestamp).toLocaleDateString();
  };

  const filteredConversations = conversations.filter((conv) =>
    conv.userName.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderConversation = ({ item }: { item: Conversation }) => (
    <Pressable
      onPress={() => router.push(`/chat/${item.id}`)}
      style={({ pressed }) => ({
        opacity: pressed ? 0.7 : 1,
      })}
    >
      <View className="flex-row items-center gap-3 p-3 border-b border-border">
        <View className="relative">
          <Avatar
            size="md"
            source={item.userAvatar}
            initials={item.userName.slice(0, 2)}
          />
          {item.isOnline && (
            <View
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: colors.success,
                borderWidth: 2,
                borderColor: colors.background,
              }}
            />
          )}
        </View>

        <View className="flex-1">
          <Text className="text-base font-semibold text-foreground">
            {item.userName}
          </Text>
          <Text
            className="text-sm text-muted"
            numberOfLines={1}
          >
            {item.lastMessage}
          </Text>
        </View>

        <View className="items-end gap-1">
          <Text className="text-xs text-muted">
            {formatTime(item.lastMessageTime)}
          </Text>
          {item.unreadCount > 0 && (
            <View
              style={{
                backgroundColor: colors.primary,
                borderRadius: 10,
                paddingHorizontal: 6,
                paddingVertical: 2,
              }}
            >
              <Text
                style={{
                  color: colors.background,
                  fontSize: 11,
                  fontWeight: "600",
                }}
              >
                {item.unreadCount}
              </Text>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );

  return (
    <ScreenContainer className="p-4">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-2xl font-bold text-foreground">Messages</Text>
        <Pressable onPress={handleNewMessage}>
          <Text className="text-lg">✏️</Text>
        </Pressable>
      </View>

      {/* Search Bar */}
      <View
        style={{
          backgroundColor: colors.surface,
          borderRadius: 12,
          paddingHorizontal: 12,
          paddingVertical: 10,
          marginBottom: 12,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 16, marginRight: 8 }}>🔍</Text>
        <TextInput
          placeholder="Search conversations..."
          placeholderTextColor={colors.muted}
          value={searchText}
          onChangeText={setSearchText}
          style={{
            flex: 1,
            color: colors.foreground,
            fontSize: 14,
          }}
        />
      </View>

      {/* Conversations List */}
      <FlatList
        data={filteredConversations}
        renderItem={renderConversation}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        ListEmptyComponent={
          <View className="items-center justify-center py-12">
            <Text className="text-lg font-semibold text-foreground mb-2">
              No messages yet
            </Text>
            <Text className="text-sm text-muted">
              Start a conversation with someone
            </Text>
          </View>
        }
      />
    </ScreenContainer>
  );
}
