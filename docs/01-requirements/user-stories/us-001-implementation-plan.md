# US-001: Browse Product Catalog - Implementation Plan

**Version**: 1.0.0
**Last Updated**: 2025-10-28
**Story Points**: 5
**Estimated Duration**: 2.5 days
**Status**: Ready for Implementation

## Story Overview

**User Story**: As a customer, I want to browse the product catalog on the homepage so that I can discover weird and exotic treats available for purchase.

**Epic**: Epic 1 - Core Catalog

**Priority**: Must Have (MoSCoW)

**Acceptance Criteria**:

1. Homepage displays 8-12 products in a grid layout
2. Each product shows: image, name, price, brief description
3. Products are paginated (12 per page)
4. Loading state is shown while fetching products
5. Grid is responsive: mobile (1 col), tablet (2 col), desktop (4 col)

## Prerequisites

- [x] Product model exists in Prisma schema
- [x] Database connection configured
- [x] Testing frameworks set up (Jest, Playwright, axe-core)
- [x] CI/CD pipeline with 7 quality gates
- [x] Feature flags system implemented

## Implementation Approach

### Development Methodology

- **TBD (Trunk-Based Development)**: Short-lived feature branches per slice
- **TDD (Test-Driven Development)**: Red → Green → Refactor cycle
- **Vertical Slicing**: Each slice delivers end-to-end value (DB → API → UI)

### Branch Strategy

Each vertical slice will have its own feature branch:

- **Slice 1.1**: `feature/us-001-slice-1.1-basic-listing`
- **Slice 1.2**: `feature/us-001-slice-1.2-pagination-loading`
- **Slice 1.3**: `feature/us-001-slice-1.3-responsive-polish`

Each branch will be merged via PR after:

- All tests pass (unit + integration + E2E)
- CI quality gates pass (7/7)
- Self-review checklist completed
- Code is production-ready

## Vertical Slices Breakdown

### Slice 1.1: Basic Product Listing

**Story Points**: 2
**Duration**: 1 day
**Branch**: `feature/us-001-slice-1.1-basic-listing`

#### What Gets Delivered

- Seed data script with 12+ products
- GET `/api/products` endpoint (returns first 12 products)
- ProductCard component (displays product info)
- Homepage displays product grid (basic, desktop-first)

#### TDD Workflow (Red → Green → Refactor)

**Step 1: Red Phase - Write Failing Tests**

```bash
# Terminal 1: Test watcher
pnpm test:watch

# Write tests FIRST (all fail initially):
# 1. Seed data tests (3 tests)
# 2. ProductCard unit tests (6 tests)
# 3. API route tests (6 tests)
# 4. E2E test (2 tests)
```

**Step 2: Green Phase - Minimal Code to Pass**

```bash
# Write minimal code to make tests pass:
# 1. Create seed script → tests pass
# 2. Create ProductCard → tests pass
# 3. Create API route → tests pass
# 4. Wire up homepage → E2E tests pass
```

**Step 3: Refactor Phase - Improve Code Quality**

```bash
# Refactor while keeping tests green:
# - Extract utilities
# - Improve type safety
# - Add JSDoc comments
# - Verify all tests still pass
```

#### Test Breakdown (21 tests total)

**Unit Tests (9 happy path + 5 error scenarios = 14 tests)**

_Seed Data Script_ (`prisma/seed.ts`):

- ✅ Happy: Seeds at least 12 products
- ✅ Happy: Each product has required fields (name, price, imageUrl, description, category)
- ✅ Happy: Prices are valid decimals
- ❌ Error: Handles duplicate product names gracefully
- ❌ Error: Validates price is positive

_ProductCard Component_ (`src/components/product-card.tsx`):

- ✅ Happy: Renders product name
- ✅ Happy: Renders product price formatted as currency
- ✅ Happy: Renders product image with alt text
- ❌ Error: Shows placeholder when image fails to load
- ❌ Error: Handles missing description gracefully
- ❌ Error: Handles invalid price (null/undefined)

**Integration Tests (3 happy path + 3 error scenarios = 6 tests)**

_API Route_ (`src/app/api/products/route.ts`):

