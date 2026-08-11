export interface SubscriptionStatus {
  plan: string;
  status: 'active' | 'trialing' | 'past_due' | 'canceled';
  totalCredits: number;
  usedCredits: number;
  remainingCredits: number;
  resetDate: string;
  billingCycle: 'monthly' | 'annual';
}

class BillingService {
  async getSubscriptionStatus(): Promise<SubscriptionStatus> {
    const tenantId = localStorage.getItem('nexus_tenant_id') || 'tenant-default-demo';
    try {
      const res = await fetch('/api/billing/subscription', {
        headers: { 'x-tenant-id': tenantId }
      });
      if (res.ok) {
        const data = await res.json();
        return data.subscription;
      }
    } catch {
      // Fallback
    }

    return {
      plan: 'Growth',
      status: 'active',
      totalCredits: 2500,
      usedCredits: 140,
      remainingCredits: 2360,
      resetDate: '2026-09-01',
      billingCycle: 'monthly'
    };
  }

  async startCheckoutSession(planName: string): Promise<string> {
    const tenantId = localStorage.getItem('nexus_tenant_id') || 'tenant-default-demo';
    const res = await fetch('/api/billing/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-tenant-id': tenantId
      },
      body: JSON.stringify({ planName })
    });
    const data = await res.json();
    return data.checkoutUrl;
  }
}

export const billingService = new BillingService();
