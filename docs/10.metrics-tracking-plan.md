# WeirdBites - Metrics Tracking Plan

**Version**: 1.0.0
**Date**: 2025-10-19
**Purpose**: Define metrics collection, tracking, and dashboard approach for quality and progress monitoring
**Reference**: Module 00 - Foundations (Metrics & Measurement)

---

## Overview

This document defines the metrics tracking strategy for WeirdBites, including what metrics to track, how to collect them, visualization approach, and tooling decisions. The goal is to maintain data-driven visibility into project health, quality, and progress.

**Key Principles**:
- Measure what matters (focus on actionable metrics)
- Automate collection where possible
- Keep overhead minimal (15-30 min/week)
- Use metrics to drive improvement, not blame
- Track leading indicators, not just lagging

---

## 1. Metrics Categories

### 1.1 Progress Metrics (Sprint/Project Tracking)

| Metric | Definition | Target | Collection Method | Frequency |
|--------|-----------|--------|-------------------|-----------|
| **Velocity** | Story points completed per sprint | 10-15 points | Manual (sprint review) | Weekly |
| **Commitment Reliability** | Completed / Committed stories | >85% | Manual (sprint review) | Weekly |
| **Sprint Burndown** | Remaining story points per day | Trend toward zero | Manual (daily standup) | Daily |
| **Lead Time** | Days from backlog → done | <3 days | GitHub Projects (automated) | Continuous |
| **Cycle Time** | Days from in-progress → done | <2 days | GitHub Projects (automated) | Continuous |
| **Work In Progress (WIP)** | Stories in-progress simultaneously | ≤2 | GitHub Projects (automated) | Continuous |

### 1.2 Code Quality Metrics

| Metric | Definition | Target | Collection Method | Frequency |
|--------|-----------|--------|-------------------|-----------|
| **Code Coverage** | % of code covered by tests | >80% | Jest/Playwright (CI) | Per commit |
| **Test Pass Rate** | % of tests passing | 100% | CI pipeline | Per commit |
| **Linting Violations** | ESLint errors/warnings | 0 errors | ESLint (CI) | Per commit |
| **TypeScript Errors** | Type errors | 0 | tsc (CI) | Per commit |
| **Cyclomatic Complexity** | Avg complexity per function | <10 | SonarQube/ESLint plugin | Per commit |
| **Technical Debt Ratio** | % of codebase that's debt | <5% | SonarQube | Weekly |
| **Code Duplication** | % duplicated code | <3% | SonarQube | Weekly |

### 1.3 Testing Metrics

| Metric | Definition | Target | Collection Method | Frequency |
|--------|-----------|--------|-------------------|-----------|
| **Test Pyramid Balance** | Unit:Integration:E2E ratio | 70:20:10 | Manual count | Sprint review |
| **Test Execution Time** | Time to run full test suite | <10 min | CI logs | Per commit |
| **Flaky Test Rate** | % of tests that fail inconsistently | <5% | Manual tracking | Weekly |
| **Test Automation Rate** | % of test cases automated | >80% | Manual count | Sprint review |
| **Defect Detection Rate** | Bugs found in testing vs production | 90:10 | Manual tracking | Sprint review |

### 1.4 Performance Metrics

| Metric | Definition | Target | Collection Method | Frequency |
|--------|-----------|--------|-------------------|-----------|
| **Lighthouse Score** | Overall Lighthouse performance | >90 | Lighthouse CI | Per deploy |
| **Largest Contentful Paint (LCP)** | Time to largest content render | <2.5s | Lighthouse CI | Per deploy |
| **First Contentful Paint (FCP)** | Time to first content render | <1.5s | Lighthouse CI | Per deploy |
| **Time to Interactive (TTI)** | Time until page is interactive | <3.5s | Lighthouse CI | Per deploy |
| **Cumulative Layout Shift (CLS)** | Visual stability score | <0.1 | Lighthouse CI | Per deploy |
| **Bundle Size** | Total JS/CSS bundle size | <200 KB | Webpack Bundle Analyzer | Per deploy |

