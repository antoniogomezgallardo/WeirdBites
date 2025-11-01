# WeirdBites Integration Testing Approach

**Date**: 2025-11-01
**Version**: 1.0.0
**Status**: Active

---

## Executive Summary

This document defines the integration testing strategy for WeirdBites, focusing on testing how multiple components work together - especially API routes with real database connections. Integration tests sit in the middle of our test pyramid (20% of all tests), verifying that our application correctly integrates with external systems.

**Current Status**:

- **52 integration tests** (~15% of test suite)
- **91.8% API route coverage** (for implemented routes)
- **~154ms average execution time** (3.2x faster than industry benchmark)
- **Real PostgreSQL database** used in tests

---

## 1. What Are Integration Tests?

### 1.1 Definition

**Integration Tests** verify that multiple modules work together correctly, especially:

- ✅ API routes with database queries
- ✅ Server components with data fetching
- ✅ Third-party API integrations (Stripe, email services)
- ✅ File system operations
- ✅ Environment variable configuration

**Key Difference from Unit Tests**:

- **Unit Tests**: Mock all dependencies, test in isolation
- **Integration Tests**: Use real dependencies (database, APIs), test interactions

---

### 1.2 Scope of Integration Tests

**What We Test**:

- ✅ API route handlers (GET, POST, PUT, DELETE)
- ✅ Database queries return correct data
- ✅ Request validation and error handling
- ✅ Response formatting (JSON structure, status codes)
- ✅ Authentication and authorization logic (future)
- ✅ Transaction handling and rollbacks

**What We DON'T Test** (that's for E2E):

- ❌ Full browser user journeys
- ❌ UI rendering and interactions
- ❌ Client-side routing
- ❌ CSS and visual appearance

---

## 2. Testing Framework Stack

### 2.1 Core Tools

| Tool                 | Version                        | Purpose                            |
| -------------------- | ------------------------------ | ---------------------------------- |
| **Jest**             | 30.2.0                         | Test runner and assertions         |
| **Next.js**          | 15.0.3                         | API route testing                  |
| **Prisma**           | 6.18.0                         | Database client (real connections) |
| **PostgreSQL**       | Latest                         | Test database                      |
| **Node Environment** | (via `@jest-environment node`) | Server-side testing                |

---

### 2.2 Test Environment Configuration

**Critical**: Integration tests must run in **Node environment**, not jsdom

```typescript
/**
 * @jest-environment node
 */
import { GET } from '@/app/api/products/route';

describe('GET /api/products', () => {
  // Tests run in Node.js environment with real database access
});
```

**Why**:

- ✅ Allows real database connections
- ✅ Supports Next.js API route testing
- ✅ Matches production server environment

---

## 3. Test Organization

### 3.1 File Structure

**Pattern**: Group integration tests in `src/__tests__/integration/` folder

```
src/
├── __tests__/
│   └── integration/
│       ├── api-products.test.ts          # GET /api/products
│       ├── api-products-id.test.ts       # GET /api/products/:id
│       ├── api-categories.test.ts        # GET /api/categories
│       ├── api-health.test.ts            # GET /api/health
│       └── seed.test.ts                  # Database seeding tests
├── app/
│   └── api/
│       ├── products/
│       │   ├── route.ts                  # Implementation
│       │   └── [id]/
│       │       ├── route.ts
│       │       └── __tests__/
│       │           └── route.test.ts     # Alternative: co-located test
```

**Two Approaches**:

1. **Centralized** (`src/__tests__/integration/`) - Current approach ✅
   - Pros: Easy to find all integration tests
   - Cons: Farther from implementation

2. **Co-located** (`app/api/**/__tests__/`) - Alternative
   - Pros: Close to implementation
   - Cons: Tests scattered across codebase

**WeirdBites Choice**: Centralized for better organization

---

### 3.2 Naming Conventions

**Test Files**:

- Pattern: `api-[resource].test.ts` or `api-[resource]-[action].test.ts`
- Examples:
  - `api-products.test.ts` (GET /api/products)
  - `api-products-id.test.ts` (GET /api/products/:id)
  - `api-cart-add.test.ts` (POST /api/cart)

**Test Suites**:

```typescript
describe('GET /api/products (Integration Tests)', () => {
  describe('Happy Path', () => {
    it('should return 200 with array of products', async () => {
      // Test implementation
    });
  });

  describe('Error Scenarios', () => {
    it('should return 400 for invalid parameters', async () => {
      // Test implementation
    });
  });
});
```

---

## 4. Testing API Routes with Next.js App Router

### 4.1 Basic API Route Test Structure

**Source**: [src/**tests**/integration/api-products.test.ts](c:\Users\User\Documents\Workspaces\WeirdBites\src__tests__\integration\api-products.test.ts)

```typescript
/**
 * @jest-environment node
 */
import { GET } from '@/app/api/products/route';
import { PrismaClient } from '@prisma/client';
import { NextRequest } from 'next/server';

const prisma = new PrismaClient();
const hasDatabase = !!process.env.DATABASE_URL;

// Skip all tests if no database configured
const describeIfDatabase = hasDatabase ? describe : describe.skip;

describeIfDatabase('GET /api/products (Integration Tests)', () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should return 200 with array of products', async () => {
    // Create Next.js request object
    const request = new NextRequest('http://localhost:3000/api/products');

    // Call API route handler directly
    const response = await GET(request);

    // Verify response
    expect(response.status).toBe(200);

    const data = await response.json();
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
  });
});
```

**Key Concepts**:

1. ✅ **Direct Handler Invocation**: Call `GET()` directly, no HTTP server needed
2. ✅ **Real Database**: Uses actual PostgreSQL connection
3. ✅ **Conditional Execution**: Skip tests if no database available (CI safety)
4. ✅ **Cleanup**: Disconnect Prisma after all tests

---

### 4.2 Testing Query Parameters

**Example**: Pagination and filtering

```typescript
describe('Query Parameters', () => {
  it('should support pagination via page parameter', async () => {
    const request = new NextRequest('http://localhost:3000/api/products?page=2');
    const response = await GET(request);

    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toHaveProperty('data');
    expect(data).toHaveProperty('pagination');
    expect(data.pagination.page).toBe(2);
  });

  it('should support custom limit parameter', async () => {
    const request = new NextRequest('http://localhost:3000/api/products?limit=5');
    const response = await GET(request);

    const data = await response.json();

    expect(data.data.length).toBeLessThanOrEqual(5);
  });

  it('should filter by category', async () => {
    const request = new NextRequest('http://localhost:3000/api/products?category=Snacks');
    const response = await GET(request);

    const data = await response.json();

    // Verify all products have category = "Snacks"
    data.data.forEach((product: any) => {
      expect(product.category).toBe('Snacks');
    });
  });
});
```

---

### 4.3 Testing Error Scenarios

**Important**: Test both valid and invalid inputs

```typescript
describe('Error Scenarios', () => {
  it('should return 400 for invalid limit parameter (negative)', async () => {
    const request = new NextRequest('http://localhost:3000/api/products?limit=-1');
    const response = await GET(request);

    expect(response.status).toBe(400);

    const data = await response.json();
    expect(data).toHaveProperty('error');
    expect(data.error).toContain('Invalid limit parameter');
  });

  it('should return 400 for invalid limit parameter (too high)', async () => {
    const request = new NextRequest('http://localhost:3000/api/products?limit=101');
    const response = await GET(request);

    expect(response.status).toBe(400);

    const data = await response.json();
    expect(data).toHaveProperty('error');
  });

  it('should return 404 for non-existent product', async () => {
    const request = new NextRequest('http://localhost:3000/api/products/99999');
    const response = await GET(request);

    expect(response.status).toBe(404);

    const data = await response.json();
    expect(data.error).toContain('Product not found');
  });
});
```

---

### 4.4 Testing Response Schema

**Verify API responses match expected structure**:

