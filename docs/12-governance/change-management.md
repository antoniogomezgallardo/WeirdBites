# WeirdBites - Change Management Process

**Version**: 1.0.0
**Date**: 2025-10-19
**Purpose**: Define how changes to requirements, scope, and priorities are managed throughout the project lifecycle
**Reference**: Module 01 - Requirements Engineering (Requirements Change Management)

---

## Overview

Change is inevitable in software projects. This document establishes a lightweight, agile-friendly change management process that balances flexibility with control, ensuring changes are evaluated, documented, and communicated effectively.

**Key Principles**:
- **Embrace change** while maintaining project stability
- **Transparent** decision-making process
- **Documented** change history for traceability
- **Fast** turnaround for critical changes
- **Quality-focused** - changes must not compromise quality standards

---

## 1. What Constitutes a "Change"?

### 1.1 Changes Requiring Formal Process

**Scope Changes**:
- Adding new user stories to MVP
- Removing committed user stories from MVP
- Significantly expanding story scope (>3 story points increase)
- Adding new epics or features

**Priority Changes**:
- Moving stories between Must/Should/Could/Won't categories
- Re-ordering sprint backlog after sprint started
- Changing vertical slice composition

**Requirements Changes**:
- Modifying acceptance criteria after sprint started
- Changing non-functional requirements (NFRs)
- Altering Definition of Ready or Definition of Done

**Technical Changes**:
- Changing core technology stack (e.g., React → Vue)
- Altering architecture decisions (e.g., monolith → microservices)
- Modifying data models after implementation started

### 1.2 Changes NOT Requiring Formal Process

**Refinement Activities** (normal backlog grooming):
- Clarifying acceptance criteria before sprint starts
- Adding technical notes or examples to stories
- Breaking down large stories (>8 points) into smaller ones
- Updating story point estimates based on team discussion

**Bug Fixes**:
- Fixing defects in existing functionality
- Addressing security vulnerabilities

**Quality Improvements**:
- Refactoring for better code quality
- Improving test coverage
- Performance optimizations within existing scope

**Documentation Updates**:
- Fixing typos or errors
- Adding missing details to existing stories
- Updating technical documentation

---

## 2. Change Request Process

### 2.1 Process Flow

```
┌─────────────────┐
│  Change Request │
│   Submitted     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Log Change    │
│  (GitHub Issue) │
└────────┬────────┘
         │
         ▼
┌─────────────────┐     Yes    ┌──────────────┐
│ Impact Analysis │ ──────────► │  Prioritize  │
│   (Within 24h)  │             │   (MoSCoW)   │
└────────┬────────┘             └──────┬───────┘
         │ No                          │
         ▼                             ▼
┌─────────────────┐            ┌──────────────┐
│     Reject      │            │   Approve    │
│   (Document)    │            │  (Document)  │
└────────┬────────┘            └──────┬───────┘
         │                            │
         └────────────┬───────────────┘
                      │
                      ▼
              ┌───────────────┐
              │    Update     │
              │  Backlog &    │
              │   Docs        │
              └───────────────┘
                      │
                      ▼
              ┌───────────────┐
              │  Communicate  │
              │    Change     │
              └───────────────┘
```

### 2.2 Change Request Template

**Create GitHub Issue** with label `change-request`:

