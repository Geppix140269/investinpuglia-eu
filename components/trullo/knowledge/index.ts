// PATH: components/trullo/knowledge/index.ts
import { KnowledgeModule } from './types';
import { personalityModule } from './core/personality';
import { expertRoutingKnowledge } from './core/expert-directory';
import { emailAutomationKnowledge } from './capabilities/email-automation';
import { leadStorageKnowledge } from './capabilities/lead-storage';
import { leadCaptureStrategy } from './strategies/lead-capture';
import { euGrantsKnowledge } from './expertise/eu-grants';
import { trustBuildingStrategy } from './strategies/trust-building';
import { ctaButtonsKnowledge } from './strategies/cta-buttons';
import { userRegistrationKnowledge } from './capabilities/user-registration';

// Central knowledge repository
export const knowledgeModules: KnowledgeModule[] = [
  // Core modules
  personalityModule,
  expertRoutingKnowledge,
  
  // Capabilities
  emailAutomationKnowledge,
  leadStorageKnowledge,
  userRegistrationKnowledge,
  
  // Expertise
  euGrantsKnowledge,
  
  // Strategies
  leadCaptureStrategy,
  trustBuildingStrategy,
  ctaButtonsKnowledge
];

// Export knowledge manager functions
export { getRelevantKnowledge } from './utils/knowledge-manager';
export type { KnowledgeModule, KnowledgeCategory, LanguageCode } from './types';
