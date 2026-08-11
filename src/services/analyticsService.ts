import { ChannelAnalytics, AIInsight } from '../types/campaign';

const INITIAL_ANALYTICS: ChannelAnalytics[] = [
  {
    channel: 'email',
    channelName: 'Email Newsletter',
    impressions: 18400,
    clicks: 3420,
    ctr: 18.5,
    conversions: 412,
    spend: 350,
    roi: 8.4
  },
  {
    channel: 'linkedin',
    channelName: 'LinkedIn Posts',
    impressions: 45200,
    clicks: 2180,
    ctr: 4.8,
    conversions: 185,
    spend: 1200,
    roi: 4.2
  },
  {
    channel: 'twitter',
    channelName: 'Twitter / X Thread',
    impressions: 68100,
    clicks: 1420,
    ctr: 2.1,
    conversions: 94,
    spend: 400,
    roi: 2.8
  },
  {
    channel: 'google_ads',
    channelName: 'Google Search Ads',
    impressions: 112000,
    clicks: 5600,
    ctr: 5.0,
    conversions: 620,
    spend: 2500,
    roi: 5.1
  },
  {
    channel: 'meta_ads',
    channelName: 'Meta Retargeting',
    impressions: 34000,
    clicks: 890,
    ctr: 2.6,
    conversions: 42,
    spend: 800,
    roi: 1.6
  }
];

const INITIAL_INSIGHTS: AIInsight[] = [
  {
    id: 'ins-1',
    title: 'High Email Engagement vs Low Meta ROI',
    type: 'budget_reallocation',
    impactLevel: 'high',
    description: 'Email newsletter click-through rate (18.5%) and conversion efficiency are outperforming Meta ad campaigns by 425%.',
    evidence: 'Meta retargeting ROI dropped to 1.6x, while Email ROI achieved 8.4x over the past 7 days.',
    suggestedAction: 'Reallocate 25% ($200/wk) of Meta ad budget directly toward retargeting high-intent email clickers.',
    applied: false,
    metricsChange: '+ $1,840 Projected Revenue'
  },
  {
    id: 'ins-2',
    title: 'LinkedIn Technical Deep-Dives Outperforming Short Posts',
    type: 'creative_optimization',
    impactLevel: 'medium',
    description: 'Longer code-rich LinkedIn carousels generated 3.2x higher bookmark rates than general product announcements.',
    evidence: 'Posts with embedded terminal syntax snippets saw 6.1% CTR vs 3.2% baseline.',
    suggestedAction: 'Auto-inject code block preview cards into upcoming LinkedIn scheduled posts.',
    applied: false,
    metricsChange: '+ 28% Expected Engagement'
  },
  {
    id: 'ins-3',
    title: 'Optimal Twitter Dispatch Window Identified',
    type: 'timing_shift',
    impactLevel: 'low',
    description: 'Developer audience activity peaks at 08:30 UTC on Tuesdays and Thursdays.',
    evidence: 'Tweets dispatched during peak hours receive 4.1x more retweets from engineering leads.',
    suggestedAction: 'Reschedule pending Twitter queue posts to Tuesday 08:30 UTC.',
    applied: false,
    metricsChange: '+ 18% Higher Reach'
  }
];

class AnalyticsService {
  private analytics: ChannelAnalytics[];
  private insights: AIInsight[];

  constructor() {
    const savedAnalytics = localStorage.getItem('nexus_analytics');
    const savedInsights = localStorage.getItem('nexus_ai_insights');
    
    this.analytics = savedAnalytics ? JSON.parse(savedAnalytics) : INITIAL_ANALYTICS;
    this.insights = savedInsights ? JSON.parse(savedInsights) : INITIAL_INSIGHTS;
  }

  getAnalytics(): ChannelAnalytics[] {
    return [...this.analytics];
  }

  getInsights(): AIInsight[] {
    return [...this.insights];
  }

  applyInsight(id: string): AIInsight {
    this.insights = this.insights.map((ins) => {
      if (ins.id === id) {
        return { ...ins, applied: true };
      }
      return ins;
    });

    // If budget reallocation, adjust analytics spend accordingly
    if (id === 'ins-1') {
      this.analytics = this.analytics.map((item) => {
        if (item.channel === 'meta_ads') {
          return { ...item, spend: Math.max(100, item.spend - 200) };
        }
        if (item.channel === 'email') {
          return { ...item, spend: item.spend + 200, conversions: item.conversions + 85 };
        }
        return item;
      });
      localStorage.setItem('nexus_analytics', JSON.stringify(this.analytics));
    }

    localStorage.setItem('nexus_ai_insights', JSON.stringify(this.insights));
    return this.insights.find((i) => i.id === id)!;
  }
}

export const analyticsService = new AnalyticsService();
