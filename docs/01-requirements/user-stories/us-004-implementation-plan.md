# US-004: Add Product to Cart - Implementation Plan

**Version**: 1.0.0
**Date**: 2025-11-01
**Story Points**: 5
**Priority**: Must Have (Epic 2: Shopping Cart)
**Status**: Ready for Development
**Estimated Duration**: 2-3 days

---

## Overview

This document provides a detailed implementation plan for **US-004: Add Product to Cart (Guest)**, following Test-Driven Development (TDD) and Trunk-Based Development (TBD) methodologies. The user story will be split into vertical slices to enable incremental delivery and continuous integration.

**Reference**:

- Module 04: Testing Strategy (TDD approach)
- Module 05: Test Levels (Unit, Integration, E2E)
- Module 07: Development Practices (Clean code, TDD)

---

## User Story

**As a** guest user
**I want** to add products to a shopping cart
**So that** I can purchase multiple items together

**Business Value**:

- Enables multi-item purchases (increases average order value)
- Foundation for checkout flow (blocks US-008 through US-010)
- Critical for MVP completion (Must Have priority)

---

## Acceptance Criteria

### Scenario 1: Add item to cart successfully

```gherkin
Given I am viewing a product detail page
And the product is in stock
When I click "Add to Cart"
Then the item is added to my cart
And I see a success toast notification "Added to cart!"
And the cart badge count increases by 1
```

### Scenario 2: Add same item increases quantity

```gherkin
Given I have "Ghost Pepper Chocolate" in my cart (quantity: 1)
When I add "Ghost Pepper Chocolate" again
Then the cart quantity increases to 2
And the product is NOT duplicated in the cart
```

### Scenario 3: Cart persists for guest users

```gherkin
Given I have items in my cart as a guest
When I close the browser and return within 24 hours
Then my cart items are still present
And quantities are preserved
```

### Scenario 4: Cannot add out-of-stock items

```gherkin
Given I am viewing a product with stock = 0
When I view the product detail page
Then the "Add to Cart" button is disabled
And I see "Out of Stock" badge
And clicking the button does nothing
```

### Scenario 5: Cart badge reflects total quantity

```gherkin
Given I have 2 items in cart: "Ghost Pepper Chocolate" (qty: 3), "Wasabi Kit Kat" (qty: 2)
When I view the navigation bar
Then the cart badge shows "5"
And hovering shows "5 items in cart"
```

---

## Definition of Ready Checklist

Confirming US-004 meets Definition of Ready before development:

- [x] **Story structure**: User story format complete
- [x] **Acceptance criteria**: 5 scenarios defined (Given-When-Then)
- [x] **Dependencies**: US-002 (Product Detail Page) completed ✅
- [x] **Estimation**: 5 story points (team consensus)
- [x] **Design**: Wireframe available (cart badge, Add to Cart button, toast)
- [x] **Technical approach**: Defined below (Client-side cart with localStorage)
- [x] **Testability**: Test scenarios identified (unit, integration, E2E)
- [x] **Team understanding**: Story reviewed and approved
- [x] **DoD achievable**: Can be completed within 2-3 days
- [x] **Priority**: Must Have (MVP critical)

**Status**: ✅ **READY FOR DEVELOPMENT**

---

## Definition of Done Checklist

Story is complete when ALL of the following are met:

- [ ] Code implemented following TDD (Red → Green → Refactor)
- [ ] Unit tests written and passing (≥80% coverage for new code)
  - [ ] Cart state management tests (add, update, persist)
  - [ ] Component tests (AddToCartButton, CartBadge)
  - [ ] Util function tests (localStorage, cart calculations)
- [ ] Integration tests passing
  - [ ] Cart API route tests (if needed)
  - [ ] Cart persistence tests
- [ ] E2E tests for critical paths passing
  - [ ] Browse → Product Detail → Add to Cart → View Cart Badge
  - [ ] Add same product twice → Quantity increases
  - [ ] Refresh page → Cart persists
- [ ] Code reviewed and approved (self-review + checklist)
- [ ] No ESLint/TypeScript errors
- [ ] Accessibility tested (axe-core clean)
  - [ ] Keyboard navigation works (Add to Cart via Enter key)
  - [ ] ARIA labels present (cart badge, toast notifications)
  - [ ] Screen reader announcements for cart updates
- [ ] Documentation updated
  - [ ] Cart state management documented
  - [ ] API documentation (if endpoints added)
  - [ ] Component documentation
