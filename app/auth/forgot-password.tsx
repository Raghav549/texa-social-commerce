import { ScrollView, View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { Button } from "@/components/ui/button";
import { TextInput } from "@/components/ui/text-input";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleReset = async () => {
    if (!email) {
      setError("Please enter your email");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // TODO: Call API to send reset email
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Failed to send reset email");
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
            <Pressable onPress={() => router.back()}>
              <Text className="text-lg text-primary font-semibold">← Back</Text>
            </Pressable>
            <Text className="text-4xl font-bold text-foreground mt-4">Reset Password</Text>
            <Text className="text-base text-muted">
              Enter your email and we'll send you a link to reset your password
            </Text>
          </View>

          {/* Success Message */}
          {success && (
            <View className="bg-success/10 border border-success rounded-lg p-4">
              <Text className="text-sm text-success font-medium">
                Check your email for a password reset link
              </Text>
            </View>
          )}

          {/* Form */}
          {!success && (
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

              <Button
                size="lg"
                onPress={handleReset}
                disabled={loading}
              >
                Send Reset Link
              </Button>
            </View>
          )}

          {/* Back to Login */}
          {success && (
            <Button
              size="lg"
              variant="secondary"
              onPress={() => router.push("/auth/login")}
            >
              Back to Login
            </Button>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
