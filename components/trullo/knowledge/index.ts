// PATH: components/trullo/knowledge/index.ts
import { KnowledgeModule, KnowledgeContext } from './types';
import { createClient } from '@sanity/client';

// Import ALL knowledge modules
import { personalityKnowledge } from './core/personality';
import { expertRoutingKnowledge } from './core/expert-directory';
import { emailAutomationKnowledge } from './capabilities/email-automation';
import { leadStorageKnowledge } from './capabilities/lead-storage';
import { userRegistrationKnowledge } from './capabilities/user-registration';
import { authRequirementKnowledge } from './strategies/auth-requirement';
import { ctaButtonsKnowledge } from './strategies/cta-buttons';
import { leadCaptureStrategy } from './strategies/lead-capture';
import { trustBuildingStrategy } from './strategies/trust-building';
import { professionalRedirectStrategy } from './strategies/professional-redirect';
import { euGrantsKnowledge } from './expertise/eu-grants';

// Import the CORRECT system prompts
import { systemPrompts } from '../constants/prompts';

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
    // Register ALL modules - HIGH PRIORITY FIRST
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

  private registerModules(modules: KnowledgeModule[]) {
    modules.forEach(module => {
      this.modules.set(module.id, module);
      console.log(`🧠 Registered knowledge module: ${module.id}`);
    });
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
      modules.forEach(module => {
        this.modules.set(module.id, module);
        console.log(`🧠 Loaded Sanity module: ${module.id}`);
      });
      
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
          const messageLower = context.message.toLowerCase();
          return module.triggers.some(trigger => 
            messageLower.includes(trigger.toLowerCase())
          );
        }

        // Include if no specific triggers (general knowledge)
        return true;
      })
      .sort((a, b) => (b.priority || 0) - (a.priority || 0));
  }

  getRelevantKnowledge(context: KnowledgeContext): KnowledgeModule[] {
    const relevant: KnowledgeModule[] = [];
    
    this.modules.forEach(module => {
      // Check language support
      if (!module.languages.includes(context.language) && !module.languages.includes('*')) {
        return;
      }
      
      // Always include core modules
      if (module.category === 'core') {
        relevant.push(module);
        return;
      }
      
      // Check triggers
      if (module.triggers) {
        const messageLower = context.message.toLowerCase();
        const triggered = module.triggers.some(trigger =>
          messageLower.includes(trigger.toLowerCase())
        );
        
        if (triggered) {
          relevant.push(module);
        }
      }
    });
    
    // Sort by priority (higher priority first)
    return relevant.sort((a, b) => b.priority - a.priority);
  }

  buildSystemPrompt(context: KnowledgeContext): string {
    // START WITH THE CORRECT SYSTEM PROMPT FROM CONSTANTS
    let basePrompt = systemPrompts[context.language] || systemPrompts.en;
    
    // Then add relevant knowledge modules
    const relevantModules = this.getRelevantKnowledge(context);
    let additionalPrompts = "";
    
    relevantModules.forEach(module => {
      const content = typeof module.content === 'string'
        ? module.content
        : module.content[context.language] || module.content.en || module.content;
      
      additionalPrompts += `\n\n[${module.category.toUpperCase()}: ${module.id}]\n`;
      additionalPrompts += content;
    });
    
    return basePrompt + additionalPrompts;
  }

  getModuleById(id: string): KnowledgeModule | undefined {
    return this.modules.get(id);
  }

  getAllModules(): KnowledgeModule[] {
    return Array.from(this.modules.values());
  }
}

export const trulloKnowledge = new TrulloKnowledgeBase();