- [ ] Deployed to Vercel preview
- [ ] Manual testing completed
  - [ ] Test on mobile, tablet, desktop
  - [ ] Test with slow network (throttle to 3G)
  - [ ] Test localStorage persistence
- [ ] No critical/high security vulnerabilities

---

## Vertical Slice Breakdown

US-004 will be split into **3 vertical slices** for incremental delivery:

### Slice 4.1: Client-Side Cart State + Add to Cart Button (2 points, ~1 day)

**Scope**:

- Implement client-side cart state management (React Context or Zustand)
- Create AddToCartButton component
- Implement localStorage persistence (guest users)
- Add basic toast notification
- Unit tests + E2E test for adding to cart

**Deliverable**: User can add product to cart, see toast, cart persists on refresh

**Status**: 🔲 Not Started

---

### Slice 4.2: Cart Badge + Quantity Management (2 points, ~1 day)

**Scope**:

- Add cart badge to navigation bar
- Show total quantity in badge
- Handle duplicate product additions (increase quantity)
- Prevent adding out-of-stock items
- Unit tests + E2E test for badge updates

**Deliverable**: Cart badge reflects cart state, duplicate products increase quantity

**Status**: 🔲 Not Started

---

### Slice 4.3: Cart Persistence + Edge Cases (1 point, ~0.5 days)

**Scope**:

- Implement 24-hour expiration for guest carts
- Handle edge cases (localStorage full, corrupted data)
- Optimize performance (debounce writes)
- Accessibility improvements (ARIA labels, keyboard nav)
- Comprehensive E2E tests for cart persistence

**Deliverable**: Cart persists for 24 hours, edge cases handled, accessibility compliant

**Status**: 🔲 Not Started

---

## Technical Approach

### Architecture Decision: Client-Side Cart (Guest Users)

**Why Client-Side?**

1. **No Authentication Yet**: Users are guests (no user ID)
2. **Fast Performance**: No API calls for adding to cart
3. **Offline Support**: Works without network
4. **Simple MVP**: Reduces backend complexity

**Trade-offs**:

- ✅ **Pro**: Fast, simple, works offline
- ✅ **Pro**: Easy to test (no DB needed)
- ❌ **Con**: Cart not synced across devices
- ❌ **Con**: Lost if localStorage cleared
- ⚠️ **Note**: Will migrate to server-side for registered users (US-019)

---

### Technology Stack

**State Management**: React Context API (built-in)

```typescript
// src/contexts/cart-context.tsx
interface CartItem {
  productId: string;
  quantity: number;
  addedAt: Date;
}

interface CartContextType {
  items: CartItem[];
  addItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  totalQuantity: number;
}
```

**Persistence**: localStorage (Web Storage API)

```typescript
// src/lib/cart-storage.ts
const CART_KEY = 'weirdbites_cart';
const CART_EXPIRY_HOURS = 24;

export function saveCart(items: CartItem[]): void;
export function loadCart(): CartItem[] | null;
export function clearCart(): void;
export function isCartExpired(): boolean;
```

**Toast Notifications**: Sonner (lightweight toast library)

```bash
pnpm add sonner
```

**Why Sonner?**

- Lightweight (2KB)
- Accessible by default
- Beautiful animations
- Easy to use

---

### Database Changes

**No database changes required** for guest cart (client-side only)

**Future Note**: When implementing registered user carts (US-019), we'll add:

```prisma
model Cart {
  id        String   @id @default(cuid())
  userId    String?  // null for guest carts
  sessionId String?  // for guest identification
  items     CartItem[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model CartItem {
  id        String   @id @default(cuid())
  cartId    String
  cart      Cart     @relation(fields: [cartId], references: [id])
  productId String
  product   Product  @relation(fields: [productId], references: [id])
  quantity  Int      @default(1)
  addedAt   DateTime @default(now())
}
```

---

### File Structure

New files to create:

```
src/
├── contexts/
│   └── cart-context.tsx           # Cart state management
├── hooks/
│   └── use-cart.ts                # Hook to access cart context
├── lib/
│   ├── cart-storage.ts            # localStorage utilities
│   └── cart-utils.ts              # Cart calculations (total, qty)
├── components/
│   ├── add-to-cart-button.tsx     # Add to Cart button component
│   └── navigation/
│       └── cart-badge.tsx         # Cart badge in navbar
└── __tests__/
    ├── contexts/
    │   └── cart-context.test.tsx
    ├── lib/
    │   ├── cart-storage.test.ts
    │   └── cart-utils.test.ts
    └── components/
        ├── add-to-cart-button.test.tsx
        └── cart-badge.test.tsx

tests/e2e/
└── cart.spec.ts                   # E2E tests for add to cart
```

