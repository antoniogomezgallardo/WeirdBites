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
**Story Points**: ~18 points (10 infrastructure stories)

---

## Why Slice 0 is NOT in the Product Backlog

**Question**: "Why aren't these stories in the product backlog?"

**Answer**: They're **enabler stories**, not user-facing features.

### User Stories vs Enabler Stories

| Type               | Purpose                     | Example                 | In Backlog?               |
| ------------------ | --------------------------- | ----------------------- | ------------------------- |
| **User Story**     | Deliver user value directly | "Browse products"       | ✅ YES (Product Backlog)  |
| **Enabler Story**  | Enable future features      | "Set up database"       | ❌ NO (Project Setup doc) |
| **Technical Debt** | Fix technical issues        | "Refactor cart logic"   | ✅ YES (as tech story)    |
| **Spike**          | Research/investigation      | "Evaluate payment APIs" | ✅ YES (time-boxed)       |

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

## What is Slice 0?

**Slice 0** (also called "Sprint Zero" or "Iteration 0") is the infrastructure setup phase that establishes the foundation for all future development.

**Key Differences**:

- **Slice 0** = Infrastructure setup (IS-001 through IS-009)
- **Slices 1-7** = User-facing features (derived from splitting user stories US-001+)

**Stories in Slice 0**:

- **IS-001 through IS-009** = **I**nfrastructure **S**tories
- NOT user stories (US-XXX) - these don't deliver direct user value
- NOT derived from user requirements - these enable user requirements
- Enable ALL future user stories by providing development infrastructure

**Why "Slice 0"?**

- It's a deployable increment (crosses all layers: repo → CI/CD → deployment)
- It's independently testable (tests run, deployment works, health checks pass)
- It delivers value (infrastructure for future features)
- But it doesn't deliver USER value (no features yet)
- Numbered "0" because it comes BEFORE user-facing slices (1-7)

---

## Current Status

**Last Updated**: 2025-10-26

**Progress**: 10/10 stories completed (18/18 story points - 100%) ✅ **COMPLETE** 🎉

**Completed Stories**:

- ✅ IS-001: Next.js + TypeScript (2 pts)
- ✅ IS-002: ESLint + Prettier (1 pt)
- ✅ IS-003: PostgreSQL + Prisma (3 pts)
- ✅ IS-004: API Routes + Health Check (2 pts)
- ✅ IS-005: Testing Frameworks (3 pts)
- ✅ IS-006: CI/CD Pipeline (2 pts)
- ✅ IS-007: Vercel Deployment (2 pts)
- ✅ IS-008: Development Documentation (1 pt)
- ✅ IS-009: Monitoring & Error Tracking (1 pt)
- ✅ IS-010: Feature Flags System (2 pts)

**Final Achievements**:

- ✅ Complete infrastructure setup for production-ready development
- ✅ Comprehensive development documentation (README + CONTRIBUTING.md)
- ✅ Live production deployment: https://weird-bites.vercel.app
- ✅ Monitoring with Vercel Analytics and Speed Insights
- ✅ Feature flags enabling Trunk-Based Development
- ✅ CI/CD with 7 automated quality gates (enhanced with security scanning in Module 03)
- ✅ Ready for Deployment Increment 1: Browse Products implementation

---

## Slice 0: Infrastructure Stories

**Note**: These are **infrastructure stories** (IS-XXX), not user stories (US-XXX). They enable future user-facing features but don't deliver direct user value themselves.

### IS-001: Initialize Next.js Project

**As a** developer
**I want** a Next.js 14+ project initialized with TypeScript
**So that** I can start building features with a modern framework

**Story ID**: IS-001 (Infrastructure Story 001)
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

### IS-002: Configure ESLint and Prettier

**As a** developer
**I want** ESLint and Prettier configured
**So that** code quality and formatting are consistent

**Priority**: Must Have (Slice 0)
**Story Points**: 1
**Dependencies**: IS-001

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
  "extends": ["next/core-web-vitals", "plugin:@typescript-eslint/recommended", "prettier"],
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

### IS-003: Set Up Database (PostgreSQL)

