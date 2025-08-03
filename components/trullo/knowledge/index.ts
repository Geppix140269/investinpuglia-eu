// PATH: components/trullo/knowledge/index.ts
import { KnowledgeModule, KnowledgeContext } from './types';

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

// Import the CORRECT system prompts
import { systemPrompts } from '../constants/prompts';

export class TrulloKnowledgeBase {
  private modules: Map<string, KnowledgeModule> = new Map();

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
      investmentCalculatorKnowledge,
      
      // Expertise
      euGrantsKnowledge,
      miniPiaKnowledge,
      
      // Strategies
      authRequirementKnowledge,
      ctaButtonsKnowledge,
      leadCaptureStrategy,
      trustBuildingStrategy,
    ]);
  }

  private registerModules(modules: KnowledgeModule[]) {
    modules.forEach(module => {
      this.modules.set(module.id, module);
      console.log(`🧠 Registered knowledge module: ${module.id}`);
    });
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
}

export const trulloKnowledge = new TrulloKnowledgeBase();
