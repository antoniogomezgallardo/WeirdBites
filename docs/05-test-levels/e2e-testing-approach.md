# WeirdBites E2E Testing Approach

**Date**: 2025-11-01
**Version**: 1.0.0
**Status**: Active

---

## Executive Summary

This document defines the end-to-end (E2E) testing strategy for WeirdBites, using Playwright to test complete user journeys from a browser perspective. E2E tests sit at the top of our test pyramid (10% of all tests), validating that the entire application works together correctly for real users.

**Current Status**:

- **35 E2E tests** (~10% of test suite)
- **100% critical path coverage** (for implemented features)
- **~5.1s average execution time** (2x faster than industry benchmark)
- **0 flaky tests** (strict wait conditions)

---

## 1. What Are E2E Tests?

### 1.1 Definition

**End-to-End Tests** validate complete user journeys through the application, from browser perspective:

- ✅ User interactions (click, type, navigate)
- ✅ Page navigation and routing
- ✅ UI rendering and visual state
- ✅ Form submissions and validations
- ✅ Multi-page workflows (Browse → View → Cart → Checkout)
- ✅ Accessibility compliance (WCAG 2.1)

**Key Difference from Integration Tests**:

- **Integration Tests**: Test API routes + database without browser
- **E2E Tests**: Test full stack + browser rendering + user interactions

---

### 1.2 Scope of E2E Tests

**What We Test**:

- ✅ Critical user journeys (Browse → View → Add to Cart)
- ✅ Navigation flows (/ → /products → /products/:id)
- ✅ Form interactions (filters, search, checkout)
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Accessibility (keyboard navigation, screen readers, ARIA)
- ✅ Error scenarios (404 pages, validation errors)

**What We DON'T Test** (that's for unit/integration):

- ❌ Individual function logic (unit tests)
- ❌ Database queries directly (integration tests)
- ❌ Edge cases in calculations (unit tests)
- ❌ All possible input combinations (too slow)

---

## 2. Testing Framework Stack

### 2.1 Core Tools

| Tool               | Version | Purpose                                 |
| ------------------ | ------- | --------------------------------------- |
| **Playwright**     | 1.56.1  | Browser automation and E2E testing      |
| **axe-playwright** | 2.2.2   | Accessibility testing (WCAG compliance) |
| **Prisma**         | 6.18.0  | Database setup for test data            |
| **Next.js**        | 15.0.3  | Application under test                  |

---

### 2.2 Playwright Configuration

**File**: [playwright.config.ts](c:\Users\User\Documents\Workspaces\WeirdBites\playwright.config.ts)

```typescript
export default defineConfig({
  testDir: './tests/e2e', // E2E test location
  fullyParallel: true, // Run tests in parallel
  forbidOnly: !!process.env.CI, // Prevent test.only in CI
  retries: process.env.CI ? 1 : 0, // Retry once on CI
  workers: process.env.CI ? 4 : undefined, // Parallel workers in CI
  reporter: 'html', // HTML report
  use: {
    baseURL: 'http://localhost:3000', // Base URL for all tests
    trace: 'on-first-retry', // Trace on retry
    screenshot: 'only-on-failure', // Screenshot on failure
    video: 'retain-on-failure', // Video on failure
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'pnpm dev', // Start dev server before tests
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

**Key Features**:

- ✅ Automatic dev server startup
- ✅ Parallel execution for speed
- ✅ Screenshots + videos on failure (debugging)
- ✅ Retry logic for CI (handles transient failures)

---

## 3. Test Organization

### 3.1 File Structure

**Pattern**: Group E2E tests by feature in `tests/e2e/`

```
tests/
└── e2e/
    ├── accessibility.spec.ts            # Accessibility scans
    ├── landing-page.spec.ts             # Landing page tests
    ├── products.spec.ts                 # Product listing tests
    ├── product-detail.spec.ts           # Product detail tests
    ├── pagination.spec.ts               # Pagination tests
    ├── category-filter.spec.ts          # Category filter tests
    ├── navigation.spec.ts               # Navigation bar tests
    ├── navigation-accessibility.spec.ts # Navigation a11y tests
    ├── responsive.spec.ts               # Responsive design tests
    ├── responsive-errors.spec.ts        # Responsive error states
    └── stock-scenarios.spec.ts          # Stock badge tests
