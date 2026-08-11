import React from 'react';
import { 
  GitPullRequest, 
  CheckCircle2, 
  Clock, 
  Send, 
  AlertCircle, 
  Sparkles, 
  ArrowRight, 
  UserCheck, 
  Calendar 
} from 'lucide-react';
import { AssetItem, WorkflowStage } from '../../types/campaign';

interface AgenticWorkflowCanvasProps {
  assets: AssetItem[];
  onStageChange: (assetId: string, newStage: WorkflowStage) => void;
  onPublishNow: (assetId: string, channel: string) => void;
}

export const AgenticWorkflowCanvas: React.FC<AgenticWorkflowCanvasProps> = ({
  assets,
  onStageChange,
  onPublishNow
}) => {
  const STAGES: { stage: WorkflowStage; title: string; desc: string }[] = [
    { stage: 'draft', title: '1. Creative Draft', desc: 'Initial AI generation' },
    { stage: 'ai_compliance', title: '2. AI Audit & Compliance', desc: 'Tone & safety check' },
    { stage: 'manager_approval', title: '3. Manager Review', desc: 'Human-in-the-loop' },
    { stage: 'scheduled', title: '4. Scheduled Queue', desc: 'Automated dispatch' },
    { stage: 'published', title: '5. Live / Published', desc: 'Active in channel' }
  ];

  const getAssetsByStage = (stage: WorkflowStage) => {
    return assets.filter((a) => a.stage === stage);
  };

  const getNextStage = (current: WorkflowStage): WorkflowStage | null => {
    switch (current) {
      case 'draft': return 'ai_compliance';
      case 'ai_compliance': return 'manager_approval';
      case 'manager_approval': return 'scheduled';
      case 'scheduled': return 'published';
      default: return null;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Workflow Header Banner */}
      <div className="glass-card p-5 border-indigo-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge badge-indigo flex items-center gap-1">
              <GitPullRequest className="h-3 w-3" /> Agentic Review Pipeline
            </span>
            <span className="badge badge-emerald flex items-center gap-1">
              <UserCheck className="h-3 w-3" /> Human-in-the-Loop Active
            </span>
          </div>
          <h2 className="text-xl font-bold text-white">Campaign Asset Lifecycle & Approval Flow</h2>
          <p className="text-xs text-slate-400">Track and advance channel assets through automated compliance audits to final scheduling</p>
        </div>

        <div className="flex items-center gap-2 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 text-xs">
          <span className="text-slate-400 font-semibold">Total Pipeline Assets:</span>
          <span className="font-extrabold text-white text-sm">{assets.length}</span>
        </div>
      </div>

      {/* Kanban Board Columns */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-4">
        {STAGES.map((col) => {
          const colAssets = getAssetsByStage(col.stage);
          return (
            <div key={col.stage} className="bg-slate-900/70 border border-slate-800 rounded-xl p-3 space-y-3 flex flex-col min-w-[240px]">
              
              {/* Column Header */}
              <div className="border-b border-slate-800 pb-2 flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold text-white">{col.title}</h3>
                  <p className="text-[10px] text-slate-400">{col.desc}</p>
                </div>
                <span className="h-5 min-w-[20px] px-1.5 rounded-full bg-slate-800 text-slate-300 font-bold text-[10px] flex items-center justify-center">
                  {colAssets.length}
                </span>
              </div>

              {/* Asset Cards in Column */}
              <div className="space-y-3 flex-1 overflow-y-auto max-h-[600px] pr-1">
                {colAssets.length === 0 ? (
                  <div className="text-center py-8 border border-dashed border-slate-800/80 rounded-lg">
                    <p className="text-[11px] text-slate-500">No assets in stage</p>
                  </div>
                ) : (
                  colAssets.map((asset) => {
                    const nextStage = getNextStage(asset.stage);
                    return (
                      <div key={asset.id} className="glass-card p-3 space-y-2.5 border-slate-800 hover:border-indigo-500/50">
                        
                        <div className="flex items-center justify-between">
                          <span className="badge badge-indigo text-[9px] uppercase">
                            {asset.channel.replace('_', ' ')}
                          </span>
                          <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                            <Sparkles className="h-3 w-3" /> {asset.complianceScore}%
                          </span>
                        </div>

                        <h4 className="text-xs font-bold text-white line-clamp-1">{asset.title}</h4>

                        <p className="text-[11px] text-slate-400 line-clamp-2 italic">
                          "{asset.content.subject || asset.content.postText || asset.content.headline || asset.content.script}"
                        </p>

                        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-1">
                          {asset.stage === 'manager_approval' && (
                            <button
                              onClick={() => onStageChange(asset.id, 'scheduled')}
                              className="btn-primary btn-sm text-[10px] py-1 px-2 w-full justify-center"
                            >
                              <UserCheck className="h-3 w-3" /> Approve Asset
                            </button>
                          )}

                          {asset.stage === 'scheduled' && (
                            <button
                              onClick={() => onPublishNow(asset.id, asset.channel)}
                              className="btn-primary btn-sm text-[10px] py-1 px-2 w-full justify-center bg-gradient-to-r from-emerald-600 to-teal-600"
                            >
                              <Send className="h-3 w-3" /> Publish Now
                            </button>
                          )}

                          {asset.stage !== 'manager_approval' && asset.stage !== 'scheduled' && asset.stage !== 'published' && nextStage && (
                            <button
                              onClick={() => onStageChange(asset.id, nextStage)}
                              className="btn-secondary btn-sm text-[10px] py-1 px-2 w-full justify-center"
                            >
                              Advance Stage <ArrowRight className="h-3 w-3" />
                            </button>
                          )}

                          {asset.stage === 'published' && (
                            <span className="text-[10px] text-emerald-400 font-bold flex items-center justify-center gap-1 w-full py-1">
                              <CheckCircle2 className="h-3.5 w-3.5" /> Published
                            </span>
                          )}
                        </div>

                      </div>
                    );
                  })
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
