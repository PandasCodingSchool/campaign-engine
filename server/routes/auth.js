import { Router } from 'express';
import { generateTenantToken } from '../middleware/authTenant.js';

const router = Router();

// In-memory tenant and user tables (backed by Postgres in production)
const tenants = [
  {
    id: 'tenant-default-demo',
    name: 'Nexus Enterprise',
    slug: 'nexus-enterprise',
    plan: 'Growth',
    createdAt: new Date().toISOString()
  }
];

const users = [
  {
    id: 'user-demo-1',
    email: 'admin@nexusai.io',
    name: 'Alex Rivera',
    tenantId: 'tenant-default-demo',
    role: 'owner'
  }
];

// Register new SaaS Client Tenant
router.post('/register', (req, res) => {
  const { orgName, name, email, password } = req.body;

  if (!orgName || !email) {
    return res.status(400).json({ success: false, error: 'Organization name and email required' });
  }

  const tenantId = `tenant-${Date.now()}`;
  const userId = `user-${Date.now()}`;

  const newTenant = {
    id: tenantId,
    name: orgName,
    slug: orgName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
    plan: 'Starter',
    createdAt: new Date().toISOString()
  };

  const newUser = {
    id: userId,
    email,
    name: name || 'Admin User',
    tenantId,
    role: 'owner'
  };

  tenants.push(newTenant);
  users.push(newUser);

  const token = generateTenantToken(newUser, tenantId);

  res.json({
    success: true,
    message: 'Client organization and user provisioned successfully',
    tenant: newTenant,
    user: newUser,
    token
  });
});

// Login
router.post('/login', (req, res) => {
  const { email } = req.body;
  const user = users.find((u) => u.email === email) || users[0];
  const token = generateTenantToken(user, user.tenantId);

  res.json({
    success: true,
    user,
    token
  });
});

// Get profile & team members
router.get('/me', (req, res) => {
  const tenantId = req.headers['x-tenant-id'] || 'tenant-default-demo';
  const tenant = tenants.find((t) => t.id === tenantId) || tenants[0];
  const teamMembers = users.filter((u) => u.tenantId === tenantId);

  res.json({
    success: true,
    tenant,
    teamMembers
  });
});

// Invite team member
router.post('/invite', (req, res) => {
  const { email, role, name } = req.body;
  const tenantId = req.headers['x-tenant-id'] || 'tenant-default-demo';

  const newUser = {
    id: `user-${Date.now()}`,
    email,
    name: name || email.split('@')[0],
    tenantId,
    role: role || 'marketer'
  };

  users.push(newUser);

  res.json({
    success: true,
    message: `Invitation email dispatched to ${email}`,
    member: newUser
  });
});

export default router;