```typescript
describe('Response Schema', () => {
  it('should return products matching Product schema', async () => {
    const request = new NextRequest('http://localhost:3000/api/products');
    const response = await GET(request);

    const data = await response.json();
    const product = data[0];

    // Verify all required fields exist
    expect(product).toHaveProperty('id');
    expect(product).toHaveProperty('name');
    expect(product).toHaveProperty('description');
    expect(product).toHaveProperty('price');
    expect(product).toHaveProperty('imageUrl');
    expect(product).toHaveProperty('category');
    expect(product).toHaveProperty('origin');
    expect(product).toHaveProperty('stock');
    expect(product).toHaveProperty('createdAt');
    expect(product).toHaveProperty('updatedAt');
  });

  it('should return correct data types', async () => {
    const request = new NextRequest('http://localhost:3000/api/products');
    const response = await GET(request);

    const data = await response.json();
    const product = data[0];

    expect(typeof product.id).toBe('string');
    expect(typeof product.name).toBe('string');
    expect(typeof product.price).toBe('number');
    expect(typeof product.stock).toBe('number');
    expect(product.price).toBeGreaterThan(0);
  });
});
```

---

## 5. Database Integration Testing

### 5.1 Using Real Database

**Philosophy**: Integration tests should use **real database connections**, not mocks

**Why**:

- ✅ Tests real query logic (joins, filters, pagination)
- ✅ Catches database-specific bugs (SQL syntax, constraints)
- ✅ Verifies Prisma schema matches database schema
- ✅ Tests transaction isolation and rollbacks

**Setup**:

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

