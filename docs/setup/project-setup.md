# WeirdBites - Project Setup (Slice 0)

**Version**: 1.0.0
**Date**: 2025-10-19
**Purpose**: Infrastructure and project initialization before Slice 1
**Reference**: Module 01 - Vertical Slicing, Module 11 - Tools Ecosystem

---

## Overview

**Slice 0: Project Setup** contains all the infrastructure, tooling, and scaffolding work required **before** implementing user-facing features (Slice 1-7).

### What is Slice 0?

**Slice 0** is the "setup sprint" or "sprint zero" that establishes:
- Development environment
- Repository structure
- Technology stack configuration
- Testing frameworks
- CI/CD pipeline basics
- Deployment infrastructure

**Duration**: 3-5 days (Week 0)
**Story Points**: ~15 points (8 enabler stories)

---

## Why Slice 0 is NOT in the Product Backlog

**Question**: "Why aren't these stories in the product backlog?"

**Answer**: They're **enabler stories**, not user-facing features.

### User Stories vs Enabler Stories

| Type | Purpose | Example | In Backlog? |
|------|---------|---------|-------------|
| **User Story** | Deliver user value directly | "Browse products" | ✅ YES (Product Backlog) |
| **Enabler Story** | Enable future features | "Set up database" | ❌ NO (Project Setup doc) |
| **Technical Debt** | Fix technical issues | "Refactor cart logic" | ✅ YES (as tech story) |
| **Spike** | Research/investigation | "Evaluate payment APIs" | ✅ YES (time-boxed) |

**Enabler stories** are infrastructure prerequisites that:
- Don't deliver direct user value (yet)
- Enable ALL future features
- Are done once (foundation work)
- Not iterated on (setup, then build)

**Real-world analogy**:
- **Backlog**: Rooms in a house (bedroom, kitchen)
- **Slice 0**: Foundation, plumbing, electrical

You need both, but they're different types of work!

---

## Slice 0: Enabler Stories

**Note**: These are **enabler stories** (infrastructure tasks), not user stories. They enable future user-facing features but don't deliver direct user value themselves.

### ES-000-1: Initialize Next.js Project

**As a** developer
**I want** a Next.js 14+ project initialized with TypeScript
**So that** I can start building features with a modern framework

**Priority**: Must Have (Slice 0)
**Story Points**: 2
**Dependencies**: None

**Acceptance Criteria**:

**Scenario 1**: Project initialized successfully
```gherkin
Given I have Node.js 18+ and pnpm installed
When I initialize the Next.js project
Then I have a working Next.js 14+ application
And TypeScript is configured in strict mode
And the app runs on http://localhost:3000
And I see the default Next.js welcome page
```

**Scenario 2**: Project structure follows best practices
```gherkin
Given the Next.js project is initialized
When I review the project structure
Then I see:
  - src/app/ (App Router directory)
  - src/components/ (React components)
  - src/lib/ (utility functions)
  - public/ (static assets)
  - tsconfig.json (TypeScript config)
  - next.config.js (Next.js config)
```

**Technical Approach**:
```bash
# Create Next.js project with TypeScript
pnpm create next-app@latest weirdbites --typescript --tailwind --eslint --app --src-dir

# Or manual configuration
npx create-next-app@latest
# Options: TypeScript: Yes, ESLint: Yes, Tailwind: Yes, src/ directory: Yes, App Router: Yes
```

**Configuration**:

`tsconfig.json` (strict mode):
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "jsx": "preserve",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

**Definition of Done**:
- [ ] Next.js 14+ installed
- [ ] TypeScript strict mode enabled
- [ ] App runs on localhost:3000
- [ ] No TypeScript errors
- [ ] Project structure created
- [ ] README.md updated with setup instructions

---

### ES-000-2: Configure ESLint and Prettier

**As a** developer
**I want** ESLint and Prettier configured
**So that** code quality and formatting are consistent

**Priority**: Must Have (Slice 0)
**Story Points**: 1
**Dependencies**: ES-000-1

