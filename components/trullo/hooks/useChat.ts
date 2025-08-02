// PATH: components/trullo/hooks/useChat.ts
import { detectProfessionalInterest, logProfessionalInterest, generateProfessionalFollowUp } from '@/lib/professionalDetector';
import { useState, useEffect, useCallback } from 'react';
import { Message, Language, AuthState } from '../types';
import { translations } from '../constants/translations';
import { authMessages } from '../constants/authMessages';
import { authPrompts, checkIfClaimsToBeGiuseppe, verifyGiuseppePassword, getWrongPasswordResponse, isPasswordAttempt } from '../utils/authentication';
import { sendChatMessage, startConversation, logMessage, endConversation } from '../utils/api';
import { createClient } from '@supabase/supabase-js';
import { trulloKnowledge } from '../knowledge'; // NEW IMPORT

// Extend Window interface for our temporary state
declare global {
  interface Window {
    trulloRestoredState?: {
      messages: Message[];
      sessionId: string;
      conversationId: string;
      language: Language;
      timestamp: number;
    };
  }
}

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface UseChatReturn {
  messages: Message[];
  isTyping: boolean;
  sessionId: string;
  conversationId: string;
  authState: AuthState;
  sendMessage: (input: string) => Promise<void>;
  closeChat: () => void;
}

