import { create } from "zustand";
import { User, AuthToken } from "@/types";
import * as SecureStore from "expo-secure-store";

interface AuthState {
  user: User | null;
  token: AuthToken | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: AuthToken | null) => Promise<void>;
  setLoading: (loading: boolean) => void;
  logout: () => Promise<void>;
  restoreToken: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoading: true,
  isAuthenticated: false,

  setUser: (user) => {
    set({ user, isAuthenticated: !!user });
  },

  setToken: async (token) => {
    if (token) {
      try {
        await SecureStore.setItemAsync("auth_token", JSON.stringify(token));
        set({ token, isAuthenticated: true });
      } catch (error) {
        console.error("Failed to store token:", error);
      }
    } else {
      try {
        await SecureStore.deleteItemAsync("auth_token");
        set({ token: null, isAuthenticated: false });
      } catch (error) {
        console.error("Failed to delete token:", error);
      }
    }
  },

  setLoading: (loading) => {
    set({ isLoading: loading });
  },

  logout: async () => {
    try {
      await SecureStore.deleteItemAsync("auth_token");
      set({ user: null, token: null, isAuthenticated: false });
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  },

  restoreToken: async () => {
    try {
      const tokenStr = await SecureStore.getItemAsync("auth_token");
      if (tokenStr) {
        const token = JSON.parse(tokenStr) as AuthToken;
        set({ token, isAuthenticated: true });
      }
    } catch (error) {
      console.error("Failed to restore token:", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
