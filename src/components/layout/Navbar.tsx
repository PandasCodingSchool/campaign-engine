import React from 'react';
import { 
  Sparkles, 
  Layers, 
  Palette, 
  GitPullRequest, 
  Share2, 
  BarChart3, 
  Plus, 
  Zap, 
  Sun,
  Moon
} from 'lucide-react';
import { BrandContext } from '../../types/campaign';

interface NavbarProps {
  activeTab: 'planning' | 'studio' | 'workflow' | 'integrations' | 'analytics';
  setActiveTab: (tab: 'planning' | 'studio' | 'workflow' | 'integrations' | 'analytics') => void;
  brandContext: BrandContext;
  onNewCampaignClick: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  brandContext,
  onNewCampaignClick,
  isDarkMode,
  onToggleTheme
}) => {
  return (
    <header className="glass-panel sticky top-0 z-50 rounded-none border-x-0 border-t-0 px-6 py-3.5 mb-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Brand & Logo */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/20 flex items-center justify-center">
            <div className="h-full w-full bg-[#0a0d14] dark:bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Zap className="h-5 w-5 text-indigo-400 fill-indigo-400/20" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-lg tracking-tight text-slate-900 dark:text-white">CampaignEngine</span>
              <span className="badge badge-indigo flex items-center gap-1 text-[10px]">
                <Sparkles className="h-3 w-3" /> AI Native
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              Active Store: <span className="text-indigo-600 dark:text-indigo-300 font-semibold">{brandContext.name}</span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 bg-slate-200/80 dark:bg-slate-900/80 p-1 rounded-xl border border-slate-300/80 dark:border-slate-800">
          <button
            onClick={() => setActiveTab('planning')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'planning'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Layers className="h-3.5 w-3.5" /> Strategy & Context
          </button>

          <button
            onClick={() => setActiveTab('studio')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'studio'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Palette className="h-3.5 w-3.5" /> Creative Studio
          </button>

          <button
            onClick={() => setActiveTab('workflow')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'workflow'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <GitPullRequest className="h-3.5 w-3.5" /> Approval Pipeline
          </button>

          <button
            onClick={() => setActiveTab('integrations')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'integrations'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Share2 className="h-3.5 w-3.5" /> Integration Hub
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'analytics'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <BarChart3 className="h-3.5 w-3.5" /> AI Insights
          </button>
        </nav>

        {/* Action Button & Theme Toggle */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-xl border border-slate-300/80 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-indigo-600" />}
          </button>

          <button
            onClick={onNewCampaignClick}
            className="btn-primary shadow-lg"
          >
            <Plus className="h-4 w-4" /> New Campaign Brief
          </button>
        </div>

      </div>
    </header>
  );
};
