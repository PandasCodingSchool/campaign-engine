# 🚀 CampaignEngine AI - Unified Campaign Engine & B2B SaaS Platform

[![Node.js](https://img.shields.io/badge/Node.js-v22.11-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-v18.3-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-v5.6-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-v5.4-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4.0-38bdf8.svg)](https://tailwindcss.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-pgvector-4169e1.svg)](https://github.com/pgvector/pgvector)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ed.svg)](https://www.docker.com/)

**CampaignEngine AI** is a state-of-the-art, **Autonomous B2B SaaS Marketing & Campaign Engine**. Unlike traditional stateless LLM wrappers, CampaignEngine grounds every campaign in your brand's vector memory, enforces automated compliance audits, manages human-in-the-loop approval pipelines, and self-optimizes ad spend using closed-loop performance attribution.

---

## 🌟 Key Features & Architecture Pillars

### 1. Strategic Planning & Brand Context Store
- **Brand Context Vector Store**: Grounding campaign briefs with persona pain points, corporate values, prohibited buzzwords, and vector embeddings memory.
- **AI Campaign Brief Generator**: Converts high-level product URLs and strategic goals into 1-week structured campaign packages.

### 2. Multi-Format Creative Studio & Compliance Audit
- **Channel-Native Generators**: Produces HTML email templates with developer code snippets, LinkedIn articles, Twitter threads, Instagram Reel scripts, Google Search Ads, and Meta Carousel Ads simultaneously.
- **Automated Compliance Auditor**: Parallel deterministic audit evaluating tone-of-voice match, brand safety, and spam risk (0–100% score).
- **Human-in-the-Loop Pipeline**: Kanban approval workflow (`Draft` → `AI Compliance Check` → `Manager Review` → `Scheduled Queue` → `Published`).

### 3. Integration Hub & Model Context Protocol (MCP) Server
- **Two-Way API Connectors**: Direct publishing interfaces for LinkedIn API, Twitter/X API v2, Meta Graph API, Google Ads, and Mailchimp/HubSpot.
- **MCP Server Protocol**: Exposes standard JSON-RPC endpoints (`/api/integrations/mcp`) allowing external autonomous AI agents to query status or schedule posts.

### 4. Unified Analytics & AI Attribution Feedback Loop
- **Cross-Channel KPI Dashboard**: Aggregates impressions, clicks, CTR, conversions, ad spend, and net ROI visualized via Recharts.
- **Closed-Loop AI Attribution**: Analyzes performance discrepancies and generates single-click budget reallocation recommendations.

### 5. Multi-Tenant B2B SaaS Core
- **Stripe Billing & Subscription Metering**: Starter ($99/mo), Growth ($299/mo), and Enterprise ($899/mo) tiers with AI credit metering.
- **Instant Client Onboarding Wizard**: 4-step wizard (*Org Setup → Website Ingest & Vectorization → Select Tier → Team Setup*).
- **Light & Dark Theme System**: Built-in ☀️/🌙 theme switcher.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS v4, Lucide Icons, Recharts.
- **Backend API**: Node.js, Express, JWT, CORS, Dotenv.
- **Databases & Infrastructure**: PostgreSQL (with `pgvector` extension), Redis, Docker & Docker Compose.

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js >= 22.x
- npm >= 10.x
- Docker & Docker Compose (optional for containerized deployment)

### 1. Local Development (Express API + Vite Dev Server)

```bash
# 1. Clone repository & install dependencies
git clone https://github.com/Pankajpandey/campaign-engine.git
cd campaign-engine
npm install

# 2. Setup Environment Variables
cp .env.example .env

# 3. Start Express Backend (:5000) and Vite Frontend (:3000) concurrently
npm run dev:full
```

Open `http://localhost:3000` in your web browser.

---

### 2. Docker Compose Deployment (PostgreSQL + pgvector + Redis + App)

To launch the complete production stack (PostgreSQL with `pgvector`, Redis cache/queue, Express backend, and Vite frontend):

```bash
docker-compose up -d
```

---

## 📂 Project Structure

```
campaign-engine/
├── server/                   # Express Backend Server (Port 5000)
│   ├── index.js              # Server entry point & API middleware
│   ├── db/                   # PostgreSQL schema.sql & pg.Pool client
│   ├── middleware/           # authTenant.js (JWT) & usageMeter.js (Credit quota)
│   ├── routes/               # auth, billing, onboarding, brand, campaign, assets, integrations, analytics
│   └── services/             # aiOrchestrator.js LLM call manager
├── src/                      # Vite React Frontend App (Port 3000)
│   ├── components/
│   │   ├── landing/          # Public SaaS Landing Page (Hero, Demo, Pricing)
│   │   ├── onboarding/       # Client Onboarding Wizard
│   │   ├── planning/         # Strategic Context & Campaign Planner
│   │   ├── assets/           # Multi-Format Creative Studio
│   │   ├── workflow/         # Agentic Approval Kanban Pipeline
│   │   ├── integrations/     # Integration Hub & MCP Console
│   │   ├── analytics/        # Unified Performance & AI Insights Dashboard
│   │   ├── workspace/        # Team Seats & Stripe Billing Manager
│   │   └── layout/           # Navbar & Navigation
│   ├── services/             # Frontend REST API clients
│   ├── styles/               # index.css (Tailwind v4 Light & Dark mode tokens)
│   └── App.tsx               # Main Application Orchestrator
├── Dockerfile                # Multi-stage Docker container build
├── docker-compose.yml        # Docker Compose setup (Postgres + pgvector + Redis + App)
├── ARCHITECTURE.md           # System Architecture & Component Specification
├── SAAS_ARCHITECTURE.md      # SaaS Transformation & Billing Blueprint
└── package.json
```

---

## 📡 API Endpoints Reference

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/health` | `GET` | Health check endpoint |
| `/api/auth/register` | `POST` | Register client organization & owner account |
| `/api/auth/login` | `POST` | User login & JWT token generation |
| `/api/billing/subscription` | `GET` | Retrieve subscription plan & remaining credit balance |
| `/api/billing/checkout` | `POST` | Initialize Stripe Checkout session |
| `/api/onboarding/ingest` | `POST` | Scrape product URL & index brand vector memory |
| `/api/brand` | `GET / PUT` | Retrieve or update brand context rules |
| `/api/campaigns/plan` | `POST` | Synthesize strategic campaign brief (10 credits) |
| `/api/assets/generate` | `POST` | Generate multi-format asset package (25 credits) |
| `/api/assets/audit` | `POST` | Run AI compliance audit on asset text |
| `/api/integrations/channels` | `GET` | Get channel API connection statuses |
| `/api/integrations/mcp` | `POST` | Model Context Protocol JSON-RPC handler |
| `/api/analytics/metrics` | `GET` | Get cross-channel performance analytics |
| `/api/analytics/apply-insight` | `POST` | Execute 1-click AI budget optimization |

---

## 📚 Documentation Links

- [ARCHITECTURE.md](file:///home/pankajpandey/workspace/campaign-engine/ARCHITECTURE.md) - Deep-dive System Design & Ordinary LLM Comparison Matrix.
- [SAAS_ARCHITECTURE.md](file:///home/pankajpandey/workspace/campaign-engine/SAAS_ARCHITECTURE.md) - Multi-Tenancy, Row Level Security, and Stripe Billing Guide.

---

## 📄 License

MIT License. Built for high-velocity enterprise marketing and platform teams.
