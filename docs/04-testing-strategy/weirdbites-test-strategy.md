# WeirdBites Test Strategy

**Version**: 1.0.0
**Date**: 2025-11-01
**Author**: Antonio Gomez Gallardo
**Status**: Active
**Reference**: quality-standards Module 04 - Testing Strategy

---

## Executive Summary

This document defines the comprehensive testing strategy for WeirdBites, an educational e-commerce platform built to demonstrate mastery of Software Testing Life Cycle (STLC) best practices. The strategy implements shift-left testing principles, automated quality gates, and risk-based test prioritization to ensure high-quality deliverables at every phase of development.

**Key Objectives**:

- Maintain >80% code coverage across all modules
- Achieve 100% test coverage on critical e-commerce paths
- Prevent defects from reaching production through comprehensive CI/CD quality gates
- Demonstrate industry-standard testing practices for QA engineering role

---

## 1. Testing Philosophy

### 1.1 Shift-Left Approach

**Principle**: Find and fix defects as early as possible in the development lifecycle.

**Implementation**:

- **TDD (Test-Driven Development)**: Write tests BEFORE implementation

  ```
  Red → Green → Refactor
  1. Write failing test
  2. Write minimum code to pass
  3. Refactor for quality
  ```

- **Early Feedback**: Run tests continuously during development
  - Watch mode during coding (`pnpm test:watch`)
  - Pre-commit hooks enforce quality (Husky + lint-staged)
  - CI/CD pipeline runs on every PR

- **Prevention over Detection**: Automated checks prevent bad code from merging
  - TypeScript catches type errors at compile time
  - ESLint catches code quality issues
  - Jest catches functional bugs
  - Playwright catches integration issues

**Benefits**:

- 80% of bugs caught during development (before PR)
- 15% caught during PR review (CI/CD)
- 5% escape to production (monitored with error tracking)

---

### 1.2 Test Pyramid Architecture

**Distribution Target**:

```
        /\
       /E2E\     10% - End-to-End Tests
      /____\
     /      \
    /  INT   \   20% - Integration Tests
   /________\
  /          \
 /    UNIT    \  70% - Unit Tests
/______________\
```

**Rationale**:

**Unit Tests (70%)** - Fast, Isolated, Abundant

- **Purpose**: Test individual functions/components in isolation
- **Speed**: Milliseconds per test
- **Coverage**: Every function, every component, every util
- **Example**: Test `getProducts()` function with mocked database

**Integration Tests (20%)** - Medium Speed, Real Dependencies

- **Purpose**: Test how components work together
- **Speed**: Seconds per test
- **Coverage**: API routes, database interactions, service integrations
- **Example**: Test `/api/products` endpoint with real database

**E2E Tests (10%)** - Slow, Comprehensive, Critical Paths

- **Purpose**: Test complete user journeys through the UI
- **Speed**: Minutes per test
- **Coverage**: Happy paths, critical error scenarios, accessibility
- **Example**: Test full checkout flow from browse → cart → payment → confirmation

**Why This Distribution?**

- **Speed**: 260 unit tests run in 5 seconds, 11 E2E test files in 3 minutes
- **Feedback**: Fast unit tests give immediate feedback during development
- **Confidence**: E2E tests validate the system works end-to-end
- **Maintainability**: Unit tests are easier to maintain than E2E tests

---

### 1.3 Quality Over Speed

**Non-Negotiable Quality Standards**:

- ✅ All tests must pass before merge (0 failures accepted)
- ✅ Code coverage must be >80% (enforced by CI)
- ✅ No ESLint or TypeScript errors (strict mode)
- ✅ Accessibility tests must pass (0 axe-core violations)
- ✅ Security scans must be clean (0 critical/high vulnerabilities)

**Broken Build Policy**:

- Broken builds are **team emergencies** (Principle #4 from Quality Manifesto)
- Fix immediately or revert the PR
- Root cause analysis for any production bugs

**Technical Debt Management**:

- All technical debt is logged in `docs/TECHNICAL-DEBT.md`
- Each debt item has:
  - Severity rating (Low/Medium/High/Critical)
  - Remediation plan with timeline
  - Acceptance criteria for resolution
- Debt is reviewed weekly and prioritized

---

## 2. Test Levels

### 2.1 Unit Testing

**Tool**: Jest 30.2.0 + React Testing Library + @testing-library/jest-dom

**Scope**: Test individual functions, components, and utilities in complete isolation

**Coverage Target**: >80% (line, branch, function, statement)

**What to Unit Test**:

- ✅ **Business Logic**: Product calculations, cart operations, price computations

  ```typescript
  // Example: src/lib/__tests__/products.test.ts
  describe('getProducts', () => {
    it('should return paginated products', async () => {
      const result = await getProducts(1, 12);
      expect(result.products).toHaveLength(12);
      expect(result.pagination.currentPage).toBe(1);
    });
  });
  ```

- ✅ **Components**: React components with props/state/events

  ```typescript
  // Example: src/components/__tests__/product-card.test.tsx
  it('should render product with correct price', () => {
    render(<ProductCard name="Test" price={9.99} />)
    expect(screen.getByText('$9.99')).toBeInTheDocument()
  })
  ```

- ✅ **Utilities**: Helper functions, formatters, validators
  ```typescript
  // Example: src/lib/__tests__/stock-utils.test.ts
  it('should return "outOfStock" for 0 stock', () => {
    expect(getStockStatus(0)).toBe('outOfStock');
  });
  ```

**What NOT to Unit Test**:

- ❌ Third-party libraries (trust their tests)
- ❌ Simple getters/setters with no logic
- ❌ Configuration files
- ❌ Type definitions

**Mocking Strategy**:

- Mock external dependencies (database, APIs, file system)
- Use `jest.mock()` for module-level mocks
- Use `jest.fn()` for function mocks
- Keep mocks simple and focused

**Running Unit Tests**:

```bash
# Run all tests
pnpm test

# Watch mode (during development)
pnpm test:watch

# Coverage report
pnpm test:coverage

# Single file
pnpm test src/lib/__tests__/products.test.ts
```

---

### 2.2 Integration Testing

**Tool**: Jest + Supertest (for API routes)

**Scope**: Test how multiple components/modules work together with real dependencies

**Coverage Target**: All API routes, critical database interactions

**What to Integration Test**:

- ✅ **API Routes**: HTTP endpoints with real database

  ```typescript
  // Example: src/app/api/products/__tests__/route.test.ts
  it('GET /api/products should return products', async () => {
    const response = await request(app).get('/api/products');
    expect(response.status).toBe(200);
    expect(response.body.products).toBeInstanceOf(Array);
  });
  ```

- ✅ **Database Operations**: Prisma queries, transactions

  ```typescript
  it('should create product in database', async () => {
    const product = await createProduct({ name: 'Test', price: 9.99 });
    expect(product.id).toBeDefined();

    // Verify in DB
    const found = await prisma.product.findUnique({ where: { id: product.id } });
    expect(found.name).toBe('Test');
  });
  ```

- ✅ **Service Integrations**: Stripe API, email service
  ```typescript
  it('should create Stripe payment intent', async () => {
    const intent = await createPaymentIntent(1000, 'usd');
    expect(intent.status).toBe('requires_payment_method');
  });
  ```

**Database Setup for Integration Tests**:

- Use separate test database (not production!)
- Seed with known test data before each test
- Clean up after each test (transaction rollback or truncate)

---

### 2.3 End-to-End (E2E) Testing

**Tool**: Playwright 1.56.1 (Chromium, Firefox, WebKit)

**Scope**: Test complete user journeys through the browser UI

**Coverage Target**: All critical user flows, happy paths + key error scenarios

**What to E2E Test**:

- ✅ **Critical User Journeys**:
  - Browse products → View details → Add to cart → Checkout → Confirmation
  - User registration → Login → Browse → Logout
  - Search → Filter → Sort → View product

- ✅ **Cross-Browser Compatibility**:
  - Chromium (Chrome/Edge)
  - Firefox
  - WebKit (Safari)

- ✅ **Responsive Design**:
  - Mobile (iPhone 14)
  - Tablet (iPad)
  - Desktop (1920x1080)

**E2E Test Organization**:

```
tests/e2e/
├── products.spec.ts         # Product browsing flows
├── pagination.spec.ts       # Pagination interactions
├── product-detail.spec.ts   # Product detail page journeys
├── category-filter.spec.ts  # Category filtering
├── cart.spec.ts             # Shopping cart flows
├── checkout.spec.ts         # Guest checkout flow
├── accessibility.spec.ts    # axe-core a11y scans
└── responsive.spec.ts       # Multi-viewport tests
```

**Running E2E Tests**:

```bash
# Headless mode (CI)
pnpm test:e2e

# Headed mode (see browser)
pnpm test:e2e:headed

# UI mode (debug)
pnpm test:e2e:ui

# Specific browser
pnpm test:e2e --project=firefox
```

**E2E Best Practices**:

- Use Page Object Model (POM) pattern for complex pages
- Keep tests independent (no shared state)
- Use data-testid attributes for stable selectors
- Wait for network idle before assertions
- Take screenshots on failure (automatic in Playwright)

---

### 2.4 Accessibility Testing

**Tool**: axe-core 4.10+ (integrated in Playwright E2E tests)

**Scope**: Ensure WCAG 2.1 Level AA compliance

**Coverage Target**: 0 accessibility violations on all pages

**What to Test**:

- ✅ **Automated Scans**: axe-core detects ~57% of accessibility issues
  - Color contrast ratios
  - Missing ARIA labels
  - Keyboard navigation
  - Focus management
  - Semantic HTML

- ✅ **Manual Testing**:
  - Screen reader compatibility (NVDA, JAWS)
  - Keyboard-only navigation
  - Logical reading order
  - Form label associations

**Example E2E Accessibility Test**:

```typescript
// tests/e2e/accessibility.spec.ts
test('products page passes axe-core scan', async ({ page }) => {
  await page.goto('/products');

  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
```

**Accessibility Standards**:

- **WCAG 2.1 Level AA** (minimum requirement)
- **Color Contrast**: 4.5:1 for normal text, 3:1 for large text
- **Keyboard Navigation**: All interactive elements accessible via keyboard
- **Screen Readers**: All content readable, proper ARIA labels

---

### 2.5 Security Testing

**Tools**:

- TruffleHog 3.82+ (secret scanning)
- npm audit (dependency vulnerabilities)

**Scope**: Prevent secrets in code, vulnerable dependencies

**Coverage Target**: 0 critical/high vulnerabilities before production

**What to Test**:

- ✅ **Secret Scanning**: Detect API keys, passwords, tokens in commits
- ✅ **Dependency Vulnerabilities**: npm packages with known CVEs
- ✅ **Input Validation**: SQL injection, XSS prevention
- ✅ **Authentication**: Session management, password hashing
- ✅ **Authorization**: Role-based access control

**Security Testing Workflow**:

1. **Pre-commit**: TruffleHog scans staged changes
2. **CI/CD**: npm audit runs on every PR
3. **Weekly**: Full security audit with updated vulnerability database

**Security Response Plan**:

- **Critical**: Fix within 24 hours
- **High**: Fix within 1 week
- **Medium**: Fix within 1 month
- **Low**: Fix in next sprint or accept risk

---

## 3. Test Data Strategy

### 3.1 Unit Test Data

**Approach**: Hardcoded mock data

**Example**:

```typescript
const mockProduct = {
  id: 'test-123',
  name: 'Test Product',
  price: 9.99,
  stock: 10,
};
```

**Benefits**:

- Fast (no database calls)
- Predictable (same data every time)
- Isolated (no external dependencies)

---

### 3.2 Integration Test Data

**Approach**: Test fixtures with database seeding

**Example**:

```typescript
beforeEach(async () => {
  await prisma.product.createMany({
    data: [
      { name: 'Product 1', price: 9.99, stock: 10 },
      { name: 'Product 2', price: 14.99, stock: 5 },
    ],
  });
});

afterEach(async () => {
  await prisma.product.deleteMany();
});
```

**Benefits**:

- Real database interactions
- Controlled test state
- Easy cleanup

---

### 3.3 E2E Test Data

**Approach**: Seeded test database with realistic data

**Current Seed Data**:

- 15 products across 5 categories
- 3 users (guest, customer, admin)
- 2 sample orders

**Location**: `prisma/seed.ts`

**Seeding Command**:

```bash
pnpm db:seed
```

**Benefits**:

- Realistic user scenarios
- Consistent test environment
- Easy to recreate

---

## 4. CI/CD Integration

### 4.1 GitHub Actions Pipeline

**Workflow File**: `.github/workflows/ci.yml`

**Triggers**:

- Every push to any branch
- Every pull request to `main`

**Quality Gates** (7 total):

```yaml
1. Lint
   - Tool: ESLint
   - Pass Criteria: 0 errors, 0 warnings
   - Duration: ~15 seconds

2. Type Check
   - Tool: TypeScript (tsc --noEmit)
   - Pass Criteria: 0 type errors
   - Duration: ~25 seconds

3. Unit Tests
   - Tool: Jest
   - Pass Criteria: All tests pass, coverage >80%
   - Duration: ~45 seconds

4. E2E Tests
   - Tool: Playwright (3 browsers)
   - Pass Criteria: All tests pass, 0 accessibility violations
   - Duration: ~3 minutes

5. Build
   - Tool: Next.js build
   - Pass Criteria: Clean build, no errors
   - Duration: ~1 minute

6. Security Scan
   - Tools: TruffleHog + npm audit
   - Pass Criteria: 0 critical/high vulnerabilities, no secrets
   - Duration: ~30 seconds

7. Quality Gate (Final Check)
   - Verifies: All above gates passed
   - Pass Criteria: 100% gate success
```

**Total Pipeline Duration**: ~6 minutes

**Failure Handling**:

- PR blocked if any gate fails
- Detailed error logs provided
- Test reports retained for 30 days

---

### 4.2 Branch Protection Rules

**Enabled on `main` branch**:

- ✅ Require pull request before merging
- ✅ Require status checks to pass (all 7 gates)
- ✅ Require branches to be up to date before merging
- ✅ Require conversation resolution before merging
- ❌ No direct push to `main`
- ❌ No force pushes allowed

**Merge Strategy**: Squash and merge (clean commit history)

---

## 5. Risk-Based Testing

### 5.1 Risk Matrix

| Risk Level   | Coverage Requirement | Testing Depth            | Example Features                                       |
| ------------ | -------------------- | ------------------------ | ------------------------------------------------------ |
| **Critical** | 100%                 | All test levels          | Checkout flow, Payment processing, User authentication |
| **High**     | 90%                  | Unit + Integration + E2E | Shopping cart, Product management (admin)              |
| **Medium**   | 80%                  | Unit + E2E (happy paths) | Product filtering, Search, User profile                |
| **Low**      | 60%                  | Unit only                | Marketing content, UI animations, Admin analytics      |

---

### 5.2 Critical Paths (100% Coverage)

**E-commerce Flow**:

```
Browse Products → View Details → Add to Cart → Checkout
→ Enter Shipping → Enter Payment → Place Order → Confirmation
```

**Must have**:

- Unit tests for all business logic
- Integration tests for all API endpoints
- E2E tests for complete user journey
- Error scenario tests (out of stock, payment failure, validation errors)

**User Authentication**:

```
Registration → Login → Session Management → Logout
```

**Must have**:

- Security tests for password hashing
- Session validation tests
- CSRF protection tests

---

### 5.3 Test Prioritization

**Priority 1 (Test First)**:

- Payment processing
- User data security
- Order creation
- Inventory updates

**Priority 2 (Test Soon)**:

- Shopping cart operations
- Product filtering
- Search functionality

**Priority 3 (Test Eventually)**:

- UI polish
- Marketing content
- Admin analytics

---

## 6. Test Maintenance

### 6.1 Test Review Process

**When**:

- Every PR with new tests
- Monthly test suite audit

**Review Checklist**:

- [ ] Tests are clear and descriptive
- [ ] No duplicate tests
- [ ] No flaky tests (re-run 3 times to verify)
- [ ] Tests follow AAA pattern (Arrange, Act, Assert)
- [ ] Mocks are minimal and focused
- [ ] Tests are fast (<100ms for unit, <10s for E2E)

---

### 6.2 Flaky Test Policy

**Definition**: A test that sometimes passes and sometimes fails without code changes

**Policy**:

- **Identify**: Mark flaky tests with `test.fixme()`
- **Fix within 1 week**: Root cause analysis, fix, or delete
- **Never skip**: Don't use `test.skip()` to hide flaky tests
- **Track**: Log flaky tests in `TECHNICAL-DEBT.md`

**Common Causes**:

- Race conditions (timing issues)
- Network timeouts
- Shared state between tests
- Environment-specific behavior

---

## 7. Metrics & Reporting

### 7.1 Test Coverage Metrics

**Tracked Metrics**:

- Line coverage: % of lines executed
- Branch coverage: % of branches taken
- Function coverage: % of functions called
- Statement coverage: % of statements executed

**Target**: >80% for all metrics

**Reporting**: Weekly coverage reports in `docs/09-metrics-monitoring/`

---

### 7.2 CI/CD Metrics

**Tracked Metrics**:

- CI success rate: % of CI runs passing all gates
- Average CI duration: Time to complete pipeline
- Gate failure breakdown: Which gates fail most often

**Target**: >95% CI success rate

**Reporting**: Weekly CI metrics in `docs/09-metrics-monitoring/`

---

## 8. Continuous Improvement

### 8.1 Retrospective Questions

**After Each Sprint**:

- What testing worked well?
- What testing gaps were discovered?
- Were any bugs found in production? Why did tests miss them?
- Are tests running fast enough?
- Are tests easy to maintain?

---

### 8.2 Testing Maturity Goals

**Current Maturity Level**: 3 (Defined)

- ✅ Automated testing in CI/CD
- ✅ Test coverage tracked
- ✅ Risk-based prioritization
- ✅ Documented test strategy

**Next Maturity Level**: 4 (Managed)

- ⏳ Performance testing integrated
- ⏳ Visual regression testing
- ⏳ Mutation testing (test effectiveness)
- ⏳ Test metrics dashboard

---

## 9. Tools & Technologies

| Category          | Tool                  | Version  | Purpose                    |
| ----------------- | --------------------- | -------- | -------------------------- |
| Unit Testing      | Jest                  | 30.2.0   | Test framework             |
| Component Testing | React Testing Library | -        | React component testing    |
| E2E Testing       | Playwright            | 1.56.1   | Browser automation         |
| Accessibility     | axe-core              | 4.10+    | WCAG compliance            |
| Coverage          | Jest built-in         | -        | Code coverage              |
| Security          | TruffleHog            | 3.82+    | Secret scanning            |
| Security          | npm audit             | Built-in | Dependency vulnerabilities |
| CI/CD             | GitHub Actions        | -        | Automation pipeline        |
| Mocking           | Jest mocks            | Built-in | Test doubles               |

---

## 10. References

- **Quality Standards**: `docs/quality-standards/04-testing-strategy/`
- **Test Levels**: `docs/05-test-levels/`
- **Quality Manifesto**: `docs/quality-standards/MANIFESTO.md`
- **Test Coverage Report**: `docs/05-test-levels/test-coverage-report.md`
- **Risk Analysis**: `docs/04-testing-strategy/risk-analysis.md`

---

## Appendix A: Test Naming Conventions

**Pattern**: `it('should [expected behavior] when [conditions]')`

**Examples**:

```typescript
// Good ✅
it('should return 12 products when page size is 12');
it('should throw error when page number is negative');
it('should add item to cart when stock is available');

// Bad ❌
it('works'); // Too vague
it('test getProducts'); // Not descriptive
it('getProducts returns products'); // Restates function name
```

---

## Appendix B: AAA Pattern (Arrange, Act, Assert)

**Structure**:

```typescript
test('should calculate total price correctly', () => {
  // Arrange - Set up test data
  const cart = {
    items: [
      { price: 10, quantity: 2 },
      { price: 5, quantity: 1 },
    ],
  };

  // Act - Execute the function under test
  const total = calculateTotal(cart);

  // Assert - Verify the result
  expect(total).toBe(25);
});
```

---

**Document Control**:

- **Version**: 1.0.0
- **Last Updated**: 2025-11-01
- **Next Review**: Monthly
- **Owner**: Antonio Gomez Gallardo
