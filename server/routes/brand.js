import { Router } from 'express';

const router = Router();

let brandStore = {
  id: 'brand-1',
  name: 'NexusAI Engine',
  tagline: 'Autonomous AI Infrastructure for Modern Enterprise Engineering',
  website: 'https://nexusai.io',
  toneOfVoice: [
    'Authoritative yet accessible',
    'Data-driven & precision focused',
    'Developer-first & technical',
    'Energetic and forward-looking'
  ],
  prohibitedTerms: ['cheap', 'magic', 'guaranteed 100x', 'foolproof', 'no code needed'],
  coreValues: [
    'Sub-millisecond Performance',
    'Enterprise-Grade Security (SOC2 Type II)',
    'Developer Joy & Open Standards'
  ],
  targetPersonas: [
    {
      id: 'p-1',
      name: 'Alex Rivera',
      role: 'VP of Platform Engineering',
      painPoints: ['High cloud costs', 'Brittle CI/CD pipelines', 'Vendor lock-in'],
      goals: ['Reduce infra latency by 40%', 'Automate deployment safety', 'Scale team output'],
      preferredChannels: ['linkedin', 'email', 'google_ads']
    },
    {
      id: 'p-2',
      name: 'Maya Lin',
      role: 'Lead AI Application Architect',
      painPoints: ['Model latency spikes', 'RAG evaluation complexity', 'Context window limits'],
      goals: ['Deploy resilient AI agents', 'Seamless vector storage', 'Instant API response'],
      preferredChannels: ['twitter', 'linkedin', 'google_ads']
    }
  ],
  pastLearnings: [
    'Technical deep-dive Twitter threads convert 3x better than generic promotional posts.',
    'HTML Emails with code snippet previews achieve 42% higher CTR among engineering leads.',
    'Short video demos under 45 seconds perform best on LinkedIn during Tuesday mornings.'
  ],
  vectorEmbeddingsCount: 1420
};

router.get('/', (req, res) => {
  res.json({ success: true, brand: brandStore });
});

router.put('/', (req, res) => {
  brandStore = { ...brandStore, ...req.body };
  res.json({ success: true, brand: brandStore });
});

router.post('/learning', (req, res) => {
  const { learning } = req.body;
  if (learning) {
    brandStore.pastLearnings.unshift(learning);
    brandStore.vectorEmbeddingsCount += 12;
  }
  res.json({ success: true, brand: brandStore });
});

export default router;