```markdown
## Change Request: [Brief Title]

**Requested By**: [Name/Role]
**Date**: YYYY-MM-DD
**Change Type**: [ ] Scope [ ] Priority [ ] Requirements [ ] Technical

---

### 1. Current State
[What exists now?]

### 2. Proposed Change
[What should change?]

### 3. Rationale
[Why is this change needed?]

### 4. Impact Analysis

**Affected User Stories**:
- US-XXX: [Story title]
- US-YYY: [Story title]

**Affected Vertical Slices**:
- Slice X: [Impact description]

**Story Point Impact**:
- Stories added: X points
- Stories removed: Y points
- Net change: ±Z points

**Timeline Impact**:
- Estimated delay: X days/weeks
- Affected milestones: [List]

**Quality Impact**:
- Test coverage: [Impact]
- Technical debt: [Impact]
- NFRs affected: [List]

**Dependencies**:
- Blocks: [List of blocked stories]
- Blocked by: [List of dependencies]

### 5. Alternatives Considered
[What other options were evaluated?]

### 6. Recommendation
[ ] Approve - Implement immediately
[ ] Approve - Schedule for Sprint X
[ ] Defer - Move to post-MVP backlog
[ ] Reject - Document rationale

### 7. Decision
[To be filled by Product Owner]

**Decision**: [Approved/Deferred/Rejected]
**Date**: YYYY-MM-DD
**Rationale**: [Why?]
**Action Items**:
- [ ] Update product backlog
- [ ] Update affected user stories
- [ ] Update documentation
- [ ] Communicate to stakeholders
```

---

## 3. Impact Analysis Guidelines

### 3.1 Story Point Impact

**Calculate Net Impact**:
```
Net Impact = (New Stories Points) - (Removed Stories Points)
```

**Examples**:
- Adding US-040 (5 points) to Slice 1: +5 points
- Removing US-003 (3 points) from Slice 1: -3 points
- Expanding US-001 from 5 to 8 points: +3 points
- Net impact: +5 points → Slice 1 now 18 points instead of 13

**Decision Matrix**:
| Net Impact | Timeline Impact | Decision Guideline |
|------------|-----------------|-------------------|
| +0-5 points | <1 week delay | Likely approve if high value |
| +5-10 points | 1-2 week delay | Require strong justification |
| +10-20 points | 2-4 week delay | Consider deferring to next slice |
| +20+ points | >1 month delay | Defer to post-MVP unless critical |

### 3.2 Quality Impact Assessment

**Questions to Answer**:
1. **Test Coverage**: Does this change increase or decrease test coverage?
2. **Technical Debt**: Does this add technical debt or pay it down?
3. **NFRs**: Are any non-functional requirements impacted (performance, security, accessibility)?
4. **Complexity**: Does this increase cyclomatic complexity or code duplication?
5. **Dependencies**: Does this introduce new external dependencies?

**Quality Veto**:
If a change would:
- Reduce code coverage below 80%
- Introduce critical/high security vulnerabilities
- Violate WCAG 2.1 AA accessibility standards
- Cause Lighthouse score to drop below 90
- Increase technical debt ratio above 5%

→ **Automatically rejected** unless compensating quality improvements are included

### 3.3 Risk Assessment

**Risk Level** = Probability × Impact

| Risk Level | Description | Approval Authority |
|------------|-------------|-------------------|
| **Low** | Minor change, no dependencies, well-understood | Developer/QAE (self-approve) |
| **Medium** | Moderate scope, some dependencies, proven technology | Product Owner required |
| **High** | Major scope change, many dependencies, new technology | Product Owner + stakeholder review |
| **Critical** | MVP scope at risk, timeline impact >1 month | Requires formal project review |

---

## 4. Change Approval Authority

### 4.1 Solo Developer Context

**For WeirdBites** (educational project with solo developer):

| Change Type | Approval Authority | Documentation Required |
|-------------|-------------------|------------------------|
| **Backlog Refinement** | Self (developer) | Update story in GitHub Projects |
| **Story Point Adjustment** | Self (developer) | Note in sprint journal |
| **Low Risk Changes** | Self (developer) | GitHub Issue + impact analysis |
| **Medium Risk Changes** | Self-review + mentor feedback | GitHub Issue + detailed analysis |
| **High Risk Changes** | Documented decision + rationale | Full change request + alternatives |

**Decision Journal**: Maintain `docs/decisions/` folder with Architecture Decision Records (ADRs) for high-risk changes.

### 4.2 Team Context (Future)

When transitioning to team project:

| Role | Approval Authority |
|------|-------------------|
| **Developer** | Backlog refinement, low-risk changes |
| **Product Owner** | Medium-risk changes, priority shifts |
| **Stakeholders** | High-risk changes, MVP scope changes |
| **Technical Lead** | Architecture changes, technology stack changes |

---

## 5. Change Management by Sprint Phase

### 5.1 Before Sprint Planning (Backlog)

**Changes Allowed**:
- ✅ Add/remove stories from backlog freely
- ✅ Re-prioritize backlog stories
- ✅ Refine acceptance criteria
- ✅ Update story point estimates
- ✅ Split or merge stories

**Process**: Update GitHub Projects, no formal change request needed

### 5.2 During Sprint Planning (Sprint Commitment)

**Changes Allowed**:
- ✅ Adjust sprint scope before final commitment
- ✅ Swap stories of equal priority and points
- ⚠️ Adding stories requires justification

**Process**:
- Document reason in sprint planning notes
- Update sprint goal if needed
- Ensure team capacity not exceeded

### 5.3 During Sprint (In Progress)

**Changes Restricted**:
- ❌ **Strongly discouraged**: Adding stories mid-sprint
- ⚠️ **Requires Change Request**: Modifying acceptance criteria
- ✅ **Allowed**: Clarifications that don't change scope
- ✅ **Allowed**: Removing stories if blocked

**Process**:
1. Create change request issue
2. Impact analysis (within 24 hours)
3. Decision documented
4. Update sprint backlog if approved
5. Communicate in daily standup

**Exception**: **Critical bugs** found in production bypass this process

### 5.4 After Sprint (Retrospective)

**Changes Encouraged**:
- ✅ Process improvements based on retrospective
- ✅ Updating Definition of Ready/Done
- ✅ Adjusting velocity estimates
- ✅ Refining upcoming stories

**Process**: Document in retrospective notes, update process documents

---

## 6. Common Change Scenarios

### 6.1 Scenario: New Feature Request Mid-Sprint

**Situation**: Stakeholder requests new feature during active sprint

**Process**:
1. **Acknowledge**: "Thank you for the suggestion!"
2. **Create Change Request**: GitHub issue with impact analysis
3. **Analyze Impact**:
   - Can it wait until next sprint? (Usually yes)
   - Is it critical? (Rarely)
   - Does it block other work? (Check dependencies)
4. **Decision**:
   - **Low urgency**: Add to backlog, prioritize in next sprint planning
   - **High urgency**: Evaluate against current sprint commitment
5. **Communicate**: Explain decision and expected timeline

**Example**:
```markdown
Change Request: Add "Wishlist" feature

Current State: MVP doesn't include wishlist
Proposed: Add wishlist to Slice 1
Impact: +5 story points, 1 week delay to Slice 1 completion

Decision: DEFER to Slice 8 (post-MVP)
Rationale: Wishlist is "Should Have" (not "Must Have").
           Adding it delays core shopping cart functionality.
           Will be first feature in post-MVP backlog.
```

### 6.2 Scenario: Acceptance Criteria Clarification

**Situation**: During development, acceptance criteria found to be ambiguous

**Process**:
1. **Document Ambiguity**: Note what's unclear
2. **Propose Clarification**: Draft updated AC
3. **Evaluate Impact**:
   - Does it change scope? → Change request
   - Just clarification? → Update story directly
4. **Update Story**: Add clarification to story
5. **Note in Daily Log**: "Clarified US-XXX acceptance criteria"

**Example**:
```markdown
Original AC: "User can sort products"
Ambiguous: Sort by what? (price, name, rating?)

Clarified AC:
- User can sort products by: price (low-high, high-low),
  name (A-Z, Z-A), rating (high-low)
- Sort persists across page refreshes

Impact: +1 story point (3 → 4)
Decision: Approved - within reasonable scope expansion
```

### 6.3 Scenario: Technology Stack Change

**Situation**: Discover better technology mid-development (e.g., switch from REST to GraphQL)