- ✅ Happy: GET returns 200 with array of products
- ✅ Happy: Returns max 12 products by default
- ✅ Happy: Each product matches Product schema
- ❌ Error: Returns 500 if database connection fails
- ❌ Error: Returns empty array if no products in database
- ❌ Error: Handles malformed query parameters

**E2E Tests (1 happy path + 1 error scenario = 2 tests)**

_Homepage_ (`tests/e2e/homepage.spec.ts`):

- ✅ Happy: Displays product grid on homepage
- ❌ Error: Shows error message if API fails

#### Files to Create/Modify

**Create**:

- `prisma/seed.ts` - Seed 12+ exotic products
- `src/components/product-card.tsx` - Product card component
- `src/app/api/products/route.ts` - GET endpoint
- `src/app/api/products/route.test.ts` - API integration tests
- `src/components/__tests__/product-card.test.tsx` - Component unit tests
- `tests/e2e/homepage.spec.ts` - E2E tests

**Modify**:

- `src/app/page.tsx` - Add product grid
- `package.json` - Add seed script: `"db:seed": "tsx prisma/seed.ts"`

#### Commit Strategy (4-5 small commits)

1. `test(products): add seed data tests`
2. `feat(products): implement seed script with 12 products`
3. `test(products): add ProductCard unit tests`
4. `feat(products): create ProductCard component`
5. `test(products): add GET /api/products integration tests`
6. `feat(products): implement GET /api/products endpoint`
7. `test(products): add homepage E2E test`
8. `feat(products): display products on homepage`
9. `refactor(products): extract product utilities`

---

### Slice 1.2: Pagination & Loading States

**Story Points**: 2
**Duration**: 1 day
**Branch**: `feature/us-001-slice-1.2-pagination-loading`

#### What Gets Delivered

- LoadingSkeleton component for product grid
- Pagination component (prev/next buttons)
- API route supports `?page=N&pageSize=12` query params
- Homepage shows loading state while fetching
- Pagination controls at bottom of grid

#### TDD Workflow (Red → Green → Refactor)

**Step 1: Red Phase**

```bash
# Write tests FIRST:
# 1. LoadingSkeleton tests (3 tests)
# 2. ProductGrid tests (6 tests)
# 3. API pagination tests (7 tests)
# 4. E2E pagination tests (6 tests)
```

**Step 2: Green Phase**

```bash
# Minimal code to pass tests:
# 1. LoadingSkeleton → tests pass
# 2. ProductGrid with loading state → tests pass
# 3. API pagination logic → tests pass
# 4. Wire up pagination controls → E2E tests pass
```

**Step 3: Refactor Phase**

```bash
# Refactor:
# - Extract pagination utilities
# - Add error boundaries
# - Improve TypeScript types
# - Verify tests still pass
```

#### Test Breakdown (22 tests total)

**Unit Tests (6 happy path + 7 error scenarios = 13 tests)**

_LoadingSkeleton Component_ (`src/components/loading-skeleton.tsx`):

- ✅ Happy: Renders skeleton with correct number of cards
- ✅ Happy: Shows shimmer animation
- ✅ Happy: Has accessible loading label

_ProductGrid Component_ (`src/components/product-grid.tsx`):

- ✅ Happy: Shows LoadingSkeleton when loading prop is true
- ✅ Happy: Shows products when loading is false
- ✅ Happy: Shows pagination controls when totalPages > 1
- ❌ Error: Shows error message when error prop is passed
- ❌ Error: Shows "No products found" when products array is empty
- ❌ Error: Disables "Previous" button on first page
- ❌ Error: Disables "Next" button on last page

**Integration Tests (4 happy path + 3 error scenarios = 7 tests)**

_API Route Pagination_ (`src/app/api/products/route.ts`):

- ✅ Happy: Returns first 12 products for page=1
- ✅ Happy: Returns correct products for page=2
- ✅ Happy: Respects custom pageSize parameter
- ✅ Happy: Returns total count in response headers
- ❌ Error: Returns 400 for invalid page number (< 1)
- ❌ Error: Returns 400 for invalid pageSize (< 1 or > 100)
- ❌ Error: Returns empty array for page beyond total pages

**E2E Tests (3 happy path + 3 error scenarios = 6 tests)**

_Pagination Flow_ (`tests/e2e/pagination.spec.ts`):