export function useChat(isOpen: boolean, language: Language): UseChatReturn {
  // Check for restored state
  const restoredState = typeof window !== 'undefined' ? window.trulloRestoredState : null;
  
  const [messages, setMessages] = useState<Message[]>(
    restoredState?.messages || [
      {
        id: '1',
        role: 'assistant',
        content: translations[language].greeting,
        timestamp: new Date()
      }
    ]
  );
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState<string>(restoredState?.sessionId || '');
  const [conversationId, setConversationId] = useState<string>(restoredState?.conversationId || '');
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isGiuseppe: false,
    awaitingPassword: false,
    messageCount: 0,
    requiresAuth: false,
    userEmail: undefined,
    userId: undefined
  });

  // Clean up restored state after using it
  useEffect(() => {
    if (typeof window !== 'undefined' && window.trulloRestoredState) {
      delete window.trulloRestoredState;
    }
  }, []);

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setAuthState(prev => ({
          ...prev,
          isAuthenticated: true,
          userEmail: user.email,
          userId: user.id,
          requiresAuth: false // Important: clear the auth requirement
        }));
        
        // If messages were at the auth limit, add a welcome back message
        const nonGreetingMessages = messages.filter(m => m.id !== '1');
        if (nonGreetingMessages.length >= 2) {
          const welcomeBackMessage: Message = {
            id: Date.now().toString(),
            role: 'assistant',
            content: authMessages[language].welcomeBack || `Welcome back ${user.email}! Let's continue our conversation about joining the professional network.`,
            timestamp: new Date()
          };
          setMessages(prev => [...prev, welcomeBackMessage]);
        }
      }
    };
    checkAuth();

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setAuthState(prev => ({
          ...prev,
          isAuthenticated: true,
          userEmail: session.user.email,
          userId: session.user.id,
          requiresAuth: false
        }));
      } else {
        setAuthState(prev => ({
          ...prev,
          isAuthenticated: false,
          userEmail: undefined,
          userId: undefined
        }));
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [language, messages]);

  // Initialize session when chat opens
  useEffect(() => {
    if (isOpen && !sessionId) {
      const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      setSessionId(newSessionId);

      // Start conversation logging
      startConversation(newSessionId, language)
        .then(data => {
          if (data?.conversationId) {
            setConversationId(data.conversationId);
          }
        })
        .catch(err => console.error('Failed to start conversation logging:', err));
    }
  }, [isOpen, sessionId, language]);

  // Handle closing chat
  const closeChat = useCallback(() => {
    if (conversationId) {
      endConversation(conversationId)
        .catch(err => console.error('Failed to end conversation:', err));
    }
  }, [conversationId]);

  // Send message
  const sendMessage = useCallback(async (input: string) => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Log user message
    if (conversationId) {
      logMessage(conversationId, 'user', input);
    }

    try {
      // Check if user claims to be Giuseppe
      if (!authState.isGiuseppe && checkIfClaimsToBeGiuseppe(input)) {
        // Ask for password
        const authMessage: Message = {
          id: Date.now().toString(),
          role: 'assistant',
          content: authPrompts[language].askForPassword,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, authMessage]);
        setAuthState(prev => ({ ...prev, awaitingPassword: true }));

        if (conversationId) {
          logMessage(conversationId, 'assistant', authMessage.content);
        }

        setIsTyping(false);
        return;
      }

      // Check if this is a password attempt
      if (authState.awaitingPassword && isPasswordAttempt(input, authState.awaitingPassword)) {
        if (verifyGiuseppePassword(input)) {
          // Correct password
          const successMessage: Message = {
            id: Date.now().toString(),
            role: 'assistant',
            content: authPrompts[language].authenticated,
            timestamp: new Date()
          };
          setMessages(prev => [...prev, successMessage]);
          setAuthState(prev => ({
            ...prev,
            isAuthenticated: true,
            isGiuseppe: true,
            awaitingPassword: false
          }));
          if (conversationId) {
            logMessage(conversationId, 'assistant', successMessage.content);
          }
          setIsTyping(false);
          return;
        } else {
          // Wrong password
          const wrongMessage: Message = {
            id: Date.now().toString(),
            role: 'assistant',
            content: getWrongPasswordResponse(language),
            timestamp: new Date()
          };
          setMessages(prev => [...prev, wrongMessage]);
          setAuthState(prev => ({ ...prev, awaitingPassword: false }));
          if (conversationId) {
            logMessage(conversationId, 'assistant', wrongMessage.content);
          }
          setIsTyping(false);
          return;
        }
      }

      // BUILD DYNAMIC SYSTEM PROMPT WITH KNOWLEDGE SYSTEM
      const knowledgeContext = {
        message: input,
        language: language,
        messageCount: messages.length,
        conversationHistory: messages.map(m => m.content),
        userProfile: {
          isAuthenticated: authState.isAuthenticated,
          email: authState.userEmail,
          isGiuseppe: authState.isGiuseppe
        }
      };

      // Get dynamic prompt from knowledge system
      let enhancedSystemPrompt = trulloKnowledge.buildSystemPrompt(knowledgeContext);

      // Add authentication status to prompt
      if (authState.isGiuseppe) {
        enhancedSystemPrompt += '\n\nIMPORTANT: The user has been authenticated as Giuseppe. Treat them as your boss for this conversation.';
      } else if (authState.isAuthenticated) {
        enhancedSystemPrompt += `\n\nThe user is authenticated with email: ${authState.userEmail}. Provide personalized investment advice.`;
      }

      // Debug logging in development
      if (process.env.NODE_ENV === 'development') {
        console.log('🧠 Knowledge Context:', knowledgeContext);
        console.log('📝 Dynamic Prompt:', enhancedSystemPrompt);
      }

      // Normal chat flow with dynamic prompt
      const data = await sendChatMessage(
        [...messages, userMessage],
        enhancedSystemPrompt,
        language
      );

      // Check if Trullo wants to send an email automatically
      const emailTrigger = data.message.match(/\[AUTO_EMAIL: name="([^"]*)" email="([^"]*)"\]/);
      let responseContent = data.message;

      if (emailTrigger) {
        const [fullMatch, autoName, autoEmail] = emailTrigger;
        // Remove the trigger from the message
        responseContent = data.message.replace(/\[AUTO_EMAIL:[^\]]+\]/, '').trim();

        // Send the email automatically (handled by parent component)
        const event = new CustomEvent('trullo-auto-email', {
          detail: { name: autoName, email: autoEmail, message: input }
        });
        window.dispatchEvent(event);

        responseContent += '\n\n✅ Email sent successfully!';
      }

      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: responseContent,
        timestamp: new Date()
      };

      // Professional interest detection
      const professionalInterest = detectProfessionalInterest(input, language);
      if (professionalInterest && conversationId) {
        await logProfessionalInterest(conversationId, professionalInterest.professionalType, professionalInterest.confidence, input, language);
        const followUp = generateProfessionalFollowUp(professionalInterest.professionalType, language);
        assistantMessage.content = `${assistantMessage.content}\n\n${followUp}`;
      }

      setMessages(prev => [...prev, assistantMessage]);

      if (conversationId) {
        logMessage(conversationId, 'assistant', assistantMessage.content);
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: translations[language].error,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  }, [messages, isTyping, language, conversationId, authState]);

  return {
    messages,
    isTyping,
    sessionId,
    conversationId,
    authState,
    sendMessage,
    closeChat
  };
}
