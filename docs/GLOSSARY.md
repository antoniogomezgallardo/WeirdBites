# WeirdBites - Glossary of Key Concepts

**Version**: 1.0.0
**Date**: 2025-10-22
**Purpose**: Define key terminology and concepts to ensure consistent understanding
**Audience**: All team members and stakeholders

---

## Critical Relationships

### User Stories vs Vertical Slices

**⚠️ IMPORTANT**: The relationship between User Stories and Vertical Slices is often misunderstood.

**Correct Relationship**:

```
User Story → (split into) → Vertical Slices → (grouped into) → Deployment Increment
```

**Examples**:

- ✅ **Correct**: "US-001 (Browse Products) is split into vertical slices for listing, filtering, and pagination"
- ✅ **Correct**: "We'll implement Slice 1.1 (basic product listing) this sprint, derived from US-001"
- ❌ **Incorrect**: "Deployment Increment 1 contains US-001, US-002, US-003"
- ❌ **Incorrect**: "US-001 is part of Vertical Slice 1"

**Why This Matters**:

- User Stories describe **what** the user wants (feature requirements)
- Vertical Slices describe **how** we incrementally deliver that feature (implementation strategy)
- A single User Story may be split into multiple Vertical Slices for gradual delivery
- Multiple Vertical Slices (from different split stories) may be grouped into a Deployment Increment

---

## Agile & Planning Terms

### User Story

**Definition**: A feature requirement written from the user's perspective describing the value they want to achieve.

**Format**: "As a [user type], I want [goal] so that [benefit]"

**Characteristics**:

- Follows INVEST criteria (Independent, Negotiable, Valuable, Estimable, Small, Testable)
- Estimated in story points (1-8 points typical)
- Contains acceptance criteria in Given-When-Then format
- May be split into multiple vertical slices for delivery

**Example**:

```
US-001: Browse Product Catalog
As a visitor
I want to see a grid of weird snack products
So that I can discover unusual items to purchase

Story Points: 5
Splits Into: Deployment Increment 1
```

---

### Vertical Slice

**Definition**: A thin, end-to-end increment created by splitting a user story across all architectural layers (UI → API → Database) to deliver working functionality incrementally.

**Characteristics**:

- Crosses all layers (Frontend, Backend, Database)
- Independently deployable and testable
- Delivers working, valuable functionality
- Smaller than a full user story (subset of functionality)
- Always derived BY SPLITTING a user story

**Example**:

```
US-001 (Browse Products) splits into:
  → Vertical Slice 1.1: Basic product grid (UI + API + DB)
  → Vertical Slice 1.2: Pagination controls (UI + API + DB)
  → Vertical Slice 1.3: Loading states (UI + API + DB)

Each slice is deployable independently.
```

**Why Vertical?**: Crosses all layers vertically through the architecture, as opposed to "horizontal slices" (e.g., "build all database schemas first").

---

### Deployment Increment

**Definition**: A collection of vertical slices (derived from one or more split user stories) that are grouped together for deployment as a cohesive feature set.

**Characteristics**:

- Aggregates story points from multiple split stories (10-50 points typical)
- Represents a significant, deployable milestone
- Contains all vertical slices needed for a complete feature area
- Planned for 1-2 week delivery cycles

**Example**:

```
Deployment Increment 1: Browse Products (13 points)
  Composed of vertical slices from:
    - US-001 (Browse Catalog) → Slices 1.1, 1.2, 1.3
    - US-002 (View Details) → Slices 2.1, 2.2
    - US-003 (Filter Category) → Slice 3.1
```

**WeirdBites has 7 Deployment Increments** for the MVP.

---

### Story Points

**Definition**: A relative unit of measure for estimating the effort required to implement a user story.

**Characteristics**:

- Relative, not absolute (compare stories to each other)
- Consider complexity, effort, uncertainty, and dependencies
- Use Fibonacci sequence (1, 2, 3, 5, 8, 13, 21, ...)
- 1 point = Very simple task (~2-4 hours)
- 8 points = Complex task approaching sprint capacity limit
- > 8 points = Story should be split

**Important**: Story points represent the ORIGINAL user story estimate. When split into vertical slices, the total points of all slices equal the original story's points.

---

### Epic

**Definition**: A large body of work that can be broken down into multiple user stories.

**Characteristics**:

- Too large to complete in a single sprint (weeks to months)
- Broken down into smaller user stories
- Represents a major feature area or business capability

**WeirdBites Epics**:

1. Product Discovery (5 stories)
2. Shopping Cart (4 stories)
3. Guest Checkout (5 stories)
4. User Accounts (6 stories)
5. Admin Panel (12 stories)

