export interface UserProfile {
  id: string;
  email: string;
  name: string;
  tenantId: string;
  role: 'owner' | 'admin' | 'marketer' | 'approver' | 'viewer';
}

export interface TenantOrg {
  id: string;
  name: string;
  slug: string;
  plan: string;
}

class AuthService {
  private token: string | null = localStorage.getItem('nexus_auth_token');
  private user: UserProfile | null = null;
  private tenant: TenantOrg | null = null;

  getToken(): string | null {
    return this.token;
  }

  async registerTenant(orgName: string, name: string, email: string): Promise<{ user: UserProfile; tenant: TenantOrg; token: string }> {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orgName, name, email })
    });
    const data = await res.json();
    if (data.success) {
      this.token = data.token;
      this.user = data.user;
      this.tenant = data.tenant;
      localStorage.setItem('nexus_auth_token', data.token);
      localStorage.setItem('nexus_tenant_id', data.tenant.id);
    }
    return data;
  }

  async getProfile(): Promise<{ user: UserProfile; tenant: TenantOrg; teamMembers: UserProfile[] }> {
    const tenantId = localStorage.getItem('nexus_tenant_id') || 'tenant-default-demo';
    const res = await fetch('/api/auth/me', {
      headers: { 'x-tenant-id': tenantId }
    });
    const data = await res.json();
    if (data.success) {
      this.tenant = data.tenant;
      this.user = data.teamMembers[0];
    }
    return data;
  }

  async inviteMember(email: string, role: string, name?: string): Promise<UserProfile> {
    const tenantId = localStorage.getItem('nexus_tenant_id') || 'tenant-default-demo';
    const res = await fetch('/api/auth/invite', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-tenant-id': tenantId
      },
      body: JSON.stringify({ email, role, name })
    });
    const data = await res.json();
    return data.member;
  }
}

export const authService = new AuthService();
