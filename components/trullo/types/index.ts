// PATH: components/trullo/types/index.ts

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  metadata?: {
    requiresAuth?: boolean;
    actionType?: string;
  };
}

export interface MessageForm {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export type Language = 'en' | 'it' | 'fr' | 'de' | 'ar' | 'zh' | 'es';

export interface TrulloChatbotProps {
  language?: Language;
}

export interface AuthState {
  isAuthenticated: boolean;
  isGiuseppe: boolean;
  awaitingPassword: boolean;
  userEmail?: string;
  userId?: string;
  messageCount: number;
  requiresAuth: boolean;
}

export interface UserProfile {
  id: string;
  email: string;
  name?: string;
  emailVerified: boolean;
  createdAt: Date;
}
