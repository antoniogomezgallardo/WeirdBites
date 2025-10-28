# [STORY_ID]: [Story Title] - Implementation Plan

**Version**: 1.0.0
**Last Updated**: [DATE]
**Story Points**: [TOTAL_POINTS]
**Estimated Duration**: [DURATION_DAYS] days
**Status**: Ready for Implementation / In Progress / Complete

## Story Overview

**User Story**: As a [USER_ROLE], I want to [ACTION] so that [BENEFIT].

**Epic**: [EPIC_NAME]

**Priority**: [Must Have / Should Have / Could Have / Won't Have]

**Acceptance Criteria**:

1. [Criterion 1 - Given/When/Then format]
2. [Criterion 2]
3. [Criterion 3]
4. [Add more as needed]

## Prerequisites

List what must be in place before starting:

- [ ] [Database models defined]
- [ ] [API contracts agreed]
- [ ] [Dependencies installed]
- [ ] [Testing frameworks configured]
- [ ] [Feature flags set up if needed]

## Implementation Approach

### Development Methodology

- **TBD (Trunk-Based Development)**: Short-lived feature branches per slice
- **TDD (Test-Driven Development)**: Red → Green → Refactor cycle
- **Vertical Slicing**: Each slice delivers end-to-end value (DB → API → UI)

### Branch Strategy

Each vertical slice will have its own feature branch:

- **Slice [N.1]**: `feature/[story-id]-slice-[n.1]-[short-description]`
- **Slice [N.2]**: `feature/[story-id]-slice-[n.2]-[short-description]` (if story requires multiple slices)
- **Slice [N.X]**: `feature/[story-id]-slice-[n.x]-[short-description]` (add as many slices as needed)

**Note**: Number of slices varies by story complexity (minimum 1, no maximum). Each slice should be 1-2 days of work max.

Each branch will be merged via PR after:

- All tests pass (unit + integration + E2E)
- CI quality gates pass (7/7)
- Self-review checklist completed
- Code is production-ready

## Vertical Slices Breakdown

### Slice [N.1]: [Slice Name]

**Story Points**: [POINTS]
**Duration**: [DURATION]
**Branch**: `feature/[story-id]-slice-[n.1]-[short-description]`

#### What Gets Delivered

- [Deliverable 1 - be specific]
- [Deliverable 2]
- [Deliverable 3]
- [Add more as needed]

#### TDD Workflow (Red → Green → Refactor)

**Step 1: Red Phase - Write Failing Tests**

```bash
# Terminal 1: Test watcher
pnpm test:watch

# Write tests FIRST (all fail initially):
# 1. [Test category 1] ([N] tests)
# 2. [Test category 2] ([N] tests)
# 3. [Test category 3] ([N] tests)
```

**Step 2: Green Phase - Minimal Code to Pass**

```bash
# Write minimal code to make tests pass:
# 1. [Implementation 1] → tests pass
# 2. [Implementation 2] → tests pass
# 3. [Implementation 3] → tests pass
```

**Step 3: Refactor Phase - Improve Code Quality**

```bash
# Refactor while keeping tests green:
# - Extract utilities
# - Improve type safety
# - Add JSDoc comments
# - Verify all tests still pass
```

#### Test Breakdown ([TOTAL] tests total)

**Unit Tests ([HAPPY_COUNT] happy path + [ERROR_COUNT] error scenarios = [TOTAL] tests)**

_[Component/Module Name]_ (`[file-path]`):

- ✅ Happy: [Test description]
- ✅ Happy: [Test description]
- ❌ Error: [Error scenario description]
- ❌ Error: [Error scenario description]

_[Component/Module Name]_ (`[file-path]`):

- ✅ Happy: [Test description]
- ❌ Error: [Error scenario description]

**Integration Tests ([HAPPY_COUNT] happy path + [ERROR_COUNT] error scenarios = [TOTAL] tests)**

_[API/Service Name]_ (`[file-path]`):

- ✅ Happy: [Test description]
- ✅ Happy: [Test description]
- ❌ Error: [Error scenario description]
- ❌ Error: [Error scenario description]

**E2E Tests ([HAPPY_COUNT] happy path + [ERROR_COUNT] error scenarios = [TOTAL] tests)**

_[Feature Flow]_ (`tests/e2e/[feature].spec.ts`):

- ✅ Happy: [Test description]
- ❌ Error: [Error scenario description]

#### Files to Create/Modify

**Create**:

- `[file-path]` - [Description]
- `[file-path]` - [Description]
- `[file-path]` - [Description]

**Modify**:

- `[file-path]` - [What changes]
- `[file-path]` - [What changes]

#### Commit Strategy (4-5 small commits)

1. `test([scope]): [description]`
2. `feat([scope]): [description]`
3. `test([scope]): [description]`
4. `feat([scope]): [description]`
5. `refactor([scope]): [description]`

---

### Slice [N.2]: [Slice Name]

**Story Points**: [POINTS]
**Duration**: [DURATION]
**Branch**: `feature/[story-id]-slice-[n.2]-[short-description]`

#### What Gets Delivered

- [Deliverable 1]
- [Deliverable 2]
- [Deliverable 3]

#### TDD Workflow (Red → Green → Refactor)

[Same structure as Slice 1]

#### Test Breakdown ([TOTAL] tests total)

[Same structure as Slice 1]

#### Files to Create/Modify

[Same structure as Slice 1]

#### Commit Strategy (4-5 small commits)

[Same structure as Slice 1]

---

### Slice [N.3]: [Slice Name] (Optional - add only if needed)

**Story Points**: [POINTS]
**Duration**: [DURATION]
**Branch**: `feature/[story-id]-slice-[n.3]-[short-description]`

[Same structure as previous slices]

---

**Add more slices as needed** - Some stories may have only 1 slice, others may have 4-5 slices. Break down based on:

- Story complexity
- Can each slice be deployed independently?
- Is each slice 1-2 days of work max?
- Does each slice deliver end-to-end value?

---

## Overall Test Summary

**Total Tests**: [TOTAL]

- **Happy Path**: [HAPPY_COUNT] tests ([PERCENTAGE]%)
- **Error Scenarios**: [ERROR_COUNT] tests ([PERCENTAGE]%)

**By Type**:

- **Unit Tests**: [UNIT_TOTAL] ([UNIT_HAPPY] happy + [UNIT_ERROR] error)
- **Integration Tests**: [INTEGRATION_TOTAL] ([INTEGRATION_HAPPY] happy + [INTEGRATION_ERROR] error)
- **E2E Tests**: [E2E_TOTAL] ([E2E_HAPPY] happy + [E2E_ERROR] error)

**Coverage Target**: ≥80% (Module 02 DoD requirement)

## Definition of Done Checklist

- [ ] All [TOTAL] tests passing (unit + integration + E2E)
- [ ] Code coverage ≥80%
- [ ] All 7 CI quality gates pass (lint, typecheck, test, e2e, build, security, quality-gate)
- [ ] Accessibility: axe-core clean (WCAG 2.1 AA)
- [ ] Self-review checklist completed for each PR
- [ ] Responsive on mobile (375px), tablet (768px), desktop (1280px)
- [ ] Error boundaries in place for graceful failures
- [ ] Documentation updated (JSDoc comments, README if needed)
- [ ] Feature flag removed (if used)
- [ ] Manual testing completed on Vercel preview deployment

## Success Metrics

**DORA Metrics** (Module 09):

- **Deployment Frequency**: [N] deployments (1 per slice)
- **Lead Time**: < 1 day per slice
- **Change Failure Rate**: Target 0% (all tests pass before merge)

**Quality Metrics**:

- **Test Coverage**: Target ≥80%, expect [EXPECTED]%
- **Flaky Test Rate**: 0% (deterministic tests only)
- **Bug Escape Rate**: 0 bugs to production (comprehensive error handling)

## Risk Mitigation

**Risk 1: [Risk Description]**

- **Mitigation**: [How to prevent/reduce risk]
- **Test**: [How to verify mitigation works]

**Risk 2: [Risk Description]**

- **Mitigation**: [How to prevent/reduce risk]
- **Test**: [How to verify mitigation works]

**Risk 3: [Risk Description]**

- **Mitigation**: [How to prevent/reduce risk]
- **Test**: [How to verify mitigation works]

## References

- **User Story**: [Link to product backlog]
- **Vertical Slicing**: [Link to vertical slices doc]
- **Definition of Done**: [Link to DoD]
- **Code Review Checklist**: [Link to checklist]
- **Module 05 Testing Strategy**: [Link to testing docs]

---

## Instructions for Using This Template

### 1. Fill in Basic Information

- Replace all `[PLACEHOLDERS]` with actual values
- Update version, date, and status
- Fill in story overview from product backlog

### 2. Define Vertical Slices

- Break user story into **1 or more** thin, deployable slices (no fixed number)
- **Simple stories**: May only need 1 slice
- **Complex stories**: May need 3-5+ slices
- Each slice should be 1-2 days of work max
- Each slice delivers end-to-end value (DB → API → UI)
- Name slices descriptively (e.g., "Basic Listing", "Pagination", "Polish")
- Remove example Slice 3 from template if not needed, or add more slices if story is complex

### 3. Plan Tests for Each Slice

- **Happy Path Tests**: Core functionality working as expected
- **Error Scenarios**: What happens when things go wrong
  - Database failures
  - Invalid input
  - Network errors
  - Edge cases (empty data, very large data, special characters)
- Aim for 40-60% error scenario coverage

### 4. Test Distribution Guidelines

- **Unit Tests**: 40-50% of total tests
  - Component behavior
  - Utility functions
  - Edge cases and error handling
- **Integration Tests**: 25-35% of total tests
  - API endpoints
  - Database interactions
  - Service layer logic
- **E2E Tests**: 20-30% of total tests
  - Critical user flows
  - Error states
  - Responsive behavior

### 5. TDD Red-Green-Refactor

For each slice:

1. **Red**: Write all tests first (they fail)
2. **Green**: Write minimal code to pass tests
3. **Refactor**: Improve code quality while tests stay green

### 6. Branch Strategy

- Create one branch per slice
- Branch naming: `feature/[story-id]-slice-[n.x]-[short-description]`
- Example: `feature/us-002-slice-2.1-category-filter`
- Merge each slice via PR after all quality gates pass

### 7. Commit Strategy

- 4-5 small commits per slice
- Follow Conventional Commits: `type(scope): description`
- Commit after each test/implementation pair
- Example sequence:
  1. Write tests → commit
  2. Make tests pass → commit
  3. Refactor → commit

### 8. Quality Checklist

Before merging each slice:

- [ ] All tests pass locally (`pnpm test && pnpm test:e2e`)
- [ ] Code coverage ≥80%
- [ ] CI quality gates pass (7/7)
- [ ] Self-review checklist completed
- [ ] Manual testing on Vercel preview
- [ ] Accessibility tested with axe-core

---

**Status**: Template Ready 🚀
**Next Step**: Copy this template and adapt for your user story
