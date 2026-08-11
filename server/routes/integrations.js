import { Router } from 'express';

const router = Router();

let channels = [
  {
    id: 'ch-linkedin',
    name: 'LinkedIn Company Page',
    type: 'linkedin',
    connected: true,
    accountName: 'NexusAI Enterprise',
    lastSync: '10 mins ago',
    apiStatus: 'active',
    metrics: { publishedCount: 42, totalReach: 128400 }
  },
  {
    id: 'ch-email',
    name: 'Mailchimp / HubSpot Sync',
    type: 'email',
    connected: true,
    accountName: 'Platform Leads List (18,400 subs)',
    lastSync: '2 hours ago',
    apiStatus: 'active',
    metrics: { publishedCount: 15, totalReach: 18400 }
  },
  {
    id: 'ch-twitter',
    name: 'Twitter / X API v2',
    type: 'twitter',
    connected: true,
    accountName: '@NexusAIEngine',
    lastSync: '5 mins ago',
    apiStatus: 'active',
    metrics: { publishedCount: 89, totalReach: 94200 }
  },
  {
    id: 'ch-google',
    name: 'Google Ads Manager',
    type: 'google_ads',
    connected: true,
    accountName: 'Nexus Search Campaign #402',
    lastSync: '1 hour ago',
    apiStatus: 'active',
    metrics: { publishedCount: 12, totalReach: 310000 }
  }
];

router.get('/channels', (req, res) => {
  res.json({ success: true, channels });
});

router.post('/publish', (req, res) => {
  const { assetId, channel } = req.body;
  const timestamp = new Date().toISOString();
  res.json({
    success: true,
    message: `Asset #${assetId} dispatched to ${channel.toUpperCase()} API endpoint.`,
    timestamp
  });
});

// Model Context Protocol (MCP) JSON-RPC handler endpoint
router.post('/mcp', (req, res) => {
  const { method, params, id } = req.body;

  if (method === 'campaigns/list') {
    return res.json({
      jsonrpc: '2.0',
      id,
      result: { status: 'ok', activeChannels: channels.filter((c) => c.connected).map((c) => c.name) }
    });
  }

  res.json({
    jsonrpc: '2.0',
    id,
    result: { status: 'acknowledged', method }
  });
});

export default router;