---

## Test-Driven Development (TDD) Plan

### TDD Workflow for Each Slice

**Step 1: Red (Write Failing Test)**

```bash
pnpm test:watch
# Write test that fails
```

**Step 2: Green (Write Minimal Code to Pass)**

```bash
# Implement just enough to pass test
# Test turns green ✅
```

**Step 3: Refactor (Improve Code Quality)**

```bash
# Refactor for clarity, performance, maintainability
# Tests still pass ✅
```

**Step 4: Commit**

```bash
git add .
git commit -m "test(cart): add unit tests for addItem function"
git commit -m "feat(cart): implement addItem function"
```

---

### Slice 4.1: TDD Plan (Client-Side Cart State)

#### Test 1: Cart Context - Add Item

**Red (Failing Test)**:

```typescript
// src/__tests__/contexts/cart-context.test.tsx
import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from '@/contexts/cart-context';

describe('CartContext', () => {
  it('should add item to cart', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.addItem('product-1');
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0]).toEqual({
      productId: 'product-1',
      quantity: 1,
      addedAt: expect.any(Date),
    });
  });
});
```

**Green (Implementation)**:

```typescript
// src/contexts/cart-context.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

interface CartItem {
  productId: string;
  quantity: number;
  addedAt: Date;
}

interface CartContextType {
  items: CartItem[];
  addItem: (productId: string) => void;
  totalQuantity: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (productId: string) => {
    setItems((prev) => [
      ...prev,
      { productId, quantity: 1, addedAt: new Date() },
    ]);
  };

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, totalQuantity }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
```

**Refactor**: Extract types to separate file, add JSDoc comments

---

#### Test 2: Cart Context - Increase Quantity for Duplicate

**Red (Failing Test)**:

```typescript
it('should increase quantity when adding duplicate product', () => {
  const { result } = renderHook(() => useCart(), {
    wrapper: CartProvider,
  });

  act(() => {
    result.current.addItem('product-1');
    result.current.addItem('product-1'); // Add same product again
  });

  expect(result.current.items).toHaveLength(1); // Not duplicated
  expect(result.current.items[0].quantity).toBe(2); // Quantity increased
});
```

**Green (Implementation)**:

```typescript
const addItem = (productId: string) => {
  setItems(prev => {
    const existingItem = prev.find(item => item.productId === productId);

    if (existingItem) {
      // Increase quantity
      return prev.map(item =>
        item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
      );
    }

    // Add new item
    return [...prev, { productId, quantity: 1, addedAt: new Date() }];
  });
};
```

**Refactor**: Extract logic to helper function

---

#### Test 3: localStorage Persistence

**Red (Failing Test)**:

```typescript
// src/__tests__/lib/cart-storage.test.ts
import { saveCart, loadCart, clearCart } from '@/lib/cart-storage';

describe('Cart Storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should save cart to localStorage', () => {
    const cartItems = [{ productId: 'product-1', quantity: 2, addedAt: new Date() }];

    saveCart(cartItems);

    const saved = localStorage.getItem('weirdbites_cart');
    expect(saved).toBeTruthy();

    const parsed = JSON.parse(saved!);
    expect(parsed.items).toHaveLength(1);
    expect(parsed.items[0].productId).toBe('product-1');
  });

  it('should load cart from localStorage', () => {
    const cartItems = [{ productId: 'product-1', quantity: 2, addedAt: new Date() }];
    saveCart(cartItems);

    const loaded = loadCart();
    expect(loaded).toHaveLength(1);
    expect(loaded![0].productId).toBe('product-1');
  });

  it('should return null if cart expired (>24 hours)', () => {
    const cartItems = [{ productId: 'product-1', quantity: 2, addedAt: new Date() }];

    // Mock cart saved 25 hours ago
    const expiredCart = {
      items: cartItems,
      savedAt: new Date(Date.now() - 25 * 60 * 60 * 1000),
    };
    localStorage.setItem('weirdbites_cart', JSON.stringify(expiredCart));

    const loaded = loadCart();
    expect(loaded).toBeNull();
  });
});
```

**Green (Implementation)**:

