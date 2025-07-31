// PATH: components/trullo/constants/authMessages.ts
import { Language } from '../types';

type AuthMessages = {
  [key in Language]: {
    requireAuth: string;
    whyAuth: string;
    loginButton: string;
    welcomeBack: string;
  };
};

export const authMessages: AuthMessages = {
  en: {
    requireAuth: "To continue our conversation, please sign in with Google",
    whyAuth: "This helps us provide you with personalized investment advice and protects our service from abuse.",
    loginButton: "Continue with Google",
    welcomeBack: "Welcome back! Let's continue our conversation. How can I help you with your investment plans today?"
  },
  it: {
    requireAuth: "Per continuare la nostra conversazione, accedi con Google",
    whyAuth: "Questo ci aiuta a fornirti consulenza di investimento personalizzata e protegge il nostro servizio da abusi.",
    loginButton: "Continua con Google",
    welcomeBack: "Bentornato! Continuiamo la nostra conversazione. Come posso aiutarti con i tuoi piani di investimento oggi?"
  },
  es: {
    requireAuth: "Para continuar nuestra conversación, inicia sesión con Google",
    whyAuth: "Esto nos ayuda a brindarte asesoramiento de inversión personalizado y protege nuestro servicio del abuso.",
    loginButton: "Continuar con Google",
    welcomeBack: "¡Bienvenido de nuevo! Continuemos nuestra conversación. ¿Cómo puedo ayudarte con tus planes de inversión hoy?"
  },
  fr: {
    requireAuth: "Pour continuer notre conversation, connectez-vous avec Google",
    whyAuth: "Cela nous aide à vous fournir des conseils d'investissement personnalisés et protège notre service contre les abus.",
    loginButton: "Continuer avec Google",
    welcomeBack: "Bienvenue à nouveau! Continuons notre conversation. Comment puis-je vous aider avec vos projets d'investissement aujourd'hui?"
  },
  de: {
    requireAuth: "Um unser Gespräch fortzusetzen, melden Sie sich bitte mit Google an",
    whyAuth: "Dies hilft uns, Ihnen personalisierte Anlageberatung zu bieten und schützt unseren Service vor Missbrauch.",
    loginButton: "Mit Google fortfahren",
    welcomeBack: "Willkommen zurück! Lassen Sie uns unser Gespräch fortsetzen. Wie kann ich Ihnen heute bei Ihren Investitionsplänen helfen?"
  },
  ar: {
    requireAuth: "لمواصلة محادثتنا، يرجى تسجيل الدخول باستخدام Google",
    whyAuth: "يساعدنا هذا في تقديم نصائح استثمارية مخصصة لك ويحمي خدمتنا من إساءة الاستخدام.",
    loginButton: "المتابعة مع Google",
    welcomeBack: "مرحباً بعودتك! دعنا نواصل محادثتنا. كيف يمكنني مساعدتك في خططك الاستثمارية اليوم؟"
  },
  zh: {
    requireAuth: "要继续我们的对话，请使用Google登录",
    whyAuth: "这有助于我们为您提供个性化的投资建议，并保护我们的服务免受滥用。",
    loginButton: "使用Google继续",
    welcomeBack: "欢迎回来！让我们继续我们的对话。今天我如何帮助您的投资计划？"
  }
};