**As a** developer
**I want** a PostgreSQL database configured with Prisma ORM
**So that** I can store and query application data

**Priority**: Must Have (Slice 0)
**Story Points**: 3
**Dependencies**: IS-001

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

### IS-004: Setup API Routes Structure and Example Endpoint

**As a** developer
**I want** Next.js API Routes configured with a working example
**So that** I can build backend endpoints for Slice 1

**Story ID**: IS-004 (Infrastructure Story 004)
**Priority**: Must Have (Slice 0)
**Story Points**: 2
**Dependencies**: IS-001 (Initialize Next.js), IS-003 (Database setup)

**Acceptance Criteria**:

**Scenario 1**: API Routes folder structure exists

```gherkin
Given the Next.js project is initialized
When I review the project structure
Then I see:
  - src/app/api/ (API Routes directory)
  - src/app/api/health/route.ts (health check endpoint)
  - src/lib/api/ (API utilities)
  - src/types/api.ts (API type definitions)
```

**Scenario 2**: Health check endpoint works

```gherkin
Given the API routes structure is created
When I run the dev server
And I visit http://localhost:3000/api/health
Then I receive a JSON response with status, timestamp, and database status
And the response has status 200
```

**Scenario 3**: Database integration example works

```gherkin
Given Prisma is configured
When the health check endpoint queries the database
And I visit /api/health
Then the endpoint returns database connection status
And TypeScript types are correct
```

**Scenario 4**: API testing setup works

```gherkin
Given Jest is configured
When I create an integration test for /api/health
And I run "pnpm test:integration"
Then the test makes a request to the API endpoint
And validates the response structure
And all tests pass
```

**Technical Implementation**:

1. **Create API health check endpoint**:

`src/app/api/health/route.ts`:

```typescript
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Test database connection
    await prisma.$connect();

    return NextResponse.json({
      status: 'ok',
      message: 'API and database working',
      timestamp: new Date().toISOString(),
      database: 'connected',
      environment: process.env.NODE_ENV,
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        message: 'Database connection failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
```

2. **Create API utilities**:

`src/lib/api/response.ts`:

```typescript
import { NextResponse } from 'next/server';

export function apiSuccess<T>(data: T, status = 200) {
  return NextResponse.json(data, { status });
}

export function apiError(message: string, status = 500, details?: unknown) {
  return NextResponse.json(
    {
      error: message,
      ...(details && { details }),
    },
    { status }
  );
}

export function apiValidationError(errors: Record<string, string[]>) {
  return NextResponse.json(
    {
      error: 'Validation failed',
      errors,
    },
    { status: 400 }
  );
}
```

3. **Create API types**:

`src/types/api.ts`:

```typescript
export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  message?: string;
}

export interface ApiError {
  error: string;
  details?: unknown;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}

export interface HealthCheckResponse {
  status: 'ok' | 'error';
  message: string;
  timestamp: string;
  database: 'connected' | 'disconnected';
  environment: string;
}
```

4. **Create integration test example**:

`src/app/api/health/route.test.ts`:

```typescript
/**
 * @jest-environment node
 */
import { GET } from './route';
import { NextRequest } from 'next/server';

describe('GET /api/health', () => {
  it('returns health check response', async () => {
    const request = new NextRequest('http://localhost:3000/api/health');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toHaveProperty('status', 'ok');
    expect(data).toHaveProperty('message');
    expect(data).toHaveProperty('timestamp');
    expect(data).toHaveProperty('database');
    expect(data).toHaveProperty('environment');
  });

  it('includes valid timestamp', async () => {
    const request = new NextRequest('http://localhost:3000/api/health');
    const response = await GET(request);
    const data = await response.json();

    const timestamp = new Date(data.timestamp);
    expect(timestamp).toBeInstanceOf(Date);
    expect(timestamp.getTime()).toBeLessThanOrEqual(Date.now());
  });
});
```

5. **Update package.json scripts**:

```json
{
  "scripts": {
    "test": "jest",
    "test:unit": "jest --testPathIgnorePatterns=route.test.ts",
    "test:integration": "jest --testPathPattern=route.test.ts",
    "test:watch": "jest --watch"
  }
}
```