afterAll(async () => {
  await prisma.$disconnect(); // Always cleanup!
});
```

---

### 5.2 Test Data Strategy

**Approach**: Use seeded test database with known data

**Database Setup**:

1. Separate test database (`weirdbites_test`)
2. Seeded with consistent test data (15 products across 5 categories)
3. Same structure as production database

**Seed Script**: [prisma/seed.ts](c:\Users\User\Documents\Workspaces\WeirdBites\prisma\seed.ts)

**Benefits**:

- ✅ Predictable test data (known IDs, names, prices)
- ✅ Repeatable tests (same data every run)
- ✅ No test pollution (production data unaffected)

---

### 5.3 Testing Database Queries

**Example**: Verify pagination logic hits database correctly

```typescript
describe('Database Queries', () => {
  it('should fetch products with correct offset and limit', async () => {
    const request = new NextRequest('http://localhost:3000/api/products?page=2&limit=5');
    const response = await GET(request);

    const data = await response.json();

    // Verify pagination metadata
    expect(data.pagination.page).toBe(2);
    expect(data.pagination.limit).toBe(5);
    expect(data.pagination.totalPages).toBeGreaterThanOrEqual(2);

    // Verify data count
    expect(data.data.length).toBe(5);
  });

  it('should count total products correctly', async () => {
    const request = new NextRequest('http://localhost:3000/api/products');
    const response = await GET(request);

    const data = await response.json();

    // Seeded database has 15 products
    expect(data.pagination.totalCount).toBe(15);
  });

  it('should filter products by category using database query', async () => {
    const request = new NextRequest('http://localhost:3000/api/products?category=Snacks');
    const response = await GET(request);

    const data = await response.json();

    // Verify filtering happened at database level (not in code)
    expect(data.data.every((p: any) => p.category === 'Snacks')).toBe(true);
  });
});
```

---

### 5.4 Testing Database Constraints

**Example**: Verify unique constraints, foreign keys, etc.

```typescript
describe('Database Constraints', () => {
  it('should enforce unique product names', async () => {
    await expect(
      prisma.product.create({
        data: {
          name: 'Durian Chips', // Already exists in seed data
          description: 'Duplicate',
          price: 10,
          category: 'Snacks',
          origin: 'Thailand',
          stock: 50,
        },
      })
    ).rejects.toThrow(/Unique constraint/);
  });

  it('should prevent negative prices', async () => {
    await expect(
      prisma.product.create({
        data: {
          name: 'Invalid Product',
          description: 'Test',
          price: -10, // Invalid
          category: 'Snacks',
          origin: 'Thailand',
          stock: 50,
        },
      })
    ).rejects.toThrow();
  });
});
```

**Note**: These tests are more relevant when you have complex constraints

---

## 6. Testing Third-Party Integrations

### 6.1 Payment Gateway Integration (Future - US-009)

**Approach**: Use sandbox/test mode for third-party APIs

**Example**: Stripe payment integration

```typescript
describe('POST /api/checkout (Integration Tests)', () => {
  beforeAll(() => {
    // Use Stripe test API key
    process.env.STRIPE_SECRET_KEY = 'sk_test_...';
  });

  it('should create payment intent with Stripe', async () => {
    const request = new NextRequest('http://localhost:3000/api/checkout', {
      method: 'POST',
      body: JSON.stringify({
        amount: 1299, // $12.99
        currency: 'usd',
      }),
    });

    const response = await POST(request);

    expect(response.status).toBe(200);

    const data = await response.json();
    expect(data).toHaveProperty('clientSecret');
    expect(data).toHaveProperty('paymentIntentId');
  });

  it('should handle Stripe API errors gracefully', async () => {
    const request = new NextRequest('http://localhost:3000/api/checkout', {
      method: 'POST',
      body: JSON.stringify({
        amount: -100, // Invalid amount
        currency: 'usd',
      }),
    });

    const response = await POST(request);

    expect(response.status).toBe(400);

    const data = await response.json();
    expect(data.error).toContain('Invalid amount');
  });
});
```

**Key Points**:

- ✅ Use sandbox credentials (test mode)
- ✅ Test both success and error scenarios
- ✅ Verify error handling for API failures
- ✅ Mock only when sandbox is unavailable

---

### 6.2 Email Service Integration (Future - US-010)

**Example**: Transactional email (order confirmation)

```typescript
describe('POST /api/orders (Integration Tests)', () => {
  it('should send confirmation email after order creation', async () => {
    const request = new NextRequest('http://localhost:3000/api/orders', {
      method: 'POST',
      body: JSON.stringify({
        items: [{ productId: '1', quantity: 2 }],
        email: 'test@example.com',
      }),
    });

    const response = await POST(request);

    expect(response.status).toBe(201);

    const data = await response.json();
    expect(data).toHaveProperty('orderId');
    expect(data).toHaveProperty('emailSent', true);
  });

  it('should handle email service failures gracefully', async () => {
    // Temporarily break email service (e.g., invalid API key)
    const originalKey = process.env.EMAIL_API_KEY;
    process.env.EMAIL_API_KEY = 'invalid';

    const request = new NextRequest('http://localhost:3000/api/orders', {
      method: 'POST',
      body: JSON.stringify({
        items: [{ productId: '1', quantity: 2 }],
        email: 'test@example.com',
      }),
    });

    const response = await POST(request);

    // Order should still be created, email failure logged
    expect(response.status).toBe(201);

    const data = await response.json();
    expect(data).toHaveProperty('orderId');
    expect(data).toHaveProperty('emailSent', false);

    // Restore original key
    process.env.EMAIL_API_KEY = originalKey;
  });
});
```

---

## 7. Test Data Management

### 7.1 Seeded Test Database

**Current Approach**: Use seeded database with known data

**Advantages**:

- ✅ Fast setup (data already exists)
- ✅ Predictable assertions (known product IDs, names)
- ✅ No cleanup needed (tests are read-only)

**Disadvantages**:

- ⚠️ Tests can't modify data (or need cleanup)
- ⚠️ Shared state between tests (if mutating)

**Best Practices**:

- Prefer **read-only** integration tests (GET requests)
- For write operations (POST, PUT, DELETE), clean up after tests

---

### 7.2 Test Data Fixtures

**Future Enhancement**: Create reusable test fixtures

**Example**:

```typescript
// src/__tests__/fixtures/products.ts
export const testProducts = {
  validProduct: {
    name: 'Test Product',
    description: 'Test description',
    price: 9.99,
    category: 'Snacks',
    origin: 'USA',
    stock: 100,
  },
  outOfStockProduct: {
    name: 'Out of Stock Product',
    description: 'Test',
    price: 5.0,
    category: 'Snacks',
    origin: 'USA',
    stock: 0,
  },
};

// Usage in test
import { testProducts } from '@/__tests__/fixtures/products';

