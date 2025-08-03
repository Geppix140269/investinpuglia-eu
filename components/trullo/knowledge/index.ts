// PATH: components/trullo/knowledge/index.ts
import { KnowledgeModule, KnowledgeContext } from './types';
import { createClient } from '@sanity/client';

// Keep core modules in code
import { personalityKnowledge } from './core/personality';
import { expertRoutingKnowledge } from './core/expert-directory';
import { professionalRedirectStrategy } from './strategies/professional-redirect';

// Import other modules
import { emailAutomationKnowledge } from './capabilities/email-automation';
import { leadStorageKnowledge } from './capabilities/lead-storage';
import { userRegistrationKnowledge } from './capabilities/user-registration';
import { euGrantsKnowledge } from './expertise/eu-grants';
import { leadCaptureStrategy } from './strategies/lead-capture';
import { trustBuildingStrategy } from './strategies/trust-building';
import { ctaButtonsKnowledge } from './strategies/cta-buttons';
import { authRequirementKnowledge } from './strategies/auth-requirement';

// Sanity client
const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: true,
});

export class TrulloKnowledgeBase {
  private modules: Map<string, KnowledgeModule> = new Map();
  private sanityModules: KnowledgeModule[] = [];
  private lastSanityFetch: number = 0;
  private CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  constructor() {
    // Register all knowledge modules
    this.registerModules([
      // High priority strategies (these override others)
      professionalRedirectStrategy,

      // Core
      personalityKnowledge,
      expertRoutingKnowledge,

      // Capabilities
      emailAutomationKnowledge,
      leadStorageKnowledge,
      userRegistrationKnowledge,

      // Expertise
      euGrantsKnowledge,

      // Strategies
      authRequirementKnowledge,
      ctaButtonsKnowledge,
      leadCaptureStrategy,
      trustBuildingStrategy,
    ]);

    // Load Sanity modules on init
    this.loadSanityModules();
  }

  private registerModule(module: KnowledgeModule) {
    this.modules.set(module.id, module);
  }

  private registerModules(modules: KnowledgeModule[]) {
    modules.forEach(module => this.registerModule(module));
  }

  private async loadSanityModules() {
    try {
      // Check cache
      if (Date.now() - this.lastSanityFetch < this.CACHE_DURATION) {
        return;
      }

      const query = `*[_type == "knowledgeModule" && enabled == true] {
        id,
        title,
        category,
        priority,
        triggers,
        content,
        languages,
        metadata
      }`;

      const modules = await sanityClient.fetch<KnowledgeModule[]>(query);
      
      this.sanityModules = modules;
      modules.forEach(module => this.registerModule(module));
      
      this.lastSanityFetch = Date.now();
    } catch (error) {
      console.error('Failed to load Sanity modules:', error);
    }
  }

  async getRelevantModules(context: KnowledgeContext): Promise<KnowledgeModule[]> {
    // Refresh Sanity modules if needed
    await this.loadSanityModules();

    const allModules = Array.from(this.modules.values());
    
    return allModules
      .filter(module => {
        // Check language
        if (module.languages && 
            module.languages.length > 0 && 
            !module.languages.includes('*') && 
            !module.languages.includes(context.language)) {
          return false;
        }

        // Check triggers
        if (module.triggers && module.triggers.length > 0) {
          const messageLower = context.lastMessage.toLowerCase();
          return module.triggers.some(trigger => 
            messageLower.includes(trigger.toLowerCase())
          );
        }

        // Include if no specific triggers (general knowledge)
        return true;
      })
      .sort((a, b) => (b.priority || 0) - (a.priority || 0));
  }

  buildSystemPrompt(context: KnowledgeContext): string {
    // Get the personality module for base prompt
    const personalityModule = this.modules.get('trullo-personality');
    let systemPrompt = personalityModule?.content || 'You are Trullo, the helpful AI assistant for InvestInPuglia.eu.';

    // Add language-specific adjustments
    if (context.language === 'it') {
      systemPrompt += '\n\nRISPONDI SEMPRE IN ITALIANO. Usa un tono amichevole e professionale.';
    } else {
      systemPrompt += '\n\nALWAYS RESPOND IN ENGLISH. Use a friendly and professional tone.';
    }

    // Add context about conversation stage
    if (context.messageCount === 0) {
      systemPrompt += '\n\nThis is the start of a new conversation. Greet the user warmly.';
    }

    // Add any relevant module-specific prompts based on triggers
    const relevantModules = Array.from(this.modules.values())
      .filter(module => {
        if (module.triggers && module.triggers.length > 0 && context.lastMessage) {
          const messageLower = context.lastMessage.toLowerCase();
          return module.triggers.some(trigger => 
            messageLower.includes(trigger.toLowerCase())
          );
        }
        return false;
      })
      .sort((a, b) => (b.priority || 0) - (a.priority || 0));

    // Add high-priority module instructions
    relevantModules.slice(0, 3).forEach(module => {
      if (module.content && typeof module.content === 'string') {
        systemPrompt += '\n\n' + module.content;
      }
    });

    return systemPrompt;
  }

  getModuleById(id: string): KnowledgeModule | undefined {
    return this.modules.get(id);
  }

  getAllModules(): KnowledgeModule[] {
    return Array.from(this.modules.values());
  }
}

// Export singleton instance
export const trulloKnowledge = new TrulloKnowledgeBase();