```

**Benefits**:

- ✅ Tests grouped by feature (easy to find)
- ✅ Separate from unit/integration tests
- ✅ Automatic discovery by Playwright

---

### 3.2 Naming Conventions

**Test Files**:

- Pattern: `[feature].spec.ts` or `[feature]-[aspect].spec.ts`
- Examples:
  - `products.spec.ts` (main feature tests)
  - `navigation-accessibility.spec.ts` (specific aspect)

**Test Structure**:

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test.describe('User Journey: Specific Flow', () => {
    test('should [expected behavior] when [action]', async ({ page }) => {
      // Test implementation
    });
  });

  test.describe('Direct Navigation (Smoke Tests)', () => {
    test('should load page directly', async ({ page }) => {
      // Test implementation
    });
  });
});
```

---

## 4. User Journey Testing

### 4.1 Complete User Journeys vs Smoke Tests

**Two Types of E2E Tests**:

1. **User Journey Tests** (Preferred):
   - Test complete flows (Browse → View → Add to Cart)
   - Start from realistic entry points (/ or /products)
   - Simulate real user behavior
   - Catch integration issues between pages

2. **Smoke Tests** (Direct Navigation):
   - Test pages in isolation
   - Navigate directly to URL (/products/123)
   - Verify page loads and renders
   - Faster but less realistic

**Example** from [product-detail.spec.ts](c:\Users\User\Documents\Workspaces\WeirdBites\tests\e2e\product-detail.spec.ts):

```typescript
test.describe('Product Detail Page', () => {
  /**
   * User Journey Tests
   *
   * These tests validate complete user flows, simulating real user behavior.
   * They test the full journey from browsing products to viewing details.
   *
   * Purpose: Catch integration issues between pages and verify real-world usage patterns.
   */
  test.describe('User Journey: Browse to Detail', () => {
    test('should navigate from products page to product detail via card click', async ({
      page,
    }) => {
      // 1. Start at /products page (entry point)
      await page.goto('/products');

      // 2. Wait for product cards to load
      await page.waitForSelector('[data-testid="product-card"]', { timeout: 10000 });

      // 3. Click on first product card
      const firstProductCard = page.locator('[data-testid="product-card"]').first();
      await firstProductCard.click();

      // 4. Verify navigation to product detail page
      await page.waitForURL(/\/products\/[a-z0-9-]+/);
      expect(page.url()).toMatch(/\/products\/[a-z0-9-]+/);

      // 5. Verify product detail page renders correctly
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.getByText(/\$/)).toBeVisible();
    });
  });

  /**
   * Direct Navigation Tests (Smoke Tests)
   *
   * These tests verify that the product detail page works when accessed directly.
   * They're faster but don't test the full user journey.
   *
   * Purpose: Quick smoke tests for page functionality.
   */
  test.describe('Direct Navigation (Smoke Tests)', () => {
    test('should load product detail page directly', async ({ page }) => {
      // Direct navigation to product detail
      await page.goto(`/products/${testProductId}`);

      await expect(page.locator('h1')).toBeVisible();
    });
  });
});
```

**Recommendation**: Prefer user journey tests, use smoke tests sparingly

---

### 4.2 Critical User Journeys

**Journey 1: Browse → View → Add to Cart** (Current - Partially Implemented)

```typescript
test('should complete browse to cart journey', async ({ page }) => {
  // 1. Landing page
  await page.goto('/');
  await page.click('text=Browse Products');

  // 2. Products listing
  await expect(page).toHaveURL('/products');
  await page.waitForSelector('[data-testid="product-card"]');

  // 3. Product detail
  await page.locator('[data-testid="product-card"]').first().click();
  await page.waitForURL(/\/products\/[a-z0-9-]+/);

  // 4. Add to cart (when implemented - US-004)
  await page.click('text=Add to Cart');
  await expect(page.locator('[data-testid="cart-badge"]')).toHaveText('1');

  // 5. View cart
  await page.click('[data-testid="cart-icon"]');
  await expect(page).toHaveURL('/cart');
});
```

**Journey 2: Complete Checkout** (Future - US-008 to US-010)

