import { View, type ViewProps } from "react-native";
import { cn } from "@/lib/utils";

interface CardProps extends ViewProps {
  variant?: "default" | "glass" | "elevated";
  className?: string;
}

export function Card({
  variant = "default",
  className,
  children,
  ...props
}: CardProps) {
  const variantStyles = {
    default: "bg-surface border border-border rounded-2xl",
    glass: "bg-glass border border-border rounded-2xl backdrop-blur",
    elevated: "bg-surface rounded-2xl shadow-lg",
  };

  return (
    <View
      className={cn(
        "p-4",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </View>
  );
}
