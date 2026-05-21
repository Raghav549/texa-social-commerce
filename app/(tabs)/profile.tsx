import { View, Text, ScrollView, Pressable, Image } from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useAuthStore } from "@/lib/store/auth";
import { apiClient } from "@/lib/services/api";
import { User } from "@/types";

export default function ProfileScreen() {
  const router = useRouter();
  const { user: authUser, logout } = useAuthStore();
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"posts" | "reels" | "saved">("posts");

  useEffect(() => {
    if (authUser) {
      loadProfile();
    }
  }, [authUser]);

  const loadProfile = async () => {
    try {
      setLoading(true);
      if (authUser) {
        const response = await apiClient.getProfile(authUser.id);
        setProfile(response.data);
      }
    } catch (error) {
      console.error("Failed to load profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await apiClient.logout();
      await logout();
      router.replace("/welcome");
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  if (!profile) {
    return (
      <ScreenContainer className="p-6 justify-center items-center">
        <Text className="text-lg font-semibold text-foreground mb-4">Profile not found</Text>
        <Button onPress={handleLogout}>Logout</Button>
      </ScreenContainer>
    );
  }

  const stats = [
    { label: "Posts", value: "124" },
    { label: "Followers", value: profile.followerCount.toString() },
    { label: "Following", value: profile.followingCount.toString() },
  ];

  return (
    <ScreenContainer className="p-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View className="gap-4 mb-6">
          <View className="flex-row items-start justify-between">
            <View className="flex-row items-center gap-4 flex-1">
              <Avatar
                size="lg"
                source={profile.avatar}
                initials={profile.displayName.slice(0, 2)}
                verified={profile.verified}
              />
              <View className="flex-1">
                <View className="flex-row items-center gap-2 mb-1">
                  <Text className="text-xl font-bold text-foreground">{profile.displayName}</Text>
                  {profile.verified && <Badge variant="verified" label="✓" />}
                </View>
                <Text className="text-sm text-muted">@{profile.username}</Text>
                {profile.bio && (
                  <Text className="text-sm text-foreground mt-2">{profile.bio}</Text>
                )}
              </View>
            </View>
            <Pressable onPress={() => router.push("/settings")}>
              <Text className="text-2xl">⚙️</Text>
            </Pressable>
          </View>

          {/* Stats */}
          <View className="flex-row justify-around bg-surface rounded-lg p-4">
            {stats.map((stat) => (
              <View key={stat.label} className="items-center">
                <Text className="text-xl font-bold text-foreground">{stat.value}</Text>
                <Text className="text-xs text-muted">{stat.label}</Text>
              </View>
            ))}
          </View>

          {/* Action Buttons */}
          <View className="flex-row gap-2">
            <Button variant="secondary" className="flex-1">
              Edit Profile
            </Button>
            <Button variant="secondary" className="flex-1">
              Share
            </Button>
          </View>
        </View>

        {/* Tabs */}
        <View className="flex-row gap-4 mb-4 border-b border-border">
          {(["posts", "reels", "saved"] as const).map((tab) => (
            <Pressable
              key={tab}
              onPress={() => setActiveTab(tab)}
              className={`pb-3 ${activeTab === tab ? "border-b-2 border-primary" : ""}`}
            >
              <Text
                className={`capitalize font-semibold ${
                  activeTab === tab ? "text-primary" : "text-muted"
                }`}
              >
                {tab}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Content Grid */}
        <View className="flex-row flex-wrap gap-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <View key={i} className="w-1/3 aspect-square bg-surface rounded-lg" />
          ))}
        </View>

        {/* Logout Button */}
        <Button
          variant="danger"
          className="mt-8 mb-4"
          onPress={handleLogout}
        >
          Logout
        </Button>
      </ScrollView>
    </ScreenContainer>
  );
}