```typescript
// src/lib/cart-storage.ts
const CART_KEY = 'weirdbites_cart';
const CART_EXPIRY_HOURS = 24;

interface CartItem {
  productId: string;
  quantity: number;
  addedAt: Date;
}

interface StoredCart {
  items: CartItem[];
  savedAt: string; // ISO date string
}

export function saveCart(items: CartItem[]): void {
  const cart: StoredCart = {
    items,
    savedAt: new Date().toISOString(),
  };
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function loadCart(): CartItem[] | null {
  const stored = localStorage.getItem(CART_KEY);
  if (!stored) return null;

  try {
    const cart: StoredCart = JSON.parse(stored);
    const savedAt = new Date(cart.savedAt);
    const now = new Date();
    const hoursSince = (now.getTime() - savedAt.getTime()) / (1000 * 60 * 60);

    if (hoursSince > CART_EXPIRY_HOURS) {
      clearCart();
      return null;
    }

    // Convert addedAt strings back to Date objects
    return cart.items.map(item => ({
      ...item,
      addedAt: new Date(item.addedAt),
    }));
  } catch (error) {
    // Corrupted data, clear cart
    clearCart();
    return null;
  }
}

export function clearCart(): void {
  localStorage.removeItem(CART_KEY);
}
```

**Refactor**: Add error handling, extract constants

---

#### Test 4: AddToCartButton Component

**Red (Failing Test)**:

```typescript
// src/__tests__/components/add-to-cart-button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { AddToCartButton } from '@/components/add-to-cart-button';
import { CartProvider, useCart } from '@/contexts/cart-context';
import { toast } from 'sonner';

jest.mock('sonner');

describe('AddToCartButton', () => {
  it('should add product to cart when clicked', () => {
    let cartItems: any[] = [];

    function TestWrapper() {
      const cart = useCart();
      cartItems = cart.items;
      return <AddToCartButton productId="product-1" inStock={true} />;
    }

    render(
      <CartProvider>
        <TestWrapper />
      </CartProvider>
    );

    const button = screen.getByRole('button', { name: /add to cart/i });
    fireEvent.click(button);

    expect(cartItems).toHaveLength(1);
    expect(cartItems[0].productId).toBe('product-1');
    expect(toast.success).toHaveBeenCalledWith('Added to cart!');
  });

  it('should be disabled when product is out of stock', () => {
    render(
      <CartProvider>
        <AddToCartButton productId="product-1" inStock={false} />
      </CartProvider>
    );

    const button = screen.getByRole('button', { name: /out of stock/i });
    expect(button).toBeDisabled();
  });
});
```

**Green (Implementation)**:

```typescript
// src/components/add-to-cart-button.tsx
'use client';

import { useCart } from '@/contexts/cart-context';
import { toast } from 'sonner';

interface AddToCartButtonProps {
  productId: string;
  inStock: boolean;
}

export function AddToCartButton({ productId, inStock }: AddToCartButtonProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(productId);
    toast.success('Added to cart!');
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={!inStock}
      className={`px-6 py-3 rounded-lg font-semibold ${
        inStock
          ? 'bg-orange-500 hover:bg-orange-600 text-white'
          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
      }`}
      aria-label={inStock ? 'Add to cart' : 'Out of stock'}
    >
      {inStock ? 'Add to Cart' : 'Out of Stock'}
    </button>
  );
}
```

**Refactor**: Extract styles, add loading state

---

#### Test 5: E2E Test (Add to Cart Flow)

**Red (Failing Test)**:

```typescript
// tests/e2e/cart.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Add to Cart', () => {
  test('should add product to cart and show toast notification', async ({ page }) => {
    // Navigate to products page
    await page.goto('/products');

    // Click first product
    await page
      .getByRole('link', { name: /ghost pepper chocolate/i })
      .first()
      .click();

    // Wait for product detail page
    await expect(page).toHaveURL(/\/products\/\d+/);

    // Click Add to Cart
    await page.getByRole('button', { name: /add to cart/i }).click();

    // Verify toast notification appears
    await expect(page.getByText('Added to cart!')).toBeVisible();

    // Verify cart badge updates
    await expect(page.getByText('1')).toBeVisible(); // Cart badge shows 1
  });

  test('should increase quantity when adding same product twice', async ({ page }) => {
    await page.goto('/products/1');

    // Add product twice
    await page.getByRole('button', { name: /add to cart/i }).click();
    await page.waitForTimeout(500); // Wait for animation
    await page.getByRole('button', { name: /add to cart/i }).click();

    // Cart badge should show 2
    await expect(page.getByText('2')).toBeVisible();
  });

  test('should persist cart after page refresh', async ({ page }) => {
    await page.goto('/products/1');

    // Add product to cart
    await page.getByRole('button', { name: /add to cart/i }).click();
    await expect(page.getByText('1')).toBeVisible();

    // Refresh page
    await page.reload();

    // Cart badge should still show 1
    await expect(page.getByText('1')).toBeVisible();
  });
});
```

