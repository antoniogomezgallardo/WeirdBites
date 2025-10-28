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

---

## Issue 4: Production Database Not Configured (Post-Merge)

**Date**: 2025-10-28 (After PR #24 merged)

### What Happened

After merging PR #24 with all CI checks passing ✅, the **production deployment showed a black screen** with error:

```
Failed to load products
Unable to fetch products. Please try again later.
```

**Critical Question**: How can all E2E tests pass but production fail with such a huge issue?

### Root Cause Analysis

**The Problem**: Environmental mismatch between CI and Production

| Environment             | Database Configuration                     | Result          |
| ----------------------- | ------------------------------------------ | --------------- |
| **CI (GitHub Actions)** | ✅ PostgreSQL service + migrations + seed  | E2E tests PASS  |
| **Vercel Preview**      | ✅ DATABASE_URL configured (WeirdBites DB) | Works correctly |
| **Vercel Production**   | ❌ DATABASE_URL configured BUT...          | Shows error     |
| **Production Database** | ❌ NO migrations run, NO seed data         | Empty database! |

### Why This Happened

1. **CI Environment** (GitHub Actions):
   - PostgreSQL service configured in workflow
   - DATABASE_URL: `postgresql://test:test@localhost:5432/test`
   - Migrations run automatically: `pnpm prisma migrate deploy`
   - Seed data populated: `pnpm db:seed`
   - **Result**: E2E tests connect successfully and pass ✅

2. **Vercel Production**:
   - DATABASE_URL was set (pointing to empty Neon database)
   - `vercel-build` script runs migrations
   - **BUT**: The production Neon database (`weirdbites-production`) had never been initialized!
   - `prisma.product.findMany()` returns empty array `[]`
   - Homepage shows "Failed to load products" error (from [page.tsx:40-48](src/app/page.tsx#L40-L48))

### Database Architecture Discovered

We had **3 separate Neon databases** (unnecessary complexity):

| Database Name         | Project ID           | Region       | Usage             | Status    |
| --------------------- | -------------------- | ------------ | ----------------- | --------- |
| WeirdBites            | small-bread-03305364 | eu-west-2    | Local dev (.env)  | ✅ Active |
| weirdbites-production | empty-term-17859536  | eu-central-1 | Vercel production | ❌ Empty  |
| weirdbites-staging    | long-base-09963869   | eu-central-1 | Unused            | ❌ Delete |

### The Fix

#### Step 1: Audit Neon Databases

```bash
# Install Neon CLI
npm install -g neonctl

# Authenticate
neonctl auth

# List all projects
neonctl projects list --org-id org-nameless-mode-77481300 --output json
```

**Found**: 3 databases, only 1 in use (local dev), production database empty.

#### Step 2: Configure Production Database

```bash
# Get production database connection string
neonctl connection-string empty-term-17859536 \
  --branch-id br-ancient-feather-agmqcjli \
  --role-name neondb_owner \
  --pooled

# Output:
# postgresql://neondb_owner:npg_...@ep-lively-fog-ag97t8jl-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require
```

#### Step 3: Update Vercel Environment Variables

```bash
# Install Vercel CLI
npm install -g vercel

# Login and link project
vercel login
vercel link --yes

# Remove old DATABASE_URL
vercel env rm DATABASE_URL production --yes

# Add correct DATABASE_URL
echo "postgresql://neondb_owner:npg_...@ep-lively-fog-ag97t8jl-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require" \
  | vercel env add DATABASE_URL production
```

#### Step 4: Initialize Production Database

```bash
# Run migrations on production database
DATABASE_URL="postgresql://neondb_owner:npg_...@ep-lively-fog-ag97t8jl-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require" \
  pnpm prisma migrate deploy

# Seed production database
DATABASE_URL="postgresql://neondb_owner:npg_...@ep-lively-fog-ag97t8jl-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require" \
  pnpm db:seed
```

**Result**:

- ✅ Migration applied: `20251028145814_init_products_table`
- ✅ Seeded 15 products

#### Step 5: Redeploy Production

```bash
# Deploy to production with new DATABASE_URL
vercel --prod --yes
```

**Result**: Production deployment successful, products loading correctly! 🎉

### Final Database Architecture

| Environment           | Database                                    | Region       | Purpose                |
| --------------------- | ------------------------------------------- | ------------ | ---------------------- |
| **Local Dev**         | WeirdBites (small-bread-03305364)           | eu-west-2    | Your .env file         |
| **Vercel Preview**    | WeirdBites (small-bread-03305364)           | eu-west-2    | PR preview deployments |
| **Vercel Production** | weirdbites-production (empty-term-17859536) | eu-central-1 | Live production site   |

**Deleted**: weirdbites-staging (unused, manual deletion via Neon console required)

### Key Learnings

#### Why All Tests Passed But Production Failed

**The Gap**: Tests validate code correctness, not deployment configuration

1. **Unit Tests**: ✅ Passed (mocked dependencies)
2. **Integration Tests**: ✅ Passed (CI has PostgreSQL service)
3. **E2E Tests**: ✅ Passed (CI has seeded database)
4. **Build**: ✅ Passed (no runtime checks)
5. **Production**: ❌ Failed (database empty/not configured)

**Missing**: No automated check for production database state!

#### Critical Gap in CI/CD Pipeline

Our CI pipeline validates:

- ✅ Code quality (lint, typecheck)
- ✅ Tests pass (unit, integration, E2E)
- ✅ Security vulnerabilities
- ✅ Build succeeds
- ❌ **Production environment configuration** ← Missing!
- ❌ **Production database migrations** ← Missing!
- ❌ **Production smoke tests** ← Missing!

### Prevention Strategies

#### 1. Production Deployment Checklist

Before first production deployment:

- [ ] Database created and accessible
- [ ] DATABASE_URL configured in production environment
- [ ] Migrations run on production database: `prisma migrate deploy`
- [ ] Seed data populated (if needed): `pnpm db:seed`
- [ ] Verify connection: Query database from Vercel logs
- [ ] Test production URL manually after deployment
- [ ] Set up monitoring/alerting for database errors

#### 2. Post-Deployment Verification

Add to deployment workflow:

```yaml
# .github/workflows/deploy-production.yml
- name: Run production smoke tests
  run: |
    # Wait for deployment
    sleep 30
    # Test critical endpoints
    curl -f https://weird-bites.vercel.app/api/products || exit 1
    # Verify products returned
    curl https://weird-bites.vercel.app/api/products | jq '.products | length' | grep -v '^0$'
```

#### 3. Environment Parity Checklist

Ensure all environments match:

| Configuration         | Local | CI  | Preview | Production |
| --------------------- | ----- | --- | ------- | ---------- |
| PostgreSQL version    | 16    | 16  | 16      | 16         |
| Migrations applied    | ✅    | ✅  | ✅      | ✅         |
| Seed data             | ✅    | ✅  | ✅      | ✅         |
| Environment variables | ✅    | ✅  | ✅      | ✅         |

#### 4. Database Initialization Documentation

Create `docs/deployment/production-setup.md`:

- Step-by-step production database setup
- Environment variable configuration
- Migration commands
- Verification steps
- Rollback procedures

#### 5. Monitoring and Alerting

Set up:

- **Vercel Logs**: Monitor for database connection errors
- **Error Tracking**: Sentry/LogRocket for runtime errors
- **Health Check Endpoint**: `/api/health` that verifies database connectivity
- **Synthetic Monitoring**: Ping production every 5 minutes

### Updated Deployment Checklist

When deploying to production for the first time:

1. **Database Setup**:
   - [ ] Create production database (Neon/Supabase/Postgres)
   - [ ] Save connection string securely
   - [ ] Test connection from local machine

2. **Vercel Configuration**:
   - [ ] Add DATABASE_URL to Vercel environment (Production)
   - [ ] Add DATABASE_URL to Vercel environment (Preview)
   - [ ] Verify environment variables: `vercel env ls`

3. **Database Initialization**:
   - [ ] Run migrations: `DATABASE_URL=... pnpm prisma migrate deploy`
   - [ ] Seed data: `DATABASE_URL=... pnpm db:seed`
   - [ ] Verify tables exist: Connect with database client

4. **Deployment**:
   - [ ] Deploy to production: `vercel --prod`
   - [ ] Wait for build to complete
   - [ ] Check deployment logs for errors

5. **Verification**:
   - [ ] Visit production URL
   - [ ] Test critical user flows
   - [ ] Check API endpoints manually
   - [ ] Review Vercel logs for errors
   - [ ] Set up monitoring

6. **Documentation**:
   - [ ] Document production DATABASE_URL (in password manager)
   - [ ] Update deployment documentation
   - [ ] Create runbook for common issues

### Impact

**Before Fix**:

- ❌ Production: Black screen with "Failed to load products"
- ❌ User Experience: Complete failure
- ❌ All CI checks: Passing (false confidence!)
- ❌ Database: Empty/not configured

**After Fix**:

- ✅ Production: Products loading correctly
- ✅ Database: Properly configured with migrations + seed data
- ✅ Environment Variables: Correctly set for Production and Preview
- ✅ Documentation: Updated with deployment procedures

### References

- **Neon Database**: https://neon.tech/docs
- **Vercel Environment Variables**: https://vercel.com/docs/concepts/projects/environment-variables
- **Prisma Migrations**: https://www.prisma.io/docs/concepts/components/prisma-migrate
- **Production Best Practices**: [Module 10 - Deployment](../../quality-standards/10-deployment/)

---

## Issue 5: Preview Deployment Wrong DATABASE_URL

**Date**: 2025-10-28 (After fixing production database)

### What Happened

After fixing production database and updating documentation, **Preview deployment FP2vu9SRf showed "Failed to load products"** even though Vercel reported it as "Ready".

**Error in logs**:

```
Can't reach database server at `ep-snowy-frost-agpba9ds-pooler.c-2.eu-central-1.aws.neon.tech:5432`
```

### Root Cause

**Preview environment DATABASE_URL pointed to wrong/non-existent database**:

| Environment | Expected Database                       | Actual DATABASE_URL                      | Result    |
| ----------- | --------------------------------------- | ---------------------------------------- | --------- |
| Preview     | WeirdBites (`ep-hidden-sound-ab6yk4ap`) | Old endpoint (`ep-snowy-frost-agpba9ds`) | ❌ Failed |
| Local Dev   | WeirdBites (`ep-hidden-sound-ab6yk4ap`) | Correct                                  | ✅ Works  |

**Why this happened**:

- Old DATABASE_URL was set 3 days ago for Preview environment
- When we cleaned up databases, the old endpoint no longer existed
- Preview deployments used cached/old DATABASE_URL
- No validation that DATABASE_URL points to an active database

### The Fix

#### Step 1: Remove Old Preview DATABASE_URL

```bash
# Remove incorrect DATABASE_URL for preview
vercel env rm DATABASE_URL preview --yes
```

#### Step 2: Add Correct Preview DATABASE_URL

```bash
# Get local development DATABASE_URL
cat .env | grep DATABASE_URL

# Add same DATABASE_URL for preview deployments
echo "postgresql://neondb_owner:npg_...@ep-hidden-sound-ab6yk4ap-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require" \
  | vercel env add DATABASE_URL preview
```

#### Step 3: Trigger New Preview Deployment

```bash
# Deploy with updated environment variable
vercel --yes

# New deployment will use correct DATABASE_URL
# URL: https://weird-bites-67sb9hsog-antoniogomezgallardos-projects.vercel.app
```

**Result**: ✅ New preview deployment works correctly with products loading

### Key Learnings

#### Environment Variables Are Cached

**Important**: Changing environment variables in Vercel **does NOT** automatically redeploy existing deployments!

- Old deployments keep old environment variable values
- New deployments pick up new values
- Must trigger new deployment after changing env vars

#### Preview vs Production Environments

Both need separate DATABASE_URL configuration:

| Environment     | When Used                 | DATABASE_URL                   |
| --------------- | ------------------------- | ------------------------------ |
| **Preview**     | Pull Request deployments  | Dev database (same as local)   |
| **Production**  | `main` branch deployments | Production database (separate) |
| **Development** | Local machine             | Dev database (.env file)       |

#### Verification Checklist

After changing environment variables:

- [ ] Remove old environment variable: `vercel env rm`
- [ ] Add new environment variable: `vercel env add`
- [ ] Verify change: `vercel env ls`
- [ ] **Trigger new deployment**: `vercel --yes` (Preview) or `vercel --prod` (Production)
- [ ] Test new deployment URL
- [ ] Check deployment logs for errors

### Prevention Strategy

#### 1. Document All Environment Variables

Create `.env.example` with all required variables:

```bash
# .env.example
DATABASE_URL="postgresql://..."  # Required for all environments
NEXT_PUBLIC_APP_URL="..."        # Optional
NODE_ENV="development"           # development | production
```

#### 2. Validate Environment Variables

Add validation in application startup:

```typescript
// lib/env.ts
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined');
}

if (!process.env.DATABASE_URL.includes('neon.tech')) {
  console.warn('DATABASE_URL may be incorrect');
}
```

#### 3. Create Health Check Endpoint

```typescript
// app/api/health/route.ts
export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return Response.json({ status: 'ok', database: 'connected' });
  } catch (error) {
    return Response.json(
      { status: 'error', database: 'disconnected', error: error.message },
      { status: 500 }
    );
  }
}
```

#### 4. Verify Environment Variables Before Deployment

```bash
# Check all environments have DATABASE_URL
vercel env ls

# Should see:
# DATABASE_URL    Encrypted    Production
# DATABASE_URL    Encrypted    Preview
```

#### 5. Test Preview Deployments

After creating PR:

1. Wait for preview deployment to complete
2. Visit preview URL
3. Test critical functionality (homepage, API endpoints)
4. Check for errors in browser console
5. Review Vercel deployment logs

### Updated Deployment Checklist

**After changing Vercel environment variables**:

1. **Verify Change**:

   ```bash
   vercel env ls
   ```

2. **Trigger New Deployment**:

   ```bash
   # For Preview
   vercel --yes

   # For Production
   vercel --prod --yes
   ```

3. **Test Deployment**:
   - Visit new deployment URL
   - Test database-dependent features
   - Check deployment logs for errors

4. **Monitor**:
   - First 5 minutes: Watch Vercel logs
   - Check error tracking (if configured)
   - Verify metrics are normal

### Impact

**Before Fix**:

- ❌ Preview deployments: "Failed to load products"
- ❌ Deployment shows "Ready" but application fails
- ❌ DATABASE_URL pointing to non-existent database

**After Fix**:

- ✅ Preview deployments: Products loading correctly
- ✅ DATABASE_URL points to active dev database
- ✅ All environment variables documented
- ✅ Clear process for updating env vars

---

**Lessons Learned Summary**:

1. ✅ CI tests validate code, not deployment configuration
2. ✅ Always verify production AND preview environments before deploying
3. ✅ Test production AND preview deployments manually
4. ✅ Document database setup procedures for ALL environments
5. ✅ Implement production smoke tests
6. ✅ Keep database architecture simple (only create what you need)
7. ✅ **Changing environment variables requires new deployment**
8. ✅ **Verify environment variables for ALL Vercel environments (Production + Preview)**
9. ✅ **Test preview deployments after PR creation, not just CI checks**
