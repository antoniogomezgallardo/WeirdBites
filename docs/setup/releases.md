# Release Management Guide

## Overview

WeirdBites uses **manual release triggers** with semantic versioning. This means:

- ✅ You control when releases happen
- ✅ Releases map to meaningful milestones (Slices, Phases, Features)
- ✅ Automatic version calculation from commit messages
- ❌ No automatic releases on every PR merge

## Release Strategy

### Version Mapping

- **v0.1.0** - Slice 0: Project Setup
- **v0.2.0** - Phase 1-2: Module 03 alignment (Security + Commit Validation)
- **v0.3.0** - Slice 1: Browse Products
- **v0.4.0** - Slice 2: Product Details
- **v1.0.0** - MVP Complete

### When to Create Releases

- ✅ **End of Slice** - After completing all stories in a slice
- ✅ **End of Phase** - After completing a major module alignment
- ✅ **Before Demo** - When showcasing work to stakeholders
- ✅ **Major Milestone** - Significant feature completion
- ❌ **Individual PRs** - Don't release for every small change

## How to Create a Release

You have **3 methods** to trigger a release:

### Method 1: GitHub UI (Easiest)

**Step-by-step:**

1. Go to **Actions** tab in GitHub
2. Click **"Release"** workflow in left sidebar
3. Click **"Run workflow"** dropdown (top right)
4. Select branch: `main`
5. **Optional**: Check "Dry run" to preview without creating release
6. Click **"Run workflow"** button
7. Wait ~1 minute for workflow to complete
8. Check **Releases** page for new release

**Screenshot locations:**

```
GitHub Repo → Actions → Release (left) → Run workflow (right) → Run workflow (button)
```

### Method 2: Git Tag (Developer-Friendly)

**When to use**: When you want to explicitly set the version number.

**Step-by-step:**

```bash
# 1. Make sure you're on main and up to date
git checkout main
git pull origin main

# 2. Create annotated tag with version
git tag -a v0.2.0 -m "Phase 2 Complete: Commit Validation & Security"

# 3. Push tag to GitHub
git push origin v0.2.0

# 4. GitHub Actions automatically creates release
```

**Tag naming convention:**

- `v0.2.0` - Minor version (new features)
- `v0.2.1` - Patch version (bug fixes)
- `v1.0.0` - Major version (breaking changes or MVP)

### Method 3: GitHub CLI (Advanced)

**When to use**: Automating releases or scripting.

```bash
# Trigger release workflow manually
gh workflow run release.yml

# With dry-run option
gh workflow run release.yml -f dry_run=true

# Watch the workflow run
gh run watch
```

## How semantic-release Determines Version

semantic-release analyzes **all commits since the last release** and determines the version bump:

### Commit Types → Version Bump

| Commit Type              | Example                    | Version Bump   | New Version   |
| ------------------------ | -------------------------- | -------------- | ------------- |
| `feat:`                  | `feat(auth): add login`    | **MINOR**      | 0.1.0 → 0.2.0 |
| `fix:`                   | `fix(api): handle null`    | **PATCH**      | 0.2.0 → 0.2.1 |
| `perf:`                  | `perf(db): optimize query` | **PATCH**      | 0.2.1 → 0.2.2 |
| `BREAKING CHANGE:`       | Footer in commit           | **MAJOR**      | 0.2.2 → 1.0.0 |
| `docs:`                  | `docs: update README`      | **PATCH**      | 0.2.2 → 0.2.3 |
| `refactor:`              | `refactor: simplify code`  | **PATCH**      | 0.2.3 → 0.2.4 |
| `test:`, `ci:`, `chore:` | Various                    | **No release** | -             |

### Example Scenario

**Commits since last release (v0.1.0):**

```
feat(security): add security scanning (#13)
feat(quality): add commit validation (#14)
fix(ci): update Node.js version (#15)
fix(ci): remove git plugin (#16)
```

**Result**: Version **v0.2.0** (two `feat:` commits = MINOR bump)

## Dry Run (Preview Mode)

Before creating a real release, you can **preview** what would happen:

**Using GitHub UI:**

1. Go to Actions → Release → Run workflow
2. ✅ Check "Dry run (preview without creating release)"
3. Click "Run workflow"
4. View logs to see what version would be created

**Using CLI:**

```bash
gh workflow run release.yml -f dry_run=true
```

**What dry-run shows:**

