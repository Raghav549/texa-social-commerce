import { ScrollView, View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { Button } from "@/components/ui/button";
import { TextInput } from "@/components/ui/text-input";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useAuthStore } from "@/lib/store/auth";
import { apiClient } from "@/lib/services/api";

export default function SignupScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { setToken, setUser } = useAuthStore();

  const handleSignup = async () => {
    if (!email || !username || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await apiClient.register(email, password, username);
      const { token, user } = response.data;

      await setToken(token);
      setUser(user);

      router.replace("/(tabs)");
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <ScreenContainer className="p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="flex-1 justify-center gap-8">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-4xl font-bold text-foreground">Create Account</Text>
            <Text className="text-base text-muted">Join TEXA and start creating</Text>
          </View>

          {/* Form */}
          <View className="gap-4">
            {error && (
              <View className="bg-error/10 border border-error rounded-lg p-3">
                <Text className="text-sm text-error font-medium">{error}</Text>
              </View>
            )}

            <TextInput
              label="Email"
              placeholder="you@example.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!loading}
            />

            <TextInput
              label="Username"
              placeholder="your_username"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              editable={!loading}
            />

            <TextInput
              label="Password"
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              editable={!loading}
            />

            <TextInput
              label="Confirm Password"
              placeholder="••••••••"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              editable={!loading}
            />
          </View>

          {/* Signup Button */}
          <Button
            size="lg"
            onPress={handleSignup}
            disabled={loading}
          >
            Create Account
          </Button>

          {/* Login Link */}
          <View className="flex-row justify-center gap-1">
            <Text className="text-sm text-muted">Already have an account?</Text>
            <Pressable onPress={() => router.push("/auth/login")}>
              <Text className="text-sm font-semibold text-primary">Sign In</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
