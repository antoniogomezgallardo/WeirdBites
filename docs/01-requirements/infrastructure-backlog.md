# Infrastructure Backlog - Missing Items

**Purpose**: Track infrastructure user stories that were identified as missing during development

**Created**: 2025-10-30

---

## Overview

During development of US-001 and US-002, we identified missing infrastructure components that are needed for a complete e-commerce experience. These items should be prioritized based on user value and dependencies.

---

## IS-011: Navigation Bar Component

**As a** visitor
**I want** a consistent navigation bar across all pages
**So that** I can easily navigate between different sections of the site

**Priority**: Must Have
**Story Points**: 2
**Estimated Duration**: 1 day
**Dependencies**: None
**Blocks**: IS-012, IS-013, US-003

**Acceptance Criteria**:

**Scenario 1**: Navigation bar is visible on all pages

```gherkin
Given I am on any page of the website
When the page loads
Then I see a navigation bar at the top
And it contains: logo, "Products" link, "Cart" icon (with count), "Account" link
And the navigation is sticky (stays visible when scrolling)
```

**Scenario 2**: Navigation links work correctly

```gherkin
Given I am on the product detail page
When I click "Products" in the navigation
Then I navigate to /products page
And the active link is highlighted
```

**Scenario 3**: Mobile responsive navigation

```gherkin
Given I am on mobile viewport (< 768px)
When the page loads
Then I see a hamburger menu icon
And clicking it opens a mobile navigation drawer
```

**Technical Implementation**:

- Create `src/components/navigation/navbar.tsx`
- Add to root layout `src/app/layout.tsx`
- Use Next.js Link for client-side navigation
- Implement active link highlighting using `usePathname()`
- Cart count badge (placeholder for US-004)
- Tailwind CSS for responsive design

**Definition of Done**:

- [ ] Navigation component created and added to layout
- [ ] All links navigate correctly
- [ ] Mobile hamburger menu works
- [ ] Active link is highlighted
- [ ] Accessibility: keyboard navigation, ARIA labels
- [ ] Unit tests for Navigation component (5+ tests)
- [ ] E2E test for navigation between pages
- [ ] Responsive at all breakpoints (mobile, tablet, desktop)

**Related Technical Debt**: None

---

## IS-012: Products Listing Page Route

**As a** visitor
**I want** a dedicated page to browse all products
**So that** I can explore the full catalog and use filters

**Priority**: Must Have
**Story Points**: 1
**Estimated Duration**: 0.5 days
**Dependencies**: IS-011 (Navigation Bar)
**Blocks**: US-003 (Filter by Category), TD-001 (E2E test fix)

**Acceptance Criteria**:

**Scenario 1**: Products page displays full catalog

```gherkin
Given I navigate to /products
When the page loads
Then I see the product grid with pagination
And I see a page heading "Browse Products" or "All Products"
And the URL is /products
```

**Scenario 2**: Accessible from navigation

```gherkin
Given I am on the homepage
When I click "Products" in the navigation bar
Then I navigate to /products
And I see the same product grid as homepage
```

**Technical Implementation**:

- Create `src/app/products/page.tsx`
- Reuse existing ProductGrid component
- Add page heading and breadcrumbs
- Support URL query params (page, category, search)
- Server-side rendering (SSR)

**Definition of Done**:

- [ ] `/products` route created
- [ ] Product grid displays correctly
- [ ] Pagination works with URL params
- [ ] Navigation link works from all pages
- [ ] Unit tests for page component (3+ tests)
- [ ] E2E test for navigation: / → /products
- [ ] Meta tags for SEO (title, description)

**Related Technical Debt**: TD-001 (Fix E2E tests for product detail navigation)

---

## IS-013: Marketing Landing Page

**As a** visitor
**I want** an engaging landing page when I first visit the site
**So that** I understand what WeirdBites offers and am enticed to browse products

**Priority**: Should Have
**Story Points**: 3
**Estimated Duration**: 1.5 days
**Dependencies**: IS-011 (Navigation Bar), IS-012 (Products Page)
**Blocks**: None

**Acceptance Criteria**:

**Scenario 1**: Landing page has hero section

```gherkin
Given I visit the root URL /
When the page loads
Then I see a hero section with:
  - Eye-catching headline (e.g., "Discover Weird Snacks from Around the World")
  - Subheading explaining the concept
  - CTA button "Browse Products" linking to /products
  - Hero image or illustration
```

**Scenario 2**: Featured products section

```gherkin
Given I am on the landing page
When I scroll down from the hero
Then I see a "Featured Products" section
And it shows 3-6 hand-picked weird snacks
And each product is clickable and links to detail page
```

**Scenario 3**: Brand storytelling

