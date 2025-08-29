-- WhatsApp Integration Tables for InvestInPuglia

-- Store all WhatsApp conversations
CREATE TABLE IF NOT EXISTS whatsapp_conversations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  phone_number VARCHAR(50) NOT NULL,
  message TEXT NOT NULL,
  sender VARCHAR(10) CHECK (sender IN ('user', 'bot')),
  language VARCHAR(5) DEFAULT 'en',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Index for fast lookups
CREATE INDEX idx_whatsapp_phone_number ON whatsapp_conversations(phone_number);
CREATE INDEX idx_whatsapp_created_at ON whatsapp_conversations(created_at DESC);

-- WhatsApp analytics and lead scoring
CREATE TABLE IF NOT EXISTS whatsapp_analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  phone_number VARCHAR(50) NOT NULL,
  profile_name VARCHAR(255),
  language VARCHAR(5) DEFAULT 'en',
  has_investment_intent BOOLEAN DEFAULT FALSE,
  message_count INTEGER DEFAULT 1,
  last_interaction TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  lead_score INTEGER DEFAULT 0,
  consultation_offered BOOLEAN DEFAULT FALSE,
  consultation_booked BOOLEAN DEFAULT FALSE,
  stripe_payment_id VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for analytics
CREATE INDEX idx_whatsapp_analytics_phone ON whatsapp_analytics(phone_number);
CREATE INDEX idx_whatsapp_analytics_score ON whatsapp_analytics(lead_score DESC);

-- WhatsApp lead information
CREATE TABLE IF NOT EXISTS whatsapp_leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  phone_number VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(255),
  email VARCHAR(255),
  language VARCHAR(5) DEFAULT 'en',
  budget_range VARCHAR(50),
  timeline VARCHAR(50),
  property_type VARCHAR(100),
  investment_purpose TEXT,
  lead_source VARCHAR(50) DEFAULT 'whatsapp',
  lead_status VARCHAR(50) DEFAULT 'new',
  assigned_to VARCHAR(255),
  notes TEXT,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for leads
CREATE INDEX idx_whatsapp_leads_status ON whatsapp_leads(lead_status);
CREATE INDEX idx_whatsapp_leads_created ON whatsapp_leads(created_at DESC);

-- Conversation state management
CREATE TABLE IF NOT EXISTS whatsapp_conversation_state (
  phone_number VARCHAR(50) PRIMARY KEY,
  current_state VARCHAR(50) DEFAULT 'greeting',
  context JSONB DEFAULT '{}'::jsonb,
  language VARCHAR(5) DEFAULT 'en',
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- WhatsApp message templates (for Meta approval)
CREATE TABLE IF NOT EXISTS whatsapp_templates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  template_name VARCHAR(100) UNIQUE NOT NULL,
  language VARCHAR(5) NOT NULL,
  category VARCHAR(50) NOT NULL,
  header_text TEXT,
  body_text TEXT NOT NULL,
  footer_text TEXT,
  buttons JSONB,
  variables TEXT[],
  meta_status VARCHAR(50) DEFAULT 'pending',
  meta_template_id VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  approved_at TIMESTAMP WITH TIME ZONE
);

-- Automated follow-up sequences
CREATE TABLE IF NOT EXISTS whatsapp_followup_sequences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  phone_number VARCHAR(50) NOT NULL,
  sequence_type VARCHAR(50) NOT NULL,
  step_number INTEGER NOT NULL,
  scheduled_for TIMESTAMP WITH TIME ZONE NOT NULL,
  message_template VARCHAR(100),
  sent BOOLEAN DEFAULT FALSE,
  sent_at TIMESTAMP WITH TIME ZONE,
  response_received BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for follow-ups
CREATE INDEX idx_whatsapp_followup_scheduled ON whatsapp_followup_sequences(scheduled_for)
WHERE sent = FALSE;

-- Enable Row Level Security
ALTER TABLE whatsapp_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE whatsapp_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE whatsapp_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE whatsapp_conversation_state ENABLE ROW LEVEL SECURITY;
ALTER TABLE whatsapp_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE whatsapp_followup_sequences ENABLE ROW LEVEL SECURITY;

-- Create policies for service role access
CREATE POLICY "Service role can manage all WhatsApp data"
  ON whatsapp_conversations
  FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage WhatsApp analytics"
  ON whatsapp_analytics
  FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage WhatsApp leads"
  ON whatsapp_leads
  FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage conversation state"
  ON whatsapp_conversation_state
  FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage templates"
  ON whatsapp_templates
  FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage follow-ups"
  ON whatsapp_followup_sequences
  FOR ALL
  USING (auth.role() = 'service_role');