**Green (Implementation)**:

- Implement CartProvider in app/layout.tsx
- Add Toaster component
- Connect AddToCartButton to context

**Refactor**: Extract test utilities, add more assertions

---

### Slice 4.2: TDD Plan (Cart Badge)

#### Test 6: Cart Badge Component

**Red (Failing Test)**:

```typescript
// src/__tests__/components/cart-badge.test.tsx
import { render, screen } from '@testing-library/react';
import { CartBadge } from '@/components/navigation/cart-badge';
import { CartProvider } from '@/contexts/cart-context';

describe('CartBadge', () => {
  it('should display total quantity from cart', () => {
    render(
      <CartProvider>
        <CartBadge />
      </CartProvider>
    );

    // Mock cart with 5 items total (3 + 2)
    // This will be tested after adding items via context

    const badge = screen.getByText('5');
    expect(badge).toBeInTheDocument();
  });

  it('should not display badge when cart is empty', () => {
    render(
      <CartProvider>
        <CartBadge />
      </CartProvider>
    );

    // No badge should be visible
    expect(screen.queryByTestId('cart-badge')).not.toBeInTheDocument();
  });
});
```

**Implementation continues with similar TDD pattern...**

---

### Slice 4.3: TDD Plan (Edge Cases & Accessibility)

#### Test 7: Accessibility (axe-core)

```typescript
test('Add to Cart button should be accessible', async ({ page }) => {
  await page.goto('/products/1');

  const results = await injectAxe(page);
  expect(results.violations).toHaveLength(0);

  // Keyboard navigation
  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', { name: /add to cart/i })).toBeFocused();

  await page.keyboard.press('Enter');
  await expect(page.getByText('Added to cart!')).toBeVisible();
});
```

---

## Implementation Checklist (Step-by-Step)

### Slice 4.1 Checklist (Day 1)

**Morning (2-3 hours)**:

- [ ] Create feature branch: `feature/us-004-slice-4.1-cart-state`
- [ ] **TDD Red**: Write cart context tests (add item, duplicate handling)
- [ ] **TDD Green**: Implement CartContext with addItem, updateQuantity
- [ ] **TDD Red**: Write localStorage persistence tests
- [ ] **TDD Green**: Implement cart-storage.ts utilities
- [ ] Run tests: `pnpm test` (all pass ✅)
- [ ] Commit: `test(cart): add cart context and storage tests`
- [ ] Commit: `feat(cart): implement cart context and localStorage`

**Afternoon (2-3 hours)**:

- [ ] **TDD Red**: Write AddToCartButton component tests
- [ ] **TDD Green**: Implement AddToCartButton component
- [ ] Add Sonner toast library: `pnpm add sonner`
- [ ] Add CartProvider to app/layout.tsx
- [ ] Add Toaster component to layout
- [ ] **TDD Red**: Write E2E test for add to cart flow
- [ ] **TDD Green**: Make E2E test pass
- [ ] Run all tests: `pnpm test && pnpm test:e2e`
- [ ] Manual test: Add product to cart, see toast, refresh (cart persists)
- [ ] Commit: `feat(cart): add AddToCartButton with toast notifications`
- [ ] Commit: `test(cart): add E2E tests for add to cart flow`

**End of Day 1**:

- [ ] Push branch: `git push origin feature/us-004-slice-4.1-cart-state`
- [ ] Create PR: "feat: US-004 Slice 4.1 - Cart State + Add to Cart Button"
- [ ] Self-review using checklist
- [ ] Wait for CI to pass (7 quality gates)
- [ ] Merge PR (squash and merge)
- [ ] Delete branch
- [ ] Update CLAUDE.md progress

---

### Slice 4.2 Checklist (Day 2)

**Morning (2-3 hours)**:

- [ ] Create feature branch: `feature/us-004-slice-4.2-cart-badge`
- [ ] **TDD Red**: Write CartBadge component tests
- [ ] **TDD Green**: Implement CartBadge component
- [ ] Add CartBadge to Navigation component
- [ ] **TDD Red**: Write tests for duplicate product quantity increase
- [ ] **TDD Green**: Verify duplicate product handling works
- [ ] Run tests: `pnpm test`
- [ ] Commit: `test(cart): add cart badge tests`
- [ ] Commit: `feat(cart): add cart badge to navigation`

