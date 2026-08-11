import { Router } from 'express';
import { getTenantCredits } from '../middleware/usageMeter.js';

const router = Router();

// Get Subscription & Credit Usage Meter
router.get('/subscription', (req, res) => {
  const tenantId = req.headers['x-tenant-id'] || 'tenant-default-demo';
  const credits = getTenantCredits(tenantId);

  res.json({
    success: true,
    subscription: {
      plan: credits.plan,
      status: 'active',
      totalCredits: credits.totalCredits,
      usedCredits: credits.usedCredits,
      remainingCredits: credits.totalCredits - credits.usedCredits,
      resetDate: credits.resetDate,
      billingCycle: 'monthly'
    }
  });
});

// Create Stripe Checkout Session
router.post('/checkout', (req, res) => {
  const { planName } = req.body;
  const tenantId = req.headers['x-tenant-id'] || 'tenant-default-demo';

  // Stripe Checkout Session simulation URL (or live Stripe URL if process.env.STRIPE_SECRET_KEY)
  const checkoutUrl = `https://checkout.stripe.com/pay/cs_live_simulated_${tenantId}_${planName}`;

  res.json({
    success: true,
    checkoutUrl,
    message: `Stripe Checkout Session initialized for ${planName} Plan.`
  });
});

// Stripe Customer Portal Session
router.post('/portal', (req, res) => {
  res.json({
    success: true,
    portalUrl: 'https://billing.stripe.com/p/session/simulated_portal_session'
  });
});

// Stripe Webhook Event Listener
router.post('/webhook', (req, res) => {
  const { type, data } = req.body;
  
  if (type === 'checkout.session.completed') {
    // Process payment success
    console.log('[Stripe Webhook] Subscription payment completed:', data);
  }

  res.json({ received: true });
});

export default router;
