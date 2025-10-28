# Module 03: Version Control & Branching

**Version**: 2.0.0
**Date**: 2025-10-28
**Purpose**: Documentation of version control practices and implementation
**Reference**: quality-standards Module 03

---

## Overview

This module documents the **version control and branching strategy** implemented for WeirdBites, aligned with industry best practices from Module 03 of the quality-standards framework.

### What We Implemented

We adopted **Trunk-Based Development (TBD)** with Pull Requests, implementing professional version control practices including:

- ✅ **Security scanning** (TruffleHog + npm audit)
- ✅ **Commit message validation** (Conventional Commits)
- ✅ **Pre-commit quality checks** (lint, typecheck, test, security)
- ✅ **Pull request templates** with quality checklists and self-review
- ✅ **Semantic versioning** with manual release triggers
- ✅ **Branch protection rules** enforcing quality gates
- ✅ **Code review standards** (172 checks, Google-based guidelines)

### Implementation Status

**Progress**: ✅ **100% COMPLETE** (3/3 phases)

| Phase       | Status      | Description                              | PRs    |
| ----------- | ----------- | ---------------------------------------- | ------ |
| **Phase 1** | ✅ Complete | Security Scanning                        | #13    |
| **Phase 2** | ✅ Complete | Commit Validation & Developer Experience | #14-18 |
| **Phase 3** | ✅ Complete | Code Review Standards                    | #21    |

---

## 📄 Documentation in This Module

### 1. [Module 03 Summary](module-03-summary.md)

**Overview of all Module 03 work completed**

- High-level achievements
- Technologies added
- Process improvements
- Metrics and outcomes

### 2. [Phase 1: Security Scanning](phase-1-security-scanning.md)

**Implementation of secret detection and dependency scanning**

- TruffleHog configuration
- npm audit integration
- Pre-commit security checks
- CI security job setup

### 3. [Phase 2: Commit Validation](phase-2-commit-validation.md)

**Commit message standards and developer experience improvements**

- Commitlint configuration
- Conventional Commits enforcement
- Enhanced pre-commit hooks
- Line ending normalization
- Pull request templates
- Semantic versioning setup
- Manual release workflow

### 4. [Phase 3: Code Review Standards](phase-3-code-review.md) ✅

**Comprehensive code review standards and best practices**

- Code review checklist (81 checks across 10 dimensions)
- Self-review checklist (91 checks for PR authors)
- Review guidelines (520 lines, Google Engineering Practices-based)
- CONTRIBUTING.md updates with review process
- Enhanced PR template with self-review requirement
- CODEOWNERS file for future team growth

### 5. [Review Guidelines](review-guidelines.md)

**Complete guide for conducting effective code reviews**

- 8 dimensions of code review
- 5-step review process
- Writing effective feedback
- Handling large PRs
- Common scenarios
- Review etiquette

### 6. Templates

#### [Code Review Checklist](templates/code-review-checklist.md)

**For reviewers**: 81 checks across 10 dimensions

#### [Self-Review Checklist](templates/self-review-checklist.md)

**For PR authors**: 91 checks to complete before requesting review

---

## 🔑 Key Concepts

### Trunk-Based Development (TBD)

**What it is**: A version control strategy where developers work in short-lived feature branches that merge frequently to the main branch.

**Key principles**:

- Single main branch (`main`) always deployable
- Short-lived feature branches (max 1-2 days)
- All changes via Pull Requests
- Small, frequent commits (3-5 per branch)
- Feature flags for incomplete work

**Why we chose it**:

- ✅ Faster integration and feedback
- ✅ Reduced merge conflicts
- ✅ Encourages small, testable changes
- ✅ Aligns with CI/CD best practices
- ✅ Simpler than GitFlow for solo/small teams

### Conventional Commits

**Format**: `type(scope): description`

**Examples**:

```
feat(auth): add user registration endpoint
fix(products): resolve null pointer in product list
docs(readme): update installation instructions
test(cart): add unit tests for cart calculations
```

**Benefits**:

- ✅ Automated version calculation
- ✅ Automated changelog generation
- ✅ Clear commit history
- ✅ Better collaboration

### Security Scanning Layers

**Layer 1: Pre-commit** (Local developer machine)

- npm audit on `package.json` changes
- Catches vulnerabilities before commit

**Layer 2: CI Pipeline** (GitHub Actions)

- TruffleHog secret scanner
- npm audit on all dependencies
- Runs on every PR and push to main

---

## 🛠️ Tools & Technologies

### Version Control

- **Git**: Version control system
- **GitHub**: Repository hosting and collaboration
- **Trunk-Based Development**: Branching strategy

### Quality Enforcement

- **Husky**: Git hooks management (v9.1.7)
- **lint-staged**: Pre-commit file linting (v16.2.6)
- **commitlint**: Commit message validation (v20.1.0)
- **@commitlint/config-conventional**: Conventional Commits rules (v20.0.0)

### Security