**Afternoon (2-3 hours)**:

- [ ] **TDD Red**: Write E2E test for cart badge updates
- [ ] **TDD Green**: Make E2E test pass
- [ ] **TDD Red**: Write tests for out-of-stock button behavior
- [ ] **TDD Green**: Disable Add to Cart for out-of-stock products
- [ ] Run all tests: `pnpm test && pnpm test:e2e`
- [ ] Manual test: Add items, see badge update, add duplicate (qty increases)
- [ ] Commit: `feat(cart): handle duplicate products and out-of-stock`
- [ ] Commit: `test(cart): add E2E tests for cart badge`

**End of Day 2**:

- [ ] Push branch: `git push origin feature/us-004-slice-4.2-cart-badge`
- [ ] Create PR: "feat: US-004 Slice 4.2 - Cart Badge + Quantity Management"
- [ ] Self-review using checklist
- [ ] Wait for CI to pass
- [ ] Merge PR
- [ ] Delete branch
- [ ] Update CLAUDE.md progress

---

### Slice 4.3 Checklist (Day 3, Half Day)

**Morning (2-3 hours)**:

- [ ] Create feature branch: `feature/us-004-slice-4.3-cart-polish`
- [ ] **TDD Red**: Write tests for 24-hour cart expiration
- [ ] **TDD Green**: Implement cart expiration logic
- [ ] **TDD Red**: Write tests for localStorage edge cases (full, corrupted)
- [ ] **TDD Green**: Implement error handling for localStorage
- [ ] **TDD Red**: Write accessibility tests (ARIA labels, keyboard nav)
- [ ] **TDD Green**: Add ARIA labels, keyboard support, screen reader announcements
- [ ] Run tests: `pnpm test`
- [ ] Commit: `feat(cart): add 24-hour expiration and error handling`
- [ ] Commit: `feat(cart): improve accessibility (ARIA, keyboard nav)`

**Afternoon (1-2 hours)**:

- [ ] **TDD Red**: Write E2E test for cart persistence (close/reopen browser)
- [ ] **TDD Green**: Make E2E test pass
- [ ] Run full test suite: `pnpm test && pnpm test:e2e`
- [ ] Run axe-core accessibility scan
- [ ] Manual test: All scenarios from acceptance criteria
- [ ] Performance test: Add 20 items to cart (should be fast)
- [ ] Commit: `test(cart): add comprehensive E2E tests for persistence`

**End of Day 3**:

- [ ] Push branch: `git push origin feature/us-004-slice-4.3-cart-polish`
- [ ] Create PR: "feat: US-004 Slice 4.3 - Cart Persistence + Edge Cases"
- [ ] Self-review using checklist
- [ ] Wait for CI to pass
- [ ] Merge PR
- [ ] Delete branch
- [ ] Update CLAUDE.md: Mark US-004 as ✅ COMPLETE
- [ ] Update product backlog
- [ ] Celebrate! 🎉

---

## Quality Gates (CI/CD)

Every PR must pass all 7 quality gates:

1. **Lint**: ESLint passes (0 errors)
2. **Type Check**: TypeScript compiles (0 errors)
3. **Unit Tests**: Jest tests pass (>80% coverage)
4. **E2E Tests**: Playwright tests pass
5. **Build**: Next.js builds successfully
6. **Security**: TruffleHog + npm audit (0 vulnerabilities)
7. **Quality Gate**: All checks pass

---

## Test Coverage Targets

**Overall Target**: ≥80% coverage for all new code

**Module-Specific Targets**:

| Module               | Target | Rationale                               |
| -------------------- | ------ | --------------------------------------- |
| `cart-context.tsx`   | 95%    | Critical business logic                 |
| `cart-storage.ts`    | 90%    | Data persistence (edge cases important) |
| `cart-utils.ts`      | 100%   | Pure functions (easy to test)           |
| `add-to-cart-button` | 85%    | UI component (cover main interactions)  |
| `cart-badge.tsx`     | 85%    | UI component (cover main interactions)  |

**E2E Coverage**: All 5 acceptance criteria scenarios

---

## Accessibility Requirements (WCAG 2.1 Level AA)

### Checklist

- [ ] **Keyboard Navigation**: All functionality accessible via keyboard
  - [ ] Tab to Add to Cart button
  - [ ] Enter/Space to activate button
  - [ ] Tab to cart badge
- [ ] **ARIA Labels**: All interactive elements labeled
  - [ ] Button: `aria-label="Add to cart"` or `aria-label="Out of stock"`
  - [ ] Cart badge: `aria-label="Shopping cart: 5 items"`
  - [ ] Toast: `role="status"` (screen reader announces)
