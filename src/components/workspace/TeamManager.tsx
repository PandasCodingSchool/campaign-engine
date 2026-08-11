import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Users, 
  UserPlus, 
  CreditCard, 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  Clock, 
  ExternalLink,
  Plus
} from 'lucide-react';
import { authService, UserProfile, TenantOrg } from '../../services/authService';
import { billingService, SubscriptionStatus } from '../../services/billingService';

export const TeamManager: React.FC = () => {
  const [tenant, setTenant] = useState<TenantOrg | null>(null);
  const [teamMembers, setTeamMembers] = useState<UserProfile[]>([]);
  const [subscription, setSubscription] = useState<SubscriptionStatus | null>(null);
  
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'admin' | 'marketer' | 'approver' | 'viewer'>('marketer');
  const [inviteName, setInviteName] = useState('');
  const [isInviting, setIsInviting] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadData = async () => {
      const authData = await authService.getProfile();
      setTenant(authData.tenant);
      setTeamMembers(authData.teamMembers);

      const subData = await billingService.getSubscriptionStatus();
      setSubscription(subData);
    };

    loadData();
  }, []);

  const handleInviteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;
    setIsInviting(true);
    setMessage('');

    try {
      const newMember = await authService.inviteMember(inviteEmail, inviteRole, inviteName);
      setTeamMembers((prev) => [...prev, newMember]);
      setMessage(`Invitation dispatched to ${inviteEmail}`);
      setInviteEmail('');
      setInviteName('');
    } catch (err) {
      console.error('Invite failed', err);
    } finally {
      setIsInviting(false);
    }
  };

  const handleUpgradeClick = async (planName: string) => {
    const url = await billingService.startCheckoutSession(planName);
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header Banner */}
      <div className="glass-card p-5 border-indigo-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge badge-indigo flex items-center gap-1">
              <Building2 className="h-3 w-3" /> Multi-Tenant Workspace
            </span>
            <span className="badge badge-emerald flex items-center gap-1">
              <Zap className="h-3 w-3" /> {subscription?.plan || 'Growth'} Plan Active
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {tenant?.name || 'Nexus Enterprise Workspace'}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Tenant ID: <code className="font-mono text-indigo-600 dark:text-indigo-300">{tenant?.id || 'tenant-default-demo'}</code>
          </p>
        </div>

        {/* AI Credit Balance Meter */}
        {subscription && (
          <div className="bg-slate-100 dark:bg-slate-900/90 p-3 rounded-xl border border-slate-300 dark:border-slate-800 text-xs space-y-1.5 min-w-[240px]">
            <div className="flex justify-between font-semibold">
              <span className="text-slate-600 dark:text-slate-400">AI Credit Meter:</span>
              <span className="text-indigo-600 dark:text-indigo-300 font-bold">{subscription.remainingCredits} / {subscription.totalCredits}</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500" 
                style={{ width: `${(subscription.remainingCredits / subscription.totalCredits) * 100}%` }}
              ></div>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 text-right">
              Resets on {subscription.resetDate}
            </p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Team Members List */}
        <div className="glass-card p-5 space-y-4 lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Users className="h-4 w-4 text-purple-600 dark:text-purple-400" /> Team Seats & Access Control
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400">{teamMembers.length} Active Members</span>
          </div>

          <div className="space-y-3">
            {teamMembers.map((m) => (
              <div key={m.id} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-indigo-600 font-bold text-white flex items-center justify-center text-xs">
                    {m.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">{m.name}</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">{m.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`badge ${
                    m.role === 'owner' ? 'badge-indigo' : m.role === 'admin' ? 'badge-emerald' : 'badge-sky'
                  } text-[9px]`}>
                    {m.role}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Invite Form */}
          <form onSubmit={handleInviteSubmit} className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <UserPlus className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" /> Invite New Team Member
            </h4>

            {message && (
              <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5" /> {message}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <input
                type="text"
                placeholder="Name"
                value={inviteName}
                onChange={(e) => setInviteName(e.target.value)}
                className="bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
              />
              <input
                type="email"
                placeholder="Email address"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                required
                className="bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
              />
              <select
                value={inviteRole}
                onChange={(e) => setInviteRole(e.target.value as any)}
                className="bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="marketer">Campaign Marketer</option>
                <option value="approver">Manager / Approver</option>
                <option value="admin">Admin</option>
                <option value="viewer">Viewer</option>
              </select>
            </div>

            <button type="submit" disabled={isInviting} className="btn-primary btn-sm">
              <Plus className="h-3.5 w-3.5" /> Dispatch Invitation
            </button>
          </form>

        </div>

        {/* Subscription Plans & Stripe Management */}
        <div className="glass-card p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-emerald-600 dark:text-emerald-400" /> Subscription & Stripe Billing
            </h3>
          </div>

          <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="font-bold text-indigo-900 dark:text-indigo-200">{subscription?.plan || 'Growth'} Plan</span>
              <span className="badge badge-emerald text-[9px]">Active</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              Includes {subscription?.totalCredits.toLocaleString()} AI Credits per month with Stripe Metered Usage API overage protection.
            </p>
          </div>

          <div className="space-y-2 pt-2">
            <button
              onClick={() => handleUpgradeClick('Growth')}
              className="btn-primary w-full justify-center text-xs"
            >
              Upgrade Plan Tier
            </button>
            <button
              onClick={() => window.open('https://billing.stripe.com', '_blank')}
              className="btn-secondary w-full justify-center text-xs"
            >
              Stripe Customer Portal <ExternalLink className="h-3.5 w-3.5" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
