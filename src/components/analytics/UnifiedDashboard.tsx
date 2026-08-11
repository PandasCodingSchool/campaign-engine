import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Users, 
  MousePointerClick, 
  Sparkles, 
  ArrowUpRight, 
  CheckCircle2, 
  Zap, 
  AlertCircle 
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend 
} from 'recharts';
import { ChannelAnalytics, AIInsight } from '../../types/campaign';

interface UnifiedDashboardProps {
  analytics: ChannelAnalytics[];
  insights: AIInsight[];
  onApplyInsight: (id: string) => void;
}

export const UnifiedDashboard: React.FC<UnifiedDashboardProps> = ({
  analytics,
  insights,
  onApplyInsight
}) => {
  const totalImpressions = analytics.reduce((acc, curr) => acc + curr.impressions, 0);
  const totalClicks = analytics.reduce((acc, curr) => acc + curr.clicks, 0);
  const totalConversions = analytics.reduce((acc, curr) => acc + curr.conversions, 0);
  const totalSpend = analytics.reduce((acc, curr) => acc + curr.spend, 0);
  const avgCtr = (totalClicks / totalImpressions * 100).toFixed(2);
  const avgRoi = (analytics.reduce((acc, curr) => acc + curr.roi, 0) / analytics.length).toFixed(1);

  const chartData = analytics.map((a) => ({
    name: a.channelName,
    Clicks: a.clicks,
    Conversions: a.conversions,
    Spend: a.spend,
    CTR: a.ctr
  }));

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header Banner */}
      <div className="glass-card p-5 border-indigo-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge badge-indigo flex items-center gap-1">
              <BarChart3 className="h-3 w-3" /> Unified Analytics & Attribution Engine
            </span>
            <span className="badge badge-emerald flex items-center gap-1">
              <Sparkles className="h-3 w-3" /> AI Feedback Loop Active
            </span>
          </div>
          <h2 className="text-xl font-bold text-white">Cross-Channel Performance & AI Insights</h2>
          <p className="text-xs text-slate-400">Aggregated real-time campaign performance with autonomous AI attribution recommendations</p>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        
        <div className="glass-card p-4 space-y-2 border-slate-800">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Total Impressions</span>
            <Users className="h-4 w-4 text-indigo-400" />
          </div>
          <p className="text-xl font-extrabold text-white">{totalImpressions.toLocaleString()}</p>
          <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-0.5">
            <TrendingUp className="h-3 w-3" /> +14.2% vs last week
          </span>
        </div>

        <div className="glass-card p-4 space-y-2 border-slate-800">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Total Clicks</span>
            <MousePointerClick className="h-4 w-4 text-purple-400" />
          </div>
          <p className="text-xl font-extrabold text-white">{totalClicks.toLocaleString()}</p>
          <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-0.5">
            <TrendingUp className="h-3 w-3" /> +8.6% engagement
          </span>
        </div>

        <div className="glass-card p-4 space-y-2 border-slate-800">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Avg Click-Through Rate</span>
            <ArrowUpRight className="h-4 w-4 text-cyan-400" />
          </div>
          <p className="text-xl font-extrabold text-cyan-300">{avgCtr}%</p>
          <span className="text-[10px] text-slate-400">Top channel: Email (18.5%)</span>
        </div>

        <div className="glass-card p-4 space-y-2 border-slate-800">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Conversions</span>
            <Zap className="h-4 w-4 text-emerald-400" />
          </div>
          <p className="text-xl font-extrabold text-white">{totalConversions.toLocaleString()}</p>
          <span className="text-[10px] text-emerald-400 font-bold">CPA: $4.12</span>
        </div>

        <div className="glass-card p-4 space-y-2 border-slate-800 col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Average ROI</span>
            <DollarSign className="h-4 w-4 text-amber-400" />
          </div>
          <p className="text-xl font-extrabold text-amber-300">{avgRoi}x Return</p>
          <span className="text-[10px] text-slate-400">Total Spend: ${totalSpend.toLocaleString()}</span>
        </div>

      </div>

      {/* Main Section: Chart + AI Attribution Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Multi-Channel Performance Graph */}
        <div className="glass-card p-5 space-y-4 lg:col-span-2 border-slate-800">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-white">Channel Engagement Breakdown</h3>
              <p className="text-xs text-slate-400">Comparing Clicks, Conversions, and Ad Spend across platforms</p>
            </div>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0f172a', 
                    borderColor: '#334155', 
                    borderRadius: '8px', 
                    fontSize: '12px',
                    color: '#f8fafc'
                  }} 
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="Clicks" fill="#6366f1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Conversions" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Spend" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Attribution & Feedback Engine */}
        <div className="glass-card p-5 space-y-4 border-indigo-500/30">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-indigo-400" /> AI Attribution Engine Insights
            </h3>
            <span className="badge badge-indigo text-[9px]">LLM Synthesis</span>
          </div>

          <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
            {insights.map((insight) => (
              <div 
                key={insight.id} 
                className={`p-4 rounded-xl border space-y-3 transition-all ${
                  insight.applied 
                    ? 'bg-emerald-950/20 border-emerald-500/30' 
                    : 'bg-slate-900 border-slate-800 hover:border-indigo-500/50'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className={`badge text-[9px] mb-1 ${
                      insight.impactLevel === 'high' ? 'badge-rose' : insight.impactLevel === 'medium' ? 'badge-amber' : 'badge-sky'
                    }`}>
                      {insight.impactLevel} Impact • {insight.type.replace('_', ' ')}
                    </span>
                    <h4 className="text-xs font-bold text-white">{insight.title}</h4>
                  </div>
                </div>

                <p className="text-[11px] text-slate-300 leading-relaxed">
                  {insight.description}
                </p>

                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 text-[10px] text-indigo-300">
                  <strong>Evidence:</strong> {insight.evidence}
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-slate-800/80">
                  <span className="text-[10px] text-emerald-400 font-bold">
                    {insight.metricsChange}
                  </span>

                  {insight.applied ? (
                    <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Optimization Applied
                    </span>
                  ) : (
                    <button
                      onClick={() => onApplyInsight(insight.id)}
                      className="btn-primary btn-sm text-[10px] py-1 px-2"
                    >
                      <Zap className="h-3 w-3" /> Apply Recommendation
                    </button>
                  )}
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
};