```typescript
test('should complete checkout journey', async ({ page }) => {
  // 1. Add items to cart (prerequisite)
  // ... add to cart steps ...

  // 2. Navigate to checkout
  await page.goto('/cart');
  await page.click('text=Proceed to Checkout');

  // 3. Enter shipping information
  await expect(page).toHaveURL('/checkout');
  await page.fill('[name="email"]', 'test@example.com');
  await page.fill('[name="address"]', '123 Test St');
  await page.fill('[name="city"]', 'Test City');
  await page.click('text=Continue to Payment');

  // 4. Enter payment details
  await page.fill('[name="cardNumber"]', '4242424242424242'); // Stripe test card
  await page.fill('[name="expiry"]', '12/25');
  await page.fill('[name="cvc"]', '123');
  await page.click('text=Place Order');

  // 5. Verify confirmation
  await expect(page).toHaveURL(/\/confirmation/);
  await expect(page.getByText(/Order Confirmed/i)).toBeVisible();
});
```

---

## 5. Page Interactions & Selectors

### 5.1 Selector Best Practices

**Playwright Query Priority** (in order of preference):

1. **User-Facing Attributes** (Best):
   - `page.getByRole('button', { name: /add to cart/i })`
   - `page.getByLabel('Email')`
   - `page.getByPlaceholder('Search products...')`
   - `page.getByText('Product Name')`

