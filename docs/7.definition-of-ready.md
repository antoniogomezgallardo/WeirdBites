# WeirdBites - Definition of Ready (DoR)

**Version**: 1.0.0
**Date**: 2025-10-19
**Purpose**: Ensure user stories are ready for development before entering a sprint
**Reference**: Module 02 - Agile Planning

---

## Overview

The **Definition of Ready (DoR)** is a checklist that ensures user stories are sufficiently detailed, understood, and unblocked before development begins. Stories that don't meet DoR should not enter a sprint.

**Benefits**:
- ✅ Prevents starting work on unclear requirements
- ✅ Reduces mid-sprint surprises and blockers
- ✅ Improves estimation accuracy
- ✅ Ensures team alignment
- ✅ Reduces waste and rework

---

## Definition of Ready Checklist

A user story is **ready for development** when ALL of the following are true:

### 1. Story Structure

- [ ] **User story format**: Follows "As a [user], I want [goal], so that [benefit]" template
- [ ] **Title**: Clear, concise, describes the feature (e.g., "Browse Product Catalog")
- [ ] **Description**: Provides context about why this story matters
- [ ] **Value statement**: Clearly articulates business or user value

**Example**:
```markdown
✅ GOOD:
Title: Browse Product Catalog
As a visitor
I want to see a grid of weird snack products
So that I can discover unusual items to purchase

Value: Enables product discovery, the foundation of the shopping experience

❌ BAD:
Title: Products page
Add products list
```

---

### 2. Acceptance Criteria

- [ ] **Acceptance criteria defined**: Minimum 3-5 testable scenarios
- [ ] **Given-When-Then format**: Uses Gherkin-style scenarios where applicable
- [ ] **Edge cases included**: Happy path, error cases, boundary conditions covered
- [ ] **Success criteria**: Clear definition of "done" for the story
- [ ] **NFRs specified**: Performance, security, accessibility requirements noted (if applicable)

**Example**:
```gherkin
✅ GOOD:
Scenario 1: Homepage displays products
Given I visit the WeirdBites homepage
When the page loads
Then I see a grid of 8-12 products
And each product shows: image, name, price, brief description
And products are displayed responsively

Scenario 2: Out of stock handling
Given a product has stock = 0
When I view the product page
Then "Add to Cart" button is disabled
And I see "Out of Stock" badge

❌ BAD:
- Show products on homepage
- Make it look good
```

---

### 3. Dependencies

- [ ] **Dependencies identified**: All prerequisite stories, external dependencies documented
- [ ] **Dependencies resolved**: No blockers preventing immediate start
- [ ] **Third-party services**: APIs, services, or integrations needed are available/accessible
- [ ] **Data requirements**: Test data, seed data, or fixtures identified

**Example**:
```markdown
✅ Dependencies Resolved:
- Depends on: US-001 (Browse Products) - COMPLETED
- Database: Products table exists
- Test data: 20 sample products in staging DB
- No blockers

❌ Not Ready:
- Depends on: US-001 (Browse Products) - IN PROGRESS
- Needs Stripe API keys - NOT OBTAINED YET
- Blocked by database migration - PENDING
```

---

### 4. Estimation

- [ ] **Story points assigned**: Team has estimated complexity (Fibonacci: 1, 2, 3, 5, 8, 13)
- [ ] **Team consensus**: Estimation reached through planning poker or discussion
- [ ] **Estimable**: Story is small enough to estimate accurately (if >8 points, consider splitting)
- [ ] **Confidence level**: Team feels confident in the estimate

**Guidelines**:
- **1-2 points**: < 1 day, trivial
- **3-5 points**: 1-3 days, moderate complexity
- **8 points**: 3-5 days, complex (consider splitting)
- **13+ points**: Epic, must be split into smaller stories

**Example**:
```markdown
✅ Story Points: 5
Estimated by team on: 2025-10-18
Confidence: High (similar to previous work)

❌ Not Ready:
Story Points: 13 (too large, split required)
No estimate (team didn't discuss)
```

---

### 5. Design & UX

- [ ] **UI mockups/wireframes**: Available for user-facing features (sketch, Figma, or hand-drawn)
- [ ] **User flow**: Clear understanding of user interaction
- [ ] **Responsive design**: Mobile, tablet, desktop views considered
- [ ] **Accessibility**: WCAG 2.1 requirements noted (keyboard nav, screen readers, color contrast)
- [ ] **Design tokens**: Colors, typography, spacing follow design system (or defined)

