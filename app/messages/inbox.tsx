import { View, Text, FlatList, Pressable, Image } from "react-native";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { Avatar } from "@/components/ui/avatar";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useColors } from "@/hooks/use-colors";

interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
}

export default function InboxScreen() {
  const router = useRouter();
  const colors = useColors();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    try {
      setLoading(true);
      // TODO: Call API to fetch conversations
      const mockConversations: Conversation[] = [
        {
          id: "1",
          participantId: "user1",
          participantName: "Sarah Chen",
          participantAvatar: "https://via.placeholder.com/48",
          lastMessage: "That sounds amazing! 🎉",
          lastMessageTime: "2m ago",
          unreadCount: 2,
          isOnline: true,
        },
        {
          id: "2",
          participantId: "user2",
          participantName: "Alex Kumar",
          participantAvatar: "https://via.placeholder.com/48",
          lastMessage: "Let's collaborate on the new project",
          lastMessageTime: "1h ago",
          unreadCount: 0,
          isOnline: false,
        },
      ];
      setConversations(mockConversations);
    } catch (error) {
      console.error("Failed to load conversations:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredConversations = conversations.filter((conv) =>
    conv.participantName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  const renderConversation = ({ item }: { item: Conversation }) => (
    <Pressable
      onPress={() => router.push(`/messages/chat/${item.id}`)}
      className="flex-row items-center gap-3 p-4 border-b border-border"
    >
      <View className="relative">
        <Avatar
          size="lg"
          source={item.participantAvatar}
          initials={item.participantName.slice(0, 2)}
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
              backgroundColor: "#22C55E",
              borderWidth: 2,
              borderColor: colors.background,
            }}
          />
        )}
      </View>

      <View className="flex-1">
        <View className="flex-row items-center justify-between mb-1">
          <Text className="text-base font-semibold text-foreground">
            {item.participantName}
          </Text>
          <Text className="text-xs text-muted">{item.lastMessageTime}</Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text
            className={`text-sm flex-1 ${
              item.unreadCount > 0 ? "text-foreground font-semibold" : "text-muted"
            }`}
            numberOfLines={1}
          >
            {item.lastMessage}
          </Text>
          {item.unreadCount > 0 && (
            <View className="bg-primary rounded-full w-5 h-5 items-center justify-center ml-2">
              <Text className="text-white text-xs font-bold">{item.unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );

  return (
    <ScreenContainer className="p-0">
      {/* Header */}
      <View className="px-4 pt-4 pb-2">
        <Text className="text-3xl font-bold text-foreground mb-4">Messages</Text>

        {/* Search Bar */}
        <View
          style={{
            backgroundColor: colors.surface,
            borderRadius: 12,
            paddingHorizontal: 12,
            paddingVertical: 10,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 18, marginRight: 8 }}>🔍</Text>
          <Text
            style={{
              flex: 1,
              color: colors.muted,
              fontSize: 14,
            }}
          >
            Search conversations...
          </Text>
        </View>
      </View>

      {/* Conversations List */}
      {filteredConversations.length > 0 ? (
        <FlatList
          data={filteredConversations}
          renderItem={renderConversation}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />
      ) : (
        <View className="flex-1 items-center justify-center">
          <Text className="text-lg font-semibold text-foreground mb-2">No messages yet</Text>
          <Text className="text-sm text-muted">Start a conversation with someone</Text>
        </View>
      )}

      {/* Floating Action Button */}
      <Pressable
        onPress={() => router.push("/messages/new")}
        className="absolute bottom-6 right-6 w-14 h-14 bg-primary rounded-full items-center justify-center shadow-lg"
      >
        <Text style={{ fontSize: 24 }}>✎</Text>
      </Pressable>
    </ScreenContainer>
  );
}
