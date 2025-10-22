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

### Next Phase: **Slice 0 - Project Setup** (3-5 days, 15 story points) 📋 Ready to Start
- Initialize Next.js 14+ project with TypeScript
- Configure ESLint and Prettier
- Set up PostgreSQL database with Prisma ORM
- Configure testing frameworks (Jest, Playwright, axe-core)
- Set up CI/CD pipeline (GitHub Actions)
- Configure deployment to Vercel
- Create development environment documentation
- Set up basic monitoring and error tracking

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

**Phase 9: Advanced - AI & Agents** (Module 15-16) *(Optional)*
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

## Git Workflow

### Commit Guidelines
- **Always commit changes using my configured user**
- Follow conventional commits format: `type(scope): description`
  - Types: feat, fix, docs, test, refactor, ci, chore
  - Example: `feat(auth): add user registration endpoint`
- Reference documentation modules in commit messages
  - Example: `test(payment): add unit tests per Module 05 testing strategy`

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

*"Quality is never an accident; it is always the result of intelligent effort." - John Ruskin*

**Last Updated**: 2025-10-19
**Current Phase**: Requirements Engineering - ✅ COMPLETED
**Next Milestone**: Complete Slice 0 - Project Setup (Infrastructure)

**Documentation Deliverables**: 10 documents (~4,000+ lines)
- 0. Documentation Guide
- 1. Business Requirements
- 2. User Personas
- 3. MVP Definition
- 4. Non-Functional Requirements
- 5. Product Backlog (35 stories)
- 6. Vertical Slices (Slice 0-7)
- 7. Definition of Ready
- 8. Project Setup (Slice 0)
- 9. Project Kickoff Checklist
