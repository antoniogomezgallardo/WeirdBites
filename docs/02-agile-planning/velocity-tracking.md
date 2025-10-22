# WeirdBites - Velocity Tracking System

**Version**: 1.0.0
**Date**: 2025-10-19
**Purpose**: Define how velocity is tracked, calculated, and used for sprint planning and forecasting
**Reference**: Module 02 - Agile Planning (Velocity & Estimation)

---

## Overview

Velocity is a key agile metric that measures how much work a team completes in a sprint, typically measured in story points. This document defines how WeirdBites tracks velocity, interprets trends, and uses velocity data for planning and forecasting.

**Key Benefits**:

- **Predictability**: Forecast future sprint capacity
- **Planning**: Set realistic sprint commitments
- **Improvement**: Track team productivity trends
- **Transparency**: Data-driven conversations about capacity

---

## 1. Velocity Definition

### 1.1 What is Velocity?

**Velocity** = **Sum of story points completed in a sprint**

**Key Points**:

- ✅ Only **completed** stories count (met DoD)
- ❌ **In-progress** stories don't count
- ❌ **Partially completed** stories don't count
- ✅ Count actual points, not adjusted points
- ✅ Include all types of stories (features, bugs, technical debt)

**Example**:

```
Sprint 1 Commitment:
- US-001 (5 points) → ✅ Completed
- US-002 (5 points) → ✅ Completed
- US-003 (3 points) → ❌ Not completed (rolled to Sprint 2)

Sprint 1 Velocity = 5 + 5 = 10 points
```

### 1.2 What Velocity is NOT

**Velocity is NOT**:

- ❌ A measure of individual productivity
- ❌ A metric to compare teams
- ❌ A target to maximize (quality matters more)
- ❌ A performance review metric
- ❌ Constant (varies sprint to sprint)

**Velocity is a PLANNING tool**, not a judgment of worth.

---

## 2. Velocity Calculation

### 2.1 Basic Calculation

**Formula**:

```
Velocity = Σ (Story Points of Completed Stories)
```

**Example Sprint 2**:
| Story | Points | Status | Counts? |
|-------|--------|--------|---------|
| US-004 | 5 | ✅ Done | Yes |
| US-005 | 3 | ✅ Done | Yes |
| US-006 | 3 | ✅ Done | Yes |
| US-007 | 2 | 🟡 In Progress | No |

**Velocity = 5 + 3 + 3 = 11 points**

### 2.2 Rolling Average Velocity

**Why use average?**

- Individual sprints have variance
- Average smooths out outliers
- More reliable for planning

**3-Sprint Rolling Average**:

```
Avg Velocity = (Sprint N + Sprint N-1 + Sprint N-2) / 3
```

**Example**:
| Sprint | Velocity | 3-Sprint Average |
|--------|----------|------------------|
| Sprint 1 | 10 | 10 (only 1 sprint) |
| Sprint 2 | 11 | 10.5 (avg of 10, 11) |
| Sprint 3 | 12 | 11 (avg of 10, 11, 12) |
| Sprint 4 | 14 | 12.3 (avg of 11, 12, 14) |

**Use Case**: Plan Sprint 5 with capacity of ~12 points (based on 3-sprint average)

### 2.3 Weighted Average (Optional)

**Why weighted?**

- Recent sprints more relevant than old sprints
- Team velocity improves over time (learning effect)

**Weighted Formula**:

```
Weighted Avg = (Sprint N × 3) + (Sprint N-1 × 2) + (Sprint N-2 × 1) / 6
```

**Example (Sprint 4)**:

```
Weighted Avg = (14 × 3) + (12 × 2) + (11 × 1) / 6
             = (42 + 24 + 11) / 6
             = 77 / 6
             = 12.8 points
```

**Use Case**: When team velocity is rapidly improving, weighted average gives more emphasis to recent performance.

---

## 3. Velocity Tracking Process

### 3.1 Sprint Planning (Monday)

**Record Commitment**:

1. Open Google Sheets: `Metrics Dashboard → Sprint Summary`
2. Add new row for current sprint
3. Record:
   - Sprint number
   - Start date
   - End date
   - **Planned story points** (sum of committed stories)

**Example**:
| Sprint | Start Date | End Date | Planned (SP) | Completed (SP) | Velocity |
|--------|-----------|----------|--------------|----------------|----------|
| Sprint 5 | 2025-11-25 | 2025-12-01 | 13 | TBD | TBD |

### 3.2 During Sprint (Daily)

