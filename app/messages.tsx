import { View, Text, ScrollView, Pressable, FlatList, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { useColors } from "@/hooks/use-colors";
import { messagingService, Conversation } from "@/lib/messaging";

export default function MessagesScreen() {
  const router = useRouter();
  const colors = useColors();
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "conv_1",
      participantId: "user_456",
      participantName: "Sarah Johnson",
      participantAvatar: "https://via.placeholder.com/40",
      lastMessage: "Hey! How are you doing?",
      lastMessageTime: Date.now() - 3600000,
      unreadCount: 2,
    },
    {
      id: "conv_2",
      participantId: "user_789",
      participantName: "Mike Chen",
      participantAvatar: "https://via.placeholder.com/40",
      lastMessage: "See you at the meeting tomorrow",
      lastMessageTime: Date.now() - 7200000,
      unreadCount: 0,
    },
    {
      id: "conv_3",
      participantId: "user_101",
      participantName: "Emma Davis",
      participantAvatar: "https://via.placeholder.com/40",
      lastMessage: "Thanks for the recommendation!",
      lastMessageTime: Date.now() - 86400000,
      unreadCount: 1,
    },
  ]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    // Subscribe to conversation updates
    const unsubscribe = messagingService.onConversations((convs) => {
      setConversations(convs);
    });

    // Fetch conversations on mount
    messagingService.getConversations();

    return unsubscribe;
  }, []);

  const filteredConversations = conversations.filter((conv) =>
    conv.participantName.toLowerCase().includes(searchText.toLowerCase())
  );

  const formatTime = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor(diff / 60000);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return "now";
  };

  const renderConversation = ({ item }: { item: Conversation }) => (
    <Pressable onPress={() => router.push(`/chat/${item.id}`)}>
      <Card variant="default" className="flex-row gap-3 mb-2">
        <View className="relative">
          <Avatar size="lg" source={item.participantAvatar} initials={item.participantName[0]} />
          {item.unreadCount > 0 && (
            <View className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary items-center justify-center">
              <Text className="text-xs font-bold text-background">{item.unreadCount}</Text>
            </View>
          )}
        </View>

        <View className="flex-1">
          <View className="flex-row items-center justify-between mb-1">
            <Text className="text-sm font-semibold text-foreground">
              {item.participantName}
            </Text>
            <Text className="text-xs text-muted">{formatTime(item.lastMessageTime)}</Text>
          </View>
          <Text
            className={`text-sm ${
              item.unreadCount > 0
                ? "font-semibold text-foreground"
                : "text-muted"
            }`}
            numberOfLines={1}
          >
            {item.lastMessage}
          </Text>
        </View>
      </Card>
    </Pressable>
  );

  return (
    <ScreenContainer className="p-4">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-2xl font-bold text-foreground">Messages</Text>
        <Pressable onPress={() => router.push("/messages/new")}>
          <Text className="text-lg">✏️</Text>
        </Pressable>
      </View>

      {/* Search */}
      <View
        className="flex-row items-center rounded-full px-4 py-2 mb-4"
        style={{ backgroundColor: colors.surface }}
      >
        <Text className="text-lg mr-2">🔍</Text>
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
          <View className="items-center justify-center py-8">
            <Text style={{ fontSize: 48 }} className="mb-2">
              💬
            </Text>
            <Text className="text-lg font-semibold text-foreground mb-1">
              No conversations yet
            </Text>
            <Text className="text-sm text-muted">Start a new chat to begin messaging</Text>
          </View>
        }
      />
    </ScreenContainer>
  );
}
