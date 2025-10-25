# GitHub Branch Protection Configuration

This document describes the branch protection rules configuration for the WeirdBites repository, aligned with **Module 03: Version Control** best practices.

## Overview

Branch protection rules ensure code quality and security by requiring all changes to go through proper review and automated quality gates before merging to the `main` branch.

## Branch Protection Rules for `main`

### Access Configuration via GitHub

1. Navigate to: **Repository** → **Settings** → **Branches** → **Branch protection rules**
2. Click **Add rule** or edit existing rule for `main`
3. Configure the following settings:

---

### Required Settings

#### 1. **Require a pull request before merging** ✅

- **Enable**: ✅ Checked
- **Required approvals**: `1` (can increase to `2` for higher-risk changes)
- **Dismiss stale pull request approvals when new commits are pushed**: ✅ Checked
- **Require review from Code Owners**: ❌ Unchecked (no CODEOWNERS file yet)

**Purpose**: Ensures all code changes are reviewed before merging.

#### 2. **Require status checks to pass before merging** ✅

- **Enable**: ✅ Checked
- **Require branches to be up to date before merging**: ✅ Checked

**Required status checks** (search and add these):

- `lint` - ESLint code quality check
- `typecheck` - TypeScript compilation check
- `test` - Unit and integration tests
- `e2e` - End-to-end tests
- `build` - Production build verification
- `security` - Security scanning (npm audit + secret scanning)
- `quality-gate` - Overall quality gate verification

**Purpose**: Ensures all automated quality gates pass before merging.

#### 3. **Require conversation resolution before merging** ✅

- **Enable**: ✅ Checked

**Purpose**: Ensures all review comments are addressed.

#### 4. **Require signed commits** ⚠️

- **Enable**: ❌ Optional (recommended for teams)

**Purpose**: Verifies commit authenticity with GPG signatures.

**Note**: Skip this for solo development to avoid setup overhead.

#### 5. **Require linear history** ✅

- **Enable**: ✅ Checked

**Purpose**: Enforces squash merging, keeping main branch history clean.

#### 6. **Do not allow bypassing the above settings** ✅

- **Enable**: ✅ Checked
- **Include administrators**: ✅ Checked

**Purpose**: Prevents bypassing protection rules, even for admins.

#### 7. **Restrict who can push to matching branches** ❌

- **Enable**: ❌ Unchecked (for solo development)

**Purpose**: Limits direct pushes to main. Not needed if "Require pull requests" is enabled.

#### 8. **Allow force pushes** ❌

- **Enable**: ❌ Unchecked (NEVER allow force pushes to main!)

**Purpose**: Prevents rewriting history on main branch.

#### 9. **Allow deletions** ❌

- **Enable**: ❌ Unchecked (NEVER allow deleting main!)

**Purpose**: Prevents accidental deletion of main branch.

---

## Configuration Summary

```yaml
branch: main
protection_rules:
  require_pull_request:
    enabled: true
    required_approving_review_count: 1
    dismiss_stale_reviews: true
    require_code_owner_reviews: false

  require_status_checks:
    enabled: true
    strict: true # Require branches up to date
    contexts:
      - lint
      - typecheck
      - test
      - e2e
      - build
      - security
      - quality-gate

  require_conversation_resolution: true
  require_signed_commits: false
  require_linear_history: true

  restrictions:
    users: []
    teams: []
    apps: []

  allow_force_pushes: false
  allow_deletions: false
  block_creations: false

  enforce_admins: true
```

---

## Verification

After configuring branch protection rules, verify they're working:

### 1. **Test Direct Push (Should Fail)**

```bash
# This should be rejected
git checkout main
git commit --allow-empty -m "test"
git push origin main

# Expected error:
# remote: error: GH006: Protected branch update failed
```

### 2. **Test PR Without Checks (Should Block)**

- Create a PR to main
- Try to merge before CI completes
- **Expected**: Merge button disabled until all checks pass

### 3. **Test Force Push (Should Fail)**

```bash
# This should be rejected
git push origin main --force

# Expected error:
# remote: error: GH006: Protected branch update failed
```

---

## Workflow After Branch Protection

### Standard Development Flow

1. **Create feature branch** from main:

   ```bash
   git checkout main
   git pull origin main
   git checkout -b feature/new-feature
   ```

2. **Make changes and commit**:

   ```bash
   git add .
   git commit -m "feat(scope): description"
   ```

3. **Push feature branch**:

   ```bash
   git push origin feature/new-feature
   ```

