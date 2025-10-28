# Production Deployment Guide

**Last Updated**: 2025-10-28
**Status**: Active

---

## Overview

This guide covers the complete setup and deployment process for WeirdBites production environment on Vercel with Neon PostgreSQL database.

## Prerequisites

- [ ] GitHub repository access
- [ ] Vercel account with project access
- [ ] Neon account with database access
- [ ] Local environment configured and tested

## Database Architecture

| Environment           | Database                                    | Region       | Purpose        |
| --------------------- | ------------------------------------------- | ------------ | -------------- |
| **Local Development** | WeirdBites (small-bread-03305364)           | eu-west-2    | Local .env     |
| **Vercel Preview**    | WeirdBites (small-bread-03305364)           | eu-west-2    | PR deployments |
| **Vercel Production** | weirdbites-production (empty-term-17859536) | eu-central-1 | Live site      |

## Initial Production Setup

### Step 1: Install Required Tools

```bash
# Install Neon CLI
npm install -g neonctl

# Install Vercel CLI
npm install -g vercel

# Verify installations
neonctl --version
vercel --version
```

### Step 2: Authenticate CLI Tools

```bash
# Authenticate with Neon (opens browser)
neonctl auth

# Authenticate with Vercel (opens browser)
vercel login
```

### Step 3: Get Production Database Connection String

```bash
# List all Neon projects
neonctl projects list --org-id org-nameless-mode-77481300

# Get connection string for production database
neonctl connection-string empty-term-17859536 \
  --branch-id br-ancient-feather-agmqcjli \
  --role-name neondb_owner \
  --pooled

# Save this connection string securely (password manager)
```

**Example output**:

```
postgresql://neondb_owner:npg_...@ep-lively-fog-ag97t8jl-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require
```

### Step 4: Link Vercel Project

```bash
# From project root directory
cd /path/to/WeirdBites

# Link to Vercel project
vercel link --yes

# Verify link
cat .vercel/project.json
```

### Step 5: Configure Vercel Environment Variables

#### Production Environment

```bash
# If DATABASE_URL already exists, remove it first
vercel env rm DATABASE_URL production --yes

# Add production DATABASE_URL
echo "postgresql://neondb_owner:npg_...@ep-lively-fog-ag97t8jl-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require" \
  | vercel env add DATABASE_URL production
```

#### Preview Environment

```bash
# Check if DATABASE_URL exists for preview
vercel env ls

# If needed, add preview DATABASE_URL (uses dev database)
echo "postgresql://neondb_owner:npg_...@ep-hidden-sound-ab6yk4ap-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require" \
  | vercel env add DATABASE_URL preview
```

#### Verify Configuration

```bash
# List all environment variables
vercel env ls

# Should see:
# DATABASE_URL    Encrypted    Production    <date>
# DATABASE_URL    Encrypted    Preview       <date>
```

### Step 6: Initialize Production Database

⚠️ **Important**: Only run these commands ONCE during initial setup!

```bash
# Set production DATABASE_URL temporarily
export PROD_DB_URL="postgresql://neondb_owner:npg_...@ep-lively-fog-ag97t8jl-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require"

# Run migrations
DATABASE_URL="$PROD_DB_URL" pnpm prisma migrate deploy

# Seed production database
DATABASE_URL="$PROD_DB_URL" pnpm db:seed

# Verify tables exist
DATABASE_URL="$PROD_DB_URL" pnpm prisma studio
# Check that products table exists with 15 products
```

**Expected output**:

```
✔ Generated Prisma Client
1 migration found in prisma/migrations
Applying migration `20251028145814_init_products_table`
All migrations have been successfully applied.

🌱 Seeding database...
🗑️  Cleared existing products
✅ Seeded 15 products
```

### Step 7: Deploy to Production

```bash
# Deploy to production
vercel --prod --yes

# Wait for deployment to complete (usually 30-60 seconds)
```

**Example output**:

```
Deploying antoniogomezgallardos-projects/weird-bites
Inspect: https://vercel.com/...
Production: https://weird-bites-fvl2g1ikw-antoniogomezgallardos-projects.vercel.app
● Ready
```

### Step 8: Verify Production Deployment

#### Manual Testing

1. **Visit production URL**: https://weird-bites.vercel.app
2. **Check homepage loads**: Should see product grid
3. **Verify products display**: Should see 15 products
4. **Test API endpoint**: https://weird-bites.vercel.app/api/products
5. **Check browser console**: No errors

#### Automated Verification

```bash
# Test health endpoint (if implemented)
curl -f https://weird-bites.vercel.app/api/health

# Test products API
curl https://weird-bites.vercel.app/api/products | jq '.products | length'
# Should output: 15

# Check for errors in Vercel logs
vercel logs --prod
```

### Step 9: Set Up Monitoring

1. **Vercel Dashboard**:
   - Visit https://vercel.com/dashboard
   - Navigate to WeirdBites project
   - Enable Analytics
   - Enable Speed Insights

2. **Error Tracking** (Optional):
   - Set up Sentry integration
   - Configure error alerting

3. **Uptime Monitoring** (Optional):
   - Use UptimeRobot or similar
   - Ping https://weird-bites.vercel.app every 5 minutes