- **TruffleHog**: Secret scanner (GitHub Action)
- **npm audit**: Dependency vulnerability scanner

### Release Management

- **semantic-release**: Automated versioning (v25.0.1)
- **@semantic-release/github**: GitHub release creation (v12.0.0)

### Configuration Files

- `.gitattributes`: Line ending normalization
- `.husky/pre-commit`: Pre-commit hooks
- `.husky/commit-msg`: Commit message validation
- `commitlint.config.js`: Commit rules
- `.github/pull_request_template.md`: PR template
- `.github/workflows/ci.yml`: CI pipeline with security job
- `.github/workflows/release.yml`: Manual release workflow
- `.releaserc.json`: Semantic-release configuration

---

## 📊 Quality Gates

### Pre-Commit (Local)

Runs before every commit:

1. ✅ Prettier formatting
2. ✅ ESLint code quality
3. ✅ TypeScript compilation
4. ✅ Jest tests (related files)
5. ✅ Security audit (if package.json changed)
6. ✅ Commit message validation

### CI Pipeline (GitHub Actions)

Runs on every PR and push to main:

1. ✅ **Lint** - Code style check
2. ✅ **Typecheck** - TypeScript validation
3. ✅ **Test** - Unit & integration tests
4. ✅ **E2E** - End-to-end tests
5. ✅ **Build** - Production build verification
6. ✅ **Security** - Secret + dependency scanning
7. ✅ **Quality Gate** - Overall verification

**Total**: 7 automated quality gates

---

## 📈 Outcomes & Metrics

### What We Achieved

**Security**:

- ✅ 2-layer secret detection (pre-commit + CI)
- ✅ Automated dependency vulnerability scanning
- ✅ Zero secrets committed to repository

**Code Quality**:

- ✅ 100% commits follow Conventional Commits format
- ✅ Automated version calculation from commits
- ✅ Comprehensive pre-commit quality checks
- ✅ 7 automated CI quality gates

**Developer Experience**:

- ✅ Clear commit message guidelines
- ✅ Automated formatting and linting
- ✅ Fast feedback (pre-commit catches issues early)
- ✅ Standardized PR template
- ✅ Manual release control with dry-run capability

**Process Improvements**:

- ✅ Trunk-Based Development workflow documented
- ✅ Branch protection rules enforced
- ✅ Pull request quality checklist
- ✅ Release management documentation

---

## 🚀 Quick Reference

### Daily Workflow

```bash
# 1. Start new task
git checkout main && git pull origin main
git checkout -b feature/task-name

# 2. Make changes
# ... write code ...

# 3. Commit (pre-commit hooks run automatically)
git add .
git commit -m "feat(scope): description"

# 4. Push and create PR
git push -u origin feature/task-name
gh pr create --base main --title "feat: description"

# 5. After merge
git checkout main && git pull origin main
git branch -d feature/task-name
```

### Commit Message Format

```
type(scope): subject

[optional body]

[optional footer]
```

**Types**: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert

### Creating a Release

```bash
# Method 1: GitHub UI
Actions → Release → Run workflow → Run workflow

# Method 2: Git tag
git tag v0.2.0
git push origin v0.2.0

# Method 3: gh CLI
gh workflow run release.yml
```

---

## 📚 Related Documentation

### Setup Documentation

- [Project Setup Guide](../setup/project-setup.md) - Slice 0 infrastructure
- [Branch Protection Guide](../setup/branch-protection.md) - GitHub settings
- [Release Management Guide](../setup/releases.md) - How to create releases
- [GitHub Setup Guide](../setup/GITHUB-SETUP.md) - Repository configuration

### Project Documentation

- [CLAUDE.md](../../CLAUDE.md) - Project instructions and phases
- [CONTRIBUTING.md](../../CONTRIBUTING.md) - Developer workflow guide
- [README.md](../../README.md) - Project overview

### Quality Standards Reference

- [quality-standards Module 03](../quality-standards/docs/03-version-control/) - Industry best practices
- [quality-standards Manifesto](../quality-standards/MANIFESTO.md) - Quality principles
- [quality-standards Philosophy](../quality-standards/PHILOSOPHY.md) - Quality philosophy

---

## 🎯 Next Steps

### Option A: Complete Module 03

- [ ] Implement Phase 3: Code Review Standards
- [ ] Create code review checklist template
- [ ] Document review best practices
- [ ] Set up automated review reminders
- [ ] Create v0.2.0 release

### Option B: Start Feature Development

- [ ] Begin Deployment Increment 1: Browse Products
- [ ] Apply version control practices while building
- [ ] Complete Phase 3 later as needed

---

**Last Updated**: 2025-10-26
**Module Status**: 🚧 **IN PROGRESS** (2/3 phases, 67%)
**Next Milestone**: Phase 3 OR Deployment Increment 1

---

_"Version control is not just about managing code changes—it's about enabling collaboration, maintaining quality, and building confidence in every release."_
