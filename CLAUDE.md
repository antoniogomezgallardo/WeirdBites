# WeirdBites - Educational E-commerce Quality Engineering Project

## Project Purpose

This is an **educational project** designed to demonstrate mastery of the complete Software Development Life Cycle (SDLC) and Software Testing Life Cycle (STLC) through building a production-quality e-commerce platform called "WeirdBites."

### Why This Project Exists

On November 3rd, I'm starting a new role as a **Quality Assurance Engineer (QAE)** responsible for controlling all processes and best practices within the SDLC and STLC. This project serves as:

1. **Hands-on learning laboratory** - Apply every concept from the quality-standards documentation
2. **Portfolio demonstration** - Showcase understanding of professional QA practices
3. **Reference implementation** - Create a model for how quality should be integrated at every phase
4. **Knowledge validation** - Prove mastery of industry standards and frameworks

## Quality Standards Documentation

The `docs/quality-standards/` directory contains the **complete source of truth** for all quality practices. This documentation is:

- **Comprehensive**: 16 modules covering foundations through cutting-edge agentic workflows
- **Immutable**: The documentation itself will not change during this project
- **Authoritative**: All decisions must reference and align with these standards

### Documentation Structure

```
docs/quality-standards/
├── 00-foundations/          # Software quality models, industry standards
├── 01-requirements/         # Requirements engineering, user stories, acceptance criteria
├── 02-agile-planning/       # DoR, DoD, INVEST criteria, estimation
├── 03-version-control/      # GitFlow, branching strategies
├── 04-testing-strategy/     # Shift-left, shift-right approaches
├── 05-test-levels/          # Unit, integration, E2E, API testing
├── 06-quality-attributes/   # Performance, security, accessibility
├── 07-development-practices/ # Clean code, TDD, BDD, refactoring
├── 08-cicd-pipeline/        # Build, test, deploy automation
├── 09-metrics-monitoring/   # DORA metrics, observability
├── 10-deployment/           # Deployment strategies (blue-green, canary)
├── 11-tools-ecosystem/      # Tool selection and integration
├── 12-governance/           # Quality gates, compliance
├── 13-incident-management/  # Incident response, postmortems
├── 14-continuous-improvement/ # Retrospectives, Kaizen
├── 15-ai-in-quality-assurance/ # AI-powered testing, RAG assistants
└── 16-agentic-workflows/    # Autonomous QA agents, multi-agent systems
```

## Key Concepts - Critical Terminology

### ⚠️ User Stories vs Vertical Slices

**This is a common source of confusion. Please read carefully:**

**Correct Relationship**:

```
User Story → (split into) → Vertical Slices → (grouped into) → Deployment Increment
```

**Key Points**:

- ✅ **Correct**: "US-001 is split into vertical slices for listing, filtering, and pagination"
- ❌ **Incorrect**: "Deployment Increment 1 contains US-001, US-002, US-003"
- **User Story** = Feature requirement describing user value (1-8 story points)
- **Vertical Slice** = Thin, deployable increment created BY SPLITTING a user story across all layers (UI → API → DB)
- **Deployment Increment** = Collection of vertical slices (from multiple split stories) delivered together (10-50 points)

**Why This Matters**:

- Prevents conceptual errors in documentation and planning
- Ensures correct understanding of incremental delivery
- Aligns with industry best practices for vertical slicing

**Reference**: See [docs/GLOSSARY.md](docs/GLOSSARY.md) for comprehensive definitions.

---

## Development Approach: Phase-by-Phase Excellence

We will build WeirdBites **incrementally**, implementing each SDLC/STLC phase with strict adherence to the quality standards:

### Current Phase: **Requirements Engineering** - ✅ COMPLETED