- ✅ Happy: Shows loading skeleton on initial load
- ✅ Happy: Clicking "Next" loads page 2
- ✅ Happy: URL updates with page parameter
- ❌ Error: Shows error message if page load fails
- ❌ Error: Retains current page if navigation fails
- ❌ Error: Handles network timeout gracefully

#### Files to Create/Modify

**Create**:

- `src/components/loading-skeleton.tsx` - Loading skeleton component
- `src/components/product-grid.tsx` - Grid with pagination logic
- `src/components/pagination.tsx` - Pagination controls
- `src/components/__tests__/loading-skeleton.test.tsx`
- `src/components/__tests__/product-grid.test.tsx`
- `src/components/__tests__/pagination.test.tsx`
- `tests/e2e/pagination.spec.ts` - E2E pagination tests
- `src/lib/pagination.ts` - Pagination utilities

**Modify**:

- `src/app/api/products/route.ts` - Add pagination logic
- `src/app/api/products/route.test.ts` - Add pagination tests
- `src/app/page.tsx` - Use ProductGrid component with loading state

#### Commit Strategy (4-5 small commits)

1. `test(products): add LoadingSkeleton unit tests`
2. `feat(products): create LoadingSkeleton component`
3. `test(products): add ProductGrid unit tests with loading states`
4. `feat(products): create ProductGrid component`
5. `test(products): add API pagination integration tests`
6. `feat(products): implement pagination in API route`
7. `test(products): add pagination E2E tests`
8. `feat(products): add pagination controls to homepage`
9. `refactor(products): extract pagination utilities`

---

### Slice 1.3: Responsive Design & Polish

**Story Points**: 1
**Duration**: 0.5 day
**Branch**: `feature/us-001-slice-1.3-responsive-polish`

#### What Gets Delivered

- Responsive grid layout (mobile: 1 col, tablet: 2 col, desktop: 4 col)
- Accessibility improvements (WCAG 2.1 AA compliance)
- Image optimization with Next.js Image component
- Hover states and animations
- Error boundaries for graceful failures

#### TDD Workflow (Red → Green → Refactor)

**Step 1: Red Phase**

```bash
# Write tests FIRST:
# 1. Responsive layout tests (4 tests)
# 2. Accessibility tests (3 tests)
# 3. E2E responsive tests (7 tests)
```

**Step 2: Green Phase**

```bash
# Minimal code to pass tests:
# 1. Add Tailwind responsive classes → tests pass
# 2. Add ARIA labels and roles → a11y tests pass
# 3. Add error boundaries → E2E tests pass
```

**Step 3: Refactor Phase**

```bash
# Polish:
# - Optimize images with Next.js Image
# - Add smooth transitions
# - Improve focus management
# - Verify all tests still pass
```

#### Test Breakdown (17 tests total)

**Unit Tests (7 happy path + 3 error scenarios = 10 tests)**

_ProductCard Responsive_ (`src/components/product-card.tsx`):

- ✅ Happy: Image uses Next.js Image component
- ✅ Happy: Has hover state styles
- ✅ Happy: Price is formatted with currency symbol
- ✅ Happy: Truncates long product names with ellipsis
- ❌ Error: Shows fallback image if imageUrl is invalid
- ❌ Error: Handles very long descriptions (>200 chars)
- ❌ Error: Handles special characters in product names

_ProductGrid Responsive_ (`src/components/product-grid.tsx`):

- ✅ Happy: Applies 1-column layout on mobile breakpoint
- ✅ Happy: Applies 2-column layout on tablet breakpoint
- ✅ Happy: Applies 4-column layout on desktop breakpoint

**Accessibility Tests (2 happy path + 1 error scenario = 3 tests)**

_Axe-core Scans_ (`tests/e2e/accessibility.spec.ts`):

- ✅ Happy: Homepage passes axe-core accessibility scan
- ✅ Happy: All images have alt text
- ❌ Error: Error message has proper ARIA role and is announced by screen readers

**E2E Tests (4 happy path + 3 error scenarios = 7 tests)**

_Responsive Behavior_ (`tests/e2e/responsive.spec.ts`):

- ✅ Happy: Product grid displays 1 column on mobile (375px)
- ✅ Happy: Product grid displays 2 columns on tablet (768px)
- ✅ Happy: Product grid displays 4 columns on desktop (1280px)
- ✅ Happy: Pagination controls are touch-friendly on mobile
- ❌ Error: Images lazy load and show placeholder while loading
- ❌ Error: Error boundary catches component errors and shows fallback UI
- ❌ Error: Network errors show retry button