- [ ] **Focus Management**: Visible focus indicators
  - [ ] Button has clear focus outline
  - [ ] Focus remains on button after click
- [ ] **Screen Reader Support**: All actions announced
  - [ ] "Added to cart!" announced when product added
  - [ ] Cart quantity changes announced
  - [ ] Out of stock state announced
- [ ] **Color Contrast**: ≥4.5:1 for all text
  - [ ] Button text on background
  - [ ] Badge text on background
  - [ ] Toast text on background

**Testing**: Run axe-core in E2E tests for all pages

---

## Performance Considerations

### Optimization Strategies

1. **Debounce localStorage Writes**:

   ```typescript
   // Don't write to localStorage on every state change
   // Debounce for 300ms
   const debouncedSave = useMemo(() => debounce(items => saveCart(items), 300), []);
   ```

2. **Memoize Cart Calculations**:

   ```typescript
   const totalQuantity = useMemo(
     () => items.reduce((sum, item) => sum + item.quantity, 0),
     [items]
   );
   ```

3. **Lazy Load Cart Badge**:

   ```typescript
   // Only render badge when cart has items
   {totalQuantity > 0 && <CartBadge count={totalQuantity} />}
   ```

4. **Optimize Toast Animations**:
   - Use CSS transforms (GPU accelerated)
   - Limit concurrent toasts to 3

**Performance Budget**:

- Add to cart action: <50ms
- localStorage write: <10ms
- Cart badge update: <16ms (1 frame at 60fps)

---

## Error Handling

### Edge Cases

1. **localStorage Full**:

   ```typescript
   try {
     localStorage.setItem(CART_KEY, JSON.stringify(cart));
   } catch (error) {
     if (error.name === 'QuotaExceededError') {
       toast.error('Cart storage full. Please clear browser data.');
       console.error('localStorage quota exceeded', error);
     }
   }
   ```

2. **Corrupted Cart Data**:

   ```typescript
   try {
     const cart = JSON.parse(localStorage.getItem(CART_KEY)!);
     // Validate schema
     if (!isValidCart(cart)) {
       throw new Error('Invalid cart schema');
     }
     return cart;
   } catch (error) {
     // Clear corrupted data
     clearCart();
     return null;
   }
   ```

3. **Product No Longer Exists**:

   ```typescript
   // When loading cart, validate products still exist
   const validatedItems = await Promise.all(
     items.map(async item => {
       const product = await getProductById(item.productId);
       return product ? item : null;
     })
   );
   const validItems = validatedItems.filter(item => item !== null);
   ```

4. **Network Failure (Future - API Cart)**:
   - Show "Offline" badge
   - Queue actions, sync when online
   - Use Service Worker for background sync

---

## Security Considerations

### Client-Side Cart (Guest)

1. **Input Validation**:

   ```typescript
   // Validate productId is UUID
   if (!isValidUUID(productId)) {
     throw new Error('Invalid product ID');
   }

   // Validate quantity is positive integer
   if (quantity < 1 || !Number.isInteger(quantity)) {
     throw new Error('Invalid quantity');
   }
   ```

2. **localStorage Sanitization**:

   ```typescript
   // Never trust data from localStorage
   // Always validate schema and types
   const cartSchema = z.object({
     items: z.array(
       z.object({
         productId: z.string().uuid(),
         quantity: z.number().int().positive(),
         addedAt: z.string().datetime(),
       })
     ),
     savedAt: z.string().datetime(),
   });
   ```

3. **XSS Prevention**:
   - React automatically escapes content (safe by default)
   - Never use `dangerouslySetInnerHTML` for cart data
   - Toast messages use plain text (not HTML)

4. **CSRF Protection** (Future - API Cart):
   - Use CSRF tokens for server-side cart API
   - Implement SameSite cookies

**Threat Model**: Low risk for guest cart (client-side only), but validate everything for server-side migration

---

## Documentation Updates

After completing US-004, update:

1. **CLAUDE.md**:

   ```markdown
   **Completed Stories**:

   - ✅ US-004: Add Product to Cart (5 pts) - PR #XX, #YY, #ZZ

   **Progress**: X/13 points complete (X%)
   ```

2. **Product Backlog** (`docs/01-requirements/product-backlog.md`):

   ```markdown
   ### US-004: Add Product to Cart (Guest)

   **Status**: ✅ **COMPLETED** (PR #XX, #YY, #ZZ)
   **Completion Date**: 2025-11-0X
   ```

