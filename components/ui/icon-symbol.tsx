// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SymbolWeight, SymbolViewProps } from "expo-symbols";
import { ComponentProps } from "react";
import { OpaqueColorValue, type StyleProp, type TextStyle } from "react-native";

type IconMapping = Record<string, ComponentProps<typeof MaterialIcons>["name"]>;
type IconSymbolName = keyof typeof MAPPING;

/**
 * SF Symbols to Material Icons mappings
 * - SF Symbols: https://developer.apple.com/sf-symbols/
 * - Material Icons: https://icons.expo.fyi/
 */
const MAPPING: IconMapping = {
  "house.fill": "home",
  "paperplane.fill": "send",
  "person.fill": "person",
  "magnifyingglass": "search",
  "plus.circle.fill": "add-circle",
  "play.rectangle.fill": "play-arrow",
  "chevron.left.forwardslash.chevron.right": "code",
  "chevron.right": "chevron-right",
  "heart.fill": "favorite",
  "heart": "favorite-border",
  "bubble.right.fill": "chat-bubble",
  "bookmark.fill": "bookmark",
  "bookmark": "bookmark-border",
  "share": "share",
  "ellipsis": "more-vert",
  "gear": "settings",
  "arrow.left": "arrow-back",
  "xmark": "close",
  "checkmark": "check",
};

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  const materialIconName = MAPPING[name as string];
  
  if (!materialIconName) {
    console.warn(`IconSymbol: No mapping found for "${name}". Using "help" as fallback.`);
    return <MaterialIcons color={color} size={size} name="help" style={style} />;
  }
  
  return <MaterialIcons color={color} size={size} name={materialIconName} style={style} />;
}