it('should create product', async () => {
  const product = await prisma.product.create({
    data: testProducts.validProduct,
  });

  expect(product).toHaveProperty('id');
});
```

---

### 7.3 Database Cleanup Strategies

**When tests modify database**:

**Option 1**: Rollback transactions (preferred for speed)

```typescript
describe('POST /api/products', () => {
  beforeEach(async () => {
    await prisma.$executeRaw`BEGIN`; // Start transaction
  });

  afterEach(async () => {
    await prisma.$executeRaw`ROLLBACK`; // Rollback changes
  });

  it('should create product', async () => {
    // Create product in transaction
    // Automatically rolled back after test
  });
});
```

**Option 2**: Manual cleanup (more reliable)

```typescript
describe('POST /api/products', () => {
  const createdIds: string[] = [];

  afterEach(async () => {
    // Delete all created products
    await prisma.product.deleteMany({
      where: { id: { in: createdIds } },
    });
  });

  it('should create product', async () => {
    const response = await POST(request);
    const data = await response.json();

    createdIds.push(data.id); // Track for cleanup
  });
});
```

---

## 8. Running Integration Tests

### 8.1 NPM Scripts

**Package.json scripts**:

```json
{
  "scripts": {
    "test": "jest", // Runs unit + integration tests
    "test:integration": "jest --testPathPattern=integration"
  }
}
```

**Usage**:

```bash
# Run all tests (unit + integration)
pnpm test

# Run only integration tests
pnpm test:integration

# Run specific integration test file
pnpm test src/__tests__/integration/api-products.test.ts
```

---

### 8.2 Database Requirements

**Before running integration tests**:

1. **Set up test database**:

```bash
# Create test database
createdb weirdbites_test

# Set DATABASE_URL in .env.test
DATABASE_URL="postgresql://user:password@localhost:5432/weirdbites_test"
```

2. **Run migrations**:

```bash
pnpm prisma migrate deploy
```

3. **Seed database**:

```bash
pnpm db:seed
```

4. **Run tests**:

```bash
pnpm test:integration
```

---

### 8.3 CI/CD Integration

**GitHub Actions Workflow**:

```yaml
- name: Set up PostgreSQL
  run: |
    docker run -d -p 5432:5432 \
      -e POSTGRES_USER=test \
      -e POSTGRES_PASSWORD=test \
      -e POSTGRES_DB=weirdbites_test \
      postgres:15

- name: Run Migrations
  run: pnpm prisma migrate deploy

- name: Seed Database
  run: pnpm db:seed

- name: Run Integration Tests
  run: pnpm test:integration