**Process**:
1. **Spike Investigation**: Time-box research (1-2 days)
2. **Document Findings**: Pros/cons, migration effort, risks
3. **Impact Analysis**:
   - Stories affected: [List]
   - Re-work required: X hours/days
   - New story points: +Y
   - Timeline delay: Z weeks
4. **Decision Criteria**:
   - Is current approach failing? (If no → defer)
   - Does new tech solve critical problem? (If no → defer)
   - Can we afford the delay? (Check MVP timeline)
5. **Document Decision**: Architecture Decision Record (ADR)

**Example**:
```markdown
Change Request: Switch from REST to GraphQL

Investigation: 2-day spike completed
Pros: Better data fetching, type safety, fewer requests
Cons: Learning curve, migration effort, more complex setup

Impact:
- Stories affected: US-001 through US-010 (all API-related)
- Re-work: 40 hours (~1 week)
- Timeline delay: 1-2 weeks
- New dependencies: Apollo Client, GraphQL tools

Decision: DEFER to post-MVP
Rationale: REST is working fine for MVP scope.
           GraphQL adds complexity without solving a current problem.
           Revisit after MVP launch if API performance becomes issue.
```

### 6.4 Scenario: Removing a "Must Have" Story

**Situation**: Story turns out more complex than estimated, considering removal

**Process**:
1. **Understand Why**: Is it complexity, risk, or timeline pressure?
2. **Evaluate Alternatives**:
   - Can we simplify the story? (Remove edge cases)
   - Can we split into smaller stories? (Keep core, defer advanced)
   - Is it truly "Must Have"? (Re-evaluate MoSCoW)
3. **Impact Analysis**:
   - What breaks if we remove it?
   - Can users complete core workflows without it?
   - What's the user impact?
4. **Decision**:
   - **Keep**: Adjust timeline, request more time
   - **Simplify**: Reduce scope to core functionality
   - **Defer**: Move to "Should Have" post-MVP
   - **Remove**: Drop entirely (rare for Must Have)

**Example**:
```markdown
Change Request: Simplify US-011 (Payment Processing)

Current Scope:
- Credit card payment
- PayPal integration
- Apple Pay integration
- Google Pay integration
Estimate: 8 points (too large)

Proposed Simplified Scope:
- Credit card payment only (Stripe test mode)
- "Payment successful" simulation
Estimate: 5 points

Impact:
- Removes 3 points from Slice 3
- Defers PayPal/Apple Pay/Google Pay to post-MVP
- MVP still has functional checkout

Decision: APPROVED - Simplify to credit card only
Rationale: For educational portfolio, demonstrating one payment
           method is sufficient. Can add others post-MVP.
```

---

## 7. Change Tracking & Metrics

### 7.1 Change Log

**Maintain Change Log** in `docs/changelog.md`:

```markdown
# Change Log

## [Sprint 2] - 2025-11-03

### Added
- US-040: Wishlist feature (deferred from Slice 1)

### Changed
- US-011: Simplified to credit card only (was: all payment methods)
- US-003: Added sort by rating (was: price and name only)

### Removed
- US-025: Advanced search filters (moved to post-MVP)

### Impact
- Sprint 2: -3 story points
- Timeline: No change
- MVP scope: 35 → 32 stories
```

### 7.2 Change Metrics

**Track these metrics** (see [Metrics Tracking Plan](10.metrics-tracking-plan.md)):

| Metric | Definition | Target | Use Case |
|--------|-----------|--------|----------|
| **Requirements Churn** | % of stories changed after sprint start | <10% | Measure requirements stability |
| **Change Request Volume** | # of change requests per sprint | <3 | Monitor change frequency |
| **Change Approval Rate** | % of change requests approved | 40-60% | Assess gatekeeping balance |
| **Change Cycle Time** | Days from request to decision | <2 days | Ensure fast turnaround |

**Monthly Change Review**:
- Review all changes from past month
- Identify patterns (e.g., many changes from unclear ACs)
- Improve requirements process to reduce churn

