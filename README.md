# WeirdBites

> Modern e-commerce platform built with Next.js, TypeScript, and PostgreSQL

**Version**: 1.3.0 (Latest - US-001 complete milestone)
**Last Updated**: 2025-10-30
**Current Phase**: Deployment Increment 1 - Browse Products 🟡 **IN PROGRESS** (5/13 pts, 38%)
**Latest Milestone**: US-001 (Browse Products - Basic) ✅ **COMPLETE** (all 3 slices, 5/5 points)
**Next Milestone**: US-002 (Product Details) or US-003 (Category Filter)

## Project Vision

WeirdBites is a full-stack e-commerce application for discovering and purchasing unusual snacks. This **educational project** demonstrates professional software engineering practices including BDD/TDD, comprehensive multi-level testing, CI/CD automation, and adherence to quality standards at every phase of development.

**Purpose**: Portfolio project showcasing mastery of SDLC/STLC best practices for a QA Engineering role.

## 📚 Documentation Reading Guide

This project follows professional requirements engineering practices aligned with [quality-standards](docs/quality-standards/) modules 00-16.

### 🚀 **START HERE**: [docs/START-HERE.md](docs/START-HERE.md)

**Single entry point** for all WeirdBites documentation with:

- Quick start guide (30 minutes)
- Role-specific reading paths (Developer, QA, Stakeholder)
- Module overview and navigation
- Key concepts explained
- Before-you-code checklist

**Quick paths from START-HERE**:

- **New developers**: 3-hour reading path + Slice 0 setup → Start coding
- **QA engineers**: 2.5-hour reading path → Start testing
- **Stakeholders**: 2-hour reading path → Understand scope

---

### 🗂️ Documentation Structure

Documentation is organized into **module folders** aligned with quality-standards:

```
docs/
├── START-HERE.md                       # ← Single entry point
├── 00-foundations/                     # Quality framework, ISO 25010 (2 docs)
├── 01-requirements/                    # BRD, Personas, MVP, NFRs, Backlog (7 docs)
├── 02-agile-planning/                  # DoR, Sprint cadence, Velocity (4 docs + templates)
├── 03-version-control/                 # TBD, Security, Commits, Code Review (9 docs) [COMPLETE]
├── 09-metrics-monitoring/              # Metrics tracking plan (1 doc)
├── 12-governance/                      # Change management (1 doc)
├── 14-continuous-improvement/          # Testing maturity (1 doc)
├── design/wireframes/                  # UI wireframes
├── setup/                              # Project setup, Branch protection, Releases (4 docs)
└── quality-standards/                  # Git submodule (16 modules)
```

**Total**: 24+ documents across 7 modules (~18,000+ lines)

**Browse by module**:

- [Module 00: Foundations](docs/00-foundations/) - Quality frameworks and models
- [Module 01: Requirements](docs/01-requirements/) - What we're building
- [Module 02: Agile Planning](docs/02-agile-planning/) - How we plan and execute
- [Module 03: Version Control](docs/03-version-control/) - TBD workflow, security, commit standards **[NEW]**
- [Module 09: Metrics & Monitoring](docs/09-metrics-monitoring/) - Metrics collection
- [Module 12: Governance](docs/12-governance/) - Change management
- [Module 14: Continuous Improvement](docs/14-continuous-improvement/) - Testing maturity

Each module folder contains a README.md with document list and navigation

## Technology Stack

- **Frontend**: Next.js 15+ with React and TypeScript
- **Backend**: Next.js API Routes / Node.js with TypeScript
- **Database**: PostgreSQL (Supabase/Neon free tier)
- **Package Manager**: pnpm
- **Testing**:
  - Unit & Integration: Jest
  - E2E: Playwright
  - Contract: Pact
  - Performance: k6 / Artillery
  - Accessibility: axe-core
- **CI/CD**: GitHub Actions
- **Version Control**: Git with GitHub
- **Hosting**: Vercel (free tier)
- **Payment**: Stripe Test Mode (simulated)

## Getting Started

### Prerequisites