**Example**:
```markdown
✅ Design Ready:
- Wireframe: docs/wireframes/product-detail-page.png
- Mobile view: Sketch provided
- Accessibility: All images need alt text, form labels required
- Design tokens: Use theme colors (--primary, --secondary)

❌ Not Ready:
- No wireframe (team unsure how it should look)
- Accessibility not considered
```

---

### 6. Technical Approach

- [ ] **Technical approach discussed**: Team understands how to implement
- [ ] **API contracts defined**: Endpoint paths, methods, request/response schemas documented
- [ ] **Database changes**: Schema changes, migrations identified (if needed)
- [ ] **Technology choices**: Libraries, frameworks, tools decided
- [ ] **Security considerations**: Authentication, authorization, validation requirements clear

**Example**:
```markdown
✅ Technical Approach Defined:
API Endpoint:
  GET /api/products
  Query params: page (number), limit (number), category (string)
  Response: { products: Product[], total: number, page: number }

Database:
  Table: products
  Indexes: category, name
  No migration needed (table exists)

Tech:
  - Frontend: Next.js App Router
  - ORM: Prisma
  - Validation: Zod

Security:
  - No auth required (public endpoint)
  - Input validation: page/limit max values
  - Rate limit: 1000 req/min per IP

❌ Not Ready:
- API contract not defined
- Team unsure about database approach
- No security discussion
```

---

### 7. Testability

- [ ] **Test scenarios identified**: Unit, integration, E2E tests outlined
- [ ] **Test data defined**: What data is needed to test this story
- [ ] **Test environment**: Staging environment available and configured
- [ ] **Testable**: Acceptance criteria are objective and verifiable

**Example**:
```markdown
✅ Testability:
Unit Tests:
  - Product card component renders correctly
  - Filter logic applies correctly

Integration Tests:
  - GET /api/products returns products
  - Pagination works correctly

E2E Tests:
  - Browse products → filter → view details

Test Data:
  - 50 test products across 5 categories
  - Some in stock, some out of stock

❌ Not Ready:
- No test plan
- Unclear how to verify acceptance criteria
- Test environment not available
```

---

### 8. Team Understanding

- [ ] **Team reviewed story**: Entire team (dev, QA if applicable) has seen and discussed the story
- [ ] **Questions answered**: All clarifying questions from team addressed
- [ ] **Product Owner available**: PO can answer questions during sprint
- [ ] **No ambiguity**: Team has shared understanding of what needs to be built

**Example**:
```markdown
✅ Team Aligned:
- Story reviewed in refinement session (2025-10-18)
- 3 clarifying questions answered
- Team unanimously agrees story is clear
- PO committed to daily availability

❌ Not Ready:
- Team hasn't seen story yet
- Multiple questions unanswered
- Team unsure what "weird snacks" means
```

---

### 9. Definition of Done Available

- [ ] **DoD checklist exists**: Team has agreed-upon Definition of Done
- [ ] **DoD understood**: Team knows what "done" means for this story
- [ ] **Achievable**: Story can meet DoD within sprint timeframe

*(See separate `definition-of-done.md` document)*

---

### 10. Priority & Sprint Readiness

- [ ] **Priority assigned**: Must/Should/Could Have (MoSCoW)
- [ ] **Sprint capacity**: Story fits in available sprint capacity
- [ ] **No blockers**: Team can start immediately
- [ ] **Value clear**: Stakeholders understand and approve priority

**Example**:
```markdown
✅ Sprint Ready:
- Priority: Must Have (MVP critical)
- Sprint 1 capacity: 13 points available, story is 5 points
- No blockers
- PO approved for Sprint 1

❌ Not Ready:
- Priority unclear
- Sprint already at capacity
- Blocked by infrastructure setup
```

---

## DoR Review Process

### When to Check DoR

**Backlog Refinement** (Weekly):
1. Review upcoming stories (next 2-3 sprints)
2. Apply DoR checklist
3. Identify stories that don't meet DoR
4. Plan work to make stories ready

**Sprint Planning**:
1. Only pull stories that meet DoR
2. Final DoR check before committing to sprint
3. Document any exceptions (with PO approval)

### Who Reviews DoR

| Criteria | Reviewer |
|----------|----------|
| Story structure, value | Product Owner |
| Acceptance criteria | Product Owner + QA |
| Technical approach | Development Team |
| Estimation | Development Team |
| Design/UX | Designer (if available) + Dev Team |
| Dependencies | Development Team |
| Testability | QA + Development Team |

---

## DoR Anti-Patterns

❌ **What NOT to do**:

1. **Waterfall Requirements**
   - Don't require 100% detailed specifications
   - DoR is "just enough" detail, not complete design