---

## 8. Communication of Changes

### 8.1 Change Notification

**When a change is approved**:

1. **Update GitHub Projects**:
   - Update affected stories
   - Add comment: "Changed due to CR-XXX"
   - Update story points if needed
   - Adjust sprint if needed

2. **Update Documentation**:
   - Update product backlog
   - Update vertical slices plan if scope changed
   - Update sprint plan if timeline affected

3. **Communicate** (Solo developer):
   - Add to sprint journal
   - Note in daily log
   - Update demo script if needed

4. **Communicate** (Future team context):
   - Email stakeholders
   - Post in team chat
   - Discuss in next daily standup
   - Update sprint dashboard

### 8.2 Change Communication Template

```markdown
## Change Notification: [Brief Title]

**Change Request**: CR-XXX
**Decision**: Approved / Deferred / Rejected
**Decision Date**: YYYY-MM-DD

**Summary**:
[1-2 sentence summary of what changed and why]

**Impact**:
- **Stories Affected**: US-XXX, US-YYY
- **Story Point Change**: ±X points
- **Timeline Impact**: [None / X days delay / X days saved]
- **Sprint Impact**: [Current sprint / Next sprint / Post-MVP]

**Action Required**:
- [ ] Developers: Review updated stories
- [ ] QA: Update test plans
- [ ] Documentation: Update affected docs

**Questions?** Comment on GitHub issue CR-XXX
```

---

## 9. Change Management Tools

### 9.1 GitHub Integration

**Labels**:
- `change-request`: For formal change requests
- `scope-change`: Affects MVP scope
- `priority-change`: Affects story priority
- `technical-change`: Architecture or technology change

**Projects**:
- Add change requests to "Change Requests" project board
- Track status: Submitted → Analysis → Decision → Implemented

**Templates**:
- Create `.github/ISSUE_TEMPLATE/change-request.md`

### 9.2 Documentation

**Required Documents**:
- `docs/changelog.md`: Change log
- `docs/decisions/`: Architecture Decision Records (ADRs)
- `docs/change-requests/`: Detailed change request analysis (if complex)

**ADR Template** (`docs/decisions/ADR-XXX-title.md`):
```markdown
# ADR-XXX: [Brief Decision Title]

**Status**: Proposed / Accepted / Deprecated / Superseded
**Date**: YYYY-MM-DD
**Decision Makers**: [Names]

## Context
[What is the issue we're facing?]

## Decision
[What decision did we make?]

## Rationale
[Why did we choose this option?]

## Consequences
[What are the positive and negative impacts?]

## Alternatives Considered
[What other options did we evaluate?]

## Related Changes
- Change Request: CR-XXX
- Affected Stories: US-YYY, US-ZZZ
```

---

## 10. Change Management Best Practices

### 10.1 Do's

✅ **Do embrace change** - Agile expects and welcomes change
✅ **Do document decisions** - Future you will thank you
✅ **Do analyze impact** - Understand before committing
✅ **Do communicate clearly** - Keep stakeholders informed
✅ **Do learn from changes** - Update process to prevent churn
✅ **Do protect quality** - Quality gates are non-negotiable
✅ **Do time-box analysis** - Don't over-analyze (24-48 hours max)
✅ **Do consider alternatives** - Explore multiple options
✅ **Do update documentation** - Keep docs in sync with reality
✅ **Do celebrate good changes** - Improvements are wins

### 10.2 Don'ts

❌ **Don't change mid-sprint** unless critical
❌ **Don't skip impact analysis** - Even "small" changes have ripples
❌ **Don't say yes to everything** - Protect sprint commitment
❌ **Don't hide changes** - Transparency builds trust
❌ **Don't skip retrospectives** - Learn from change patterns
❌ **Don't compromise quality** - No shortcuts on testing/security
❌ **Don't over-process** - Keep it lightweight and fast
❌ **Don't forget "why"** - Document rationale, not just "what"
❌ **Don't defer decisions** indefinitely - Decide within 48 hours
❌ **Don't punish change requests** - Encourage open discussion

