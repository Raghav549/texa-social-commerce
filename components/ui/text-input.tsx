import { TextInput as RNTextInput, View, Text, type TextInputProps as RNTextInputProps } from "react-native";
import { useColors } from "@/hooks/use-colors";
import { cn } from "@/lib/utils";

interface TextInputProps extends RNTextInputProps {
  label?: string;
  error?: string;
  containerClassName?: string;
}

export function TextInput({
  label,
  error,
  containerClassName,
  className,
  ...props
}: TextInputProps) {
  const colors = useColors();

  return (
    <View className={cn("gap-2", containerClassName)}>
      {label && (
        <Text className="text-sm font-semibold text-foreground">
          {label}
        </Text>
      )}
      <RNTextInput
        placeholderTextColor={colors.muted}
        style={{
          backgroundColor: colors.surface,
          borderColor: error ? colors.error : colors.border,
          borderWidth: 1,
          borderRadius: 12,
          paddingHorizontal: 16,
          paddingVertical: 12,
          color: colors.foreground,
          fontSize: 15,
          fontFamily: "System",
        }}
        {...props}
      />
      {error && (
        <Text className="text-xs font-medium text-error">
          {error}
        </Text>
      )}
    </View>
  );
}