#### Files to Create/Modify

**Create**:

- `src/components/__tests__/product-card-responsive.test.tsx`
- `src/components/__tests__/product-grid-responsive.test.tsx`
- `tests/e2e/accessibility.spec.ts` - Accessibility tests
- `tests/e2e/responsive.spec.ts` - Responsive E2E tests
- `src/components/error-boundary.tsx` - Error boundary component

**Modify**:

- `src/components/product-card.tsx` - Add responsive styles, Next.js Image, error handling
- `src/components/product-grid.tsx` - Add responsive grid classes, error boundary
- `src/app/page.tsx` - Wrap in error boundary
- `tailwind.config.ts` - Add custom breakpoints if needed

#### Commit Strategy (3-4 small commits)

1. `test(products): add responsive layout tests`
2. `feat(products): implement responsive grid layout`
3. `test(products): add accessibility tests`
4. `feat(products): improve accessibility and ARIA labels`
5. `test(products): add error boundary tests`
6. `feat(products): add error boundaries and image optimization`
7. `refactor(products): polish animations and hover states`

---

## Overall Test Summary

**Total Tests**: 60

- **Happy Path**: 33 tests (55%)
- **Error Scenarios**: 27 tests (45%)

**By Type**:

- **Unit Tests**: 27 (21 happy + 6 error from components, 6 happy + 12 error from slices)
- **Integration Tests**: 16 (7 happy + 9 error)
- **E2E Tests**: 17 (5 happy + 12 error)

**Coverage Target**: ≥80% (Module 02 DoD requirement)

## Definition of Done Checklist

- [ ] All 60 tests passing (unit + integration + E2E)
- [ ] Code coverage ≥80%
- [ ] All 7 CI quality gates pass (lint, typecheck, test, e2e, build, security, quality-gate)
- [ ] Accessibility: axe-core clean (WCAG 2.1 AA)
- [ ] Self-review checklist completed for each PR
- [ ] Responsive on mobile (375px), tablet (768px), desktop (1280px)
- [ ] Error boundaries in place for graceful failures
- [ ] Documentation updated (JSDoc comments, README if needed)
- [ ] Feature flag removed (if used)
- [ ] Manual testing completed on Vercel preview deployment

## Success Metrics

**DORA Metrics** (Module 09):

- **Deployment Frequency**: 3 deployments (1 per slice)
- **Lead Time**: < 1 day per slice
- **Change Failure Rate**: 0% (all tests pass before merge)

**Quality Metrics**:

- **Test Coverage**: Target ≥80%, expect ~85-90% for US-001
- **Flaky Test Rate**: 0% (deterministic tests only)
- **Bug Escape Rate**: 0 bugs to production (comprehensive error handling)

## Risk Mitigation

**Risk 1: Database Performance**

- **Mitigation**: Add database indexes on `category` and `createdAt` fields
- **Test**: Performance test for 1000+ products (future story)

**Risk 2: Image Loading Performance**

- **Mitigation**: Use Next.js Image component with automatic optimization
- **Test**: Lighthouse performance score ≥90

**Risk 3: Flaky E2E Tests**

- **Mitigation**: Use Playwright auto-waiting, avoid hardcoded sleeps
- **Test**: Run E2E suite 10 times to verify stability

## References

- **User Story**: [docs/01-requirements/product-backlog.md](../product-backlog.md#us-001-browse-product-catalog)
- **Vertical Slicing**: [docs/01-requirements/vertical-slices.md](../vertical-slices.md)
- **Definition of Done**: [docs/02-agile-planning/definition-of-done.md](../../02-agile-planning/definition-of-done.md)
- **Code Review Checklist**: [docs/03-version-control/templates/code-review-checklist.md](../../03-version-control/templates/code-review-checklist.md)
- **Module 05 Testing Strategy**: [docs/quality-standards/05-test-levels/](../../quality-standards/05-test-levels/)

---

**Status**: Ready for Implementation 🚀
**Next Step**: Create branch `feature/us-001-slice-1.1-basic-listing` and begin Slice 1.1 with seed data tests
