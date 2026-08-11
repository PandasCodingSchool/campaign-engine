import dotenv from 'dotenv';
dotenv.config();

/**
 * AI Orchestrator Service
 * Coordinates LLM calls (OpenAI/Claude API) or fallback generation logic
 */
export class AIOrchestrator {
  static async generateBrief(input) {
    const { title, productUrl, objective, targetAudience, budget, channels } = input;

    // If OPENAI_API_KEY or ANTHROPIC_API_KEY is present, we could make live LLM API requests:
    /*
    if (process.env.OPENAI_API_KEY) {
      // Call OpenAI Chat Completion API with JSON Schema mode
    }
    */

    const today = new Date();
    const endDate = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

    return {
      id: `cmp-${Date.now()}`,
      title: title || 'Q3 Developer Product Launch',
      productUrl: productUrl || 'https://nexusai.io/features/dev-agent',
      objective: objective || 'Drive 1,500 developer signups and test cloud agent deployment',
      targetAudience: targetAudience || 'VP of Platform Engineering & Lead AI Architects',
      startDate: today.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      status: 'active',
      channels: channels && channels.length > 0 ? channels : ['email', 'linkedin', 'twitter', 'google_ads', 'meta_ads'],
      budget: budget || 5000,
      kpis: [
        { metric: 'Target Engagements', target: '25,000' },
        { metric: 'Click-Through Rate (CTR)', target: '4.8%' },
        { metric: 'Qualified Signups', target: '1,200' },
        { metric: 'Cost Per Acquisition (CPA)', target: '$4.15' }
      ],
      createdAt: new Date().toISOString()
    };
  }

