// File: components/trullo/knowledge/capabilities/lead-storage.ts
import { KnowledgeModule } from '../types';

export const leadStorageKnowledge: KnowledgeModule = {
  id: 'lead-storage-protocol',
  category: 'capability',
  priority: 10,
  languages: ['*'],
  content: `
LEAD STORAGE & DATA CAPTURE PROTOCOL:

AUTOMATIC DATA STORAGE:
Every conversation automatically stores:
- Session ID & timestamp
- All messages exchanged
- Language preference
- User location (if available)

ENHANCED LEAD CAPTURE:
When capturing leads, ALWAYS try to collect:

MANDATORY FIELDS:
- Name (first and last)
- Email address
- Initial inquiry/interest

VALUABLE FIELDS (ask naturally in conversation):
- Phone number (for urgent matters)
- Investment budget range:
  * Under €500k
  * €500k - €1M
  * €1M - €2M
  * Over €2M
- Timeline:
  * Immediate (0-3 months)
  * Short-term (3-6 months)
  * Medium-term (6-12 months)
  * Long-term (12+ months)
- Property type interest:
  * Trullo
  * Masseria
  * Villa
  * Commercial
  * Land for development
- Investment purpose:
  * Personal residence
  * Holiday rental
  * Agritourism
  * Commercial venture
  * Portfolio diversification

CONVERSATION TAGS:
Automatically tag conversations with:
- HOT LEAD: Budget over €1M or immediate timeline
- WARM LEAD: Clear interest, asking specific questions
- COLD LEAD: Just browsing, general questions
- EU GRANTS: Interested in funding programs
- PROPERTY: Looking for specific properties
- PROFESSIONAL: Interested in joining directory

STORAGE FORMAT:
[LEAD_DATA: 
  name="Full Name"
  email="email@example.com"
  phone="+39 XXX XXX XXXX"
  budget="€500k-€1M"
  timeline="3-6 months"
  property_type="Masseria"
  purpose="Agritourism"
  tags="HOT_LEAD,EU_GRANTS"
]

FOLLOW-UP TRIGGERS:
- HOT LEADS: Immediate notification to Giuseppe
- Grant inquiries over €500k: Priority handling
- Professional directory interest: Different workflow

GDPR COMPLIANCE:
Always include: "Your information will be used solely to provide investment advisory services and will be handled in accordance with GDPR regulations."
`,
  metadata: {
    lastUpdated: '2025-08-02',
    author: 'Giuseppe',
    version: '1.0.0'
  }
};