**Definition of Done**:

- [ ] src/app/api/ structure created
- [ ] Health check endpoint implemented (GET /api/health)
- [ ] Database connection test in API endpoint
- [ ] API utility functions created (response.ts)
- [ ] API type definitions created (api.ts)
- [ ] Integration test for API endpoint passing
- [ ] Documentation updated with API examples
- [ ] Manual test: curl http://localhost:3000/api/health works

---

### IS-005: Configure Testing Frameworks

**As a** developer
**I want** Jest, React Testing Library, and Playwright configured
**So that** I can write unit, integration, and E2E tests

**Priority**: Must Have (Slice 0)
**Story Points**: 3
**Dependencies**: IS-001

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

### IS-006: Set Up CI/CD Pipeline (GitHub Actions)

**As a** developer
**I want** a CI/CD pipeline configured with quality gates
**So that** code is automatically tested and deployed on every commit

**Priority**: Must Have (Slice 0)
**Story Points**: 3
**Dependencies**: IS-001, IS-002, IS-005

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
          vercel-args: '--prod' # Deploy to staging environment

      - name: Deploy to Production
        if: github.ref == 'refs/heads/main'
        uses: vercel/actions/deploy@v1
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod' # Deploy to production environment
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

### IS-007: Configure Deployment (Vercel)

**As a** developer
**I want** the application deployed to Vercel
**So that** it's accessible online after each merge

**Priority**: Must Have (Slice 0)
**Story Points**: 2
**Dependencies**: IS-001, IS-003

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

### IS-008: Set Up Development Environment Documentation

**As a** developer
**I want** clear setup instructions in README
**So that** new developers can get started quickly

**Priority**: Must Have (Slice 0)
**Story Points**: 1
**Dependencies**: IS-001 through IS-007 (All infrastructure setup complete)

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

````markdown
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
````

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

````

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
````

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

````

**Definition of Done**:
- [ ] README.md updated with setup instructions
- [ ] CONTRIBUTING.md created
- [ ] Environment variables documented
- [ ] Prerequisites listed
- [ ] Common issues documented
- [ ] New developer can follow and succeed

---

### IS-009: Initialize Monitoring and Error Tracking

**As a** developer
**I want** basic monitoring and error tracking configured
**So that** I can detect and debug issues in production

**Priority**: Should Have (Slice 0)
**Story Points**: 1
**Dependencies**: IS-001 (Next.js), IS-007 (Vercel deployment)

**Acceptance Criteria**:

**Scenario 1**: Errors are logged in production
```gherkin
Given error tracking is configured
When an error occurs in production
Then error is captured and logged
And I receive notification
And stack trace is available
````

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

### IS-010: Setup Feature Flags System

**As a** developer
**I want** a feature flags system configured
**So that** I can deploy incomplete features safely and toggle features without redeployment

**Story ID**: IS-010 (Infrastructure Story 010)
**Priority**: Should Have (Slice 0)
**Story Points**: 2
**Dependencies**: IS-001 (Next.js with TypeScript)

**Acceptance Criteria**:

**Scenario 1**: Feature flags configuration exists

```gherkin
Given the Next.js project is initialized
When I review the project structure
Then I see:
  - src/config/features.ts (feature flag definitions)
  - src/hooks/useFeature.ts (React hook for checking flags)
  - src/lib/features.ts (feature utilities)
  - src/types/features.ts (TypeScript types)