- [x] Repository initialized
- [x] Quality standards documentation integrated as submodule
- [x] Claude agent configured for QA guidance
- [x] Project overview documented
- [x] Development roadmap created
- [x] **24 documents created** (~15,000 lines) organized in module-based structure
- [x] **Module 00 (Foundations)**: Quality framework, ISO 25010 mapping (2 docs)
- [x] **Module 01 (Requirements)**: BRD, Personas, MVP, NFRs, Backlog, Slices, Prioritization (7 docs)
- [x] **Module 02 (Agile Planning)**: DoR, Sprint cadence, Refinement, Velocity + Templates (6 docs)
- [x] **Module 09 (Metrics)**: Metrics tracking plan (1 doc)
- [x] **Module 12 (Governance)**: Change management (1 doc)
- [x] **Module 14 (Continuous Improvement)**: Testing maturity assessment (1 doc)
- [x] **Design**: Slice 1 wireframes (1 doc)
- [x] **Setup**: Project setup guide (1 doc)
- [x] **Navigation**: START-HERE.md + 6 module READMEs (7 docs)
- [x] Documentation aligned with quality-standards module structure (Modules 00-16)

### Next Phase: **Slice 0 - Project Setup** (3-5 days, 18 story points, 10 stories) 📋 In Progress

- [x] IS-001: Initialize Next.js 14+ project with TypeScript (2 pts)
- [x] IS-002: Configure ESLint and Prettier (1 pt)
- [x] IS-003: Set up PostgreSQL database with Prisma ORM (3 pts)
- [x] IS-004: Setup API Routes structure and example endpoint (2 pts)
- [x] IS-005: Configure testing frameworks (Jest, Playwright, axe-core) (3 pts)
- [x] IS-006: Set up CI/CD pipeline (GitHub Actions) (2 pts)
- [ ] IS-007: Configure deployment to Vercel (2 pts)
- [ ] IS-008: Create development environment documentation (1 pt)
- [ ] IS-009: Set up basic monitoring and error tracking (1 pt)
- [ ] IS-010: Setup Feature Flags System (2 pts) **[NEW]**

**Progress**: 6/10 stories complete (67%), ~12/18 points delivered

**Recent Additions**:

- IS-004 adds backend API layer setup with health check endpoint, API utilities, type definitions, and integration testing
- IS-010 adds feature flags system to enable Trunk-Based Development with safe deployment of incomplete features

### Upcoming Phases

**Phase 1: Foundations & Requirements** (Module 00-01) - ✅ COMPLETED

- ✅ Establish quality objectives and metrics
- ✅ Define business requirements for WeirdBites
- ✅ Create user stories with acceptance criteria
- ✅ Validate requirements using DoR checklist
- ✅ Document requirements following industry best practices

**Phase 2: Agile Planning** (Module 02)

- Define Definition of Ready (DoR)
- Define Definition of Done (DoD)
- Estimate user stories using story points
- Create sprint backlog
- Establish team working agreements

**Phase 3: Version Control & Branching** (Module 03)

- Implement GitFlow methodology
- Configure branch protection rules
- Set up pull request templates
- Establish code review checklist
- Configure CI/CD hooks

**Phase 4: Testing Strategy** (Module 04-05)

- Design test pyramid strategy
- Implement shift-left testing approach
- Set up test frameworks (unit, integration, E2E)
- Create test data management strategy
- Establish test coverage targets (>80%)

**Phase 5: Development with Quality** (Module 06-07)

- Implement clean code principles
- Apply SOLID design patterns
- Practice TDD/BDD where appropriate
- Implement accessibility (WCAG 2.1)
- Performance budgets and monitoring

**Phase 6: CI/CD Pipeline** (Module 08)

- Build automated test pipeline
- Configure continuous integration
- Implement automated quality gates
- Set up deployment automation
- Configure notifications and alerts

**Phase 7: Production & Monitoring** (Module 09-10)

- Implement deployment strategies (blue-green or canary)
- Configure observability (logs, metrics, traces)
- Set up DORA metrics dashboard
- Establish SLIs and SLOs
- Create runbooks for common issues

**Phase 8: Governance & Improvement** (Module 11-14)

- Establish quality governance process
- Implement compliance checks
- Set up incident management workflow
- Create retrospective process
- Document lessons learned

**Phase 9: Advanced - AI & Agents** (Module 15-16) _(Optional)_

