import { Router } from 'express';

const router = Router();

let analyticsData = [
  { channel: 'email', channelName: 'Email Newsletter', impressions: 18400, clicks: 3420, ctr: 18.5, conversions: 412, spend: 350, roi: 8.4 },
  { channel: 'linkedin', channelName: 'LinkedIn Posts', impressions: 45200, clicks: 2180, ctr: 4.8, conversions: 185, spend: 1200, roi: 4.2 },
  { channel: 'twitter', channelName: 'Twitter / X Thread', impressions: 68100, clicks: 1420, ctr: 2.1, conversions: 94, spend: 400, roi: 2.8 },
  { channel: 'google_ads', channelName: 'Google Search Ads', impressions: 112000, clicks: 5600, ctr: 5.0, conversions: 620, spend: 2500, roi: 5.1 }
];

let insightsData = [
  {
    id: 'ins-1',
    title: 'High Email Engagement vs Low Meta ROI',
    type: 'budget_reallocation',
    impactLevel: 'high',
    description: 'Email newsletter click-through rate (18.5%) and conversion efficiency are outperforming Meta ad campaigns by 425%.',
    evidence: 'Meta retargeting ROI dropped to 1.6x, while Email ROI achieved 8.4x over the past 7 days.',
    suggestedAction: 'Reallocate 25% ($200/wk) of Meta ad budget directly toward retargeting high-intent email clickers.',
    applied: false,
    metricsChange: '+ $1,840 Projected Revenue'
  }
];

router.get('/metrics', (req, res) => {
  res.json({ success: true, analytics: analyticsData });
});

router.get('/insights', (req, res) => {
  res.json({ success: true, insights: insightsData });
});

router.post('/apply-insight', (req, res) => {
  const { id } = req.body;
  insightsData = insightsData.map((ins) => (ins.id === id ? { ...ins, applied: true } : ins));
  res.json({ success: true, insights: insightsData });
});

export default router;
