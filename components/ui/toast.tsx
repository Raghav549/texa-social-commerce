import { View, Text, Pressable } from "react-native";
import { useColors } from "@/hooks/use-colors";
import { cn } from "@/lib/utils";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info" | "warning";
  onDismiss?: () => void;
  duration?: number;
}

export function Toast({
  message,
  type = "info",
  onDismiss,
  duration = 3000,
}: ToastProps) {
  const colors = useColors();

  const typeStyles = {
    success: {
      backgroundColor: colors.success,
      textColor: colors.background,
    },
    error: {
      backgroundColor: colors.error,
      textColor: colors.background,
    },
    info: {
      backgroundColor: colors.primary,
      textColor: colors.background,
    },
    warning: {
      backgroundColor: colors.warning,
      textColor: colors.background,
    },
  };

  const style = typeStyles[type];

  return (
    <Pressable
      onPress={onDismiss}
      style={{
        backgroundColor: style.backgroundColor,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 12,
        marginHorizontal: 16,
        marginBottom: 16,
      }}
    >
      <Text
        style={{
          color: style.textColor,
          fontSize: 14,
          fontWeight: "500",
        }}
      >
        {message}
      </Text>
    </Pressable>
  );
}
