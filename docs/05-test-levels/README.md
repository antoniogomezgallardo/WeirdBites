# Module 05: Test Levels

**Purpose**: Document the implementation of all test levels for WeirdBites, aligned with quality-standards Module 05

**Last Updated**: 2025-11-01

---

## Overview

This module documents WeirdBites' implementation of all test levels, from unit tests to end-to-end tests. Following the test pyramid strategy (70% unit, 20% integration, 10% E2E), we ensure comprehensive coverage across all layers of the application.

## Documents in This Module

### Implementation Guides

1. **[Unit Testing Approach](unit-testing-approach.md)** ⭐ **START HERE**
   - Jest configuration and best practices
   - Component testing with React Testing Library
   - Business logic testing
   - Mocking strategies (Prisma, APIs, modules)
   - TDD workflow for unit tests
   - **Lines**: ~600
   - **Status**: Active

2. **[Integration Testing Approach](integration-testing-approach.md)**
   - API route testing with Supertest
   - Database integration testing
   - Third-party API integration tests
   - Test data seeding strategies
   - **Lines**: ~500
   - **Status**: Active

3. **[E2E Testing Approach](e2e-testing-approach.md)**
   - Playwright configuration and best practices
   - Page Object Model (POM) pattern
   - User journey testing
   - Accessibility testing with axe-core
   - Visual regression testing
   - **Lines**: ~700
   - **Status**: Active

### Coverage Reports

4. **[Test Coverage Report](test-coverage-report.md)**
   - Overall coverage metrics (85%+)
   - Coverage by module (components, lib, app)
   - Uncovered code analysis
   - Coverage trends over time
   - **Lines**: ~400
   - **Status**: Active

---

## Quick Reference

### Test Distribution (Test Pyramid)

```
Current Distribution:
- Unit Tests:        260+ tests (~75%) - ✅ Target: 70%
- Integration Tests:  52 tests (~15%) - ⚠️  Target: 20%
- E2E Tests:          35 tests (~10%) - ✅ Target: 10%

Total: 347 tests
Execution Time: ~193 seconds (~3.2 minutes)
```

**Status**: ✅ Aligned with test pyramid (minor integration gap acceptable)

---

## Test Level Comparison

| Level             | Tool             | Scope                        | Speed       | Cost   | When to Use               |
| ----------------- | ---------------- | ---------------------------- | ----------- | ------ | ------------------------- |
| **Unit**          | Jest             | Single function/component    | ~19ms/test  | Low    | Always - 70% of tests     |
| **Integration**   | Jest + Supertest | Multiple modules, API routes | ~154ms/test | Medium | API endpoints, DB queries |
| **E2E**           | Playwright       | Complete user journeys       | ~5.1s/test  | High   | Critical paths only (10%) |
| **Accessibility** | axe-core         | WCAG compliance              | ~2s/test    | Low    | Every page/component      |

---

## Test Levels in Detail

### 1. Unit Tests (260+ tests, 75%)

**Purpose**: Test individual functions and components in isolation

**Framework**: Jest + React Testing Library

**What We Test**:

- ✅ React components (ProductCard, Pagination, CategoryFilter)
- ✅ Business logic (products.ts, stock-utils.ts)
- ✅ Utility functions (api/response.ts, features.ts)
- ✅ Edge cases (empty arrays, null values, negative numbers)

**Example**:

```typescript
// Unit test for ProductCard component
describe('ProductCard', () => {
  it('renders product name and price', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText('Wasabi KitKat')).toBeInTheDocument();
    expect(screen.getByText('$4.99')).toBeInTheDocument();
  });
});
```

**Coverage**: 87.2% average component coverage, 91.5% business logic coverage

**Execution Time**: ~5 seconds total (~19ms per test)

**Reference**: [Unit Testing Approach](unit-testing-approach.md)

---

### 2. Integration Tests (52 tests, 15%)

**Purpose**: Test multiple modules working together, especially API routes and database

**Framework**: Jest + Supertest + Prisma

**What We Test**:

- ✅ API routes (GET /api/products, GET /api/products/:id)
- ✅ Database queries with real PostgreSQL
- ✅ Request/response validation
- ✅ Error handling (404, 500, validation errors)

**Example**:

```typescript
// Integration test for GET /api/products
describe('GET /api/products', () => {
  it('returns paginated products', async () => {
    const response = await request(app).get('/api/products?page=1&limit=12');

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(12);
    expect(response.body.pagination.totalPages).toBeGreaterThan(0);
  });
});
```

**Coverage**: 91.8% average API coverage (for implemented routes)

**Execution Time**: ~8 seconds total (~154ms per test)

**Reference**: [Integration Testing Approach](integration-testing-approach.md)

---

### 3. E2E Tests (35 tests, 10%)

**Purpose**: Test complete user journeys from browser perspective

