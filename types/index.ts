export interface User {
  id: string;
  username: string;
  email?: string;
  phone?: string;
  displayName: string;
  bio?: string;
  avatar?: string;
  coverPhoto?: string;
  verified: boolean;
  role: "user" | "creator" | "seller" | "admin" | "moderator";
  followerCount: number;
  followingCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface AuthToken {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface Post {
  id: string;
  authorId: string;
  author?: User;
  caption?: string;
  media: PostMedia[];
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  liked?: boolean;
  saved?: boolean;
  visibility: "public" | "followers" | "close_friends" | "private";
  createdAt: string;
  updatedAt: string;
}

export interface PostMedia {
  id: string;
  postId: string;
  type: "image" | "video";
  url: string;
  thumbnail?: string;
  duration?: number;
  order: number;
}

export interface Story {
  id: string;
  authorId: string;
  author?: User;
  media: string;
  mediaType: "image" | "video";
  caption?: string;
  views: number;
  viewed?: boolean;
  expiresAt: string;
  createdAt: string;
}

export interface Reel {
  id: string;
  authorId: string;
  author?: User;
  videoUrl: string;
  thumbnail: string;
  caption?: string;
  audioId?: string;
  duration: number;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  views: number;
  liked?: boolean;
  saved?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  sender?: User;
  content?: string;
  media?: string;
  mediaType?: "image" | "video" | "voice";
  reactions: MessageReaction[];
  read: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MessageReaction {
  userId: string;
  emoji: string;
}

export interface Conversation {
  id: string;
  type: "direct" | "group";
  name?: string;
  avatar?: string;
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
  muted: boolean;
  archived: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  storeId: string;
  name: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  category: string;
  variants?: ProductVariant[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductVariant {
  id: string;
  productId: string;
  name: string;
  value: string;
  price?: number;
  stock: number;
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  updatedAt: string;
}

export interface CartItem {
  id: string;
  cartId: string;
  productId: string;
  product?: Product;
  quantity: number;
  variantId?: string;
  price: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentStatus: "pending" | "paid" | "failed";
  paymentMethod: "cod" | "upi" | "card" | "wallet";
  shippingAddress: Address;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  product?: Product;
  quantity: number;
  price: number;
}

export interface Address {
  id: string;
  userId: string;
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

export interface Notification {
  id: string;
  userId: string;
  type: "like" | "comment" | "follow" | "message" | "mention" | "order" | "system";
  title: string;
  body: string;
  data?: Record<string, any>;
  read: boolean;
  createdAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  cursor?: string;
  hasMore: boolean;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
}
