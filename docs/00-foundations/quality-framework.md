# WeirdBites - Quality Framework

**Module**: 00 - Foundations
**Version**: 1.0.0
**Date**: 2025-10-19
**Purpose**: Define the quality framework, Scrum/Kanban approach, and quality policy for WeirdBites

---

## Overview

This document defines the quality framework for the WeirdBites project, including:
- Agile methodology selection (Hybrid Scrum/Kanban)
- Sprint structure and ceremonies
- Quality policy and principles
- Quality standards and gates
- Continuous quality assurance process

This framework is extracted from the Business Requirements Document and represents the **Module 00 (Foundations)** deliverable for quality framework definition.

---

## 1. Agile Framework Selection

### 1.1 Framework Choice

**Framework**: **Hybrid Scrum/Kanban** (Scrumban)

**Rationale**:
- **Solo Developer Context**: Traditional Scrum is team-focused; adaptation needed for single-person project
- **Educational Purpose**: Demonstrates understanding of both frameworks
- **Flexibility**: Kanban's flow-based approach suits varying story sizes
- **Structure**: Scrum's time-boxed sprints provide rhythm and reflection points

### 1.2 Sprint Structure

**Sprint Duration**: **1 week** (Monday - Sunday)

**Rationale**:
- Faster feedback loops than 2-week sprints
- Aligns with vertical slice delivery (most slices are 1-2 weeks)
- Weekly retrospectives enable rapid process improvement
- Reduces planning overhead for solo developer

**Sprint Capacity**: **10-15 story points**
- Based on 20-30 hours/week development time (part-time while learning)
- Includes buffer for learning, documentation, quality activities

### 1.3 Scrum Ceremonies (Adapted for Solo Developer)

| Ceremony | Cadence | Duration | Purpose | Adaptation |
|----------|---------|----------|---------|------------|
| **Sprint Planning** | Monday (start of sprint) | 30-60 min | Select stories, define sprint goal | Solo planning with DoR checklist |
| **Daily Standup** | Daily (morning) | 5-10 min | Review progress, identify blockers | Written daily log or voice memo |
| **Sprint Review** | Sunday (end of sprint) | 30-45 min | Demo completed work | Record demo video, share with peers/mentors |
| **Sprint Retrospective** | Sunday (after review) | 30-45 min | Reflect and improve | Written retrospective using template |
| **Backlog Refinement** | Mid-week (Wednesday) | 30-60 min | Prepare upcoming stories | Apply DoR checklist, estimate, clarify |

**Total Ceremony Time**: ~3-4 hours/week (~15-20% of development time)

### 1.4 Kanban Elements

**Board Columns**:
1. **Backlog** - Prioritized stories ready for development
2. **Ready** - Stories meeting Definition of Ready
3. **In Progress** - Currently being worked on
4. **In Review** - Code review, waiting for CI
5. **Testing** - E2E testing, QA validation
6. **Done** - Meets Definition of Done, deployed

**WIP Limits**:
- **In Progress**: 1-2 stories (focus on completing, not starting)
- **In Review**: 2 stories max (prevent review bottleneck)
- **Testing**: 1 story (quality gate)

**Lead Time Target**: <3 days (from "Ready" to "Done")

**Cycle Time Target**: <2 days (from "In Progress" to "Done")

### 1.5 Sprint Workflow

**Week Structure**:

**Monday (Sprint Planning)**:
1. Review last sprint (what completed, what didn't, why)
2. Set sprint goal (aligned with vertical slice)
3. Select stories from "Ready" column (10-15 points)
4. Break stories into tasks (if needed)
5. Commit to sprint backlog

**Tuesday-Thursday (Development)**:
1. Morning standup (5 min written log)
2. Work on highest priority story
3. Follow TDD/BDD practices
4. Commit frequently with meaningful messages
5. Update story status on board

**Wednesday (Refinement)**:
1. Review upcoming stories (next 2-3 sprints)
2. Apply Definition of Ready checklist
3. Estimate new stories (planning poker with confidence level)
4. Clarify acceptance criteria
5. Update priorities if needed

**Friday (Quality Focus)**:
1. Code review of week's PRs
2. Run full test suite
3. Address technical debt
4. Update documentation
5. Prepare for demo

**Sunday (Review & Retrospective)**:
1. **Sprint Review** (30-45 min):
   - Record demo of completed work
   - Verify Definition of Done met
   - Update metrics (velocity, burndown)
   - Share with peers/mentors for feedback

2. **Sprint Retrospective** (30-45 min):
   - What went well? (successes, learnings)
   - What needs improvement? (bottlenecks, pain points)
   - Action items (max 3, specific, measurable)
   - Update process documentation

### 1.6 Quality Framework Integration

**Quality Built Into Framework**:

**Sprint Planning**:
- Story must meet Definition of Ready (quality gate #1)
- Test cases identified during planning
- Performance/security considerations discussed

**Development**:
- TDD/BDD: Write tests first (Red-Green-Refactor)
- Continuous integration: Every commit runs CI pipeline
- Code review: All code reviewed before merge

**Sprint Review**:
- Demo on production (or staging identical to production)
- Verify non-functional requirements (performance, accessibility)
- User acceptance (based on acceptance criteria)

**Retrospective**:
- Review quality metrics (coverage, DORA, performance)
- Identify quality process improvements
- Update Definition of Done if needed

### 1.7 Tools & Automation

**Project Management**:
- **Tool**: GitHub Projects (Kanban board)
- **Automation**: Issues move columns based on PR/commit status
- **Metrics**: Velocity, cycle time, burndown (tracked in spreadsheet)

**Development**:
- **IDE**: VS Code with extensions (ESLint, Prettier, Jest, Playwright)
- **Version Control**: Git + GitHub (GitFlow branching)
- **CI/CD**: GitHub Actions (automated quality gates)

**Communication** (Solo):
- **Daily Log**: Markdown file tracking progress, blockers, learnings
- **Sprint Journal**: Weekly summary (what shipped, what learned)
- **Demo Videos**: Loom/OBS recordings of sprint reviews

**Metrics Dashboard**:
- **Tool**: Google Sheets or GitHub Projects Insights
- **Metrics**: Velocity, cycle time, code coverage, DORA metrics
- **Review Cadence**: Weekly (sprint retrospective)

### 1.8 Scaling & Adaptation

**As Project Grows**:
- **Add collaborators**: Transition to full Scrum with team ceremonies
- **Increase sprint duration**: Move to 2-week sprints if stories grow
- **Add roles**: Product Owner (stakeholder), Scrum Master (process facilitator)
- **Upgrade tools**: Migrate to Jira/Linear if GitHub Projects insufficient

**Framework Flexibility**:
- Framework is a guide, not a religion
- Adapt based on what works (measure and iterate)
- Document changes in retrospectives
- Keep what adds value, drop what doesn't

---

## 2. Quality Policy

### 2.1 Quality Policy Statement

**WeirdBites Quality Commitment**: We are committed to delivering a high-quality e-commerce platform that demonstrates professional software engineering excellence through measurable quality standards and continuous improvement.

### 2.2 Core Quality Principles

We commit to the following quality principles (aligned with the Code Quality Manifesto from quality-standards):

1. **Quality is Everyone's Responsibility**
   - Quality is not just the QA team's job—it's built into every phase
   - Every commit must meet quality standards before merge

2. **Prevention over Detection**
   - Build quality in from requirements, not test it in later
   - Use TDD/BDD to prevent defects, not just find them

3. **Automation over Manual Repetition**
   - Automate everything that can be automated
   - Manual testing reserved for exploratory and usability testing

4. **Continuous Improvement over Perfection**
   - Progress, not paralysis—ship iteratively
   - Learn from failures and improve processes

5. **Data-Driven Decisions over Opinions**
   - Metrics guide our development path
   - Track DORA metrics, test coverage, performance

6. **User Value over Technical Excellence**
   - Users define quality through their experience
   - Accessibility, performance, usability are non-negotiable

### 2.3 Quality Standards

**Code Quality**:
- ✅ Code coverage: **>80%** (unit, integration, E2E)
- ✅ Cyclomatic complexity: **<10 per method**
- ✅ Technical debt ratio: **<5%**
- ✅ Zero ESLint/TypeScript errors
- ✅ All code reviewed before merge

**Testing Standards**:
- ✅ Test pyramid: **70% unit, 20% integration, 10% E2E**
- ✅ Test execution time: **<10 minutes** for full suite
- ✅ Flaky test rate: **<5%**
- ✅ Test automation rate: **>80%**

**Performance Standards**:
- ✅ Page load (LCP): **<2.5s**
- ✅ First Contentful Paint: **<1.5s**
- ✅ Time to Interactive: **<3.5s**
- ✅ API response time (p95): **<500ms**
- ✅ Lighthouse score: **>90** (Performance, Accessibility, Best Practices, SEO)

**Security Standards**:
- ✅ Zero critical/high vulnerabilities
- ✅ OWASP Top 10 compliance
- ✅ Password hashing (bcrypt, cost factor ≥10)
- ✅ Input validation on all endpoints
- ✅ HTTPS only (enforced by Vercel)

**Accessibility Standards**:
- ✅ WCAG 2.1 Level AA compliance
- ✅ Keyboard navigation support
- ✅ Screen reader compatible
- ✅ Color contrast ratio ≥4.5:1
- ✅ axe-core automated checks passing

**DevOps Standards (DORA Metrics)**:
- ✅ Deployment frequency: **Daily** (target)
- ✅ Lead time for changes: **<1 day**
- ✅ Mean time to recovery: **<4 hours**
- ✅ Change failure rate: **<10%**

### 2.4 Quality Gates

**Code cannot be merged unless**:
1. All automated tests pass (unit, integration, E2E)
2. Code coverage ≥80% for new code
3. No ESLint/TypeScript errors
4. Code review approved
5. No critical/high security vulnerabilities
6. Accessibility checks pass (axe-core)
7. Build succeeds
8. Lighthouse performance >90

**Releases cannot be deployed unless**:
1. All quality gates passed
2. E2E tests passing on staging
3. Performance benchmarks met
4. Security scan clean
5. Smoke tests passing in production
6. Rollback plan documented

### 2.5 Quality Assurance Process

**Continuous Quality Activities**:
1. **Every Commit**: Automated linting, type-checking, unit tests (via pre-commit hooks)
2. **Every Pull Request**: Full CI pipeline (lint, typecheck, test, build)
3. **Every Merge**: Automated deployment to staging, smoke tests
4. **Every Release**: E2E tests, performance tests, security scan, production deployment
5. **Every Sprint**: Retrospective, process improvement, metrics review

**Review & Audit Schedule**:
- **Daily**: CI/CD pipeline status, failed builds/tests
- **Weekly**: Code coverage trends, velocity, WIP limits
- **Sprint**: Retrospective, quality metrics review, improvement actions
- **Monthly**: DORA metrics dashboard, technical debt assessment
- **Quarterly**: Quality policy review, testing strategy refinement

### 2.6 Non-Conformance

**When quality standards are not met**:
1. **Identify**: Log the non-conformance (failed test, missed coverage, etc.)
2. **Analyze**: Root cause analysis (5 Whys, fishbone diagram)
3. **Fix**: Immediate corrective action
4. **Prevent**: Update process to prevent recurrence
5. **Document**: Record in retrospective, update documentation

**Escalation**:
- **Minor**: Developer fixes within same PR
- **Major**: Revert commit, create bug ticket, fix in next sprint
- **Critical**: Stop deployment, emergency fix, post-mortem required

### 2.7 Continuous Improvement

**Improvement Mechanisms**:
1. **Retrospectives**: After every vertical slice (every 1-2 weeks)
2. **Metrics Review**: Track trends, identify patterns
3. **Process Experiments**: Try new practices, measure results
4. **Knowledge Sharing**: Document learnings, update quality-standards
5. **Tool Evaluation**: Continuously assess and improve tooling

**Success Criteria**:
- Quality metrics improving sprint over sprint
- Fewer defects escaping to production
- Faster cycle time while maintaining quality
- Developer satisfaction with quality processes

---

## 3. Related Documents

**Module 00 - Foundations**:
- [ISO 25010 Quality Mapping](iso-25010-mapping.md) - Quality characteristics mapping

**Module 01 - Requirements**:
- [Business Requirements](../01-requirements/business-requirements.md) - Complete BRD (includes metrics section)
- [Non-Functional Requirements](../01-requirements/non-functional-requirements.md) - Detailed quality targets

**Module 02 - Agile Planning**:
- [Definition of Ready](../02-agile-planning/definition-of-ready.md) - Story readiness checklist
- [Sprint Cadence](../02-agile-planning/sprint-cadence.md) - Detailed weekly rhythm
- [Velocity Tracking](../02-agile-planning/velocity-tracking.md) - Velocity calculation and forecasting

**Module 09 - Metrics & Monitoring**:
- [Metrics Tracking Plan](../09-metrics-monitoring/metrics-tracking-plan.md) - Comprehensive metrics dashboard

**Module 14 - Continuous Improvement**:
- [Testing Maturity Assessment](../14-continuous-improvement/testing-maturity-assessment.md) - Testing maturity roadmap

---

## Document Control

**Version History**:

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2025-10-19 | Antonio Gomez Gallardo | Extracted from BRD sections 12-13, organized as Module 00 deliverable |

**Source**: Extracted from Business Requirements Document (Sections 12-13)

**Alignment**: Module 00 (Foundations) - Quality Framework Definition

---

*This document follows Module 00 (Foundations) best practices and aligns with the quality-standards framework.*