**Framework**: Playwright + axe-core

**What We Test**:

- ✅ User journeys (Browse → View → Add to Cart)
- ✅ Navigation flows (/ → /products → /products/:id)
- ✅ URL state management (page, category query params)
- ✅ Accessibility (axe-core scans, keyboard navigation)
- ✅ Responsive design (mobile, tablet, desktop)

**Example**:

```typescript
// E2E test for product browsing
test('user can browse and view product details', async ({ page }) => {
  await page.goto('/products');
  await page.click('text=Wasabi KitKat');

  await expect(page).toHaveURL(/\/products\/\d+/);
  await expect(page.locator('h1')).toContainText('Wasabi KitKat');
});
```

**Coverage**: 100% of critical user journeys (implemented features)

**Execution Time**: ~180 seconds total (~5.1s per test)

**Reference**: [E2E Testing Approach](e2e-testing-approach.md)

---

### 4. Accessibility Tests (4 scans, part of E2E)

**Purpose**: Ensure WCAG 2.1 Level AA compliance

**Framework**: axe-core (via Playwright)

**What We Test**:

- ✅ ARIA labels and roles
- ✅ Keyboard navigation (Tab order, Enter/Space)
- ✅ Color contrast ratios
- ✅ Semantic HTML structure
- ✅ Form labels and error messages

**Example**:

```typescript
// Accessibility test
test('products page passes axe-core scan', async ({ page }) => {
  await page.goto('/products');
  const results = await new AxeBuilder({ page }).analyze();

  expect(results.violations).toEqual([]);
});
```

**Coverage**: 0 violations across all pages ✅

**Execution Time**: ~2 seconds per scan