```gherkin
Given I am on the landing page
When I scroll to the about section
Then I see:
  - "Why WeirdBites?" section explaining the mission
  - Trust indicators (e.g., "Safe checkout", "Fast shipping")
  - Optional: customer testimonials or fun facts
```

**Design Inspiration**:

- Bob Snail: https://www.bob-snail.com/gb/
- Germinal Bio: https://www.germinalbio.it/it
- Brars Retail: https://www.awwwards.com/sites/brars-retail

**Technical Implementation**:

- Rename current `/` (product grid) to `/products` route
- Create new `src/app/page.tsx` for landing page
- Create components:
  - `src/components/landing/hero.tsx`
  - `src/components/landing/featured-products.tsx`
  - `src/components/landing/why-weirdbites.tsx`
- Use Next.js Image for optimized hero image
- Implement smooth scroll to sections

**Definition of Done**:

- [ ] Landing page created with hero, featured products, about sections
- [ ] CTA buttons link correctly to /products
- [ ] Featured products are dynamic (from database, flagged as featured)
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Accessibility: semantic HTML, alt text, keyboard navigation
- [ ] Unit tests for landing components (8+ tests)
- [ ] E2E test for: / → Browse Products CTA → /products
- [ ] Performance: Lighthouse score > 90
- [ ] Meta tags for SEO and social sharing (Open Graph)

**Related Technical Debt**: None

**Notes**:

- Could be split into 2 vertical slices:
  - Slice 13.1: Hero + CTA (1 pt)
  - Slice 13.2: Featured Products + About sections (2 pts)

---

## IS-014: Update E2E Tests for Complete User Journeys

**As a** QA engineer
**I want** E2E tests to test complete user journeys
**So that** we validate real user flows, not just isolated page loads

**Priority**: Should Have
**Story Points**: 1
**Estimated Duration**: 0.5 days
**Dependencies**: IS-012 (Products Page)
**Blocks**: None

**Acceptance Criteria**:

**Scenario 1**: Product detail navigation test updated

```gherkin
Given the /products page exists
When I run the product-detail E2E test
Then it should:
  1. Start at /products
  2. Wait for product cards to load
  3. Click on first product card
  4. Verify navigation to /products/[id]
  5. Verify product detail page renders correctly
```

**Scenario 2**: Keep direct navigation tests as smoke tests

```gherkin
Given E2E test suite runs
When the product-detail.spec.ts runs
Then it includes both:
  - "User Journey" tests (full flow from /products)
  - "Direct Navigation" tests (smoke tests for /products/[id])
```

**Technical Implementation**:

- Update `tests/e2e/product-detail.spec.ts`
- Reorganize into two describe blocks:
  - "User Journey" (new tests)
  - "Direct Navigation" (existing tests, labeled as smoke tests)
- Add comments explaining purpose of each test type

**Definition of Done**:

- [ ] E2E tests updated to test full user journey
- [ ] Tests pass in CI pipeline
- [ ] Existing direct navigation tests kept as smoke tests
- [ ] Test documentation updated
- [ ] Technical debt TD-001 marked as resolved

**Related Technical Debt**: TD-001 (E2E Tests Not Testing Complete User Journeys)

---

## Prioritization & Roadmap

### Recommended Order

**Phase 1: Core Navigation** (Must Have - 3 story points, ~1.5 days)

1. IS-011: Navigation Bar Component (2 pts)
2. IS-012: Products Listing Page Route (1 pt)

**Phase 2: Polish & Quality** (Should Have - 4 story points, ~2 days) 3. IS-013: Marketing Landing Page (3 pts) 4. IS-014: Update E2E Tests (1 pt)

### Integration with Current Work

**Option A: Build Now** (Before continuing US-002/US-003)

- **Pros**: Fixes architecture gaps, improves UX immediately
- **Cons**: Delays feature delivery
- **Recommendation**: If stakeholders prioritize UX over features

**Option B: Build After Deployment Increment 1** (After US-001, US-002, US-003)

- **Pros**: Delivers user value faster, maintains momentum
- **Cons**: Technical debt accumulates
- **Recommendation**: If speed to market is priority

**Option C: Parallel Track** (Build IS-011/IS-012 while continuing features)

- **Pros**: Best of both worlds
- **Cons**: Requires careful branch coordination
- **Recommendation**: If team has capacity

---

## Related Documents

- [Product Backlog](product-backlog.md) - Main user stories
- [Technical Debt](../TECHNICAL-DEBT.md) - Known shortcuts and gaps
- [US-001 Implementation Plan](user-stories/US-001-implementation-plan.md)
- [US-002 Implementation Plan](user-stories/US-002-implementation-plan.md)

---

**Last Updated**: 2025-10-30
**Status**: Awaiting prioritization
