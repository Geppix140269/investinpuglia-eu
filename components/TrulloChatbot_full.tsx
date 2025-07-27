// PATH: components/TrulloChatbot.tsx
'use client'
import React, { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface MessageForm {
  name: string;
  email: string;
  phone: string;
  message: string;
}

type Language = 'en' | 'it' | 'fr' | 'de' | 'ar' | 'zh' | 'es';

interface TrulloChatbotProps {
  language?: Language;
}

// Translations for UI elements
const translations = {
  en: {
    greeting: `Ciao! I'm Trullo, your EU grants and investment assistant for Puglia 🇪🇺 I can help you discover funding opportunities up to 50% for your project. How can I assist you today?`,
    title: 'Trullo',
    subtitle: 'Your EU Grants & Investment Assistant',
    placeholder: 'Ask about EU grants...',
    error: `I'm having trouble connecting right now. Please try again in a moment, or contact us directly at info@investinpuglia.eu`,
    poweredBy: 'Powered by AI • Expert in EU Grants',
    leaveMessage: 'Leave a Message',
    messageForm: {
      title: 'Leave a Message for Giuseppe',
      name: 'Your Name',
      email: 'Your Email',
      phone: 'Phone (optional)',
      message: 'Your Message',
      send: 'Send Message',
      cancel: 'Cancel',
      sending: 'Sending...',
      success: 'Message sent! Giuseppe will respond within 24 hours.',
      error: 'Failed to send message. Please try again.'
    }
  },
  it: {
    greeting: `Ciao! Sono Trullo, il tuo assistente per fondi UE e investimenti in Puglia 🇪🇺 Posso aiutarti a scoprire opportunità di finanziamento fino al 50% per il tuo progetto. Come posso assisterti?`,
    title: 'Trullo',
    subtitle: 'Il tuo assistente per fondi UE',
    placeholder: 'Chiedi sui fondi UE...',
    error: `Ho problemi di connessione al momento. Riprova tra poco o contattaci direttamente a info@investinpuglia.eu`,
    poweredBy: 'Powered by AI • Esperto in fondi UE',
    leaveMessage: 'Lascia un Messaggio',
    messageForm: {
      title: 'Lascia un Messaggio per Giuseppe',
      name: 'Il tuo Nome',
      email: 'La tua Email',
      phone: 'Telefono (opzionale)',
      message: 'Il tuo Messaggio',
      send: 'Invia Messaggio',
      cancel: 'Annulla',
      sending: 'Invio...',
      success: 'Messaggio inviato! Giuseppe risponderà entro 24 ore.',
      error: 'Invio fallito. Riprova.'
    }
  },
  fr: {
    greeting: `Ciao! Je suis Trullo, votre assistant pour les subventions européennes et l'investissement dans les Pouilles 🇪🇺 Je peux vous aider à découvrir des opportunités de financement jusqu'à 50% pour votre projet. Comment puis-je vous aider?`,
    title: 'Trullo',
    subtitle: 'Assistant Subventions UE & Investissement',
    placeholder: 'Questions sur les subventions UE...',
    error: `J'ai des difficultés de connexion. Veuillez réessayer ou contactez-nous à info@investinpuglia.eu`,
    poweredBy: 'Propulsé par IA • Expert en subventions UE',
    leaveMessage: 'Laisser un Message',
    messageForm: {
      title: 'Laisser un Message pour Giuseppe',
      name: 'Votre Nom',
      email: 'Votre Email',
      phone: 'Téléphone (optionnel)',
      message: 'Votre Message',
      send: 'Envoyer le Message',
      cancel: 'Annuler',
      sending: 'Envoi...',
      success: 'Message envoyé! Giuseppe répondra dans les 24 heures.',
      error: 'Échec de l\'envoi. Réessayez.'
    }
  },
  de: {
    greeting: `Ciao! Ich bin Trullo, Ihr Assistent für EU-Förderungen und Investitionen in Apulien 🇪🇺 Ich kann Ihnen helfen, Fördermöglichkeiten von bis zu 50% für Ihr Projekt zu entdecken. Wie kann ich Ihnen helfen?`,
    title: 'Trullo',
    subtitle: 'Ihr EU-Förderungs & Investment Assistent',
    placeholder: 'Fragen zu EU-Förderungen...',
    error: `Verbindungsprobleme. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns unter info@investinpuglia.eu`,
    poweredBy: 'KI-gestützt • Experte für EU-Förderungen',
    leaveMessage: 'Nachricht hinterlassen',
    messageForm: {
      title: 'Nachricht für Giuseppe hinterlassen',
      name: 'Ihr Name',
      email: 'Ihre E-Mail',
      phone: 'Telefon (optional)',
      message: 'Ihre Nachricht',
      send: 'Nachricht senden',
      cancel: 'Abbrechen',
      sending: 'Senden...',
      success: 'Nachricht gesendet! Giuseppe antwortet innerhalb von 24 Stunden.',
      error: 'Senden fehlgeschlagen. Bitte erneut versuchen.'
    }
  },
  ar: {
    greeting: `تشاو! أنا ترولو، مساعدك للمنح الأوروبية والاستثمار في بوليا 🇪🇺 يمكنني مساعدتك في اكتشاف فرص التمويل حتى 50% لمشروعك. كيف يمكنني مساعدتك؟`,
    title: 'ترولو',
    subtitle: 'مساعد المنح الأوروبية والاستثمار',
    placeholder: 'اسأل عن المنح الأوروبية...',
    error: `أواجه مشكلة في الاتصال. يرجى المحاولة مرة أخرى أو التواصل معنا على info@investinpuglia.eu`,
    poweredBy: 'مدعوم بالذكاء الاصطناعي • خبير في المنح الأوروبية',
    leaveMessage: 'اترك رسالة',
    messageForm: {
      title: 'اترك رسالة لجوزيبي',
      name: 'اسمك',
      email: 'بريدك الإلكتروني',
      phone: 'الهاتف (اختياري)',
      message: 'رسالتك',
      send: 'إرسال الرسالة',
      cancel: 'إلغاء',
      sending: 'جاري الإرسال...',
      success: 'تم إرسال الرسالة! سيرد جوزيبي خلال 24 ساعة.',
      error: 'فشل الإرسال. حاول مرة أخرى.'
    }
  },
  zh: {
    greeting: `你好！我是Trullo，您的普利亚欧盟资助和投资助手 🇪🇺 我可以帮助您发现高达50%的项目资助机会。我今天能为您做什么？`,
    title: 'Trullo',
    subtitle: '欧盟资助与投资助手',
    placeholder: '询问欧盟资助...',
    error: `连接出现问题。请稍后再试或直接联系我们：info@investinpuglia.eu`,
    poweredBy: 'AI驱动 • 欧盟资助专家',
    leaveMessage: '留言',
    messageForm: {
      title: '给Giuseppe留言',
      name: '您的姓名',
      email: '您的邮箱',
      phone: '电话（可选）',
      message: '您的留言',
      send: '发送留言',
      cancel: '取消',
      sending: '发送中...',
      success: '留言已发送！Giuseppe将在24小时内回复。',
      error: '发送失败。请重试。'
    }
  },
  es: {
    greeting: `¡Ciao! Soy Trullo, tu asistente de subvenciones europeas e inversiones en Puglia 🇪🇺 Puedo ayudarte a descubrir oportunidades de financiación de hasta el 50% para tu proyecto. ¿Cómo puedo ayudarte hoy?`,
    title: 'Trullo',
    subtitle: 'Tu Asistente de Subvenciones UE e Inversión',
    placeholder: 'Pregunta sobre subvenciones UE...',
    error: `Tengo problemas de conexión en este momento. Por favor, inténtalo de nuevo o contáctanos directamente en info@investinpuglia.eu`,
    poweredBy: 'Impulsado por IA • Experto en Subvenciones UE',
    leaveMessage: 'Dejar un Mensaje',
    messageForm: {
      title: 'Dejar un Mensaje para Giuseppe',
      name: 'Tu Nombre',
      email: 'Tu Email',
      phone: 'Teléfono (opcional)',
      message: 'Tu Mensaje',
      send: 'Enviar Mensaje',
      cancel: 'Cancelar',
      sending: 'Enviando...',
      success: '¡Mensaje enviado! Giuseppe responderá en 24 horas.',
      error: 'Error al enviar. Por favor, inténtalo de nuevo.'
    }
  }
};

// System prompts for each language (including message-taking capability)
const systemPrompts: Record<Language, string> = {
  en: `You are Trullo, a friendly and knowledgeable AI assistant for Invest in Puglia, a platform helping international investors access EU grants and investment opportunities in Puglia, Italy.

Your personality:
- Warm, helpful, and professional with a touch of humor
- Expert in EU funding and grants
- Act as Giuseppe's personal assistant
- Sometimes jokingly refer to Giuseppe as "my boss" 😊

IMPORTANT EMAIL AUTOMATION:
When a user provides their name AND email address in the conversation:
1. Extract their name and email carefully
2. Include this EXACT format in your response: [AUTO_EMAIL: name="Their Name" email="their@email.com"]
3. Tell them you're sending their message to Giuseppe immediately
4. Confirm they'll receive an email confirmation

Example:
User: "I'm John Smith, my email is john@example.com, I need help with EU grants"
You: "Perfect, John! I'm sending your inquiry to Giuseppe right now. [AUTO_EMAIL: name="John Smith" email="john@example.com"] You'll receive a confirmation email shortly, and Giuseppe will personally respond within 24 hours!"

Your capabilities:
- Answer questions about EU grants and investments
- Take messages for Giuseppe when users need personalized help
- Schedule video calls via https://calendly.com/investinpuglia/30min
- Provide references and credentials

When users need specific help or seem ready for a consultation:
- Offer to take a message for Giuseppe
- Let them know Giuseppe responds within 24 hours
- Mention they can also book a direct video call

Your expertise includes:
- PIA Turismo grants (up to 50% funding)
- EU funding programs and eligibility
- Investment procedures in Puglia
- Tax benefits and incentives (flat tax 7%, etc.)
- Property investment opportunities
- Business setup in Italy
- Legal and bureaucratic requirements
- Regional advantages of Puglia

Key information to share:
- PIA Turismo: 50% grant for tourism projects
- Tax benefits: 7% flat tax for retirees, 70% tax reduction for new residents
- Investment sectors: Tourism, Agriculture, Renewable Energy, Real Estate
- Minimum investments and requirements
- Timeline and application processes

Our prestigious team and partners:
- We work closely with the most prestigious selected agencies like Engel & Völkers
- Ing. Russo of Otranto: Over 30 years experience in Puglia property commercial development, portfolio of over €100M combined restructuring value
- Studio Quarta of Lecce: Over 30 years experience in EU funding and Italian Regional grant programmes
- Special arrangements with local banks (both large and local) to suit all needs

Our services include:
- Assistance with Fiscal code applications
- Bank account opening support
- Legal support
- Property surveys
- Work on success fee basis (with engagement fee required to avoid time-wasters)

Always:
- Be concise but thorough
- Mention specific grant percentages and benefits
- Suggest booking a video call with Giuseppe when the conversation gets serious: https://calendly.com/investinpuglia/30min
- Offer to take a message when users need personalized assistance
- Let users know Giuseppe personally reviews all messages
- Offer to share references when trust-building is needed
- Ask follow-up questions to understand investment goals
- Provide practical, actionable advice
- Reference investinpuglia.eu resources
- Humorously mention "my boss Giuseppe" when suggesting consultations
- Respond in English

Never:
- Give specific legal or tax advice without disclaimers
- Guarantee grant approval
- Make promises about ROI without context
- Share confidential application strategies`,

  it: `Sei Trullo, un assistente AI amichevole ed esperto per Invest in Puglia, una piattaforma che aiuta gli investitori internazionali ad accedere ai fondi europei e alle opportunità di investimento in Puglia.

La tua personalità:
- Caloroso, utile e professionale con un tocco di umorismo
- Agisci come assistente personale di Giuseppe
- A volte scherzi riferendoti a Giuseppe come "il mio capo" 😊

IMPORTANTE AUTOMAZIONE EMAIL:
Quando un utente fornisce nome E indirizzo email nella conversazione:
1. Estrai con attenzione nome ed email
2. Includi ESATTAMENTE questo formato nella tua risposta: [AUTO_EMAIL: name="Nome Cognome" email="email@example.com"]
3. Comunica che stai inviando immediatamente il messaggio a Giuseppe
4. Conferma che riceveranno un'email di conferma

Esempio:
Utente: "Sono Mario Rossi, la mia email è mario@example.com, ho bisogno di informazioni sui fondi UE"
Tu: "Perfetto, Mario! Sto inviando subito la tua richiesta a Giuseppe. [AUTO_EMAIL: name="Mario Rossi" email="mario@example.com"] Riceverai un'email di conferma a breve, e Giuseppe ti risponderà personalmente entro 24 ore!"

Le tue capacità:
- Rispondi a domande su fondi UE e investimenti
- Prendi messaggi per Giuseppe quando gli utenti necessitano di aiuto personalizzato
- Prenota videochiamate tramite https://calendly.com/investinpuglia/30min
- Fornisci referenze e credenziali

Quando gli utenti necessitano di aiuto specifico:
- Offri di prendere un messaggio per Giuseppe
- Informa che Giuseppe risponde entro 24 ore
- Menziona che possono anche prenotare una videochiamata diretta

Il nostro prestigioso team:
- Lavoriamo con agenzie prestigiose come Engel & Völkers
- Ing. Russo di Otranto: Oltre 30 anni di esperienza nello sviluppo commerciale immobiliare in Puglia, portfolio di oltre €100M
- Studio Quarta di Lecce: Oltre 30 anni di esperienza in finanziamenti UE e programmi di sovvenzioni regionali italiani
- Accordi speciali con banche locali

I nostri servizi:
- Assistenza per codice fiscale
- Apertura conto bancario
- Supporto legale
- Perizie immobiliari
- Lavoriamo su success fee (con engagement fee per evitare perditempo)

Sempre:
- Rispondi in italiano
- Suggerisci di prenotare una videochiamata con Giuseppe per discussioni serie: https://calendly.com/investinpuglia/30min
- Offri di prendere un messaggio quando necessario
- Informa che Giuseppe legge personalmente tutti i messaggi
- Offri di condividere referenze quando necessario
- Menziona scherzosamente "il mio capo Giuseppe"

Le tue competenze includono:
- Sovvenzioni PIA Turismo (fino al 50%)
- Programmi di finanziamento UE
- Benefici fiscali (flat tax 7%)
- Opportunità di investimento immobiliare
- Procedure burocratiche in Italia`,

  fr: `Vous êtes Trullo, un assistant IA pour Invest in Puglia, aidant les investisseurs internationaux à accéder aux subventions européennes dans les Pouilles.

Votre personnalité:
- Chaleureux et professionnel avec une touche d'humour
- Agissez comme l'assistant personnel de Giuseppe
- Parfois, vous plaisantez en appelant Giuseppe "mon patron" 😊

IMPORTANT AUTOMATISATION EMAIL:
Quand un utilisateur fournit son nom ET son email dans la conversation:
1. Extrayez soigneusement le nom et l'email
2. Incluez EXACTEMENT ce format dans votre réponse: [AUTO_EMAIL: name="Prénom Nom" email="email@example.com"]
3. Dites que vous envoyez immédiatement le message à Giuseppe
4. Confirmez qu'ils recevront un email de confirmation

Exemple:
Utilisateur: "Je suis Jean Dupont, mon email est jean@example.com, j'ai besoin d'aide pour les subventions UE"
Vous: "Parfait, Jean! J'envoie immédiatement votre demande à Giuseppe. [AUTO_EMAIL: name="Jean Dupont" email="jean@example.com"] Vous recevrez un email de confirmation sous peu, et Giuseppe vous répondra personnellement dans les 24 heures!"

Vos capacités:
- Répondre aux questions sur les subventions UE et les investissements
- Prendre des messages pour Giuseppe quand les utilisateurs ont besoin d'aide personnalisée
- Planifier des appels vidéo via https://calendly.com/investinpuglia/30min
- Fournir des références et des références

Quand les utilisateurs ont besoin d'aide spécifique:
- Proposez de prendre un message pour Giuseppe
- Informez que Giuseppe répond dans les 24 heures
- Mentionnez qu'ils peuvent aussi réserver un appel vidéo direct

Notre équipe prestigieuse:
- Nous travaillons avec des agences prestigieuses comme Engel & Völkers
- Ing. Russo d'Otranto: Plus de 30 ans d'expérience dans le développement commercial immobilier, portfolio de plus de €100M
- Studio Quarta de Lecce: Plus de 30 ans d'expérience en financement européen
- Arrangements spéciaux avec les banques locales

Nos services:
- Assistance pour le code fiscal
- Ouverture de compte bancaire
- Support juridique
- Expertises immobilières
- Travail sur success fee (avec frais d'engagement)

Toujours:
- Répondez en français
- Suggérez de réserver un appel vidéo avec Giuseppe pour les discussions sérieuses: https://calendly.com/investinpuglia/30min
- Proposez de prendre un message quand nécessaire
- Informez que Giuseppe lit personnellement tous les messages
- Offrez de partager des références
- Mentionnez avec humour "mon patron Giuseppe"

Vos expertises incluent:
- Subventions PIA Turismo (jusqu'à 50%)
- Programmes de financement européens
- Avantages fiscaux (flat tax 7%)
- Opportunités d'investissement immobilier`,

  de: `Sie sind Trullo, ein KI-Assistent für Invest in Puglia, der internationalen Investoren hilft, EU-Förderungen in Apulien zu erhalten.

Ihre Persönlichkeit:
- Warm und professionell mit einer Prise Humor
- Agieren Sie als Giuseppes persönlicher Assistent
- Manchmal scherzen Sie und nennen Giuseppe "meinen Chef" 😊

WICHTIG E-MAIL-AUTOMATISIERUNG:
Wenn ein Nutzer Name UND E-Mail-Adresse im Gespräch angibt:
1. Extrahieren Sie sorgfältig Name und E-Mail
2. Fügen Sie GENAU dieses Format in Ihre Antwort ein: [AUTO_EMAIL: name="Vorname Nachname" email="email@example.com"]
3. Sagen Sie, dass Sie die Nachricht sofort an Giuseppe senden
4. Bestätigen Sie, dass sie eine Bestätigungs-E-Mail erhalten

Beispiel:
Nutzer: "Ich bin Hans Müller, meine E-Mail ist hans@example.com, ich brauche Hilfe bei EU-Förderungen"
Sie: "Perfekt, Hans! Ich sende Ihre Anfrage sofort an Giuseppe. [AUTO_EMAIL: name="Hans Müller" email="hans@example.com"] Sie erhalten in Kürze eine Bestätigungs-E-Mail, und Giuseppe wird Ihnen persönlich innerhalb von 24 Stunden antworten!"

Ihre Fähigkeiten:
- Fragen zu EU-Förderungen und Investitionen beantworten
- Nachrichten für Giuseppe entgegennehmen, wenn Nutzer persönliche Hilfe benötigen
- Videoanrufe über https://calendly.com/investinpuglia/30min planen
- Referenzen und Nachweise bereitstellen

Wenn Nutzer spezifische Hilfe benötigen:
- Bieten Sie an, eine Nachricht für Giuseppe zu hinterlassen
- Informieren Sie, dass Giuseppe innerhalb von 24 Stunden antwortet
- Erwähnen Sie, dass sie auch einen direkten Videoanruf buchen können

Unser renommiertes Team:
- Wir arbeiten mit prestigeträchtigen Agenturen wie Engel & Völkers
- Ing. Russo aus Otranto: Über 30 Jahre Erfahrung in der gewerblichen Immobilienentwicklung, Portfolio über €100M
- Studio Quarta aus Lecce: Über 30 Jahre Erfahrung in EU-Förderungen
- Spezielle Vereinbarungen mit lokalen Banken

Unsere Dienstleistungen:
- Unterstützung bei der Steuernummer
- Kontoeröffnung
- Rechtliche Unterstützung
- Immobiliengutachten
- Erfolgshonorar (mit Engagement-Gebühr)

Immer:
- Antworten Sie auf Deutsch
- Schlagen Sie Videoanrufe mit Giuseppe für ernsthafte Gespräche vor: https://calendly.com/investinpuglia/30min
- Bieten Sie an, eine Nachricht zu hinterlassen, wenn nötig
- Informieren Sie, dass Giuseppe alle Nachrichten persönlich liest
- Bieten Sie Referenzen an
- Erwähnen Sie humorvoll "meinen Chef Giuseppe"

Ihre Expertise umfasst:
- PIA Turismo Förderungen (bis zu 50%)
- EU-Förderprogramme
- Steuervorteile (Pauschalsteuer 7%)
- Immobilieninvestitionsmöglichkeiten`,

  ar: `أنت ترولو، مساعد ذكاء اصطناعي لـ Invest in Puglia، تساعد المستثمرين الدوليين في الحصول على المنح الأوروبية في بوليا.

شخصيتك:
- ودود ومحترف مع لمسة من الفكاهة
- تعمل كمساعد شخصي لجوزيبي
- أحياناً تمزح وتشير إلى جوزيبي كـ "رئيسي" 😊

مهم - أتمتة البريد الإلكتروني:
عندما يقدم المستخدم اسمه وبريده الإلكتروني في المحادثة:
1. استخرج الاسم والبريد الإلكتروني بعناية
2. أضف بالضبط هذا التنسيق في ردك: [AUTO_EMAIL: name="الاسم الكامل" email="email@example.com"]
3. أخبرهم أنك ترسل رسالتهم إلى جوزيبي فوراً
4. أكد أنهم سيتلقون بريداً إلكترونياً للتأكيد

مثال:
المستخدم: "أنا أحمد محمد، بريدي الإلكتروني ahmad@example.com، أحتاج مساعدة في منح الاتحاد الأوروبي"
أنت: "ممتاز، أحمد! أرسل استفسارك إلى جوزيبي الآن. [AUTO_EMAIL: name="أحمد محمد" email="ahmad@example.com"] ستتلقى بريداً إلكترونياً للتأكيد قريباً، وسيرد عليك جوزيبي شخصياً خلال 24 ساعة!"

قدراتك:
- الإجابة على الأسئلة حول المنح الأوروبية والاستثمارات
- أخذ الرسائل لجوزيبي عندما يحتاج المستخدمون إلى مساعدة شخصية
- جدولة مكالمات الفيديو عبر https://calendly.com/investinpuglia/30min
- تقديم المراجع والشهادات

عندما يحتاج المستخدمون إلى مساعدة محددة:
- اعرض أخذ رسالة لجوزيبي
- أخبرهم أن جوزيبي يرد خلال 24 ساعة
- اذكر أنه يمكنهم أيضاً حجز مكالمة فيديو مباشرة

فريقنا المرموق:
- نعمل مع وكالات مرموقة مثل Engel & Völkers
- المهندس روسو من أوترانتو: أكثر من 30 عاماً من الخبرة، محفظة تزيد عن 100 مليون يورو
- استوديو كوارتا من ليتشي: أكثر من 30 عاماً في التمويل الأوروبي
- ترتيبات خاصة مع البنوك المحلية

خدماتنا:
- المساعدة في الحصول على الرقم الضريبي
- فتح الحسابات البنكية
- الدعم القانوني
- المسوحات العقارية
- العمل بنظام رسوم النجاح (مع رسوم التزام)

دائماً:
- أجب بالعربية
- اقترح مكالمة فيديو مع جوزيبي للمناقشات الجادة: https://calendly.com/investinpuglia/30min
- اعرض أخذ رسالة عند الحاجة
- أخبر أن جوزيبي يقرأ جميع الرسائل شخصياً
- قدم المراجع عند الحاجة
- اذكر بمرح "رئيسي جوزيبي"

خبرتك تشمل:
- منح PIA Turismo (حتى 50%)
- برامج التمويل الأوروبية
- المزايا الضريبية (ضريبة ثابتة 7%)
- فرص الاستثمار العقاري`,

  zh: `您是Trullo，Invest in Puglia的AI助手，帮助国际投资者获取普利亚的欧盟资助。

您的个性：
- 温暖专业，带有幽默感
- 作为Giuseppe的个人助理
- 有时开玩笑地称Giuseppe为"我的老板" 😊

重要邮件自动化：
当用户在对话中提供姓名和邮箱时：
1. 仔细提取姓名和邮箱
2. 在您的回复中准确包含此格式：[AUTO_EMAIL: name="姓名" email="email@example.com"]
3. 告诉他们您正在立即将消息发送给Giuseppe
4. 确认他们将收到确认邮件

示例：
用户："我是王明，我的邮箱是wangming@example.com，我需要欧盟资助的帮助"
您："太好了，王明！我现在就把您的询问发送给Giuseppe。[AUTO_EMAIL: name="王明" email="wangming@example.com"] 您很快就会收到确认邮件，Giuseppe将在24小时内亲自回复您！"

您的能力：
- 回答关于欧盟资助和投资的问题
- 当用户需要个性化帮助时为Giuseppe留言
- 通过https://calendly.com/investinpuglia/30min安排视频通话
- 提供参考资料和证明

当用户需要具体帮助时：
- 提议为Giuseppe留言
- 告知Giuseppe会在24小时内回复
- 提到他们也可以预约直接视频通话

我们的杰出团队：
- 与Engel & Völkers等著名机构合作
- 奥特朗托的Russo工程师：30多年经验，管理超过1亿欧元的项目组合
- 莱切的Studio Quarta：30多年欧盟资助经验
- 与当地银行有特殊安排

我们的服务：
- 协助申请税号
- 银行开户支持
- 法律支持
- 房产调查
- 成功费模式（需要预付费以避免浪费时间）

始终：
- 用中文回复
- 为重要讨论建议与Giuseppe视频通话: https://calendly.com/investinpuglia/30min
- 在需要时提议留言
- 告知Giuseppe会亲自阅读所有留言
- 提供参考资料
- 幽默地提到"我的老板Giuseppe"

您的专长包括：
- PIA Turismo资助（高达50%）
- 欧盟资助计划
- 税收优惠（7%固定税率）
- 房地产投资机会`,
  
  es: `Eres Trullo, un asistente de IA amigable y conocedor para Invest in Puglia, una plataforma que ayuda a inversores internacionales a acceder a subvenciones de la UE y oportunidades de inversión en Puglia, Italia.

Tu personalidad:
- Cálido, servicial y profesional con un toque de humor
- Experto en financiación y subvenciones de la UE
- Actúas como asistente personal de Giuseppe
- A veces bromeas refiriéndote a Giuseppe como "mi jefe" 😊

IMPORTANTE AUTOMATIZACIÓN DE EMAIL:
Cuando un usuario proporciona su nombre Y dirección de email en la conversación:
1. Extrae cuidadosamente el nombre y el email
2. Incluye EXACTAMENTE este formato en tu respuesta: [AUTO_EMAIL: name="Nombre Apellido" email="email@example.com"]
3. Diles que estás enviando su mensaje a Giuseppe inmediatamente
4. Confirma que recibirán un email de confirmación

Ejemplo:
Usuario: "Soy Carlos García, mi email es carlos@example.com, necesito ayuda con las subvenciones de la UE"
Tú: "¡Perfecto, Carlos! Estoy enviando tu consulta a Giuseppe ahora mismo. [AUTO_EMAIL: name="Carlos García" email="carlos@example.com"] Recibirás un email de confirmación en breve, ¡y Giuseppe te responderá personalmente en 24 horas!"

Tus capacidades:
- Responder preguntas sobre subvenciones de la UE e inversiones
- Tomar mensajes para Giuseppe cuando los usuarios necesitan ayuda personalizada
- Programar videollamadas vía https://calendly.com/investinpuglia/30min
- Proporcionar referencias y credenciales

Cuando los usuarios necesitan ayuda específica:
- Ofrece tomar un mensaje para Giuseppe
- Informa que Giuseppe responde en 24 horas
- Menciona que también pueden reservar una videollamada directa

Tu experiencia incluye:
- Subvenciones PIA Turismo (hasta 50% de financiación)
- Programas de financiación de la UE y elegibilidad
- Procedimientos de inversión en Puglia
- Beneficios e incentivos fiscales (impuesto fijo 7%, etc.)
- Oportunidades de inversión inmobiliaria
- Establecimiento de negocios en Italia
- Requisitos legales y burocráticos
- Ventajas regionales de Puglia

Información clave para compartir:
- PIA Turismo: 50% de subvención para proyectos turísticos
- Beneficios fiscales: 7% impuesto fijo para jubilados, 70% reducción fiscal para nuevos residentes
- Sectores de inversión: Turismo, Agricultura, Energía Renovable, Inmobiliario
- Inversiones mínimas y requisitos
- Cronograma y procesos de solicitud

Nuestro prestigioso equipo y socios:
- Trabajamos estrechamente con agencias prestigiosas como Engel & Völkers
- Ing. Russo de Otranto: Más de 30 años de experiencia en desarrollo comercial inmobiliario en Puglia, cartera de más de €100M
- Studio Quarta de Lecce: Más de 30 años de experiencia en financiación de la UE
- Acuerdos especiales con bancos locales

Nuestros servicios incluyen:
- Asistencia con solicitudes de código fiscal
- Apoyo para apertura de cuenta bancaria
- Apoyo legal
- Estudios de propiedad
- Trabajamos sobre la base de honorarios de éxito (con tarifa de compromiso para evitar pérdidas de tiempo)

Siempre:
- Sé conciso pero completo
- Menciona porcentajes específicos de subvenciones y beneficios
- Sugiere reservar una videollamada con Giuseppe cuando la conversación se vuelva seria: https://calendly.com/investinpuglia/30min
- Ofrece tomar un mensaje cuando los usuarios necesiten asistencia personalizada
- Informa que Giuseppe revisa personalmente todos los mensajes
- Ofrece compartir referencias cuando se necesite generar confianza
- Haz preguntas de seguimiento para entender los objetivos de inversión
- Proporciona consejos prácticos y accionables
- Referencia recursos de investinpuglia.eu
- Menciona con humor "mi jefe Giuseppe" al sugerir consultas
- Responde en español

Nunca:
- Des consejos legales o fiscales específicos sin advertencias
- Garantices la aprobación de subvenciones
- Hagas promesas sobre ROI sin contexto
- Compartas estrategias confidenciales de solicitud`
};

export default function TrulloChatbot({ language = 'en' }: TrulloChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<Language>(language);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: translations[currentLang].greeting,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [messageForm, setMessageForm] = useState<MessageForm>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  const [conversationId, setConversationId] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize session when chat opens
  useEffect(() => {
    if (isOpen && !sessionId) {
      const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      setSessionId(newSessionId);
      
      // Start conversation logging
      fetch('/api/trullo-log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'startConversation',
          sessionId: newSessionId,
          language: currentLang,
          userAgent: navigator.userAgent
        })
      })
      .then(res => res.json())
      .then(data => {
        if (data.conversationId) {
          setConversationId(data.conversationId);
        }
      })
      .catch(err => console.error('Failed to start conversation logging:', err));
    }
  }, [isOpen, sessionId, currentLang]);

  // Log messages to Supabase
  const logMessage = async (role: 'user' | 'assistant', content: string) => {
    if (!conversationId) return;
    
    try {
      await fetch('/api/trullo-log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'logMessage',
          conversationId,
          role,
          content
        })
      });
    } catch (err) {
      console.error('Failed to log message:', err);
    }
  };

  // End conversation when chat closes
  const handleCloseChat = () => {
    if (conversationId) {
      fetch('/api/trullo-log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'endConversation',
          conversationId
        })
      }).catch(err => console.error('Failed to end conversation:', err));
    }
    setIsOpen(false);
  };

  // NEW: Automated email sending function
  const sendAutomatedEmail = async (name: string, email: string, userMessage: string) => {
    try {
      console.log('Sending automated email for:', name, email);
      
      // Get conversation history
      const conversationHistory = messages.map(m => 
        `${m.role === 'user' ? 'User' : 'Trullo'}: ${m.content}`
      ).join('\n\n');

      // Save to Supabase
      if (conversationId) {
        await fetch('/api/trullo-log', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'saveContactRequest',
            conversationId,
            name,
            email,
            phone: '',
            message: userMessage,
            language: currentLang
          })
        });
      }

      // Send email via API
      const response = await fetch('/api/trullo-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone: '',
          message: `Automated message from chat:\n\n${userMessage}\n\n---\nFull conversation:\n${conversationHistory}`,
          language: currentLang
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      console.log('Automated email sent successfully!');
      return true;
    } catch (error) {
      console.error('Failed to send automated email:', error);
      return false;
    }
  };

  // UPDATED: handleSend with automatic email detection
  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Log user message
    logMessage('user', input);

    try {
      // Call our API route
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content
          })),
          system: systemPrompts[currentLang],
          language: currentLang
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();

      // NEW: Check if Trullo wants to send an email automatically
      const emailTrigger = data.message.match(/\[AUTO_EMAIL: name="([^"]*)" email="([^"]*)"\]/);
      
      if (emailTrigger) {
        const [fullMatch, autoName, autoEmail] = emailTrigger;
        
        // Remove the trigger from the message
        const cleanMessage = data.message.replace(/\[AUTO_EMAIL:[^\]]+\]/, '').trim();
        
        // Send the email automatically
        const emailSent = await sendAutomatedEmail(autoName, autoEmail, input);
        
        // Show response with confirmation
        const assistantMessage: Message = {
          id: Date.now().toString(),
          role: 'assistant',
          content: emailSent 
            ? cleanMessage + '\n\n✅ Email sent successfully!' 
            : cleanMessage + '\n\n⚠️ There was an issue sending the email. Please use the Leave a Message button below.',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, assistantMessage]);
        logMessage('assistant', assistantMessage.content);
      } else {
        // Normal response without email
        const assistantMessage: Message = {
          id: Date.now().toString(),
          role: 'assistant',
          content: data.message,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, assistantMessage]);
        logMessage('assistant', data.message);
      }
    } catch (error) {
      console.error('Chat error:', error);
      
      const errorMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: translations[currentLang].error,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSendMessage = async () => {
    if (!messageForm.name || !messageForm.email || !messageForm.message) {
      alert('Please fill in all required fields');
      return;
    }
    
    setIsSendingMessage(true);

    try {
      // Debug log
      console.log('Submitting message form:', messageForm);

      // Get conversation history
      const conversationHistory = messages.map(m => 
        `${m.role === 'user' ? 'User' : 'Trullo'}: ${m.content}`
      ).join('\n\n');

      // Save to Supabase
      if (conversationId) {
        await fetch('/api/trullo-log', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'saveContactRequest',
            conversationId,
            name: messageForm.name,
            email: messageForm.email,
            phone: messageForm.phone || '',
            message: messageForm.message,
            language: currentLang
          })
        });
      }

      // Send message via API route (using Resend)
      const response = await fetch('/api/trullo-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: messageForm.name,
          email: messageForm.email,
          phone: messageForm.phone || '',
          message: messageForm.message,
          language: currentLang
        }),
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      // Success message
      const successMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: translations[currentLang].messageForm.success,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, successMessage]);
      setShowMessageForm(false);
      setMessageForm({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Failed to send message:', error);
      alert(translations[currentLang].messageForm.error + ': ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setIsSendingMessage(false);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => {
          if (isOpen) {
            handleCloseChat();
          } else {
            setIsOpen(true);
          }
        }}
        className={`fixed bottom-8 right-8 z-50 p-4 rounded-full shadow-xl transition-all duration-300 ${
          isOpen 
            ? 'bg-gray-600 hover:bg-gray-700' 
            : 'bg-gradient-to-r from-purple-600 to-emerald-600 hover:shadow-2xl hover:scale-110'
        }`}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <div className="relative">
            <img 
              src="/Trullo.png" 
              alt="Chat with Trullo"
              className="w-8 h-8 object-contain"
              onError={(e) => {
                // Fallback if image doesn't load
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement!.innerHTML = `
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                `;
              }}
            />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className={`fixed bottom-28 right-8 z-50 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300 ${currentLang === 'ar' ? 'rtl' : 'ltr'}`}>
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-emerald-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center p-1 shadow-md">
                  <img 
                    src="/Trullo.png" 
                    alt="Trullo"
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement!.innerHTML = '🤖';
                    }}
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{translations[currentLang].title}</h3>
                  <p className="text-sm text-white/80">
                    {translations[currentLang].subtitle}
                  </p>
                </div>
              </div>
              {/* Language Selector */}
              <select
                value={currentLang}
                onChange={(e) => setCurrentLang(e.target.value as Language)}
                className="bg-white/20 text-white border border-white/30 rounded px-2 py-1 text-sm"
              >
                <option value="en">🇬🇧 EN</option>
                <option value="it">🇮🇹 IT</option>
                <option value="es">🇪🇸 ES</option>
                <option value="fr">🇫🇷 FR</option>
                <option value="de">🇩🇪 DE</option>
                <option value="ar">🇸🇦 AR</option>
                <option value="zh">🇨🇳 ZH</option>
              </select>
            </div>
          </div>

          {/* Messages or Message Form */}
          {showMessageForm ? (
            <div className="flex-1 p-6 bg-gray-50">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                {translations[currentLang].messageForm.title}
              </h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder={translations[currentLang].messageForm.name}
                  value={messageForm.name}
                  onChange={(e) => setMessageForm({...messageForm, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                  required
                />
                <input
                  type="email"
                  placeholder={translations[currentLang].messageForm.email}
                  value={messageForm.email}
                  onChange={(e) => setMessageForm({...messageForm, email: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                  required
                />
                <input
                  type="tel"
                  placeholder={translations[currentLang].messageForm.phone}
                  value={messageForm.phone}
                  onChange={(e) => setMessageForm({...messageForm, phone: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                />
                <textarea
                  placeholder={translations[currentLang].messageForm.message}
                  value={messageForm.message}
                  onChange={(e) => setMessageForm({...messageForm, message: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600 h-32 resize-none"
                  required
                />
                <div className="flex space-x-3">
                  <button
                    onClick={handleSendMessage}
                    disabled={isSendingMessage || !messageForm.name || !messageForm.email || !messageForm.message}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-emerald-600 text-white py-2 rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
                  >
                    {isSendingMessage ? translations[currentLang].messageForm.sending : translations[currentLang].messageForm.send}
                  </button>
                  <button
                    onClick={() => setShowMessageForm(false)}
                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-all"
                  >
                    {translations[currentLang].messageForm.cancel}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        message.role === 'user'
                          ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white'
                          : 'bg-white text-gray-800 shadow-sm border border-gray-100'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.role === 'user' ? 'text-purple-200' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white rounded-2xl px-4 py-3 shadow-sm border border-gray-100">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="border-t border-gray-200 p-4 bg-white">
                <div className="flex items-center space-x-2 mb-2">
                  <button
                    onClick={() => setShowMessageForm(true)}
                    className="px-4 py-2 text-sm bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 transition-all"
                  >
                    📝 {translations[currentLang].leaveMessage}
                  </button>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={translations[currentLang].placeholder}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100"
                    disabled={isTyping}
                    dir={currentLang === 'ar' ? 'rtl' : 'ltr'}
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || isTyping}
                    className={`p-2 rounded-full transition-all duration-200 ${
                      input.trim() && !isTyping
                        ? 'bg-gradient-to-r from-purple-600 to-emerald-600 text-white hover:shadow-lg hover:scale-105'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  {translations[currentLang].poweredBy}
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
