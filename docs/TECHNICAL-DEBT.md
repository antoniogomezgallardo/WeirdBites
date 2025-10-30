# Technical Debt Log

**Purpose**: Track known technical debt, shortcuts, and areas for improvement

**Last Updated**: 2025-10-30

---

## Active Technical Debt

### TD-001: E2E Tests Not Testing Complete User Journeys

**Category**: Testing
**Severity**: Medium
**Created**: 2025-10-30
**Related PRs**: #37 (US-002 Slice 2.1)

**Issue**:
Product detail E2E tests use direct navigation (`page.goto('/products/[id]')`) instead of testing the complete user journey from product listing → product detail.

**Current Behavior**:

```typescript
// tests/e2e/product-detail.spec.ts
test('should display product detail page', async ({ page }) => {
  await page.goto(`/products/${testProductId}`); // Direct navigation
  // This is more like an INTEGRATION test, not true E2E
});
```

**Expected Behavior**:

```typescript
test('should navigate from listing to detail', async ({ page }) => {
  await page.goto('/'); // Start at homepage
  await page.locator('[data-testid="product-card"]').first().click(); // Click product
  await expect(page.locator('h1')).toBeVisible(); // Verify detail page loaded
});
```

**Why We Took This Shortcut**:

- `/products` route doesn't exist yet (only components exist)
- Wanted to unblock US-002 development
- Plan to build proper product listing page later

**Impact**:

- ❌ Not testing ProductCard → ProductDetailPage link navigation
- ❌ Missing coverage for complete user journey
- ✅ Direct navigation still validates detail page renders correctly

**Remediation Plan**:

1. Build `/products` route (see backlog IS-012)
2. Update E2E tests to test full user journey
3. Keep "Direct Navigation" tests as supplementary smoke tests
4. Target: Complete with US-001 improvements or Deployment Increment 2

**Related Items**:

- IS-012: Create `/products` route for product listing page
- IS-011: Navigation bar component
- IS-013: Marketing landing page for `/`

---

## E2E Test Coverage Analysis

**Reviewed**: 2025-10-30

### ✅ Good E2E Coverage (True User Journeys)

| Test File               | Status  | Notes                                              |
| ----------------------- | ------- | -------------------------------------------------- |
| `products.spec.ts`      | ✅ Good | Tests homepage load → view products                |
| `pagination.spec.ts`    | ✅ Good | Tests homepage → click pagination → navigate pages |
| `accessibility.spec.ts` | ✅ Good | Tests homepage accessibility (axe-core scans)      |
| `responsive.spec.ts`    | ✅ Good | Tests homepage at various viewport sizes           |

### ⚠️ Incomplete E2E Coverage (Direct Navigation Shortcuts)

| Test File                | Status        | Missing Coverage                                     |
| ------------------------ | ------------- | ---------------------------------------------------- |
| `product-detail.spec.ts` | ⚠️ Incomplete | Missing: Homepage → Click Product Card → Detail Page |

### Recommended E2E Test Additions (Future)

When `/products` route is built, add these test scenarios:

1. **Product Discovery Journey**:

   ```
   / (home) → /products (listing) → /products/[id] (detail)
   ```

2. **Search & Filter Journey** (US-003+):

   ```
   / → /products → Filter by category → Click filtered product → Detail
   ```

3. **Shopping Cart Journey** (US-004+):

   ```
   / → /products → /products/[id] → Add to Cart → /cart
   ```

4. **Guest Checkout Journey** (US-007+):
   ```
   / → Browse → Add to Cart → Checkout → Payment → Confirmation
   ```

---

## Resolved Technical Debt

### TD-000: Dark Mode Causing Black Background

**Category**: UI/UX
**Severity**: Low
**Created**: 2025-10-30
**Resolved**: 2025-10-30 (PR #37)

**Issue**: CSS `prefers-color-scheme: dark` media query was applying black background (#0a0a0a) when OS is in dark mode, even though dark mode feature flag is disabled.

**Solution**: Removed dark mode media query from `globals.css` until proper dark mode is implemented (per feature flag: `darkMode: false`).

---

## Notes on Managing Technical Debt

**Guidelines**:

1. **Document immediately** - When taking a shortcut, log it here
2. **Prioritize ruthlessly** - Not all debt needs immediate fixing
3. **Plan payback** - Link to backlog items for remediation
4. **Communicate** - Share debt status in sprint reviews
5. **Track metrics** - Monitor debt growth vs. payback rate

**Acceptable Reasons for Technical Debt**:

- ✅ Unblock critical user stories
- ✅ Time-to-market pressures (with plan to fix)
- ✅ Learning/experimentation (spike work)
- ✅ External dependencies not ready

**Unacceptable Reasons**:

- ❌ Laziness or lack of knowledge
- ❌ No plan to ever address it
- ❌ Affects security or data integrity
- ❌ Violates core quality standards

---

**Reference**: See [CLAUDE.md](CLAUDE.md) for quality standards and manifesto principles.
