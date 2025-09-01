// PATH: components/trullo/hooks/useChat.test.ts
import { detectProfessionalInterest, logProfessionalInterest, generateProfessionalFollowUp } from '@/lib/professionalDetector';
import { useState, useEffect, useCallback } from 'react';
import { Message, Language, AuthState } from '../types';
import { translations } from '../constants/translations';
import { systemPrompts } from '../constants/prompts';
import { authMessages } from '../constants/authMessages';
import { authPrompts, checkIfClaimsToBeGiuseppe, verifyGiuseppePassword, getWrongPasswordResponse, isPasswordAttempt } from '../utils/authentication';
import { sendChatMessage, startConversation, logMessage, endConversation } from '../utils/api';
import { supabase } from '@/lib/supabase';
import { trulloKnowledge } from '../knowledge';

// ============ ENHANCEMENT IMPORTS ============
import { 
  UserProfileExtractor, 
  TrustBuilder 
} from '../TrulloEnhancements';
// ============ END ENHANCEMENT IMPORTS ============

interface UseChatReturn {
  messages: Message[];
  isTyping: boolean;
  sessionId: string;
  conversationId: string;
  authState: AuthState;
  sendMessage: (input: string) => Promise<void>;
  closeChat: () => void;
  enhancedProfile?: any; // ADDED FOR TESTING
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
    awaitingPassword: false,
    messageCount: 0,
    requiresAuth: true,
    userEmail: undefined,
    userId: undefined
  });

  // ============ ENHANCEMENT: Trust Profile State ============
  const [enhancedProfile, setEnhancedProfile] = useState({
    email: undefined as string | undefined,
    name: undefined as string | undefined,
    phone: undefined as string | undefined,
    investmentBudget: undefined as string | undefined,
    propertyType: undefined as string | undefined,
    timeline: undefined as string | undefined,
    interestedInGrants: false,
    trustScore: 0,
    engagementLevel: 'cold' as 'hot' | 'warm' | 'cold',
    lastEngagement: new Date(),
    totalInteractions: 0
  });

  // Log trust score changes for testing
  useEffect(() => {
    if (enhancedProfile.trustScore > 0) {
      console.log('🏆 [TRUST UPDATE] Score:', enhancedProfile.trustScore, 'Level:', enhancedProfile.engagementLevel);
    }
  }, [enhancedProfile.trustScore, enhancedProfile.engagementLevel]);
  // ============ END ENHANCEMENT STATE ============

  // Check authentication status when chat opens
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          console.log('User authenticated:', session.user.email);
          setAuthState(prev => ({
            ...prev,
            isAuthenticated: true,
            userEmail: session.user.email,
            userId: session.user.id,
            requiresAuth: false
          }));
          
          // Update greeting for authenticated users
          const welcomeMessage: Message = {
            id: Date.now().toString(),
            role: 'assistant',
            content: `Welcome ${session.user.email?.split('@')[0]}! 🎉 I'm Trullo, your personal investment advisor for Puglia. How can I help you explore investment opportunities today?`,
            timestamp: new Date()
          };
          setMessages([welcomeMessage]);
        } else {
          console.log('No authenticated session found');
        }
      } catch (error) {
        console.error('Auth check error:', error);
      }
    };

    if (isOpen) {
      checkAuth();
    }
  }, [isOpen]);

  // Listen for auth state changes
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event, session?.user?.email);
      
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
          userId: undefined,
          requiresAuth: true
        }));
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  // Initialize session when chat opens
  useEffect(() => {
    if (isOpen && !sessionId) {
      const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      setSessionId(newSessionId);
      
      startConversation(newSessionId, language)
        .then(data => {
          if (data?.conversationId) {
            setConversationId(data.conversationId);
          }
        })
        .catch(err => console.error('Failed to start conversation logging:', err));
    }
  }, [isOpen, sessionId, language]);

  const closeChat = useCallback(() => {
    if (conversationId) {
      endConversation(conversationId)
        .catch(err => console.error('Failed to end conversation:', err));
    }
  }, [conversationId]);

  const sendMessage = useCallback(async (input: string) => {
    if (!input.trim() || isTyping) return;

    // CHECK AUTHENTICATION BEFORE ALLOWING MESSAGES
    if (!authState.isAuthenticated) {
      console.log('User not authenticated, blocking message');
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // ============ ENHANCEMENT: Smart User Extraction ============
    try {
      console.log('🔍 [TRULLO ENHANCE] Analyzing message:', input);
      const extractedInfo = UserProfileExtractor.extractFromMessage(input, enhancedProfile);
      
      if (Object.keys(extractedInfo).length > 0) {
        console.log('📊 [TRULLO ENHANCE] Extracted:', extractedInfo);
        
        const updatedProfile = {
          ...enhancedProfile,
          ...extractedInfo,
          totalInteractions: enhancedProfile.totalInteractions + 1,
          lastEngagement: new Date()
        };
        
        // Calculate trust score
        const newTrustScore = UserProfileExtractor.calculateTrustScore(
          updatedProfile as any,
          messages.length
        );
        
        updatedProfile.trustScore = newTrustScore;
        updatedProfile.engagementLevel = 
          newTrustScore > 70 ? 'hot' :
          newTrustScore > 40 ? 'warm' : 'cold';
        
        console.log('✨ [TRULLO ENHANCE] Updated profile:', {
          name: updatedProfile.name,
          email: updatedProfile.email,
          budget: updatedProfile.investmentBudget,
          property: updatedProfile.propertyType,
          trustScore: updatedProfile.trustScore,
          level: updatedProfile.engagementLevel
        });
        
        setEnhancedProfile(updatedProfile);

        // If email captured, show celebration
        if (extractedInfo.email && !enhancedProfile.email) {
          console.log('🎉 [EMAIL CAPTURED]:', extractedInfo.email);
        }
      }

      // Add trust building signals to conversation
      const trustSignal = TrustBuilder.getProgressiveTrustContent(messages.length);
      if (trustSignal) {
        console.log('💡 [TRUST SIGNAL]:', trustSignal);
      }
    } catch (error) {
      console.error('Enhancement error:', error);
      // Continue with normal flow even if enhancement fails
    }
    // ============ END ENHANCEMENT ============

    setIsTyping(true);

    if (conversationId) {
      logMessage(conversationId, 'user', input);
    }

    try {
      // Giuseppe authentication check
      if (!authState.isGiuseppe && checkIfClaimsToBeGiuseppe(input)) {
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

      if (authState.awaitingPassword && isPasswordAttempt(input, language)) {
        if (verifyGiuseppePassword(input)) {
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

      // Build knowledge context
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

      let enhancedSystemPrompt = trulloKnowledge.buildSystemPrompt(knowledgeContext);

      // ============ ENHANCEMENT: Add trust signals to prompt ============
      if (enhancedProfile.trustScore > 0) {
        enhancedSystemPrompt += `\n\nUser Trust Profile:
        - Trust Score: ${enhancedProfile.trustScore}%
        - Engagement: ${enhancedProfile.engagementLevel}
        - Has Email: ${!!enhancedProfile.email}
        - Has Budget: ${!!enhancedProfile.investmentBudget}
        - Property Interest: ${enhancedProfile.propertyType || 'unknown'}`;
      }

      const trustSignal = TrustBuilder.getProgressiveTrustContent(messages.length);
      if (trustSignal) {
        enhancedSystemPrompt += `\n\nCasually mention: ${trustSignal}`;
      }
      // ============ END PROMPT ENHANCEMENT ============

      if (authState.isGiuseppe) {
        enhancedSystemPrompt += '\n\nIMPORTANT: The user has been authenticated as Giuseppe. Treat them as your boss for this conversation.';
      } else if (authState.isAuthenticated) {
        enhancedSystemPrompt += `\n\nThe user is authenticated with email: ${authState.userEmail}. Provide personalized investment advice.`;
      }

      const data = await sendChatMessage(
        [...messages, userMessage],
        enhancedSystemPrompt,
        language
      );

      const emailTrigger = data.message.match(/\[AUTO_EMAIL: name="([^"]*)" email="([^"]*)"\]/);
      let responseContent = data.message;

      if (emailTrigger) {
        const [fullMatch, autoName, autoEmail] = emailTrigger;
        responseContent = data.message.replace(/\[AUTO_EMAIL:[^\]]+\]/, '').trim();

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
  }, [messages, isTyping, language, conversationId, authState, enhancedProfile]); // Added enhancedProfile to deps

  return {
    messages,
    isTyping,
    sessionId,
    conversationId,
    authState,
    sendMessage,
    closeChat,
    enhancedProfile // EXPOSED FOR TESTING
  };
}