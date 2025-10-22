# Sprint Planning Template

**Sprint Number**: Sprint X
**Sprint Duration**: [Start Date] - [End Date] (7 days)
**Planning Date**: [Date]
**Participants**: [Names/Roles]

---

## 1. Sprint Goal

**What is the main objective for this sprint?**

[Write a concise, user-focused sprint goal. Example: "Enable users to browse and view product details"]

**Success Criteria**:

- [ ] [Measurable outcome 1]
- [ ] [Measurable outcome 2]
- [ ] [Measurable outcome 3]

---

## 2. Sprint Capacity

**Team Capacity**:

- **Available Days**: [X days]
- **Available Hours**: [Y hours] (typically 20-30 hours/week for part-time)
- **Planned Capacity**: [Z story points] (target: 10-15 points)

**Capacity Adjustments**:

- Holidays: [List any holidays]
- Planned Time Off: [List any PTO]
- Other Commitments\*\*: [List any known constraints]

**Net Capacity**: [Final story points available]

---

## 3. Sprint Backlog

### 3.1 Stories Committed

| Story ID | Story Title | Story Points | Priority    | Status |
| -------- | ----------- | ------------ | ----------- | ------ |
| US-XXX   | [Title]     | X            | Must Have   | Ready  |
| US-YYY   | [Title]     | Y            | Must Have   | Ready  |
| US-ZZZ   | [Title]     | Z            | Should Have | Ready  |

**Total Story Points Committed**: [Sum]

### 3.2 Definition of Ready Check

**All stories must pass DoR before committing**:

| Story  | DoR Criteria Met?    | Notes                     |
| ------ | -------------------- | ------------------------- |
| US-XXX | ✅ All criteria met  | -                         |
| US-YYY | ✅ All criteria met  | Wireframe in docs/        |
| US-ZZZ | ⚠️ Missing wireframe | Added to sprint prep task |

**Stories NOT Ready**:

- [List any stories that don't meet DoR - These should NOT be included in sprint]

---

## 4. Story Breakdown & Tasks

### US-XXX: [Story Title] (X points)

**Acceptance Criteria**:

1. [AC 1]
2. [AC 2]
3. [AC 3]

**Tasks** (estimated hours):

- [ ] [Task 1] - X hours
- [ ] [Task 2] - Y hours
- [ ] [Task 3] - Z hours
- [ ] Write unit tests - [X] hours
- [ ] Write integration tests - [X] hours
- [ ] Write E2E test - [X] hours
- [ ] Code review - [X] hours
- [ ] Documentation - [X] hours

**Total Estimated Hours**: [Sum] hours

**Dependencies**:

- Depends on: [US-ABC completed, API endpoint ready, etc.]
- Blocks: [US-DEF, etc.]

**Technical Approach**:

- [Brief description of implementation approach]
- [Key technologies or patterns to use]
- [Any risks or unknowns]

---

### US-YYY: [Story Title] (Y points)

**Acceptance Criteria**:

1. [AC 1]
2. [AC 2]
3. [AC 3]

**Tasks** (estimated hours):

- [ ] [Task 1] - X hours
- [ ] [Task 2] - Y hours
- [ ] Write unit tests - [X] hours
- [ ] Write E2E test - [X] hours
- [ ] Code review - [X] hours

**Total Estimated Hours**: [Sum] hours

**Dependencies**:

- None

**Technical Approach**:

- [Implementation approach]

---

## 5. Quality Goals

**Code Quality**:

- [ ] Maintain >80% code coverage
- [ ] Zero ESLint/TypeScript errors
- [ ] Cyclomatic complexity <10 per function
- [ ] All code reviewed before merge

**Testing**:

- [ ] All acceptance criteria covered by automated tests
- [ ] Test pyramid maintained (70/20/10)
- [ ] E2E tests for critical paths

**Performance**:

- [ ] Lighthouse score >90
- [ ] LCP <2.5s
- [ ] No console errors

**Accessibility**:

- [ ] Zero axe-core violations
- [ ] Keyboard navigation functional
- [ ] Screen reader tested (if applicable)

**Security**:

- [ ] Zero critical/high vulnerabilities (npm audit)
- [ ] Input validation implemented
- [ ] Authentication/authorization correct (if applicable)

---

## 6. Risks & Mitigation

| Risk     | Impact       | Probability  | Mitigation Strategy |
| -------- | ------------ | ------------ | ------------------- |
| [Risk 1] | High/Med/Low | High/Med/Low | [How to mitigate]   |
| [Risk 2] | High/Med/Low | High/Med/Low | [How to mitigate]   |

**Blockers Identified**:

- [List any known blockers and resolution plan]

---

## 7. Sprint Ceremonies Schedule

| Ceremony                 | Day       | Time   | Duration  | Purpose                        |
| ------------------------ | --------- | ------ | --------- | ------------------------------ |
| **Sprint Planning**      | Monday    | [Time] | 30-60 min | Plan sprint, commit to stories |
| **Daily Standup**        | Daily     | [Time] | 5-10 min  | Sync on progress, blockers     |
| **Backlog Refinement**   | Wednesday | [Time] | 30-60 min | Prepare next sprint stories    |
| **Sprint Review**        | Sunday    | [Time] | 30-45 min | Demo completed work            |
| **Sprint Retrospective** | Sunday    | [Time] | 30-45 min | Reflect and improve            |

---

## 8. Communication Plan

**Daily Updates**:

- Written daily log in `docs/daily-logs/YYYY-MM-DD.md`
- Update GitHub Projects board status
- Flag blockers immediately

**Weekly Updates**:

- Sprint review demo (video or written summary)
- Metrics updated in Google Sheets
- Retrospective notes in `docs/retrospectives/sprint-X.md`

**Stakeholder Communication**:

- [How and when stakeholders will be updated]

---

## 9. Tools & Resources

**Development**:

- GitHub Repository: [URL]
- GitHub Projects Board: [URL]
- CI/CD Pipeline: GitHub Actions

**Documentation**:

- Sprint Journal: `docs/sprint-journals/sprint-X.md`
- Daily Logs: `docs/daily-logs/`
- Retrospective: `docs/retrospectives/sprint-X.md`

**Metrics**:

- Google Sheets Dashboard: [URL]
- Codecov: [URL]
- Lighthouse CI: [URL]

**References**:

- [Product Backlog](../5.product-backlog.md)
- [Definition of Ready](../7.definition-of-ready.md)
- [Definition of Done](../7.definition-of-done.md)
- [Metrics Tracking Plan](../10.metrics-tracking-plan.md)

---

## 10. Sprint Planning Checklist

**Before Planning**:

- [ ] Review previous sprint metrics (velocity, completion rate)
- [ ] Ensure upcoming stories meet Definition of Ready
- [ ] Identify dependencies and blockers
- [ ] Review team capacity

**During Planning**:

- [ ] Define sprint goal
- [ ] Select stories that align with sprint goal
- [ ] Verify DoR for all selected stories
- [ ] Break stories into tasks
- [ ] Estimate tasks in hours
- [ ] Confirm total capacity not exceeded
- [ ] Identify risks and mitigation strategies

**After Planning**:

- [ ] Update GitHub Projects with sprint label
- [ ] Create sprint journal document
- [ ] Communicate sprint goal to stakeholders
- [ ] Set up sprint tracking (burndown chart)
- [ ] Schedule sprint ceremonies

---

## 11. Notes & Decisions

**Discussion Summary**:

- [Key points discussed during planning]
- [Questions raised and answered]
- [Decisions made]

**Parking Lot** (items to revisit):

- [Topics tabled for later discussion]

**Action Items**:

- [ ] [Action 1] - Assigned to [Name] - Due: [Date]
- [ ] [Action 2] - Assigned to [Name] - Due: [Date]

---

## 12. Sign-Off

**Sprint Plan Approved**:

- [ ] Developer/QAE: [Name]
- [ ] Product Owner (if applicable): [Name]
- [ ] Date: [YYYY-MM-DD]

**Commitment**:
We commit to delivering [X] story points ([Y] stories) by [End Date], maintaining quality standards as defined in the Definition of Done.

---

## Appendix: Sprint Planning Tips

**Do's**:
✅ Set a clear, focused sprint goal
✅ Select stories that support the sprint goal
✅ Break stories into tasks for better tracking
✅ Leave buffer capacity (10-15% for unknowns)
✅ Identify dependencies early
✅ Ensure all stories meet DoR

**Don'ts**:
❌ Overcommit beyond team capacity
❌ Include stories that don't meet DoR
❌ Plan too far ahead (focus on THIS sprint)
❌ Ignore technical debt (allocate 10-20% capacity)
❌ Skip risk identification
❌ Change sprint commitment mid-sprint (except critical issues)

**Planning Poker** (for teams):

- Use Fibonacci sequence: 1, 2, 3, 5, 8, 13
- Discuss high/low estimates
- Reach consensus through discussion
- If >8 points, consider splitting story

**Capacity Planning**:

- 1 story point ≈ 2-4 hours of work
- Include testing, review, and documentation time
- Account for meetings and administrative time
- Buffer for unexpected issues (10-15%)

---

_Template created: 2025-10-19_
_Last updated: 2025-10-19_
_Version: 1.0.0_
