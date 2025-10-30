# Technical Debt Log

**Purpose**: Track known technical debt, shortcuts, and areas for improvement

**Last Updated**: 2025-10-30

---

## Active Technical Debt

_(No active technical debt at this time)_

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

### ✅ Complete E2E Coverage (All Tests Updated)

| Test File                | Status  | Notes                                                |
| ------------------------ | ------- | ---------------------------------------------------- |
| `product-detail.spec.ts` | ✅ Good | Tests full journey + smoke tests (Updated in IS-014) |

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

### TD-001: E2E Tests Not Testing Complete User Journeys

**Category**: Testing
**Severity**: Medium
**Created**: 2025-10-30
**Resolved**: 2025-10-30 (PR #41, IS-014)
**Related PRs**: #37 (US-002 Slice 2.1), #40 (IS-012), #41 (IS-014)

**Issue**:
Product detail E2E tests used direct navigation (`page.goto('/products/[id]')`) instead of testing the complete user journey from product listing → product detail.

**Original Behavior**:

```typescript
// tests/e2e/product-detail.spec.ts
test('should display product detail page', async ({ page }) => {
  await page.goto(`/products/${testProductId}`); // Direct navigation only
});
```

**Solution Implemented**:

1. Built `/products` route (IS-012, PR #40)
2. Updated E2E tests with two test suites (IS-014, PR #41):
   - **User Journey Tests**: Start from `/products` → Click product card → Verify detail page
   - **Direct Navigation Tests (Smoke Tests)**: Direct URL access for bookmarks/shares
3. Added comprehensive documentation explaining test purposes

**New Behavior**:

```typescript
// User Journey Tests (3 tests)
test('should navigate from products page to detail via card click', async ({ page }) => {
  await page.goto('/products'); // Real entry point
  await page.locator('[data-testid="product-card"]').first().click();
  await expect(page.locator('h1')).toBeVisible();
});

// Direct Navigation Tests (2 tests) - Smoke tests
test('should display product detail page for valid product ID', async ({ page }) => {
  await page.goto(`/products/${testProductId}`); // Direct access
  await expect(page.locator('h1')).toBeVisible();
});
```

**Impact of Resolution**:

- ✅ Now testing complete user journey (5 E2E tests total)
- ✅ Catches integration issues between products listing and detail pages
- ✅ Validates browser navigation (back/forward buttons)
- ✅ Verifies product name consistency across pages
- ✅ Maintains smoke tests for direct URL access

**Lessons Learned**:

- E2E tests should simulate real user behavior, not just page renders
- Direct navigation tests still valuable as smoke tests
- Clear documentation prevents confusion about test purposes

---

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
