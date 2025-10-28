# Lessons Learned: Slice 1.1 - CI & Database Setup

**Date**: 2025-10-28
**Slice**: US-001 Slice 1.1 - Basic Product Listing
**Issue**: CI pipeline failures and Vercel deployment errors

---

## What Happened

After implementing Slice 1.1 and creating PR #24, we encountered failures in:

1. **Vercel Preview Deployment**:

   ```
   Error: The table `public.products` does not exist in the current database
   ```

2. **CI Pipeline - Unit & Integration Tests**: Failed (no database)

3. **CI Pipeline - E2E Tests**: Failed (no database)

4. **CI Pipeline - Quality Gate**: Failed (depends on tests)

### Root Causes

#### Issue 1: Using `prisma db push` Instead of Migrations

**What we did wrong**:

```bash
# Local development
pnpm db:push  # ❌ Only updates local database, creates NO migration files
```

**Why it's wrong**:

- `db push` doesn't create migration files
- Changes aren't version controlled
- Can't be deployed to other environments
- Vercel preview deployments had empty databases

**Correct approach**:

```bash
# Create migrations (version controlled)
pnpm prisma migrate dev --name descriptive_name  # ✅ Creates migration files
```

#### Issue 2: No Database in CI

**What we did wrong**:

- Integration tests used real `PrismaClient`
- CI had dummy DATABASE_URL: `postgresql://dummy:dummy@localhost:5432/dummy`
- Tests tried to connect to non-existent database → failure

**Why it's wrong**:

- Integration tests require a real database
- CI environment had no PostgreSQL service
- Tests couldn't run properly

#### Issue 3: Integration Tests as Unit Tests

**What we did wrong**:

- Wrote "integration" tests that depend on external database
- Didn't separate true unit tests from integration tests
- No guards to skip tests when database unavailable

**Why it's wrong**:

- Unit tests should NEVER depend on external systems
- Integration tests need explicit setup
- Tests should fail gracefully without dependencies

---

## How We Fixed It

### Fix 1: Created Prisma Migrations

```bash
# Reset database to clean state
pnpm prisma migrate reset --force --skip-seed

# Create initial migration
pnpm prisma migrate dev --name init_products_table

# Seed database
pnpm db:seed
```

**Result**:

- Migration file created: `prisma/migrations/20251028145814_init_products_table/migration.sql`
- Version controlled in git
- Can be deployed to any environment

### Fix 2: Added PostgreSQL to CI

Updated `.github/workflows/ci.yml`:

```yaml
test:
  name: Unit & Integration Tests
  runs-on: ubuntu-latest
  services:
    postgres: # ✅ Added PostgreSQL service
      image: postgres:16
      env:
        POSTGRES_USER: test
        POSTGRES_PASSWORD: test
        POSTGRES_DB: test
      options: >-
        --health-cmd pg_isready
        --health-interval 10s
        --health-timeout 5s
        --health-retries 5
      ports:
        - 5432:5432
  steps:
    - name: Run Prisma migrations # ✅ Run migrations in CI
      run: pnpm prisma migrate deploy
      env:
        DATABASE_URL: postgresql://test:test@localhost:5432/test

    - name: Seed test database # ✅ Seed test data
      run: pnpm db:seed
      env:
        DATABASE_URL: postgresql://test:test@localhost:5432/test
```

### Fix 3: Added Database Guards to Integration Tests

```typescript
// src/__tests__/integration/seed.test.ts
const hasDatabase = !!process.env.DATABASE_URL;

// Skip all tests if no database configured
const describeIfDatabase = hasDatabase ? describe : describe.skip;

describeIfDatabase('Seed Data (Integration Tests)', () => {
  // Tests only run if DATABASE_URL is set
});
```

**Result**:

- Tests skip gracefully if no database
- No false failures in environments without database
- Clear indication in test output when skipped

### Fix 4: Updated Build Scripts for Vercel

```json
{
  "scripts": {
    "build": "prisma migrate deploy && prisma generate && next build",
    "vercel-build": "prisma migrate deploy && prisma generate && next build"
  }
}
```

**Result**:

- Vercel runs migrations before building
- Preview deployments have correct schema
- Production deployments stay in sync

---

## Prevention Strategies

### 1. Always Use Migrations for Schema Changes

**DO**:

```bash
# Development
pnpm prisma migrate dev --name add_users_table

# Production/CI
pnpm prisma migrate deploy
```

**DON'T**:

```bash
pnpm db:push  # ❌ Never use in team projects
```

### 2. Separate Unit Tests from Integration Tests

**Unit Tests** (no external dependencies):

- Mock all external services
- Fast execution
- Run everywhere (local, CI, pre-commit)

**Integration Tests** (requires database):

- Use real database
- Test actual interactions
- Run in CI with test database
- Skip if DATABASE_URL not available

### 3. Configure CI from the Start

When adding database-dependent features:

1. Add PostgreSQL service to CI
2. Configure DATABASE_URL environment variable
3. Run migrations in CI before tests
4. Seed test data

### 4. Document Database Setup

Update:

- `README.md` - Database setup instructions
- `CONTRIBUTING.md` - Migration workflow
- `.env.example` - Required environment variables

---

## Key Learnings

### For Unit Tests

✅ **DO**:

- Mock external dependencies
- Test pure logic
- Run without any setup
- Execute quickly (<1s per test)

❌ **DON'T**:

- Connect to real databases
- Make HTTP requests
- Read/write files
- Depend on environment variables

### For Integration Tests

✅ **DO**:

- Use real database (in CI)
- Test actual integrations
- Skip gracefully if dependencies missing
- Document setup requirements

❌ **DON'T**:

- Assume database always available
- Use production database
- Leave tests hanging without connection

### For CI/CD

✅ **DO**:

- Provide all necessary services (database, redis, etc.)
- Run migrations before tests
- Seed test data
- Use health checks for services

❌ **DON'T**:

- Use dummy connection strings
- Skip database setup
- Assume services are available

---

## Checklist for Future Features

When adding database-dependent features:

- [ ] Create Prisma migration (not `db push`)
- [ ] Update CI workflow if new services needed
- [ ] Add database guards to integration tests
- [ ] Update build scripts if needed
- [ ] Document setup in README
- [ ] Test locally with fresh database
- [ ] Verify CI passes before merging
- [ ] Check Vercel preview deployment works

---

## Impact

**Before Fix**:

- ❌ CI: 3/7 quality gates failing
- ❌ Vercel: Preview deployments crashed
- ❌ Tests: Integration tests couldn't run in CI

**After Fix**:

- ✅ CI: All quality gates passing
- ✅ Vercel: Preview deployments working
- ✅ Tests: 30/30 tests passing in CI
- ✅ Database: Migrations version controlled

---

## References

- **Prisma Migrations**: https://www.prisma.io/docs/concepts/components/prisma-migrate
- **GitHub Actions Services**: https://docs.github.com/en/actions/using-containerized-services
- **Testing Best Practices**: [Module 05 - Test Levels](../../quality-standards/05-test-levels/)

---

**Related Files**:

- `.github/workflows/ci.yml` - CI configuration
- `package.json` - Build scripts
- `prisma/migrations/` - Migration files
- `src/__tests__/integration/` - Integration tests with guards
