import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { authTenant } from './middleware/authTenant.js';
import { checkAndDeductCredits } from './middleware/usageMeter.js';

import authRoutes from './routes/auth.js';
import billingRoutes from './routes/billing.js';
import onboardingRoutes from './routes/onboarding.js';
import brandRoutes from './routes/brand.js';
import campaignRoutes from './routes/campaign.js';
import assetRoutes from './routes/assets.js';
import integrationRoutes from './routes/integrations.js';
import analyticsRoutes from './routes/analytics.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Public Unauthenticated API Routes
app.use('/api/auth', authRoutes);
app.use('/api/billing', billingRoutes);

// Protected Tenant Routes with authTenant middleware
app.use('/api/onboarding', authTenant, onboardingRoutes);
app.use('/api/brand', authTenant, brandRoutes);

// Credit-Metered AI Generation Routes
app.use('/api/campaigns', authTenant, checkAndDeductCredits(10), campaignRoutes);
app.use('/api/assets', authTenant, checkAndDeductCredits(25), assetRoutes);

app.use('/api/integrations', authTenant, integrationRoutes);
app.use('/api/analytics', authTenant, analyticsRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Unified Campaign Engine Multi-Tenant SaaS Server',
    version: '2.0.0',
    multiTenancy: 'active',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Campaign Engine Multi-Tenant SaaS Backend running on http://localhost:${PORT}`);
});