- Implement AI-assisted test generation
- Build autonomous test maintenance agent
- Create multi-agent code review system
- Deploy self-healing test suite
- Measure agent effectiveness

## Claude Agent Role & Responsibilities

As the AI assistant for this project, Claude acts as a **QA Documentation Expert** and **Quality Mentor**:

### Core Responsibilities

1. **Documentation Authority**
   - Know the quality-standards documentation thoroughly
   - Reference specific modules, templates, and examples when providing guidance
   - Always cite the source (e.g., "According to Module 01: Requirements Engineering...")

2. **Best Practice Enforcement**
   - Ensure all implementations follow documented standards
   - Challenge approaches that deviate from best practices
   - Recommend templates and examples from the documentation

3. **Phase-by-Phase Guidance**
   - Guide through each SDLC/STLC phase systematically
   - Prevent jumping ahead before completing foundational phases
   - Ensure each phase meets its completion criteria

4. **Educational Support**
   - Explain WHY practices matter, not just WHAT to do
   - Reference the Manifesto and Philosophy when discussing principles
   - Connect practices to real-world industry standards (ISO, IEEE, ISTQB, OWASP, etc.)

5. **Template & Tool Provision**
   - Provide templates from the 18 production-ready templates in docs
   - Reference examples from the 19 comprehensive example directories
   - Adapt templates to WeirdBites context

### How to Use Claude Effectively

**Use Slash Commands**:

- `/qa-guide <topic>` - Query the QA documentation for specific topics
- `/phase-requirements` - Get guidance for requirements phase
- `/phase-testing` - Get guidance for testing strategy phase
- `/phase-cicd` - Get guidance for CI/CD pipeline phase

**Ask Phase-Specific Questions**:

- "What does the DoR checklist require for this user story?"
- "What test levels should I implement according to Module 05?"
- "How should I structure my CI/CD pipeline per Module 08?"

**Request Documentation**:

- "Create acceptance criteria following the template in Module 01"
- "Generate a test plan using the IEEE 829 template"
- "Show me the code review checklist from Module 07"

## Quality Commitments

Following the **Code Quality Manifesto**, we commit to:

1. **Quality is Everyone's Responsibility** - Not just QA's job
2. **Prevention over Detection** - Build quality in from the start
3. **Automation over Manual Repetition** - Automate everything automatable
4. **Continuous Improvement over Perfection** - Progress, not paralysis
5. **Data-Driven Decisions over Opinions** - Metrics guide our path
6. **User Value over Technical Excellence** - Users define quality

### The 12 Principles (from Manifesto)

1. Quality starts with clear requirements
2. Testing is continuous, not a phase
3. Every commit should be production-ready
4. Broken builds are team emergencies
5. Technical debt is tracked and managed
6. Code reviews are learning opportunities
7. Documentation is code
8. Monitoring is testing in production
9. Failures are learning opportunities
10. Simplicity is the ultimate sophistication
11. Standards enable creativity
12. The customer defines quality

## Success Metrics

We will measure success using industry-standard metrics:

### DORA Metrics (DevOps Research and Assessment)

- **Deployment Frequency**: Target daily deployments
- **Lead Time for Changes**: < 1 day
- **Mean Time to Recovery (MTTR)**: < 4 hours
- **Change Failure Rate**: < 10%

### Quality Metrics

- **Code Coverage**: > 80%
- **Cyclomatic Complexity**: < 10 per method
- **Technical Debt Ratio**: < 5%
- **Defect Density**: < 1 per 1000 lines of code

### Testing Metrics

- **Test Automation Rate**: > 80%
- **Test Execution Time**: < 10 minutes for full suite
- **Flaky Test Rate**: < 5%
- **Test Coverage by Level**: Unit (70%), Integration (20%), E2E (10%)

## Development Workflow - Trunk-Based Development (TBD)

This project follows **Trunk-Based Development** with Pull Requests as documented in Module 03 (Version Control).

### Complete Workflow: Code to Production

#### **Phase 1: Before You Start Coding**

