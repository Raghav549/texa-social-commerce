import { View, Text, ScrollView, Pressable, TextInput, FlatList, KeyboardAvoidingView, Platform } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useState, useEffect, useRef } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useColors } from "@/hooks/use-colors";
import { messagingService, Message } from "@/lib/messaging";
import { decryptMessage } from "@/lib/crypto";

export default function ChatScreen() {
  const router = useRouter();
  const colors = useColors();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [otherUserTyping, setOtherUserTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentUserId = "user_123"; // TODO: Get from auth store
  const recipientPublicKey = "test_public_key"; // TODO: Get from conversation data
  const userSecretKey = "test_secret_key"; // TODO: Get from secure storage

  useEffect(() => {
    // Subscribe to messages
    const unsubscribe = messagingService.onMessage((message: Message) => {
      setMessages((prev) => [...prev, message]);
      scrollViewRef.current?.scrollToEnd({ animated: true });
    });

    // Subscribe to typing indicators
    const unsubscribeTyping = messagingService.onTyping((data) => {
      if (data.userId !== currentUserId) {
        setOtherUserTyping(data.isTyping);
      }
    });

    return () => {
      unsubscribe();
      unsubscribeTyping();
    };
  }, []);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    try {
      messagingService.sendMessage(
        id as string,
        inputText,
        recipientPublicKey,
        userSecretKey
      );
      setInputText("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleTyping = (text: string) => {
    setInputText(text);

    if (!isTyping) {
      setIsTyping(true);
      messagingService.sendTypingIndicator(id as string, true);
    }

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set new timeout to stop typing indicator
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      messagingService.sendTypingIndicator(id as string, false);
    }, 3000);
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isOwn = item.senderId === currentUserId;

    let decryptedContent = item.content;
    try {
      if (item.encrypted) {
        decryptedContent = decryptMessage(item.encrypted, userSecretKey);
      }
    } catch (error) {
      decryptedContent = "[Encrypted message]";
    }

    return (
      <View
        className={`flex-row gap-2 mb-3 ${isOwn ? "justify-end" : "justify-start"}`}
      >
        {!isOwn && (
          <Avatar size="sm" source={item.senderAvatar} initials={item.senderName[0]} />
        )}

        <Card
          variant="default"
          className={`max-w-xs px-3 py-2 ${
            isOwn ? "bg-primary" : "bg-surface"
          }`}
        >
          {!isOwn && (
            <Text className="text-xs font-semibold text-muted mb-1">
              {item.senderName}
            </Text>
          )}
          <Text
            className={`text-sm ${
              isOwn ? "text-background" : "text-foreground"
            }`}
          >
            {decryptedContent}
          </Text>
          <Text
            className={`text-xs mt-1 ${
              isOwn ? "text-background opacity-70" : "text-muted"
            }`}
          >
            {new Date(item.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </Card>

        {isOwn && (
          <Avatar size="sm" initials="You" />
        )}
      </View>
    );
  };

  return (
    <ScreenContainer className="p-0">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        {/* Header */}
        <View
          className="flex-row items-center justify-between px-4 py-3 border-b"
          style={{ borderColor: colors.border }}
        >
          <Pressable onPress={() => router.back()}>
            <Text className="text-lg text-primary">←</Text>
          </Pressable>
          <View className="flex-1 items-center">
            <Text className="text-lg font-bold text-foreground">Chat Name</Text>
            <Text className="text-xs text-muted">🔒 End-to-end encrypted</Text>
          </View>
          <Pressable>
            <Text className="text-lg">⋯</Text>
          </Pressable>
        </View>

        {/* Messages */}
        <ScrollView
          ref={scrollViewRef}
          className="flex-1 px-4 py-4"
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() =>
            scrollViewRef.current?.scrollToEnd({ animated: true })
          }
        >
          <FlatList
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />

          {otherUserTyping && (
            <View className="flex-row gap-2 mb-3">
              <Avatar size="sm" initials="..." />
              <Card variant="default" className="px-3 py-2">
                <Text className="text-sm text-muted">typing...</Text>
              </Card>
            </View>
          )}
        </ScrollView>

        {/* Input */}
        <View
          className="px-4 py-3 border-t flex-row gap-2 items-end"
          style={{ borderColor: colors.border }}
        >
          <View
            className="flex-1 flex-row items-center rounded-full px-4 py-2"
            style={{ backgroundColor: colors.surface }}
          >
            <TextInput
              placeholder="Type a message..."
              placeholderTextColor={colors.muted}
              value={inputText}
              onChangeText={handleTyping}
              multiline
              maxLength={500}
              style={{
                flex: 1,
                color: colors.foreground,
                fontSize: 14,
                maxHeight: 100,
              }}
            />
          </View>

          <Pressable
            onPress={handleSendMessage}
            disabled={!inputText.trim()}
            className="w-10 h-10 rounded-full items-center justify-center"
            style={{ backgroundColor: colors.primary }}
          >
            <Text className="text-lg">✈️</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}
