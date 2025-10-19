# WeirdBites - Backlog Refinement Process

**Version**: 1.0.0
**Date**: 2025-10-19
**Purpose**: Define the process for refining and preparing user stories for sprint planning
**Reference**: Module 02 - Agile Planning (Backlog Management)

---

## Executive Summary

Backlog refinement (also called "backlog grooming") is the ongoing process of reviewing, clarifying, and preparing user stories so they're ready for sprint planning. This document defines the **how, when, and what** of backlog refinement for WeirdBites.

**Frequency**: Weekly (Wednesday, 90 minutes)
**Outcome**: 15-20 story points ready for next sprint
**Quality Gate**: All stories meet Definition of Ready (DoR)

---

## 1. Backlog Refinement Overview

### 1.1 What is Backlog Refinement?

**Definition**: The process of adding detail, estimates, and order to product backlog items.

**Activities**:
- Review upcoming user stories
- Add missing details (acceptance criteria, mockups)
- Estimate story points
- Split large stories into smaller ones
- Apply Definition of Ready checklist
- Reorder backlog based on priority

**Goal**: Have at least 1.5-2 sprints' worth of "ready" stories in the backlog

### 1.2 Why Backlog Refinement Matters

**Without Refinement**:
- ❌ Sprint planning takes 2-3 hours (instead of 60 min)
- ❌ Unclear stories lead to mid-sprint questions
- ❌ Poor estimates lead to over/under-commitment
- ❌ Large stories don't fit in sprint
- ❌ Missing acceptance criteria → ambiguous implementation

**With Refinement**:
- ✅ Sprint planning is fast and focused (60 min)
- ✅ Stories are clear and actionable
- ✅ Estimates are accurate (within 20%)
- ✅ Stories are right-sized (≤8 points)
- ✅ Acceptance criteria drive tests

**ROI**: 90 minutes of refinement saves 2-3 hours of sprint planning and rework

---

## 2. Refinement Schedule

### 2.1 Weekly Refinement

**Day**: Wednesday (Sprint Day 3)
**Time**: 14:30-16:00
**Duration**: 90 minutes
**Participants**: Developer/QAE (solo)