And all files are properly typed
```

**Scenario 2**: Feature flags work in components

```gherkin
Given a feature flag is defined
When I use the useFeature hook in a component
And the flag is set to false
Then the feature is hidden
When I set the flag to true
Then the feature is visible
And TypeScript autocomplete works for flag names
```

**Scenario 3**: Feature flags are testable

```gherkin
Given the feature flag system is configured
When I write tests for a component with feature flags
Then I can mock feature flags in tests
And I can test both enabled and disabled states
And tests pass for all flag combinations
```

**Scenario 4**: Feature flags support TBD workflow

```gherkin
Given I'm working on a multi-day feature
When I implement part of the feature with flag OFF
And I commit and deploy to production
Then users don't see the incomplete feature
And I can continue development safely
When the feature is complete and I set flag ON
Then users see the new feature
And no redeployment is required (just config change)
```

**Technical Implementation**:

**1. Create feature flag configuration**:

`src/config/features.ts`:

```typescript
/**
 * Feature Flags Configuration
 *
 * Controls which features are enabled/disabled.
 * Supports Trunk-Based Development by allowing safe deployment of incomplete features.
 *
 * Usage:
 * - Set flag to `false` while feature is in development
 * - Deploy to production safely (feature hidden)
 * - Set flag to `true` when feature is complete and tested
 *
 * @example
 * // In a component:
 * import { useFeature } from '@/hooks/useFeature'
 *
 * export function ProductPage() {
 *   const showFilters = useFeature('productFiltering')
 *   return <div>{showFilters && <ProductFilters />}</div>
 * }
 */

export const features = {
  // ==========================================
  // Slice 1: Browse Products Features
  // ==========================================
  productFiltering: false, // US-003: Filter products by category
  productPagination: false, // US-001: Paginate product listing
  productSearch: false, // US-006: Search products

  // ==========================================
  // Slice 2: Shopping Cart Features
  // ==========================================
  shoppingCart: false, // US-004: Add to cart functionality
  cartPersistence: false, // US-005: Cart persists in localStorage

  // ==========================================
  // Slice 3: Guest Checkout Features
  // ==========================================
  guestCheckout: false, // US-007: Guest checkout flow
  stripePayment: false, // US-008: Stripe payment integration

  // ==========================================
  // Slice 4: User Accounts Features
  // ==========================================
  userRegistration: false, // US-010: User registration
  userLogin: false, // US-011: User login

  // ==========================================
  // Slice 5: Registered User Features
  // ==========================================
  orderHistory: false, // US-013: View order history
  savedAddresses: false, // US-014: Save delivery addresses

  // ==========================================
  // Slice 6: Search & Reviews Features
  // ==========================================
  productReviews: false, // US-016: Product reviews
  advancedSearch: false, // US-015: Advanced search filters

  // ==========================================
  // Slice 7: Admin Panel Features
  // ==========================================
  adminPanel: false, // US-018+: Admin dashboard
  productManagement: false, // US-019: Manage products
  inventoryManagement: false, // US-020: Inventory tracking

  // ==========================================
  // Experimental/Beta Features
  // ==========================================
  darkMode: false, // Optional: Dark mode UI
  a11yEnhancements: false, // Optional: Enhanced accessibility
} as const;

/**
 * Type-safe feature flag names
 * Auto-generated from features object keys
 */
export type FeatureFlag = keyof typeof features;

/**
 * Get feature flag value
 * @param flag - Feature flag name
 * @returns boolean - Whether feature is enabled
 */
export function isFeatureEnabled(flag: FeatureFlag): boolean {
  return features[flag];
}

/**
 * Get all enabled features
 * @returns Array of enabled feature names
 */
export function getEnabledFeatures(): FeatureFlag[] {
  return (Object.keys(features) as FeatureFlag[]).filter(key => features[key]);
}

/**
 * Get all disabled features
 * @returns Array of disabled feature names
 */
export function getDisabledFeatures(): FeatureFlag[] {
  return (Object.keys(features) as FeatureFlag[]).filter(key => !features[key]);
}
```

**2. Create React hook for feature flags**:

`src/hooks/useFeature.ts`:

```typescript
import { features, FeatureFlag } from '@/config/features';

/**
 * React hook to check if a feature is enabled
 *
 * @param flag - Feature flag name (type-safe)
 * @returns boolean - Whether the feature is enabled
 *
 * @example
 * function ProductPage() {
 *   const showFilters = useFeature('productFiltering')
 *
 *   return (
 *     <div>
 *       <ProductList />
 *       {showFilters && <ProductFilters />}
 *     </div>
 *   )
 * }
 */
export function useFeature(flag: FeatureFlag): boolean {
  return features[flag];
}