### 10.3 Change Management Anti-Patterns

**1. Scope Creep**:
- **Pattern**: Continuously adding features without removing others
- **Impact**: MVP never launches, timeline balloons
- **Solution**: Enforce MoSCoW, require tradeoffs (add = remove)

**2. Analysis Paralysis**:
- **Pattern**: Spending weeks analyzing change requests
- **Impact**: Slow decision-making, missed opportunities
- **Solution**: Time-box analysis (24-48 hours), bias toward action

**3. Rubber Stamping**:
- **Pattern**: Approving all changes without analysis
- **Impact**: Chaos, blown timelines, quality issues
- **Solution**: Enforce impact analysis, track churn metrics

**4. Change Freezing**:
- **Pattern**: Refusing all changes after initial planning
- **Impact**: Building the wrong thing, ignoring feedback
- **Solution**: Balance stability with adaptability, embrace valuable changes

**5. Undocumented Changes**:
- **Pattern**: Making changes verbally without documentation
- **Impact**: Lost context, confusion, rework
- **Solution**: "If it's not in GitHub, it didn't happen"

---

## 11. Change Management for Different Contexts

### 11.1 Solo Developer (Current)

**Lightweight Process**:
1. Create GitHub issue for medium/high-risk changes
2. Write brief impact analysis (15-30 min)
3. Make decision (document rationale)
4. Update backlog and docs
5. Note in sprint journal

**Focus**: Speed and documentation (for future reference)

### 11.2 Small Team (2-5 people)

**Collaborative Process**:
1. Change request submitted by anyone
2. Team reviews in next daily standup or refinement
3. Product Owner makes final call
4. Team updates documentation together
5. Changes communicated via team chat

**Focus**: Team alignment and shared understanding

### 11.3 Large Team (10+ people)

**Formal Process**:
1. Change request form submitted via tool (Jira, Azure DevOps)
2. Change Control Board (CCB) reviews weekly
3. Impact analysis by affected teams
4. Formal approval required before implementation
5. Change notifications sent to all stakeholders
6. Metrics tracked in dashboard

**Focus**: Governance and risk management

---

## 12. Change Management Checklist

**Before Requesting Change**:
- [ ] Is this truly necessary, or nice-to-have?
- [ ] Can this wait until next sprint or post-MVP?
- [ ] Have I considered the impact on timeline and quality?
- [ ] Do I have a clear rationale for this change?

**During Change Request**:
- [ ] GitHub issue created with `change-request` label
- [ ] Impact analysis completed (stories, points, timeline, quality)
- [ ] Alternatives documented
- [ ] Risk assessment performed
- [ ] Decision made and documented within 48 hours

**After Change Approved**:
- [ ] GitHub Projects updated (stories, points, sprint)
- [ ] Product backlog updated
- [ ] Documentation updated (vertical slices, sprint plan)
- [ ] Change log updated
- [ ] Stakeholders notified
- [ ] ADR created (if architectural change)

**After Change Implemented**:
- [ ] Change request issue closed
- [ ] Retrospective includes change discussion
- [ ] Metrics updated (requirements churn)
- [ ] Lessons learned documented

---

## 13. Document Control

**Version History**:

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2025-10-19 | Antonio Gomez Gallardo | Initial change management process (Module 01 alignment) |

**Next Review**: After Sprint 2 (adjust based on change request volume and complexity)

**Related Documents**:
- [Product Backlog](5.product-backlog.md) - User stories affected by changes
- [Vertical Slices](6.vertical-slices.md) - Slice composition affected by changes
- [Definition of Ready](7.definition-of-ready.md) - Story readiness criteria
- [Metrics Tracking Plan](10.metrics-tracking-plan.md) - Change metrics tracking

---

*This change management process follows Module 01: Requirements Engineering from the quality-standards documentation, emphasizing agility with control and transparent decision-making.*