- ✅ What version would be created
- ✅ Which commits would be included
- ✅ What the release notes would say
- ❌ Does NOT create actual release
- ❌ Does NOT create git tag

## What Gets Created

When you trigger a release, semantic-release creates:

### 1. GitHub Release

**Location**: `https://github.com/antoniogomezgallardo/WeirdBites/releases`

**Contents**:

- Release title: `v0.2.0`
- Release notes with commits grouped by type:

  ```markdown
  ## ✨ Features

  - **security**: add security scanning and coverage thresholds (#13)
  - **quality**: add commit validation and enhanced pre-commit hooks (#14)

  ## 🐛 Bug Fixes

  - **ci**: update semantic-release workflow to use Node.js 22 (#15)
  - **ci**: remove git plugin from semantic-release (#16)
  ```

### 2. Git Tag

**Created automatically** with the version number (e.g., `v0.2.0`)

**View tags:**

```bash
git fetch --tags
git tag -l
```

## Common Workflows

### Scenario 1: Completing a Slice

**Situation**: You've merged 5 PRs and completed Slice 1

**Steps**:

1. Verify all PRs merged and CI passed
2. Go to GitHub Actions → Release → Run workflow
3. Run workflow (dry-run first if unsure)
4. Release created: `v0.3.0 - Slice 1: Browse Products`
5. Share release URL with stakeholders

### Scenario 2: Emergency Hotfix

**Situation**: Critical bug found in production

**Steps**:

1. Create hotfix PR with `fix:` commit
2. Merge PR to main
3. Immediately trigger release (Method 1 or 2)
4. Release created: `v0.2.1` (patch version)

### Scenario 3: Module Alignment Phase

**Situation**: Completed Phase 2 of Module 03

**Steps**:

1. All Phase 2 PRs merged
2. Use git tag method for explicit control:
   ```bash
   git tag -a v0.2.0 -m "Module 03 Phase 2: Commit Validation Complete"
   git push origin v0.2.0
   ```
3. Release created automatically

## Troubleshooting

### "No release created"

**Cause**: No commits that trigger releases (only `chore:`, `test:`, `ci:`)

**Solution**:

- Check commit types since last release
- Ensure at least one `feat:`, `fix:`, `perf:`, or `docs:` commit exists

### "Release workflow failed"

**Common causes**:

1. Branch protection blocking push (fixed in PR #16)
2. Node.js version mismatch (fixed in PR #15)
3. Invalid commit messages (commitlint will catch these)

**Check logs**:

```bash
gh run list --workflow=release.yml
gh run view <run-id> --log
```

### "Wrong version created"

**Cause**: semantic-release analyzes commits incorrectly

**Solution**:

- Use git tag method to explicitly set version
- Or use dry-run first to preview

## Best Practices

### 1. Release Naming

Use descriptive tag messages:

```bash
# ✅ Good
git tag -a v0.3.0 -m "Slice 1: Browse Products - Complete product listing with search and filters"

# ❌ Bad
git tag -a v0.3.0 -m "new version"
```

### 2. Pre-Release Checklist

Before creating a release:

- [ ] All PRs merged and CI passing
- [ ] Run dry-run to preview version
- [ ] Update CLAUDE.md with "Slice X Complete"
- [ ] Verify all acceptance criteria met
- [ ] Test on staging/preview deployment

### 3. Post-Release Tasks

After creating a release:

- [ ] Verify release appears on Releases page
- [ ] Test production deployment
- [ ] Announce in team chat/email
- [ ] Update project board/tracking

### 4. Semantic Commit Messages

Always use conventional commits:

```bash
# These trigger releases:
feat(products): add product search
fix(api): handle edge case in pagination
perf(db): optimize product queries
docs(setup): add deployment guide

# These don't trigger releases:
chore: update dependencies
test: add missing unit tests
ci: update workflow config
```

## Module 03 Compliance

This release workflow aligns with:

- ✅ **Module 03: Version Control** - Semantic versioning and release automation
- ✅ **Conventional Commits** - Structured commit messages
- ✅ **Trunk-Based Development** - Short-lived branches, frequent integration
- ✅ **Quality Gates** - CI must pass before release

## References

- [semantic-release Documentation](https://semantic-release.gitbook.io/)
- [Conventional Commits Specification](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
- [GitHub Releases](https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases)

---

**Last Updated**: 2025-10-25
**Related**: Module 03: Version Control, Trunk-Based Development
