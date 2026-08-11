import { BrandContext, Persona } from '../types/campaign';

class BrandStoreService {
  private brandContext: BrandContext | null = null;

  async getBrandContext(): Promise<BrandContext> {
    try {
      const res = await fetch('/api/brand');
      if (res.ok) {
        const data = await res.json();
        this.brandContext = data.brand;
        return data.brand;
      }
    } catch {
      // Fallback if backend API offline
    }

    if (!this.brandContext) {
      const saved = localStorage.getItem('nexus_brand_context');
      this.brandContext = saved ? JSON.parse(saved) : this.getDefaultBrand();
    }
    return { ...this.brandContext! };
  }

  async updateBrandContext(updated: Partial<BrandContext>): Promise<BrandContext> {
    try {
      const res = await fetch('/api/brand', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
      if (res.ok) {
        const data = await res.json();
        this.brandContext = data.brand;
        return data.brand;
      }
    } catch {
      // Fallback
    }

    this.brandContext = { ...this.brandContext!, ...updated };
    localStorage.setItem('nexus_brand_context', JSON.stringify(this.brandContext));
    return { ...this.brandContext! };
  }

  async addPastLearning(learning: string): Promise<BrandContext> {
    try {
      const res = await fetch('/api/brand/learning', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ learning })
      });
      if (res.ok) {
        const data = await res.json();
        this.brandContext = data.brand;
        return data.brand;
      }
    } catch {
      // Fallback
    }

    if (this.brandContext) {
      this.brandContext.pastLearnings.unshift(learning);
      this.brandContext.vectorEmbeddingsCount += 12;
      localStorage.setItem('nexus_brand_context', JSON.stringify(this.brandContext));
    }
    return { ...this.brandContext! };
  }

  private getDefaultBrand(): BrandContext {
    return {
      id: 'brand-1',
      name: 'NexusAI Engine',
      tagline: 'Autonomous AI Infrastructure for Modern Enterprise Engineering',
      website: 'https://nexusai.io',
      toneOfVoice: [
        'Authoritative yet accessible',
        'Data-driven & precision focused',
        'Developer-first & technical'
      ],
      prohibitedTerms: ['cheap', 'magic', 'guaranteed 100x'],
      coreValues: ['Sub-ms Performance', 'Enterprise Security'],
      targetPersonas: [],
      pastLearnings: [],
      vectorEmbeddingsCount: 1420
    };
  }
}

export const brandStoreService = new BrandStoreService();
