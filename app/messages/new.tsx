import { View, Text, FlatList, Pressable, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { Avatar } from "@/components/ui/avatar";
import { useColors } from "@/hooks/use-colors";

interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  isFollowing: boolean;
}

export default function NewMessageScreen() {
  const router = useRouter();
  const colors = useColors();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const users: User[] = [
    {
      id: "1",
      name: "Sarah Chen",
      username: "sarahchen",
      avatar: "https://via.placeholder.com/48",
      isFollowing: true,
    },
    {
      id: "2",
      name: "Alex Kumar",
      username: "alexkumar",
      avatar: "https://via.placeholder.com/48",
      isFollowing: true,
    },
    {
      id: "3",
      name: "Emma Wilson",
      username: "emmawilson",
      avatar: "https://via.placeholder.com/48",
      isFollowing: false,
    },
  ];

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectUser = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleStartConversation = () => {
    if (selectedUsers.length === 0) return;
    // TODO: Create conversation and navigate to chat
    router.push(`/messages/chat/${selectedUsers[0]}`);
  };

  const renderUser = ({ item }: { item: User }) => (
    <Pressable
      onPress={() => handleSelectUser(item.id)}
      className="flex-row items-center gap-3 p-4 border-b border-border"
    >
      <View
        style={{
          width: 20,
          height: 20,
          borderRadius: 10,
          borderWidth: 2,
          borderColor: colors.primary,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {selectedUsers.includes(item.id) && (
          <View
            style={{
              width: 12,
              height: 12,
              borderRadius: 6,
              backgroundColor: colors.primary,
            }}
          />
        )}
      </View>

      <Avatar
        size="lg"
        source={item.avatar}
        initials={item.name.slice(0, 2)}
      />

      <View className="flex-1">
        <Text className="text-base font-semibold text-foreground">{item.name}</Text>
        <Text className="text-sm text-muted">@{item.username}</Text>
      </View>
    </Pressable>
  );

  return (
    <ScreenContainer className="p-0">
      {/* Header */}
      <View className="px-4 pt-4 pb-2 border-b" style={{ borderColor: colors.border }}>
        <View className="flex-row items-center justify-between mb-4">
          <Pressable onPress={() => router.back()}>
            <Text className="text-lg text-primary font-semibold">← Back</Text>
          </Pressable>
          <Text className="text-xl font-bold text-foreground">New Message</Text>
          <Pressable
            onPress={handleStartConversation}
            disabled={selectedUsers.length === 0}
          >
            <Text
              className={`text-lg font-semibold ${
                selectedUsers.length > 0 ? "text-primary" : "text-muted"
              }`}
            >
              Next
            </Text>
          </Pressable>
        </View>

        {/* Search Bar */}
        <View
          style={{
            backgroundColor: colors.surface,
            borderRadius: 12,
            paddingHorizontal: 12,
            paddingVertical: 10,
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <Text style={{ fontSize: 18, marginRight: 8 }}>🔍</Text>
          <TextInput
            placeholder="Search users..."
            placeholderTextColor={colors.muted}
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={{
              flex: 1,
              color: colors.foreground,
              fontSize: 14,
            }}
          />
        </View>
      </View>

      {/* Selected Users Chips */}
      {selectedUsers.length > 0 && (
        <View className="flex-row flex-wrap gap-2 px-4 py-3 border-b" style={{ borderColor: colors.border }}>
          {selectedUsers.map((userId) => {
            const user = users.find((u) => u.id === userId);
            return (
              <View
                key={userId}
                className="flex-row items-center gap-2 bg-primary rounded-full px-3 py-1"
              >
                <Text className="text-sm font-semibold text-background">{user?.name}</Text>
                <Pressable onPress={() => handleSelectUser(userId)}>
                  <Text className="text-background">✕</Text>
                </Pressable>
              </View>
            );
          })}
        </View>
      )}

      {/* Users List */}
      <FlatList
        data={filteredUsers}
        renderItem={renderUser}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center py-12">
            <Text className="text-lg font-semibold text-foreground mb-2">No users found</Text>
            <Text className="text-sm text-muted">Try searching for a different username</Text>
          </View>
        }
      />
    </ScreenContainer>
  );
}
