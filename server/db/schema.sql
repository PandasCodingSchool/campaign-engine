-- Enable pgvector Extension for Vector Embedding Similarity Search
CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Tenants / Organizations Table (SaaS Isolation)
CREATE TABLE IF NOT EXISTS tenants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    stripe_customer_id VARCHAR(255),
    subscription_plan VARCHAR(50) DEFAULT 'Growth',
    subscription_status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Workspace Users & RBAC Roles
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'marketer', -- 'owner', 'admin', 'marketer', 'approver', 'viewer'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Brand Context Store
CREATE TABLE IF NOT EXISTS brand_contexts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE UNIQUE,
    brand_name VARCHAR(255) NOT NULL,
    tagline TEXT,
    website_url TEXT,
    tone_rules JSONB DEFAULT '[]'::jsonb,
    prohibited_terms JSONB DEFAULT '[]'::jsonb,
    target_personas JSONB DEFAULT '[]'::jsonb,
    past_learnings JSONB DEFAULT '[]'::jsonb,
    vector_count INT DEFAULT 1420,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Isolated Vector Embeddings Store per Tenant (pgvector)
CREATE TABLE IF NOT EXISTS brand_vector_embeddings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    embedding VECTOR(1536), -- 1536-dim vector embedding
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Campaign Plans
CREATE TABLE IF NOT EXISTS campaign_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    product_url TEXT,
    objective TEXT,
    target_audience TEXT,
    budget NUMERIC(12,2) DEFAULT 5000.00,
    status VARCHAR(50) DEFAULT 'active',
    channels JSONB DEFAULT '[]'::jsonb,
    kpis JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Multi-Format Assets & Approval Pipeline
CREATE TABLE IF NOT EXISTS campaign_assets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campaign_id UUID REFERENCES campaign_plans(id) ON DELETE CASCADE,
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    channel VARCHAR(50) NOT NULL, -- 'email', 'linkedin', 'twitter', 'instagram', 'google_ads', 'meta_ads'
    title VARCHAR(255) NOT NULL,
    stage VARCHAR(50) DEFAULT 'draft', -- 'draft', 'ai_compliance', 'manager_approval', 'scheduled', 'published'
    content JSONB NOT NULL,
    compliance_score INT DEFAULT 95,
    compliance_checks JSONB DEFAULT '[]'::jsonb,
    version INT DEFAULT 1,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert Default Demo Tenant Data if empty
INSERT INTO tenants (id, name, slug, subscription_plan)
VALUES ('00000000-0000-0000-0000-000000000001', 'NexusAI Enterprise', 'nexus-ai', 'Growth')
ON CONFLICT (id) DO NOTHING;

INSERT INTO users (id, tenant_id, email, name, role)
VALUES ('00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', 'admin@nexusai.io', 'Alex Rivera', 'owner')
ON CONFLICT (email) DO NOTHING;