### 1.5 Security Metrics

| Metric | Definition | Target | Collection Method | Frequency |
|--------|-----------|--------|-------------------|-----------|
| **Critical Vulnerabilities** | High/critical severity CVEs | 0 | npm audit / Snyk | Per commit |
| **Dependency Vulnerabilities** | Total known vulnerabilities | <5 low | npm audit / Snyk | Weekly |
| **Security Scan Pass Rate** | % of scans with no critical issues | 100% | CI pipeline | Per commit |
| **OWASP Top 10 Compliance** | Coverage of OWASP checks | 100% | Manual review | Sprint review |

### 1.6 Accessibility Metrics

| Metric | Definition | Target | Collection Method | Frequency |
|--------|-----------|--------|-------------------|-----------|
| **axe-core Violations** | Accessibility violations found | 0 critical | axe-core (CI) | Per commit |
| **WCAG 2.1 AA Compliance** | % of pages meeting WCAG AA | 100% | axe-core + manual | Sprint review |
| **Keyboard Navigation** | % of features keyboard-accessible | 100% | Manual testing | Sprint review |
| **Screen Reader Support** | % of features screen reader friendly | 100% | Manual testing | Sprint review |

### 1.7 DORA Metrics (DevOps Performance)

| Metric | Definition | Target | Collection Method | Frequency |
|--------|-----------|--------|-------------------|-----------|
| **Deployment Frequency** | How often code is deployed | Daily | GitHub Actions logs | Weekly |
| **Lead Time for Changes** | Commit → production time | <1 day | GitHub + manual | Weekly |
| **Mean Time to Recovery (MTTR)** | Time to recover from failure | <4 hours | Manual tracking | Per incident |
| **Change Failure Rate** | % of deployments causing failure | <10% | Manual tracking | Weekly |

### 1.8 Requirements Quality Metrics

| Metric | Definition | Target | Collection Method | Frequency |
|--------|-----------|--------|-------------------|-----------|
| **Stories Meeting DoR** | % of stories passing DoR checklist | >80% | Manual review | Sprint planning |
| **Estimation Accuracy** | Actual / Estimated ratio | 0.8-1.2 | Manual calculation | Sprint review |
| **Requirements Churn** | % of stories changed after sprint start | <10% | Manual tracking | Sprint review |
| **Defects per Story** | Avg bugs found per completed story | <1 | Manual tracking | Sprint review |

---

## 2. Dashboard Design

### 2.1 Tool Selection

**Primary Tool**: **GitHub Projects (Kanban Board)**
- Built into GitHub (no extra cost)
- Automated lead time and cycle time tracking
- Integrates with issues and pull requests
- Custom fields for story points, priority, status
- Basic charts (burndown, velocity, cumulative flow)

**Secondary Tool**: **Google Sheets** (Metrics Dashboard)
- Free, accessible, flexible
- Manual entry for metrics not auto-captured
- Custom charts and visualizations
- Easy to share with mentors/peers
- Weekly 15-minute update ritual

**Future Consideration**: **SonarQube Community Edition** (Code Quality)
- Free for open-source projects
- Automated code quality metrics
- Technical debt tracking
- Security vulnerability scanning
- Requires Docker setup (Slice 0)

### 2.2 GitHub Projects Configuration

**Board Columns**:
1. Backlog
2. Ready (DoR passed)
3. In Progress (WIP ≤2)
4. In Review
5. Done
6. Blocked

