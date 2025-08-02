// File: components/trullo/knowledge/types.ts
export interface KnowledgeModule {
  id: string;
  category: 'core' | 'capability' | 'expertise' | 'strategy' | 'response' | 'rule';
  priority: number; // 1-10, higher = more important
  languages: string[];
  content: string | LanguageContent;
  triggers?: string[];
  conditions?: Condition[];
  metadata?: {
    lastUpdated: string;
    author: string;
    version: string;
  };
}

export interface LanguageContent {
  en: string;
  it?: string;
  es?: string;
  fr?: string;
  de?: string;
  ar?: string;
  zh?: string;
}

export interface Condition {
  type: 'userIntent' | 'messageCount' | 'timeOfDay' | 'userProfile' | 'custom';
  operator: 'equals' | 'contains' | 'greaterThan' | 'lessThan' | 'matches';
  value: any;
}

export interface KnowledgeContext {
  message: string;
  language: string;
  messageCount: number;
  conversationHistory?: string[];
  userProfile?: any;
}