**Acceptance Criteria**:

**Scenario 1**: ESLint catches code quality issues
```gherkin
Given ESLint is configured
When I run "pnpm lint"
Then I see linting errors for:
  - Unused variables
  - Missing dependencies in useEffect
  - Accessibility issues (jsx-a11y)
And no errors if code follows rules
```

**Scenario 2**: Prettier formats code automatically
```gherkin
Given Prettier is configured
When I run "pnpm format"
Then all files are formatted consistently
And I can run "pnpm format:check" to verify formatting
```

**Technical Approach**:

Install dependencies:
```bash
pnpm add -D prettier eslint-config-prettier eslint-plugin-prettier
pnpm add -D @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

`.eslintrc.json`:
```json
{
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn",
    "no-console": ["warn", { "allow": ["warn", "error"] }]
  }
}
```

`.prettierrc`:
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false
}
```

`package.json` scripts:
```json
{
  "scripts": {
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  }
}
```

**Definition of Done**:
- [ ] ESLint configured
- [ ] Prettier configured
- [ ] Scripts added to package.json
- [ ] All existing files pass lint
- [ ] All existing files formatted
- [ ] Pre-commit hook configured (optional)

---

### ES-000-3: Set Up Database (PostgreSQL)

**As a** developer
**I want** a PostgreSQL database configured with Prisma ORM
**So that** I can store and query application data

**Priority**: Must Have (Slice 0)
**Story Points**: 3
**Dependencies**: ES-000-1

**Acceptance Criteria**:

**Scenario 1**: Database connection works
```gherkin
Given PostgreSQL database is running
And Prisma is configured
When I run "pnpm prisma db push"
Then the database schema is created
And I can connect to the database
And I see tables in the database
```

**Scenario 2**: Prisma Client is available
```gherkin
Given Prisma is configured
When I generate Prisma Client
Then I can import and use Prisma Client in code
And TypeScript types are available for all models
```

**Technical Approach**:

**Option 1: Supabase (Recommended for Free Tier)**
```bash
# 1. Sign up at https://supabase.com
# 2. Create new project
# 3. Get connection string from project settings
# 4. Add to .env.local
```

**Option 2: Neon (Alternative Free Tier)**
```bash
# 1. Sign up at https://neon.tech
# 2. Create project
# 3. Get connection string
```

**Option 3: Local PostgreSQL**
```bash
# Install PostgreSQL locally (development only)
brew install postgresql  # macOS
# or
sudo apt-get install postgresql  # Linux
```

Install Prisma:
```bash
pnpm add prisma @prisma/client
pnpm add -D prisma
npx prisma init
```

`.env.local` (never commit this!):
```env
# Database
DATABASE_URL="postgresql://user:password@host:5432/weirdbites?schema=public"

# Supabase example:
# DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
```

