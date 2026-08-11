import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

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

// API Routers
app.use('/api/brand', brandRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/assets', assetRoutes);
app.use('/api/integrations', integrationRoutes);
app.use('/api/analytics', analyticsRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Unified Campaign Engine API Server',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Campaign Engine Express Backend running on http://localhost:${PORT}`);
});