**Optional: Track Sprint Burndown**

Create daily log tracking remaining story points:

| Day | Date  | Remaining SP | Notes                  |
| --- | ----- | ------------ | ---------------------- |
| Mon | 11/25 | 13           | Sprint start           |
| Tue | 11/26 | 13           | US-010 in progress     |
| Wed | 11/27 | 8            | US-010 done (5 points) |
| Thu | 11/28 | 5            | US-011 done (3 points) |
| Fri | 11/29 | 2            | US-012 done (3 points) |
| Sat | 11/30 | 2            | Weekend break          |
| Sun | 12/01 | 0            | US-013 done (2 points) |

**Burndown Chart**:

```
Story Points
 14 |●
 12 |
 10 |  ●
  8 |    ●
  6 |      ●
  4 |        ●
  2 |          ●  ●
  0 |______________●_____
     M  T  W  T  F  S  S
```

### 3.3 Sprint Review (Sunday)

**Record Completion**:

1. Open Google Sheets: `Metrics Dashboard → Sprint Summary`
2. Update current sprint row:
   - **Completed story points** (sum of done stories)
   - **Velocity** (= Completed SP)
   - **Commitment Reliability** (= Completed / Planned × 100%)

**Example**:
| Sprint | Start Date | End Date | Planned (SP) | Completed (SP) | Velocity | Commitment Reliability |
|--------|-----------|----------|--------------|----------------|----------|------------------------|
| Sprint 5 | 2025-11-25 | 2025-12-01 | 13 | 13 | 13 | 100% |

### 3.4 Calculate Rolling Average

**After each sprint**:

1. Calculate 3-sprint rolling average
2. Update "Recommended Capacity" column
3. Use for next sprint planning

**Formula in Google Sheets**:

```
=AVERAGE(E3:E5)  // Average of last 3 velocities
```

---

## 4. Velocity Tracking Dashboard

### 4.1 Google Sheets Setup

**Sheet: Sprint Summary**

| A        | B          | C          | D            | E              | F        | G                      | H            |
| -------- | ---------- | ---------- | ------------ | -------------- | -------- | ---------------------- | ------------ |
| Sprint   | Start Date | End Date   | Planned (SP) | Completed (SP) | Velocity | Commitment Reliability | 3-Sprint Avg |
| Sprint 1 | 2025-10-21 | 2025-10-27 | 13           | 11             | 11       | 85%                    | 11           |
| Sprint 2 | 2025-10-28 | 2025-11-03 | 13           | 13             | 13       | 100%                   | 12           |
| Sprint 3 | 2025-11-04 | 2025-11-10 | 13           | 12             | 12       | 92%                    | 12           |
| Sprint 4 | 2025-11-11 | 2025-11-17 | 13           | 14             | 14       | 108%                   | 13           |

**Column Formulas**:

- **F (Velocity)**: `=E2` (Velocity = Completed SP)
- **G (Commitment Reliability)**: `=E2/D2*100` (format as percentage)
- **H (3-Sprint Avg)**: `=AVERAGE(F2:F4)` (average of last 3 velocities)

**Conditional Formatting**:

- **Commitment Reliability**:
  - Green: ≥85%
  - Yellow: 70-84%
  - Red: <70%
- **Velocity**:
  - Green: Within 10% of planned
  - Yellow: 10-20% variance
  - Red: >20% variance

### 4.2 Velocity Chart

**Line Chart**:

- **X-axis**: Sprint number
- **Y-axis**: Story points
- **Series**:
  - Planned SP (dotted line)
  - Completed SP (solid line)
  - 3-Sprint Avg (dashed line)

**Example Chart**:

```
Story Points
 16 |                    ●
 14 |                  ●
 12 |        ● ●  ●  ●
 10 |  ●  ●
  8 |
  6 |____________________________
     S1  S2  S3  S4  S5  S6  S7
```

### 4.3 Commitment Reliability Chart

**Bar Chart**:

- **X-axis**: Sprint number
- **Y-axis**: Percentage (0-120%)
- **Target line**: 85% (horizontal)

**Example**:

```
Percentage
120%|        ┃
100%|    ┃   ┃
 80%|┃   ┃   ┃
 60%|┃   ┃   ┃
 40%|┃   ┃   ┃
 20%|┃   ┃   ┃
  0%|┃___┃___┃__
     S1  S2  S3
```

---

## 5. Using Velocity for Planning

### 5.1 Sprint Planning

**Step 1: Review Historical Velocity**