3. **Test Coverage Report** (`docs/05-test-levels/test-coverage-report.md`):
   - Add new modules: `cart-context`, `cart-storage`, `cart-utils`
   - Update coverage percentages
   - Document new test counts (unit, integration, E2E)

4. **Component Documentation** (create if needed):

   ````markdown
   # Cart Components

   ## AddToCartButton

   Add products to shopping cart with toast notifications.

   ### Props

   - `productId: string` - Product to add
   - `inStock: boolean` - Whether product is available

   ### Usage

   ```tsx
   <AddToCartButton productId="123" inStock={true} />
   ```
   ````

   ```

   ```

5. **API Documentation** (if API endpoints added):
   - Document any new endpoints
   - Update OpenAPI/Swagger spec

---

## Risks & Mitigation

| Risk                                | Probability | Impact | Mitigation                                    |
| ----------------------------------- | ----------- | ------ | --------------------------------------------- |
| localStorage quota exceeded         | Low         | Medium | Implement error handling, show user message   |
| Cart data corruption                | Low         | Medium | Validate schema, clear on error               |
| Performance degradation (>50 items) | Low         | Low    | Optimize with debounce, memoization           |
| Accessibility issues                | Medium      | High   | axe-core tests, manual keyboard testing       |
| Browser compatibility (old Safari)  | Low         | Low    | Polyfill localStorage, test on older browsers |
| User confusion (no cart page yet)   | Medium      | Medium | Add "View Cart" link in toast (US-005)        |

---

## Success Criteria

US-004 is successful when:

✅ **Functional**:

- User can add product to cart
- Cart badge shows correct total quantity
- Duplicate products increase quantity (not duplicated)
- Cart persists for 24 hours
- Out-of-stock products cannot be added

✅ **Quality**:

- All tests pass (unit, integration, E2E)
- Coverage ≥80% for new code
- 0 ESLint/TypeScript errors
- 0 axe-core accessibility violations
- All 7 CI quality gates pass

✅ **Performance**:

- Add to cart action <50ms
- Page load not affected by cart size
- No jank or UI freezes

✅ **User Experience**:

- Toast notification is clear and helpful
- Button states are intuitive
- Keyboard navigation works perfectly
- Screen readers announce all actions

---

## Next Steps (After US-004)

**Immediate Next**: US-005 - View Cart (3 points)

- Create `/cart` page to display cart items
- Show product details, quantities, subtotals
- Calculate cart total

**Blocked Until US-004**:

- US-006: Update Cart Quantity (3 pts)
- US-007: Remove from Cart (2 pts)

**Deployment Increment Progress**:

- After US-004: 5/13 points (38%)
- After US-005: 8/13 points (62%)
- After US-006 + US-007: 13/13 points (100%) - Increment 2 COMPLETE! 🎉

---

## References

### Internal Documentation

- [Product Backlog](./product-backlog.md) - US-004 full details
- [Definition of Ready](../02-agile-planning/definition-of-ready.md) - DoR checklist
- [Test Strategy](../04-testing-strategy/weirdbites-test-strategy.md) - TDD approach
- [Unit Testing Approach](../05-test-levels/unit-testing-approach.md) - Jest best practices
- [E2E Testing Approach](../05-test-levels/e2e-testing-approach.md) - Playwright patterns
- [Accessibility Report](../06-quality-attributes/accessibility-compliance-report.md) - WCAG guidelines

### External References

- [React Context API](https://react.dev/learn/passing-data-deeply-with-context) - State management
- [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API) - localStorage
- [Sonner Toast](https://sonner.emilkowal.ski/) - Toast notifications
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/) - Accessibility
- [Test-Driven Development](https://martinfowler.com/bliki/TestDrivenDevelopment.html) - TDD principles

---

## Changelog

| Version | Date       | Author                 | Changes                     |
| ------- | ---------- | ---------------------- | --------------------------- |
| 1.0.0   | 2025-11-01 | Antonio Gomez Gallardo | Initial implementation plan |

---

**Document Status**: ✅ Ready for Development

**Estimated Start Date**: 2025-11-01
**Estimated Completion Date**: 2025-11-04 (3 days)

**Next Review**: After Slice 4.1 completion (adjust plan based on learnings)

---

_This implementation plan follows the WeirdBites quality standards: TDD (Module 07), Test Pyramid (Module 04), WCAG 2.1 AA (Module 06), and Trunk-Based Development (Module 03)._
