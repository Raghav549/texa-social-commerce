import { View, Text, ScrollView, Pressable, Image, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useColors } from "@/hooks/use-colors";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  inStock: boolean;
}

export default function MarketplaceStoreScreen() {
  const router = useRouter();
  const colors = useColors();
  const [activeTab, setActiveTab] = useState<"products" | "reviews" | "analytics">("products");

  const storeInfo = {
    name: "Premium Designs",
    avatar: "https://via.placeholder.com/80",
    followers: "5.2K",
    rating: 4.8,
    reviews: 342,
    description: "Premium digital products and designs",
  };

  const products: Product[] = [
    {
      id: "1",
      name: "UI Kit - Modern",
      price: 29.99,
      image: "https://via.placeholder.com/150",
      rating: 4.9,
      reviews: 128,
      inStock: true,
    },
    {
      id: "2",
      name: "Icon Pack - 500+",
      price: 19.99,
      image: "https://via.placeholder.com/150",
      rating: 4.7,
      reviews: 95,
      inStock: true,
    },
    {
      id: "3",
      name: "Template Bundle",
      price: 49.99,
      image: "https://via.placeholder.com/150",
      rating: 4.8,
      reviews: 156,
      inStock: false,
    },
  ];

  const renderProduct = ({ item }: { item: Product }) => (
    <Pressable className="mb-3">
      <Card variant="default" className="flex-row gap-3">
        <Image
          source={{ uri: item.image }}
          style={{
            width: 80,
            height: 80,
            borderRadius: 8,
          }}
        />
        <View className="flex-1 justify-between">
          <View>
            <Text className="text-sm font-semibold text-foreground">{item.name}</Text>
            <View className="flex-row items-center gap-1 mt-1">
              <Text className="text-xs text-yellow-500">★</Text>
              <Text className="text-xs text-muted">{item.rating}</Text>
              <Text className="text-xs text-muted">({item.reviews})</Text>
            </View>
          </View>
          <View className="flex-row items-center justify-between">
            <Text className="text-lg font-bold text-primary">${item.price}</Text>
            <Text className={`text-xs font-semibold ${item.inStock ? "text-success" : "text-error"}`}>
              {item.inStock ? "In Stock" : "Out of Stock"}
            </Text>
          </View>
        </View>
      </Card>
    </Pressable>
  );

  return (
    <ScreenContainer className="p-0">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Store Header */}
        <View className="px-4 pt-4 pb-6 border-b" style={{ borderColor: colors.border }}>
          <View className="flex-row items-center justify-between mb-4">
            <Pressable onPress={() => router.back()}>
              <Text className="text-lg text-primary">←</Text>
            </Pressable>
            <Pressable>
              <Text className="text-lg">⋯</Text>
            </Pressable>
          </View>

          <View className="flex-row gap-4">
            <Avatar size="lg" source={storeInfo.avatar} initials="PD" />
            <View className="flex-1">
              <Text className="text-lg font-bold text-foreground">{storeInfo.name}</Text>
              <View className="flex-row items-center gap-2 mt-1">
                <Text className="text-xs text-yellow-500">★ {storeInfo.rating}</Text>
                <Text className="text-xs text-muted">({storeInfo.reviews} reviews)</Text>
              </View>
              <Text className="text-xs text-muted mt-1">{storeInfo.followers} followers</Text>
            </View>
          </View>

          <Text className="text-sm text-muted mt-3">{storeInfo.description}</Text>

          <View className="flex-row gap-2 mt-4">
            <Button variant="secondary" className="flex-1">
              Follow
            </Button>
            <Button className="flex-1">
              Message
            </Button>
          </View>
        </View>

        {/* Tabs */}
        <View className="flex-row gap-4 px-4 py-4 border-b" style={{ borderColor: colors.border }}>
          {(["products", "reviews", "analytics"] as const).map((tab) => (
            <Pressable
              key={tab}
              onPress={() => setActiveTab(tab)}
              className={`pb-2 border-b-2 ${
                activeTab === tab ? "border-primary" : "border-transparent"
              }`}
            >
              <Text
                className={`capitalize font-semibold ${
                  activeTab === tab ? "text-primary" : "text-muted"
                }`}
              >
                {tab}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Content */}
        <View className="px-4 py-4">
          {activeTab === "products" && (
            <View>
              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-lg font-bold text-foreground">Products ({products.length})</Text>
                <Pressable>
                  <Text className="text-primary font-semibold">+ Add</Text>
                </Pressable>
              </View>
              <FlatList
                data={products}
                renderItem={renderProduct}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
              />
            </View>
          )}

          {activeTab === "reviews" && (
            <View>
              <Text className="text-lg font-bold text-foreground mb-4">Customer Reviews</Text>
              {[1, 2, 3].map((i) => (
                <Card key={i} variant="default" className="mb-3">
                  <View className="flex-row gap-3">
                    <Avatar size="md" initials="CR" />
                    <View className="flex-1">
                      <View className="flex-row items-center justify-between">
                        <Text className="font-semibold text-foreground">Customer Name</Text>
                        <Text className="text-xs text-yellow-500">★★★★★</Text>
                      </View>
                      <Text className="text-sm text-muted mt-1">Great product quality and fast shipping!</Text>
                      <Text className="text-xs text-muted mt-2">2 days ago</Text>
                    </View>
                  </View>
                </Card>
              ))}
            </View>
          )}

          {activeTab === "analytics" && (
            <View>
              <Text className="text-lg font-bold text-foreground mb-4">Store Analytics</Text>
              <Card variant="default" className="gap-4">
                <View className="flex-row justify-between">
                  <View>
                    <Text className="text-sm text-muted">Total Sales</Text>
                    <Text className="text-2xl font-bold text-foreground mt-1">$3,245</Text>
                  </View>
                  <Text className="text-sm text-success">+12.5%</Text>
                </View>
              </Card>
              <Card variant="default" className="gap-4 mt-3">
                <View className="flex-row justify-between">
                  <View>
                    <Text className="text-sm text-muted">Orders</Text>
                    <Text className="text-2xl font-bold text-foreground mt-1">142</Text>
                  </View>
                  <Text className="text-sm text-success">+8.2%</Text>
                </View>
              </Card>
            </View>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