```

**Conditional Execution**: Tests skip if `DATABASE_URL` not set

```typescript
const hasDatabase = !!process.env.DATABASE_URL;
const describeIfDatabase = hasDatabase ? describe : describe.skip;
```

---

## 9. Common Patterns & Best Practices

### 9.1 AAA Pattern (Arrange-Act-Assert)

```typescript
it('should return products filtered by category', async () => {
  // ARRANGE - Prepare test data and request
  const category = 'Snacks';
  const request = new NextRequest(`http://localhost:3000/api/products?category=${category}`);

  // ACT - Execute API route
  const response = await GET(request);
  const data = await response.json();

  // ASSERT - Verify results
  expect(response.status).toBe(200);
  expect(data.data.every((p: any) => p.category === category)).toBe(true);
});
```

---

### 9.2 Test HTTP Methods

**GET** (Read):

```typescript
const response = await GET(request);
```

**POST** (Create):

```typescript
const request = new NextRequest('http://localhost:3000/api/products', {
  method: 'POST',
  body: JSON.stringify({ name: 'New Product', price: 9.99 }),
});
const response = await POST(request);
```

**PUT/PATCH** (Update):

```typescript
const request = new NextRequest('http://localhost:3000/api/products/1', {
  method: 'PUT',
  body: JSON.stringify({ price: 12.99 }),
});
const response = await PUT(request);
```

**DELETE** (Remove):

```typescript
const request = new NextRequest('http://localhost:3000/api/products/1', {
  method: 'DELETE',
});
const response = await DELETE(request);
```

---

### 9.3 Testing Authentication (Future)

**Example**: Protect API routes with authentication

```typescript
describe('Protected Routes', () => {
  it('should return 401 for unauthenticated requests', async () => {
    const request = new NextRequest('http://localhost:3000/api/admin/products');
    const response = await GET(request);

    expect(response.status).toBe(401);
    expect(await response.json()).toHaveProperty('error', 'Unauthorized');
  });

  it('should allow authenticated requests', async () => {
    const token = await generateTestToken({ role: 'admin' });

    const request = new NextRequest('http://localhost:3000/api/admin/products', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const response = await GET(request);

    expect(response.status).toBe(200);
  });
});
```

---

## 10. Performance Optimization

### 10.1 Current Performance

**Benchmark** (52 integration tests):

- Execution time: ~8 seconds (~154ms per test)
- Industry standard: <500ms per test
- **Status**: ✅ 3.2x faster than benchmark

---

### 10.2 Tips for Fast Integration Tests

**DO**:

- ✅ Use connection pooling (Prisma default)
- ✅ Reuse database connections (`afterAll` cleanup, not `afterEach`)
- ✅ Seed database once (not before each test)
- ✅ Test multiple scenarios in one test (when appropriate)

**DON'T**:

- ❌ Recreate database for each test (too slow)
- ❌ Make unnecessary queries (optimize database calls)
- ❌ Wait for external APIs unnecessarily

---

## 11. Debugging Integration Tests

### 11.1 Logging Database Queries

**Enable Prisma query logging**:

```typescript
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});
```

**Output**:

```
prisma:query SELECT * FROM "Product" WHERE "category" = 'Snacks' LIMIT 12;
```

**Use during debugging**, disable in CI for cleaner logs

---

### 11.2 Inspecting Responses

```typescript
it('should return products', async () => {
  const response = await GET(request);

  // Log response for debugging
  console.log('Status:', response.status);
  console.log('Body:', await response.json());

  expect(response.status).toBe(200);
});
```

---

## 12. Coverage & Quality Metrics

### 12.1 Current Coverage

**API Routes**: 91.8% coverage (for implemented routes)

| Route                 | Tests | Coverage | Status       |
| --------------------- | ----- | -------- | ------------ |
| GET /api/health       | 4     | 100%     | ✅ Perfect   |
| GET /api/products     | 12    | 89%      | ✅ Good      |
| GET /api/products/:id | 8     | 91%      | ✅ Excellent |
| GET /api/categories   | 6     | 87%      | ✅ Good      |

---

### 12.2 Test Distribution Goal

**Test Pyramid Target**: 20% integration tests

**Current**: 15% (52 of 347 tests)

**Gap**: Need ~17 more integration tests to reach 20%

**Recommended**:

- Add tests for upcoming cart API routes (US-004 to US-007)
- Add tests for checkout API routes (US-008 to US-010)

---

## 13. Future Enhancements

### 13.1 Short Term (Next Sprint)

- [ ] Add integration tests for cart API routes
- [ ] Test transaction rollbacks for failed operations
- [ ] Add tests for concurrent requests (race conditions)

### 13.2 Long Term (Post-MVP)

- [ ] Contract testing with OpenAPI schema validation
- [ ] Load testing with k6 (stress test API endpoints)
- [ ] Chaos testing (database failures, API timeouts)

---

## 14. Resources & References

### 14.1 Official Documentation

- [Next.js API Routes Testing](https://nextjs.org/docs/app/building-your-application/testing/jest)
- [Prisma Testing](https://www.prisma.io/docs/guides/testing)
- [Jest Node Environment](https://jestjs.io/docs/configuration#testenvironment-string)

### 14.2 Internal Documentation

- [Module 04: Testing Strategy](../04-testing-strategy/)
- [Unit Testing Approach](unit-testing-approach.md)
- [E2E Testing Approach](e2e-testing-approach.md)

---

## 15. Summary

**Integration Testing at WeirdBites**:

- ✅ **52 tests** covering API routes and database interactions (15% of suite)
- ✅ **91.8% API coverage** for implemented routes
- ✅ **~154ms per test** (3.2x faster than industry standard)
- ✅ **Real PostgreSQL database** for realistic testing
- ✅ **Seeded test data** for predictable assertions

**Next Steps**:

1. Review examples in `src/__tests__/integration/`
2. Add integration tests for new API routes (cart, checkout)
3. Reach 20% integration test target (need 17 more tests)

---

**Document Control**:

- **Version**: 1.0.0
- **Last Updated**: 2025-11-01
- **Next Review**: Monthly or when new API routes added
- **Owner**: Antonio Gomez Gallardo
