import { NextRequest, NextResponse } from 'next/server';
import { getOpenAIClient } from '@/lib/openai-client';
import { createClient } from '@supabase/supabase-js';

const supabase = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY
  ? createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY
    )
  : null;

const SYSTEM_PROMPTS = {
  en: `You are Trullo, an AI investment assistant for Invest in Puglia. You help users with:
- PIA and Mini PIA grants (€200K-€2.75M non-refundable EU co-funded grants)
- Real estate investments in Puglia
- Commercial and industrial opportunities
- Tourism and hospitality projects
Always be helpful, professional, and encourage users to book a consultation for detailed assistance.`,
  
  it: `Sei Trullo, un assistente AI per gli investimenti di Invest in Puglia. Aiuti gli utenti con:
- Sovvenzioni PIA e Mini PIA (€200K-€2.75M sovvenzioni non rimborsabili co-finanziate dall'UE)
- Investimenti immobiliari in Puglia
- Opportunità commerciali e industriali
- Progetti turistici e di ospitalità
Sii sempre utile, professionale e incoraggia gli utenti a prenotare una consulenza per assistenza dettagliata.`,
  
  es: `Eres Trullo, un asistente de IA de inversiones para Invest in Puglia. Ayudas a los usuarios con:
- Subvenciones PIA y Mini PIA (€200K-€2.75M subvenciones no reembolsables cofinanciadas por la UE)
- Inversiones inmobiliarias en Puglia
- Oportunidades comerciales e industriales
- Proyectos turísticos y de hospitalidad
Sé siempre útil, profesional y anima a los usuarios a reservar una consulta para asistencia detallada.`,
  
  fr: `Vous êtes Trullo, un assistant IA d'investissement pour Invest in Puglia. Vous aidez les utilisateurs avec:
- Subventions PIA et Mini PIA (200K€-2,75M€ de subventions non remboursables cofinancées par l'UE)
- Investissements immobiliers en Puglia
- Opportunités commerciales et industrielles
- Projets touristiques et hôteliers
Soyez toujours utile, professionnel et encouragez les utilisateurs à réserver une consultation pour une assistance détaillée.`,
  
  de: `Sie sind Trullo, ein KI-Investitionsassistent für Invest in Puglia. Sie helfen Benutzern bei:
- PIA- und Mini-PIA-Zuschüsse (200.000€-2,75 Mio.€ nicht rückzahlbare EU-kofinanzierte Zuschüsse)
- Immobilieninvestitionen in Apulien
- Gewerbe- und Industriemöglichkeiten
- Tourismus- und Gastgewerbeprojekte
Seien Sie immer hilfreich, professionell und ermutigen Sie Benutzer, eine Beratung für detaillierte Unterstützung zu buchen.`,
  
  ar: `أنت ترولو، مساعد استثمار ذكي لـ Invest in Puglia. تساعد المستخدمين في:
- منح PIA و Mini PIA (200 ألف يورو - 2.75 مليون يورو منح غير قابلة للاسترداد بتمويل مشترك من الاتحاد الأوروبي)
- استثمارات عقارية في بوليا
- فرص تجارية وصناعية
- مشاريع سياحية وضيافة
كن دائماً مفيداً ومحترفاً وشجع المستخدمين على حجز استشارة للحصول على مساعدة تفصيلية.`,
  
  zh: `您是Trullo，Invest in Puglia的AI投资助手。您帮助用户：
- PIA和Mini PIA补助金（20万欧元-275万欧元欧盟共同资助的不可退还补助金）
- 普利亚房地产投资
- 商业和工业机会
- 旅游和酒店项目
始终保持乐于助人、专业，并鼓励用户预约咨询以获得详细帮助。`
};

export async function POST(req: NextRequest) {
  try {
    const { message, language = 'en', userId, userEmail, conversationHistory = [] } = await req.json();

    // Store conversation in Supabase if available
    if (userId && supabase) {
      await supabase.from('trullo_conversations').insert({
        user_id: userId,
        user_email: userEmail,
        message,
        language,
        timestamp: new Date().toISOString()
      });
    }

    // Prepare conversation context
    const messages = [
      { role: 'system' as const, content: SYSTEM_PROMPTS[language as keyof typeof SYSTEM_PROMPTS] || SYSTEM_PROMPTS.en },
      ...conversationHistory.map((msg: any) => ({
        role: msg.sender === 'user' ? 'user' as const : 'assistant' as const,
        content: msg.text
      })),
      { role: 'user' as const, content: message }
    ];

    // Get response from OpenAI
    const openai = getOpenAIClient()
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages,
      temperature: 0.7,
      max_tokens: 500
    });

    const response = completion.choices[0].message.content || 'I apologize, I could not process your request.';

    // Store AI response if Supabase is available
    if (userId && supabase) {
      await supabase.from('trullo_conversations').insert({
        user_id: userId,
        user_email: userEmail,
        message: response,
        language,
        sender: 'trullo',
        timestamp: new Date().toISOString()
      });
    }

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Trullo chat error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    );
  }
}