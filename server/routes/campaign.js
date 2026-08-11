import { Router } from 'express';
import { AIOrchestrator } from '../services/aiOrchestrator.js';

const router = Router();

router.post('/plan', async (req, res) => {
  try {
    const plan = await AIOrchestrator.generateBrief(req.body);
    res.json({ success: true, plan });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