```bash
# 1. Make sure you're on main and it's up to date
git checkout main
git pull origin main

# 2. Check what you're going to work on
# - Look at product backlog: docs/01-requirements/product-backlog.md
# - Check if story meets Definition of Ready: docs/02-agile-planning/definition-of-ready.md
```

**Checklist:**

- [ ] Story is clear and understood
- [ ] Acceptance criteria defined (Given-When-Then)
- [ ] Story is small enough (< 1-2 days)
- [ ] Dependencies identified
- [ ] Team agreed on approach

#### **Phase 2: Create Feature Branch**

```bash
# 3. Create a feature branch from main
git checkout -b feature/add-product-listing

# Branch naming conventions:
# - feature/description    (new features)
# - fix/description        (bug fixes)
# - docs/description       (documentation)
# - refactor/description   (code improvements)
# - test/description       (test improvements)
```

#### **Phase 3: Develop in Small Increments (TDD)**

```bash
# 4. Write code in SMALL increments
# Follow TDD (Test-Driven Development):

# Step A: Write a failing test
pnpm test:watch  # Keep running in terminal

# Step B: Write minimal code to pass test

# Step C: Refactor if needed

# Step D: Commit when test passes
git add .
git commit -m "test(products): add getProducts unit tests"

# Step E: Repeat - commit multiple times per day
git commit -m "feat(products): implement getProducts function"
git commit -m "refactor(products): optimize database query"
```

**Local Testing Loop:**

```bash
# Terminal 1: Development server
pnpm dev

# Terminal 2: Test watcher
pnpm test:watch

# Before each commit, run:
pnpm lint && pnpm format && pnpm tsc && pnpm test
```

#### **Phase 4: Push Feature Branch**

```bash
# 5. Push feature branch to GitHub
git push origin feature/add-product-listing
```

#### **Phase 5: Create Pull Request**

```bash
# 6. Create PR on GitHub
# Option A: Use GitHub web interface
# - Go to repository and click "Compare & pull request"

# Option B: Use gh CLI
gh pr create --base main --head feature/add-product-listing \
  --title "feat: add product listing page" \
  --body "Implements US-001

## Summary
- Add product listing component
- Implement database query
- Add unit and E2E tests

## Test Plan
- [x] Unit tests pass
- [x] E2E test passes
- [x] Accessibility checked

Closes #1"
```

**What Happens:**

- CI automatically runs 5 quality gates (lint, typecheck, test, e2e, build)
- All must pass before merge
- Vercel creates preview deployment (IS-007)

#### **Phase 6: Code Review (Optional for Solo)**

**If working solo:**

- Review your own PR on GitHub
- Check "Files changed" tab
- Verify tests are comprehensive

**If working with team:**

- Wait for review approval
- Address feedback if needed
- Push new commits (CI re-runs automatically)

#### **Phase 7: Merge to Main**

```bash
# 7. Merge PR on GitHub (recommended)
# - Click "Squash and merge" (clean history)
# - Click "Confirm merge"
# - ✅ Click "Delete branch" (IMPORTANT!)
```

**What Happens:**

- CI runs again on main (safety check)
- Auto-deploys to production (IS-007)
- Code is live! 🚀

#### **Phase 8: Cleanup & Next Task**

```bash
# 8. Clean up locally
git checkout main
git pull origin main  # Get latest with your merged changes
git branch -d feature/add-product-listing  # Delete local branch

# 9. Verify production
# - Visit production URL
# - Test the feature manually
# - Check monitoring/logs (IS-009)

# 10. Ready for next task!
git checkout -b feature/next-task
```

### TBD Key Principles

1. **All changes via Pull Requests** - No direct push to main
2. **Short-lived branches** - Max 1-2 days
3. **Frequent integration** - Multiple PRs per day
4. **Small commits** - Commit 3-5 times per feature branch
5. **Always deployable** - Every commit to main is production-ready
6. **Use feature flags** - For incomplete features
7. **Test-driven** - Write tests first (TDD)

### Quick Reference Cheat Sheet

