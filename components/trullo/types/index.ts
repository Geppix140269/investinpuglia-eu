// PATH: components/trullo/types/index.ts

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
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
}
