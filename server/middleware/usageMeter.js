// Tenant usage credit balance store (in-memory simulation backing Stripe Metered Billing)
const tenantCreditStore = {
  'tenant-default-demo': {
    plan: 'Growth',
    totalCredits: 2500,
    usedCredits: 140,
    resetDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  }
};

export const getTenantCredits = (tenantId) => {
  if (!tenantCreditStore[tenantId]) {
    tenantCreditStore[tenantId] = {
      plan: 'Starter',
      totalCredits: 500,
      usedCredits: 0,
      resetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };
  }
  return tenantCreditStore[tenantId];
};

export const checkAndDeductCredits = (costInCredits) => {
  return (req, res, next) => {
    const tenantId = req.tenantId || 'tenant-default-demo';
    const usage = getTenantCredits(tenantId);

    const remaining = usage.totalCredits - usage.usedCredits;
    if (remaining < costInCredits) {
      return res.status(402).json({
        success: false,
        error: 'AI Credit Balance Exhausted',
        message: `This operation requires ${costInCredits} AI credits. Remaining balance: ${remaining}. Please upgrade your plan or purchase credit add-ons.`,
        upgradeUrl: '/pricing'
      });
    }

    // Deduct credits
    usage.usedCredits += costInCredits;
    req.remainingCredits = usage.totalCredits - usage.usedCredits;
    next();
  };
};
