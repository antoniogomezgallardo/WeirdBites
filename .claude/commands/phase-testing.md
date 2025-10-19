# Phase: Testing Strategy & Implementation

**Description**: Guide through Module 04-05 - Testing Strategy and Test Levels for the WeirdBites project

**Usage**: `/phase-testing [step or topic]`

**Examples**:
- `/phase-testing` - Start testing phase
- `/phase-testing strategy` - Define testing strategy
- `/phase-testing unit` - Set up unit testing
- `/phase-testing e2e` - Implement E2E tests
- `/phase-testing pyramid` - Review test pyramid approach

---

## Phase Overview

This command guides you through **Module 04: Testing Strategy** and **Module 05: Test Levels**, which focus on implementing comprehensive test coverage following industry best practices.

### Phase Objectives

By completing this phase, you will have:
- [ ] Comprehensive testing strategy document
- [ ] Test pyramid established (70% unit, 20% integration, 10% E2E)
- [ ] Unit tests with >80% coverage
- [ ] Integration tests for API and services
- [ ] E2E tests for critical user journeys
- [ ] API contract tests
- [ ] Visual regression tests (optional)
- [ ] Performance test baseline
- [ ] Accessibility tests (WCAG 2.1)
- [ ] Automated test execution in CI/CD pipeline

### Relevant Documentation

**Core Modules**:
- `docs/quality-standards/docs/04-testing-strategy/04-README.md`
- `docs/quality-standards/docs/04-testing-strategy/shift-left-approach.md`
- `docs/quality-standards/docs/04-testing-strategy/shift-right-approach.md`
- `docs/quality-standards/docs/04-testing-strategy/test-design.md`
- `docs/quality-standards/docs/05-test-levels/05-README.md`
- `docs/quality-standards/docs/05-test-levels/unit-testing.md`
- `docs/quality-standards/docs/05-test-levels/integration-testing.md`
- `docs/quality-standards/docs/05-test-levels/e2e-testing.md`
- `docs/quality-standards/docs/05-test-levels/api-testing.md`
- `docs/quality-standards/docs/05-test-levels/contract-testing.md`
- `docs/quality-standards/docs/06-quality-attributes/accessibility.md`
- `docs/quality-standards/docs/06-quality-attributes/performance-testing.md`

**Templates**:
- `docs/quality-standards/templates/test-case-template.md` (IEEE 829)
- `docs/quality-standards/templates/test-plan-ieee829.md`

**Examples** (19 comprehensive directories):
- `docs/quality-standards/examples/unit-tests/` - Jest, Vitest, mutation testing
- `docs/quality-standards/examples/integration-tests/` - API testing, database integration
- `docs/quality-standards/examples/api-testing/` - Supertest, GraphQL, Pact (9 files, 4500+ lines)
- `docs/quality-standards/examples/e2e-tests/` - Cypress, Playwright
- `docs/quality-standards/examples/contract-testing/` - Pact consumer/provider
- `docs/quality-standards/examples/accessibility-testing/` - axe-core, Pa11y, WCAG 2.1 (13 files)
- `docs/quality-standards/examples/performance/` - k6, JMeter, Artillery

### Industry Standards Referenced
- IEEE 829 - Test Documentation
- ISO/IEC/IEEE 29119 - Software Testing
- ISTQB - Testing Best Practices
- WCAG 2.1 - Accessibility Guidelines

---

## Phase Steps

### Step 1: Define Testing Strategy

**Goal**: Create comprehensive testing strategy aligned with shift-left and test pyramid principles.

**Actions**:
1. Read `docs/quality-standards/docs/04-testing-strategy/04-README.md`
2. Read `docs/quality-standards/docs/04-testing-strategy/shift-left-approach.md`
3. Use template from `docs/quality-standards/templates/test-plan-ieee829.md`
4. Define:
   - Test objectives and scope
   - Test levels and their coverage targets
   - Test environment requirements
   - Test tools and frameworks
   - Entry/exit criteria for each level
   - Risk assessment