---

## Subsequent Deployments

After initial setup, deployments are automatic:

### Automatic Deployments

1. **Production**: Merges to `main` branch trigger automatic deployment
2. **Preview**: Pull requests create preview deployments automatically

### Manual Production Deployment

```bash
# From main branch
git checkout main
git pull origin main

# Deploy manually if needed
vercel --prod --yes
```

---

## Database Migrations

### Adding New Migrations

```bash
# 1. Create migration locally
pnpm prisma migrate dev --name add_new_feature

# 2. Test locally
pnpm dev

# 3. Commit migration files
git add prisma/migrations/
git commit -m "feat(db): add new feature migration"

# 4. Push and create PR
git push origin feature/new-feature

# 5. Merge PR
# CI will run migrations automatically on preview
# Production will run migrations on next deployment
```

### Running Migrations on Production Manually

⚠️ **Only if deployment doesn't run migrations automatically**:

```bash
# Set production DATABASE_URL
export PROD_DB_URL="postgresql://neondb_owner:npg_...@ep-lively-fog-ag97t8jl-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require"

# Run migrations
DATABASE_URL="$PROD_DB_URL" pnpm prisma migrate deploy

# Verify migration applied
DATABASE_URL="$PROD_DB_URL" pnpm prisma migrate status
```

---

## Rollback Procedures

### Revert Last Deployment

```bash
# Get list of deployments
vercel ls --prod

# Redeploy previous version
vercel redeploy <previous-deployment-url> --prod
```

### Revert Database Migration

⚠️ **Dangerous operation - use with caution!**

```bash
# 1. Identify migration to revert
DATABASE_URL="$PROD_DB_URL" pnpm prisma migrate status

# 2. Create down migration manually
# Edit migration file or create new migration that reverses changes

# 3. Test locally first!
pnpm prisma migrate dev --name revert_feature

# 4. Deploy to production
DATABASE_URL="$PROD_DB_URL" pnpm prisma migrate deploy
```

---

## Troubleshooting

### Issue: "Failed to load products" in Production

**Symptoms**: Black screen with error message

**Diagnosis**:

```bash
# Check Vercel logs
vercel logs --prod

# Check database connection
DATABASE_URL="$PROD_DB_URL" pnpm prisma studio

# Verify migrations
DATABASE_URL="$PROD_DB_URL" pnpm prisma migrate status
```

**Fix**:

```bash
# Run migrations
DATABASE_URL="$PROD_DB_URL" pnpm prisma migrate deploy

# Seed data if needed
DATABASE_URL="$PROD_DB_URL" pnpm db:seed

# Redeploy
vercel --prod --yes
```

### Issue: DATABASE_URL Not Found

**Symptoms**: Build errors, Prisma can't connect

**Fix**:

```bash
# Check environment variables
vercel env ls

# Add DATABASE_URL if missing
vercel env add DATABASE_URL production
```

### Issue: Migrations Out of Sync

**Symptoms**: "Migration X has not been applied"

**Fix**:

```bash
# Check migration status
DATABASE_URL="$PROD_DB_URL" pnpm prisma migrate status

# Deploy pending migrations
DATABASE_URL="$PROD_DB_URL" pnpm prisma migrate deploy

# If migrations are ahead, reset database (⚠️ DESTRUCTIVE)
DATABASE_URL="$PROD_DB_URL" pnpm prisma migrate reset --force
DATABASE_URL="$PROD_DB_URL" pnpm db:seed
```

---

## Security Checklist

- [ ] Production DATABASE_URL stored in password manager
- [ ] DATABASE_URL never committed to git
- [ ] Vercel environment variables encrypted
- [ ] Neon database has connection pooling enabled
- [ ] Database credentials rotated regularly (every 90 days)
- [ ] Production database backups enabled (automatic in Neon)
- [ ] Access logs monitored for suspicious activity

---

## Maintenance Schedule

### Weekly

- [ ] Review Vercel logs for errors
- [ ] Check database connection pool usage
- [ ] Verify backup completion

### Monthly

- [ ] Review and clean up old deployments
- [ ] Check database size and optimize if needed
- [ ] Update dependencies (npm audit)

### Quarterly

- [ ] Rotate database credentials
- [ ] Review and update monitoring alerts
- [ ] Conduct security audit

---

## References

- **Neon Database**: https://neon.tech/docs
- **Vercel Deployment**: https://vercel.com/docs/deployments
- **Prisma Migrations**: https://www.prisma.io/docs/concepts/components/prisma-migrate
- **Module 10 - Deployment**: ../../quality-standards/10-deployment/

---

## Contact & Support

**Database Issues**:

- Neon Console: https://console.neon.tech
- Neon Support: https://neon.tech/docs/introduction/support

**Deployment Issues**:

- Vercel Dashboard: https://vercel.com/dashboard
- Vercel Support: https://vercel.com/help

**Project Lead**: antonio (GitHub: @antoniogomezgallardo)

---

**Last Production Deployment**: 2025-10-28
**Production Database Version**: PostgreSQL 16
**Active Migrations**: 1 (20251028145814_init_products_table)