4. **Create Pull Request** on GitHub

5. **Wait for CI checks** to complete:
   - All 7 quality gates must pass (lint, typecheck, test, e2e, build, security, quality-gate)
   - Reviews required: 1 approval

6. **Address review comments** if any

7. **Merge via "Squash and merge"**:
   - Creates single commit on main
   - Keeps history clean

8. **Delete feature branch** after merge

---

## CI/CD Integration

### Current Quality Gates (7 total)

| Gate          | Purpose                           | Failure Impact           |
| ------------- | --------------------------------- | ------------------------ |
| `lint`        | Code style (ESLint + Prettier)    | Blocks merge             |
| `typecheck`   | TypeScript compilation            | Blocks merge             |
| `test`        | Unit/integration tests (>80% cov) | Blocks merge             |
| `e2e`         | End-to-end tests (Playwright)     | Blocks merge             |
| `build`       | Production build verification     | Blocks merge             |
| `security`    | npm audit + secret scanning       | Blocks merge             |
| `quality-gate | Aggregate status of all gates     | Blocks merge if any fail |

### Coverage Threshold

**Baseline Coverage** (Slice 0): Prevents regression from current levels

```typescript
// jest.config.ts
coverageThreshold: {
  global: {
    branches: 40,
    functions: 30,
    lines: 18,
    statements: 18,
  },
}
```

**Enforcement**: Jest will fail if coverage drops below baseline

**Target Coverage** (Future): 80% across all metrics

- Will be increased incrementally as we add tests in Slice 1+
- Each new feature should have comprehensive test coverage
- Goal: Reach 80% by end of Slice 3

---

## Module 03 Compliance

This configuration aligns with **Module 03: Version Control** requirements:

| Requirement                    | Status | Implementation          |
| ------------------------------ | ------ | ----------------------- |
| Trunk-Based Development        | ✅     | Main branch only        |
| Protected main branch          | ✅     | Branch protection rules |
| Required code reviews          | ✅     | 1 approval required     |
| Required status checks         | ✅     | 7 quality gates         |
| No force pushes                | ✅     | Disabled                |
| No deletions                   | ✅     | Disabled                |
| Require up-to-date branches    | ✅     | Strict mode enabled     |
| Conversation resolution        | ✅     | Required                |
| Linear history (squash merge)  | ✅     | Enforced                |
| Security scanning              | ✅     | npm audit + TruffleHog  |
| Code coverage threshold        | ✅     | 80% minimum             |
| Automated testing              | ✅     | Unit, integration, E2E  |
| Continuous integration         | ✅     | GitHub Actions          |
| Continuous deployment          | ✅     | Vercel auto-deploy      |
| Feature flags                  | ✅     | 17 flags configured     |
| Conventional commits           | ✅     | Documented + enforced   |
| Short-lived feature branches   | ✅     | <1-2 days max           |
| Immediate branch deletion      | ✅     | After merge             |
| Pull request template          | 🔜     | Phase 2                 |
| Commit message validation      | 🔜     | Phase 2                 |
| CODEOWNERS                     | 🔜     | Phase 4                 |
| Semantic versioning automation | 🔜     | Phase 2                 |

**Current Compliance**: 17/21 (81%) - Phase 1 complete

---

## Troubleshooting

### Issue: Can't merge PR even though checks passed

**Cause**: Branch not up to date with main

**Solution**:

```bash
git checkout feature/my-branch
git fetch origin
git rebase origin/main
git push origin feature/my-branch --force-with-lease
```

### Issue: CI checks not showing up

**Cause**: GitHub Actions workflow not triggered

**Solution**:

- Check `.github/workflows/ci.yml` exists
- Ensure `on: pull_request: branches: [main]` is configured
- Re-push commits to trigger workflow

### Issue: Coverage threshold failing

**Cause**: Code coverage below 80%

**Solution**:

- Run `pnpm test:coverage` locally
- Check coverage report in `coverage/lcov-report/index.html`
- Add tests for uncovered code
- Ensure new code has tests

---

## References

- [GitHub Branch Protection Documentation](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/about-protected-branches)
- [Module 03: Version Control](../../docs/quality-standards/docs/03-version-control/03-README.md)
- [CONTRIBUTING.md](../../CONTRIBUTING.md)
- [CI/CD Workflow](./.github/workflows/ci.yml)

---

**Last Updated**: 2025-10-25
**Module**: 03 - Version Control
**Phase**: 1 - Critical Security & Quality
