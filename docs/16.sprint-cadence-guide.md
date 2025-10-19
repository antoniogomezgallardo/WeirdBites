# WeirdBites - Sprint Cadence Guide

**Version**: 1.0.0
**Date**: 2025-10-19
**Purpose**: Define the complete sprint cadence, ceremonies, and weekly rhythm
**Reference**: Module 02 - Agile Planning (Sprint Ceremonies)

---

## Executive Summary

This document defines the **complete sprint rhythm** for WeirdBites development. It expands on the Scrumban framework defined in the BRD and provides detailed guidance for running each sprint.

**Sprint Duration**: 1 week (Monday - Sunday)
**Sprint Capacity**: 10-15 story points
**Framework**: Hybrid Scrum/Kanban (Scrumban)
**Context**: Solo developer, part-time (20-30 hours/week)

---

## 1. Weekly Sprint Rhythm

### 1.1 Sprint Calendar

```
MONDAY (Sprint Day 1)
─────────────────────────────────────────
Morning:
  09:00-10:00  Sprint Planning
  10:00-10:15  Daily Standup (written)
  10:15-12:00  Development

Afternoon:
  13:00-17:00  Development

TUESDAY (Sprint Day 2)
─────────────────────────────────────────
Morning:
  09:00-09:15  Daily Standup (written)
  09:15-12:00  Development

Afternoon:
  13:00-17:00  Development

WEDNESDAY (Sprint Day 3)
─────────────────────────────────────────
Morning:
  09:00-09:15  Daily Standup (written)
  09:15-12:00  Development

Afternoon:
  13:00-14:30  Development
  14:30-16:00  Backlog Refinement
  16:00-17:00  Development

THURSDAY (Sprint Day 4)
─────────────────────────────────────────
Morning:
  09:00-09:15  Daily Standup (written)
  09:15-12:00  Development

Afternoon:
  13:00-17:00  Development

FRIDAY (Sprint Day 5)
─────────────────────────────────────────
Morning:
  09:00-09:15  Daily Standup (written)
  09:15-12:00  Development

Afternoon:
  13:00-17:00  Development

SATURDAY (Sprint Day 6)
─────────────────────────────────────────
Optional:
  09:00-09:15  Daily Standup (written, if working)
  09:15-12:00  Development (if needed)

SUNDAY (Sprint Day 7)
─────────────────────────────────────────
Afternoon:
  14:00-15:00  Sprint Review (demo)
  15:00-16:00  Sprint Retrospective
  16:00-17:00  Metrics Update & Planning Prep
```

**Total Work Hours**: 24-30 hours (flexible, part-time schedule)

### 1.2 Sprint Boundaries

**Sprint Start**: Monday 09:00 AM
**Sprint End**: Sunday 17:00 PM
**Sprint Length**: 7 days (168 hours)
**Working Days**: 5-6 days (Monday-Friday required, Saturday optional)

---

## 2. Sprint Ceremonies (Detailed)

### 2.1 Sprint Planning (Monday, 60 min)

**Time**: Monday 09:00-10:00
**Duration**: 60 minutes
**Participants**: Developer/QAE (solo)
**Input**: Product Backlog, previous sprint velocity
**Output**: Sprint Backlog, Sprint Goal

**Agenda**:

**Part 1: Sprint Goal (15 min)**
- Review vertical slice for this sprint
- Define sprint goal (1-2 sentences)
- Align with MVP milestones

Example Sprint Goal:
> "Enable users to browse all products and view product details"

**Part 2: Capacity Planning (10 min)**
- Review last 3 sprints' velocity
- Calculate 3-sprint rolling average
- Adjust for holidays, time off, other commitments
- Set sprint commitment (story points)

**Part 3: Story Selection (20 min)**
- Pull stories from backlog (top priority, DoR met)
- Verify each story meets Definition of Ready
- Ensure total points ≤ capacity
- Add stretch goal (optional, low priority story)

**Part 4: Task Breakdown (15 min)**
- Break each story into tasks
- Estimate tasks in hours
- Identify dependencies and risks
- Create sprint plan document (from template)

