// PATH: components/trullo/knowledge/index.ts
import { KnowledgeModule, KnowledgeContext } from './types';
import { createClient } from '@sanity/client';

// Keep core modules in code
import { personalityKnowledge } from './core/personality';
import { expertRoutingKnowledge } from './core/expert-directory';

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
    // Register core modules that should always be in code
    this.registerModule(personalityKnowledge);
    this.registerModule(expertRoutingKnowledge);
    
    // Load Sanity modules on init
    this.loadSanityModules();
  }

  private registerModule(module: KnowledgeModule) {
    this.modules.set(module.id, module);
  }

  private async loadSanityModules() {
    try {
      // Check cache
      if (Date.now() - this.lastSanityFetch < this.CACHE_DURATION) {
        return;
      }

      const query = `*[_type == "trulloKnowledge" && isActive == true] {
        moduleId,
        category,
        priority,
        languages,
        triggers,
        content,
        metadata
      }`;

      const modules = await sanityClient.fetch(query);
      
      this.sanityModules = modules.map((m: any) => ({
        id: m.moduleId,
        category: m.category,
        priority: m.priority,
        languages: m.languages,
        triggers: m.triggers,
        content: m.content,
        metadata: m.metadata
      }));

      this.lastSanityFetch = Date.now();
      console.log(`Loaded ${this.sanityModules.length} knowledge modules from Sanity`);
    } catch (error) {
      console.error('Failed to load Sanity modules:', error);
    }
  }

  async getRelevantKnowledge(context: KnowledgeContext): Promise<KnowledgeModule[]> {
    // Refresh Sanity modules if needed
    await this.loadSanityModules();

    const relevant: KnowledgeModule[] = [];
    const allModules = [...this.modules.values(), ...this.sanityModules];

    allModules.forEach(module => {
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

  async buildSystemPrompt(context: KnowledgeContext): Promise<string> {
    const relevantModules = await this.getRelevantKnowledge(context);
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
