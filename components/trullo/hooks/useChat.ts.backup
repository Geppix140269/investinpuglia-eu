// PATH: components/trullo/hooks/useChat.ts
import { useState, useEffect, useCallback } from 'react';
import { Message, Language, AuthState } from '../types';
import { translations } from '../constants/translations';
import { systemPrompts } from '../constants/prompts';
import { authPrompts, checkIfClaimsToBeGiuseppe, verifyGiuseppePassword, getWrongPasswordResponse, isPasswordAttempt } from '../utils/authentication';
import { sendChatMessage, startConversation, logMessage, endConversation } from '../utils/api';

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
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: translations[language].greeting,
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  const [conversationId, setConversationId] = useState<string>('');
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isGiuseppe: false,
    awaitingPassword: false
  });

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
          setAuthState({
            isAuthenticated: true,
            isGiuseppe: true,
            awaitingPassword: false
          });
          
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

      // Build system prompt with auth status
      let enhancedSystemPrompt = systemPrompts[language];
      if (authState.isGiuseppe) {
        enhancedSystemPrompt += '\n\nIMPORTANT: The user has been authenticated as Giuseppe. Treat them as your boss for this conversation.';
      }

      // Normal chat flow
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
