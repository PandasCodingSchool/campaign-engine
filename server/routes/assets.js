import { Router } from 'express';
import { AIOrchestrator } from '../services/aiOrchestrator.js';

const router = Router();

router.post('/generate', async (req, res) => {
  try {
    const { campaign, brand } = req.body;
    const assets = await AIOrchestrator.generateAssets(campaign, brand);
    res.json({ success: true, assets });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/audit', (req, res) => {
  const { text, prohibitedTerms } = req.body;
  const audit = AIOrchestrator.auditCompliance(text || '', prohibitedTerms || []);
  res.json({ success: true, audit });
});

export default router;