```
Sprint 1: 10 points
Sprint 2: 11 points
Sprint 3: 12 points
Average: 11 points
```

**Step 2: Adjust for Capacity Changes**

- Holidays this sprint? Reduce 20-30%
- New to team? Reduce 10-20% for learning
- Technical debt sprint? Reduce 10-15%
- Stable sprint? Use average velocity

**Step 3: Set Sprint Commitment**

```
Base Capacity: 11 points (3-sprint average)
Adjustment: -2 points (1 day holiday)
Target Commitment: 9 points
```

**Step 4: Select Stories**

- Select stories totaling ~9 points
- Add buffer story (+2-3 points) as "stretch goal"
- If finish early, pull in buffer story

### 5.2 Release Planning

**How many sprints to complete remaining backlog?**

**Formula**:

```
Sprints Needed = Total Remaining Story Points / Average Velocity
```

**Example**:

```
Remaining MVP Stories: 85 story points
Average Velocity: 12 points/sprint
Sprints Needed: 85 / 12 = 7.08 ≈ 7-8 sprints
Timeline: 7-8 weeks
```

**With Buffer (Recommended)**:

```
Sprints with Buffer = Sprints Needed × 1.2 (20% buffer)
                    = 7 × 1.2 = 8.4 ≈ 9 sprints
Timeline: 9 weeks (conservative estimate)
```

### 5.3 Forecasting

**What-If Scenarios**:

**Scenario 1: Velocity Stays Constant**

```
Current Velocity: 12 points/sprint
Remaining Work: 60 points
Forecast: 60 / 12 = 5 sprints (5 weeks)
Completion Date: December 30, 2025
```

**Scenario 2: Velocity Improves 10%**

```
Improved Velocity: 12 × 1.1 = 13.2 points/sprint
Remaining Work: 60 points
Forecast: 60 / 13.2 = 4.5 ≈ 5 sprints
Completion Date: December 23, 2025 (1 week earlier)
```

**Scenario 3: Velocity Decreases 10%**

```
Decreased Velocity: 12 × 0.9 = 10.8 points/sprint
Remaining Work: 60 points
Forecast: 60 / 10.8 = 5.6 ≈ 6 sprints
Completion Date: January 6, 2026 (1 week later)
```

**Use Case**: Communicate realistic timelines to stakeholders with best/worst/most-likely scenarios

---

## 6. Velocity Interpretation

### 6.1 Healthy Velocity Patterns

**Pattern 1: Stable Velocity**

```
Sprint 1: 10, Sprint 2: 11, Sprint 3: 10, Sprint 4: 11
Interpretation: ✅ Predictable, good estimation
```

**Pattern 2: Gradually Increasing**

```
Sprint 1: 8, Sprint 2: 10, Sprint 3: 11, Sprint 4: 12
Interpretation: ✅ Team learning, improving efficiency
```

**Pattern 3: High Commitment Reliability**

```
Commitment: 85%, 92%, 90%, 88%
Interpretation: ✅ Good planning, realistic commitments
```

### 6.2 Concerning Velocity Patterns

**Pattern 1: Erratic Velocity**

```
Sprint 1: 5, Sprint 2: 15, Sprint 3: 8, Sprint 4: 14
Interpretation: ⚠️ Inconsistent estimation or unstable stories
Action: Improve story sizing, review estimation process
```

**Pattern 2: Declining Velocity**

```
Sprint 1: 14, Sprint 2: 12, Sprint 3: 10, Sprint 4: 8
Interpretation: ⚠️ Accumulating technical debt, burnout, blockers
Action: Investigate root cause, address technical debt, reduce WIP
```

**Pattern 3: Low Commitment Reliability**

```
Commitment: 60%, 65%, 70%, 55%
Interpretation: ⚠️ Over-committing or underestimating
Action: Reduce sprint commitment, break stories smaller, buffer capacity
```

**Pattern 4: Consistently Over-Delivering**

```
Planned: 10, Completed: 15 (150% commitment reliability)
Interpretation: ⚠️ Stories too small or sandbagging estimates
Action: Review story sizing, increase commitment
```

### 6.3 Velocity Variance

**Standard Deviation Formula**:

```
σ = √[ Σ(x - μ)² / N ]

Where:
- x = Individual sprint velocity
- μ = Average velocity
- N = Number of sprints
```

**Example Calculation**:

```
Velocities: 10, 11, 12, 11
Average: 11
Variance: [(10-11)² + (11-11)² + (12-11)² + (11-11)²] / 4
        = [1 + 0 + 1 + 0] / 4 = 0.5
Std Dev: √0.5 = 0.71 points
```

