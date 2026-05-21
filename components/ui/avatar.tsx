import { Image, View, Text } from "react-native";
import { useColors } from "@/hooks/use-colors";

interface AvatarProps {
  size?: "sm" | "md" | "lg" | "xl";
  source?: string;
  initials?: string;
  verified?: boolean;
}

export function Avatar({
  size = "md",
  source,
  initials = "?",
  verified = false,
}: AvatarProps) {
  const colors = useColors();

  const sizeMap = {
    sm: 32,
    md: 48,
    lg: 64,
    xl: 96,
  };

  const badgeSizeMap = {
    sm: 12,
    md: 16,
    lg: 20,
    xl: 28,
  };

  const dimension = sizeMap[size];
  const badgeSize = badgeSizeMap[size];

  return (
    <View style={{ position: "relative", width: dimension, height: dimension }}>
      {source ? (
        <Image
          source={{ uri: source }}
          style={{
            width: dimension,
            height: dimension,
            borderRadius: dimension / 2,
            backgroundColor: colors.surface,
          }}
        />
      ) : (
        <View
          style={{
            width: dimension,
            height: dimension,
            borderRadius: dimension / 2,
            backgroundColor: colors.primary,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: colors.background,
              fontSize: dimension / 2.5,
              fontWeight: "600",
            }}
          >
            {initials.slice(0, 2).toUpperCase()}
          </Text>
        </View>
      )}

      {verified && (
        <View
          style={{
            position: "absolute",
            bottom: -2,
            right: -2,
            width: badgeSize,
            height: badgeSize,
            borderRadius: badgeSize / 2,
            backgroundColor: colors.primary,
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 2,
            borderColor: colors.background,
          }}
        >
          <Text style={{ fontSize: badgeSize * 0.6, color: colors.background }}>✓</Text>
        </View>
      )}
    </View>
  );
}