2. **Test IDs** (When semantic selectors don't work):
   - `page.locator('[data-testid="product-card"]')`
   - Only use when necessary (implementation detail)

3. **CSS Selectors** (Last resort):
   - `page.locator('.product-card')`
   - Avoid (brittle, coupled to implementation)

**Example**:

```typescript
// ✅ Good - accessible query
await page.click('text=Add to Cart');
await page.getByRole('button', { name: /checkout/i }).click();

// ⚠️  Acceptable - test ID (when needed)
await page.locator('[data-testid="product-card"]').first().click();

// ❌ Avoid - CSS class
await page.locator('.btn-primary').click();
```

---

### 5.2 Waiting Strategies

**Problem**: Tests fail because elements aren't loaded yet

**Solution**: Use explicit waits

**Built-in Waits** (Auto-retry until timeout):

```typescript
// Wait for element to be visible (default timeout: 30s)
await expect(page.locator('h1')).toBeVisible();

// Wait for URL change
await page.waitForURL('/products');

// Wait for selector
await page.waitForSelector('[data-testid="product-card"]');

// Wait for network idle (avoid in CI - unreliable)
await page.waitForLoadState('networkidle'); // ❌ Flaky in CI
```

**Recommended Pattern**:

```typescript
// ✅ Good - explicit wait for specific element
await page.goto('/products');
await page.waitForSelector('[data-testid="product-card"]', { timeout: 10000 });

// ✅ Good - wait for visibility
await expect(page.getByText('Durian Chips')).toBeVisible();

// ❌ Bad - arbitrary timeout
await page.waitForTimeout(1000); // Flaky, slow
```

---

### 5.3 User Interactions

**Clicking**:

```typescript
// Click by text
await page.click('text=Add to Cart');

// Click by role
await page.getByRole('button', { name: /submit/i }).click();

// Click first element in list
await page.locator('[data-testid="product-card"]').first().click();
```

**Typing**:

```typescript
// Fill input field
await page.fill('[name="email"]', 'test@example.com');

// Type with keyboard events (slower, more realistic)
await page.type('[name="search"]', 'durian');
```

**Keyboard Navigation**:

```typescript
// Press Enter
await page.press('[name="search"]', 'Enter');

// Tab navigation
await page.keyboard.press('Tab');
await page.keyboard.press('Enter');
```

**Selecting Dropdowns**:

```typescript
// Select by value
await page.selectOption('select[name="category"]', 'Snacks');

// Select by label
await page.selectOption('select[name="category"]', { label: 'Snacks' });
```

---

## 6. Accessibility Testing with axe-core

### 6.1 WCAG Compliance Testing

**Tool**: axe-playwright (integrates axe-core with Playwright)

**Example**: [accessibility.spec.ts](c:\Users\User\Documents\Workspaces\WeirdBites\tests\e2e\accessibility.spec.ts)

```typescript
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility Tests', () => {
  test('products page passes axe-core accessibility scan', async ({ page }) => {
    // 1. Navigate to page
    await page.goto('/products');

    // 2. Wait for page to load
    await page.waitForSelector('[data-testid="product-card"]');

    // 3. Run axe-core scan
    const results = await new AxeBuilder({ page }).analyze();

    // 4. Verify no violations
    expect(results.violations).toEqual([]);
  });

  test('product detail page passes accessibility scan', async ({ page }) => {
    await page.goto('/products');
    await page.waitForSelector('[data-testid="product-card"]');

    // Navigate to product detail
    await page.locator('[data-testid="product-card"]').first().click();
    await page.waitForURL(/\/products\/[a-z0-9-]+/);

    // Run accessibility scan
    const results = await new AxeBuilder({ page }).analyze();

    expect(results.violations).toEqual([]);
  });
});
```

**Coverage**: 4 E2E accessibility scans, 0 violations ✅

---

### 6.2 Keyboard Navigation Testing

**Test keyboard-only navigation**:

```typescript
test('should support keyboard navigation through products', async ({ page }) => {
  await page.goto('/products');

  // Tab to first product card
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');

  // Press Enter to navigate
  await page.keyboard.press('Enter');

  // Verify navigation worked
  await page.waitForURL(/\/products\/[a-z0-9-]+/);
});
```

---

### 6.3 Screen Reader Testing (Manual)

**Automated accessibility tests don't catch everything**:

**Manual Testing Checklist**:

- [ ] Install NVDA (Windows) or VoiceOver (Mac)
- [ ] Navigate product listing with screen reader
- [ ] Verify product cards are announced correctly
- [ ] Verify buttons have descriptive labels
- [ ] Verify form fields have proper labels
- [ ] Verify error messages are announced

**Future Enhancement**: Integrate screen reader testing automation

---

## 7. Responsive Design Testing

### 7.1 Testing Multiple Viewports

**Example**: [responsive.spec.ts](c:\Users\User\Documents\Workspaces\WeirdBites\tests\e2e\responsive.spec.ts)

```typescript
import { test, expect, devices } from '@playwright/test';

test.describe('Responsive Design', () => {
  const viewports = [
    { name: 'Mobile', ...devices['iPhone 12'] },
    { name: 'Tablet', ...devices['iPad Pro'] },
    { name: 'Desktop', width: 1920, height: 1080 },
  ];

  for (const viewport of viewports) {
    test(`should display correctly on ${viewport.name}`, async ({ browser }) => {
      const context = await browser.newContext({
        ...viewport,
      });

      const page = await context.newPage();
      await page.goto('/products');

      // Verify layout adapts to viewport
      await expect(page.locator('h1')).toBeVisible();

      await context.close();
    });
  }
});
```

---

### 7.2 Mobile-Specific Tests

**Test mobile navigation** (hamburger menu):

```typescript
test('should show hamburger menu on mobile', async ({ browser }) => {
  const context = await browser.newContext({
    ...devices['iPhone 12'],
  });

  const page = await context.newPage();
  await page.goto('/products');

  // Verify hamburger menu visible
  const hamburger = page.locator('[data-testid="hamburger-menu"]');
  await expect(hamburger).toBeVisible();

  // Open menu
  await hamburger.click();
  await expect(page.locator('[data-testid="mobile-nav"]')).toBeVisible();

  await context.close();
});
```

---

## 8. Database Setup for E2E Tests

### 8.1 Seeded Test Database

**Approach**: Use seeded database with known products

**Setup**:

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

test.beforeAll(async () => {
  // Get a real product ID for tests
  const product = await prisma.product.findFirst();
  if (product) {
    testProductId = product.id;
  }
  await prisma.$disconnect();
});
```

**Benefits**:

- ✅ Predictable test data (known product names, prices)
- ✅ Fast (data already exists)
- ✅ No cleanup needed (read-only tests)

---

### 8.2 Dynamic Test Data

**Alternative**: Create test data programmatically

```typescript
test.beforeEach(async () => {
  // Create test product
  testProduct = await prisma.product.create({
    data: {
      name: 'Test Product',
      description: 'Test description',
      price: 9.99,
      category: 'Snacks',
      origin: 'USA',
      stock: 100,
    },
  });
});

test.afterEach(async () => {
  // Cleanup
  await prisma.product.delete({ where: { id: testProduct.id } });
});
```

**Use when**: Tests modify data or need specific scenarios

---

## 9. Debugging E2E Tests

### 9.1 Playwright Inspector

**Run tests in debug mode**:

```bash
pnpm test:e2e --debug
```

**Features**:

- ✅ Step through tests line by line
- ✅ Inspect page elements
- ✅ Record and generate tests
- ✅ View network requests

---

### 9.2 Screenshots on Failure

**Automatic screenshots** (configured in playwright.config.ts):

```typescript
screenshot: 'only-on-failure';
```

**Location**: `test-results/[test-name]/screenshot.png`

**Manual screenshots**:

```typescript
await page.screenshot({ path: 'debug-screenshot.png' });
```

---

### 9.3 Video Recording

**Automatic videos on failure**:

```typescript
video: 'retain-on-failure';
```

**Location**: `test-results/[test-name]/video.webm`

---

### 9.4 Trace Viewer

**Capture trace on retry**:

```typescript
trace: 'on-first-retry';
```

**View trace**:

```bash
npx playwright show-trace test-results/[test-name]/trace.zip
```

**Features**:

- ✅ Step-by-step execution timeline
- ✅ Network requests
- ✅ Console logs
- ✅ DOM snapshots at each step

---

## 10. Running E2E Tests

### 10.1 NPM Scripts

**Package.json scripts**:

```json
{
  "scripts": {
    "test:e2e": "playwright test", // Run all E2E tests
    "test:e2e:ui": "playwright test --ui", // Run with UI mode
    "test:e2e:headed": "playwright test --headed" // Run with visible browser
  }
}
```

**Usage**:

```bash
# Run all E2E tests
pnpm test:e2e

# Run with UI (interactive)
pnpm test:e2e:ui

# Run with visible browser (debugging)
pnpm test:e2e:headed

# Run specific test file
pnpm test:e2e tests/e2e/products.spec.ts
```

---

### 10.2 Parallel Execution

**Default**: Tests run in parallel for speed

**Control parallelism**:

```bash
# Run with 2 workers
pnpm test:e2e --workers=2

# Run serially (one at a time)
pnpm test:e2e --workers=1
```

**Current**: 4 workers in CI for fast execution (~180s total)

---

### 10.3 Filtering Tests

**By file name**:

```bash
pnpm test:e2e products
```

**By test name**:

```bash
pnpm test:e2e --grep "should navigate to product detail"
```

**By project** (browser):

```bash
pnpm test:e2e --project=chromium
```

---

## 11. CI/CD Integration

### 11.1 GitHub Actions Workflow

**File**: `.github/workflows/ci.yml`

```yaml
- name: Install Playwright Browsers
  run: pnpm playwright install --with-deps

- name: Run E2E Tests
  run: pnpm test:e2e

- name: Upload Playwright Report
  if: failure()
  uses: actions/upload-artifact@v3
  with:
    name: playwright-report
    path: playwright-report/
```

**Features**:

- ✅ Automatic browser installation
- ✅ Parallel execution (4 workers)
- ✅ Retry on failure (1 retry)
- ✅ HTML report upload on failure

---

### 11.2 Performance in CI

**Current Performance**:

- 35 E2E tests in ~180 seconds (~5.1s per test)
- 4 parallel workers
- Industry benchmark: <10s per test
- **Status**: ✅ 2x faster than benchmark

---

## 12. Anti-Patterns to Avoid

### 12.1 Flaky Tests

**Problem**: Tests sometimes pass, sometimes fail

**Common Causes**:

- ❌ Using `waitForTimeout` instead of explicit waits
- ❌ Using `networkidle` in CI (unreliable)
- ❌ Not waiting for animations to complete
- ❌ Race conditions (async operations)

**Solutions**:

- ✅ Use `waitForSelector` with explicit timeout
- ✅ Use `expect().toBeVisible()` (auto-retries)
- ✅ Use `reload({ waitUntil: 'load' })` instead of `networkidle`
- ✅ Wait for specific element visibility

**Example** (From PR #45 - Fixed Flaky Test):

```typescript
// ❌ Bad - flaky in CI
await page.reload({ waitUntil: 'networkidle' });

// ✅ Good - reliable
await page.reload({ waitUntil: 'load' });
await page.waitForSelector('button:has-text("All Products")', {
  state: 'visible',
  timeout: 10000,
});
```

---

### 12.2 Over-Testing with E2E

**Problem**: Too many E2E tests (slow CI, high maintenance)

**Anti-Pattern**:

```typescript
// ❌ Bad - testing calculation logic in E2E test
test('should calculate tax correctly', async ({ page }) => {
  await page.goto('/cart');
  await expect(page.getByText('Tax: $1.30')).toBeVisible();
  // This should be a unit test!
});
```

**Solution**: Test calculations in unit tests, use E2E for workflows

---

### 12.3 Testing Implementation Details

**Problem**: Tests break when refactoring CSS/structure

**Anti-Pattern**:

```typescript
// ❌ Bad - testing CSS classes
await expect(page.locator('.product-card.featured')).toBeVisible();

// ✅ Good - testing user-visible behavior
await expect(page.getByRole('article').filter({ hasText: 'Featured' })).toBeVisible();
```

---

## 13. Performance Optimization

### 13.1 Tips for Fast E2E Tests

**DO**:

- ✅ Run tests in parallel (default in Playwright)
- ✅ Reuse browser context when possible
- ✅ Use `waitForSelector` instead of arbitrary timeouts
- ✅ Test critical paths only (10% of test suite)

**DON'T**:

- ❌ Test every edge case in E2E (use unit tests)
- ❌ Wait for network idle unnecessarily
- ❌ Run tests serially unless required
- ❌ Create new browser for every test

---

### 13.2 Reusing Browser Context

**Pattern**: Reuse context for faster tests

```typescript
test.describe.configure({ mode: 'serial' });

let context: BrowserContext;
let page: Page;

test.beforeAll(async ({ browser }) => {
  context = await browser.newContext();
  page = await context.newPage();
});

test.afterAll(async () => {
  await context.close();
});

test('first test', async () => {
  await page.goto('/products');
  // Test implementation
});

test('second test', async () => {
  await page.goto('/products/1');
  // Test implementation (reuses same context)
});
```

**Use when**: Tests are independent and don't affect each other

---

## 14. Coverage & Quality Metrics

### 14.1 Current Coverage

**User Journeys**: 100% of implemented features covered ✅

| User Journey           | Tests | Status                        |
| ---------------------- | ----- | ----------------------------- |
| **Browse Products**    | 5     | ✅ Complete                   |
| **Product Details**    | 5     | ✅ Complete                   |
| **Category Filtering** | 14    | ✅ Complete                   |
| **Pagination**         | 4     | ✅ Complete                   |
| **Accessibility**      | 4     | ✅ Complete                   |
| **Landing Page**       | 3     | ✅ Complete                   |
| **Shopping Cart**      | 0     | ⏳ Pending (US-004 to US-007) |
| **Checkout**           | 0     | ⏳ Pending (US-008 to US-010) |

---

### 14.2 Test Distribution Goal

**Test Pyramid Target**: 10% E2E tests

**Current**: 10% (35 of 347 tests) ✅ **Perfect Balance**

**Recommendation**: Maintain 10% as more features are added

---

## 15. Best Practices Summary

**DO**:

- ✅ Test complete user journeys (not isolated pages)
- ✅ Use semantic selectors (`getByRole`, `getByLabel`)
- ✅ Wait explicitly for elements (`waitForSelector`, `toBeVisible()`)
- ✅ Test accessibility with axe-core
- ✅ Test responsive design on multiple viewports
- ✅ Keep E2E tests to 10% of total test suite
- ✅ Run tests in parallel for speed

**DON'T**:

- ❌ Test business logic in E2E (use unit tests)
- ❌ Use arbitrary timeouts (`waitForTimeout`)
- ❌ Use brittle CSS selectors
- ❌ Test every edge case in E2E (too slow)
- ❌ Ignore flaky tests (fix immediately)

---

## 16. Resources & References

### 16.1 Official Documentation

- [Playwright Documentation](https://playwright.dev/)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [axe-core Documentation](https://github.com/dequelabs/axe-core)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

### 16.2 Internal Documentation

- [Module 04: Testing Strategy](../04-testing-strategy/)
- [Unit Testing Approach](unit-testing-approach.md)
- [Integration Testing Approach](integration-testing-approach.md)

---

## 17. Summary

**E2E Testing at WeirdBites**:

- ✅ **35 tests** covering critical user journeys (10% of suite)
- ✅ **100% critical path coverage** (for implemented features)
- ✅ **~5.1s per test** (2x faster than industry standard)
- ✅ **0 flaky tests** (strict wait conditions, fixed in PR #45)
- ✅ **0 accessibility violations** (axe-core scans)

**Next Steps**:

1. Review examples in `tests/e2e/`
2. Add E2E tests for cart workflow (US-004 to US-007)
3. Add E2E tests for checkout workflow (US-008 to US-010)
4. Maintain 10% E2E test distribution

---

**Document Control**:

- **Version**: 1.0.0
- **Last Updated**: 2025-11-01
- **Next Review**: Monthly or when new user journeys added
- **Owner**: Antonio Gomez Gallardo
