import { useEffect } from "react";
import { Stack } from "expo-router";
import { ThemeProvider } from "@/lib/theme-provider";
import { useAuthStore } from "@/lib/store/auth";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function RootLayout() {
  const { isLoading, isAuthenticated, restoreToken } = useAuthStore();

  useEffect(() => {
    restoreToken();
  }, []);

  if (isLoading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <ThemeProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        {isAuthenticated ? (
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        ) : (
          <>
            <Stack.Screen name="auth/login" />
            <Stack.Screen name="auth/signup" />
            <Stack.Screen name="auth/forgot-password" />
            <Stack.Screen name="welcome" />
          </>
        )}
        <Stack.Screen name="chat/[id]" />
        <Stack.Screen name="settings" />
      </Stack>
    </ThemeProvider>
  );
}