Initial `prisma/schema.prisma`:
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Initial model (will be expanded in Slice 1)
model Product {
  id              Int      @id @default(autoincrement())
  name            String   @db.VarChar(255)
  description     String   @db.Text
  price           Decimal  @db.Decimal(10, 2)
  stock_quantity  Int      @default(0)
  category        String?  @db.VarChar(100)
  images          Json?    // JSONB array of image URLs
  ingredients     String?  @db.Text
  nutrition_facts Json?
  created_at      DateTime @default(now())
  updated_at      DateTime @updatedAt

  @@index([category])
  @@index([name])
}
```

Generate client and push schema:
```bash
pnpm prisma generate
pnpm prisma db push
```

Create Prisma client singleton (`src/lib/prisma.ts`):
```typescript
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query', 'error', 'warn'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
```

**Definition of Done**:
- [ ] PostgreSQL database created (Supabase/Neon/Local)
- [ ] Prisma configured
- [ ] Initial schema created (Product model)
- [ ] Prisma Client generated
- [ ] Database connection verified
- [ ] Seed data script created (optional)
- [ ] .env.local in .gitignore

---

### ES-000-4: Configure Testing Frameworks

**As a** developer
**I want** Jest, React Testing Library, and Playwright configured
**So that** I can write unit, integration, and E2E tests

**Priority**: Must Have (Slice 0)
**Story Points**: 3
**Dependencies**: ES-000-1

**Acceptance Criteria**:

**Scenario 1**: Unit tests run successfully
```gherkin
Given Jest and React Testing Library are configured
When I run "pnpm test"
Then Jest executes all unit tests
And I see test results and coverage report
And example test passes
```

**Scenario 2**: E2E tests run successfully
```gherkin
Given Playwright is configured
When I run "pnpm test:e2e"
Then Playwright runs E2E tests
And browser opens (headless or headed)
And example E2E test passes
```

**Scenario 3**: Coverage reports generated
```gherkin
Given tests are configured
When I run "pnpm test:coverage"
Then coverage report is generated
And I see coverage percentages
And HTML report is available
```

**Technical Approach**:

**Install Jest and React Testing Library**:
```bash
pnpm add -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
pnpm add -D @types/jest ts-node
```

`jest.config.js`:
```javascript
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
    '!src/**/__tests__/**',
  ],
  coverageThresholds: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
};

module.exports = createJestConfig(customJestConfig);
```

`jest.setup.js`:
```javascript
import '@testing-library/jest-dom';
```

**Install Playwright**:
```bash
pnpm create playwright
# Options: TypeScript: Yes, tests folder: e2e, GitHub Actions: Yes
```

`playwright.config.ts`:
```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

**Install axe-core for accessibility testing**:
```bash
pnpm add -D @axe-core/playwright
```

`package.json` scripts:
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:headed": "playwright test --headed"
  }
}
```

Create example tests:

`src/components/__tests__/Example.test.tsx`:
```typescript
import { render, screen } from '@testing-library/react';
import Example from '../Example';

describe('Example Component', () => {
  it('renders hello world', () => {
    render(<Example />);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });
});
```

`e2e/example.spec.ts`:
```typescript
import { test, expect } from '@playwright/test';

test('homepage loads', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/WeirdBites/);
});
```

**Definition of Done**:
- [ ] Jest configured
- [ ] React Testing Library configured
- [ ] Playwright configured
- [ ] axe-core installed
- [ ] Example unit test passes
- [ ] Example E2E test passes
- [ ] Test scripts in package.json
- [ ] Coverage threshold set (70%)

---

### ES-000-5: Set Up CI/CD Pipeline (GitHub Actions)

**As a** developer
**I want** a CI/CD pipeline configured with quality gates
**So that** code is automatically tested and deployed on every commit

**Priority**: Must Have (Slice 0)
**Story Points**: 3
**Dependencies**: ES-000-1, ES-000-2, ES-000-4

**Acceptance Criteria**:

**Scenario 1**: CI runs on pull requests
```gherkin
Given GitHub Actions is configured
When I create a pull request
Then CI pipeline runs automatically
And linting checks run
And TypeScript checks run
And unit tests run
And E2E tests run
And PR cannot merge if CI fails
```

**Scenario 2**: CD deploys to staging on merge to staging
```gherkin
Given GitHub Actions is configured
When I merge to staging branch
Then deployment to Vercel staging triggers automatically
And build completes successfully
And app is deployed to staging environment
And I can test before promoting to production
```

**Scenario 3**: CD deploys to production on merge to main
```gherkin
Given staging tests have passed
When I merge to main branch
Then deployment to Vercel production triggers automatically
And build completes successfully
And app is deployed to production environment
```

**Technical Approach**:

**Git Branching Strategy**:
```
main (production)
  ↑
  │ (merge after staging tests pass)
  │
staging (production-like testing)
  ↑
  │ (merge feature branches here first)
  │