**Why Wednesday?**
- Mid-sprint (current sprint is progressing)
- Not too early (don't know velocity yet)
- Not too late (need time to prepare)
- Provides 4 days to add missing details before sprint planning

### 2.2 Ad-Hoc Refinement

**When**: As needed, between scheduled sessions
**Duration**: 15-30 minutes
**Trigger**:
- New story ideas emerge
- Stakeholder feedback received
- Technical discovery changes requirements
- Story needs splitting mid-sprint

**Process**:
1. Capture story idea immediately (GitHub issue)
2. Add to backlog with priority tag
3. Schedule for next refinement session
4. Don't refine immediately (avoid context switching)

---

## 3. Refinement Process (Step-by-Step)

### 3.1 Preparation (5 min)

**Before Wednesday Refinement**:
- [ ] Review current sprint progress (velocity tracking)
- [ ] Identify which vertical slice is next
- [ ] Pull up product backlog (GitHub Projects)
- [ ] Open Definition of Ready checklist
- [ ] Have notepad ready for questions/action items

### 3.2 Story Selection (10 min)

**Select Stories to Refine**:
1. Pull top 5-7 stories from backlog (highest priority)
2. Focus on next sprint (not 3-4 sprints out)
3. Aim for ~20 story points (enough for next sprint + buffer)

**Priority Order**:
- Stories from current vertical slice (finish slice incrementally)
- High-value stories (user-facing features)
- Technical debt (10-20% capacity)
- Bug fixes (as needed)

**Example Selection** (Sprint 1 preparing for Sprint 2):
```
Selected for Refinement:
1. US-004: Add to Cart (5 points - estimate)
2. US-005: Update Cart Quantity (3 points - estimate)
3. US-006: Remove from Cart (3 points - estimate)
4. US-007: Guest Checkout Form (5 points - estimate)
5. TECH-001: Set up Stripe test mode (3 points - estimate)

Total: ~19 points (slightly over target - will refine down)
```

### 3.3 Story Review (40 min)

**For Each Story** (8 min per story):

**Step 1: Read Story (1 min)**
- Read user story format ("As a... I want... So that...")
- Understand user value
- Check if it aligns with current vertical slice

**Step 2: Review Acceptance Criteria (2 min)**
- Check if AC exists
- Verify AC is in Given-When-Then format
- Ensure AC is testable
- Identify missing scenarios

Example AC Review:
```
Story: US-004 Add to Cart

Existing AC:
✅ Given I'm viewing a product detail page
   When I click "Add to Cart"
   Then the product is added to my cart

Missing AC (add these):
❌ Given I add a product that's already in cart
   When I click "Add to Cart" again
   Then the quantity increments by 1

❌ Given the product is out of stock
   When I try to add to cart
   Then I see an error message
```

**Step 3: Check Dependencies (1 min)**
- Identify technical dependencies (APIs, libraries)
- Identify story dependencies (blocks/blocked by)
- Note if any dependencies aren't ready

**Step 4: Identify Missing Details (2 min)**
- UI mockups (if UI change)
- API contracts (if new API)
- Data models (if new database fields)
- Business rules (validation, edge cases)

**Step 5: Apply DoR Checklist (2 min)**
- Go through 10-point DoR checklist
- Mark pass/fail for each criterion
- Note what's missing

DoR Checklist:
```
Story: US-004 Add to Cart

1. Story format (As a... I want... So that...): ✅
2. Acceptance criteria (Given-When-Then): ⚠️ Missing 2 scenarios
3. Independent (not tightly coupled): ✅
4. Negotiable (can adjust scope): ✅
5. Valuable (clear user/business value): ✅
6. Estimatable (clear scope): ⚠️ Unclear: quantity validation
7. Small (≤8 points): ✅ Estimated 5 points
8. Testable (AC = test cases): ⚠️ Need more AC
9. UI mockups (if UI change): ❌ Missing cart UI mockup
10. Dependencies identified: ✅ None

DoR Pass: NO (3 items failing)
Action: Add missing AC, create cart UI mockup
```

### 3.4 Story Estimation (20 min)

**Estimation Process**:

**Step 1: Reference Stories**
- Compare to similar past stories
- Use completed stories as baseline
- Adjust for complexity differences

Example:
```
Story: US-004 Add to Cart (new)

Similar Stories:
- US-001 Browse Products: 5 points (completed, took 2 days)
  → Had list rendering, API call, state management
- US-002 View Product Details: 5 points (completed, took 2 days)
  → Had detail view, image gallery, API call

Comparison:
- US-004 is similar complexity to US-002
- Both have: API call, state management, UI update
- US-004 simpler: no image gallery
- US-004 more complex: cart state persistence (localStorage)

Estimate: 5 points (same as US-002, complexity balances out)
```

**Step 2: Fibonacci Scale**
- Use Fibonacci: 1, 2, 3, 5, 8, 13
- Don't use: 4, 6, 7, 9, 10, 11, 12 (precision is false)
- 13+ points → Story too large, must split

**Estimation Guide**:
| Points | Complexity | Hours | Description |
|--------|-----------|-------|-------------|
| 1 | Trivial | 1-2 hours | CSS tweak, copy change |
| 2 | Simple | 2-4 hours | Simple component, basic CRUD |
| 3 | Moderate | 4-8 hours | Component with logic, API integration |
| 5 | Complex | 8-16 hours | Multiple components, state management, tests |
| 8 | Very Complex | 16-24 hours | Complex feature, many edge cases |
| 13+ | Too Large | 24+ hours | MUST SPLIT |

**Step 3: Document Estimation**
- Add estimate to story (custom field in GitHub Projects)
- Note estimation rationale (in story comments)

### 3.5 Story Splitting (15 min if needed)

**When to Split**:
- Story >8 points
- Story has multiple user personas
- Story has too many acceptance criteria (>7-8)
- Story spans multiple technical layers

**How to Split**:

**Pattern 1: By CRUD Operations**
```
Original Story (13 points):
US-024: Manage Products (Create, Read, Update, Delete)

Split Into:
- US-024a: Create Product (3 points)
- US-024b: Edit Product (3 points)
- US-024c: Delete Product (2 points)
- US-024d: List Products (Admin) (5 points)

Total: Still 13 points, but now 4 shippable increments
```

**Pattern 2: By Happy Path vs. Edge Cases**
```
Original Story (13 points):
US-008: Checkout Form Validation (all fields, all edge cases)

Split Into:
- US-008a: Checkout Form Validation (happy path) (5 points)
- US-008b: Checkout Form Edge Cases (email format, phone format) (3 points)
- US-008c: Checkout Form Error Recovery (retry, autosave) (5 points)
```

**Pattern 3: By User Persona**
```
Original Story (13 points):
US-020: Search Products (for all users, with filters, facets)

Split Into:
- US-020a: Basic Search (keyword) (5 points)
- US-020b: Advanced Search (filters) (5 points)
- US-020c: Search Autocomplete (3 points)
```

**Splitting Rules**:
- Each split story must still deliver value
- Each split story must be testable
- Maintain story independence (can implement in any order)
- Don't create "technical tasks" (keep user-facing value)

---

## 4. Refinement Outcomes

### 4.1 Story States

**Not Ready**:
- Missing acceptance criteria
- No estimate
- Dependencies unclear
- DoR checklist fails

**Ready**:
- All DoR criteria met
- Estimated (≤8 points)
- No blocking dependencies
- Can be pulled into next sprint

### 4.2 Backlog Health Metrics

**Target Metrics**:
- Stories ready for next sprint: ≥15 points
- Stories ready for sprint after: ≥10 points
- DoR pass rate: >80%
- Average story size: 3-5 points
- Stories >8 points: 0

**Measure After Each Refinement**:
```
Refinement Session: 2025-10-23

Stories Refined: 5
Stories Passing DoR: 4/5 (80%)
Total Points Ready: 19
Stories >8 Points: 0
Average Story Size: 3.8 points

Health: ✅ GOOD (enough for next sprint)
```

### 4.3 Refinement Output

**Updated Backlog**:
- Stories moved to "Ready" column (GitHub Projects)
- Estimates added (story points field)
- DoR checklist passed (checkbox field)
- Priority adjusted if needed

**Action Items**:
- Missing mockups → Assign to design/create
- Missing AC → Schedule discussion with stakeholder
- Technical questions → Spike story created
- Large stories → Splitting scheduled

**Documentation**:
- Refinement notes in GitHub issue comments
- Updated product backlog document (if major changes)

---

## 5. Refinement Best Practices

### 5.1 Do's

✅ **Do refine regularly** (weekly, same time)
✅ **Do focus on next 1-2 sprints** (not 6 months out)
✅ **Do apply DoR strictly** (no exceptions)
✅ **Do estimate relatively** (compare to similar stories)
✅ **Do split large stories** (>8 points)
✅ **Do capture questions** (create spike stories if needed)
✅ **Do time-box** (90 min max, don't over-analyze)
✅ **Do document decisions** (in story comments)

### 5.2 Don'ts

❌ **Don't skip refinement** ("too busy this week")
❌ **Don't refine too far ahead** (requirements change)
❌ **Don't estimate in hours** (use story points)
❌ **Don't design solutions** (focus on "what", not "how")
❌ **Don't commit to stories** (refinement ≠ commitment)
❌ **Don't refine mid-sprint** (except urgent changes)
❌ **Don't accept incomplete stories** (enforce DoR)

### 5.3 Refinement Anti-Patterns

**Anti-Pattern 1: Over-Refinement**
- Problem: Refining stories 6 sprints out in detail
- Impact: Wasted effort (requirements change)
- Solution: Refine just-in-time (1-2 sprints ahead)

**Anti-Pattern 2: Design in Refinement**
- Problem: Spending 30 min discussing implementation details
- Impact: Analysis paralysis, wasted time
- Solution: Focus on "what" (requirements), defer "how" (design)

**Anti-Pattern 3: Rubber Stamping**
- Problem: Marking all stories "Ready" without review
- Impact: Unclear stories enter sprint, cause rework
- Solution: Enforce DoR strictly, reject incomplete stories

**Anti-Pattern 4: No Estimates**
- Problem: "We'll estimate during sprint planning"
- Impact: Sprint planning takes 3 hours
- Solution: Always estimate during refinement

---

## 6. Refinement Tools

### 6.1 GitHub Projects

**Backlog Columns**:
1. **Backlog** - All stories, not yet refined
2. **Ready** - Stories passing DoR, ready for sprint
3. **Sprint X** - Stories committed to current sprint
4. **In Progress** - Work in progress (WIP ≤2)
5. **In Review** - Code review, testing
6. **Done** - Meets DoD, shipped

**Custom Fields**:
- Story Points (number, 1-13)
- Priority (Must/Should/Could/Won't)
- Sprint (text, "Sprint 1", "Sprint 2", etc.)
- DoR Passed (checkbox)
- Dependencies (text, "US-XXX")

**Views**:
- Backlog View (all stories, sorted by priority)
- Ready View (stories passing DoR, ready for planning)
- Sprint View (current sprint stories only)

### 6.2 Definition of Ready Checklist

**Template** (saved in GitHub issue templates):

```markdown
## Definition of Ready Checklist

- [ ] Story follows template (As a... I want... So that...)
- [ ] Acceptance criteria defined (Given-When-Then format)
- [ ] Story is independent (not tightly coupled to other stories)
- [ ] Story is negotiable (scope can be adjusted if needed)
- [ ] Story is valuable (clear user or business value)
- [ ] Story is estimatable (scope is clear enough to estimate)
- [ ] Story is small (≤8 story points)
- [ ] Story is testable (acceptance criteria can be automated)
- [ ] UI mockups available (if story involves UI changes)
- [ ] Dependencies identified and resolved
```

### 6.3 Estimation Reference Sheet

**Keep a Living Document** (`docs/estimation-reference.md`):

```markdown
# Estimation Reference

## Completed Stories (Baseline)

### 1-Point Stories
- Copy change (update text on page)
- CSS tweak (adjust margin, color)

### 2-Point Stories
- Simple component (button, card, badge)
- Basic form (1-2 fields)

### 3-Point Stories
- US-005: Update Cart Quantity (actual: 2.5 days)
- US-006: Remove from Cart (actual: 2 days)

### 5-Point Stories
- US-001: Browse Products (actual: 2 days)
- US-002: View Product Details (actual: 2.5 days)
- US-004: Add to Cart (actual: 2 days)

### 8-Point Stories
- US-011: Payment Processing (actual: 4 days)
```

---

## 7. Refinement Metrics

### 7.1 Track Weekly

**DoR Pass Rate**:
```
DoR Pass Rate = (Stories Passing DoR / Stories Reviewed) × 100%

Target: >80%

Example:
Week 1: 4/5 = 80% ✅
Week 2: 5/5 = 100% ✅
Week 3: 3/5 = 60% ❌ (action: improve story templates)
```

**Story Points Ready**:
```
Target: ≥15 points ready for next sprint

Example:
Week 1: 19 points ✅
Week 2: 22 points ✅
Week 3: 12 points ❌ (need to refine more stories)
```

**Average Story Size**:
```
Target: 3-5 points (sweet spot)

Example:
Week 1: 3.8 points ✅
Week 2: 6.2 points ⚠️ (stories too large, need splitting)
```

### 7.2 Track Monthly

**Refinement Effectiveness**:
```
Sprint Planning Duration = f(Refinement Quality)

Goal: Sprint planning <60 min

If planning >90 min → Improve refinement
```

**Estimation Accuracy**:
```
Estimation Accuracy = Actual Points / Estimated Points

Target: 0.8-1.2 (±20%)

Track over 3-4 sprints to see if estimates improving
```

---

## 8. Refinement Checklist

### 8.1 Before Refinement

- [ ] Review current sprint velocity
- [ ] Identify next vertical slice
- [ ] Pull up GitHub Projects backlog
- [ ] Have DoR checklist ready
- [ ] Block 90 min on calendar (no interruptions)

### 8.2 During Refinement

- [ ] Select top 5-7 stories from backlog
- [ ] Review each story (AC, dependencies, details)
- [ ] Apply DoR checklist to each story
- [ ] Estimate each story (story points)
- [ ] Split large stories (>8 points)
- [ ] Document missing items (action items)
- [ ] Update GitHub Projects (estimates, DoR checkbox, priority)

### 8.3 After Refinement

- [ ] At least 15 points ready for next sprint
- [ ] All ready stories meet DoR
- [ ] Action items created for missing details
- [ ] Backlog prioritized (top stories are highest value)
- [ ] Refinement notes documented (in GitHub issues)
- [ ] Metrics updated (DoR pass rate, points ready)

---

## 9. Document Control

**Version History**:

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2025-10-19 | Antonio Gomez Gallardo | Initial backlog refinement process (Module 02 alignment) |

**Next Review**: After Sprint 2 (validate refinement effectiveness)

**Related Documents**:
- [Definition of Ready](7.definition-of-ready.md) - DoR checklist details
- [Sprint Cadence Guide](16.sprint-cadence-guide.md) - Refinement ceremony schedule
- [Product Backlog](5.product-backlog.md) - All user stories
- [Velocity Tracking System](12.velocity-tracking-system.md) - Estimation guidance

---

*This backlog refinement process follows Module 02: Agile Planning from the quality-standards documentation, emphasizing just-in-time refinement, story quality, and estimation accuracy.*
