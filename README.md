# WeirdBites

> Modern e-commerce platform built with Next.js, TypeScript, and PostgreSQL

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
├── 09-metrics-monitoring/              # Metrics tracking plan (1 doc)
├── 12-governance/                      # Change management (1 doc)
├── 14-continuous-improvement/          # Testing maturity (1 doc)
├── design/wireframes/                  # UI wireframes
├── setup/                              # Project setup (Slice 0)
└── quality-standards/                  # Git submodule (16 modules)
```

**Total**: 18 documents across 6 modules (~15,000 lines)

**Browse by module**:

- [Module 00: Foundations](docs/00-foundations/) - Quality frameworks and models
- [Module 01: Requirements](docs/01-requirements/) - What we're building
- [Module 02: Agile Planning](docs/02-agile-planning/) - How we plan and execute
- [Module 09: Metrics & Monitoring](docs/09-metrics-monitoring/) - Metrics collection
- [Module 12: Governance](docs/12-governance/) - Change management
- [Module 14: Continuous Improvement](docs/14-continuous-improvement/) - Testing maturity

Each module folder contains a README.md with document list and navigation

## Technology Stack

- **Frontend**: Next.js 14+ with React and TypeScript
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
# Install all npm packages (408 packages)
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
- And all their dependencies (408 packages)

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

# 3. Generate Prisma client
pnpm db:generate

# 4. Push schema to database (development)
pnpm db:push

# OR create a migration (production approach)
pnpm db:migrate
```

**Free PostgreSQL Options**:

- **Supabase**: [https://supabase.com](https://supabase.com) (500 MB free)
- **Neon**: [https://neon.tech](https://neon.tech) (3 GB free)
- **Local PostgreSQL**: Install PostgreSQL 14+ locally

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
pnpm db:generate  # Generate Prisma client from schema
pnpm db:push      # Push schema changes to database (development)
pnpm db:migrate   # Create and apply migrations (production)
pnpm db:studio    # Open Prisma Studio (database GUI)
pnpm db:seed      # Run database seed script (coming in IS-006)

# Testing (Coming in IS-005)
pnpm test         # Run all tests
pnpm test:unit    # Run unit tests
pnpm test:e2e     # Run E2E tests
pnpm test:watch   # Run tests in watch mode
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
│   ├── 00-foundations/                     # Module 00: Quality frameworks
│   │   ├── README.md                       # Module overview
│   │   ├── quality-framework.md            # ✅ Scrumban, sprint structure, quality policy
│   │   └── iso-25010-mapping.md            # ✅ Quality characteristics mapping
│   ├── 01-requirements/                    # Module 01: Requirements engineering
│   │   ├── README.md                       # Module overview
│   │   ├── business-requirements.md        # ✅ BRD, business context, scope
│   │   ├── personas.md                     # ✅ User personas (4 types)
│   │   ├── mvp-definition.md               # ✅ MVP scope, MoSCoW
│   │   ├── non-functional-requirements.md  # ✅ Performance, security, accessibility
│   │   ├── product-backlog.md              # ✅ 35 user stories with Given-When-Then
│   │   ├── vertical-slices.md              # ✅ 7 delivery increments
│   │   └── prioritization-rationale.md     # ✅ MoSCoW framework and decision rationale
│   ├── 02-agile-planning/                  # Module 02: Agile planning
│   │   ├── README.md                       # Module overview
│   │   ├── definition-of-ready.md          # ✅ Story readiness checklist
│   │   ├── sprint-cadence.md               # ✅ Weekly sprint rhythm and ceremonies
│   │   ├── backlog-refinement.md           # ✅ Story refinement process
│   │   ├── velocity-tracking.md            # ✅ Velocity calculation and forecasting
│   │   └── templates/                      # Sprint templates
│   │       ├── sprint-planning.md          # ✅ Sprint planning guide
│   │       └── sprint-retrospective.md     # ✅ Retrospective formats
│   ├── 09-metrics-monitoring/              # Module 09: Metrics & monitoring
│   │   ├── README.md                       # Module overview
│   │   └── metrics-tracking-plan.md        # ✅ Dashboard and metrics collection
│   ├── 12-governance/                      # Module 12: Governance
│   │   ├── README.md                       # Module overview
│   │   └── change-management.md            # ✅ Change request process
│   ├── 14-continuous-improvement/          # Module 14: Continuous improvement
│   │   ├── README.md                       # Module overview
│   │   └── testing-maturity-assessment.md  # ✅ Testing maturity roadmap (Level 0 → 3)
│   ├── design/                             # Design artifacts
│   │   └── wireframes/
│   │       └── slice-1-wireframes.md       # ✅ Desktop & mobile wireframes for Slice 1
│   ├── setup/                              # Project-specific setup
│   │   └── project-setup.md                # ✅ Slice 0 infrastructure setup
│   └── quality-standards/                  # Git submodule - Quality standards (16 modules)
├── src/                                    # Application source code (to be created)
├── tests/                                  # Test suites (to be created)
│   ├── unit/                               # Jest - 70% of tests
│   ├── integration/                        # API/DB tests - 20% of tests
│   ├── e2e/                                # Playwright - 10% of tests
│   ├── contract/                           # Pact - consumer/provider
│   └── performance/                        # k6, Artillery
├── .claude/                                # Claude agent configuration
│   ├── commands/                           # Custom slash commands
│   │   ├── qa-guide.md                    # Query quality standards
│   │   ├── phase-requirements.md          # Module 01 guidance
│   │   ├── phase-testing.md               # Module 04-05 guidance
│   │   └── phase-cicd.md                  # Module 08 guidance
│   └── settings.json                      # Agent behavior config
├── .github/                                # GitHub Actions workflows (to be created)
├── CLAUDE.md                               # Project instructions for Claude
└── README.md                               # This file
```

## Current Status

**Phase**: Requirements Engineering (Module 01) - ✅ **COMPLETED**

**Current Phase**: Slice 0 - Project Setup (3-5 days, 17 story points) 🚧 **IN PROGRESS**

- ✅ IS-001: Next.js 15 + TypeScript + Tailwind initialized (2 pts)
- ✅ IS-002: ESLint and Prettier configured (1 pt)
- ✅ IS-003: PostgreSQL with Prisma ORM setup (3 pts)
- 🚧 IS-004-IS-009: Pending (11 pts remaining)

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

This project follows a Git Flow-inspired branching strategy:

- `main` - Production-ready code
- `develop` - Integration branch (to be created)
- `staging` - Pre-production testing (to be created)
- `feature/*` - New features
- `bugfix/*` - Bug fixes
- `hotfix/*` - Critical production fixes

## Development Phases (Vertical Slices)

| Slice | Name                               | Duration | Story Points | Status                           |
| ----- | ---------------------------------- | -------- | ------------ | -------------------------------- |
| 0     | **Project Setup** (Infrastructure) | 3-5 days | 17           | 🚧 **In Progress** (3/9 stories) |
| 1     | Browse Products                    | 2 weeks  | 13           | ⏳ Planned                       |
| 2     | Shopping Cart                      | 1 week   | 13           | ⏳ Planned                       |
| 3     | Guest Checkout                     | 2 weeks  | 19           | ⏳ Planned                       |
| 4     | User Accounts                      | 1 week   | 16           | ⏳ Planned                       |
| 5     | Registered Checkout & History      | 1 week   | 11           | ⏳ Planned                       |
| 6     | Search & Reviews                   | 1 week   | 13           | ⏳ Planned                       |
| 7     | Admin Panel                        | 2 weeks  | 50           | ⏳ Planned                       |

**Total**: 11-13 weeks | 150 story points

See [Project Setup](docs/8.project-setup.md) for Slice 0 details and [Vertical Slices](docs/6.vertical-slices.md) for Slices 1-7 breakdown.

## Contributing

Contributions welcome! This project follows strict quality standards:

1. Read the [Quality Standards](docs/quality-standards/) documentation
2. Check [Product Backlog](docs/product-backlog.md) for available stories
3. Ensure story meets [Definition of Ready](docs/definition-of-ready.md)
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
