import { CampaignPlan, AssetItem, ChannelType, ComplianceCheck } from '../types/campaign';
import { brandStoreService } from './brandStoreService';

class AICampaignService {
  async generateCampaignPlan(input: {
    title: string;
    productUrl: string;
    objective: string;
    targetAudience: string;
    budget: number;
    channels: ChannelType[];
  }): Promise<CampaignPlan> {
    try {
      const res = await fetch('/api/campaigns/plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input)
      });
      if (res.ok) {
        const data = await res.json();
        return data.plan;
      }
    } catch {
      // Fallback
    }

    const today = new Date();
    return {
      id: `cmp-${Date.now()}`,
      title: input.title || 'Q3 Developer Product Launch',
      productUrl: input.productUrl || 'https://nexusai.io/features/dev-agent',
      objective: input.objective || 'Drive 1,500 developer signups',
      targetAudience: input.targetAudience || 'VP of Platform Engineering',
      startDate: today.toISOString().split('T')[0],
      endDate: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'active',
      channels: input.channels,
      budget: input.budget || 5000,
      kpis: [
        { metric: 'Target Engagements', target: '25,000' },
        { metric: 'CTR', target: '4.8%' }
      ],
      createdAt: new Date().toISOString()
    };
  }

  async generateCampaignAssets(campaign: CampaignPlan): Promise<AssetItem[]> {
    const brand = await brandStoreService.getBrandContext();
    try {
      const res = await fetch('/api/assets/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ campaign, brand })
      });
      if (res.ok) {
        const data = await res.json();
        return data.assets;
      }
    } catch {
      // Fallback
    }

    return [];
  }
}

export const aiCampaignService = new AICampaignService();
