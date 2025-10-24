# GitHub Repository Setup Guide

**Purpose**: Manual configuration steps required after pushing code to GitHub.

**When to Use**: After completing IS-006 (CI/CD Pipeline) and pushing to GitHub repository.

---

## 1. Branch Protection Rules for `main`

**Why**: Prevents direct pushes to `main`, ensures all changes go through PRs with CI validation.

### Steps:

1. Go to your GitHub repository
2. Click **Settings** (top navigation)
3. Click **Branches** (left sidebar under "Code and automation")
4. Click **Add branch protection rule**
5. Configure as follows:

#### **Branch name pattern:**
```
main
```

#### **Protection Settings:**

✅ **Require a pull request before merging**
- ✅ Require approvals: `1` (or `0` if working solo)
- ✅ Dismiss stale pull request approvals when new commits are pushed
- ✅ Require review from Code Owners (optional)

✅ **Require status checks to pass before merging**
- ✅ Require branches to be up to date before merging
- Search and select these status checks (they appear after first CI run):
  - `lint`
  - `typecheck`
  - `test`
  - `e2e`
  - `build`
  - `quality-gate`

✅ **Require conversation resolution before merging**

✅ **Require signed commits** (optional, but recommended)

✅ **Require linear history**

❌ **Do not allow bypassing the above settings** (checked)

✅ **Restrict who can push to matching branches**
- Leave empty to block everyone from direct push

❌ **Allow force pushes** (unchecked)

❌ **Allow deletions** (unchecked)

6. Click **Create** or **Save changes**

---

## 2. GitHub Actions Secrets (For IS-007 Deployment)

**When**: During IS-007 (Vercel Deployment setup)

### Required Secrets:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Add the following secrets:

#### **CODECOV_TOKEN** (Optional - for coverage reporting)
- Name: `CODECOV_TOKEN`
- Value: Get from [codecov.io](https://codecov.io) after signing up
- Status: Optional (CI won't fail without it)

#### **For Vercel Deployment** (IS-007):
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

(Instructions will be provided in IS-007)

---

## 3. Verify CI/CD Setup

### After First Push:

1. Go to **Actions** tab
2. You should see the "CI" workflow
3. Click on a workflow run to see:
   - ✅ lint job
   - ✅ typecheck job
   - ✅ test job
   - ✅ e2e job
   - ✅ build job
   - ✅ quality-gate job

### Test with a Pull Request:

```bash
# 1. Create test branch
git checkout -b test/verify-ci
echo "# CI Test" >> TEST.md
git add TEST.md
git commit -m "test: verify CI workflow"
git push origin test/verify-ci

# 2. Go to GitHub → Pull Requests → New pull request
# 3. Base: main ← Compare: test/verify-ci
# 4. Create pull request
# 5. Watch CI run automatically
# 6. Verify all checks pass before merging
# 7. Merge and delete branch
```

---

## 4. Enable GitHub Actions (If Not Auto-Enabled)

1. Go to **Settings** → **Actions** → **General**
2. Under "Actions permissions":
   - ✅ Allow all actions and reusable workflows
3. Under "Workflow permissions":
   - ✅ Read and write permissions
   - ✅ Allow GitHub Actions to create and approve pull requests

---

## 5. Set Up Codecov Integration (Optional)

1. Go to [codecov.io](https://codecov.io)
2. Sign in with GitHub
3. Select your repository
4. Copy the `CODECOV_TOKEN`
5. Add it to GitHub Secrets (step 2 above)

**Note**: CI will still pass without Codecov token (it's optional).

---

## Verification Checklist

After completing setup:

- [ ] Branch protection rule created for `main`
- [ ] Status checks required: lint, typecheck, test, e2e, build, quality-gate
- [ ] Direct push to `main` is blocked
- [ ] Pull requests required for merging
- [ ] GitHub Actions enabled
- [ ] First CI workflow run completed successfully
- [ ] Test PR created and merged successfully

---

## Troubleshooting

### "Status checks not appearing in branch protection"

**Solution**: Status checks only appear AFTER the first CI run.

1. Push code to `main` or create a PR
2. Wait for CI to complete
3. Return to branch protection settings
4. Status checks should now be available to select

### "CI workflow not running"

**Solution**:

1. Check **Actions** tab → Verify workflows are enabled
2. Check `.github/workflows/ci.yml` exists
3. Verify GitHub Actions permissions are set correctly

### "Required checks are blocking my PR"

**Solution**: This is working correctly! Fix the failing checks:

1. Click on the failed check to see logs
2. Fix the issue locally
3. Push new commits
4. CI will re-run automatically

---

## References

- [GitHub Branch Protection Rules](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
- [GitHub Actions Status Checks](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/collaborating-on-repositories-with-code-quality-features/about-status-checks)
- [Codecov GitHub Integration](https://docs.codecov.com/docs/github-tutorial)

---

**Last Updated**: 2025-10-24
**Related Stories**: IS-006 (CI/CD Pipeline), IS-007 (Deployment)
**Module**: 08 (CI/CD Pipeline)
