# WeirdBites

> Modern e-commerce platform built with Next.js, TypeScript, and PostgreSQL

## Project Vision

WeirdBites is a full-stack e-commerce application for discovering and purchasing unusual snacks. This **educational project** demonstrates professional software engineering practices including BDD/TDD, comprehensive multi-level testing, CI/CD automation, and adherence to quality standards at every phase of development.

**Purpose**: Portfolio project showcasing mastery of SDLC/STLC best practices for a QA Engineering role.

## 📚 Documentation Reading Guide

This project follows professional requirements engineering practices (Module 01). **New to the project? Start here**:

### 🚀 Quick Start (30 Minutes)

**Just want to get started?**

1. **[Project Kickoff Checklist](docs/9.project-kickoff-checklist.md)** (10 min) - Simple "what do I need?" checklist
2. **[CLAUDE.md](CLAUDE.md)** (5 min) - Project purpose and phases
3. **[MVP Definition](docs/3.mvp-definition.md)** - Section 2.1 only (15 min) - What we're building

Then follow the kickoff checklist to set up your environment!

---

### 📖 Full Documentation Path

**For comprehensive understanding, read in this order**:

#### Phase 1: Understanding the Project

0. **[Documentation Guide](docs/0.documentation-guide.md)** - How to navigate all docs (20 min)
1. **[CLAUDE.md](CLAUDE.md)** - Project context, educational goals (10 min)
2. **[Business Requirements](docs/1.business-requirements.md)** - Business context, stakeholders, scope (25 min)
3. **[User Personas](docs/2.personas.md)** - Target users and their needs (15 min)

#### Phase 2: Defining the MVP

4. **[MVP Definition](docs/3.mvp-definition.md)** - What we're building, MoSCoW prioritization (30 min)
5. **[Non-Functional Requirements](docs/4.non-functional-requirements.md)** - Performance, security, accessibility (20 min)

#### Phase 3: Planning Development

6. **[Product Backlog](docs/5.product-backlog.md)** - All user stories with acceptance criteria (30 min)
7. **[Vertical Slices](docs/6.vertical-slices.md)** - 7 incremental delivery slices (30 min)
8. **[Definition of Ready](docs/7.definition-of-ready.md)** - Checklist before starting any story (15 min)

#### Phase 4: Getting Started

9. **[Project Setup (Slice 0)](docs/8.project-setup.md)** - Infrastructure setup before coding (3-5 days)
10. **[Metrics Tracking Plan](docs/10.metrics-tracking-plan.md)** - Dashboard and metrics collection strategy (20 min)
11. **[Project Kickoff Checklist](docs/9.project-kickoff-checklist.md)** - Simple kickoff guide (10 min)

**Total reading time**: ~3 hours (core documents)

### Quick Reference Paths

- **For new developers**: Read 0, 9, 3, 6, 8 (start coding)
- **For QA engineers**: Read 0, 1, 4, 5, 7 (start testing)
- **For stakeholders**: Read 1, 2, 3 (understand scope)
- **Looking for a specific feature?** Check [Product Backlog](docs/5.product-backlog.md)

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

- Node.js 18+ (LTS recommended)
- pnpm 8+
- PostgreSQL 14+ (or Supabase/Neon account)
- Git 2.13+

### Clone the Repository

**Important**: This repository uses Git submodules for documentation and quality standards.

#### New Clone (Recommended)

Clone the repository with all submodules:

```bash
git clone --recurse-submodules https://github.com/antoniogomezgallardo/WeirdBites.git
cd WeirdBites
```

#### Existing Clone

If you already cloned the repository without submodules, initialize them:

```bash
git submodule update --init --recursive
```

#### Update Submodules

To pull the latest changes from submodules:

```bash
git submodule update --remote --merge
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
│   ├── quality-standards/                  # Git submodule - Quality standards (16 modules)
│   ├── 0.documentation-guide.md            # ✅ How to navigate documentation
│   ├── 1.business-requirements.md          # ✅ Business context, stakeholders, scope
│   ├── 2.personas.md                       # ✅ User personas (4 types)
│   ├── 3.mvp-definition.md                 # ✅ MVP scope, MoSCoW, acceptance criteria
│   ├── 4.non-functional-requirements.md    # ✅ Performance, security, accessibility
│   ├── 5.product-backlog.md                # ✅ 35 user stories with Given-When-Then
│   ├── 6.vertical-slices.md                # ✅ 7 delivery increments
│   ├── 7.definition-of-ready.md            # ✅ Story readiness checklist
│   ├── 8.project-setup.md                  # ✅ Slice 0 infrastructure setup
│   ├── 9.project-kickoff-checklist.md      # ✅ Simple "what do I need?" guide
│   └── 10.metrics-tracking-plan.md         # ✅ Dashboard and metrics collection strategy
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

**Next Phase**: Begin Development (Slice 1: Browse Products)

### Completed Deliverables ✅

- ✅ **Documentation Guide** (500+ lines) - Navigation and concepts
- ✅ **Business Requirements Document** (700+ lines, IEEE 830 inspired, with Quality Framework & Policy)
- ✅ **User Personas** (4 personas with goals, behaviors, scenarios)
- ✅ **MVP Definition** (MoSCoW prioritization, 7 vertical slices)
- ✅ **Non-Functional Requirements** (Performance, security, accessibility targets)
- ✅ **Product Backlog** (35 MVP user stories, 135 story points)
- ✅ **Vertical Slices Plan** (7 increments, 10-12 week timeline)
- ✅ **Definition of Ready** (10-point checklist)
- ✅ **Project Setup Guide** (Slice 0 - Infrastructure setup)
- ✅ **Metrics Tracking Plan** (Dashboard, collection strategy, tooling)
- ✅ **Project Kickoff Checklist** (Simple "what do I need?" guide)
- ✅ **Claude Agent Configuration** (QA documentation expert)

**Total**: ~5,500+ lines of professional requirements documentation

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

| Slice | Name | Duration | Story Points | Status |
|-------|------|----------|--------------|--------|
| 0 | **Project Setup** (Infrastructure) | 3-5 days | 15 | 📋 **Ready to Start** |
| 1 | Browse Products | 2 weeks | 13 | ⏳ Planned |
| 2 | Shopping Cart | 1 week | 13 | ⏳ Planned |
| 3 | Guest Checkout | 2 weeks | 19 | ⏳ Planned |
| 4 | User Accounts | 1 week | 16 | ⏳ Planned |
| 5 | Registered Checkout & History | 1 week | 11 | ⏳ Planned |
| 6 | Search & Reviews | 1 week | 13 | ⏳ Planned |
| 7 | Admin Panel | 2 weeks | 50 | ⏳ Planned |

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

*Built with ❤️ following professional SDLC/STLC best practices*