**Interpretation**:

- **Low variance (<2 points)**: ✅ Predictable velocity
- **Medium variance (2-4 points)**: ⚠️ Some inconsistency
- **High variance (>4 points)**: ⚠️ Unpredictable, investigate root cause

---

## 7. Factors Affecting Velocity

### 7.1 Internal Factors

**Team Size**:

- Solo developer: 10-15 points/week
- 2-person team: 20-30 points/week
- 5-person team: 50-70 points/week

**Experience Level**:

- New to tech stack: Lower initial velocity, ramps up
- Experienced: Higher stable velocity

**Technical Debt**:

- Low debt: Higher velocity
- High debt: Lower velocity (more time fixing issues)

**Testing Maturity**:

- Good test automation: Stable velocity
- Manual testing: Variable velocity

### 7.2 External Factors

**Holidays & Time Off**:

- 1 day off: -20% velocity
- 1 week off: -100% velocity (skip sprint or reduce drastically)

**Meetings & Interruptions**:

- High meeting load: -10-20% velocity
- Context switching: -15-30% velocity

**Unclear Requirements**:

- Many clarification questions: -20-40% velocity
- Well-defined stories: Higher velocity

**Dependencies & Blockers**:

- External dependencies: Unpredictable velocity
- Self-contained stories: Stable velocity

### 7.3 Adjusting for Factors

**Sprint Planning Adjustments**:

| Factor              | Adjustment | Example               |
| ------------------- | ---------- | --------------------- |
| 1 day holiday       | -20%       | 12 points → 10 points |
| New technology      | -30%       | 12 points → 8 points  |
| High technical debt | -15%       | 12 points → 10 points |
| Refactoring sprint  | -20%       | 12 points → 10 points |
| Stable sprint       | 0%         | 12 points → 12 points |

---

## 8. Improving Velocity

### 8.1 How to Improve Velocity (The Right Way)

✅ **Do**:

- **Improve estimation accuracy**: Better story sizing → less variance
- **Reduce technical debt**: Cleaner code → faster development
- **Automate testing**: Faster feedback → less rework
- **Clarify requirements**: Fewer questions → less delay
- **Remove blockers**: Faster resolution → continuous flow
- **Pair programming**: Knowledge sharing → less ramp-up time
- **Continuous learning**: Skill improvement → efficiency gains

✅ **Examples**:

- "Added API mocks, reduced E2E test time by 50%, gained 2 hours/sprint"
- "Refactored UserService, reduced complexity from 15 to 8, velocity increased 10%"
- "Improved DoR process, zero mid-sprint clarifications, velocity more stable"

### 8.2 How NOT to Improve Velocity

❌ **Don't**:

- **Inflate story points**: Makes velocity meaningless
- **Skip testing**: Short-term gain, long-term pain (technical debt)
- **Rush work**: Lower quality → more defects → slower velocity later
- **Work unsustainable hours**: Burnout → declining velocity
- **Cherry-pick easy stories**: Ignores important complex work
- **Compare to other teams**: Velocity is team-specific

❌ **Anti-Patterns**:

- "Let's call this 8 points instead of 5 to boost velocity"
- "Skip unit tests this sprint to go faster" → Bugs in production, slower next sprint
- "Work 60 hours this week to finish" → Exhausted next sprint, velocity crashes

### 8.3 Sustainable Velocity Improvement

**Continuous Improvement Cycle**:

1. **Measure**: Track velocity, metrics (lead time, defects, etc.)
2. **Analyze**: Identify bottlenecks (slow tests? Unclear stories?)
3. **Experiment**: Try one improvement (e.g., add test mocks)
4. **Measure**: Did velocity improve? Quality maintained?
5. **Decide**: Keep, adjust, or discard the change
6. **Repeat**: Continuous improvement

**Example Improvement Story**:

```
Problem: E2E tests take 15 minutes, slowing CI pipeline
Experiment: Add mocking layer for external APIs
Result: E2E tests now take 5 minutes (67% faster)
Impact: 2 hours/sprint saved, velocity increased from 11 → 13 points
Decision: Keep mocking layer, expand to more tests
```

---

## 9. Velocity Tracking Tools

### 9.1 Google Sheets (Primary)

**Setup**:

1. Create "Sprint Summary" sheet
2. Columns: Sprint, Start Date, End Date, Planned SP, Completed SP, Velocity, Commitment Reliability, 3-Sprint Avg
3. Add formulas for automatic calculation
4. Create charts: Velocity trend, Commitment reliability

