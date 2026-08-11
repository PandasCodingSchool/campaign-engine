import React, { useState } from 'react';
import { 
  Sparkles, 
  X, 
  Globe, 
  Target, 
  DollarSign, 
  CheckCircle2, 
  Loader2, 
  Send 
} from 'lucide-react';
import { ChannelType, CampaignPlan, AssetItem } from '../../types/campaign';
import { aiCampaignService } from '../../services/aiCampaignService';

interface CampaignPlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCampaignGenerated: (plan: CampaignPlan, assets: AssetItem[]) => void;
}

export const CampaignPlannerModal: React.FC<CampaignPlannerModalProps> = ({
  isOpen,
  onClose,
  onCampaignGenerated
}) => {
  const [title, setTitle] = useState('Q3 Developer Product Launch');
  const [productUrl, setProductUrl] = useState('https://nexusai.io/features/dev-agent');
  const [objective, setObjective] = useState('Drive 1,500 developer signups and test cloud agent deployment');
  const [targetAudience, setTargetAudience] = useState('VP of Platform Engineering & Lead AI Architects');
  const [budget, setBudget] = useState(5000);
  const [selectedChannels, setSelectedChannels] = useState<ChannelType[]>([
    'email',
    'linkedin',
    'twitter',
    'instagram',
    'google_ads',
    'meta_ads'
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState('');

  if (!isOpen) return null;

  const toggleChannel = (ch: ChannelType) => {
    if (selectedChannels.includes(ch)) {
      setSelectedChannels(selectedChannels.filter((c) => c !== ch));
    } else {
      setSelectedChannels([...selectedChannels, ch]);
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    
    try {
      setGenerationStep('Analyzing product context & target personas...');
      const plan = await aiCampaignService.generateCampaignPlan({
        title,
        productUrl,
        objective,
        targetAudience,
        budget,
        channels: selectedChannels
      });

      setGenerationStep('Generating multi-channel copy, scripts & HTML templates...');
      const assets = await aiCampaignService.generateCampaignAssets(plan);

      setGenerationStep('Running AI Compliance & Brand Safety Audit...');
      await new Promise((resolve) => setTimeout(resolve, 600));

      onCampaignGenerated(plan, assets);
      onClose();
    } catch (err) {
      console.error('Failed to generate campaign', err);
    } finally {
      setIsGenerating(false);
      setGenerationStep('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="glass-panel w-full max-w-2xl border-indigo-500/30 shadow-2xl p-6 relative overflow-hidden">
        
        {/* Background glow decorative effect */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">AI Strategic Campaign Planner</h2>
              <p className="text-xs text-slate-400">Input your objective & prompt to generate a complete multi-format campaign brief</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleGenerate} className="space-y-4">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Campaign Name / Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                placeholder="e.g. Q3 Developer Product Feature"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1">
                <Globe className="h-3.5 w-3.5 text-indigo-400" /> Target Product URL
              </label>
              <input
                type="url"
                value={productUrl}
                onChange={(e) => setProductUrl(e.target.value)}
                required
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                placeholder="https://nexusai.io/features/..."
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1">
              <Target className="h-3.5 w-3.5 text-purple-400" /> Strategic Objective
            </label>
            <textarea
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              rows={2}
              required
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-none"
              placeholder="e.g. Launch new developer feature, drive 1,500 qualified signups..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Target Persona / Audience
              </label>
              <input
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                required
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1">
                <DollarSign className="h-3.5 w-3.5 text-emerald-400" /> Total Budget ($ USD)
              </label>
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                min={500}
                step={500}
                required
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Channel Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Select Output Execution Channels
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { type: 'email', label: 'Email Newsletter' },
                { type: 'linkedin', label: 'LinkedIn Article/Post' },
                { type: 'twitter', label: 'Twitter / X Thread' },
                { type: 'instagram', label: 'Instagram Reel Script' },
                { type: 'google_ads', label: 'Google Search Ads' },
                { type: 'meta_ads', label: 'Meta Carousel Ad' }
              ].map((ch) => {
                const isSelected = selectedChannels.includes(ch.type as ChannelType);
                return (
                  <button
                    key={ch.type}
                    type="button"
                    onClick={() => toggleChannel(ch.type as ChannelType)}
                    className={`flex items-center justify-between p-2.5 rounded-lg border text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-indigo-950/60 border-indigo-500 text-indigo-200'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span>{ch.label}</span>
                    {isSelected && <CheckCircle2 className="h-3.5 w-3.5 text-indigo-400" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit Button & Loader */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            {isGenerating ? (
              <div className="flex items-center gap-2 text-xs text-indigo-400 animate-pulse">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>{generationStep}</span>
              </div>
            ) : (
              <p className="text-[11px] text-slate-400">
                Will auto-generate styled templates, scripts & run compliance checks
              </p>
            )}

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={isGenerating}
                className="btn-secondary btn-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isGenerating || selectedChannels.length === 0}
                className="btn-primary"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Synthesizing...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" /> Generate Campaign Package
                  </>
                )}
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
