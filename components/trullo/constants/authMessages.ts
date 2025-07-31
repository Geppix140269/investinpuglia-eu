// PATH: components/trullo/constants/authMessages.ts
import { Language } from '../types';

export const authMessages: Record<Language, {
  requireAuth: string;
  emailVerification: string;
  welcomeBack: string;
  notVerified: string;
  loginButton: string;
  whyAuth: string;
}> = {
  en: {
    requireAuth: "I'd love to continue our conversation! To provide you with personalized investment insights and protect your privacy, please sign in with your Google account.",
    emailVerification: "Please verify your email to continue. This helps us ensure you receive important investment updates.",
    welcomeBack: "Welcome back! How may I assist you with your investment journey in Puglia today?",
    notVerified: "Your email needs verification. Please check your inbox to continue our conversation.",
    loginButton: "Sign in with Google",
    whyAuth: "Why sign in? • Personalized investment advice • Save your conversations • Access exclusive opportunities • Direct connection with our experts"
  },
  it: {
    requireAuth: "Mi piacerebbe continuare la nostra conversazione! Per fornirti approfondimenti personalizzati sugli investimenti e proteggere la tua privacy, accedi con il tuo account Google.",
    emailVerification: "Verifica la tua email per continuare. Questo ci aiuta a garantire che tu riceva importanti aggiornamenti sugli investimenti.",
    welcomeBack: "Bentornato! Come posso assisterti oggi nel tuo percorso di investimento in Puglia?",
    notVerified: "La tua email deve essere verificata. Controlla la tua casella di posta per continuare la nostra conversazione.",
    loginButton: "Accedi con Google",
    whyAuth: "Perché accedere? • Consigli di investimento personalizzati • Salva le tue conversazioni • Accedi a opportunità esclusive • Connessione diretta con i nostri esperti"
  },
  es: {
    requireAuth: "¡Me encantaría continuar nuestra conversación! Para brindarte información personalizada sobre inversiones y proteger tu privacidad, inicia sesión con tu cuenta de Google.",
    emailVerification: "Verifica tu correo electrónico para continuar. Esto nos ayuda a asegurarnos de que recibas actualizaciones importantes sobre inversiones.",
    welcomeBack: "¡Bienvenido de nuevo! ¿Cómo puedo ayudarte hoy con tu viaje de inversión en Puglia?",
    notVerified: "Tu correo electrónico necesita verificación. Revisa tu bandeja de entrada para continuar nuestra conversación.",
    loginButton: "Iniciar sesión con Google",
    whyAuth: "¿Por qué iniciar sesión? • Asesoramiento de inversión personalizado • Guarda tus conversaciones • Accede a oportunidades exclusivas • Conexión directa con nuestros expertos"
  },
  fr: {
    requireAuth: "J'aimerais continuer notre conversation ! Pour vous fournir des informations d'investissement personnalisées et protéger votre vie privée, veuillez vous connecter avec votre compte Google.",
    emailVerification: "Veuillez vérifier votre email pour continuer. Cela nous aide à garantir que vous recevez des mises à jour importantes sur les investissements.",
    welcomeBack: "Bienvenue ! Comment puis-je vous aider aujourd'hui dans votre parcours d'investissement en Puglia ?",
    notVerified: "Votre email doit être vérifié. Vérifiez votre boîte de réception pour continuer notre conversation.",
    loginButton: "Se connecter avec Google",
    whyAuth: "Pourquoi se connecter ? • Conseils d'investissement personnalisés • Sauvegardez vos conversations • Accédez à des opportunités exclusives • Connexion directe avec nos experts"
  },
  de: {
    requireAuth: "Ich würde gerne unser Gespräch fortsetzen! Um Ihnen personalisierte Investitionseinblicke zu bieten und Ihre Privatsphäre zu schützen, melden Sie sich bitte mit Ihrem Google-Konto an.",
    emailVerification: "Bitte verifizieren Sie Ihre E-Mail, um fortzufahren. Dies hilft uns sicherzustellen, dass Sie wichtige Investitionsupdates erhalten.",
    welcomeBack: "Willkommen zurück! Wie kann ich Ihnen heute bei Ihrer Investitionsreise in Apulien helfen?",
    notVerified: "Ihre E-Mail muss verifiziert werden. Überprüfen Sie Ihren Posteingang, um unser Gespräch fortzusetzen.",
    loginButton: "Mit Google anmelden",
    whyAuth: "Warum anmelden? • Personalisierte Anlageberatung • Speichern Sie Ihre Gespräche • Zugang zu exklusiven Möglichkeiten • Direkte Verbindung mit unseren Experten"
  },
  ar: {
    requireAuth: "أود أن أواصل محادثتنا! لتزويدك برؤى استثمارية مخصصة وحماية خصوصيتك، يرجى تسجيل الدخول باستخدام حساب Google الخاص بك.",
    emailVerification: "يرجى التحقق من بريدك الإلكتروني للمتابعة. يساعدنا هذا في ضمان تلقيك تحديثات الاستثمار المهمة.",
    welcomeBack: "مرحباً بعودتك! كيف يمكنني مساعدتك اليوم في رحلتك الاستثمارية في بوليا؟",
    notVerified: "يحتاج بريدك الإلكتروني إلى التحقق. تحقق من صندوق الوارد الخاص بك لمواصلة محادثتنا.",
    loginButton: "تسجيل الدخول باستخدام Google",
    whyAuth: "لماذا تسجيل الدخول؟ • نصائح استثمارية مخصصة • احفظ محادثاتك • الوصول إلى الفرص الحصرية • اتصال مباشر مع خبرائنا"
  },
  zh: {
    requireAuth: "我很想继续我们的对话！为了为您提供个性化的投资见解并保护您的隐私，请使用您的Google账户登录。",
    emailVerification: "请验证您的电子邮件以继续。这有助于确保您收到重要的投资更新。",
    welcomeBack: "欢迎回来！今天我如何协助您在普利亚的投资之旅？",
    notVerified: "您的电子邮件需要验证。请检查您的收件箱以继续我们的对话。",
    loginButton: "使用Google登录",
    whyAuth: "为什么要登录？ • 个性化投资建议 • 保存您的对话 • 获取独家机会 • 与我们的专家直接联系"
  }
};