/**
 * React hook to get multiple feature flags
 * Useful when checking multiple features at once
 *
 * @param flags - Array of feature flag names
 * @returns Object mapping flag names to their values
 *
 * @example
 * function ProductPage() {
 *   const { productFiltering, productPagination } = useFeatures([
 *     'productFiltering',
 *     'productPagination'
 *   ])
 *
 *   return (
 *     <div>
 *       <ProductList />
 *       {productFiltering && <ProductFilters />}
 *       {productPagination && <Pagination />}
 *     </div>
 *   )
 * }
 */
export function useFeatures<T extends FeatureFlag>(flags: T[]): Record<T, boolean> {
  return flags.reduce(
    (acc, flag) => ({
      ...acc,
      [flag]: features[flag],
    }),
    {} as Record<T, boolean>
  );
}
```

**3. Create feature utilities**:

`src/lib/features.ts`:

```typescript
import { features, FeatureFlag } from '@/config/features';

/**
 * Feature flag utilities for server-side code
 */

/**
 * Check if feature is enabled (server-side)
 * @param flag - Feature flag name
 * @returns boolean
 */
export function isEnabled(flag: FeatureFlag): boolean {
  return features[flag];
}

/**
 * Execute code conditionally based on feature flag
 * @param flag - Feature flag name
 * @param onEnabled - Function to execute if enabled
 * @param onDisabled - Function to execute if disabled (optional)
 */
export function withFeature<T>(
  flag: FeatureFlag,
  onEnabled: () => T,
  onDisabled?: () => T
): T | undefined {
  if (features[flag]) {
    return onEnabled();
  }
  return onDisabled?.();
}

/**
 * Filter items based on feature flags
 * @param items - Array of items with feature flags
 * @returns Filtered array
 */
export function filterByFeature<T extends { feature?: FeatureFlag }>(items: T[]): T[] {
  return items.filter(item => {
    if (!item.feature) return true;
    return features[item.feature];
  });
}
```

**4. Create TypeScript types**:

`src/types/features.ts`:

```typescript
import { FeatureFlag } from '@/config/features';

/**
 * Component props for feature-flagged components
 */
export interface FeatureFlaggedProps {
  feature?: FeatureFlag;
  fallback?: React.ReactNode;
}

/**
 * Feature metadata
 */
export interface FeatureMetadata {
  name: FeatureFlag;
  enabled: boolean;
  description: string;
  slice: number;
  story: string;
}
```

**5. Create feature flag tests**:

`src/hooks/__tests__/useFeature.test.ts`:

```typescript
import { renderHook } from '@testing-library/react';
import { useFeature, useFeatures } from '../useFeature';

// Mock the features config
jest.mock('@/config/features', () => ({
  features: {
    productFiltering: true,
    productPagination: false,
    shoppingCart: true,
  },
}));

describe('useFeature', () => {
  it('returns true for enabled features', () => {
    const { result } = renderHook(() => useFeature('productFiltering'));
    expect(result.current).toBe(true);
  });

  it('returns false for disabled features', () => {
    const { result } = renderHook(() => useFeature('productPagination'));
    expect(result.current).toBe(false);
  });
});

describe('useFeatures', () => {
  it('returns correct values for multiple features', () => {
    const { result } = renderHook(() =>
      useFeatures(['productFiltering', 'productPagination', 'shoppingCart'])
    );

    expect(result.current).toEqual({
      productFiltering: true,
      productPagination: false,
      shoppingCart: true,
    });
  });
});
```

**6. Create example component using feature flags**:

`src/components/FeatureExample.tsx`:

```typescript
import { useFeature } from '@/hooks/useFeature'

