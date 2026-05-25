import { Pressable, Text, type PressableProps } from "react-native";
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
  onPress,
  ...props
}: ButtonProps) {
  const colors = useColors();

  const variantBgColor: Record<string, string> = {
    primary: colors.primary,
    secondary: colors.surface,
    ghost: "transparent",
    danger: colors.error,
  };

  const sizeConfig = {
    sm: { px: 12, py: 8, minHeight: 32, fontSize: 13 },
    md: { px: 16, py: 12, minHeight: 44, fontSize: 15 },
    lg: { px: 20, py: 14, minHeight: 52, fontSize: 16 },
  }[size];

  const textColorMap: Record<string, string> = {
    primary: colors.background,
    secondary: colors.foreground,
    ghost: colors.primary,
    danger: colors.background,
  };

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => ({
        paddingHorizontal: sizeConfig.px,
        paddingVertical: sizeConfig.py,
        minHeight: sizeConfig.minHeight,
        borderRadius: 12,
        backgroundColor: variantBgColor[variant],
        justifyContent: "center",
        alignItems: "center",
        opacity: disabled ? 0.5 : pressed ? 0.9 : 1,
        transform: pressed ? [{ scale: 0.97 }] : [{ scale: 1 }],
        ...(variant === "secondary" && {
          borderWidth: 1,
          borderColor: colors.border,
        }),
      })}
      {...props}
    >
      <Text
        className={cn("font-semibold", textClassName)}
        style={{
          color: textColorMap[variant],
          fontSize: sizeConfig.fontSize,
        }}
      >
        {children}
      </Text>
    </Pressable>
  );
}