**Custom Fields**:
- Story Points (number)
- Priority (Must/Should/Could/Won't)
- Sprint (text: "Sprint 1", "Sprint 2", etc.)
- Acceptance Criteria Met (checkbox)
- DoR Passed (checkbox)
- DoD Passed (checkbox)

**Views**:
- Current Sprint (filter: Sprint = current)
- Roadmap (timeline view by sprint)
- By Priority (grouped by priority)
- Blocked Items (filter: status = Blocked)

**Automation**:
- Auto-move to "In Progress" when PR created
- Auto-move to "In Review" when PR ready for review
- Auto-move to "Done" when PR merged
- Auto-add sprint label based on sprint field

### 2.3 Google Sheets Dashboard Layout

**Sheet 1: Sprint Summary**
| Sprint | Start Date | End Date | Planned (SP) | Completed (SP) | Velocity | Commitment Reliability |
|--------|-----------|----------|--------------|----------------|----------|------------------------|
| Sprint 1 | 2025-10-21 | 2025-10-27 | 13 | TBD | TBD | TBD |
| Sprint 2 | 2025-10-28 | 2025-11-03 | 13 | TBD | TBD | TBD |

**Sheet 2: Quality Metrics**
| Date | Code Coverage | Test Pass Rate | Linting Errors | TypeScript Errors | Technical Debt | Lighthouse Score |
|------|---------------|----------------|----------------|-------------------|----------------|------------------|
| 2025-10-21 | 85% | 100% | 0 | 0 | 2.5% | 92 |

**Sheet 3: DORA Metrics**
| Week | Deployments | Lead Time (days) | MTTR (hours) | Change Failure Rate |
|------|-------------|------------------|--------------|---------------------|
| Week 1 | 5 | 0.8 | N/A | 0% |

**Sheet 4: Requirements Quality**
| Sprint | Stories Committed | Stories Completed | Stories Changed | DoR Pass Rate | Avg Defects/Story |
|--------|-------------------|-------------------|-----------------|---------------|-------------------|
| Sprint 1 | 3 | TBD | TBD | 100% | TBD |

**Sheet 5: Charts**
- Velocity trend (line chart)
- Code coverage trend (line chart)
- Lighthouse score trend (line chart)
- Cumulative flow diagram (area chart)

---

## 3. Metrics Collection Process

### 3.1 Automated Collection (via CI/CD)

**GitHub Actions Workflow** (`.github/workflows/quality-metrics.yml`):
```yaml
name: Quality Metrics

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  quality-checks:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Run linting
        run: npm run lint

      - name: Run type checking
        run: npm run type-check

      - name: Run tests with coverage
        run: npm run test:coverage

      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
        with:
          token: ${{ secrets.CODECOV_TOKEN }}
          files: ./coverage/coverage-final.json

      - name: Run security audit
        run: npm audit --audit-level=high

      - name: Run Lighthouse CI
        uses: treosh/lighthouse-ci-action@v9
        with:
          urls: |
            http://localhost:3000
            http://localhost:3000/products
          uploadArtifacts: true

      - name: Run accessibility checks
        run: npm run test:a11y
```

**What This Automates**:
- Code coverage (Jest)
- Linting violations (ESLint)
- TypeScript errors (tsc)
- Security vulnerabilities (npm audit)
- Performance (Lighthouse CI)
- Accessibility (axe-core)

### 3.2 Manual Collection (Weekly Sprint Review)

**Sunday Sprint Review Checklist** (30 min):
1. **Update Sprint Summary** (Google Sheets):
   - Record completed story points
   - Calculate velocity
   - Calculate commitment reliability
   - Note any stories rolled over

2. **Update Quality Metrics** (Google Sheets):
   - Copy latest coverage from Codecov
   - Copy latest Lighthouse score from CI
   - Check SonarQube for technical debt (if set up)
   - Record any linting/TS errors

3. **Update DORA Metrics** (Google Sheets):
   - Count deployments this week
   - Calculate average lead time (GitHub Projects)
   - Record any incidents and MTTR
   - Calculate change failure rate

4. **Update Requirements Quality** (Google Sheets):
   - Count stories committed vs completed
   - Count stories changed mid-sprint
   - Calculate DoR pass rate
   - Record defects found per story

5. **GitHub Projects Maintenance**:
   - Archive completed sprint stories
   - Move incomplete stories to next sprint
   - Update sprint labels

**Estimated Time**: 15-30 minutes per week

### 3.3 Daily Collection (5 min)

**Morning Daily Standup** (written log):
1. Update GitHub Projects board:
   - Move cards to reflect current status
   - Update WIP count
   - Flag any blockers

2. Update sprint burndown (if tracking):
   - Record remaining story points
   - Note in daily log file

**Format**: `docs/daily-logs/YYYY-MM-DD.md`
```markdown
# Daily Log - 2025-10-21

## Sprint 1, Day 1

**Yesterday**: Set up project repository, created initial documentation
**Today**: Begin US-001 (Browse Product Catalog)
**Blockers**: None

**Progress**:
- Stories completed: 0/3
- Story points completed: 0/13
- Stories in progress: US-001 (5 points)
- WIP: 1

**Notes**: Starting Slice 1, focus on product listing page
```

---

## 4. Metrics Cadence

### 4.1 Real-Time Monitoring (Automated)

**CI/CD Pipeline** (every commit/PR):
- Code coverage
- Test pass rate
- Linting/TypeScript errors
- Security vulnerabilities
- Lighthouse scores
- Accessibility violations

**GitHub Projects** (continuous):
- Lead time
- Cycle time
- WIP count
- Story status

### 4.2 Daily Tracking

**Daily Standup** (5-10 min):
- Update board status
- Record remaining story points (burndown)
- Flag blockers

### 4.3 Weekly Tracking

**Sprint Review/Retrospective** (Sunday, 30-60 min):
- Update all Google Sheets metrics
- Review trends and patterns
- Identify improvement actions
- Archive completed sprint

**Backlog Refinement** (Wednesday, 30-60 min):
- Review DoR pass rate
- Update estimation accuracy
- Track requirements churn

### 4.4 Monthly/Milestone Tracking

**End of Each Slice** (Slice 1-7):
- Review cumulative metrics
- Assess progress toward MVP
- Update stakeholder report
- Adjust targets if needed

---

## 5. Metrics Interpretation & Action

### 5.1 Velocity

**Target**: 10-15 story points per sprint

**Interpretation**:
- **<10 points**: Underestimating complexity, need smaller stories, or capacity constraints
- **10-15 points**: Healthy, sustainable pace
- **>15 points**: Overestimating, stories may be too small, or unsustainable pace

**Actions**:
- If consistently low: Break stories down further, reduce scope
- If consistently high: Check for story inflation, ensure quality isn't compromised

### 5.2 Code Coverage

**Target**: >80%

**Interpretation**:
- **<70%**: Critical gaps, high risk of undetected bugs
- **70-80%**: Acceptable but needs improvement
- **80-90%**: Healthy coverage
- **>90%**: Excellent coverage (diminishing returns above 95%)

**Actions**:
- If <80%: Add tests before merging, identify uncovered critical paths
- If declining: Make coverage a merge blocker

### 5.3 Lighthouse Score

**Target**: >90

**Interpretation**:
- **<60**: Poor, unacceptable for production
- **60-80**: Needs improvement, user experience impacted
- **80-90**: Good, minor optimizations needed
- **>90**: Excellent performance

**Actions**:
- If <90: Investigate LCP/FCP/TTI, optimize images, reduce bundle size
- Use Lighthouse suggestions for specific improvements

### 5.4 Lead Time

**Target**: <3 days

**Interpretation**:
- **<1 day**: Excellent flow, small stories
- **1-3 days**: Healthy pace
- **>3 days**: Stories too large, blockers present, or low priority

**Actions**:
- If >3 days consistently: Split stories smaller, resolve blockers faster
- Review WIP limits (too many stories in progress?)

### 5.5 Change Failure Rate

**Target**: <10%

**Interpretation**:
- **<5%**: Excellent quality and stability
- **5-10%**: Acceptable, monitor closely
- **>10%**: Quality issues, inadequate testing, or rushing

**Actions**:
- If >10%: Strengthen testing, improve code review, add more integration tests
- Investigate root causes (incomplete requirements, time pressure, technical debt)

---

## 6. Continuous Improvement

### 6.1 Retrospective Metrics Review

**Every Sprint Retrospective**:
1. Review metrics trends (3-4 sprint rolling average)
2. Identify 1-2 metrics that need improvement
3. Define specific actions to improve those metrics
4. Track improvement actions as backlog items

**Questions to Ask**:
- Which metrics improved? Why?
- Which metrics declined? Why?
- Are we tracking the right metrics?
- Are targets realistic?
- What surprised us this sprint?

### 6.2 Metrics Refinement

**Quarterly** (Every 3 months / 12 sprints):
- Review which metrics are actionable vs vanity
- Add/remove metrics based on learnings
- Adjust targets based on historical data
- Update dashboard layout for clarity

### 6.3 Learning Goals

**Metrics as Learning Indicators**:
- Track "new technologies learned" (qualitative)
- Track "documentation quality" (peer feedback)
- Track "testing skills improvement" (coverage trend, test design)
- Track "estimation accuracy improvement" (variance trend)

---

## 7. Tooling Setup Instructions

### 7.1 GitHub Projects Setup (Week 1)

**Steps**:
1. Navigate to repository → Projects tab
2. Create new project: "WeirdBites Development"
3. Choose "Board" layout
4. Add columns: Backlog, Ready, In Progress, In Review, Done, Blocked
5. Add custom fields:
   - Story Points (Number, 0-13)
   - Priority (Single select: Must/Should/Could/Won't)
   - Sprint (Text)
   - DoR Passed (Checkbox)
   - DoD Passed (Checkbox)
6. Enable automation:
   - Settings → Workflows → Enable built-in automations
   - Auto-add items when PR created
   - Auto-close when PR merged
7. Create views:
   - Current Sprint (filter by Sprint field)
   - By Priority (group by Priority)
   - Roadmap (timeline layout)

**Estimated Time**: 30 minutes

### 7.2 Google Sheets Dashboard Setup (Week 1)

**Steps**:
1. Create new Google Sheet: "WeirdBites Metrics Dashboard"
2. Create 5 sheets:
   - Sprint Summary
   - Quality Metrics
   - DORA Metrics
   - Requirements Quality
   - Charts
3. Set up column headers (see section 2.3)
4. Add formulas:
   - Velocity: `=C2` (Completed SP)
   - Commitment Reliability: `=C2/B2*100` (Completed/Planned)
   - Change Failure Rate: `=Failed_Deploys/Total_Deploys*100`
5. Create charts:
   - Velocity trend: Line chart from Sprint Summary
   - Code coverage trend: Line chart from Quality Metrics
   - Lighthouse trend: Line chart from Quality Metrics
6. Share with view access (for mentors/peers)

**Estimated Time**: 45 minutes

### 7.3 CI/CD Pipeline Setup (Slice 0)

**Steps**:
1. Create `.github/workflows/quality-metrics.yml`
2. Configure Codecov:
   - Sign up at codecov.io
   - Add repository
   - Get upload token
   - Add `CODECOV_TOKEN` to GitHub Secrets
3. Configure Lighthouse CI:
   - Install `@lhci/cli` as dev dependency
   - Create `lighthouserc.json` config
   - Add Lighthouse CI action to workflow
4. Configure npm scripts:
   - `"test:coverage": "jest --coverage"`
   - `"test:a11y": "jest --testPathPattern=a11y"`
   - `"lint": "eslint . --ext .ts,.tsx"`
   - `"type-check": "tsc --noEmit"`

**Estimated Time**: 1-2 hours (part of Slice 0)

### 7.4 SonarQube Setup (Optional, Slice 0)

**Steps**:
1. Run SonarQube in Docker: `docker run -d -p 9000:9000 sonarqube:community`
2. Access at `http://localhost:9000`
3. Create project token
4. Install `sonar-scanner` CLI
5. Create `sonar-project.properties`:
   ```properties
   sonar.projectKey=weirdbites
   sonar.sources=src
   sonar.tests=src
   sonar.test.inclusions=**/*.test.ts,**/*.test.tsx
   sonar.javascript.lcov.reportPaths=coverage/lcov.info
   ```
6. Run analysis: `sonar-scanner`
7. View dashboard at `http://localhost:9000`

**Estimated Time**: 1 hour

---

## 8. Weekly Metrics Update Ritual

**Sunday Evening (30 min)**:

1. **Pull Latest Data** (10 min):
   - Open GitHub Projects and export current sprint data
   - Check CI pipeline for latest test results
   - Review Codecov for coverage trends
   - Check Lighthouse CI for performance scores

2. **Update Google Sheets** (15 min):
   - Update Sprint Summary row with completed SP, velocity, commitment reliability
   - Update Quality Metrics row with coverage, test pass rate, Lighthouse score
   - Update DORA Metrics row with deployment count, lead time, change failure rate
   - Update Requirements Quality row with DoR pass rate, estimation accuracy

3. **Reflect & Plan** (5 min):
   - Review trends: What improved? What declined?
   - Note 1-2 focus areas for next sprint
   - Add improvement actions to backlog if needed

**Ritual Benefits**:
- Consistent weekly data collection
- Forces reflection on progress
- Creates historical dataset for trend analysis
- Low overhead (30 min/week)

---

## 9. Metrics Dashboard Examples

### 9.1 Sprint Summary Dashboard (Week 4)

| Sprint | Start Date | End Date | Planned (SP) | Completed (SP) | Velocity | Commitment Reliability |
|--------|-----------|----------|--------------|----------------|----------|------------------------|
| Sprint 1 | 2025-10-21 | 2025-10-27 | 13 | 11 | 11 | 85% |
| Sprint 2 | 2025-10-28 | 2025-11-03 | 13 | 13 | 13 | 100% |
| Sprint 3 | 2025-11-04 | 2025-11-10 | 13 | 12 | 12 | 92% |
| Sprint 4 | 2025-11-11 | 2025-11-17 | 13 | 14 | 14 | 108% |

**Insights**: Velocity stabilizing around 12-13 points, commitment reliability >85%, healthy pace.

### 9.2 Quality Metrics Dashboard (Week 4)

| Date | Code Coverage | Test Pass Rate | Linting Errors | TypeScript Errors | Technical Debt | Lighthouse Score |
|------|---------------|----------------|----------------|-------------------|----------------|------------------|
| 2025-10-21 | 75% | 100% | 0 | 0 | 3.2% | 88 |
| 2025-10-28 | 82% | 100% | 0 | 0 | 2.8% | 91 |
| 2025-11-04 | 85% | 100% | 0 | 0 | 2.5% | 92 |
| 2025-11-11 | 87% | 100% | 0 | 0 | 2.3% | 93 |

**Insights**: Coverage improving steadily, technical debt decreasing, Lighthouse score >90, all quality gates met.

### 9.3 Velocity Chart

```
Story Points Completed
 15 |                           ● (14)
    |                    ●
 13 |          ●    ●
    |
 11 | ●
    |
  9 |
    |____________________________
      S1   S2   S3   S4   S5
```

**Trend**: Velocity increasing and stabilizing around 12-14 points, indicating better estimation and workflow.

---

## 10. Document Control

**Version History**:

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2025-10-19 | Antonio Gomez Gallardo | Initial metrics tracking plan (Module 00 alignment) |

**Next Review**: After Sprint 2 (adjust based on actual metrics collection experience)

**Related Documents**:
- [Business Requirements Document](1.business-requirements.md) - Quality Framework and Policy
- [Definition of Done](7.definition-of-done.md) - Quality gates and standards
- [Definition of Ready](7.definition-of-ready.md) - Story readiness criteria
- [Project Setup](8.project-setup.md) - Slice 0 infrastructure including CI/CD

---

*This metrics tracking plan follows Module 00: Foundations from the quality-standards documentation, emphasizing data-driven decision making and continuous improvement.*