export function ProductPageExample() {
  const showFilters = useFeature('productFiltering')
  const showPagination = useFeature('productPagination')

  return (
    <div>
      <h1>Products</h1>

      {/* This only renders if productFiltering flag is ON */}
      {showFilters && (
        <div>
          <h2>Filters</h2>
          {/* Filter components here */}
        </div>
      )}

      {/* Product list always renders */}
      <div>
        {/* Product cards here */}
      </div>

      {/* This only renders if productPagination flag is ON */}
      {showPagination && (
        <div>
          <button>Previous</button>
          <button>Next</button>
        </div>
      )}
    </div>
  )
}
```

**7. Add documentation to README**:

Add section to README.md:

````markdown
## Feature Flags

This project uses feature flags to support Trunk-Based Development (TBD).

### Why Feature Flags?

- **Deploy incomplete features** safely to production
- **Toggle features** without redeployment
- **Test in production** with gradual rollout
- **Quick rollback** if issues occur

### How to Use

```typescript
import { useFeature } from '@/hooks/useFeature'

function MyComponent() {
  const showNewFeature = useFeature('myNewFeature')

  return (
    <div>
      {showNewFeature && <NewFeature />}
    </div>
  )
}
```
````

### Adding a New Feature Flag

1. Add flag to `src/config/features.ts`:

   ```typescript
   export const features = {
     myNewFeature: false, // Start disabled
     // ...
   };
   ```

2. Use in component:

   ```typescript
   const showFeature = useFeature('myNewFeature');
   ```

3. When feature is complete, set to `true`

### Testing with Feature Flags

Mock feature flags in tests:

```typescript
jest.mock('@/config/features', () => ({
  features: {
    myNewFeature: true, // Override for testing
  },
}));
```

```

**Definition of Done**:

- [ ] `src/config/features.ts` created with initial flags
- [ ] `src/hooks/useFeature.ts` React hook created
- [ ] `src/lib/features.ts` utility functions created
- [ ] `src/types/features.ts` TypeScript types created
- [ ] Unit tests for useFeature hook passing
- [ ] Example component demonstrates usage
- [ ] README documentation added
- [ ] TypeScript autocomplete works for flag names
- [ ] All flags initially set to `false`
- [ ] Feature flags documented in CLAUDE.md

**Future Enhancements** (Post-Slice 0):

For more advanced needs, consider:
- **LaunchDarkly** - Feature flag service with UI
- **Flagsmith** - Open source alternative
- **Vercel Edge Config** - Runtime feature flags
- **Database-backed flags** - Store flags in PostgreSQL

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
│ └── workflows/
│ ├── ci.yml
│ └── deploy.yml
├── docs/
│ ├── START-HERE.md # Single entry point
│ ├── 00-foundations/ # Quality framework, ISO 25010
│ ├── 01-requirements/ # BRD, Personas, MVP, Backlog, Slices
│ ├── 02-agile-planning/ # DoR, Sprint cadence, Velocity
│ ├── 09-metrics-monitoring/ # Metrics tracking
│ ├── 12-governance/ # Change management
│ ├── 14-continuous-improvement/ # Testing maturity
│ ├── design/wireframes/ # UI wireframes
│ ├── setup/
│ │ └── project-setup.md # This document
│ └── quality-standards/ # Git submodule
├── e2e/
│ ├── example.spec.ts
│ └── helpers/
├── prisma/
│ ├── schema.prisma
│ └── seed.ts (optional)
├── public/
│ └── images/
├── src/
│ ├── app/
│ │ ├── layout.tsx
│ │ ├── page.tsx
│ │ └── globals.css
│ ├── components/
│ │ ├── **tests**/
│ │ └── Example.tsx
│ └── lib/
│ ├── prisma.ts
│ └── utils.ts
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

| Version | Date       | Author                 | Changes                            |
| ------- | ---------- | ---------------------- | ---------------------------------- |
| 1.0.0   | 2025-10-19 | Antonio Gomez Gallardo | Initial Slice 0 project setup plan |

**Next Review**: After completing Slice 0 (retrospective)

**Related Documents**:

- [START-HERE.md](../START-HERE.md) - Single entry point for all documentation
- [Vertical Slices](../01-requirements/vertical-slices.md) - Slices 1-7
- [CLAUDE.md](../../CLAUDE.md) - Project phases
- [README.md](../../README.md) - Getting started

---

_This project setup document follows Module 01 (Vertical Slicing) and Module 11 (Tools Ecosystem) from the quality-standards documentation. It represents "Slice 0" - the foundation before user-facing features._
```
