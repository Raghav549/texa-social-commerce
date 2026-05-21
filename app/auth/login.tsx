import { ScrollView, View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { Button } from "@/components/ui/button";
import { TextInput } from "@/components/ui/text-input";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useAuthStore } from "@/lib/store/auth";
import { apiClient } from "@/lib/services/api";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { setToken, setUser } = useAuthStore();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await apiClient.login(email, password);
      const { token, user } = response.data;

      await setToken(token);
      setUser(user);

      router.replace("/(tabs)");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
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
            <Text className="text-4xl font-bold text-foreground">Welcome Back</Text>
            <Text className="text-base text-muted">Sign in to your TEXA account</Text>
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
              label="Password"
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              editable={!loading}
            />

            <Pressable onPress={() => router.push("/auth/forgot-password")}>
              <Text className="text-sm font-medium text-primary">Forgot Password?</Text>
            </Pressable>
          </View>

          {/* Login Button */}
          <Button
            size="lg"
            onPress={handleLogin}
            disabled={loading}
          >
            Sign In
          </Button>

          {/* Sign Up Link */}
          <View className="flex-row justify-center gap-1">
            <Text className="text-sm text-muted">Don't have an account?</Text>
            <Pressable onPress={() => router.push("/auth/signup")}>
              <Text className="text-sm font-semibold text-primary">Sign Up</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
