import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'nexus_campaign_engine_jwt_secret_key_2026';

/**
 * Middleware to verify JWT and extract tenant context
 */
export const authTenant = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // For demo convenience, attach default tenant if no token provided
    req.tenantId = req.headers['x-tenant-id'] || 'tenant-default-demo';
    req.userId = 'user-demo-1';
    req.role = 'owner';
    return next();
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.tenantId = decoded.tenantId;
    req.userId = decoded.userId;
    req.role = decoded.role;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, error: 'Invalid or expired authorization token' });
  }
};

/**
 * Generate JWT token for tenant user
 */
export const generateTenantToken = (user, tenantId) => {
  return jwt.sign(
    {
      userId: user.id,
      email: user.email,
      tenantId: tenantId,
      role: user.role
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
};