**Checklist**:
- [ ] Sprint goal defined
- [ ] Capacity calculated
- [ ] Stories selected (all DoR met)
- [ ] Total points ≤ capacity
- [ ] Tasks identified
- [ ] Sprint plan documented
- [ ] GitHub Projects updated with sprint label

**Template**: [Sprint Planning Template](templates/sprint-planning-template.md)

---

### 2.2 Daily Standup (Daily, 10 min)

**Time**: Every morning, 09:00-09:10 (or 09:00-09:15 if more complex)
**Duration**: 5-10 minutes
**Format**: Written log (not verbal, solo developer)
**Output**: Daily log file

**Template**:

```markdown
# Daily Log - YYYY-MM-DD

## Sprint X, Day Y

**Yesterday**:
- [What did I complete?]
- [What did I learn?]

**Today**:
- [What will I work on?]
- [What are my goals?]

**Blockers**:
- [Any impediments? None if clear]

**Progress**:
- Stories completed: X/Y
- Story points completed: Z/W
- Stories in progress: [US-XXX]
- WIP: X (target: ≤2)

**Notes**:
- [Any observations, decisions, or learnings]
```

**Example**:

```markdown
# Daily Log - 2025-10-21

## Sprint 1, Day 1

**Yesterday**:
- Completed sprint planning
- Set up development environment

**Today**:
- Start US-001 (Browse Products)
- Implement product listing API
- Write unit tests for Product model

**Blockers**:
- None

**Progress**:
- Stories completed: 0/3
- Story points completed: 0/13
- Stories in progress: US-001 (5 points)
- WIP: 1

**Notes**:
- Using Next.js App Router for first time, following docs closely
- TDD approach: writing tests before implementation
```

**Storage**: `docs/daily-logs/YYYY-MM-DD.md`

**Benefits**:
- Accountability (even solo)
- Progress tracking
- Historical record (useful for retrospectives)
- Identify patterns (blockers, productivity)

---

### 2.3 Backlog Refinement (Wednesday, 90 min)

**Time**: Wednesday 14:30-16:00
**Duration**: 90 minutes
**Purpose**: Prepare stories for next sprint
**Output**: Refined stories meeting DoR

**Agenda**:

**Part 1: Review Upcoming Stories (30 min)**
- Pull top 5-7 stories from backlog (next sprint candidates)
- Read each story, ask clarifying questions
- Identify missing information

**Part 2: Apply Definition of Ready (30 min)**
- For each story, check DoR checklist:
  - [ ] Story follows template (As a... I want... So that...)
  - [ ] Acceptance criteria defined (Given-When-Then)
  - [ ] Story is independent (not tightly coupled)
  - [ ] Story is negotiable (can adjust scope)
  - [ ] Story is valuable (clear user/business value)
  - [ ] Story is estimatable (clear scope)
  - [ ] Story is small (≤8 points)
  - [ ] Story is testable (acceptance criteria = test cases)
  - [ ] UI mockups available (if UI change)
  - [ ] Dependencies identified

**Part 3: Story Estimation (20 min)**
- Estimate each story in story points (Fibonacci: 1, 2, 3, 5, 8, 13)
- Use Planning Poker (with yourself - compare to similar past stories)
- Document estimation rationale

**Part 4: Story Splitting (10 min if needed)**
- If any story >8 points, split into smaller stories
- Ensure each split story is still valuable
- Update backlog

**Checklist**:
- [ ] Top 5-7 stories reviewed
- [ ] DoR applied to each story
- [ ] All stories estimated
- [ ] Large stories split (if needed)
- [ ] Stories ready for next sprint planning

**Output**: At least 15-20 story points ready for next sprint

---

### 2.4 Sprint Review (Sunday, 60 min)

**Time**: Sunday 14:00-15:00
**Duration**: 60 minutes
**Format**: Demo video or written summary
**Audience**: Self (portfolio), optionally mentors/peers
**Output**: Demo recording or summary document

**Agenda**:

**Part 1: Demo Preparation (10 min)**
- Test all completed stories in staging environment
- Prepare demo script (user scenarios)
- Screen record setup (OBS or Loom)

**Part 2: Demo Recording (30 min)**
- Record walkthrough of completed features
- Follow user scenarios (e.g., "As Sarah, I browse products...")
- Show acceptance criteria being met
- Highlight interesting technical details (if relevant)

