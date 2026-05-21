import { View, Text } from "react-native";
import { useColors } from "@/hooks/use-colors";
import { cn } from "@/lib/utils";

interface BadgeProps {
  variant?: "verified" | "creator" | "seller" | "primary" | "secondary";
  label: string;
  className?: string;
}

export function Badge({ variant = "primary", label, className }: BadgeProps) {
  const colors = useColors();

  const variantStyles = {
    verified: {
      backgroundColor: colors.primary,
      textColor: colors.background,
    },
    creator: {
      backgroundColor: colors.purple,
      textColor: colors.background,
    },
    seller: {
      backgroundColor: colors.gold,
      textColor: colors.background,
    },
    primary: {
      backgroundColor: colors.primary,
      textColor: colors.background,
    },
    secondary: {
      backgroundColor: colors.surface,
      textColor: colors.foreground,
    },
  };

  const style = variantStyles[variant];

  return (
    <View
      className={cn("px-2 py-1 rounded-full", className)}
      style={{ backgroundColor: style.backgroundColor }}
    >
      <Text
        style={{
          color: style.textColor,
          fontSize: 11,
          fontWeight: "600",
        }}
      >
        {label}
      </Text>
    </View>
  );
}