**Benefits**:

- Free, accessible anywhere
- Easy to share
- Flexible for custom metrics
- Low overhead

### 9.2 GitHub Projects (Integrated)

**Setup**:

1. Add custom field: "Story Points" (number)
2. Add custom field: "Sprint" (text)
3. Create view: "Sprint X" (filter by sprint)
4. Sum story points in "Done" column

**Benefits**:

- Integrated with development workflow
- Automatic lead time / cycle time tracking
- No manual data entry

**Limitation**: No automatic velocity calculation (manual copy to Google Sheets)

### 9.3 Jira / Azure DevOps (Future)

**If transitioning to team project**:

- Built-in velocity charts
- Automatic burndown charts
- Historical velocity analysis
- Forecasting tools

---

## 10. Velocity Tracking Checklist

**Sprint Planning (Monday)**:

- [ ] Review last 3 sprints' velocity
- [ ] Calculate 3-sprint average
- [ ] Adjust for holidays, time off, other factors
- [ ] Set realistic sprint commitment (avg velocity ± adjustments)
- [ ] Record planned story points in Google Sheets

**During Sprint (Daily)**:

- [ ] (Optional) Update burndown chart
- [ ] Track remaining story points

**Sprint Review (Sunday)**:

- [ ] Count completed story points
- [ ] Record completed SP in Google Sheets
- [ ] Calculate velocity (= completed SP)
- [ ] Calculate commitment reliability (completed / planned)
- [ ] Update 3-sprint rolling average
- [ ] Note any anomalies (holidays, blockers, etc.)

**Sprint Retrospective (Sunday)**:

- [ ] Review velocity trend (increasing, stable, decreasing?)
- [ ] Discuss commitment reliability (<85%? Why?)
- [ ] Identify factors affecting velocity
- [ ] Define 1-2 actions to improve velocity (sustainably)
- [ ] Document learnings

**Monthly**:

- [ ] Review velocity over last 4-6 sprints
- [ ] Calculate velocity variance (standard deviation)
- [ ] Update release forecast based on current velocity
- [ ] Communicate updated timeline to stakeholders

---

## 11. Velocity FAQs

**Q: What's a "good" velocity?**
A: There's no universal "good" velocity. Velocity is team-specific. For WeirdBites (solo developer, part-time): 10-15 points/week is realistic. Focus on consistency, not magnitude.

**Q: Should I count partially completed stories?**
A: No. Only stories that meet Definition of Done count. Partial work creates inaccurate velocity data.

**Q: What if I finish early? Do I add more stories?**
A: Yes! Pull in "stretch goal" stories from the backlog. Count them in velocity. This is healthy.

**Q: What if I can't finish all committed stories?**
A: Roll them to next sprint. Don't count in current sprint velocity. Review why (underestimated? unexpected complexity? blockers?).

**Q: Can I change story points after sprint starts?**
A: No. Velocity loses meaning if points change mid-sprint. If story is way off, note in retrospective and improve future estimation.

**Q: Should velocity always increase?**
A: No. Velocity stabilizes after initial learning phase. Sustainable velocity > constantly increasing velocity. Quality matters more than speed.

**Q: How do I handle technical debt or bug fix sprints?**
A: Count story points the same way. If entire sprint is refactoring, velocity may be lower (that's okay). Note in sprint journal.

**Q: What if velocity drops suddenly?**
A: Investigate root cause: Accumulating technical debt? Burnout? Increased complexity? External blockers? Address the underlying issue.

---

## 12. Document Control

**Version History**:

| Version | Date       | Author                 | Changes                                                |
| ------- | ---------- | ---------------------- | ------------------------------------------------------ |
| 1.0.0   | 2025-10-19 | Antonio Gomez Gallardo | Initial velocity tracking system (Module 02 alignment) |

**Next Review**: After Sprint 4 (enough data to assess tracking effectiveness)

**Related Documents**:

- [Metrics Tracking Plan](10.metrics-tracking-plan.md) - Overall metrics strategy
- [Sprint Planning Template](templates/sprint-planning-template.md) - How to plan sprints
- [Sprint Retrospective Template](templates/sprint-retrospective-template.md) - How to review velocity
- [Product Backlog](5.product-backlog.md) - User stories with story points

---

_This velocity tracking system follows Module 02: Agile Planning from the quality-standards documentation, emphasizing predictability, continuous improvement, and sustainable pace._
