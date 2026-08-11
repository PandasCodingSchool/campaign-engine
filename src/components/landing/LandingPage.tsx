import React, { useState } from 'react';
import { 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  Share2, 
  BarChart3, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Check, 
  Globe, 
  Play, 
  Database, 
  Sun,
  Moon
} from 'lucide-react';

interface LandingPageProps {
  onGoToApp: () => void;
  onSelectPlan: (planName: string) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onGoToApp,
  onSelectPlan,
  isDarkMode,
  onToggleTheme
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [demoUrl, setDemoUrl] = useState('');
  const [isScraping, setIsScraping] = useState(false);
  const [scrapeResult, setScrapeResult] = useState<{ brand: string; embeddings: number } | null>(null);

  const handleDemoScrape = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!demoUrl.trim()) return;
    setIsScraping(true);
    setScrapeResult(null);

    await new Promise((resolve) => setTimeout(resolve, 1200));

    setScrapeResult({
      brand: demoUrl.replace(/https?:\/\//, '').split('/')[0],
      embeddings: 1420
    });
    setIsScraping(false);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#07090e] text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300 selection:bg-indigo-500 selection:text-white">
      
      {/* 1. Header Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/90 dark:bg-slate-950/90 border-b border-slate-200 dark:border-slate-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/20 flex items-center justify-center">
              <div className="h-full w-full bg-white dark:bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Zap className="h-5 w-5 text-indigo-600 dark:text-indigo-400 fill-indigo-400/20" />
              </div>
            </div>
            <div>
              <span className="font-black text-xl tracking-tight text-slate-900 dark:text-white">CampaignEngine<span className="text-indigo-600 dark:text-indigo-400">.ai</span></span>
              <span className="badge badge-indigo text-[10px] ml-2">B2B SaaS</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-600 dark:text-slate-400">
            <a href="#features" className="hover:text-indigo-600 dark:hover:text-white transition-colors">Features</a>
            <a href="#architecture" className="hover:text-indigo-600 dark:hover:text-white transition-colors">Architecture</a>
            <a href="#onboarding" className="hover:text-indigo-600 dark:hover:text-white transition-colors">Instant Ingestion</a>
            <a href="#pricing" className="hover:text-indigo-600 dark:hover:text-white transition-colors">Pricing</a>
            <a href="#enterprise" className="hover:text-indigo-600 dark:hover:text-white transition-colors">Enterprise API</a>
          </nav>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-xl border border-slate-300 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              title={isDarkMode ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            >
              {isDarkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-indigo-600" />}
            </button>

            <button onClick={onGoToApp} className="btn-secondary text-xs">
              Sign In
            </button>
            <button onClick={onGoToApp} className="btn-primary text-xs shadow-xl">
              Launch App Workspace <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="relative pt-20 pb-24 px-6 overflow-hidden bg-[#f8fafc] dark:bg-[#07090e]">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-indigo-500/20 via-purple-500/15 to-pink-500/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-500/40 text-xs font-bold text-indigo-700 dark:text-indigo-300 shadow-md">
            <Sparkles className="h-4 w-4 text-indigo-600 dark:text-indigo-400 animate-pulse" />
            <span>Autonomous AI Engine for Multi-Channel Enterprise Campaigns</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1]">
            Turn Product URLs into Grounded <br />
            <span className="text-gradient">Multi-Channel Campaigns</span> in Seconds
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Stop copy-pasting generic LLM output. CampaignEngine AI grounds every post, HTML email, video script, and ad in your brand's vector memory, enforces automated compliance audits, and self-optimizes ad spend using closed-loop performance attribution.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button onClick={onGoToApp} className="btn-primary py-3.5 px-8 text-sm font-bold shadow-xl">
              Start 14-Day Free Trial <ArrowRight className="h-4 w-4" />
            </button>
            <a href="#onboarding" className="btn-secondary py-3.5 px-8 text-sm font-semibold">
              <Play className="h-4 w-4 text-indigo-600 dark:text-indigo-400 fill-indigo-400/20" /> Watch Interactive Demo
            </a>
          </div>

          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600 dark:text-slate-400 font-medium">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" /> No credit card required</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" /> SOC2 Type II Ready</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" /> 1-Click Multi-Channel Dispatch</span>
          </div>

        </div>
      </section>

      {/* 3. Trusted By Logos Matrix */}
      <section className="py-10 border-y border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-950/60">
        <div className="max-w-6xl mx-auto px-6 text-center space-y-4">
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
            POWERING CAMPAIGN ORCHESTRATION FOR HIGH-GROWTH PLATFORM & AI TEAMS
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 text-slate-700 dark:text-slate-300 font-black text-sm sm:text-base">
            <span className="hover:text-indigo-600 dark:hover:text-white transition-colors">⚡ NEXUS AI</span>
            <span className="hover:text-indigo-600 dark:hover:text-white transition-colors">☁ CLOUD MATRIX</span>
            <span className="hover:text-indigo-600 dark:hover:text-white transition-colors">🤖 DEV AGENTS</span>
            <span className="hover:text-indigo-600 dark:hover:text-white transition-colors">📊 METRIC HQ</span>
            <span className="hover:text-indigo-600 dark:hover:text-white transition-colors">🚀 VECTOR LABS</span>
          </div>
        </div>
      </section>

      {/* 4. Instant Ingestion Interactive Demo Wizard */}
      <section id="onboarding" className="py-20 px-6">
        <div className="max-w-4xl mx-auto glass-panel p-8 border border-slate-200 dark:border-indigo-500/30 shadow-2xl relative overflow-hidden bg-white dark:bg-slate-900/80">
          
          <div className="text-center space-y-3 mb-8">
            <span className="badge badge-indigo text-[10px]">Instant Client Onboarding</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">Test Automated Brand Vector Ingestion</h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
              Enter any product domain URL. Our engine will scrape metadata, extract brand rules, and index vector memory embeddings in under 2 seconds.
            </p>
          </div>

          <form onSubmit={handleDemoScrape} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto mb-6">
            <div className="relative flex-1">
              <Globe className="h-4 w-4 text-slate-400 dark:text-slate-500 absolute left-3 top-3.5" />
              <input
                type="text"
                placeholder="https://yourbrand.com"
                value={demoUrl}
                onChange={(e) => setDemoUrl(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl pl-9 pr-4 py-3 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <button type="submit" disabled={isScraping} className="btn-primary justify-center whitespace-nowrap">
              {isScraping ? 'Scraping & Indexing...' : 'Ingest Brand Context'}
            </button>
          </form>

          {scrapeResult && (
            <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-indigo-300 dark:border-indigo-500/40 max-w-xl mx-auto space-y-2 text-xs animate-fade-in shadow-md">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" /> Ingestion Complete for {scrapeResult.brand}
                </span>
                <span className="badge badge-emerald text-[10px]">{scrapeResult.embeddings} Vectors Indexed</span>
              </div>
              <p className="text-slate-700 dark:text-slate-300">
                Created tenant workspace isolation ID <code className="text-indigo-700 dark:text-indigo-300 font-mono font-bold bg-indigo-50 dark:bg-indigo-950/60 px-1.5 py-0.5 rounded border border-indigo-200 dark:border-indigo-800">tenant_demo_948102</code>. Ready to generate grounded campaigns!
              </p>
              <button onClick={onGoToApp} className="btn-primary btn-sm mt-2 w-full justify-center">
                Open Campaign Workspace →
              </button>
            </div>
          )}

        </div>
      </section>

      {/* 5. 5-Core Feature Pillars */}
      <section id="features" className="py-20 px-6 bg-slate-100/70 dark:bg-slate-950/40 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="badge badge-indigo">The 5 Engine Pillars</span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Built for High-Scale Enterprise Campaign Ops</h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 max-w-lg mx-auto">
              Everything required to plan, generate, audit, dispatch, and optimize multi-channel campaigns in a single platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="glass-card p-6 space-y-3 bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800">
              <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 w-fit">
                <Database className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">1. Brand Context Store & Vector Memory</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                Persists brand tone rules, negative keywords, target personas, and past campaign memory so generations never hallucinate.
              </p>
            </div>

            <div className="glass-card p-6 space-y-3 bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800">
              <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-600 dark:text-purple-400 w-fit">
                <Layers className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">2. Multi-Format Creative Studio</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                Generates responsive HTML emails, technical LinkedIn articles, Twitter threads, Reel scripts, and Google & Meta Ads simultaneously.
              </p>
            </div>

            <div className="glass-card p-6 space-y-3 bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800">
              <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 w-fit">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">3. Automated Compliance Gatekeeper</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                Runs parallel automated audits for brand safety, tone of voice match, and spam risk, scoring assets 0–100% before human approval.
              </p>
            </div>

            <div className="glass-card p-6 space-y-3 bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 w-fit">
                <Share2 className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">4. Integration Hub & MCP Server</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                Direct two-way connectors for LinkedIn, Meta, Mailchimp, and Google Ads, plus Model Context Protocol JSON-RPC for external AI tools.
              </p>
            </div>

            <div className="glass-card p-6 space-y-3 bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 md:col-span-2">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 w-fit">
                <BarChart3 className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">5. Closed-Loop AI Performance Attribution</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                Synthesizes real-time CTR, ROI, and conversion data to generate single-click budget reallocation recommendations that automatically rebalance channel spend.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 6. Pricing Section */}
      <section id="pricing" className="py-20 px-6 bg-[#f8fafc] dark:bg-[#07090e]">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="badge badge-emerald">Simple Tiered Pricing</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">Predictable Plans for Growing Teams</h2>
            <p className="text-xs text-slate-600 dark:text-slate-300">Scale seamlessly with transparent AI credit allocations and multi-tenant isolation.</p>

            {/* Monthly / Annual Toggle */}
            <div className="flex items-center justify-center gap-3 pt-4">
              <span className={`text-xs font-semibold ${billingCycle === 'monthly' ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>Monthly</span>
              <button
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
                className="w-12 h-6 rounded-full bg-slate-200 dark:bg-slate-800 p-1 transition-colors relative border border-slate-300 dark:border-slate-700"
              >
                <div className={`w-4 h-4 rounded-full bg-indigo-600 dark:bg-indigo-500 transition-transform ${billingCycle === 'annual' ? 'translate-x-6' : 'translate-x-0'}`}></div>
              </button>
              <span className={`text-xs font-semibold flex items-center gap-1 ${billingCycle === 'annual' ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>
                Annual <span className="badge badge-emerald text-[9px]">Save 20%</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Starter Plan */}
            <div className="glass-card p-6 space-y-6 bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="badge badge-indigo">Starter</span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Growth Marketer</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-slate-900 dark:text-white">${billingCycle === 'annual' ? '79' : '99'}</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">/ month</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">Perfect for single brands building grounded social & email campaigns.</p>
                <ul className="text-xs text-slate-700 dark:text-slate-200 space-y-2.5 pt-2 border-t border-slate-200 dark:border-slate-800">
                  <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" /> 500 AI Credits / month</li>
                  <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" /> 1 Brand Context Workspace</li>
                  <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" /> Email, LinkedIn, Twitter</li>
                  <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" /> AI Compliance Auditor</li>
                  <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" /> 3 Team Seats</li>
                </ul>
              </div>
              <button onClick={() => onSelectPlan('Starter')} className="btn-secondary w-full justify-center">
                Start Starter Trial
              </button>
            </div>

            {/* Growth Plan (Popular) */}
            <div className="glass-card p-6 space-y-6 border-indigo-500/60 bg-gradient-to-b from-indigo-50/80 via-white to-white dark:from-indigo-950/50 dark:via-slate-900 dark:to-slate-900 shadow-2xl relative flex flex-col justify-between">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 badge badge-indigo bg-indigo-600 text-white font-extrabold text-[10px] shadow-lg">
                MOST POPULAR
              </div>
              <div className="space-y-4 pt-2">
                <span className="badge badge-indigo">Growth</span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Scale Engine</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-slate-900 dark:text-white">${billingCycle === 'annual' ? '239' : '299'}</span>
                  <span className="text-xs text-slate-600 dark:text-slate-400">/ month</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">For platform teams and marketing agencies running multi-channel campaigns.</p>
                <ul className="text-xs text-slate-800 dark:text-slate-200 space-y-2.5 pt-2 border-t border-slate-200 dark:border-slate-800 font-medium">
                  <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" /> 2,500 AI Credits / month</li>
                  <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" /> 3 Brand Workspaces</li>
                  <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" /> All Channels (Inc. Google Ads & Reels)</li>
                  <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" /> Model Context Protocol (MCP) Server</li>
                  <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" /> AI Performance Attribution Loop</li>
                  <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" /> 10 Team Seats</li>
                </ul>
              </div>
              <button onClick={() => onSelectPlan('Growth')} className="btn-primary w-full justify-center shadow-xl">
                Start Growth Trial →
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="glass-card p-6 space-y-6 bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="badge badge-sky">Enterprise</span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Custom Matrix</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-slate-900 dark:text-white">$899+</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">/ month</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">Custom volume, dedicated vector infrastructure, and SAML/SSO.</p>
                <ul className="text-xs text-slate-700 dark:text-slate-200 space-y-2.5 pt-2 border-t border-slate-200 dark:border-slate-800">
                  <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" /> Custom Unlimited AI Credits</li>
                  <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" /> Unlimited Brand Workspaces</li>
                  <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" /> Dedicated pgvector Pod</li>
                  <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" /> Custom SAML / Okta SSO</li>
                  <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" /> 99.9% Uptime SLA & Dedicated Manager</li>
                </ul>
              </div>
              <button onClick={() => onSelectPlan('Enterprise')} className="btn-secondary w-full justify-center">
                Contact Enterprise Sales
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* 7. Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-12 px-6 bg-white dark:bg-slate-950 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            <span className="font-bold text-slate-900 dark:text-white">CampaignEngine.ai</span> © 2026. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#features" className="hover:text-slate-900 dark:hover:text-slate-300">Privacy Policy</a>
            <a href="#architecture" className="hover:text-slate-900 dark:hover:text-slate-300">Terms of Service</a>
            <a href="#pricing" className="hover:text-slate-900 dark:hover:text-slate-300">API Documentation</a>
            <a href="#onboarding" className="hover:text-slate-900 dark:hover:text-slate-300">Status</a>
          </div>
        </div>
      </footer>

    </div>
  );
};
