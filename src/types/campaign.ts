export type ChannelType = 'email' | 'linkedin' | 'twitter' | 'instagram' | 'google_ads' | 'meta_ads';

export type WorkflowStage = 'draft' | 'ai_compliance' | 'manager_approval' | 'scheduled' | 'published';

export interface Persona {
  id: string;
  name: string;
  role: string;
  painPoints: string[];
  goals: string[];
  preferredChannels: ChannelType[];
}

export interface BrandContext {
  id: string;
  name: string;
  tagline: string;
  website: string;
  toneOfVoice: string[];
  prohibitedTerms: string[];
  coreValues: string[];
  targetPersonas: Persona[];
  pastLearnings: string[];
  vectorEmbeddingsCount: number;
}

export interface CampaignKPI {
  metric: string;
  target: string;
  achieved?: string;
}

export interface CampaignPlan {
  id: string;
  title: string;
  productUrl: string;
  objective: string;
  targetAudience: string;
  startDate: string;
  endDate: string;
  status: 'planning' | 'active' | 'completed' | 'paused';
  channels: ChannelType[];
  budget: number;
  kpis: CampaignKPI[];
  createdAt: string;
}

export interface AssetContent {
  subject?: string;
  previewText?: string;
  htmlBody?: string;
  postText?: string;
  hashtags?: string[];
  headline?: string;
  description?: string;
  ctaText?: string;
  script?: string;
  imagePrompt?: string;
  imageUrl?: string;
}

export interface ComplianceCheck {
  category: 'tone' | 'brand_safety' | 'spam_risk' | 'grammar';
  passed: boolean;
  score: number; // 0-100
  feedback: string;
}

export interface AssetItem {
  id: string;
  campaignId: string;
  channel: ChannelType;
  title: string;
  stage: WorkflowStage;
  content: AssetContent;
  complianceScore: number;
  complianceChecks: ComplianceCheck[];
  version: number;
  updatedAt: string;
  scheduledTime?: string;
}

export interface IntegrationChannel {
  id: string;
  name: string;
  type: ChannelType;
  connected: boolean;
  accountName?: string;
  accountAvatar?: string;
  lastSync?: string;
  apiStatus: 'active' | 'idle' | 'error' | 'disconnected';
  metrics: {
    publishedCount: number;
    totalReach: number;
  };
}

export interface ChannelAnalytics {
  channel: ChannelType;
  channelName: string;
  impressions: number;
  clicks: number;
  ctr: number; // percentage
  conversions: number;
  spend: number;
  roi: number;
}

export interface AIInsight {
  id: string;
  title: string;
  type: 'budget_reallocation' | 'creative_optimization' | 'timing_shift';
  impactLevel: 'high' | 'medium' | 'low';
  description: string;
  evidence: string;
  suggestedAction: string;
  applied: boolean;
  metricsChange?: string;
}
