import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { BrandContextManager } from './components/planning/BrandContextManager';
import { CampaignPlannerModal } from './components/planning/CampaignPlannerModal';
import { MultiFormatStudio } from './components/assets/MultiFormatStudio';
import { AgenticWorkflowCanvas } from './components/workflow/AgenticWorkflowCanvas';
import { IntegrationHub } from './components/integrations/IntegrationHub';
import { UnifiedDashboard } from './components/analytics/UnifiedDashboard';
import { LandingPage } from './components/landing/LandingPage';
import { OnboardingWizard } from './components/onboarding/OnboardingWizard';
import { TeamManager } from './components/workspace/TeamManager';

import { 
  BrandContext, 
  CampaignPlan, 
  AssetItem, 
  WorkflowStage, 
  IntegrationChannel, 
  ChannelAnalytics, 
  AIInsight 
} from './types/campaign';

import { brandStoreService } from './services/brandStoreService';
import { aiCampaignService } from './services/aiCampaignService';
import { integrationHubService } from './services/integrationHubService';
import { analyticsService } from './services/analyticsService';
import { TenantOrg, UserProfile } from './services/authService';

export const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<'landing' | 'app'>('landing');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState<'planning' | 'studio' | 'workflow' | 'integrations' | 'analytics' | 'team'>('planning');
  
  const [brandContext, setBrandContext] = useState<BrandContext>({
    id: 'brand-1',
    name: 'NexusAI Engine',
    tagline: 'Autonomous AI Infrastructure for Modern Enterprise Engineering',
    website: 'https://nexusai.io',
    toneOfVoice: ['Authoritative yet accessible', 'Developer-first & technical'],
    prohibitedTerms: ['cheap', 'magic'],
    coreValues: ['Sub-ms Performance'],
    targetPersonas: [],
    pastLearnings: [],
    vectorEmbeddingsCount: 1420
  });
  
  const [campaignPlan, setCampaignPlan] = useState<CampaignPlan | null>(null);
  const [assets, setAssets] = useState<AssetItem[]>([]);
  const [channels, setChannels] = useState<IntegrationChannel[]>(integrationHubService.getChannels());
  const [analytics, setAnalytics] = useState<ChannelAnalytics[]>(analyticsService.getAnalytics());
  const [insights, setInsights] = useState<AIInsight[]>(analyticsService.getInsights());
  
  const [isPlannerOpen, setIsPlannerOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  // Sync dark mode class on <html> element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  useEffect(() => {
    const initData = async () => {
      const brand = await brandStoreService.getBrandContext();
      setBrandContext(brand);

      const plan = await aiCampaignService.generateCampaignPlan({
        title: 'Q3 Developer Product Launch',
        productUrl: 'https://nexusai.io/features/dev-agent',
        objective: 'Drive 1,500 developer signups and test cloud agent deployment',
        targetAudience: 'VP of Platform Engineering & Lead AI Architects',
        budget: 5000,
        channels: ['email', 'linkedin', 'twitter', 'google_ads']
      });

      const initialAssets = await aiCampaignService.generateCampaignAssets(plan);
      setCampaignPlan(plan);
      setAssets(initialAssets);
    };

    initData();
  }, []);

  const handleCampaignGenerated = (plan: CampaignPlan, newAssets: AssetItem[]) => {
    setCampaignPlan(plan);
    setAssets(newAssets);
    setActiveTab('studio');
  };

  const handleOnboardingCompleted = (tenant: TenantOrg, user: UserProfile) => {
    setBrandContext((prev) => ({
      ...prev,
      name: tenant.name
    }));
    setActiveTab('planning');
  };

  const handleUpdateAsset = (updatedAsset: AssetItem) => {
    setAssets((prev) => prev.map((a) => (a.id === updatedAsset.id ? updatedAsset : a)));
  };

  const handleSendToWorkflow = (assetId: string) => {
    setAssets((prev) =>
      prev.map((a) => {
        if (a.id === assetId && a.stage === 'draft') {
          return { ...a, stage: 'ai_compliance' };
        }
        return a;
      })
    );
    setActiveTab('workflow');
  };

  const handleStageChange = (assetId: string, newStage: WorkflowStage) => {
    setAssets((prev) =>
      prev.map((a) => (a.id === assetId ? { ...a, stage: newStage } : a))
    );
  };

  const handlePublishNow = async (assetId: string, channelType: string) => {
    await integrationHubService.publishAssetNow(assetId, channelType);
    setAssets((prev) =>
      prev.map((a) => (a.id === assetId ? { ...a, stage: 'published' } : a))
    );
  };

  const handleChannelToggled = (updatedChannel: IntegrationChannel) => {
    setChannels((prev) => prev.map((c) => (c.id === updatedChannel.id ? updatedChannel : c)));
  };

  const handleApplyInsight = (id: string) => {
    analyticsService.applyInsight(id);
    setInsights(analyticsService.getInsights());
    setAnalytics(analyticsService.getAnalytics());
  };

  if (viewMode === 'landing') {
    return (
      <LandingPage
        onGoToApp={() => setViewMode('app')}
        onSelectPlan={(plan) => {
          setViewMode('app');
          setIsOnboardingOpen(true);
        }}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0a0d14] text-slate-900 dark:text-slate-100 flex flex-col transition-colors duration-300 selection:bg-indigo-500 selection:text-white">
      
      {/* Top Banner to switch back to public landing page */}
      <div className="bg-gradient-to-r from-indigo-100 via-purple-100 to-slate-100 dark:from-indigo-900/60 dark:via-purple-900/40 dark:to-slate-900 text-xs px-6 py-2 border-b border-indigo-200 dark:border-indigo-500/20 flex items-center justify-between">
        <span className="text-indigo-900 dark:text-indigo-200 font-semibold flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Multi-Tenant SaaS Workspace (Connected to Express API Server)
        </span>
        <button
          onClick={() => setViewMode('landing')}
          className="text-indigo-600 dark:text-indigo-300 hover:underline font-bold text-[11px]"
        >
          ← View Public SaaS Landing Page
        </button>
      </div>

      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        brandContext={brandContext}
        onNewCampaignClick={() => setIsPlannerOpen(true)}
        onOpenOnboarding={() => setIsOnboardingOpen(true)}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
      />

      {/* Main Content Body */}
      <main className="max-w-7xl w-full mx-auto px-6 pb-16 flex-1">
        
        {activeTab === 'planning' && (
          <BrandContextManager
            brand={brandContext}
            onBrandUpdated={setBrandContext}
          />
        )}

        {activeTab === 'studio' && (
          <MultiFormatStudio
            assets={assets}
            onUpdateAsset={handleUpdateAsset}
            onSendToWorkflow={handleSendToWorkflow}
          />
        )}

        {activeTab === 'workflow' && (
          <AgenticWorkflowCanvas
            assets={assets}
            onStageChange={handleStageChange}
            onPublishNow={handlePublishNow}
          />
        )}

        {activeTab === 'integrations' && (
          <IntegrationHub
            channels={channels}
            onChannelToggled={handleChannelToggled}
          />
        )}

        {activeTab === 'analytics' && (
          <UnifiedDashboard
            analytics={analytics}
            insights={insights}
            onApplyInsight={handleApplyInsight}
          />
        )}

        {activeTab === 'team' && (
          <TeamManager />
        )}

      </main>

      {/* AI Strategic Campaign Planner Modal */}
      <CampaignPlannerModal
        isOpen={isPlannerOpen}
        onClose={() => setIsPlannerOpen(false)}
        onCampaignGenerated={handleCampaignGenerated}
      />

      {/* Client Onboarding Wizard Modal */}
      <OnboardingWizard
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onCompleted={handleOnboardingCompleted}
      />

    </div>
  );
};