```bash
# START NEW TASK
git checkout main && git pull origin main
git checkout -b feature/task-name

# DEVELOP (repeat many times)
# Write test → Write code → Pass test
git add . && git commit -m "type(scope): description"

# BEFORE PUSHING
pnpm lint && pnpm format && pnpm tsc && pnpm test

# PUSH & CREATE PR
git push origin feature/task-name
gh pr create --base main --title "feat: task description"

# AFTER MERGE
git checkout main && git pull origin main
git branch -d feature/task-name
```

## Git Workflow

### Commit Guidelines

- **Always commit changes using my configured user**
- Follow conventional commits format: `type(scope): description`
  - Types: feat, fix, docs, test, refactor, ci, chore
  - Example: `feat(auth): add user registration endpoint`
- Reference documentation modules in commit messages
  - Example: `test(payment): add unit tests per Module 05 testing strategy`
- Commit frequently (3-5 times per feature branch)
- Each commit should pass all tests
- Keep commits small and focused (< 100 lines when possible)

### Branch Strategy

- `main` - Production-ready code, always deployable
- `feature/*` - Short-lived feature branches (< 1-2 days)
- `fix/*` - Bug fixes
- `docs/*` - Documentation updates
- `refactor/*` - Code improvements
- `test/*` - Test improvements

### Branch Protection

- ✅ All changes via Pull Requests
- ✅ CI must pass (lint, typecheck, test, e2e, build)
- ✅ Branches up to date before merge
- ❌ No direct push to main
- ❌ No force pushes

### Configuration Management

- When adding content to `.claude/` directory:
  - Update `.claude/settings.json` or `.claude/settings.local.json`
  - Document new commands in this file
  - Maintain configuration consistency

## Project Structure

```
WeirdBites/
├── docs/
│   ├── quality-standards/    # Git submodule - QA documentation
│   ├── architecture/         # System design docs
│   ├── api/                  # API documentation
│   └── runbooks/             # Operational guides
├── src/                      # Application source code
├── tests/
│   ├── unit/                 # Unit tests
│   ├── integration/          # Integration tests
│   ├── e2e/                  # End-to-end tests
│   └── performance/          # Performance tests
├── .claude/
│   ├── commands/             # Custom slash commands
│   └── settings.json         # Claude configuration
├── .github/
│   └── workflows/            # GitHub Actions CI/CD
├── CLAUDE.md                 # This file - project instructions
└── README.md                 # Project overview for external users
```

## References

- **Manifesto**: `docs/quality-standards/MANIFESTO.md`
- **Philosophy**: `docs/quality-standards/PHILOSOPHY.md`
- **Templates**: `docs/quality-standards/templates/`
- **Examples**: `docs/quality-standards/examples/`

## Next Steps

1. Complete project initialization
2. Begin Phase 1: Foundations & Requirements
3. Follow the phase-by-phase roadmap
4. Document learnings and deviations
5. Celebrate milestones and improvements

---

_"Quality is never an accident; it is always the result of intelligent effort." - John Ruskin_

**Last Updated**: 2025-10-24
**Current Phase**: Slice 0 - Project Setup - 🚧 **IN PROGRESS** (6/9 stories, 14/17 pts - 82%)
**Next Milestone**: Complete Slice 0 (3 stories remaining: IS-007, IS-008, IS-009)

**Completed Stories**:

- ✅ IS-001: Next.js 15 + TypeScript + Tailwind (2 pts)
- ✅ IS-002: ESLint and Prettier (1 pt)
- ✅ IS-003: PostgreSQL with Prisma ORM (3 pts)
- ✅ IS-004: API Routes and health check endpoint (2 pts)
- ✅ IS-005: Testing frameworks (Jest + Playwright) (3 pts)
- ✅ IS-006: CI/CD pipeline (GitHub Actions) (3 pts)

**Development Workflow**: Trunk-Based Development (TBD)

- Branch: `main` only (master → main migration complete)
- All changes via Pull Requests
- CI/CD: 5 automated quality gates (lint, typecheck, test, e2e, build)
- See "Development Workflow - Trunk-Based Development" section above
