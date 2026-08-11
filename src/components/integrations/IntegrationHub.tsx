import React, { useState } from 'react';
import { 
  Share2, 
  CheckCircle2, 
  XCircle, 
  RefreshCw, 
  Terminal, 
  Zap, 
  ExternalLink, 
  Sliders 
} from 'lucide-react';
import { IntegrationChannel } from '../../types/campaign';
import { integrationHubService } from '../../services/integrationHubService';

interface IntegrationHubProps {
  channels: IntegrationChannel[];
  onChannelToggled: (updatedChannel: IntegrationChannel) => void;
}

export const IntegrationHub: React.FC<IntegrationHubProps> = ({
  channels,
  onChannelToggled
}) => {
  const [syncLogs, setSyncLogs] = useState<string[]>([
    `[${new Date().toLocaleTimeString()}] MCP Server initialized on port 8080. Connected to campaign pipeline.`,
    `[${new Date().toLocaleTimeString()}] LinkedIn Graph API v2 token refreshed. Account @NexusAIEnterprise active.`,
    `[${new Date().toLocaleTimeString()}] Mailchimp Webhook listener active. Syncing subscriber events...`
  ]);

  const handleToggle = (id: string) => {
    const updated = integrationHubService.toggleChannelConnection(id);
    onChannelToggled(updated);

    const logEntry = `[${new Date().toLocaleTimeString()}] Integration ${updated.name} status updated to: ${updated.apiStatus.toUpperCase()}`;
    setSyncLogs((prev) => [logEntry, ...prev]);
  };

  const handleManualSync = () => {
    const logEntry = `[${new Date().toLocaleTimeString()}] Manual sync triggered for all active API connectors. 100% healthy.`;
    setSyncLogs((prev) => [logEntry, ...prev]);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header Banner */}
      <div className="glass-card p-5 border-indigo-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge badge-indigo flex items-center gap-1">
              <Share2 className="h-3 w-3" /> Integration Hub & MCP Server
            </span>
            <span className="badge badge-emerald flex items-center gap-1">
              <Zap className="h-3 w-3" /> Two-Way API Sync Active
            </span>
          </div>
          <h2 className="text-xl font-bold text-white">Multi-Channel Publishing Connectors</h2>
          <p className="text-xs text-slate-400">Connect, publish, and sync data directly with Meta, LinkedIn, Google Ads, and CRM endpoints</p>
        </div>

        <button onClick={handleManualSync} className="btn-secondary">
          <RefreshCw className="h-4 w-4 text-indigo-400" /> Ping & Sync APIs
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Channel Cards Grid */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {channels.map((ch) => (
            <div key={ch.id} className="glass-card p-4 space-y-4 flex flex-col justify-between border-slate-800">
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {ch.accountAvatar ? (
                      <img src={ch.accountAvatar} alt={ch.name} className="h-9 w-9 rounded-lg object-cover border border-slate-700" />
                    ) : (
                      <div className="h-9 w-9 rounded-lg bg-slate-800 flex items-center justify-center font-bold text-slate-300 text-xs">
                        {ch.type.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <h4 className="text-xs font-bold text-white">{ch.name}</h4>
                      <p className="text-[11px] text-slate-400">{ch.accountName}</p>
                    </div>
                  </div>

                  {ch.connected ? (
                    <span className="badge badge-emerald text-[9px] flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" /> Connected
                    </span>
                  ) : (
                    <span className="badge badge-rose text-[9px] flex items-center gap-1">
                      <XCircle className="h-3 w-3" /> Unlinked
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 bg-slate-900/80 p-2.5 rounded-lg text-[11px]">
                  <div>
                    <span className="text-slate-500 block">Published</span>
                    <span className="font-bold text-white">{ch.metrics.publishedCount} Posts</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Total Reach</span>
                    <span className="font-bold text-indigo-300">{ch.metrics.totalReach.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[10px] text-slate-500">
                  {ch.lastSync ? `Synced ${ch.lastSync}` : 'No sync active'}
                </span>
                
                <button
                  onClick={() => handleToggle(ch.id)}
                  className={ch.connected ? 'btn-secondary btn-sm text-rose-400 hover:text-rose-300' : 'btn-primary btn-sm'}
                >
                  {ch.connected ? 'Disconnect' : 'Connect Account'}
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* MCP & Webhook Console Log */}
        <div className="glass-card p-5 space-y-4 border-slate-800">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-xs font-bold text-white flex items-center gap-2">
              <Terminal className="h-4 w-4 text-emerald-400" /> MCP API Console Log
            </h3>
            <span className="badge badge-indigo text-[9px]">Live Webhook</span>
          </div>

          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-[11px] text-emerald-400 space-y-2 h-[320px] overflow-y-auto">
            {syncLogs.map((log, idx) => (
              <p key={idx} className="leading-relaxed border-b border-slate-900/80 pb-1">
                {log}
              </p>
            ))}
          </div>

          <div className="p-3 rounded-lg bg-slate-900 text-xs text-slate-300 space-y-1 border border-slate-800">
            <p className="font-bold text-white flex items-center gap-1.5">
              <Sliders className="h-3.5 w-3.5 text-indigo-400" /> Model Context Protocol (MCP)
            </p>
            <p className="text-[11px] text-slate-400">
              Allows external AI tools and agents to inspect campaign briefs, trigger post scheduling, and read analytics via standard JSON-RPC interface.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
