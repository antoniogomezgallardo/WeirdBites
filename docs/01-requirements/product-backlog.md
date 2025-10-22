# WeirdBites - Product Backlog

**Version**: 1.0.0
**Date**: 2025-10-19
**Status**: Ready for Development
**Prioritization Method**: MoSCoW + Vertical Slicing

---

## Overview

This product backlog contains all user stories for the WeirdBites MVP, organized by epic and prioritized using MoSCoW (Must Have, Should Have, Could Have, Won't Have). Each story follows the INVEST criteria and includes acceptance criteria in Given-When-Then format.

**Total Stories**: 35 (MVP Must-Have)
**Estimated Story Points**: ~150 points
**Target MVP Timeline**: 10-12 weeks

---

## Backlog Organization

### By Priority (MoSCoW)

- **Must Have**: 35 stories (MVP required)
- **Should Have**: 12 stories (Post-MVP v1.1)
- **Could Have**: 8 stories (Future enhancements)
- **Won't Have**: Listed in mvp-definition.md

### By Epic

1. Product Discovery (5 stories) - Split into deployment increments
2. Shopping Cart (4 stories) - Split into deployment increments
3. Guest Checkout (5 stories) - Split into deployment increments
4. User Accounts (6 stories) - Split into deployment increments
5. Registered User Features (3 stories) - Split into deployment increments
6. Product Search & Reviews (4 stories) - Split into deployment increments
7. Admin Authentication (2 stories) - Split into deployment increments
8. Admin Product Management (4 stories) - Split into deployment increments
9. Admin Inventory (2 stories) - Split into deployment increments

**Note**: Each user story may be split into multiple vertical slices for incremental delivery.

---

## Epic 1: Product Discovery (Must Have)

### US-001: Browse Product Catalog

**As a** visitor
**I want** to see a grid of weird snack products
**So that** I can discover unusual items to purchase

**Priority**: Must Have
**Story Points**: 5
**Splits Into**: Deployment Increment 1 (vertical slices for basic browsing)

**Acceptance Criteria**:

**Scenario 1**: Homepage displays products

```gherkin
Given I visit the WeirdBites homepage
When the page loads
Then I see a grid of 8-12 products
And each product shows: image, name, price, brief description
And products are displayed responsively (1 column mobile, 2-3 tablet, 4 desktop)
```

**Scenario 2**: Pagination works

```gherkin
Given there are more than 12 products in the catalog
When I scroll to the bottom of the page
Then I see a "Load More" button or pagination controls
And clicking it loads the next set of products
```

**Scenario 3**: Loading states

```gherkin
Given I visit the homepage
When products are being fetched
Then I see skeleton loaders or loading indicators
And they match the expected grid layout
```

**Technical Notes**:

- Use Next.js Image component for optimization
- Implement server-side rendering (SSR) or static generation (SSG)
- Paginate at database level (LIMIT/OFFSET)
- Add indexes on products table

**Definition of Done**:

- [ ] Homepage renders product grid
- [ ] Pagination/infinite scroll functional
- [ ] Loading states implemented
- [ ] Responsive on mobile, tablet, desktop
- [ ] Unit tests for product card component
- [ ] E2E test for browsing flow
- [ ] Lighthouse Performance > 90

---

### US-002: View Product Details

**As a** visitor
**I want** to view detailed information about a product
**So that** I can decide if I want to purchase it

**Priority**: Must Have
**Story Points**: 5
**Splits Into**: Deployment Increment 1 (vertical slices for product detail view)

**Acceptance Criteria**:

**Scenario 1**: Product detail page displays all information

```gherkin
Given I click on a product card
When the product detail page loads
Then I see: product name, full description, price, stock status
And I see 1-5 product images in a gallery
And I see ingredients list
And I see nutrition facts (if available)
And I see customer reviews and average rating
```

**Scenario 2**: In-stock product shows Add to Cart

```gherkin
Given the product has stock > 0
When I view the product page
Then the "Add to Cart" button is enabled
And I see the stock quantity (e.g., "15 in stock")
```

**Scenario 3**: Out-of-stock product disables Add to Cart

```gherkin
Given the product has stock = 0
When I view the product page
Then the "Add to Cart" button is disabled
And I see "Out of Stock" badge
And I see a message "This item is currently unavailable"
```

**Technical Notes**:

- Dynamic route: `/products/[id]` or `/products/[slug]`
- Image gallery with zoom (optional for MVP)
- Fetch product by ID with reviews

**Definition of Done**:

- [ ] Product detail page renders correctly
- [ ] All product information displayed
- [ ] Stock status affects UI correctly
- [ ] Image gallery functional
- [ ] Unit tests for product detail component
- [ ] E2E test for viewing product
- [ ] Accessibility (WCAG 2.1 AA)

---

### US-003: Filter Products by Category

**As a** visitor
**I want** to filter products by category
**So that** I can find specific types of weird snacks

**Priority**: Must Have
**Story Points**: 3
**Splits Into**: Deployment Increment 1 (vertical slices for category filtering)

**Acceptance Criteria**:

**Scenario 1**: Category filter displays options

```gherkin
Given I am on the products page
When the page loads
Then I see category filter options (e.g., Spicy, Sweet, Savory, International, Sour)
And each category shows product count
```

**Scenario 2**: Selecting category filters products

```gherkin
Given I am viewing all products
When I click "Spicy" category
Then only products in the "Spicy" category are displayed
And the category filter shows "Spicy" as selected
And the product count updates
```

**Scenario 3**: Clear filters

```gherkin
Given I have filtered by "Spicy"
When I click "Clear Filters" or "All Products"
Then all products are displayed again
And no category is selected
```

**Technical Notes**:

- Query parameter: `?category=spicy`
- Filter at database level (WHERE clause)
- Update URL when filtering (shareable links)

**Definition of Done**:

- [ ] Category filter UI implemented
- [ ] Filtering works correctly
- [ ] URL updates with query params
- [ ] Clear filters option works
- [ ] Unit tests for filter logic
- [ ] E2E test for filtering flow

---

_(Continue with remaining 32 stories...)_

---

## Epic 2: Shopping Cart (Must Have)

### US-004: Add Product to Cart (Guest)

**As a** guest user
**I want** to add products to a shopping cart
**So that** I can purchase multiple items together

**Priority**: Must Have
**Story Points**: 5
**Splits Into**: Deployment Increment 2 (vertical slices for add-to-cart functionality)

**Acceptance Criteria**:

**Scenario 1**: Add item to cart successfully

```gherkin
Given I am viewing a product detail page
And the product is in stock
When I click "Add to Cart"
Then the item is added to my cart
And I see a success toast notification "Added to cart!"
And the cart badge count increases by 1
```

**Scenario 2**: Add same item increases quantity

```gherkin
Given I have "Ghost Pepper Chocolate" in my cart (quantity: 1)
When I add "Ghost Pepper Chocolate" again
Then the cart quantity increases to 2
And the product is NOT duplicated in the cart
```

**Scenario 3**: Cart persists for guest users

```gherkin
Given I have items in my cart as a guest
When I close the browser and return within 24 hours
Then my cart items are still present
And quantities are preserved
```

**Technical Notes**:

- Guest cart: localStorage or session-based
- Cart data structure: `{ productId, quantity, addedAt }`
- Validation: Check stock before adding

**Definition of Done**:

- [ ] Add to cart functionality works
- [ ] Cart persistence implemented (24hrs for guest)
- [ ] Toast notifications shown
- [ ] Cart badge updates
- [ ] Unit tests for cart logic
- [ ] Integration test for cart API
- [ ] E2E test for add to cart flow

---

### US-005: View Cart

**As a** guest or registered user
**I want** to view all items in my cart
**So that** I can review my selections before checkout

**Priority**: Must Have
**Story Points**: 3
**Splits Into**: Deployment Increment 2 (vertical slices for cart display)

**Acceptance Criteria**:

**Scenario 1**: Cart displays all items

```gherkin
Given I have 3 items in my cart
When I navigate to the cart page (/cart)
Then I see all 3 items listed
And each item shows: image, name, price, quantity, subtotal
And I see the cart total at the bottom
```

**Scenario 2**: Empty cart message

```gherkin
Given my cart is empty
When I navigate to the cart page
Then I see "Your cart is empty"
And I see a "Continue Shopping" button
```

**Scenario 3**: Cart shows updated prices

```gherkin
Given I added a product to cart 2 days ago
And the product price changed since then
When I view my cart
Then I see the current price (not the old price)
```

**Definition of Done**:

- [ ] Cart page displays all items correctly
- [ ] Empty cart message shown
- [ ] Cart total calculated correctly
- [ ] Prices reflect current values
- [ ] Unit tests for cart display
- [ ] E2E test for view cart

---

## Summary of All 35 MVP Stories

Due to length constraints, here's the complete list of MVP user stories with story points:

**Epic 1: Product Discovery**

- US-001: Browse Product Catalog (5 pts) ✓
- US-002: View Product Details (5 pts) ✓
- US-003: Filter by Category (3 pts) ✓
- US-004: Product Image Gallery (2 pts)
- US-005: Sort Products (2 pts)

**Epic 2: Shopping Cart**

- US-006: Add to Cart (5 pts) ✓
- US-007: View Cart (3 pts) ✓
- US-008: Update Cart Quantity (3 pts)
- US-009: Remove from Cart (2 pts)

**Epic 3: Guest Checkout**

- US-010: Enter Shipping Information (5 pts)
- US-011: Payment Simulation (5 pts)
- US-012: Order Confirmation (3 pts)
- US-013: Form Validation (3 pts)
- US-014: Checkout Error Handling (3 pts)

**Epic 4: User Accounts**

- US-015: User Registration (5 pts)
- US-016: User Login (3 pts)
- US-017: User Logout (1 pt)
- US-018: Password Validation (2 pts)
- US-019: Session Management (3 pts)
- US-020: Remember Me (2 pts)

**Epic 5: Registered User Features**

- US-021: Saved Checkout Info (3 pts)
- US-022: Order History (5 pts)
- US-023: Order Details View (3 pts)

**Epic 6: Product Search & Reviews**

- US-024: Product Search (5 pts)
- US-025: Search Results (3 pts)
- US-026: Leave Review (3 pts)
- US-027: View Reviews (2 pts)

**Epic 7: Admin Authentication**

- US-028: Admin Login (3 pts)
- US-029: Admin Session (2 pts)

**Epic 8: Admin Product Management**

- US-030: View Products List (Admin) (3 pts)
- US-031: Add New Product (5 pts)
- US-032: Edit Product (3 pts)
- US-033: Delete Product (2 pts)

**Epic 9: Admin Inventory**

- US-034: Track Stock Levels (5 pts)
- US-035: Low Stock Alerts (3 pts)

**Epic 10: Admin Orders**

- US-036: View Orders List (3 pts)
- US-037: View Order Details (3 pts)
- US-038: Update Order Status (3 pts)

**Epic 11: Admin Dashboard**

- US-039: Basic Analytics (5 pts)

**Total MVP Story Points**: ~135 points

---

## Backlog Prioritization

### Deployment Increment Mapping

Stories are split into vertical slices and grouped into deployment increments:

**Deployment Increment 1: Browse Products** (Week 1-2)

- Stories US-001, US-002, US-003 split into vertical slices = 13 points total

**Deployment Increment 2: Shopping Cart** (Week 3)

- Stories US-006, US-007, US-008, US-009 split into vertical slices = 13 points total

**Deployment Increment 3: Guest Checkout** (Week 4-5)

- Stories US-010, US-011, US-012, US-013, US-014 split into vertical slices = 19 points total

**Deployment Increment 4: User Accounts** (Week 6)

- Stories US-015, US-016, US-017, US-018, US-019, US-020 split into vertical slices = 16 points total

**Deployment Increment 5: Registered Features** (Week 7)

- Stories US-021, US-022, US-023 split into vertical slices = 11 points total

**Deployment Increment 6: Search & Reviews** (Week 8)

- Stories US-024, US-025, US-026, US-027 split into vertical slices = 13 points total

**Deployment Increment 7: Admin Panel** (Week 9-10)

- Stories US-028 through US-039 split into vertical slices = 50 points total

**Note**: Each story is split into one or more vertical slices that cross all architectural layers (UI → API → DB).

---

## Definition of Ready Checklist

Before a story enters development, it must meet:

- [ ] User story follows INVEST criteria
- [ ] Acceptance criteria defined (Given-When-Then)
- [ ] Story points estimated by team
- [ ] Dependencies identified and resolved
- [ ] UI mockups created (if needed)
- [ ] API contracts defined (if needed)
- [ ] Technical approach discussed
- [ ] No blockers
- [ ] Team understands the story

---

## Definition of Done Checklist

A story is complete when:

- [ ] Code implemented and follows style guide
- [ ] Unit tests written and passing (≥80% coverage for new code)
- [ ] Integration tests passing
- [ ] E2E tests for critical paths passing
- [ ] Code reviewed and approved
- [ ] No ESLint/TypeScript errors
- [ ] Accessibility tested (axe-core clean)
- [ ] Documentation updated (if needed)
- [ ] Deployed to staging
- [ ] Product Owner accepted
- [ ] No critical/high security vulnerabilities

---

## Post-MVP Backlog (Should Have)

### Epic 12: Enhanced Features

- US-040: Wishlist/Favorites (5 pts)
- US-041: Password Reset Flow (5 pts)
- US-042: User Profile Editing (3 pts)
- US-043: Email Notifications (5 pts)
- US-044: Advanced Search Filters (5 pts)
- US-045: Product Sorting (3 pts)
- US-046: Related Products (3 pts)
- US-047: Bulk Product Upload (5 pts)
- US-048: Category Management (3 pts)
- US-049: Customer List (Admin) (3 pts)
- US-050: Advanced Analytics (8 pts)
- US-051: Inventory Reports (3 pts)

**Total Should Have**: ~51 points

---

## Velocity Tracking

**Target Velocity**: 10-15 story points per week (single developer, learning-focused)

| Sprint   | Planned | Completed | Velocity | Notes                    |
| -------- | ------- | --------- | -------- | ------------------------ |
| Sprint 1 | 13      | TBD       | TBD      | Slice 1: Browse Products |
| Sprint 2 | 13      | TBD       | TBD      | Slice 2: Shopping Cart   |
| Sprint 3 | 19      | TBD       | TBD      | Slice 3: Guest Checkout  |
| ...      | ...     | ...       | ...      | ...                      |

_Velocity will be tracked as sprints complete_

---

## Backlog Refinement

**Cadence**: Weekly (or as needed)
**Participants**: Developer/QAE (Antonio)
**Activities**:

- Review upcoming stories
- Break down large stories (>8 points)
- Update acceptance criteria
- Re-estimate if needed
- Re-prioritize based on learnings

---

## Document Control

**Version History**:

| Version | Date       | Author                 | Changes                             |
| ------- | ---------- | ---------------------- | ----------------------------------- |
| 1.0.0   | 2025-10-19 | Antonio Gomez Gallardo | Initial backlog with 35 MVP stories |

**Next Review**: Weekly during development

---

**Note**: Full user story details for US-004 through US-039 are available in the project management tool or can be expanded in this document as needed. Each follows the same template with detailed Given-When-Then scenarios.

_This product backlog follows Module 01 (Requirements Engineering) and Module 02 (Agile Planning) best practices, using INVEST criteria, vertical slicing, and MoSCoW prioritization._
