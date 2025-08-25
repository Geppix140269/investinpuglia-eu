-- PATH: supabase/migrations/create_agreements_tables.sql

-- Create agreements table
CREATE TABLE IF NOT EXISTS agreements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  access_token VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  
  -- Client Information
  client_name VARCHAR(255) NOT NULL,
  client_email VARCHAR(255) NOT NULL,
  client_phone VARCHAR(50),
  client_company VARCHAR(255),
  
  -- Project Details
  project_description TEXT NOT NULL,
  total_investment DECIMAL(12, 2) NOT NULL,
  grant_amount DECIMAL(12, 2) NOT NULL,
  service_fee DECIMAL(12, 2) NOT NULL,
  start_date DATE NOT NULL,
  completion_date DATE NOT NULL,
  
  -- Agreement Status
  status VARCHAR(50) DEFAULT 'pending', -- pending, viewed, edited, signed, completed
  
  -- Signatures
  client_signature TEXT,
  client_signed_at TIMESTAMP,
  client_ip_address VARCHAR(50),
  
  giuseppe_signature TEXT,
  giuseppe_signed_at TIMESTAMP,
  
  -- DocuSign/HelloSign Integration
  signature_request_id VARCHAR(255),
  signing_provider VARCHAR(50), -- docusign, hellosign, manual
  envelope_id VARCHAR(255),
  
  -- Tracking
  created_at TIMESTAMP DEFAULT NOW(),
  created_by VARCHAR(255) DEFAULT 'Giuseppe Funaro',
  last_modified TIMESTAMP,
  first_accessed TIMESTAMP,
  access_count INTEGER DEFAULT 0,
  
  -- Document Storage
  pdf_url TEXT,
  signed_pdf_url TEXT,
  
  -- Additional Fields
  notes TEXT,
  internal_notes TEXT,
  payment_terms TEXT,
  special_conditions TEXT
);

-- Create agreement logs table for audit trail
CREATE TABLE IF NOT EXISTS agreement_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  token VARCHAR(255) NOT NULL,
  action VARCHAR(100) NOT NULL, -- accessed, edited, signed, downloaded, etc.
  timestamp TIMESTAMP DEFAULT NOW(),
  ip_address VARCHAR(50),
  user_agent TEXT,
  details TEXT,
  changes JSONB,
  
  FOREIGN KEY (token) REFERENCES agreements(access_token) ON DELETE CASCADE
);

-- Create agreement templates table
CREATE TABLE IF NOT EXISTS agreement_templates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  template_content JSONB NOT NULL,
  category VARCHAR(100),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX idx_agreements_token ON agreements(access_token);
CREATE INDEX idx_agreements_status ON agreements(status);
CREATE INDEX idx_agreements_client_email ON agreements(client_email);
CREATE INDEX idx_agreement_logs_token ON agreement_logs(token);
CREATE INDEX idx_agreement_logs_timestamp ON agreement_logs(timestamp);

-- Create RLS policies
ALTER TABLE agreements ENABLE ROW LEVEL SECURITY;
ALTER TABLE agreement_logs ENABLE ROW LEVEL SECURITY;

-- Policy for authenticated users (admin)
CREATE POLICY "Admin can view all agreements" ON agreements
  FOR ALL USING (auth.role() = 'authenticated');

-- Policy for public access with token
CREATE POLICY "Public can view agreement with valid token" ON agreements
  FOR SELECT USING (true); -- Token validation happens at API level

-- Policy for logs
CREATE POLICY "Admin can view all logs" ON agreement_logs
  FOR ALL USING (auth.role() = 'authenticated');

-- Function to automatically update last_modified
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.last_modified = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to update last_modified
CREATE TRIGGER update_agreements_modtime 
  BEFORE UPDATE ON agreements 
  FOR EACH ROW 
  EXECUTE FUNCTION update_modified_column();

-- Function to increment access count
CREATE OR REPLACE FUNCTION increment_access_count(token_param VARCHAR)
RETURNS VOID AS $$
BEGIN
  UPDATE agreements 
  SET access_count = access_count + 1,
      first_accessed = CASE 
        WHEN first_accessed IS NULL THEN NOW() 
        ELSE first_accessed 
      END
  WHERE access_token = token_param;
END;
$$ language 'plpgsql';

-- Sample template
INSERT INTO agreement_templates (name, description, template_content, category) VALUES (
  'Standard Project Management Agreement',
  'Default template for PMA with grant management services',
  '{
    "sections": [
      {"type": "header", "content": "PROJECT MANAGEMENT AGREEMENT"},
      {"type": "parties", "fields": ["client_name", "client_email", "consultant_name"]},
      {"type": "scope", "content": "Grant application and project management services"},
      {"type": "terms", "content": "Standard terms and conditions"},
      {"type": "signatures", "fields": ["client_signature", "consultant_signature"]}
    ]
  }'::jsonb,
  'standard'
);