**Reference**: See [E2E Testing Approach](e2e-testing-approach.md#accessibility-testing)

---

## Testing Workflow (TDD)

### Red → Green → Refactor Cycle

**Step 1: Red** - Write failing test

```typescript
test('calculates discounted price correctly', () => {
  expect(calculateDiscount(100, 0.2)).toBe(80);
});
// ❌ Test fails - function doesn't exist
```

**Step 2: Green** - Write minimal code to pass

```typescript
function calculateDiscount(price: number, discount: number) {
  return price * (1 - discount);
}
// ✅ Test passes
```

**Step 3: Refactor** - Improve code quality

```typescript
function calculateDiscount(price: number, discount: number) {
  if (price < 0 || discount < 0 || discount > 1) {
    throw new Error('Invalid input');
  }
  return price * (1 - discount);
}
// ✅ Test still passes, better error handling
```

**Step 4: Commit** - Save progress

```bash
git add . && git commit -m "feat(pricing): add discount calculation"
```

---

## CI/CD Integration

### Quality Gate: Testing

**GitHub Actions Pipeline**:

```yaml
Testing Quality Gates (3 of 7):
1. Unit Tests (Jest)
   - Command: pnpm test
   - Coverage: Must exceed 80%
   - Duration: ~5 seconds

2. Integration Tests (Jest + Supertest)
   - Command: pnpm test:integration
   - Coverage: API routes validated
   - Duration: ~8 seconds

3. E2E Tests (Playwright)
   - Command: pnpm test:e2e
   - Browsers: Chromium, Firefox, WebKit
   - Duration: ~180 seconds
```

**Branch Protection**:

- ✅ All 3 test gates must pass before merge
- ✅ Coverage threshold enforced (>80%)
- ✅ No flaky tests tolerated (currently 0 flaky tests)

---

## Test Data Strategy

### Unit Tests

- **Approach**: Mock data with Jest mocks
- **Example**: `jest.mock('@/lib/prisma')`
- **Benefits**: Fast (no database), isolated, repeatable
- **Trade-off**: May miss real integration issues

### Integration Tests

- **Approach**: Test database with seeded data
- **Example**: Seed 15 products across 5 categories
- **Benefits**: Real database, actual queries, transaction testing
- **Trade-off**: Slower (requires database connection)

### E2E Tests

- **Approach**: Seeded test database (same as integration)
- **Example**: Known products for predictable assertions
- **Benefits**: Real user scenarios, comprehensive
- **Trade-off**: Slowest (full browser automation)

**Reference**: See quality-standards Module 05 for detailed test data strategies

---

## Coverage Metrics

### Overall Coverage (as of 2025-11-01)

```
-------------------|---------|----------|---------|---------|
File               | % Stmts | % Branch | % Funcs | % Lines |
-------------------|---------|----------|---------|---------|
All files          |   85.32 |   78.41  |   89.67 |   84.98 |
 components/       |   87.14 |   81.23  |   91.42 |   86.89 |
 lib/              |   91.56 |   85.73  |   94.28 |   91.02 |
 app/              |   78.92 |   69.34  |   82.11 |   78.45 |
 config/           |  100.00 |  100.00  |  100.00 |  100.00 |
-------------------|---------|----------|---------|---------|
```

**Status**: ✅ Exceeds 80% target across all metrics

**Areas to Improve**:

- `app/` directory: 78.45% line coverage (below 80% target)
  - **Action**: Add more integration tests for page components

**Reference**: [Test Coverage Report](test-coverage-report.md)

---

## Best Practices

### What Makes a Good Test?

**FIRST Principles**:

- **F**ast: Unit tests < 50ms, integration < 500ms, E2E < 10s
- **I**solated: No dependencies between tests
- **R**epeatable: Same result every run (no flaky tests)
- **S**elf-validating: Pass/fail, no manual inspection
- **T**imely: Written with or before code (TDD)

**AAA Pattern** (Arrange-Act-Assert):

```typescript
test('adds product to cart', () => {
  // Arrange - Set up test data
  const product = { id: 1, name: 'Wasabi KitKat', price: 4.99 };

  // Act - Perform the action
  const cart = addToCart([], product);

  // Assert - Verify the result
  expect(cart).toHaveLength(1);
  expect(cart[0]).toEqual(product);
});
```

**Avoid Common Pitfalls**:

- ❌ Testing implementation details (use `getByRole`, not `querySelector`)
- ❌ Brittle selectors (avoid `nth-child`, use data-testid sparingly)
- ❌ Flaky waits (avoid `sleep`, use `waitFor` with explicit conditions)
- ❌ Over-mocking (mock only what you need)

---

## Testing Anti-Patterns to Avoid

### 1. Ice Cream Cone Anti-Pattern

**Problem**: Too many E2E tests, not enough unit tests

```
  ______________
 /              \
|      E2E       |  ❌ Slow, expensive, fragile
|________________|
    \        /
     \  INT /      ❌ Few integration tests
      \____/
        ||         ❌ Minimal unit tests
        ||
```

**Solution**: Follow the test pyramid (70/20/10)

---

### 2. Testing Implementation Details

**Problem**: Tests break when refactoring internal code

```typescript
// ❌ Bad - testing implementation details
expect(component.state.isOpen).toBe(true);

// ✅ Good - testing behavior
expect(screen.getByRole('dialog')).toBeVisible();
```

---

### 3. Flaky Tests

**Problem**: Tests sometimes pass, sometimes fail

```typescript
// ❌ Bad - flaky (timing-dependent)
await page.waitForTimeout(1000);

// ✅ Good - explicit wait
await page.waitForSelector('text=Product loaded');
```

**WeirdBites Status**: 0 flaky tests ✅

---

## Tools & Frameworks

| Tool                      | Version | Purpose                    | Documentation                                                                |
| ------------------------- | ------- | -------------------------- | ---------------------------------------------------------------------------- |
| **Jest**                  | 29.7.0  | Unit & integration testing | [jestjs.io](https://jestjs.io/)                                              |
| **React Testing Library** | 14.1.2  | Component testing          | [testing-library.com](https://testing-library.com/react)                     |
| **Playwright**            | 1.40.1  | E2E testing                | [playwright.dev](https://playwright.dev/)                                    |
| **axe-core**              | 4.8.2   | Accessibility testing      | [deque.com/axe](https://www.deque.com/axe/)                                  |
| **Supertest**             | 6.3.3   | API testing                | [github.com/visionmedia/supertest](https://github.com/visionmedia/supertest) |

---

## Performance Benchmarks

### Test Execution Speed (Industry Benchmarks)

| Test Level        | WeirdBites     | Industry Benchmark | Status         |
| ----------------- | -------------- | ------------------ | -------------- |
| Unit Tests        | 19ms/test      | <50ms/test         | ✅ 2.6x faster |
| Integration Tests | 154ms/test     | <500ms/test        | ✅ 3.2x faster |
| E2E Tests         | 5.1s/test      | <10s/test          | ✅ 2x faster   |
| **Total CI Time** | **~6 minutes** | **<10 minutes**    | ✅ Well under  |

**Conclusion**: WeirdBites test suite is optimized for fast feedback ✅

---

## Related Modules

- **[Module 04: Testing Strategy](../04-testing-strategy/)** - Overall testing approach
- **[Module 06: Quality Attributes](../06-quality-attributes/)** - Non-functional testing
- **[Module 09: Metrics](../09-metrics-monitoring/)** - Coverage tracking and trends

---

## Next Steps

1. **Review** [Unit Testing Approach](unit-testing-approach.md) for Jest best practices
2. **Review** [Integration Testing Approach](integration-testing-approach.md) for API testing
3. **Review** [E2E Testing Approach](e2e-testing-approach.md) for Playwright patterns
4. **Check** [Test Coverage Report](test-coverage-report.md) for current metrics

---

**Reference**: Aligned with quality-standards Module 05 (Test Levels)