Demo Script Example:
```
"This sprint, I completed 3 stories totaling 13 points.

Story 1: US-001 Browse All Products
- [Show product listing page]
- [Demonstrate grid layout, responsive design]
- [Show filter and sort working]
- Acceptance criteria met: ✓ All 12 products shown, ✓ Grid layout, ✓ Price and rating visible

Story 2: US-002 View Product Details
- [Click product, show detail page]
- [Show all product information]
- [Demonstrate breadcrumb navigation]
- Acceptance criteria met: ✓ All details shown, ✓ Images displayed, ✓ Add to cart button present

Story 3: US-003 View Product Images
- [Show image gallery]
- [Demonstrate zoom functionality]
- [Show thumbnail navigation]
- Acceptance criteria met: ✓ 4 images shown, ✓ Zoom works, ✓ Navigation works

Sprint goal achieved: ✓ Users can browse and view product details

Next sprint: Shopping cart functionality"
```

**Part 3: Metrics Review (10 min)**
- Review sprint metrics (velocity, coverage, quality)
- Compare against targets
- Note any trends (improving, declining, stable)

**Part 4: Stakeholder Feedback (10 min if applicable)**
- Share demo with mentor or peer
- Collect feedback
- Document for backlog refinement

**Checklist**:
- [ ] All completed stories demoed
- [ ] Sprint goal achievement stated
- [ ] Metrics reviewed
- [ ] Demo recorded or summary written
- [ ] Feedback collected (if applicable)

**Storage**:
- Demo video: Upload to YouTube (unlisted) or Loom
- Summary: `docs/sprint-reviews/sprint-X-review.md`

---

### 2.5 Sprint Retrospective (Sunday, 60 min)

**Time**: Sunday 15:00-16:00 (immediately after Sprint Review)
**Duration**: 60 minutes
**Format**: Written retrospective (using template)
**Output**: Retrospective document + action items

**Agenda**:

