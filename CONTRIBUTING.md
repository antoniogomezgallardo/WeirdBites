# Contributing to WeirdBites

Thank you for your interest in contributing to WeirdBites! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Development Workflow](#development-workflow)
- [Getting Started](#getting-started)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Commit Message Convention](#commit-message-convention)
- [Branch Naming Convention](#branch-naming-convention)

## Code of Conduct

This project follows professional software engineering practices. We expect all contributors to:

- Write clean, maintainable code
- Follow the established coding standards
- Write comprehensive tests
- Document their changes
- Be respectful in code reviews

## Development Workflow

We follow **Trunk-Based Development (TBD)** with Pull Requests:

1. **Create a feature branch** from `main`
2. **Make changes** in small, focused commits
3. **Write tests** for your changes
4. **Run quality checks** locally
5. **Push and create** a Pull Request
6. **Wait for CI** to pass (all 7 quality gates)
7. **Complete self-review** using checklist
8. **Get code review** (optional for solo development)
9. **Squash and merge** to `main`
10. **Delete the feature branch**

### Key Principles

- **Short-lived branches**: Max 1-2 days
- **Small, frequent commits**: 3-5 commits per feature
- **Always deployable**: Every commit to `main` is production-ready
- **Feature flags**: Use flags for incomplete features
- **Test-driven**: Write tests before or alongside code

## Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** 18+ (v20.18.0 recommended)
- **pnpm** 10+ (v10.16.0 recommended)
- **PostgreSQL** 14+ (or Supabase/Neon account)
- **Git** 2.13+

### Setup

Follow the setup instructions in [README.md](README.md#getting-started) to get your development environment running.

### Quick Start

```bash
# 1. Clone repository
git clone --recurse-submodules https://github.com/antoniogomezgallardo/WeirdBites.git
cd WeirdBites

# 2. Install dependencies
pnpm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env with your DATABASE_URL

# 4. Set up database
pnpm prisma migrate dev  # Run migrations (creates tables)
pnpm db:seed              # Seed with test data

# 5. Run development server
pnpm dev

# 6. Verify everything works
pnpm lint && pnpm tsc && pnpm test
```

## Pull Request Process

### 1. Create Feature Branch

```bash
# Make sure main is up to date
git checkout main
git pull origin main

# Create feature branch
git checkout -b feature/add-product-listing
```

**Branch naming conventions**:

- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code improvements
- `test/description` - Test improvements

### 2. Make Changes

```bash
# Make your changes in small, logical commits
git add .
git commit -m "feat(products): add getProducts function"

# Continue making commits
git commit -m "test(products): add unit tests for getProducts"
git commit -m "docs(products): add API documentation"
```

### 3. Run Quality Checks

**Before pushing**, run all quality checks locally:

```bash
# Lint check
pnpm lint

# Type check
pnpm tsc

# Unit tests
pnpm test

# E2E tests (if applicable)
pnpm test:e2e

# Format check
pnpm format:check
```

**Fix any issues**:

```bash
# Auto-fix linting issues
pnpm lint:fix

# Auto-format code
pnpm format
```

### 4. Push and Create PR

```bash
# Push feature branch
git push origin feature/add-product-listing

# Create PR using GitHub CLI
gh pr create --base main --title "feat: add product listing page" --body "Description of changes"

# OR create PR on GitHub web interface
```

### 5. CI Checks

GitHub Actions will automatically run **7 quality gates**:

1. **Lint** - ESLint checks
2. **Type Check** - TypeScript compilation
3. **Unit Tests** - Jest tests
4. **E2E Tests** - Playwright tests
5. **Build** - Production build verification
6. **Security** - TruffleHog + npm audit
7. **Quality Gate** - Overall quality check

**All must pass before merging!** ✅

### 6. Self-Review (Required)

**Before requesting review**, complete the [Self-Review Checklist](docs/03-version-control/templates/self-review-checklist.md):

```bash
# 1. Review your own diff on GitHub
# Visit: https://github.com/antoniogomezgallardo/WeirdBites/compare/main...your-branch

# 2. Complete the checklist
- [ ] Pre-submission checks (CI passed, branch updated, manual testing)
- [ ] Code quality (naming, DRY, KISS, TypeScript)
- [ ] Testing (coverage >80%, all tests pass)
- [ ] Security (no secrets, input validation, auth checks)
- [ ] Performance (efficient queries, pagination, caching)
- [ ] Documentation (JSDoc, README updates, env vars)
- [ ] PR quality (title, description, commits)
```

**Why self-review?**

- Catches 60-80% of issues before formal review
- Faster PR approval (fewer review cycles)
- Respects reviewers' time
- Improves your code quality over time

**Check the box** in the PR template: `- [x] Self-Review Completed`

### 7. Code Review

#### For Solo Development

Self-review is acceptable using both checklists:

1. **Self-Review Checklist**: [templates/self-review-checklist.md](docs/03-version-control/templates/self-review-checklist.md)
2. **Code Review Checklist**: [templates/code-review-checklist.md](docs/03-version-control/templates/code-review-checklist.md)

Review your code as if you were reviewing someone else's work.

#### For Team Development

**As Author**:

1. Complete self-review checklist
2. Request review from team member
3. Respond to feedback within 24 hours
4. Push fixes (CI re-runs automatically)
5. Re-request review after addressing feedback

**As Reviewer**:

1. Review within 24 hours (same day preferred)
2. Use [Code Review Checklist](docs/03-version-control/templates/code-review-checklist.md)
3. Provide constructive, specific feedback
4. Use comment prefixes: `blocking:`, `nit:`, `question:`, `praise:`
5. Choose action: Approve, Request Changes, or Comment

**Review Guidelines**:

- See [Review Guidelines](docs/03-version-control/review-guidelines.md) for comprehensive guide
- Focus on: functionality, design, tests, security, performance
- Be kind and constructive
- Explain WHY, not just WHAT
- Acknowledge good work

**Response Times**:

- Production bugs: < 4 hours
- Blocking PRs: < 8 hours
- Feature PRs: < 24 hours
- Documentation: < 48 hours

### 8. Merge PR

Once CI passes and review is complete:

```bash
# On GitHub: Click "Squash and merge"
# This creates a single, clean commit on main

# IMPORTANT: Delete the feature branch after merging
```

### 9. Clean Up Locally

```bash
# Switch back to main
git checkout main

# Pull latest changes
git pull origin main

# Delete local feature branch
git branch -d feature/add-product-listing

# Verify main is clean
git status
```

## Coding Standards

### TypeScript

- **Strict mode enabled**: All TypeScript strict checks are on
- **No `any` types**: Use proper types or `unknown`
- **Interfaces over types**: Prefer interfaces for objects
- **Explicit return types**: Always specify function return types

### Code Style

- **Prettier formatting**: All code is auto-formatted
- **ESLint rules**: Follow Next.js and React best practices
- **File naming**: Use `kebab-case.tsx` for components, `camelCase.ts` for utilities
- **Component naming**: Use `PascalCase` for React components

### Best Practices

- **DRY**: Don't Repeat Yourself
- **SOLID principles**: Follow object-oriented design principles
- **Composition over inheritance**: Prefer composition
- **Pure functions**: Minimize side effects
- **Error handling**: Always handle errors gracefully

## Testing Guidelines

### Test Coverage Requirements

- **Minimum coverage**: 80% overall
- **Unit tests**: Cover all business logic
- **Integration tests**: Cover API routes
- **E2E tests**: Cover critical user flows

### Writing Tests

**Unit Tests** (Jest + Testing Library):

```typescript
// src/hooks/__tests__/useFeature.test.ts
import { renderHook } from '@testing-library/react';
import { useFeature } from '../useFeature';

describe('useFeature', () => {
  it('returns true for enabled features', () => {
    const { result } = renderHook(() => useFeature('productFiltering'));
    expect(result.current).toBe(true);
  });
});
```

**E2E Tests** (Playwright):

```typescript
// tests/e2e/products.spec.ts
import { test, expect } from '@playwright/test';

test('should display product list', async ({ page }) => {
  await page.goto('/products');
  await expect(page.locator('h1')).toContainText('Products');
});
```

### Running Tests

```bash
# Unit tests
pnpm test                 # Run once
pnpm test:watch          # Watch mode
pnpm test:coverage       # With coverage

# E2E tests
pnpm test:e2e            # Headless
pnpm test:e2e:ui         # With UI
pnpm test:e2e:headed     # Headed mode
```

## Database Migrations

**IMPORTANT**: Always use Prisma migrations for schema changes. Never use `db:push` in production or shared environments.

### When to Create a Migration

Create a migration whenever you modify `prisma/schema.prisma`:

- Adding/removing models
- Adding/removing fields
- Changing field types
- Adding indexes or constraints

### Creating Migrations

```bash
# 1. Modify prisma/schema.prisma
# 2. Create migration
pnpm prisma migrate dev --name descriptive_name

# Examples:
pnpm prisma migrate dev --name add_users_table
pnpm prisma migrate dev --name add_email_to_users
pnpm prisma migrate dev --name add_index_on_email
```

**What happens**:

- Creates migration file in `prisma/migrations/`
- Applies migration to your local database
- Regenerates Prisma Client

### Applying Migrations

**Local Development**:

```bash
pnpm prisma migrate dev  # Apply pending migrations
```

**CI/Production** (automatic):

- CI: Runs `prisma migrate deploy` before tests
- Vercel: Runs migrations during build (configured in `package.json`)

### Migration Best Practices

✅ **DO**:

- Create descriptive migration names
- Review generated SQL before committing
- Test migrations on a copy of production data
- Commit migration files to git
- Run migrations before seeding

❌ **DON'T**:

- Use `db:push` (only for prototyping, never commit)
- Manually edit migration files after creation
- Delete migrations that have been deployed
- Skip migrations in the deployment process

### Integration Tests with Database

Integration tests require a real database. They automatically skip if DATABASE_URL is not set:

```typescript
// Tests skip gracefully without database
const hasDatabase = !!process.env.DATABASE_URL;
const describeIfDatabase = hasDatabase ? describe : describe.skip;

describeIfDatabase('Integration Tests', () => {
  // Tests only run if DATABASE_URL is set
});
```

**CI Setup**: CI workflow automatically provides PostgreSQL service for integration tests.

### Troubleshooting

**Migration conflicts**:

```bash
# Reset database (WARNING: deletes all data)
pnpm prisma migrate reset --force

# Re-apply all migrations
pnpm prisma migrate deploy
```

**Schema drift** (local DB doesn't match schema):

```bash
# Generate new migration from schema
pnpm prisma migrate dev --name fix_drift
```

For more details, see [Lessons Learned: CI & Database Setup](docs/lessons-learned/slice-1.1-ci-database-setup.md)

## Commit Message Convention

We follow **Conventional Commits** format:

```
type(scope): description

[optional body]

[optional footer]
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `test`: Test additions or changes
- `refactor`: Code refactoring
- `style`: Code style changes (formatting)
- `chore`: Build process or auxiliary tool changes
- `ci`: CI/CD changes

### Examples

```bash
# Feature
git commit -m "feat(products): add product filtering"

# Bug fix
git commit -m "fix(cart): prevent duplicate items"

# Documentation
git commit -m "docs(readme): update setup instructions"

# Test
git commit -m "test(checkout): add payment flow E2E tests"

# Refactor
git commit -m "refactor(api): extract validation logic"
```

### Commit Footer

Add co-authorship for AI assistance:

```
feat(auth): add user registration

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

## Branch Naming Convention

| Type          | Pattern                | Example                       |
| ------------- | ---------------------- | ----------------------------- |
| Feature       | `feature/description`  | `feature/add-product-search`  |
| Bug Fix       | `fix/description`      | `fix/cart-quantity-bug`       |
| Documentation | `docs/description`     | `docs/update-api-guide`       |
| Refactor      | `refactor/description` | `refactor/extract-validation` |
| Test          | `test/description`     | `test/add-checkout-tests`     |

**Guidelines**:

- Use lowercase with hyphens
- Be descriptive but concise
- Max 50 characters
- No ticket numbers (use in commit message)

## Project Structure

```
WeirdBites/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   └── (pages)/           # Page routes
│   ├── components/            # React components
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utility functions
│   ├── types/                 # TypeScript type definitions
│   └── config/                # Configuration files
├── tests/
│   └── e2e/                   # Playwright E2E tests
├── prisma/
│   └── schema.prisma          # Database schema
├── docs/                      # Documentation
│   ├── 01-requirements/       # Requirements docs
│   ├── 02-agile-planning/     # Planning docs
│   └── quality-standards/     # QA standards (submodule)
├── .github/
│   └── workflows/             # GitHub Actions CI/CD
└── .claude/                   # Claude AI configuration
```

## Documentation Standards

### Code Comments

- **JSDoc for public APIs**: Document all exported functions
- **Inline comments**: Explain "why", not "what"
- **TODO comments**: Include ticket number

```typescript
/**
 * Fetches products with optional filtering and pagination
 *
 * @param filters - Product filter criteria
 * @param pagination - Pagination options (page, pageSize)
 * @returns Promise resolving to paginated product list
 * @throws {ValidationError} If filters are invalid
 */
export async function getProducts(
  filters: ProductFilters,
  pagination: PaginationOptions
): Promise<PaginatedResponse<Product>> {
  // Implementation
}
```

### README Updates

When adding new features, update:

- [README.md](README.md) - If public-facing feature
- [CLAUDE.md](CLAUDE.md) - If affects AI guidance
- Module docs - If relates to requirements/planning

## Feature Flags

Use feature flags for:

- Incomplete features
- Gradual rollouts
- A/B testing
- Emergency kill switches

```typescript
// src/config/features.ts
export const features = {
  productSearch: false, // Not ready yet
  checkout: true,       // Ready for production
};

// Usage in components
import { useFeature } from '@/hooks/useFeature';

export function ProductPage() {
  const searchEnabled = useFeature('productSearch');

  return (
    <div>
      {searchEnabled && <ProductSearch />}
      <ProductList />
    </div>
  );
}
```

## Questions or Issues?

- **Documentation**: Start with [docs/START-HERE.md](docs/START-HERE.md)
- **Setup issues**: Check [README.md Troubleshooting](README.md#troubleshooting)
- **GitHub Issues**: Open an issue for bugs or feature requests
- **Discussions**: Use GitHub Discussions for questions

## Resources

- [Quality Standards](docs/quality-standards/) - Comprehensive QA documentation
- [Product Backlog](docs/01-requirements/product-backlog.md) - Feature list
- [Vertical Slices](docs/01-requirements/vertical-slices.md) - Deployment increments
- [Module 02: Agile Planning](docs/02-agile-planning/) - Sprint planning guides

---

**Thank you for contributing to WeirdBites!** 🎉

_Last Updated: 2025-10-28_