---

### Sprint

**Definition**: A fixed time-box (typically 1-2 weeks) during which a planned set of work is completed.

**WeirdBites Sprint Cadence**:

- Duration: 1 week (Monday-Friday)
- Target velocity: 10-15 story points per sprint
- Sprint 1 = Deployment Increment 1 (Week 1-2)
- Sprint 2 = Deployment Increment 2 (Week 3)
- etc.

---

### Velocity

**Definition**: The amount of work (story points) a team completes in a sprint.

**Calculation**: `Velocity = Sum of story points of completed stories`

**Important**: Only stories meeting Definition of Done count toward velocity.

**WeirdBites Target**: 10-15 points/week (single developer, learning-focused)

---

## Quality & Testing Terms

### Definition of Ready (DoR)

**Definition**: A checklist of criteria that must be met before a user story can be pulled into a sprint for development.

**Key Criteria**:

- User story follows INVEST criteria
- Acceptance criteria defined (Given-When-Then)
- Story points estimated
- Dependencies identified and resolved
- UI mockups created (if needed)
- No blockers

**Purpose**: Ensure stories are well-defined before development starts.

---

### Definition of Done (DoD)

**Definition**: A checklist of criteria that must be met before a user story (or vertical slice) is considered complete.

**Key Criteria**:

- Code implemented and follows style guide
- Unit tests written and passing (≥80% coverage)
- Integration tests passing
- E2E tests passing (critical paths)
- Code reviewed and approved
- No ESLint/TypeScript errors
- Accessibility tested (WCAG 2.1 AA)
- Deployed to staging
- Product Owner accepted

**Purpose**: Ensure consistent quality standards across all work.

---

### Acceptance Criteria

**Definition**: Specific conditions that must be met for a user story to be considered complete and acceptable.

**Format**: Given-When-Then (Gherkin syntax)

**Example**:

```gherkin
Scenario: Homepage displays products
Given I visit the WeirdBites homepage
When the page loads
Then I see a grid of 8-12 products
And each product shows: image, name, price, brief description
```

---

### Test Levels

**Definition**: Different scopes of testing aligned with the test pyramid.

**Levels**:

1. **Unit Tests** (70% of tests)
   - Test individual functions/methods in isolation
   - Fast, reliable, numerous
   - Target: >80% code coverage

2. **Integration Tests** (20% of tests)
   - Test interactions between components/modules
   - API endpoint tests, database integration
   - Moderate speed

3. **End-to-End (E2E) Tests** (10% of tests)
   - Test complete user workflows
   - Playwright for browser automation
   - Slow, brittle, few but critical

4. **Acceptance Tests**
   - Validate acceptance criteria are met
   - Can be manual or automated
   - Business-facing

---

## Architecture & Development Terms

### Layer

**Definition**: A horizontal division of the application architecture by technical responsibility.

**WeirdBites Layers**:

1. **UI Layer (Frontend)**
   - Next.js pages and components
   - User interface, client-side logic
   - Technologies: React, TypeScript, Tailwind CSS

2. **API Layer (Backend)**
   - Next.js API routes
   - Business logic, data validation
   - Technologies: Node.js, TypeScript

3. **Data Layer (Database)**
   - PostgreSQL database
   - Data persistence, queries
   - Technologies: Prisma ORM, PostgreSQL

**Vertical Slices cross ALL layers** (UI → API → DB).

---

### Tech Stack

**Definition**: The collection of technologies used to build the application.

**WeirdBites Stack**:

- **Frontend**: Next.js 14+, React 18+, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Node.js
- **Database**: PostgreSQL, Prisma ORM
- **Testing**: Jest (unit), Playwright (E2E), axe-core (accessibility)
- **CI/CD**: GitHub Actions, Vercel deployment
- **Quality**: ESLint, Prettier, TypeScript strict mode

---

### MoSCoW Prioritization

**Definition**: A prioritization technique categorizing requirements into four categories.

**Categories**:

- **M**ust Have: Critical for MVP (35 stories)
- **S**hould Have: Important but not critical for MVP (12 stories)
- **C**ould Have: Nice to have, low priority (8 stories)
- **W**on't Have: Explicitly out of scope for MVP

**WeirdBites MVP**: All 35 "Must Have" stories delivered across 7 deployment increments.

---

## Quality Standards Modules

### Module 00: Foundations

Quality frameworks, software quality models, ISO 25010 mapping

### Module 01: Requirements Engineering

User stories, acceptance criteria, vertical slicing, prioritization