**Part 1: Data Gathering (15 min)**
- Review metrics (velocity, coverage, defects, etc.)
- Review daily logs (patterns, blockers)
- Reflect on week (what went well, what didn't)

**Part 2: Generate Insights (20 min)**
- Use retrospective format (e.g., Mad/Sad/Glad)
- Identify 3-5 things that went well
- Identify 3-5 things that didn't go well
- Brainstorm improvements for each problem

**Part 3: Decide Actions (15 min)**
- Select 1-2 actionable improvements
- Make them specific and measurable (SMART)
- Assign to backlog (as stories or tasks)
- Set due date (usually: before next sprint)

**Part 4: Document (10 min)**
- Complete retrospective template
- Update process documents if needed
- Close retrospective issue in GitHub

**Example Action Items**:
```
Problem: E2E tests are flaky (20% failure rate)
Root Cause: Race conditions, missing explicit waits
Action: Add retry logic and explicit waits to Playwright tests
Owner: Developer
Due: Before Sprint 2
Success Metric: Flaky rate <5%
```

**Checklist**:
- [ ] Metrics reviewed
- [ ] What went well identified (3-5 items)
- [ ] What didn't go well identified (3-5 items)
- [ ] Action items defined (1-2 specific, measurable)
- [ ] Action items added to backlog
- [ ] Retrospective documented
- [ ] Previous sprint's action items reviewed (completed?)

**Template**: [Sprint Retrospective Template](templates/sprint-retrospective-template.md)

**Storage**: `docs/retrospectives/sprint-X-retrospective.md`

---

## 3. Sprint Artifacts

### 3.1 Sprint Plan

**Created**: During Sprint Planning (Monday)
**Owner**: Developer/QAE
**Purpose**: Document sprint commitment and tasks
**Location**: `docs/sprint-plans/sprint-X-plan.md`

**Contents**:
- Sprint goal
- Sprint capacity
- Committed stories (with story points)
- Task breakdown (with hour estimates)
- Risks and mitigation
- Ceremony schedule

### 3.2 Sprint Backlog

**Created**: During Sprint Planning (Monday)
**Updated**: Daily (as work progresses)
**Owner**: Developer/QAE
**Location**: GitHub Projects (Kanban board)

**Contents**:
- Stories committed to sprint
- Tasks for each story
- Story status (To Do, In Progress, In Review, Done)
- Story points and remaining work

### 3.3 Daily Logs

**Created**: Every working day
**Owner**: Developer/QAE
**Purpose**: Track progress, blockers, learnings
**Location**: `docs/daily-logs/YYYY-MM-DD.md`

**Contents** (see section 2.2 for template):
- Yesterday's accomplishments
- Today's plan
- Blockers
- Progress metrics
- Notes/learnings

### 3.4 Sprint Review Summary

**Created**: Sunday (end of sprint)
**Owner**: Developer/QAE
**Purpose**: Demo completed work, show value delivered
**Location**: `docs/sprint-reviews/sprint-X-review.md` + video

**Contents**:
- Completed stories (with demo)
- Sprint goal achievement
- Metrics (velocity, coverage, quality)
- Stakeholder feedback

### 3.5 Sprint Retrospective

**Created**: Sunday (end of sprint)
**Owner**: Developer/QAE
**Purpose**: Reflect and improve
**Location**: `docs/retrospectives/sprint-X-retrospective.md`

**Contents**:
- What went well
- What didn't go well
- Action items (specific, measurable)
- Metrics review

### 3.6 Increment

**Created**: End of every sprint (Sunday)
**Owner**: Developer/QAE
**Purpose**: Potentially shippable product increment
**Location**: `main` branch (merged via PR)

**Definition**:
- All sprint stories meet Definition of Done
- All tests passing (unit, integration, E2E)
- Code coverage >80%
- No critical bugs
- Deployed to staging environment

---

## 4. Sprint Metrics Tracking

### 4.1 Metrics to Track (Weekly)

**Progress Metrics**:
- Velocity (story points completed)
- Commitment reliability (% of stories completed)
- Sprint burndown (story points remaining per day)

**Quality Metrics**:
- Code coverage (%)
- Test pass rate (%)
- Defects found (count)
- Lighthouse score

**Process Metrics**:
- Stories meeting DoR (%)
- WIP (count, target ≤2)
- Lead time (days from start to done)
- Cycle time (days from in-progress to done)

### 4.2 Metrics Collection Process

**Monday (Sprint Planning)**:
- Record planned story points
- Set sprint goal

**Daily (Standup)**:
- Update story status in GitHub Projects
- Record remaining story points (for burndown)

**Sunday (Sprint Review)**:
- Record completed story points
- Calculate velocity
- Calculate commitment reliability
- Update Google Sheets dashboard

**Sunday (Retrospective)**:
- Review all metrics
- Identify trends (improving, stable, declining)
- Define improvement actions

### 4.3 Metrics Dashboard

**Google Sheets**: "WeirdBites Metrics Dashboard"

**Sheet 1: Sprint Summary**
| Sprint | Dates | Planned | Completed | Velocity | Commitment % |
|--------|-------|---------|-----------|----------|--------------|
| Sprint 1 | Oct 21-27 | 13 | TBD | TBD | TBD |

**Sheet 2: Quality Metrics**
| Sprint | Coverage | Test Pass | Defects | Lighthouse |
|--------|----------|-----------|---------|------------|
| Sprint 1 | TBD | TBD | TBD | TBD |

**Sheet 3: Velocity Chart**
(Line chart: Sprint # vs. Story Points Completed)

---

## 5. Time Management

### 5.1 Time Allocation by Activity

**Development** (70% = 16-21 hours/week):
- Coding (40%)
- Testing (20%)
- Code review (5%)
- Refactoring (5%)

**Ceremonies** (15% = 3-4 hours/week):
- Sprint Planning: 1 hour
- Daily Standup: 0.75 hours (10 min × 5 days)
- Backlog Refinement: 1.5 hours
- Sprint Review: 1 hour
- Sprint Retrospective: 1 hour

**Documentation** (10% = 2-3 hours/week):
- Daily logs: 0.5 hours
- Sprint artifacts: 1 hour
- Technical docs: 0.5-1 hour

**Learning** (5% = 1-2 hours/week):
- New technologies
- Best practices
- Code reviews of open-source projects

### 5.2 Typical Work Week

**Full-Time (40 hours/week)**:
- Mon-Fri: 8 hours/day
- Ceremonies: 5 hours
- Development: 28 hours
- Documentation: 4 hours
- Learning: 3 hours

**Part-Time (24 hours/week)** ← WeirdBites schedule:
- Mon-Fri: 4-5 hours/day
- Ceremonies: 3 hours
- Development: 17 hours
- Documentation: 2 hours
- Learning: 2 hours

### 5.3 Focus Time Blocks

**Morning Block** (09:15-12:00):
- 2.75 hours of focused development
- No meetings (except Monday planning)
- Deep work (complex features, architecture)

**Afternoon Block** (13:00-17:00):
- 4 hours (with breaks)
- Testing, code review, documentation
- Lighter tasks (CSS, refactoring)

**Wednesday Mid-Block** (14:30-16:00):
- 1.5 hours backlog refinement
- Planning for next sprint

---

## 6. Sprint Cadence Anti-Patterns

### 6.1 What to Avoid

**Anti-Pattern 1: Skipping Ceremonies**
- Problem: "Too busy coding to plan/review"
- Impact: Lack of direction, missed improvements
- Solution: Ceremonies are non-negotiable (even solo)

**Anti-Pattern 2: Inconsistent Schedule**
- Problem: Sprint on random days, irregular work hours
- Impact: Unpredictable velocity, poor planning
- Solution: Fixed sprint boundaries (Monday-Sunday)

**Anti-Pattern 3: Over-Committing**
- Problem: Committing 20 points when velocity is 12
- Impact: Burnout, incomplete sprints, low morale
- Solution: Use rolling 3-sprint average for capacity

**Anti-Pattern 4: No Daily Logs**
- Problem: "I'll remember what I did"
- Impact: Lost context, poor retrospectives
- Solution: 5-minute daily log (non-negotiable)

**Anti-Pattern 5: Skipping Retrospectives**
- Problem: "Sprint went fine, nothing to improve"
- Impact: No continuous improvement, repeated mistakes
- Solution: Every sprint needs retrospective (even if short)

**Anti-Pattern 6: Working Without Breaks**
- Problem: 8-hour coding marathons
- Impact: Burnout, poor code quality, mistakes
- Solution: Pomodoro (25 min work, 5 min break)

---

## 7. Sprint Cadence Checklist

### 7.1 Monday (Sprint Start)

- [ ] Sprint Planning completed (60 min)
- [ ] Sprint goal defined
- [ ] Stories selected (all DoR met)
- [ ] Sprint plan documented
- [ ] GitHub Projects updated with sprint label
- [ ] Daily standup written
- [ ] First development session started

### 7.2 Tuesday-Friday (Development Days)

- [ ] Daily standup written (every morning)
- [ ] GitHub Projects updated (story status)
- [ ] Code committed daily (small, frequent commits)
- [ ] Tests written (TDD approach)
- [ ] Code reviewed (self-review before PR)

### 7.3 Wednesday (Mid-Sprint)

- [ ] Daily standup written
- [ ] Backlog refinement completed (90 min)
- [ ] Next sprint stories prepared (DoR applied)
- [ ] Stories estimated
- [ ] GitHub Projects updated

### 7.4 Sunday (Sprint End)

- [ ] All committed stories completed (or rolled to next sprint)
- [ ] Sprint Review completed (demo recorded/written)
- [ ] Sprint Retrospective completed
- [ ] Action items documented and added to backlog
- [ ] Metrics updated in Google Sheets
- [ ] Next sprint prep (pull refined stories to "Ready" column)

---

## 8. Document Control

**Version History**:

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2025-10-19 | Antonio Gomez Gallardo | Initial sprint cadence guide (Module 02 alignment) |

**Next Review**: After Sprint 2 (validate cadence effectiveness)

**Related Documents**:
- [Business Requirements](1.business-requirements.md) - Section 12: Quality Framework (Scrumban approach)
- [Sprint Planning Template](templates/sprint-planning-template.md)
- [Sprint Retrospective Template](templates/sprint-retrospective-template.md)
- [Velocity Tracking System](12.velocity-tracking-system.md)
- [Metrics Tracking Plan](10.metrics-tracking-plan.md)

---

*This sprint cadence guide follows Module 02: Agile Planning from the quality-standards documentation, emphasizing rhythm, consistency, and continuous improvement.*