**WeirdBites Testing Strategy**:
```markdown
## Test Pyramid (Target Distribution)

        ╱╲         E2E Tests (10%)
       ╱  ╲        - Critical user journeys
      ╱────╲       - Smoke tests in production
     ╱ API  ╲      Integration/API (20%)
    ╱ Tests  ╲     - Service integration
   ╱──────────╲    - Database operations
  ╱Integration ╲   - External API contracts
 ╱────────────────╲
╱   Unit Tests     ╱  Unit Tests (70%)
└───────────────────┘  - Business logic
                        - Utility functions
                        - Component behavior

## Coverage Targets
- Overall: >80%
- Critical paths: >95%
- New code: 100%

## Test Frameworks
- Unit: Jest (JavaScript), pytest (Python)
- Integration: Supertest (API), pytest (services)
- E2E: Playwright (cross-browser)
- Contract: Pact (consumer/provider)
- Accessibility: axe-core, Pa11y
- Performance: k6 (load), Lighthouse (web vitals)
```

**Deliverables**:
- Test strategy document (`docs/test-strategy.md`)
- Test plan following IEEE 829

---

### Step 2: Set Up Unit Testing Framework

**Goal**: Implement fast, isolated unit tests for business logic and components.

**Actions**:
1. Read `docs/quality-standards/docs/05-test-levels/unit-testing.md`
2. Review examples in `docs/quality-standards/examples/unit-tests/`
3. Choose framework: Jest (JS/TS), pytest (Python), JUnit (Java)
4. Configure test runner with coverage reporting
5. Set up mutation testing (optional but recommended)

**WeirdBites Unit Test Examples**:

```javascript
// tests/unit/shopping-cart.test.js
describe('ShoppingCart', () => {
  describe('addItem', () => {
    it('should add item to empty cart', () => {
      const cart = new ShoppingCart();
      const item = { id: '123', name: 'Weird Chips', price: 4.99 };

      cart.addItem(item);

      expect(cart.items).toHaveLength(1);
      expect(cart.total).toBe(4.99);
    });

    it('should increase quantity if item already exists', () => {
      const cart = new ShoppingCart();
      const item = { id: '123', name: 'Weird Chips', price: 4.99 };

      cart.addItem(item);
      cart.addItem(item);

      expect(cart.items).toHaveLength(1);
      expect(cart.items[0].quantity).toBe(2);
      expect(cart.total).toBe(9.98);
    });

    it('should throw error if item is null', () => {
      const cart = new ShoppingCart();

      expect(() => cart.addItem(null)).toThrow('Item cannot be null');
    });
  });
});
```

**Best Practices** (from documentation):
- Test behavior, not implementation
- Use AAA pattern (Arrange, Act, Assert)
- One assertion per test (when possible)
- Descriptive test names
- Mock external dependencies
- Fast execution (< 1ms per test)

**Deliverables**:
- Unit test framework configured
- Coverage reporting enabled (Istanbul/NYC/Coverage.py)
- Test scripts in package.json/Makefile
- CI integration ready

---

### Step 3: Implement Integration Tests

**Goal**: Test interaction between components, services, and external dependencies.

**Actions**:
1. Read `docs/quality-standards/docs/05-test-levels/integration-testing.md`
2. Read `docs/quality-standards/docs/05-test-levels/api-testing.md`
3. Review examples:
   - `docs/quality-standards/examples/integration-tests/`
   - `docs/quality-standards/examples/api-testing/` (comprehensive)
4. Test integration points:
   - API endpoints
   - Database operations
   - External service calls
   - Message queues
   - File system operations

**WeirdBites API Integration Test Example**:

```javascript
// tests/integration/api/products.test.js
const request = require('supertest');
const app = require('../../../src/app');
const { setupTestDB, teardownTestDB } = require('../../helpers/db');

describe('Products API', () => {
  beforeAll(async () => {
    await setupTestDB();
  });

  afterAll(async () => {
    await teardownTestDB();
  });

  describe('GET /api/products', () => {
    it('should return paginated products', async () => {
      const response = await request(app)
        .get('/api/products')
        .query({ page: 1, limit: 10 })
        .expect(200);

      expect(response.body).toHaveProperty('products');
      expect(response.body).toHaveProperty('total');
      expect(response.body).toHaveProperty('page', 1);
      expect(response.body.products).toHaveLength(10);
    });

    it('should filter products by category', async () => {
      const response = await request(app)
        .get('/api/products')
        .query({ category: 'snacks' })
        .expect(200);

      expect(response.body.products).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ category: 'snacks' })
        ])
      );
    });
  });

  describe('POST /api/products', () => {
    it('should create product with valid data', async () => {
      const newProduct = {
        name: 'Spicy Weird Chips',
        price: 5.99,
        category: 'snacks',
        stock: 100
      };

      const response = await request(app)
        .post('/api/products')
        .send(newProduct)
        .set('Authorization', 'Bearer admin-token')
        .expect(201);

      expect(response.body).toMatchObject(newProduct);
      expect(response.body).toHaveProperty('id');
    });

    it('should reject invalid price', async () => {
      const invalidProduct = {
        name: 'Bad Product',
        price: -1, // Invalid
        category: 'snacks'
      };

      await request(app)
        .post('/api/products')
        .send(invalidProduct)
        .expect(400);
    });
  });
});
```

**Deliverables**:
- Integration tests for all API endpoints
- Database integration tests
- Test database setup/teardown scripts
- API contract tests (see next step)

---

### Step 4: Implement Contract Testing

**Goal**: Ensure API contracts between services are honored.

**Actions**:
1. Read `docs/quality-standards/docs/05-test-levels/contract-testing.md`
2. Review examples in `docs/quality-standards/examples/contract-testing/`
3. Use Pact for consumer-driven contracts
4. Define contracts using OpenAPI/Swagger

**WeirdBites Contract Test Example**:

```javascript
// tests/contract/products-consumer.pact.test.js
const { Pact } = require('@pact-foundation/pact');
const { ProductService } = require('../../src/services/product-service');

describe('Products Service Contract', () => {
  const provider = new Pact({
    consumer: 'WeirdBites-Frontend',
    provider: 'WeirdBites-API'
  });

  beforeAll(() => provider.setup());
  afterAll(() => provider.finalize());

  describe('GET /products/:id', () => {
    it('should return product when it exists', async () => {
      await provider.addInteraction({
        state: 'product 123 exists',
        uponReceiving: 'a request for product 123',
        withRequest: {
          method: 'GET',
          path: '/api/products/123'
        },
        willRespondWith: {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
          body: {
            id: '123',
            name: 'Weird Chips',
            price: 4.99,
            category: 'snacks'
          }
        }
      });

      const service = new ProductService(provider.mockService.baseUrl);
      const product = await service.getProduct('123');

      expect(product.id).toBe('123');
      expect(product.name).toBe('Weird Chips');
    });
  });
});
```

**Deliverables**:
- Consumer contracts defined
- Provider verification tests
- Contract test execution in CI
- Pact Broker integration (optional)

---

### Step 5: Implement E2E Tests

**Goal**: Test critical user journeys end-to-end using Playwright or Cypress.

**Actions**:
1. Read `docs/quality-standards/docs/05-test-levels/e2e-testing.md`
2. Review examples in `docs/quality-standards/examples/e2e-tests/`
3. Choose framework: Playwright (recommended) or Cypress
4. Identify critical paths (10% of total tests)
5. Implement Page Object Model pattern

**WeirdBites E2E Test Example**:

```javascript
// tests/e2e/checkout-flow.spec.js
import { test, expect } from '@playwright/test';
import { ProductPage } from './pages/product-page';
import { CartPage } from './pages/cart-page';
import { CheckoutPage } from './pages/checkout-page';

test.describe('Checkout Flow', () => {
  test('should complete purchase as guest user', async ({ page }) => {
    // Navigate to product
    const productPage = new ProductPage(page);
    await productPage.goto('weird-chips-123');

    // Add to cart
    await productPage.addToCart();
    await expect(productPage.cartCount).toHaveText('1');

    // View cart
    const cartPage = new CartPage(page);
    await cartPage.goto();
    await expect(cartPage.items).toHaveCount(1);
    await expect(cartPage.total).toHaveText('$4.99');

    // Proceed to checkout
    await cartPage.proceedToCheckout();

    // Fill checkout form
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.fillShippingInfo({
      email: 'test@example.com',
      name: 'John Doe',
      address: '123 Main St',
      city: 'Portland',
      zip: '97201'
    });

    // Enter payment (test mode)
    await checkoutPage.fillPaymentInfo({
      cardNumber: '4242424242424242',
      expiry: '12/25',
      cvc: '123'
    });

    // Complete purchase
    await checkoutPage.submitOrder();

    // Verify confirmation
    await expect(page.locator('.order-confirmation')).toBeVisible();
    const orderNumber = await page.locator('.order-number').textContent();
    expect(orderNumber).toMatch(/^ORD-\d+$/);
  });
});
```

**Critical Paths for WeirdBites**:
1. Browse → Add to Cart → Checkout → Purchase (guest)
2. Browse → Add to Cart → Checkout → Purchase (logged in)
3. User Registration → Login
4. Product Search → Filter → View Details
5. Add Multiple Items → Update Quantities → Checkout

**Deliverables**:
- E2E tests for critical paths
- Page Object Models
- Test data management strategy
- Screenshot/video on failure
- Parallel execution configured

---

### Step 6: Implement Accessibility Tests

**Goal**: Ensure WCAG 2.1 Level AA compliance.

**Actions**:
1. Read `docs/quality-standards/docs/06-quality-attributes/accessibility.md`
2. Review examples in `docs/quality-standards/examples/accessibility-testing/` (13 files)
3. Integrate axe-core into E2E tests
4. Use Pa11y for automated scans
5. Manual testing with screen readers

**WeirdBites Accessibility Test Example**:

```javascript
// tests/e2e/accessibility.spec.js
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility Compliance', () => {
  test('product page should have no violations', async ({ page }) => {
    await page.goto('/products/weird-chips-123');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('checkout form should be keyboard navigable', async ({ page }) => {
    await page.goto('/checkout');

    // Tab through form fields
    await page.keyboard.press('Tab'); // Email
    await expect(page.locator('#email')).toBeFocused();

    await page.keyboard.press('Tab'); // Name
    await expect(page.locator('#name')).toBeFocused();

    await page.keyboard.press('Tab'); // Address
    await expect(page.locator('#address')).toBeFocused();
  });
});
```

**WCAG 2.1 Checklist for WeirdBites**:
- [ ] All images have alt text
- [ ] Color contrast ratio ≥ 4.5:1
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Form labels associated with inputs
- [ ] ARIA landmarks used
- [ ] Error messages accessible
- [ ] Screen reader tested

**Deliverables**:
- Automated accessibility tests
- Manual testing checklist
- Accessibility report
- Remediation plan for violations

---

### Step 7: Implement Performance Tests

**Goal**: Establish performance baseline and prevent regressions.

**Actions**:
1. Read `docs/quality-standards/docs/06-quality-attributes/performance-testing.md`
2. Review examples in `docs/quality-standards/examples/load-testing/` (k6, JMeter, Artillery)
3. Define performance budgets
4. Create load tests with k6

**WeirdBites Performance Tests**:

```javascript
// tests/performance/load-test.js (k6)
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '2m', target: 100 }, // Ramp up to 100 users
    { duration: '5m', target: 100 }, // Stay at 100 users
    { duration: '2m', target: 0 },   // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests < 500ms
    http_req_failed: ['rate<0.01'],   // Error rate < 1%
  },
};

export default function () {
  // Homepage
  const homeRes = http.get('https://weirdbites.com');
  check(homeRes, { 'homepage loaded': (r) => r.status === 200 });

  sleep(1);

  // Product listing
  const productsRes = http.get('https://weirdbites.com/api/products');
  check(productsRes, {
    'products API responds': (r) => r.status === 200,
    'products returned': (r) => JSON.parse(r.body).products.length > 0
  });

  sleep(2);
}
```

**Performance Budgets**:
- First Contentful Paint (FCP): < 1.5s
- Largest Contentful Paint (LCP): < 2.5s
- Time to Interactive (TTI): < 3.5s
- API Response Time (p95): < 500ms
- Database Query Time: < 100ms

**Deliverables**:
- Performance test scripts
- Baseline performance metrics
- Performance budgets defined
- Lighthouse CI integration

---

## Phase Completion Checklist

Before moving to **Phase 6: CI/CD Pipeline**, ensure:

- [ ] Test strategy document completed
- [ ] Test pyramid implemented (70/20/10 distribution)
- [ ] Unit tests achieve >80% coverage
- [ ] Integration tests cover all API endpoints
- [ ] Contract tests verify API contracts
- [ ] E2E tests cover critical user journeys
- [ ] Accessibility tests show WCAG 2.1 AA compliance
- [ ] Performance baselines established
- [ ] All tests pass consistently
- [ ] Test execution time < 10 minutes (full suite)
- [ ] Test documentation complete

---

## Key Metrics

Track these metrics throughout testing:
- **Code Coverage**: >80% (target: 90%)
- **Test Execution Time**: <10 minutes
- **Flaky Test Rate**: <5%
- **Defect Detection Rate**: Bugs found in testing vs production
- **Test Automation Rate**: >80% of test cases automated

---

## Common Pitfalls (From Documentation)

🚫 **Avoid These Mistakes**:

1. **Inverted test pyramid** - Too many E2E tests, not enough unit tests
2. **Testing implementation details** - Test behavior, not internals
3. **Slow tests** - Unit tests should be <1ms each
4. **Flaky tests** - Fix or delete, never ignore
5. **No test data management** - Use factories/fixtures
6. **Coupling tests** - Each test should be independent
7. **Poor assertions** - Use specific matchers, not generic equality
8. **Ignoring edge cases** - Test null, empty, boundary conditions

---

## Next Phase

Once testing phase is complete, proceed to:
**Phase 6: CI/CD Pipeline** (`/phase-cicd`)
- Integrate tests into pipeline
- Configure quality gates
- Automate test execution
- Set up deployment pipeline

---

## Resources

**Examples** (Copy patterns from these):
- Unit: `examples/unit-tests/` (Jest, Vitest, mutation)
- Integration: `examples/integration-tests/`, `examples/api-testing/`
- E2E: `examples/e2e-tests/` (Cypress, Playwright)
- Contract: `examples/contract-testing/` (Pact)
- Accessibility: `examples/accessibility-testing/` (axe, Pa11y)
- Performance: `examples/load-testing/` (k6, JMeter)

**Tools**:
- Test Frameworks: Jest, pytest, JUnit, Playwright
- Coverage: Istanbul, Coverage.py, JaCoCo
- API Testing: Supertest, REST Assured, Postman
- Contract: Pact, Spring Cloud Contract
- Accessibility: axe-core, Pa11y, Lighthouse
- Performance: k6, JMeter, Artillery, Lighthouse CI

---

**Remember**: Testing is continuous, not a phase gate. Write tests BEFORE or WITH code (TDD/BDD), not after!
