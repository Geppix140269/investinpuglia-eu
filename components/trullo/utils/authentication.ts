// PATH: components/trullo/utils/authentication.ts
import { Language } from '../types';

// Giuseppe's secret phrase - CHANGE THIS TO YOUR ACTUAL SECRET!
const GIUSEPPE_SECRET = 'trullo knows best';

// Fun responses for wrong attempts
const wrongPasswordResponses: Record<Language, string[]> = {
  en: [
    "😏 Nice try buddy! But my real boss knows the magic words!",
    "🤔 Hmm, that doesn't sound like something Giuseppe would say...",
    "😄 Almost! But Giuseppe has a better memory than that!",
    "🕵️ I see what you're doing there... but nope!",
    "💭 Giuseppe would be laughing at that attempt!"
  ],
  it: [
    "😏 Bel tentativo amico! Ma il mio vero capo conosce le parole magiche!",
    "🤔 Hmm, non sembra qualcosa che direbbe Giuseppe...",
    "😄 Quasi! Ma Giuseppe ha una memoria migliore!",
    "🕵️ Vedo cosa stai facendo... ma no!",
    "💭 Giuseppe riderebbe di questo tentativo!"
  ],
  es: [
    "😏 ¡Buen intento amigo! ¡Pero mi verdadero jefe conoce las palabras mágicas!",
    "🤔 Hmm, eso no suena como algo que Giuseppe diría...",
    "😄 ¡Casi! ¡Pero Giuseppe tiene mejor memoria!",
    "🕵️ Veo lo que intentas... ¡pero no!",
    "💭 ¡Giuseppe se reiría de ese intento!"
  ],
  fr: [
    "😏 Bien essayé mon ami ! Mais mon vrai patron connaît les mots magiques !",
    "🤔 Hmm, ça ne ressemble pas à ce que Giuseppe dirait...",
    "😄 Presque ! Mais Giuseppe a une meilleure mémoire !",
    "🕵️ Je vois ce que tu fais là... mais non !",
    "💭 Giuseppe rirait de cette tentative !"
  ],
  de: [
    "😏 Netter Versuch, Kumpel! Aber mein echter Chef kennt die Zauberworte!",
    "🤔 Hmm, das klingt nicht nach etwas, was Giuseppe sagen würde...",
    "😄 Fast! Aber Giuseppe hat ein besseres Gedächtnis!",
    "🕵️ Ich sehe, was du da versuchst... aber nein!",
    "💭 Giuseppe würde über diesen Versuch lachen!"
  ],
  ar: [
    "😏 محاولة جيدة يا صديق! لكن رئيسي الحقيقي يعرف الكلمات السحرية!",
    "🤔 همم، هذا لا يبدو مثل شيء يقوله جوزيبي...",
    "😄 تقريباً! لكن جوزيبي لديه ذاكرة أفضل!",
    "🕵️ أرى ما تحاول فعله... لكن لا!",
    "💭 جوزيبي سيضحك على هذه المحاولة!"
  ],
  zh: [
    "😏 不错的尝试，朋友！但我真正的老板知道魔法词！",
    "🤔 嗯，这听起来不像Giuseppe会说的话...",
    "😄 差不多了！但Giuseppe的记忆力更好！",
    "🕵️ 我看到你在做什么...但是不行！",
    "💭 Giuseppe会笑这个尝试的！"
  ]
};

// Authentication prompts
export const authPrompts: Record<Language, { askForPassword: string; authenticated: string }> = {
  en: {
    askForPassword: "Oh, you're Giuseppe? 🤔 That's great! But just to be sure... what's our secret phrase? (Only the real Giuseppe knows this!)",
    authenticated: "✅ Welcome back, boss! Good to have you here. How can I help you today?"
  },
  it: {
    askForPassword: "Oh, sei Giuseppe? 🤔 Fantastico! Ma giusto per essere sicuro... qual è la nostra frase segreta? (Solo il vero Giuseppe la conosce!)",
    authenticated: "✅ Bentornato, capo! È bello averti qui. Come posso aiutarti oggi?"
  },
  es: {
    askForPassword: "¿Oh, eres Giuseppe? 🤔 ¡Genial! Pero solo para estar seguro... ¿cuál es nuestra frase secreta? (¡Solo el verdadero Giuseppe la sabe!)",
    authenticated: "✅ ¡Bienvenido de nuevo, jefe! Es bueno tenerte aquí. ¿Cómo puedo ayudarte hoy?"
  },
  fr: {
    askForPassword: "Oh, tu es Giuseppe ? 🤔 Super ! Mais juste pour être sûr... quel est notre phrase secrète ? (Seul le vrai Giuseppe la connaît !)",
    authenticated: "✅ Bon retour, patron ! C'est bon de t'avoir ici. Comment puis-je t'aider aujourd'hui ?"
  },
  de: {
    askForPassword: "Oh, du bist Giuseppe? 🤔 Großartig! Aber nur um sicher zu sein... was ist unser Geheimphrase? (Nur der echte Giuseppe kennt sie!)",
    authenticated: "✅ Willkommen zurück, Chef! Schön, dich hier zu haben. Wie kann ich dir heute helfen?"
  },
  ar: {
    askForPassword: "أوه، أنت جوزيبي؟ 🤔 رائع! لكن فقط للتأكد... ما هي عبارتنا السرية؟ (فقط جوزيبي الحقيقي يعرفها!)",
    authenticated: "✅ مرحباً بعودتك، رئيس! من الجيد أن تكون هنا. كيف يمكنني مساعدتك اليوم؟"
  },
  zh: {
    askForPassword: "哦，你是Giuseppe？🤔 太好了！但是为了确保...我们的秘密短语是什么？（只有真正的Giuseppe知道！）",
    authenticated: "✅ 欢迎回来，老板！很高兴你在这里。今天我能帮你什么？"
  }
};

// Check if message claims to be Giuseppe
export function checkIfClaimsToBeGiuseppe(message: string): boolean {
  const lowerMessage = message.toLowerCase();
  const giuseppeVariations = [
    'i am giuseppe',
    'i\'m giuseppe',
    'im giuseppe',
    'this is giuseppe',
    'sono giuseppe',
    'io sono giuseppe',
    'je suis giuseppe',
    'ich bin giuseppe',
    'soy giuseppe',
    'yo soy giuseppe',
    '我是giuseppe',
    'أنا جوزيبي'
  ];
  
  return giuseppeVariations.some(variation => lowerMessage.includes(variation));
}

// Verify the secret phrase
export function verifyGiuseppePassword(attempt: string): boolean {
  return attempt.toLowerCase().trim() === GIUSEPPE_SECRET.toLowerCase();
}

// Get a random wrong password response
export function getWrongPasswordResponse(language: Language): string {
  const responses = wrongPasswordResponses[language] || wrongPasswordResponses.en;
  return responses[Math.floor(Math.random() * responses.length)];
}

// Check if message is trying to provide password
export function isPasswordAttempt(message: string, isAwaitingPassword: boolean): boolean {
  if (!isAwaitingPassword) return false;
  
  // If we're waiting for a password, any message that's not a question is likely a password attempt
  const questionWords = ['what', 'why', 'how', 'quando', 'perché', 'come', 'qué', 'por qué', 'cómo', 
                         'quoi', 'pourquoi', 'comment', 'was', 'warum', 'wie', '什么', '为什么', 'ماذا', 'لماذا'];
  
  const lowerMessage = message.toLowerCase();
  const isQuestion = questionWords.some(word => lowerMessage.includes(word)) || message.includes('?');
  
  return !isQuestion;
}
