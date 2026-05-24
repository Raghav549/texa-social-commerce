import { io, Socket } from "socket.io-client";
import { encryptMessage, decryptMessage, EncryptedMessage } from "./crypto";

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  encrypted: EncryptedMessage;
  timestamp: number;
  read: boolean;
}

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  lastMessage: string;
  lastMessageTime: number;
  unreadCount: number;
}

class MessagingService {
  private socket: Socket | null = null;
  private messageListeners: ((message: Message) => void)[] = [];
  private conversationListeners: ((conversations: Conversation[]) => void)[] = [];
  private typingListeners: ((data: { userId: string; isTyping: boolean }) => void)[] = [];

  /**
   * Connect to the messaging server
   */
  connect(serverUrl: string, userId: string, token: string) {
    this.socket = io(serverUrl, {
      auth: {
        userId,
        token,
      },
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
    });

    this.setupListeners();
  }

  /**
   * Setup Socket.IO event listeners
   */
  private setupListeners() {
    if (!this.socket) return;

    this.socket.on("connect", () => {
      console.log("Connected to messaging server");
    });

    this.socket.on("message", (message: Message) => {
      this.messageListeners.forEach((listener) => listener(message));
    });

    this.socket.on("conversations", (conversations: Conversation[]) => {
      this.conversationListeners.forEach((listener) => listener(conversations));
    });

    this.socket.on("typing", (data: { userId: string; isTyping: boolean }) => {
      this.typingListeners.forEach((listener) => listener(data));
    });

    this.socket.on("disconnect", () => {
      console.log("Disconnected from messaging server");
    });

    this.socket.on("error", (error: any) => {
      console.error("Socket error:", error);
    });
  }

  /**
   * Send an encrypted message
   */
  sendMessage(
    conversationId: string,
    content: string,
    recipientPublicKey: string,
    senderSecretKey: string
  ) {
    if (!this.socket) return;

    const encrypted = encryptMessage(content, recipientPublicKey, senderSecretKey);

    this.socket.emit("send_message", {
      conversationId,
      encrypted,
      timestamp: Date.now(),
    });
  }

  /**
   * Mark message as read
   */
  markAsRead(messageId: string) {
    if (!this.socket) return;
    this.socket.emit("mark_read", { messageId });
  }

  /**
   * Send typing indicator
   */
  sendTypingIndicator(conversationId: string, isTyping: boolean) {
    if (!this.socket) return;
    this.socket.emit("typing", { conversationId, isTyping });
  }

  /**
   * Get conversations for the user
   */
  getConversations() {
    if (!this.socket) return;
    this.socket.emit("get_conversations");
  }

  /**
   * Get message history for a conversation
   */
  getMessageHistory(conversationId: string, limit: number = 50) {
    if (!this.socket) return;
    this.socket.emit("get_messages", { conversationId, limit });
  }

  /**
   * Listen for new messages
   */
  onMessage(listener: (message: Message) => void) {
    this.messageListeners.push(listener);
    return () => {
      this.messageListeners = this.messageListeners.filter((l) => l !== listener);
    };
  }

  /**
   * Listen for conversation updates
   */
  onConversations(listener: (conversations: Conversation[]) => void) {
    this.conversationListeners.push(listener);
    return () => {
      this.conversationListeners = this.conversationListeners.filter((l) => l !== listener);
    };
  }

  /**
   * Listen for typing indicators
   */
  onTyping(listener: (data: { userId: string; isTyping: boolean }) => void) {
    this.typingListeners.push(listener);
    return () => {
      this.typingListeners = this.typingListeners.filter((l) => l !== listener);
    };
  }

  /**
   * Disconnect from the server
   */
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  /**
   * Check if connected
   */
  isConnected(): boolean {
    return this.socket?.connected ?? false;
  }
}

export const messagingService = new MessagingService();
