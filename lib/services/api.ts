import axios, { AxiosInstance, AxiosError } from "axios";
import * as SecureStore from "expo-secure-store";
import { AuthToken } from "@/types";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || "http://127.0.0.1:3000";

class ApiClient {
  private client: AxiosInstance;
  private refreshTokenPromise: Promise<AuthToken | null> | null = null;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Request interceptor to add auth token
    this.client.interceptors.request.use(
      async (config) => {
        const tokenStr = await SecureStore.getItemAsync("auth_token");
        if (tokenStr) {
          const token = JSON.parse(tokenStr) as AuthToken;
          config.headers.Authorization = `Bearer ${token.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor to handle token refresh
    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && originalRequest) {
          if (!this.refreshTokenPromise) {
            this.refreshTokenPromise = this.refreshAccessToken();
          }

          const newToken = await this.refreshTokenPromise;
          this.refreshTokenPromise = null;

          if (newToken) {
            originalRequest.headers.Authorization = `Bearer ${newToken.accessToken}`;
            return this.client(originalRequest);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  private async refreshAccessToken(): Promise<AuthToken | null> {
    try {
      const tokenStr = await SecureStore.getItemAsync("auth_token");
      if (!tokenStr) return null;

      const token = JSON.parse(tokenStr) as AuthToken;
      const response = await this.client.post<AuthToken>("/api/auth/refresh", {
        refreshToken: token.refreshToken,
      });

      const newToken = response.data;
      await SecureStore.setItemAsync("auth_token", JSON.stringify(newToken));
      return newToken;
    } catch (error) {
      console.error("Failed to refresh token:", error);
      return null;
    }
  }

  // Auth endpoints
  async register(email: string, password: string, username: string) {
    return this.client.post("/api/auth/register", {
      email,
      password,
      username,
    });
  }

  async login(email: string, password: string) {
    return this.client.post("/api/auth/login", {
      email,
      password,
    });
  }

  async logout() {
    return this.client.post("/api/auth/logout");
  }

  async getMe() {
    return this.client.get("/api/auth/me");
  }

  // Profile endpoints
  async getProfile(userId: string) {
    return this.client.get(`/api/profile/${userId}`);
  }

  async updateProfile(data: Record<string, any>) {
    return this.client.patch("/api/profile", data);
  }

  // Feed endpoints
  async getFeed(cursor?: string, limit = 20) {
    return this.client.get("/api/posts/feed", {
      params: { cursor, limit },
    });
  }

  // Post endpoints
  async createPost(data: FormData) {
    return this.client.post("/api/posts", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  async getPost(postId: string) {
    return this.client.get(`/api/posts/${postId}`);
  }

  async likePost(postId: string) {
    return this.client.post(`/api/posts/${postId}/like`);
  }

  async unlikePost(postId: string) {
    return this.client.delete(`/api/posts/${postId}/like`);
  }

  async savePost(postId: string) {
    return this.client.post(`/api/posts/${postId}/save`);
  }

  async unsavePost(postId: string) {
    return this.client.delete(`/api/posts/${postId}/save`);
  }

  // Story endpoints
  async createStory(data: FormData) {
    return this.client.post("/api/stories", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  async getStories() {
    return this.client.get("/api/stories/feed");
  }

  // Reel endpoints
  async getReels(cursor?: string, limit = 20) {
    return this.client.get("/api/reels/feed", {
      params: { cursor, limit },
    });
  }

  async createReel(data: FormData) {
    return this.client.post("/api/reels", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  // Follow endpoints
  async follow(userId: string) {
    return this.client.post("/api/social/follow", { userId });
  }

  async unfollow(userId: string) {
    return this.client.post("/api/social/unfollow", { userId });
  }

  async getFollowers(userId: string, cursor?: string) {
    return this.client.get(`/api/social/followers/${userId}`, {
      params: { cursor },
    });
  }

  // Message endpoints
  async getConversations(cursor?: string) {
    return this.client.get("/api/messages/conversations", {
      params: { cursor },
    });
  }

  async getMessages(conversationId: string, cursor?: string) {
    return this.client.get(`/api/messages/conversations/${conversationId}`, {
      params: { cursor },
    });
  }

  async sendMessage(conversationId: string, content: string) {
    return this.client.post("/api/messages/send", {
      conversationId,
      content,
    });
  }

  // Search endpoints
  async search(query: string, type: "users" | "posts" | "hashtags" = "users") {
    return this.client.get("/api/search", {
      params: { q: query, type },
    });
  }

  // Generic request method
  async request(method: string, url: string, data?: any) {
    return this.client.request({
      method,
      url,
      data,
    });
  }
}

export const apiClient = new ApiClient();
