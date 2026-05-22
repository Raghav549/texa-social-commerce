import { View, Text, FlatList, Pressable, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useState, useEffect, useRef } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { Avatar } from "@/components/ui/avatar";
import { useColors } from "@/hooks/use-colors";

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
  status: "sent" | "delivered" | "read";
}

export default function ChatScreen() {
  const router = useRouter();
  const colors = useColors();
  const { id } = useLocalSearchParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    loadMessages();
  }, [id]);

  const loadMessages = async () => {
    // TODO: Call API to fetch messages
    const mockMessages: Message[] = [
      {
        id: "1",
        senderId: "other",
        senderName: "Sarah Chen",
        senderAvatar: "https://via.placeholder.com/48",
        content: "Hey! How are you doing?",
        timestamp: "10:30 AM",
        isOwn: false,
        status: "read",
      },
      {
        id: "2",
        senderId: "me",
        senderName: "You",
        senderAvatar: "https://via.placeholder.com/48",
        content: "I'm doing great! How about you?",
        timestamp: "10:32 AM",
        isOwn: true,
        status: "read",
      },
      {
        id: "3",
        senderId: "other",
        senderName: "Sarah Chen",
        senderAvatar: "https://via.placeholder.com/48",
        content: "Pretty good! Want to grab coffee later?",
        timestamp: "10:35 AM",
        isOwn: false,
        status: "read",
      },
    ];
    setMessages(mockMessages);
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: "me",
      senderName: "You",
      senderAvatar: "https://via.placeholder.com/48",
      content: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isOwn: true,
      status: "sent",
    };

    setMessages([...messages, newMessage]);
    setInputText("");

    // TODO: Call API to send message
    flatListRef.current?.scrollToEnd({ animated: true });
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View className={`flex-row gap-2 px-4 py-2 ${item.isOwn ? "justify-end" : "justify-start"}`}>
      {!item.isOwn && (
        <Avatar
          size="sm"
          source={item.senderAvatar}
          initials={item.senderName.slice(0, 2)}
        />
      )}

      <View
        className={`max-w-xs rounded-2xl px-4 py-2 ${
          item.isOwn
            ? "bg-primary"
            : "bg-surface"
        }`}
      >
        <Text
          className={`text-sm ${
            item.isOwn ? "text-background" : "text-foreground"
          }`}
        >
          {item.content}
        </Text>
        <View className="flex-row items-center gap-1 mt-1">
          <Text
            className={`text-xs ${
              item.isOwn ? "text-background/70" : "text-muted"
            }`}
          >
            {item.timestamp}
          </Text>
          {item.isOwn && (
            <Text className="text-xs text-background/70">
              {item.status === "read" ? "✓✓" : item.status === "delivered" ? "✓✓" : "✓"}
            </Text>
          )}
        </View>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <ScreenContainer className="p-0" edges={["top", "left", "right"]}>
        {/* Header */}
        <View
          className="flex-row items-center justify-between px-4 py-3 border-b"
          style={{ borderColor: colors.border }}
        >
          <View className="flex-row items-center gap-3 flex-1">
            <Pressable onPress={() => router.back()}>
              <Text className="text-lg text-primary">←</Text>
            </Pressable>
            <Avatar
              size="md"
              source="https://via.placeholder.com/48"
              initials="SC"
            />
            <View>
              <Text className="text-base font-semibold text-foreground">Sarah Chen</Text>
              <Text className="text-xs text-muted">Active now</Text>
            </View>
          </View>
          <Pressable>
            <Text className="text-lg">⋯</Text>
          </Pressable>
        </View>

        {/* Messages List */}
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          contentContainerStyle={{ paddingVertical: 8 }}
        />

        {/* Typing Indicator */}
        {isTyping && (
          <View className="flex-row gap-2 px-4 py-2">
            <Avatar size="sm" initials="SC" />
            <View className="bg-surface rounded-2xl px-4 py-2">
              <Text className="text-muted">typing...</Text>
            </View>
          </View>
        )}

        {/* Input Area */}
        <View
          className="flex-row items-center gap-2 px-4 py-3 border-t"
          style={{ borderColor: colors.border }}
        >
          <Pressable>
            <Text className="text-2xl">+</Text>
          </Pressable>

          <View
            className="flex-1 flex-row items-center rounded-full px-4"
            style={{
              backgroundColor: colors.surface,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <TextInput
              placeholder="Message..."
              placeholderTextColor={colors.muted}
              value={inputText}
              onChangeText={setInputText}
              multiline
              maxLength={1000}
              style={{
                flex: 1,
                color: colors.foreground,
                fontSize: 14,
                paddingVertical: 10,
              }}
            />
          </View>

          <Pressable
            onPress={handleSendMessage}
            disabled={!inputText.trim()}
          >
            <Text className={`text-2xl ${inputText.trim() ? "text-primary" : "text-muted"}`}>
              ↗️
            </Text>
          </Pressable>
        </View>
      </ScreenContainer>
    </KeyboardAvoidingView>
  );
}
