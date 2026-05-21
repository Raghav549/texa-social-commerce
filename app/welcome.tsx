import { View, Text, Image } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { Button } from "@/components/ui/button";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <ScreenContainer className="p-6">
      <View className="flex-1 justify-between">
        {/* Logo & Title */}
        <View className="flex-1 justify-center items-center gap-6">
          <View className="w-24 h-24 bg-primary rounded-full items-center justify-center">
            <Text className="text-5xl font-bold text-background">T</Text>
          </View>
          <View className="gap-2 items-center">
            <Text className="text-5xl font-bold text-foreground">TEXA</Text>
            <Text className="text-lg font-semibold text-primary">Create. Connect. Commerce.</Text>
          </View>
        </View>

        {/* Description */}
        <View className="gap-4 mb-8">
          <Text className="text-base text-muted text-center leading-relaxed">
            Join the premium social platform where creators thrive, communities connect, and commerce flows seamlessly.
          </Text>

          {/* Buttons */}
          <View className="gap-3">
            <Button
              size="lg"
              onPress={() => router.push("/auth/signup")}
            >
              Create Account
            </Button>
            <Button
              size="lg"
              variant="secondary"
              onPress={() => router.push("/auth/login")}
            >
              Sign In
            </Button>
          </View>
        </View>
      </View>
    </ScreenContainer>
  );
}