2. **Analysis Paralysis**
   - Don't spend weeks refining one story
   - Time-box refinement (30 min per story max)

3. **Solo DoR**
   - Don't let PO define DoR alone
   - Entire team must contribute

4. **Ignoring DoR**
   - Don't start work on stories that don't meet DoR
   - Leads to mid-sprint chaos and failure

5. **Overly Strict DoR**
   - Don't make DoR so strict that no stories pass
   - Balance between ready and over-specified

---

## DoR for Different Story Types

### Feature Stories
- Full DoR checklist applies

### Bug Fix Stories
- [ ] Steps to reproduce documented
- [ ] Expected vs actual behavior clear
- [ ] Severity/priority assigned
- [ ] Root cause understood (or spike time-boxed)
- [ ] Test to prevent regression identified

### Technical/Infrastructure Stories
- [ ] Business value justified
- [ ] User impact explained
- [ ] Success metrics defined
- [ ] Approach validated (spike completed)

### Spike Stories
- [ ] Research question clearly stated
- [ ] Time-boxed (usually 1-3 days)
- [ ] Output defined (document, POC, decision)
- [ ] Success criteria for spike

---

## DoR Template

Use this template when creating/reviewing user stories:

```markdown
# [Story Title]

## User Story
As a [user type]
I want [goal]
So that [benefit]

## Value
[Why this matters to users/business]

## Acceptance Criteria
**Scenario 1**: [Name]
Given [context]
When [action]
Then [outcome]

**Scenario 2**: [Name]
Given [context]
When [action]
Then [outcome]

## Technical Approach
- API: [Endpoints]
- Database: [Changes]
- Frontend: [Components]
- Security: [Considerations]

## Dependencies
- [ ] [Dependency 1]
- [ ] [Dependency 2]

## Design
- Wireframe: [Link]
- Accessibility: [Requirements]

## Testing
- Unit: [What to test]
- Integration: [What to test]
- E2E: [What to test]

## Estimation
Story Points: [Number]
Confidence: [High/Medium/Low]

## DoR Checklist
- [ ] Story structure complete
- [ ] Acceptance criteria defined
- [ ] Dependencies resolved
- [ ] Estimated
- [ ] Design available
- [ ] Technical approach clear
- [ ] Testable
- [ ] Team understands
- [ ] DoD achievable
- [ ] Priority assigned
```

---

## Metrics

### DoR Effectiveness Metrics

Track these to improve DoR process:

| Metric | Formula | Target |
|--------|---------|--------|
| **Stories meeting DoR** | Stories passing DoR / Total stories | > 80% |
| **Sprint commitment accuracy** | Completed / Committed | > 85% |
| **Mid-sprint blockers** | Stories blocked mid-sprint | < 10% |
| **Estimation variance** | Actual / Estimated | 0.8 - 1.2 |
| **Refinement time** | Hours spent refining / Stories refined | < 0.5 hrs/story |

---

## Examples

### ✅ Story That Meets DoR

**US-001: Browse Product Catalog**

**Story**: As a visitor, I want to see a grid of weird snack products, so that I can discover unusual items to purchase

**Acceptance Criteria**: 3 scenarios (homepage load, pagination, responsive)

**Dependencies**: ✅ None

**Estimate**: 5 points (team consensus)

**Design**: ✅ Wireframe in docs/wireframes/

**Technical Approach**: ✅ GET /api/products, SSR with Next.js

**Testability**: ✅ Unit, integration, E2E tests defined

**Team**: ✅ Reviewed and understood

**Status**: ✅ READY FOR SPRINT

---

### ❌ Story That Does NOT Meet DoR

**US-XXX: Improve checkout**

**Story**: Make checkout better

**Acceptance Criteria**: (none defined)

**Dependencies**: ❓ Unknown

**Estimate**: ❓ Not estimated

**Design**: ❌ No wireframe

**Technical Approach**: ❓ Team unsure

**Testability**: ❌ Unclear how to test

**Team**: ❌ Not reviewed

**Status**: ❌ NOT READY - Needs Refinement

**Action Items**:
- Define what "better" means
- Create specific acceptance criteria
- Provide wireframes
- Discuss technical approach
- Estimate with team

---

## Document Control

**Version History**:

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2025-10-19 | Antonio Gomez Gallardo | Initial DoR based on Module 02 |

**Next Review**: After Sprint 1 retrospective (adjust based on learnings)

---

*This Definition of Ready follows Module 02: Agile Planning from the quality-standards documentation and Scrum best practices.*