feature/* (development)
```

**Deployment Flow**:
1. Develop in `feature/*` branch
2. Create PR to `staging` branch → CI runs, deploys to staging on merge
3. Test on staging environment (weirdbites-staging.vercel.app)
4. Create PR from `staging` to `main` → CI runs, deploys to production on merge
5. Production live at weirdbites.vercel.app

**Why this approach?**:
- Staging mirrors production exactly (same build, same config)
- Catch issues before they reach production
- Separate databases prevent production data corruption
- Can demo features to stakeholders on staging before launch

Create `.github/workflows/ci.yml`:
```yaml
name: CI

on:
  pull_request:
    branches: [main, develop]
  push:
    branches: [main, develop]

jobs:
  lint:
    name: Lint
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm lint
      - run: pnpm format:check

  typecheck:
    name: Type Check
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm tsc --noEmit

  test:
    name: Unit & Integration Tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm test:coverage
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info

  e2e:
    name: E2E Tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'pnpm'
      - run: pnpm install
      - name: Install Playwright Browsers
        run: pnpm playwright install --with-deps
      - run: pnpm test:e2e
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

Create `.github/workflows/deploy.yml` (Vercel):
```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main, staging]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Deploy to Staging
        if: github.ref == 'refs/heads/staging'
        uses: vercel/actions/deploy@v1
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'  # Deploy to staging environment

      - name: Deploy to Production
        if: github.ref == 'refs/heads/main'
        uses: vercel/actions/deploy@v1
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'  # Deploy to production environment
```

**Note**: Vercel automatically differentiates environments based on the branch. The `staging` branch will deploy to the staging environment, and `main` will deploy to production.

**Branch Protection Rules** (GitHub Settings):
- Require pull request before merging
- Require status checks to pass:
  - Lint
  - Type Check
  - Unit & Integration Tests
  - E2E Tests
- Require linear history
- Do not allow force pushes

**Definition of Done**:
- [ ] CI workflow configured
- [ ] CD workflow configured
- [ ] Branch protection rules enabled
- [ ] All quality gates passing
- [ ] Vercel deployment working
- [ ] GitHub Actions secrets configured

---

### ES-000-6: Configure Deployment (Vercel)

**As a** developer
**I want** the application deployed to Vercel
**So that** it's accessible online after each merge

**Priority**: Must Have (Slice 0)
**Story Points**: 2
**Dependencies**: ES-000-1, ES-000-3

**Acceptance Criteria**:

**Scenario 1**: App deployed to Vercel
```gherkin
Given Vercel is configured
When I push to main branch
Then Vercel builds the app
And app is deployed to production URL
And I can access the app at weirdbites.vercel.app
```

**Scenario 2**: Environment variables configured for all environments
```gherkin
Given environment variables are set in Vercel
When the app deploys to production
Then environment variables are available
And database connection works in production
And no secrets are exposed in client-side code
```

**Scenario 3**: Staging environment mirrors production
```gherkin
Given staging branch is configured
When I push to staging branch
Then app deploys to staging URL (weirdbites-staging.vercel.app)
And staging uses separate database from production
And I can test features before production deployment
```

**Technical Approach**:

**Vercel Setup**:
1. Sign up at https://vercel.com (free tier)
2. Import GitHub repository
3. Configure project settings:
   - Framework: Next.js
   - Build Command: `pnpm build`
   - Output Directory: `.next`
   - Install Command: `pnpm install`
4. **Set up 3 environments**:
   - **Production** (main branch) → `weirdbites.vercel.app`
   - **Staging** (staging branch) → `weirdbites-staging.vercel.app`
   - **Preview** (PR branches) → `weirdbites-pr-XXX.vercel.app`

**Environment Variables** (Vercel Dashboard):

Configure separately for each environment:

```
# Production Environment (main branch)
DATABASE_URL=postgresql://[production-database-url]
NEXT_PUBLIC_APP_URL=https://weirdbites.vercel.app
NODE_ENV=production

# Staging Environment (staging branch)
DATABASE_URL=postgresql://[staging-database-url]
NEXT_PUBLIC_APP_URL=https://weirdbites-staging.vercel.app
NODE_ENV=production

# Preview Environment (PR branches)
DATABASE_URL=postgresql://[staging-database-url]  # Share with staging
NEXT_PUBLIC_APP_URL=https://weirdbites-preview.vercel.app
NODE_ENV=production
```

**Note**: You'll need **two separate databases**:
- Production database (only main branch)
- Staging database (staging branch + PR previews)

This ensures production data is never affected by testing.

**Vercel Configuration** (`vercel.json`):
```json
{
  "buildCommand": "pnpm build",
  "devCommand": "pnpm dev",
  "installCommand": "pnpm install",
  "framework": "nextjs",
  "regions": ["iad1"]
}
```

**Next.js Configuration** (`next.config.js`):
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'], // Add image domains as needed
  },
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
};

module.exports = nextConfig;
```

**Definition of Done**:
- [ ] Vercel account created
- [ ] Repository imported to Vercel
- [ ] **Staging branch created** (`staging`)
- [ ] **Staging deployment successful** (weirdbites-staging.vercel.app)
- [ ] **Staging database created** (separate from production)
- [ ] **Production deployment successful** (weirdbites.vercel.app)
- [ ] **Production database created** (separate from staging)
- [ ] Environment variables configured for all 3 environments (production, staging, preview)
- [ ] Database connection works in both staging and production
- [ ] Custom domain configured (optional)
- [ ] Preview deployments work for PRs

---

### ES-000-7: Set Up Development Environment Documentation

**As a** developer
**I want** clear setup instructions in README
**So that** new developers can get started quickly

**Priority**: Must Have (Slice 0)
**Story Points**: 1
**Dependencies**: ES-000-1 through ES-000-6

**Acceptance Criteria**:

**Scenario 1**: README has complete setup instructions
```gherkin
Given I'm a new developer
When I read the README
Then I see step-by-step setup instructions
And prerequisites are clearly listed
And environment variables are documented
And common issues are addressed
```

**Scenario 2**: New developer can set up project
```gherkin
Given I follow README instructions
When I complete all setup steps
Then the app runs locally
And tests pass
And I can make my first commit
```

**Technical Approach**:

Update `README.md`:
```markdown
# WeirdBites

> E-commerce platform for unusual snacks

## Prerequisites

- Node.js 18+ (LTS recommended)
- pnpm 8+
- PostgreSQL 14+ (or Supabase/Neon account)
- Git 2.13+

## Getting Started

### 1. Clone Repository

```bash
# Clone with submodules
git clone --recurse-submodules https://github.com/antoniogomezgallardo/WeirdBites.git
cd WeirdBites
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Set Up Environment Variables

Create `.env.local`:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/weirdbites"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. Set Up Database

```bash
# Push schema to database
pnpm prisma db push

# (Optional) Seed database
pnpm prisma db seed
```

### 5. Run Development Server

```bash
pnpm dev
```

Open http://localhost:3000

### 6. Run Tests

```bash
# Unit tests
pnpm test

# E2E tests
pnpm test:e2e

# All tests with coverage
pnpm test:coverage
```

## Common Issues

### "Module not found" errors
Run: `pnpm install`

### Database connection fails
Check DATABASE_URL in .env.local

### Tests fail
Ensure test database is running

## Project Structure

```
weirdbites/
├── src/
│   ├── app/           # Next.js App Router pages
│   ├── components/    # React components
│   └── lib/           # Utilities
├── e2e/               # Playwright E2E tests
├── prisma/            # Database schema
└── docs/              # Documentation
```

## Available Scripts

- `pnpm dev` - Start dev server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm test` - Run unit tests
- `pnpm test:e2e` - Run E2E tests
```

Create `CONTRIBUTING.md`:
```markdown
# Contributing to WeirdBites

## Development Workflow

1. Create feature branch from `develop`
2. Make changes
3. Write tests
4. Run quality checks:
   ```bash
   pnpm lint
   pnpm test
   pnpm test:e2e
   ```
5. Create pull request
6. Wait for CI to pass
7. Get code review
8. Merge to `develop`

## Code Standards

- TypeScript strict mode
- 80%+ test coverage
- ESLint compliant
- Prettier formatted
- Accessibility (WCAG 2.1 AA)

## Commit Messages

Follow conventional commits:
```
feat(auth): add user registration
fix(cart): resolve quantity update bug
docs(readme): update setup instructions
test(checkout): add E2E tests
```
```

**Definition of Done**:
- [ ] README.md updated with setup instructions
- [ ] CONTRIBUTING.md created
- [ ] Environment variables documented
- [ ] Prerequisites listed
- [ ] Common issues documented
- [ ] New developer can follow and succeed

---

### ES-000-8: Initialize Monitoring and Error Tracking

**As a** developer
**I want** basic monitoring and error tracking configured
**So that** I can detect and debug issues in production

**Priority**: Should Have (Slice 0)
**Story Points**: 2
**Dependencies**: ES-000-1, ES-000-6

**Acceptance Criteria**:

**Scenario 1**: Errors are logged in production
```gherkin
Given error tracking is configured
When an error occurs in production
Then error is captured and logged
And I receive notification
And stack trace is available
```

**Scenario 2**: Basic analytics tracking
```gherkin
Given analytics is configured
When users visit the site
Then page views are tracked
And performance metrics are collected
```

**Technical Approach** (Optional for Slice 0):

**Option 1: Sentry (Error Tracking)**
```bash
pnpm add @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

**Option 2: Vercel Analytics (Built-in)**
```bash
pnpm add @vercel/analytics
```

Add to `src/app/layout.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

**Option 3: LogRocket (Session Replay)**
```bash
pnpm add logrocket
```

**Definition of Done**:
- [ ] Error tracking configured (Sentry or alternative)
- [ ] Analytics configured (Vercel Analytics)
- [ ] Errors logged in production
- [ ] Dashboard accessible
- [ ] Notifications configured

---

## Slice 0 Completion Checklist

Before starting Slice 1, verify ALL of the following:

### Development Environment
- [ ] Next.js 14+ project initialized
- [ ] TypeScript strict mode enabled
- [ ] ESLint and Prettier configured
- [ ] All scripts in package.json work
- [ ] `pnpm dev` starts app on localhost:3000

### Database
- [ ] PostgreSQL database created (Supabase/Neon/Local)
- [ ] Prisma configured and connected
- [ ] Initial schema created (Product model)
- [ ] `pnpm prisma studio` opens database UI
- [ ] Test data seeded (optional)

### Testing
- [ ] Jest configured
- [ ] React Testing Library configured
- [ ] Playwright configured
- [ ] axe-core configured
- [ ] Example tests pass
- [ ] `pnpm test` runs successfully
- [ ] `pnpm test:e2e` runs successfully

### CI/CD
- [ ] GitHub Actions workflows created
- [ ] Branch protection rules enabled
- [ ] CI runs on pull requests
- [ ] All quality gates passing
- [ ] CD deploys to Vercel

### Deployment
- [ ] Vercel project created
- [ ] **Staging branch created** in repository
- [ ] **Staging database created** (separate from production)
- [ ] **Staging deployment successful** (weirdbites-staging.vercel.app)
- [ ] **Production database created** (separate from staging)
- [ ] **Production deployment successful** (weirdbites.vercel.app)
- [ ] Environment variables configured for all 3 environments
- [ ] Database connection works in staging
- [ ] Database connection works in production
- [ ] App accessible at staging URL
- [ ] App accessible at production URL

### Documentation
- [ ] README.md updated with setup instructions
- [ ] CONTRIBUTING.md created
- [ ] Environment variables documented
- [ ] Common issues documented

### Optional (Nice to Have)
- [ ] Error tracking configured
- [ ] Analytics configured
- [ ] Monitoring dashboard accessible
- [ ] Pre-commit hooks configured (Husky + lint-staged)

**Status**: ✅ Ready for Slice 1 when ALL checkboxes are checked!

---

## Technology Stack Summary

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **UI Components**: Headless UI / Radix UI (to be chosen)
- **Forms**: React Hook Form + Zod validation
- **State Management**: React Context + hooks (start simple)

### Backend
- **API**: Next.js API Routes (serverless)
- **Database**: PostgreSQL (Supabase or Neon)
- **ORM**: Prisma
- **Authentication**: NextAuth.js or custom JWT (Slice 4)
- **Payment**: Stripe (test mode only)

### Testing
- **Unit**: Jest + React Testing Library
- **Integration**: Jest + Supertest
- **E2E**: Playwright
- **Accessibility**: axe-core
- **Performance**: Lighthouse CI (later)

### DevOps
- **Version Control**: Git + GitHub
- **CI/CD**: GitHub Actions
- **Hosting**: Vercel (free tier)
- **Monitoring**: Vercel Analytics + Sentry (optional)

### Development Tools
- **Package Manager**: pnpm
- **Linting**: ESLint
- **Formatting**: Prettier
- **Type Checking**: TypeScript
- **Git Hooks**: Husky + lint-staged (optional)

---

## Project Structure After Slice 0

```
weirdbites/
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── deploy.yml
├── docs/
│   ├── START-HERE.md          # Single entry point
│   ├── 00-foundations/        # Quality framework, ISO 25010
│   ├── 01-requirements/       # BRD, Personas, MVP, Backlog, Slices
│   ├── 02-agile-planning/     # DoR, Sprint cadence, Velocity
│   ├── 09-metrics-monitoring/ # Metrics tracking
│   ├── 12-governance/         # Change management
│   ├── 14-continuous-improvement/ # Testing maturity
│   ├── design/wireframes/     # UI wireframes
│   ├── setup/
│   │   └── project-setup.md   # This document
│   └── quality-standards/     # Git submodule
├── e2e/
│   ├── example.spec.ts
│   └── helpers/
├── prisma/
│   ├── schema.prisma
│   └── seed.ts (optional)
├── public/
│   └── images/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── __tests__/
│   │   └── Example.tsx
│   └── lib/
│       ├── prisma.ts
│       └── utils.ts
├── .env.local (git-ignored)
├── .eslintrc.json
├── .gitignore
├── .prettierrc
├── CLAUDE.md
├── CONTRIBUTING.md
├── jest.config.js
├── jest.setup.js
├── next.config.js
├── package.json
├── playwright.config.ts
├── pnpm-lock.yaml
├── README.md
├── tsconfig.json
└── vercel.json
```

---

## Success Criteria

**Slice 0 is complete when**:

1. ✅ All 8 enabler stories meet acceptance criteria
2. ✅ All checklist items checked
3. ✅ CI/CD pipeline passing
4. ✅ App deployed to production
5. ✅ New developer can clone and run locally in <30 minutes
6. ✅ All quality gates passing (lint, typecheck, tests)

**At this point, you're ready to start Slice 1: Browse Products!**

---

## Retrospective

After completing Slice 0, reflect:

- What went well?
- What took longer than expected?
- Any tools or configurations we should change?
- Documentation clear enough?
- Ready to start feature development?

**Update**: (Fill in after completing Slice 0)

---

## Document Control

**Version History**:

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2025-10-19 | Antonio Gomez Gallardo | Initial Slice 0 project setup plan |

**Next Review**: After completing Slice 0 (retrospective)

**Related Documents**:
- [START-HERE.md](../START-HERE.md) - Single entry point for all documentation
- [Vertical Slices](../01-requirements/vertical-slices.md) - Slices 1-7
- [CLAUDE.md](../../CLAUDE.md) - Project phases
- [README.md](../../README.md) - Getting started

---

*This project setup document follows Module 01 (Vertical Slicing) and Module 11 (Tools Ecosystem) from the quality-standards documentation. It represents "Slice 0" - the foundation before user-facing features.*
