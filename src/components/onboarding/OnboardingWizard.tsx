import React, { useState } from 'react';
import { 
  Building2, 
  Globe, 
  CreditCard, 
  Users, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Loader2, 
  X,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { authService, TenantOrg, UserProfile } from '../../services/authService';

interface OnboardingWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onCompleted: (tenant: TenantOrg, user: UserProfile) => void;
}

export const OnboardingWizard: React.FC<OnboardingWizardProps> = ({
  isOpen,
  onClose,
  onCompleted
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  
  // Step 1: Org Details
  const [orgName, setOrgName] = useState('Nexus Cloud Solutions');
  const [adminName, setAdminName] = useState('Alex Rivera');
  const [adminEmail, setAdminEmail] = useState('alex@nexuscloud.io');

  // Step 2: Website Ingestion
  const [websiteUrl, setWebsiteUrl] = useState('https://nexusai.io');
  const [isIngesting, setIsIngesting] = useState(false);
  const [vectorsIndexed, setVectorsIndexed] = useState<number | null>(null);

  // Step 3: Plan
  const [selectedPlan, setSelectedPlan] = useState<'Starter' | 'Growth' | 'Enterprise'>('Growth');

  // Step 4: Team Invite
  const [inviteEmail, setInviteEmail] = useState('');
  const [invitedMembers, setInvitedMembers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleIngestWebsite = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsIngesting(true);
    try {
      const res = await fetch('/api/onboarding/ingest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ websiteUrl, orgName })
      });
      const data = await res.json();
      if (data.success) {
        setVectorsIndexed(data.brandContext.vectorEmbeddingsCount);
      }
    } catch (err) {
      console.error('Failed to ingest website', err);
    } finally {
      setIsIngesting(false);
    }
  };

  const handleAddInvite = () => {
    if (!inviteEmail.trim()) return;
    setInvitedMembers([...invitedMembers, inviteEmail.trim()]);
    setInviteEmail('');
  };

  const handleFinalizeOnboarding = async () => {
    setIsLoading(true);
    try {
      const result = await authService.registerTenant(orgName, adminName, adminEmail);
      
      // Invite any added members
      for (const email of invitedMembers) {
        await authService.inviteMember(email, 'marketer');
      }

      onCompleted(result.tenant, result.user);
      onClose();
    } catch (err) {
      console.error('Failed finalizing onboarding', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="glass-panel w-full max-w-2xl border-slate-200 dark:border-indigo-500/30 shadow-2xl p-6 relative overflow-hidden bg-white dark:bg-slate-900">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">Client Onboarding Wizard</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Step {step} of 4: Setup tenant organization, brand memory, & subscription</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-900 dark:hover:text-white p-1 rounded-lg">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          {[
            { num: 1, label: 'Org Profile' },
            { num: 2, label: 'Brand Vector Ingest' },
            { num: 3, label: 'Select Tier' },
            { num: 4, label: 'Team Setup' }
          ].map((s) => (
            <div key={s.num} className={`p-2 rounded-lg text-center border text-[11px] font-bold transition-all ${
              step === s.num
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-md'
                : step > s.num
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                : 'bg-slate-100 dark:bg-slate-950 text-slate-400 border-slate-200 dark:border-slate-800'
            }`}>
              {s.label}
            </div>
          ))}
        </div>

        {/* STEP 1: Org Details */}
        {step === 1 && (
          <form onSubmit={handleStep1Submit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Building2 className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" /> Client Organization Name
              </label>
              <input
                type="text"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                required
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                placeholder="e.g. Acme Enterprise"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Primary Admin Full Name
                </label>
                <input
                  type="text"
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                  required
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Admin Work Email
                </label>
                <input
                  type="email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  required
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
              <button type="submit" className="btn-primary">
                Next: Vector Brand Ingestion <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: Website Scraping & Vector Store */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 text-xs text-indigo-900 dark:text-indigo-200 space-y-1">
              <p className="font-bold flex items-center gap-1.5">
                <Globe className="h-4 w-4 text-indigo-600 dark:text-indigo-400" /> Automated Web Domain Scraping
              </p>
              <p className="text-slate-600 dark:text-slate-400">
                Nexus AI will automatically index your website content, product metadata, and tone rules into an isolated tenant vector store.
              </p>
            </div>

            <form onSubmit={handleIngestWebsite} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Target Product Website URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    required
                    className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                    placeholder="https://nexusai.io"
                  />
                  <button type="submit" disabled={isIngesting} className="btn-primary whitespace-nowrap">
                    {isIngesting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                    {isIngesting ? 'Ingesting...' : 'Ingest Domain'}
                  </button>
                </div>
              </div>
            </form>

            {vectorsIndexed && (
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 flex items-center justify-between animate-fade-in">
                <span className="font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" /> Indexed {vectorsIndexed} Vector Embeddings into Tenant Memory Store
                </span>
                <span className="badge badge-emerald text-[10px]">Ready</span>
              </div>
            )}

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-between">
              <button onClick={() => setStep(1)} className="btn-secondary btn-sm">
                Back
              </button>
              <button onClick={() => setStep(3)} className="btn-primary">
                Next: Select Plan Tier <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Plan Selection */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              {[
                { name: 'Starter', price: '$99/mo', credits: '500 AI Credits', desc: '1 Workspace, 3 Seats' },
                { name: 'Growth', price: '$299/mo', credits: '2,500 AI Credits', desc: '3 Workspaces, All Channels, MCP API' },
                { name: 'Enterprise', price: '$899+/mo', credits: 'Unlimited Credits', desc: 'Dedicated Vector Pod, SAML/SSO' }
              ].map((p) => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => setSelectedPlan(p.name as any)}
                  className={`p-4 rounded-xl border text-left flex flex-col justify-between transition-all ${
                    selectedPlan === p.name
                      ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-600 dark:border-indigo-500 shadow-md'
                      : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                  }`}
                >
                  <div>
                    <span className="badge badge-indigo text-[9px] mb-1">{p.name}</span>
                    <h4 className="text-lg font-black text-slate-900 dark:text-white">{p.price}</h4>
                    <p className="text-xs font-semibold text-indigo-700 dark:text-indigo-300">{p.credits}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">{p.desc}</p>
                  </div>
                  {selectedPlan === p.name && (
                    <CheckCircle2 className="h-4 w-4 text-indigo-600 dark:text-indigo-400 mt-3 self-end" />
                  )}
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-between">
              <button onClick={() => setStep(2)} className="btn-secondary btn-sm">
                Back
              </button>
              <button onClick={() => setStep(4)} className="btn-primary">
                Next: Invite Team <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Team Setup */}
        {step === 4 && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" /> Invite Team Members & Assign Roles
              </label>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                  placeholder="colleague@company.com"
                />
                <button type="button" onClick={handleAddInvite} className="btn-secondary btn-sm">
                  Add Member
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs flex justify-between items-center">
                <span>{adminEmail}</span>
                <span className="badge badge-indigo text-[9px]">Owner</span>
              </div>
              {invitedMembers.map((m, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs flex justify-between items-center">
                  <span>{m}</span>
                  <span className="badge badge-emerald text-[9px]">Marketer</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-between">
              <button onClick={() => setStep(3)} className="btn-secondary btn-sm">
                Back
              </button>
              <button
                type="button"
                onClick={handleFinalizeOnboarding}
                disabled={isLoading}
                className="btn-primary"
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
                {isLoading ? 'Provisioning SaaS Tenant...' : 'Complete SaaS Onboarding'}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
