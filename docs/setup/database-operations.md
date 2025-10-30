# Database Operations Guide

## Overview

WeirdBites uses **two separate Neon PostgreSQL databases** for different environments:

| Environment             | Database Host                                                  | Region                 | Usage                      |
| ----------------------- | -------------------------------------------------------------- | ---------------------- | -------------------------- |
| **Local/Development**   | `ep-hidden-sound-ab6yk4ap-pooler.eu-west-2.aws.neon.tech`      | EU West (London)       | Local development, testing |
| **Production (Vercel)** | `ep-lively-fog-ag97t8jl-pooler.c-2.eu-central-1.aws.neon.tech` | EU Central (Frankfurt) | Live production site       |

**⚠️ CRITICAL**: Preview deployments may use the **local database**, while production deployments use the **production database**. Always verify which database you're targeting!

---

## Database Configuration Files

### `.env` (Local Development)

```bash
DATABASE_URL="postgresql://neondb_owner:npg_AyP3mJT7Ilpe@ep-hidden-sound-ab6yk4ap-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
```

- Used by: Local development, tests
- Pulled from: Local `.env` file

### `.env.production` (Production)

```bash
DATABASE_URL="postgresql://neondb_owner:npg_UbAygO2qGiT8@ep-lively-fog-ag97t8jl-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require"
```

- Used by: Vercel production deployments
- Pulled from: Vercel environment variables
- **Pull command**: `vercel env pull .env.production --environment=production`

---

## Common Operations

### 1. Seeding the Local Database

Run seed against your **local** database (for development/testing):

```bash
# Uses DATABASE_URL from .env
pnpm prisma db seed
```

**Result**: Seeds the local development database (eu-west-2)

---

### 2. Seeding the Production Database

**⚠️ CRITICAL**: To seed production, you MUST use the production DATABASE_URL:

#### Step 1: Pull Production Environment Variables

```bash
vercel env pull .env.production --environment=production --yes
```

This creates `.env.production` with the actual production DATABASE_URL.

#### Step 2: Seed Production Database

```bash
DATABASE_URL="$(grep DATABASE_URL .env.production | cut -d'=' -f2 | tr -d '\"' | tr -d '\n')" pnpm prisma db seed
```

Or use the helper script:

```bash
DATABASE_URL="$(grep DATABASE_URL .env.production | cut -d'=' -f2 | tr -d '\"' | tr -d '\n')" pnpm ts-node --compiler-options '{"module":"commonjs"}' scripts/seed-production.ts
```

**Result**: Seeds the production database (eu-central-1)

---

### 3. Running Migrations

#### Local Migrations (Development)

```bash
# Generate migration
pnpm prisma migrate dev --name descriptive_migration_name

# Apply migration
pnpm prisma migrate dev
```

**Result**: Runs against local database (eu-west-2)

#### Production Migrations (Deployed Automatically)

Migrations are applied automatically during Vercel deployment via the `vercel-build` script:

```json
"vercel-build": "prisma migrate deploy && prisma generate && next build"
```

**⚠️ Important**:

- Migrations run against the **production database** during deployment
- No manual intervention needed
- Test migrations locally first!

#### Manual Production Migration (If Needed)

```bash
# Pull production env
vercel env pull .env.production --environment=production

# Apply migration to production
DATABASE_URL="$(grep DATABASE_URL .env.production | cut -d'=' -f2 | tr -d '\"' | tr -d '\n')" pnpm prisma migrate deploy
```

---

### 4. Opening Prisma Studio

#### Local Database

```bash
pnpm db:studio
```

Opens: `http://localhost:5555` connected to **local** database

#### Production Database

```bash
# Pull production env first
vercel env pull .env.production --environment=production

# Open studio with production DATABASE_URL
DATABASE_URL="$(grep DATABASE_URL .env.production | cut -d'=' -f2 | tr -d '\"' | tr -d '\n')" pnpm db:studio
```

Opens: `http://localhost:5555` connected to **production** database

**⚠️ WARNING**: Be extremely careful when modifying production data!

---

### 5. Verifying Database Configuration

Check which database you're currently connected to:

```bash
# Local database
echo $DATABASE_URL
# or
grep DATABASE_URL .env

# Production database
grep DATABASE_URL .env.production
```

Look for the hostname:

- `ep-hidden-sound-ab6yk4ap` = Local/Dev database
- `ep-lively-fog-ag97t8jl` = Production database

---

## Troubleshooting

### Issue: Preview Works but Production Doesn't

**Symptoms**:

- Preview deployments show correct data/images
- Production deployments show old data/placeholders
- Same code deployed to both

**Root Cause**: Preview uses local database, production uses separate production database.

**Solution**:

1. Pull production environment variables:

   ```bash
   vercel env pull .env.production --environment=production
   ```

2. Reseed production database:

   ```bash
   DATABASE_URL="$(grep DATABASE_URL .env.production | cut -d'=' -f2 | tr -d '\"' | tr -d '\n')" pnpm prisma db seed
   ```

3. Hard refresh production site: `Ctrl + Shift + R`

---

### Issue: Migrations Not Applied to Production

**Symptoms**:

- Migrations work locally
- Production deployment fails with Prisma errors
- Schema mismatch errors

**Root Cause**: Migration failed during Vercel deployment or wasn't committed.

**Solution**:

1. Ensure migration files are committed:

   ```bash
   git add prisma/migrations/
   git commit -m "feat(db): add migration for X"
   git push
   ```

2. Trigger new Vercel deployment:

   ```bash
   vercel --prod
   ```

3. Check deployment logs:
   ```bash
   vercel logs [deployment-url]
   ```

---

### Issue: Database Connection Timeout

**Symptoms**:

- Prisma operations timeout
- "Can't reach database server" errors

**Root Cause**:

- Neon database pooler connection limit reached
- Database instance suspended (free tier)

**Solution**:

1. Check Neon dashboard for database status
2. Wait for connection pool to clear (usually 1-2 minutes)
3. For free tier: Database auto-suspends after inactivity - first request will wake it

---

## Best Practices

### ✅ DO:

1. **Always pull production env before production operations**:

   ```bash
   vercel env pull .env.production --environment=production
   ```

2. **Test migrations locally first**:

   ```bash
   pnpm prisma migrate dev
   pnpm test
   pnpm test:e2e
   ```

3. **Commit migration files**:

   ```bash
   git add prisma/migrations/
   ```

4. **Use connection pooling**:
   - Neon automatically provides pooling via `-pooler` endpoints
   - Already configured in both environments

5. **Backup before major changes**:
   - Use Neon dashboard to create manual backups
   - Free tier: 7-day point-in-time recovery

### ❌ DON'T:

1. **Don't assume `pnpm prisma db seed` seeds production**
   - It only seeds your LOCAL database
   - Must explicitly target production with DATABASE_URL override

2. **Don't modify production data without backup**
   - Always create a backup first
   - Test on local database

3. **Don't commit `.env` or `.env.production`**
   - These contain secrets
   - Already in `.gitignore`

4. **Don't use `prisma db push` in production**
   - Use migrations instead: `prisma migrate deploy`
   - `db push` is for prototyping only

5. **Don't share database credentials**
   - Use Vercel team features to share access
   - Rotate credentials if compromised

---

## Quick Reference Commands

```bash
# Seed local database
pnpm prisma db seed

# Seed production database
vercel env pull .env.production --environment=production
DATABASE_URL="$(grep DATABASE_URL .env.production | cut -d'=' -f2 | tr -d '\"' | tr -d '\n')" pnpm prisma db seed

# Run migration locally
pnpm prisma migrate dev --name migration_name

# Open Prisma Studio (local)
pnpm db:studio

# Open Prisma Studio (production) - USE WITH CAUTION
vercel env pull .env.production --environment=production
DATABASE_URL="$(grep DATABASE_URL .env.production | cut -d'=' -f2 | tr -d '\"' | tr -d '\n')" pnpm db:studio

# Check database connection
grep DATABASE_URL .env                    # Local
grep DATABASE_URL .env.production         # Production

# Deploy to production (triggers migrations automatically)
vercel --prod
```

---

## Related Documentation

- [Prisma Schema](../../prisma/schema.prisma)
- [Seed Script](../../prisma/seed.ts)
- [Production Seed Script](../../scripts/seed-production.ts)
- [Vercel Deployment Guide](./vercel-deployment.md)
- [Neon Database Documentation](https://neon.tech/docs)

---

**Last Updated**: 2025-10-30
**Author**: Antonio Gomez Gallardo
**Reviewed**: After production database issue resolution
