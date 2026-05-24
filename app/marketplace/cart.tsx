import { View, Text, ScrollView, Pressable, Image, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useColors } from "@/hooks/use-colors";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export default function CartScreen() {
  const router = useRouter();
  const colors = useColors();
  const [items, setItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "UI Kit - Modern",
      price: 29.99,
      image: "https://via.placeholder.com/80",
      quantity: 1,
    },
    {
      id: "2",
      name: "Icon Pack - 500+",
      price: 19.99,
      image: "https://via.placeholder.com/80",
      quantity: 2,
    },
  ]);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      setItems(items.filter((item) => item.id !== id));
    } else {
      setItems(
        items.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const renderItem = ({ item }: { item: CartItem }) => (
    <Card variant="default" className="flex-row gap-3 mb-3">
      <Image
        source={{ uri: item.image }}
        style={{
          width: 80,
          height: 80,
          borderRadius: 8,
        }}
      />
      <View className="flex-1">
        <Text className="text-sm font-semibold text-foreground">{item.name}</Text>
        <Text className="text-lg font-bold text-primary mt-1">${item.price}</Text>
        <View className="flex-row items-center gap-2 mt-2">
          <Pressable
            onPress={() => updateQuantity(item.id, item.quantity - 1)}
            className="w-6 h-6 rounded-full items-center justify-center"
            style={{ backgroundColor: colors.surface }}
          >
            <Text className="text-sm">−</Text>
          </Pressable>
          <Text className="text-sm font-semibold text-foreground">{item.quantity}</Text>
          <Pressable
            onPress={() => updateQuantity(item.id, item.quantity + 1)}
            className="w-6 h-6 rounded-full items-center justify-center"
            style={{ backgroundColor: colors.surface }}
          >
            <Text className="text-sm">+</Text>
          </Pressable>
          <View className="flex-1" />
          <Pressable onPress={() => updateQuantity(item.id, 0)}>
            <Text className="text-error">✕</Text>
          </Pressable>
        </View>
      </View>
    </Card>
  );

  return (
    <ScreenContainer className="p-4">
      {items.length > 0 ? (
        <>
          <View className="flex-row items-center justify-between mb-4">
            <Pressable onPress={() => router.back()}>
              <Text className="text-lg text-primary">←</Text>
            </Pressable>
            <Text className="text-2xl font-bold text-foreground">Shopping Cart</Text>
            <Text className="text-sm font-semibold text-muted">{items.length} items</Text>
          </View>

          <FlatList
            data={items}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            contentContainerStyle={{ marginBottom: 16 }}
          />

          {/* Summary */}
          <Card variant="default" className="gap-3 mb-4">
            <View className="flex-row justify-between">
              <Text className="text-sm text-muted">Subtotal</Text>
              <Text className="text-sm font-semibold text-foreground">${subtotal.toFixed(2)}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-sm text-muted">Tax (10%)</Text>
              <Text className="text-sm font-semibold text-foreground">${tax.toFixed(2)}</Text>
            </View>
            <View
              className="border-t pt-3"
              style={{ borderColor: colors.border }}
            >
              <View className="flex-row justify-between">
                <Text className="text-base font-bold text-foreground">Total</Text>
                <Text className="text-lg font-bold text-primary">${total.toFixed(2)}</Text>
              </View>
            </View>
          </Card>

          {/* Checkout Button */}
          <Button size="lg" onPress={() => router.back()}>
            Proceed to Checkout
          </Button>
        </>
      ) : (
        <View className="flex-1 items-center justify-center">
          <Text style={{ fontSize: 48 }} className="mb-2">
            🛒
          </Text>
          <Text className="text-lg font-semibold text-foreground mb-2">Your cart is empty</Text>
          <Text className="text-sm text-muted mb-6">Add items to get started</Text>
          <Button onPress={() => router.back()}>
            Continue Shopping
          </Button>
        </View>
      )}
    </ScreenContainer>
  );
}