- **Node.js** 18+ (we're using v20.18.0)
- **pnpm** 10+ (we're using v10.16.0)
- **PostgreSQL** 14+ (or Supabase/Neon account) - _Not yet required in Slice 0_
- **Git** 2.13+

### Installation & Setup

#### 1. Clone the Repository

**Important**: This repository uses Git submodules for documentation and quality standards.

```bash
# Clone with all submodules (recommended)
git clone --recurse-submodules https://github.com/antoniogomezgallardo/WeirdBites.git
cd WeirdBites

# OR if already cloned without submodules
git submodule update --init --recursive
```

#### 2. Install Dependencies

```bash
# Install all npm packages (670+ packages)
pnpm install
```

This installs:

- Next.js 15.5.6
- React 19.2.0
- TypeScript 5.9.3
- Tailwind CSS 3.4.18
- ESLint 9.38.0
- Prettier 3.6.2
- Prisma 6.18.0
- Jest 30.2.0 + Testing Library
- Playwright 1.56.1
- And all their dependencies (670+ packages)

#### 3. Run the Development Server

```bash
# Start the Next.js development server
pnpm dev
```

The app will be available at:

- **Local**: [http://localhost:3000](http://localhost:3000)
- **Network**: http://192.168.x.x:3000

**You should see**: WeirdBites welcome page with orange branding

#### 4. Setup Database (Optional for Slice 0)

**Note**: Database setup is optional during Slice 0. You can skip this step and continue with verification.

If you want to set up the database now:

```bash
# 1. Copy .env.example to .env
cp .env.example .env

# 2. Update DATABASE_URL in .env with your PostgreSQL connection string
# Examples provided in .env.example for local PostgreSQL, Supabase, or Neon

# 3. Run migrations (creates tables)
pnpm prisma migrate dev

# 4. Seed database with test data
pnpm db:seed
```

**Important**: Always use migrations (`prisma migrate dev`), never `db:push` in shared environments.

**⚠️ CRITICAL - Dual Database Setup**:
WeirdBites uses **two separate databases**:

- **Local/Development**: Your `.env` database (for dev/testing)
- **Production**: Vercel's production database (separate instance)

To seed **production** database:

```bash
vercel env pull .env.production --environment=production
DATABASE_URL="$(grep DATABASE_URL .env.production | cut -d'=' -f2 | tr -d '\"' | tr -d '\n')" pnpm prisma db seed
```

See [Database Operations Guide](docs/setup/database-operations.md) for complete details.

**Free PostgreSQL Options**:

- **Supabase**: [https://supabase.com](https://supabase.com) (500 MB free)
- **Neon**: [https://neon.tech](https://neon.tech) (3 GB free)
- **Local PostgreSQL**: Install PostgreSQL 14+ locally

**Viewing Your Database**:

Once you've connected to a database, you can view and manage it using Prisma Studio:

```bash
pnpm db:studio
```

This opens a visual database browser at `http://localhost:5555` where you can:

- View all tables (currently: Products table)
- Add, edit, and delete records
- Browse table relationships
- Query data visually

**Current Database Schema**:

- **Product Table**: id, name, description, price, imageUrl, category, origin, stock, createdAt, updatedAt

#### 5. Verify Installation

```bash
# Check for TypeScript errors
pnpm tsc

# Run linter
pnpm lint

# Check code formatting
pnpm format:check

# All should pass with no errors ✅
```

### Available Commands

```bash
# Development
pnpm dev          # Start development server (localhost:3000)
pnpm build        # Build for production
pnpm start        # Start production server

# Code Quality
pnpm lint         # Run ESLint
pnpm lint:fix     # Run ESLint and auto-fix issues
pnpm format       # Format all files with Prettier
pnpm format:check # Check if files are formatted correctly
pnpm tsc          # TypeScript type checking (noEmit)

# Database (Prisma)
pnpm prisma migrate dev     # Create and apply migration (development)
pnpm prisma migrate deploy  # Apply migrations (production/CI)
pnpm db:generate            # Generate Prisma client from schema
pnpm db:studio              # Open Prisma Studio (database GUI)
pnpm db:seed                # Seed database with test data

# API Health Check
# Visit http://localhost:3000/api/health to check API and database status

# Testing
pnpm test              # Run Jest unit/integration tests
pnpm test:watch        # Run Jest tests in watch mode
pnpm test:coverage     # Run Jest tests with coverage report
pnpm test:e2e          # Run Playwright E2E tests
pnpm test:e2e:ui       # Run Playwright E2E tests with UI
pnpm test:e2e:headed   # Run Playwright E2E tests in headed mode
```

### Troubleshooting

**Issue**: `pnpm: command not found`

```bash
# Install pnpm globally
npm install -g pnpm
```

**Issue**: Port 3000 already in use

```bash
# Kill process on port 3000
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill -9
```

**Issue**: Module not found errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

## Feature Flags

This project uses **feature flags** to support Trunk-Based Development (TBD), allowing safe deployment of incomplete features to production.

### Why Feature Flags?

- **Deploy incomplete features safely** - Features hidden behind flags can be deployed to production without affecting users
- **Toggle features without redeployment** - Change feature visibility by updating configuration
- **Test in production** - Gradually roll out features to real users
- **Quick rollback** - Instantly disable problematic features without code changes
- **Support TBD workflow** - Commit to main frequently with work-in-progress features disabled

### How to Use Feature Flags

**In React Components:**

```typescript
import { useFeature } from '@/hooks/useFeature';

function ProductPage() {
  const showFilters = useFeature('productFiltering');

  return (
    <div>
      <ProductList />
      {showFilters && <ProductFilters />}
    </div>
  );
}
```

**Check Multiple Features:**

```typescript
import { useFeatures } from '@/hooks/useFeature';

function ProductPage() {
  const { productFiltering, productPagination } = useFeatures([
    'productFiltering',
    'productPagination',
  ]);

  return (
    <div>
      <ProductList />
      {productFiltering && <ProductFilters />}
      {productPagination && <Pagination />}
    </div>
  );
}
```

**Server-Side (API Routes, Server Components):**

```typescript
import { isEnabled } from '@/lib/features';

export async function GET() {
  if (isEnabled('productFiltering')) {
    // Include filtering logic
  }
  // ...
}
```

### Adding a New Feature Flag

1. **Add flag to configuration** (`src/config/features.ts`):

   ```typescript
   export const features = {
     myNewFeature: false, // Start disabled
     // ...
   };
   ```

2. **Use in component**:

   ```typescript
   const showFeature = useFeature('myNewFeature');
   ```

3. **When feature is complete, set to `true`** in `features.ts`

### Testing with Feature Flags

Mock feature flags in your tests:

```typescript
jest.mock('@/config/features', () => ({
  features: {
    myNewFeature: true, // Override for testing
  },
}));
```

### Available Feature Flags

All feature flags are defined in [src/config/features.ts](src/config/features.ts) and organized by deployment slice:

- **Slice 1**: `productFiltering`, `productPagination`, `productSearch`
- **Slice 2**: `shoppingCart`, `cartPersistence`
- **Slice 3**: `guestCheckout`, `stripePayment`
- **Slice 4**: `userRegistration`, `userLogin`
- **Slice 5**: `orderHistory`, `savedAddresses`
- **Slice 6**: `productReviews`, `advancedSearch`
- **Slice 7**: `adminPanel`, `productManagement`, `inventoryManagement`
- **Experimental**: `darkMode`, `a11yEnhancements`

**Current Status**: All flags are initially set to `false` (features disabled)

See the [Feature Flags Example Component](src/components/FeatureExample.tsx) for usage demonstrations.

## Monitoring & Analytics

This project uses **Vercel Analytics** for basic monitoring and observability in production.

### What's Being Tracked

**Vercel Analytics** automatically tracks:

- **Page Views** - Which pages users visit and how often
- **User Demographics** - Geographic location, device types
- **Performance Metrics** - Core Web Vitals (LCP, FID, CLS)
- **Traffic Sources** - Where users come from (direct, referral, search)

### Accessing the Dashboard

1. **Go to**: https://vercel.com/dashboard
2. **Select** your project (`weird-bites`)
3. **Click** on the **Analytics** tab
4. View real-time and historical data

### What You'll See

- **Real-Time Visitors** - Active users on your site right now
- **Page Views** - Most popular pages
- **Top Referrers** - Traffic sources
- **Web Vitals** - Performance scores (LCP, FID, CLS, TTFB)
- **Geographic Distribution** - Where your users are located

### Privacy & Compliance

- **No cookies** - Vercel Analytics is GDPR/CCPA compliant by default
- **Anonymous** - No personally identifiable information (PII) collected
- **Lightweight** - < 1KB bundle size impact

### Future Enhancements

Planned monitoring improvements:

- **Error Tracking** - Sentry integration (IS-009 future)
- **Custom Events** - Track user actions (button clicks, form submissions)
- **A/B Testing** - Feature flag usage tracking
- **API Monitoring** - Response times, error rates

See [Vercel Analytics Docs](https://vercel.com/docs/analytics) for more information.

## Quality Standards

All development on this project follows the quality standards and best practices documented in the [docs/quality-standards](docs/quality-standards) submodule. **Key modules being applied**:

- **Module 00**: Foundations (ISO/IEC 25010, quality models)
- **Module 01**: Requirements Engineering (this phase - ✅ completed)
- **Module 02**: Agile Planning (Definition of Ready/Done)
- **Module 04-05**: Testing Strategy (test pyramid, 70/20/10 distribution)
- **Module 06**: Quality Attributes (performance, security, accessibility)
- **Module 07**: Development Practices (TDD/BDD, clean code)
- **Module 08**: CI/CD Pipeline (GitHub Actions, quality gates)

## Project Structure

```
WeirdBites/
├── docs/
│   ├── START-HERE.md                       # ✅ Single entry point for all documentation
│   ├── GLOSSARY.md                         # ✅ Key concepts and terminology
│   ├── 00-foundations/                     # ✅ Module 00: Quality frameworks
│   │   ├── README.md
│   │   ├── quality-framework.md
│   │   └── iso-25010-mapping.md
│   ├── 01-requirements/                    # ✅ Module 01: Requirements engineering
│   │   ├── README.md
│   │   ├── business-requirements.md
│   │   ├── personas.md
│   │   ├── mvp-definition.md
│   │   ├── non-functional-requirements.md
│   │   ├── product-backlog.md
│   │   ├── vertical-slices.md
│   │   └── prioritization-rationale.md
│   ├── 02-agile-planning/                  # ✅ Module 02: Agile planning
│   │   ├── README.md
│   │   ├── definition-of-ready.md
│   │   ├── sprint-cadence.md
│   │   ├── backlog-refinement.md
│   │   ├── velocity-tracking.md
│   │   └── templates/
│   │       ├── sprint-planning.md
│   │       └── sprint-retrospective.md
│   ├── api/                                # API documentation (placeholder)
│   ├── architecture/                       # System design docs (placeholder)
│   ├── design/                             # ✅ Design artifacts
│   │   └── wireframes/
│   │       └── slice-1-wireframes.md
│   ├── runbooks/                           # Operational guides (placeholder)
│   ├── setup/                              # ✅ Project-specific setup
│   │   └── project-setup.md
│   └── quality-standards/                  # Git submodule - Quality standards (16 modules)
├── src/                                    # ✅ Application source code
│   ├── app/                                # Next.js App Router
│   │   ├── api/
│   │   │   └── health/
│   │   │       └── route.ts                # ✅ Health check endpoint
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx                        # ✅ Home page
│   ├── components/                         # React components (empty)
│   ├── lib/                                # Utility libraries
│   │   ├── api/
│   │   │   ├── __tests__/
│   │   │   │   └── response.test.ts        # ✅ Unit tests for API utilities
│   │   │   └── response.ts                 # ✅ API response helpers
│   │   └── prisma.ts                       # ✅ Prisma client singleton
│   └── types/                              # TypeScript type definitions
│       └── api.ts                          # ✅ API types
├── tests/                                  # ✅ Test suites
│   └── e2e/                                # ✅ Playwright E2E tests
│       └── home.spec.ts                    # ✅ Home page E2E test
├── .claude/                                # ✅ Claude agent configuration
│   ├── commands/
│   │   ├── qa-guide.md
│   │   ├── phase-requirements.md
│   │   ├── phase-testing.md
│   │   └── phase-cicd.md
│   └── settings.json
├── .github/                                # ✅ GitHub Actions workflows
│   └── workflows/
│       └── ci.yml                          # ✅ CI pipeline with quality gates
├── prisma/                                 # ✅ Prisma schema and migrations
│   └── schema.prisma                       # ✅ Database schema
├── CLAUDE.md                               # Project instructions for Claude
└── README.md                               # This file
```

## Current Status

**Phase**: Requirements Engineering (Module 01) - ✅ **COMPLETED**

**Current Phase**: Slice 0 - Project Setup (3-5 days, 18 story points) ✅ **COMPLETE**

- ✅ IS-001: Next.js 15 + TypeScript + Tailwind initialized (2 pts)
- ✅ IS-002: ESLint and Prettier configured (1 pt)
- ✅ IS-003: PostgreSQL with Prisma ORM setup (3 pts)
- ✅ IS-004: API Routes and health check endpoint (2 pts)
- ✅ IS-005: Testing frameworks configured (Jest + Playwright) (3 pts)
- ✅ IS-006: CI/CD pipeline with GitHub Actions (2 pts)
- ✅ IS-007: Configure deployment to Vercel (2 pts)
- ✅ IS-008: Create development environment documentation (1 pt)
- ✅ IS-009: Set up basic monitoring and error tracking (1 pt)
- ✅ IS-010: Setup Feature Flags System (2 pts)

**Progress**: 10/10 stories completed (18/18 story points - 100%) 🎉

**Next Phase**: Slice 1 - Browse Products (2 weeks, 13 story points)

### Completed Deliverables ✅

**Module 00 - Foundations** (2 docs, ~1,450 lines):

- ✅ **Quality Framework** - Scrumban approach, sprint structure, quality policy
- ✅ **ISO 25010 Quality Mapping** - 8 quality characteristics, 93% coverage

**Module 01 - Requirements** (7 docs, ~4,600 lines):

- ✅ **Business Requirements Document** - Business context, scope, success metrics
- ✅ **User Personas** - 4 personas (Sarah, Marcus, Emma, Antonio)
- ✅ **MVP Definition** - MoSCoW prioritization, 7 vertical slices
- ✅ **Non-Functional Requirements** - Performance, security, accessibility targets
- ✅ **Product Backlog** - 35 user stories, 135 story points
- ✅ **Vertical Slices** - 7 deployment increments with technical details
- ✅ **Prioritization Rationale** - Weighted scoring, decision rationale

**Module 02 - Agile Planning** (4 docs + 2 templates, ~4,960 lines):

- ✅ **Definition of Ready** - 10-point story readiness checklist
- ✅ **Sprint Cadence Guide** - Weekly rhythm, ceremonies
- ✅ **Backlog Refinement Process** - Story refinement, estimation
- ✅ **Velocity Tracking System** - Velocity calculation, forecasting
- ✅ **Sprint Planning Template** - Step-by-step planning guide
- ✅ **Sprint Retrospective Template** - Multiple retrospective formats

**Module 09 - Metrics & Monitoring** (1 doc, ~1,500 lines):

- ✅ **Metrics Tracking Plan** - 8 metrics categories, dashboard design

**Module 12 - Governance** (1 doc, ~1,200 lines):

- ✅ **Change Management Process** - Change request process, impact analysis

**Module 14 - Continuous Improvement** (1 doc, ~1,400 lines):

- ✅ **Testing Maturity Assessment** - Maturity model, roadmap to Level 3

**Design & Wireframes** (~1,300 lines):

- ✅ **Slice 1 Wireframes** - Desktop & mobile wireframes (US-001, US-002, US-003)

**Project Setup** (~1,000 lines):

- ✅ **Project Setup Guide** - Slice 0 infrastructure setup

**Navigation** (~1,000 lines):

- ✅ **START-HERE.md** - Single entry point for all documentation
- ✅ **Module READMEs** - 6 module overview files

**Configuration**:

- ✅ **Claude Agent Configuration** - QA documentation expert

**Total**: 24 files (~15,000+ lines) organized in 6 modules + design + setup

### Metrics Targets (From NFRs)

**Performance**:

- Page Load (LCP): < 2.5s
- API Response (p95): < 500ms
- Lighthouse: > 90

**Quality**:

- Code Coverage: > 80%
- Test Pyramid: 70% unit, 20% integration, 10% E2E
- WCAG 2.1 Level AA compliance
- Zero critical/high security vulnerabilities

**DevOps** (DORA):

- Deployment Frequency: Daily (target)
- Lead Time: < 1 day
- MTTR: < 4 hours
- Change Failure Rate: < 10%

## Development Workflow

This project follows **Trunk-Based Development (TBD)** with Pull Requests:

**Branch Strategy:**

- `main` - Production-ready code, always deployable
- `feature/*` - Short-lived feature branches (< 1-2 days)
- `fix/*` - Bug fixes
- `docs/*` - Documentation updates

**Workflow:**

1. Create feature branch from `main`
2. Make small, incremental commits
3. Open Pull Request to `main`
4. CI automatically runs quality gates
5. Merge after CI passes (and optional review)
6. Delete feature branch immediately
7. `main` auto-deploys to production (IS-007)

**Key Principles:**

- All changes go through Pull Requests (no direct push to `main`)
- Keep branches short-lived (max 1-2 days)
- Commit to `main` frequently (multiple times per day via PRs)
- Use feature flags for incomplete features
- Every commit to `main` is deployable

### CI/CD Pipeline

**Automated Quality Gates** (GitHub Actions):

Every pull request and push to `main` triggers:

1. **Lint** - ESLint code quality checks + Prettier formatting
2. **Type Check** - TypeScript compilation without emit
3. **Unit & Integration Tests** - Jest with coverage reporting
4. **E2E Tests** - Playwright browser tests
5. **Build** - Next.js production build verification

**Quality Gate Requirements**:

- All jobs must pass for PR approval
- Code coverage uploaded to Codecov
- Playwright reports retained for 30 days
- Concurrency control to cancel outdated runs

**Branch Protection Rules** (Manual GitHub Setup Required):

- ✅ Require pull request before merging to `main`
- ✅ Require all status checks to pass (lint, typecheck, test, e2e, build)
- ✅ Require branches to be up to date before merging
- ✅ No force pushes allowed
- ❌ Direct push to `main` blocked

**Deployment Flow** (to be configured in IS-007):

- `feature/*` → PR to `main` → Auto-deploy to production
- Vercel preview deployments for each PR
- Production deploys automatically on merge to `main`

See [.github/workflows/ci.yml](.github/workflows/ci.yml) for full CI configuration.

## Development Phases (Vertical Slices)

| Slice | Name                               | Duration | Story Points | Status                            |
| ----- | ---------------------------------- | -------- | ------------ | --------------------------------- |
| 0     | **Project Setup** (Infrastructure) | 3-5 days | 18           | 🚧 **In Progress** (6/10 stories) |
| 1     | Browse Products                    | 2 weeks  | 13           | ⏳ Planned                        |
| 2     | Shopping Cart                      | 1 week   | 13           | ⏳ Planned                        |
| 3     | Guest Checkout                     | 2 weeks  | 19           | ⏳ Planned                        |
| 4     | User Accounts                      | 1 week   | 16           | ⏳ Planned                        |
| 5     | Registered Checkout & History      | 1 week   | 11           | ⏳ Planned                        |
| 6     | Search & Reviews                   | 1 week   | 13           | ⏳ Planned                        |
| 7     | Admin Panel                        | 2 weeks  | 50           | ⏳ Planned                        |

**Total**: 11-13 weeks | 151 story points

See [Project Setup](docs/setup/project-setup.md) for Slice 0 details and [Vertical Slices](docs/01-requirements/vertical-slices.md) for Slices 1-7 breakdown.

## Contributing

Contributions welcome! This project follows strict quality standards:

1. Read the [Quality Standards](docs/quality-standards/) documentation
2. Check [Product Backlog](docs/01-requirements/product-backlog.md) for available stories
3. Ensure story meets [Definition of Ready](docs/02-agile-planning/definition-of-ready.md)
4. Follow TDD/BDD practices (write tests first!)
5. Maintain >80% code coverage
6. Pass all quality gates (linting, type-checking, tests, accessibility)
7. Submit PR with detailed description

Detailed contribution guidelines will be added as the project evolves.

## License

TBD

---

**Project Start**: October 2025
**Target MVP**: Q4 2025 (flexible, learning-focused)
**Purpose**: Educational portfolio project demonstrating QA engineering excellence

---

_Built with ❤️ following professional SDLC/STLC best practices_