### Module 02: Agile Planning

DoR, DoD, INVEST criteria, estimation, sprint planning

### Module 03: Version Control

GitFlow methodology, branching strategies, code review

### Module 04: Testing Strategy

Shift-left, shift-right, test pyramid, risk-based testing

### Module 05: Test Levels

Unit, integration, E2E, API, contract, visual regression testing

### Module 06: Quality Attributes

Performance, security, accessibility, scalability testing

### Module 07: Development Practices

Clean code, TDD, BDD, refactoring, design patterns

### Module 08: CI/CD Pipeline

Build automation, continuous integration, deployment automation

### Module 09: Metrics & Monitoring

DORA metrics, code coverage, observability

### Module 10: Deployment

Deployment strategies (blue-green, canary), rollback

### Module 11: Tools Ecosystem

Tool selection, integration, evaluation

### Module 12: Governance

Quality gates, compliance, change management

### Module 13: Incident Management

Incident response, postmortems, root cause analysis

### Module 14: Continuous Improvement

Retrospectives, testing maturity models, Kaizen

### Module 15: AI in Quality Assurance

AI-assisted testing, test generation, predictive analytics

### Module 16: Agentic Workflows

Autonomous QA agents, multi-agent systems, self-healing tests

---

## Common Acronyms

- **AC**: Acceptance Criteria
- **BDD**: Behavior-Driven Development
- **BRD**: Business Requirements Document
- **CD**: Continuous Delivery/Deployment
- **CI**: Continuous Integration
- **CRUD**: Create, Read, Update, Delete
- **DoD**: Definition of Done
- **DoR**: Definition of Ready
- **E2E**: End-to-End (testing)
- **MVP**: Minimum Viable Product
- **NFR**: Non-Functional Requirement
- **ORM**: Object-Relational Mapping
- **QA**: Quality Assurance
- **QAE**: Quality Assurance Engineer
- **SDLC**: Software Development Life Cycle
- **SSR**: Server-Side Rendering
- **STLC**: Software Testing Life Cycle
- **TDD**: Test-Driven Development
- **UI/UX**: User Interface / User Experience
- **US**: User Story
- **WCAG**: Web Content Accessibility Guidelines

---

## Visual Reference

### Relationship Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         EPIC                                │
│                    (Major Feature Area)                     │
│                    e.g., "Product Discovery"                │
└────────────────────────┬────────────────────────────────────┘
                         │ breaks down into
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                     USER STORIES                            │
│               (Feature Requirements)                        │
│     US-001, US-002, US-003 (5 pts, 5 pts, 3 pts)          │
└────────────────────────┬────────────────────────────────────┘
                         │ split into
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   VERTICAL SLICES                           │
│            (Incremental Implementation)                     │
│  Slice 1.1, Slice 1.2, Slice 2.1, Slice 2.2, Slice 3.1    │
│  (Each crosses UI → API → DB layers)                        │
└────────────────────────┬────────────────────────────────────┘
                         │ grouped into
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                 DEPLOYMENT INCREMENT                        │
│               (Release to Production)                       │
│         Increment 1: "Browse Products" (13 pts)             │
│     Contains all slices from US-001, US-002, US-003        │
└─────────────────────────────────────────────────────────────┘
```

### Vertical vs Horizontal Slicing

```
❌ HORIZONTAL (Anti-Pattern):
Sprint 1: Database schema for all features
Sprint 2: All API endpoints
Sprint 3: All UI components
Sprint 4: Integration (value only here!)

✅ VERTICAL (Best Practice):
Sprint 1: Browse Products (DB + API + UI) → Delivers value!
Sprint 2: Shopping Cart (DB + API + UI) → Delivers value!
Sprint 3: Checkout (DB + API + UI) → Delivers value!
```

---

## Document Control

**Version History**:

| Version | Date       | Author                 | Changes                                                                       |
| ------- | ---------- | ---------------------- | ----------------------------------------------------------------------------- |
| 1.0.0   | 2025-10-22 | Antonio Gomez Gallardo | Initial glossary created to prevent User Stories vs Vertical Slices confusion |

**Related Documents**:

- [CLAUDE.md](../CLAUDE.md) - Project instructions
- [vertical-slices.md](01-requirements/vertical-slices.md) - Vertical slicing implementation
- [product-backlog.md](01-requirements/product-backlog.md) - User stories
- [START-HERE.md](START-HERE.md) - Documentation navigation

---

_This glossary serves as the authoritative reference for all WeirdBites terminology. When in doubt, refer here to ensure consistent understanding across all documentation and communication._