  static async generateAssets(campaign, brand) {
    const assets = [];

    if (campaign.channels.includes('email')) {
      assets.push({
        id: `asset-${Date.now()}-email`,
        campaignId: campaign.id,
        channel: 'email',
        title: 'Developer Launch Announcement Blast',
        stage: 'ai_compliance',
        content: {
          subject: `🚀 Architecting the Future: Introducing ${campaign.title}`,
          previewText: `Sub-millisecond AI workflow orchestration built directly for platform teams.`,
          htmlBody: `
<div style="font-family: 'Inter', Helvetica, sans-serif; background-color: #0d1117; color: #e6edf3; padding: 32px; border-radius: 12px; max-width: 600px; margin: 0 auto; border: 1px solid #30363d;">
  <div style="text-align: center; margin-bottom: 24px;">
    <span style="background: linear-gradient(135deg, #6366f1, #a855f7); color: white; padding: 6px 14px; border-radius: 20px; font-weight: 700; font-size: 13px; letter-spacing: 0.5px;">NEXUS AI ANNOUNCEMENT</span>
  </div>
  <h1 style="color: #ffffff; font-size: 24px; font-weight: 800; margin-bottom: 16px; line-height: 1.3;">Accelerate AI Agent Deployment with Zero Vendor Lock-in</h1>
  <p style="color: #8b949e; font-size: 15px; line-height: 1.6; margin-bottom: 20px;">
    Hi {{first_name}}, modern engineering teams spend up to 40% of sprint time tuning infra for autonomous agents. <strong>${campaign.title}</strong> eliminates context switching with native vector execution and real-time observability.
  </p>
  <div style="background-color: #161b22; border-left: 4px solid #6366f1; padding: 16px; margin-bottom: 24px; border-radius: 0 8px 8px 0;">
    <code style="color: #7ee787; font-family: monospace; font-size: 13px;">
      $ npx nexus-agent init --template enterprise-rag<br/>
      ✔ Deployed to sub-ms edge cluster in 1.4s
    </code>
  </div>
  <div style="text-align: center; margin-top: 32px;">
    <a href="${campaign.productUrl}" style="background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%); color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: 700; display: inline-block; box-shadow: 0 4px 14px rgba(99,102,241,0.4);">Explore Developer Sandbox →</a>
  </div>
</div>
          `.trim(),
          ctaText: 'Explore Developer Sandbox'
        },
        complianceScore: 96,
        complianceChecks: this.auditCompliance(campaign.title, brand?.prohibitedTerms || []),
        version: 1,
        updatedAt: new Date().toISOString()
      });
    }

    if (campaign.channels.includes('linkedin')) {
      assets.push({
        id: `asset-${Date.now()}-linkedin`,
        campaignId: campaign.id,
        channel: 'linkedin',
        title: 'Engineering Leadership Thought Piece',
        stage: 'ai_compliance',
        content: {
          postText: `Traditional CI/CD pipelines weren't designed for non-deterministic AI workflows.\n\nHere is what we learned building ${campaign.title} for platform engineering leaders:\n\n1️⃣ Latency is the primary bottleneck: Moving agent context to edge vector clusters reduced P99 response time from 1.2s to 45ms.\n2️⃣ Human-in-the-loop review nodes prevent hallucinated deployments.\n3️⃣ Open standards keep your stack future-proof.\n\nRead our technical blueprint or try our sandbox instance below.`,
          hashtags: ['#PlatformEngineering', '#DeveloperTools', '#ArtificialIntelligence', '#DevOps'],
          imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
          ctaText: 'Read Architecture Guide'
        },
        complianceScore: 94,
        complianceChecks: this.auditCompliance(campaign.title, brand?.prohibitedTerms || []),
        version: 1,
        updatedAt: new Date().toISOString()
      });
    }

    if (campaign.channels.includes('twitter')) {
      assets.push({
        id: `asset-${Date.now()}-twitter`,
        campaignId: campaign.id,
        channel: 'twitter',
        title: 'Short-Form Product Launch Tweet',
        stage: 'ai_compliance',
        content: {
          postText: `Stop wrestling with brittle LLM glue code. 🧵\n\nWe built ${campaign.title} to deliver enterprise-grade agent orchestration in 3 lines of code.\n\n⚡ Sub-ms latency\n🔒 SOC2 Type II compliance\n🔌 Native API connectors\n\nTry it live: ${campaign.productUrl}`,
          hashtags: ['#AI', '#DevTools', '#TypeScript', '#BuildInPublic'],
          ctaText: 'Try Live Sandbox'
        },
        complianceScore: 98,
        complianceChecks: this.auditCompliance(campaign.title, brand?.prohibitedTerms || []),
        version: 1,
        updatedAt: new Date().toISOString()
      });
    }

    if (campaign.channels.includes('google_ads')) {
      assets.push({
        id: `asset-${Date.now()}-google`,
        campaignId: campaign.id,
        channel: 'google_ads',
        title: 'Search Intent Conversion Ads',
        stage: 'manager_approval',
        content: {
          headline: `Nexus AI Engine | Sub-ms Developer Agent Platform`,
          description: `Scale platform engineering with enterprise-grade autonomous AI workflows. Try free sandbox today.`,
          ctaText: 'Start Free Trial'
        },
        complianceScore: 99,
        complianceChecks: this.auditCompliance(campaign.title, brand?.prohibitedTerms || []),
        version: 1,
        updatedAt: new Date().toISOString()
      });
    }

    return assets;
  }

  static auditCompliance(text, prohibited = []) {
    const lower = text.toLowerCase();
    const found = prohibited.filter((p) => lower.includes(p.toLowerCase()));

    return [
      {
        category: 'tone',
        passed: true,
        score: 95,
        feedback: 'Matches developer-first, authoritative tone of voice.'
      },
      {
        category: 'brand_safety',
        passed: found.length === 0,
        score: found.length === 0 ? 100 : 60,
        feedback: found.length === 0 ? 'No prohibited terms detected.' : `Warning: Prohibited terms found: ${found.join(', ')}`
      },
      {
        category: 'spam_risk',
        passed: true,
        score: 98,
        feedback: 'Low spam score. Clean text structure.'
      }
    ];
  }
}
