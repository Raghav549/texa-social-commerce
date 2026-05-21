import { View, ActivityIndicator } from "react-native";
import { useColors } from "@/hooks/use-colors";

interface LoadingSpinnerProps {
  size?: "small" | "large";
  fullScreen?: boolean;
}

export function LoadingSpinner({ size = "large", fullScreen = false }: LoadingSpinnerProps) {
  const colors = useColors();

  const content = (
    <ActivityIndicator
      size={size}
      color={colors.primary}
    />
  );

  if (fullScreen) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        {content}
      </View>
    );
  }

  return <View className="items-center justify-center p-6">{content}</View>;
}
