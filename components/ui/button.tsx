import { Pressable, Text, type PressableProps, type ViewStyle } from "react-native";
import { cn } from "@/lib/utils";
import { useColors } from "@/hooks/use-colors";

interface ButtonProps extends PressableProps {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
  textClassName?: string;
  disabled?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  children,
  className,
  textClassName,
  disabled = false,
  style,
  ...props
}: ButtonProps) {
  const colors = useColors();

  const baseStyle: ViewStyle = {
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    opacity: disabled ? 0.5 : 1,
  };

  const variantStyles: Record<string, ViewStyle> = {
    primary: {
      backgroundColor: colors.primary,
    },
    secondary: {
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
    },
    ghost: {
      backgroundColor: "transparent",
    },
    danger: {
      backgroundColor: colors.error,
    },
  };

  const sizeStyles: Record<string, ViewStyle> = {
    sm: {
      paddingHorizontal: 12,
      paddingVertical: 8,
      minHeight: 32,
    },
    md: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      minHeight: 44,
    },
    lg: {
      paddingHorizontal: 20,
      paddingVertical: 14,
      minHeight: 52,
    },
  };

  const textColorMap: Record<string, string> = {
    primary: colors.background,
    secondary: colors.foreground,
    ghost: colors.primary,
    danger: colors.background,
  };

  const textSizeMap: Record<string, number> = {
    sm: 13,
    md: 15,
    lg: 16,
  };

  return (
    <Pressable
      disabled={disabled}
      style={({ pressed }) => [
        baseStyle,
        variantStyles[variant],
        sizeStyles[size],
        pressed && { transform: [{ scale: 0.97 }], opacity: 0.9 },
        style,
      ]}
      {...props}
    >
      <Text
        className={cn(
          "font-semibold",
          textClassName
        )}
        style={{
          color: textColorMap[variant],
          fontSize: textSizeMap[size],
        }}
      >
        {children}
      </Text>
    </Pressable>
  );
}
