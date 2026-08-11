import React, { useState } from 'react';
import { 
  Mail, 
  Linkedin, 
  Twitter, 
  Instagram, 
  Search, 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  Edit3, 
  Check, 
  Eye, 
  ArrowRight,
  Code,
  Copy
} from 'lucide-react';
import { AssetItem, ChannelType } from '../../types/campaign';

interface MultiFormatStudioProps {
  assets: AssetItem[];
  onUpdateAsset: (asset: AssetItem) => void;
  onSendToWorkflow: (assetId: string) => void;
}

export const MultiFormatStudio: React.FC<MultiFormatStudioProps> = ({
  assets,
  onUpdateAsset,
  onSendToWorkflow
}) => {
  const [selectedChannel, setSelectedChannel] = useState<ChannelType>('email');
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState('');
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const activeAsset = assets.find((a) => a.channel === selectedChannel) || assets[0];

  const handleStartEdit = () => {
    if (!activeAsset) return;
    setEditedText(
      activeAsset.channel === 'email'
        ? activeAsset.content.htmlBody || ''
        : activeAsset.content.postText || activeAsset.content.script || activeAsset.content.description || ''
    );
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (!activeAsset) return;
    const updatedContent = { ...activeAsset.content };
    if (activeAsset.channel === 'email') {
      updatedContent.htmlBody = editedText;
    } else if (activeAsset.channel === 'instagram') {
      updatedContent.script = editedText;
    } else {
      updatedContent.postText = editedText;
      updatedContent.description = editedText;
    }

    onUpdateAsset({
      ...activeAsset,
      content: updatedContent,
      updatedAt: new Date().toISOString()
    });
    setIsEditing(false);
  };

  const handleRegenerateVariant = async () => {
    if (!activeAsset) return;
    setIsRegenerating(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Refine compliance score & version
    onUpdateAsset({
      ...activeAsset,
      version: activeAsset.version + 1,
      complianceScore: Math.min(100, activeAsset.complianceScore + 2),
      updatedAt: new Date().toISOString()
    });
    setIsRegenerating(false);
  };

  const handleCopyCode = () => {
    if (!activeAsset) return;
    const textToCopy = activeAsset.content.htmlBody || activeAsset.content.postText || activeAsset.content.script || '';
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getChannelIcon = (ch: ChannelType) => {
    switch (ch) {
      case 'email': return <Mail className="h-4 w-4 text-emerald-400" />;
      case 'linkedin': return <Linkedin className="h-4 w-4 text-blue-400" />;
      case 'twitter': return <Twitter className="h-4 w-4 text-sky-400" />;
      case 'instagram': return <Instagram className="h-4 w-4 text-pink-400" />;
      case 'google_ads': return <Search className="h-4 w-4 text-amber-400" />;
      case 'meta_ads': return <Layers className="h-4 w-4 text-purple-400" />;
    }
  };

  if (!assets || assets.length === 0) {
    return (
      <div className="glass-card p-12 text-center space-y-4">
        <Sparkles className="h-12 w-12 text-indigo-400 mx-auto animate-pulse" />
        <h3 className="text-lg font-bold text-white">No Creative Assets Generated Yet</h3>
        <p className="text-sm text-slate-400">Launch the Strategic Campaign Planner to generate channel-specific asset packages.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Channel Switcher Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
        {assets.map((asset) => {
          const isActive = asset.channel === selectedChannel;
          return (
            <button
              key={asset.id}
              onClick={() => {
                setSelectedChannel(asset.channel);
                setIsEditing(false);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-slate-800 text-white border border-indigo-500/50 shadow-lg shadow-indigo-500/10'
                  : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              {getChannelIcon(asset.channel)}
              <span className="capitalize">{asset.channel.replace('_', ' ')}</span>
              <span className="badge badge-indigo text-[9px]">v{asset.version}</span>
            </button>
          );
        })}
      </div>

      {/* Main Asset Studio Area */}
      {activeAsset && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: Asset Preview */}
          <div className="lg:col-span-2 space-y-4">
            
            <div className="glass-card p-5 space-y-4">
              
              {/* Asset Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  {getChannelIcon(activeAsset.channel)}
                  <h3 className="text-base font-bold text-white">{activeAsset.title}</h3>
                </div>
                
                <div className="flex items-center gap-2">
                  <button onClick={handleCopyCode} className="btn-secondary btn-sm">
                    {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                  {isEditing ? (
                    <button onClick={handleSaveEdit} className="btn-primary btn-sm">
                      <Check className="h-3.5 w-3.5" /> Save Changes
                    </button>
                  ) : (
                    <button onClick={handleStartEdit} className="btn-secondary btn-sm">
                      <Edit3 className="h-3.5 w-3.5" /> Edit Copy
                    </button>
                  )}
                </div>
              </div>

              {/* EMAIL RENDER PREVIEW */}
              {activeAsset.channel === 'email' && (
                <div className="space-y-3">
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs space-y-1">
                    <p className="text-slate-400"><strong className="text-slate-300">Subject:</strong> {activeAsset.content.subject}</p>
                    <p className="text-slate-400"><strong className="text-slate-300">Preview:</strong> {activeAsset.content.previewText}</p>
                  </div>

                  {isEditing ? (
                    <textarea
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                      rows={14}
                      className="w-full bg-slate-950 font-mono text-xs text-indigo-300 border border-slate-800 rounded-lg p-3 focus:outline-none focus:border-indigo-500"
                    />
                  ) : (
                    <div className="email-preview-frame" dangerouslySetInnerHTML={{ __html: activeAsset.content.htmlBody || '' }} />
                  )}
                </div>
              )}

              {/* LINKEDIN PREVIEW */}
              {activeAsset.channel === 'linkedin' && (
                <div className="space-y-4">
                  {isEditing ? (
                    <textarea
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                      rows={8}
                      className="w-full bg-slate-950 text-xs text-white border border-slate-800 rounded-lg p-3 focus:outline-none focus:border-indigo-500"
                    />
                  ) : (
                    <div className="social-preview-card space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-white text-sm">
                          NX
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">NexusAI Enterprise</p>
                          <p className="text-[10px] text-slate-400">18,420 followers • Promoted</p>
                        </div>
                      </div>

                      <p className="text-xs text-slate-200 whitespace-pre-line leading-relaxed">
                        {activeAsset.content.postText}
                      </p>

                      <div className="flex flex-wrap gap-1">
                        {activeAsset.content.hashtags?.map((tag) => (
                          <span key={tag} className="text-xs text-indigo-400 font-medium">{tag}</span>
                        ))}
                      </div>

                      {activeAsset.content.imageUrl && (
                        <div className="rounded-lg overflow-hidden border border-slate-800 mt-2">
                          <img src={activeAsset.content.imageUrl} alt="LinkedIn preview asset" className="w-full h-48 object-cover" />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* TWITTER PREVIEW */}
              {activeAsset.channel === 'twitter' && (
                <div className="space-y-4">
                  {isEditing ? (
                    <textarea
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                      rows={6}
                      className="w-full bg-slate-950 text-xs text-white border border-slate-800 rounded-lg p-3 focus:outline-none focus:border-indigo-500"
                    />
                  ) : (
                    <div className="social-preview-card space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-sky-500 flex items-center justify-center font-bold text-white text-xs">
                          𝕏
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">NexusAI Engine <span className="text-slate-500">@NexusAIEngine</span></p>
                        </div>
                      </div>

                      <p className="text-xs text-slate-100 whitespace-pre-line leading-relaxed">
                        {activeAsset.content.postText}
                      </p>

                      <div className="flex flex-wrap gap-1">
                        {activeAsset.content.hashtags?.map((tag) => (
                          <span key={tag} className="text-xs text-sky-400">{tag}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* INSTAGRAM / REELS SCRIPT PREVIEW */}
              {activeAsset.channel === 'instagram' && (
                <div className="space-y-4">
                  {isEditing ? (
                    <textarea
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                      rows={10}
                      className="w-full bg-slate-950 font-mono text-xs text-pink-300 border border-slate-800 rounded-lg p-3 focus:outline-none focus:border-indigo-500"
                    />
                  ) : (
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <span className="badge badge-rose text-[10px]">Short Video Script Timeline</span>
                        <span className="text-xs text-slate-400">Duration: 40s</span>
                      </div>
                      <pre className="font-mono text-xs text-pink-200 whitespace-pre-wrap leading-relaxed">
                        {activeAsset.content.script}
                      </pre>
                    </div>
                  )}
                </div>
              )}

              {/* GOOGLE ADS PREVIEW */}
              {activeAsset.channel === 'google_ads' && (
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                    <span className="font-bold text-white">Ad</span> • https://nexusai.io/features/dev-agent
                  </div>
                  <h4 className="text-sm font-bold text-blue-400 hover:underline cursor-pointer">
                    {activeAsset.content.headline}
                  </h4>
                  <p className="text-xs text-slate-300">
                    {activeAsset.content.description}
                  </p>
                </div>
              )}

              {/* META ADS PREVIEW */}
              {activeAsset.channel === 'meta_ads' && (
                <div className="social-preview-card space-y-3">
                  <p className="text-xs font-bold text-white">{activeAsset.content.headline}</p>
                  <p className="text-xs text-slate-300">{activeAsset.content.postText}</p>
                  {activeAsset.content.imageUrl && (
                    <img src={activeAsset.content.imageUrl} alt="Meta ad creative" className="w-full h-44 object-cover rounded-lg" />
                  )}
                  <button className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-lg">
                    {activeAsset.content.ctaText}
                  </button>
                </div>
              )}

            </div>

          </div>

          {/* Right Column: AI Compliance & Workflow Action */}
          <div className="space-y-4">
            
            {/* Compliance Audit Card */}
            <div className="glass-card p-5 space-y-4 border-indigo-500/30">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-indigo-400" /> AI Compliance & Brand Audit
                </h4>
                <span className="badge badge-emerald font-bold">
                  {activeAsset.complianceScore}% Match
                </span>
              </div>

              <div className="space-y-2.5">
                {activeAsset.complianceChecks.map((check, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white capitalize">{check.category.replace('_', ' ')}</span>
                      {check.passed ? (
                        <span className="text-emerald-400 text-[11px] font-bold flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" /> Passed
                        </span>
                      ) : (
                        <span className="text-rose-400 text-[11px] font-bold flex items-center gap-1">
                          <AlertTriangle className="h-3 w-3" /> Issue
                        </span>
                      )}
                    </div>
                    <p className="text-slate-400 text-[11px]">{check.feedback}</p>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={handleRegenerateVariant}
                  disabled={isRegenerating}
                  className="btn-secondary w-full justify-center"
                >
                  <RefreshCw className={`h-3.5 w-3.5 ${isRegenerating ? 'animate-spin' : ''}`} />
                  {isRegenerating ? 'Regenerating...' : 'Regenerate AI Variant'}
                </button>

                <button
                  onClick={() => onSendToWorkflow(activeAsset.id)}
                  className="btn-primary w-full justify-center"
                >
                  Advance to Approval Pipeline <ArrowRight className="h-4 w-4" />
                </button>
              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};
