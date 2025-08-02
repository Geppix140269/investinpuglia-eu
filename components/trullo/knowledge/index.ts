// File: components/trullo/knowledge/index.ts
import { KnowledgeModule, KnowledgeContext } from './types';

// Import all knowledge modules
import { personalityKnowledge } from './core/personality';
import { emailAutomationKnowledge } from './capabilities/email-automation';
import { leadStorageKnowledge } from './capabilities/lead-storage';
import { leadCaptureStrategy } from './strategies/lead-capture';
import { euGrantsKnowledge } from './expertise/eu-grants';
import { trustBuildingStrategy } from './strategies/trust-building';
import { ctaButtonsKnowledge } from './strategies/cta-buttons';

export class TrulloKnowledgeBase {
  private modules: Map<string, KnowledgeModule> = new Map();
  
  constructor() {
    // Register all knowledge modules
    this.registerModules([
      // Core
      personalityKnowledge,
      
      // Capabilities
      emailAutomationKnowledge,
      leadStorageKnowledge, // NEW!
      
      // Expertise
      euGrantsKnowledge,
      
      // Strategies
      leadCaptureStrategy,
      trustBuildingStrategy,
      ctaButtonsKnowledge,
      
      // Add more modules here as you create them
    ]);
  }

  private registerModules(modules: KnowledgeModule[]) {
    modules.forEach(module => {
      this.modules.set(module.id, module);
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
    
    // Sort by priority
    return relevant.sort((a, b) => b.priority - a.priority);
  }

  buildSystemPrompt(context: KnowledgeContext): string {
    const relevantModules = this.getRelevantKnowledge(context);
    const language = context.language;
    
    let prompt = "";
    
    relevantModules.forEach(module => {
      const content = typeof module.content === 'string' 
        ? module.content 
        : module.content[language] || module.content.en || module.content;
      
      prompt += `[${module.category.toUpperCase()}: ${module.id}]\n`;
      prompt += content + '\n\n';
    });
    
    return prompt.trim();
  }
}

export const trulloKnowledge = new TrulloKnowledgeBase();



