import { IntegrationChannel } from '../types/campaign';

const INITIAL_CHANNELS: IntegrationChannel[] = [
  {
    id: 'ch-linkedin',
    name: 'LinkedIn Company Page',
    type: 'linkedin',
    connected: true,
    accountName: 'NexusAI Enterprise',
    accountAvatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
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
    accountAvatar: 'https://images.unsplash.com/photo-1579389083078-4e7018379f7e?w=100&auto=format&fit=crop&q=80',
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
    accountAvatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
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
    accountAvatar: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=100&auto=format&fit=crop&q=80',
    lastSync: '1 hour ago',
    apiStatus: 'active',
    metrics: { publishedCount: 12, totalReach: 310000 }
  },
  {
    id: 'ch-meta',
    name: 'Meta Ads Manager & Graph',
    type: 'meta_ads',
    connected: false,
    accountName: 'Unlinked',
    apiStatus: 'disconnected',
    metrics: { publishedCount: 0, totalReach: 0 }
  }
];

class IntegrationHubService {
  private channels: IntegrationChannel[];

  constructor() {
    const saved = localStorage.getItem('nexus_integration_channels');
    if (saved) {
      try {
        this.channels = JSON.parse(saved);
      } catch {
        this.channels = INITIAL_CHANNELS;
      }
    } else {
      this.channels = INITIAL_CHANNELS;
    }
  }

  getChannels(): IntegrationChannel[] {
    return [...this.channels];
  }

  toggleChannelConnection(id: string): IntegrationChannel {
    this.channels = this.channels.map((ch) => {
      if (ch.id === id) {
        const nextConnected = !ch.connected;
        return {
          ...ch,
          connected: nextConnected,
          apiStatus: nextConnected ? 'active' : 'disconnected',
          accountName: nextConnected ? (ch.accountName === 'Unlinked' ? 'Connected Account' : ch.accountName) : 'Unlinked',
          lastSync: nextConnected ? 'Just now' : undefined
        };
      }
      return ch;
    });
    localStorage.setItem('nexus_integration_channels', JSON.stringify(this.channels));
    return this.channels.find((c) => c.id === id)!;
  }

  async publishAssetNow(assetId: string, channelType: string): Promise<{ success: boolean; message: string; timestamp: string }> {
    await new Promise((resolve) => setTimeout(resolve, 600));

    const timestamp = new Date().toLocaleTimeString();
    return {
      success: true,
      message: `Asset #${assetId.slice(-6)} successfully dispatched to ${channelType.toUpperCase()} API endpoint.`,
      timestamp
    };
  }
}

export const integrationHubService = new IntegrationHubService();
