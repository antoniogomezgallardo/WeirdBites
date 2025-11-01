# WeirdBites Unit Testing Approach

**Date**: 2025-11-01
**Version**: 1.0.0
**Status**: Active

---

## Executive Summary

This document defines the unit testing strategy for WeirdBites, using Jest and React Testing Library to test individual components and functions in isolation. Unit tests form the foundation of our test pyramid (70% of all tests), providing fast feedback and catching bugs early in development.

**Current Status**:

- **260+ unit tests** (~75% of test suite)
- **87.2% component coverage**, **91.5% business logic coverage**
- **~19ms average execution time** (2.6x faster than industry benchmark)
- **0 flaky tests**

---

## 1. Testing Framework Stack

### 1.1 Core Tools

| Tool                           | Version                      | Purpose                                     |
| ------------------------------ | ---------------------------- | ------------------------------------------- |
| **Jest**                       | 30.2.0                       | Test runner, assertions, mocking            |
| **React Testing Library**      | 16.3.0                       | Component testing with user-centric queries |
| **Testing Library Jest-DOM**   | 6.9.1                        | Custom matchers for DOM assertions          |
| **Testing Library User Event** | 14.6.1                       | User interaction simulation                 |
| **jsdom**                      | (via jest-environment-jsdom) | Browser environment for Node.js             |

**Reference**: [package.json:38-47](c:\Users\User\Documents\Workspaces\WeirdBites\package.json#L38-L47)

---

### 1.2 Jest Configuration

**File**: [jest.config.ts](c:\Users\User\Documents\Workspaces\WeirdBites\jest.config.ts)

```typescript
const config: Config = {
  coverageProvider: 'v8', // Fast coverage with V8
  testEnvironment: 'jsdom', // Browser-like environment
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Path alias support
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
    '!src/**/__tests__/**',
  ],
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}',
  ],
  testPathIgnorePatterns: ['/node_modules/', '/.next/', '/tests/e2e/', '/docs/quality-standards/'],
  coverageThreshold: {
    global: {
      branches: 40,
      functions: 30,
      lines: 18,
      statements: 18,
    },
  },
};
```

**Key Features**:

- ✅ Path alias support (`@/` maps to `src/`)
- ✅ Automatic test discovery (`*.test.ts`, `*.spec.ts`, `__tests__/` folder)
- ✅ E2E tests excluded from unit test runs
- ✅ Coverage thresholds enforced in CI

---

### 1.3 Test Setup File

**File**: `jest.setup.ts`

```typescript
import '@testing-library/jest-dom';

// Extend Jest matchers with DOM-specific assertions:
// - toBeInTheDocument()
// - toHaveTextContent()
// - toBeVisible()
// - toHaveAttribute()
// ... and more
```

**Purpose**: Loads custom matchers for cleaner assertions

---

## 2. Test Organization

### 2.1 File Structure

**Pattern**: Co-locate tests with source code using `__tests__` folders

```
src/
├── components/
│   ├── product-card.tsx
│   ├── pagination.tsx
│   └── __tests__/
│       ├── product-card.test.tsx       # Component test
│       └── pagination.test.tsx
├── lib/
│   ├── products.ts
│   ├── stock-utils.ts
│   └── __tests__/
│       ├── products.test.ts            # Business logic test
│       └── stock-utils.test.ts
├── hooks/
│   ├── useFeature.ts
│   └── __tests__/
│       └── useFeature.test.ts          # Custom hook test
└── app/
    ├── products/
    │   ├── page.tsx
    │   └── __tests__/
    │       └── page.test.tsx            # Server component test
```

**Benefits**:

- ✅ Tests are close to source code (easy to find)
- ✅ Clear separation from integration/E2E tests
- ✅ Automatic discovery by Jest

---

### 2.2 Naming Conventions

**Test Files**:

- ✅ `*.test.ts` or `*.test.tsx` for test files
- ✅ `__tests__/` folder for grouping multiple test files

**Test Suites and Cases**:

```typescript
describe('ComponentName or FunctionName', () => {
  describe('FeatureOrScenario', () => {
    it('should [expected behavior]', () => {
      // Test implementation
    });
  });
});
```

**Examples**:

- `describe('ProductCard Component', ...)`
- `describe('Happy Path', ...)`
- `it('should render product name', ...)`
- `it('should handle missing image with fallback', ...)`

---

## 3. Component Testing with React Testing Library

### 3.1 Testing Philosophy

**Guiding Principle**: Test components like a user would interact with them

**DO**:

- ✅ Use semantic queries (`getByRole`, `getByLabelText`, `getByText`)
- ✅ Test user-visible behavior (text, buttons, forms)
- ✅ Verify accessibility (roles, labels, ARIA attributes)
- ✅ Simulate real user interactions (click, type, submit)

**DON'T**:

- ❌ Test implementation details (state, props, internal methods)
- ❌ Use brittle selectors (`.class-name`, `nth-child`)
- ❌ Test styles directly (that's for visual regression tests)
- ❌ Mock everything (only mock external dependencies)

**Reference**: [React Testing Library Guiding Principles](https://testing-library.com/docs/guiding-principles/)

---

### 3.2 Query Priority (in order of preference)

1. **Accessible Queries** (Best - mirror user experience):
   - `getByRole` - Buttons, links, headings, forms
   - `getByLabelText` - Form inputs with labels
   - `getByPlaceholderText` - Form inputs with placeholders
   - `getByText` - Non-interactive text

2. **Semantic Queries**:
   - `getByAltText` - Images with alt text
   - `getByTitle` - Elements with title attribute

3. **Test IDs** (Last resort):
   - `getByTestId` - Only when semantic queries don't work

**Example**:

```typescript
// ✅ Good - accessible query
const button = screen.getByRole('button', { name: /add to cart/i });

// ⚠️  Acceptable - text query
const price = screen.getByText('$12.99');

// ❌ Avoid - test ID (unless necessary)
const element = screen.getByTestId('product-card');
```

---

### 3.3 Example: Testing ProductCard Component

**Source**: [src/components/**tests**/product-card.test.tsx](c:\Users\User\Documents\Workspaces\WeirdBites\src\components__tests__\product-card.test.tsx)

```typescript
import { render, screen } from '@testing-library/react';
import { ProductCard } from '../product-card';

// Mock Next.js components
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} data-nextjs-image="true" />,
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

describe('ProductCard Component', () => {
  const mockProduct = {
    id: '1',
    name: 'Durian Chips',
    description: 'Crispy chips made from the king of fruits',
    price: 12.99,
    imageUrl: '/images/products/durian-chips.jpg',
    category: 'Snacks',
    origin: 'Thailand',
    stock: 50,
  };

  describe('Happy Path', () => {
    it('should render product name', () => {
      render(<ProductCard product={mockProduct} />);
      expect(screen.getByText('Durian Chips')).toBeInTheDocument();
    });

    it('should render product price formatted as currency', () => {
      render(<ProductCard product={mockProduct} />);
      expect(screen.getByText('$12.99')).toBeInTheDocument();
    });

    it('should render product image with alt text', () => {
      render(<ProductCard product={mockProduct} />);
      const image = screen.getByAltText('Durian Chips');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', '/images/products/durian-chips.jpg');
    });

    it('should render as a link to product detail page', () => {
      render(<ProductCard product={mockProduct} />);
      const link = screen.getByRole('link', { name: /durian chips/i });
      expect(link).toHaveAttribute('href', '/products/1');
    });
  });

  describe('Edge Cases', () => {
    it('should handle missing image with fallback', () => {
      const productWithoutImage = { ...mockProduct, imageUrl: '' };
      render(<ProductCard product={productWithoutImage} />);

      const image = screen.getByAltText('Durian Chips');
      expect(image).toHaveAttribute('src', '/images/placeholder.jpg');
    });

    it('should handle out of stock product', () => {
      const outOfStockProduct = { ...mockProduct, stock: 0 };
      render(<ProductCard product={outOfStockProduct} />);

      expect(screen.getByText(/out of stock/i)).toBeInTheDocument();
    });
  });
});
```

**Test Coverage**: 12 tests, 94% coverage ✅

---

### 3.4 User Interaction Testing

**Simulate Real User Actions**:

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AddToCartButton } from '../add-to-cart-button';

describe('AddToCartButton', () => {
  it('should call onClick when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    render(<AddToCartButton onClick={handleClick} />);

    const button = screen.getByRole('button', { name: /add to cart/i });
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when out of stock', () => {
    render(<AddToCartButton disabled={true} />);

    const button = screen.getByRole('button', { name: /add to cart/i });
    expect(button).toBeDisabled();
  });

  it('should show loading state when adding to cart', async () => {
    const user = userEvent.setup();

    render(<AddToCartButton isLoading={true} />);

    expect(screen.getByText(/adding/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

**User Event API**:

- `user.click(element)` - Click interaction
- `user.type(input, 'text')` - Keyboard input
- `user.clear(input)` - Clear input field
- `user.selectOptions(select, 'option')` - Select dropdown
- `user.tab()` - Keyboard navigation

---

## 4. Business Logic Testing

### 4.1 Testing Pure Functions

**Approach**: Test all paths (happy, error, edge cases)

**Example**: [src/lib/**tests**/stock-utils.test.ts](c:\Users\User\Documents\Workspaces\WeirdBites\src\lib__tests__\stock-utils.test.ts)

```typescript
import { getStockStatus, isStockAvailable, getStockMessage } from '../stock-utils';

describe('Stock Utilities', () => {
  describe('getStockStatus', () => {
    it('should return "inStock" when stock is greater than low stock threshold', () => {
      expect(getStockStatus(15)).toBe('inStock');
      expect(getStockStatus(100)).toBe('inStock');
    });

    it('should return "lowStock" when stock is between 1 and low stock threshold', () => {
      expect(getStockStatus(3)).toBe('lowStock');
      expect(getStockStatus(5)).toBe('lowStock');
      expect(getStockStatus(1)).toBe('lowStock');
    });

    it('should return "outOfStock" when stock is 0', () => {
      expect(getStockStatus(0)).toBe('outOfStock');
    });

    it('should handle negative stock as out of stock', () => {
      expect(getStockStatus(-1)).toBe('outOfStock');
      expect(getStockStatus(-100)).toBe('outOfStock');
    });
  });

  describe('isStockAvailable', () => {
    it('should return true when stock is greater than 0', () => {
      expect(isStockAvailable(1)).toBe(true);
      expect(isStockAvailable(100)).toBe(true);
    });

    it('should return false when stock is 0 or negative', () => {
      expect(isStockAvailable(0)).toBe(false);
      expect(isStockAvailable(-1)).toBe(false);
    });
  });

  describe('getStockMessage', () => {
    it('should return "In Stock" for sufficient stock', () => {
      expect(getStockMessage(50)).toBe('In Stock');
    });

    it('should return "Only X left!" for low stock', () => {
      expect(getStockMessage(3)).toBe('Only 3 left!');
    });

    it('should return "Out of Stock" for zero stock', () => {
      expect(getStockMessage(0)).toBe('Out of Stock');
    });
  });
});
```

**Coverage**: 9 tests, 95% coverage ✅

---

### 4.2 Testing Boundary Conditions

**Always test**:

- Empty inputs (empty arrays, empty strings, null, undefined)
- Minimum values (0, negative numbers)
- Maximum values (large numbers, long strings)
- Typical values (normal use cases)

**Example**:

```typescript
describe('calculateTotalPrice', () => {
  it('should handle empty cart', () => {
    expect(calculateTotalPrice([])).toBe(0);
  });

  it('should handle single item', () => {
    const cart = [{ price: 10, quantity: 1 }];
    expect(calculateTotalPrice(cart)).toBe(10);
  });

  it('should handle multiple items', () => {
    const cart = [
      { price: 10, quantity: 2 },
      { price: 5, quantity: 3 },
    ];
    expect(calculateTotalPrice(cart)).toBe(35);
  });

  it('should handle decimal prices correctly', () => {
    const cart = [{ price: 4.99, quantity: 3 }];
    expect(calculateTotalPrice(cart)).toBe(14.97);
  });

  it('should throw error for negative prices', () => {
    const cart = [{ price: -10, quantity: 1 }];
    expect(() => calculateTotalPrice(cart)).toThrow('Invalid price');
  });
});
```

---

## 5. Mocking Strategies

### 5.1 Mocking Next.js Components

**Problem**: Next.js components (Image, Link) don't work in Jest environment

**Solution**: Mock them with simplified versions

```typescript
// Mock Next.js Image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
    return <img {...props} data-nextjs-image="true" />;
  },
}));

// Mock Next.js Link
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, ...props }: any) => {
    return <a href={href} {...props}>{children}</a>;
  },
}));
```

**Why**: Allows testing components that use Next.js features without complex setup

---

### 5.2 Mocking Prisma (Database)

**Problem**: Don't want real database calls in unit tests (slow, fragile)

**Solution**: Mock Prisma client with known responses

**File**: `src/__mocks__/prisma.ts`

```typescript
export const prismaMock = {
  product: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    count: jest.fn(),
  },
  category: {
    findMany: jest.fn(),
  },
};
```

**Usage in Test**:

```typescript
import { prismaMock } from '@/__mocks__/prisma';

jest.mock('@/lib/prisma', () => ({
  __esModule: true,
  default: prismaMock,
}));

describe('getProducts', () => {
  it('should return paginated products', async () => {
    prismaMock.product.findMany.mockResolvedValue([
      { id: '1', name: 'Product 1', price: 10 },
      { id: '2', name: 'Product 2', price: 20 },
    ]);

    const result = await getProducts({ page: 1, limit: 10 });

    expect(result).toHaveLength(2);
    expect(prismaMock.product.findMany).toHaveBeenCalledWith({
      skip: 0,
      take: 10,
    });
  });
});
```

**Benefits**:

- ✅ Fast (no database connection)
- ✅ Predictable (known mock data)
- ✅ Isolated (no side effects)

**Note**: For real database integration tests, see [Integration Testing Approach](integration-testing-approach.md)

---

### 5.3 Mocking External APIs

**Example**: Mocking fetch for third-party API calls

```typescript
global.fetch = jest.fn();

describe('fetchProductReviews', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should fetch reviews from external API', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => [{ id: 1, rating: 5, comment: 'Great product!' }],
    });

    const reviews = await fetchProductReviews('product-1');

    expect(reviews).toHaveLength(1);
    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('/api/reviews/product-1'));
  });

  it('should handle API errors', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 500,
    });

    await expect(fetchProductReviews('product-1')).rejects.toThrow('API Error');
  });
});
```

---

### 5.4 Mocking Custom Hooks

**Example**: Testing components that use custom hooks

```typescript
import { render, screen } from '@testing-library/react';
import { useFeature } from '@/hooks/useFeature';
import { AddToCartButton } from '../add-to-cart-button';

jest.mock('@/hooks/useFeature');

describe('AddToCartButton with Feature Flags', () => {
  it('should be hidden when cart feature is disabled', () => {
    (useFeature as jest.Mock).mockReturnValue(false);

    render(<AddToCartButton />);

    expect(screen.queryByRole('button', { name: /add to cart/i })).not.toBeInTheDocument();
  });

  it('should be visible when cart feature is enabled', () => {
    (useFeature as jest.Mock).mockReturnValue(true);

    render(<AddToCartButton />);

    expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument();
  });
});
```

---

## 6. Test-Driven Development (TDD) Workflow

### 6.1 Red → Green → Refactor Cycle

**Step 1: RED** - Write a failing test

```typescript
// RED Phase: Test fails because function doesn't exist
describe('formatCurrency', () => {
  it('should format number as USD currency', () => {
    expect(formatCurrency(12.99)).toBe('$12.99');
  });
});

// Output: ❌ ReferenceError: formatCurrency is not defined
```

**Step 2: GREEN** - Write minimal code to pass test

```typescript
// GREEN Phase: Write simplest implementation
export function formatCurrency(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

// Output: ✅ Test passes
```

**Step 3: REFACTOR** - Improve code quality

```typescript
// REFACTOR Phase: Add error handling, edge cases
export function formatCurrency(amount: number): string {
  if (typeof amount !== 'number' || isNaN(amount)) {
    throw new Error('Amount must be a valid number');
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

// Add more tests
it('should handle zero', () => {
  expect(formatCurrency(0)).toBe('$0.00');
});

it('should throw error for invalid input', () => {
  expect(() => formatCurrency(NaN)).toThrow();
});

// Output: ✅ All tests still pass
```

**Step 4: COMMIT** - Save progress

```bash
git add .
git commit -m "feat(utils): add currency formatting with validation"
```

---

### 6.2 TDD Benefits

**Why TDD?**:

- ✅ **Design first**: Forces you to think about API before implementation
- ✅ **100% coverage**: Every line of code is tested (because test came first)
- ✅ **Regression protection**: Tests document expected behavior
- ✅ **Faster debugging**: Test tells you exactly what broke
- ✅ **Confidence to refactor**: Tests ensure behavior doesn't change

**When to use TDD**:

- ✅ New features (especially complex logic)
- ✅ Bug fixes (write test that reproduces bug, then fix)
- ✅ Refactoring (tests ensure no behavior change)

**When NOT to use TDD**:

- ⚠️ Spike/exploration work (throw-away code)
- ⚠️ UI prototyping (design not finalized)

---

## 7. Testing Patterns & Best Practices

### 7.1 AAA Pattern (Arrange-Act-Assert)

**Structure every test**:

```typescript
it('should add product to cart', () => {
  // ARRANGE - Set up test data and preconditions
  const product = { id: '1', name: 'Product', price: 10 };
  const cart = [];

  // ACT - Perform the action being tested
  const updatedCart = addToCart(cart, product);

  // ASSERT - Verify the expected outcome
  expect(updatedCart).toHaveLength(1);
  expect(updatedCart[0]).toEqual(product);
});
```

**Benefits**: Consistent structure, easy to read and maintain

---

### 7.2 One Assertion Per Test (Guideline)

**Prefer**:

```typescript
it('should render product name', () => {
  render(<ProductCard product={mockProduct} />);
  expect(screen.getByText('Durian Chips')).toBeInTheDocument();
});

it('should render product price', () => {
  render(<ProductCard product={mockProduct} />);
  expect(screen.getByText('$12.99')).toBeInTheDocument();
});
```

**Instead of**:

```typescript
it('should render product details', () => {
  render(<ProductCard product={mockProduct} />);
  expect(screen.getByText('Durian Chips')).toBeInTheDocument();
  expect(screen.getByText('$12.99')).toBeInTheDocument();
  expect(screen.getByAltText('Durian Chips')).toBeInTheDocument();
  // ❌ Too many assertions - hard to tell which failed
});
```

**Exception**: Related assertions for same behavior (e.g., checking multiple properties of same object)

---

### 7.3 Test Isolation

**Each test should be independent**:

```typescript
describe('ShoppingCart', () => {
  let cart: ShoppingCart;

  beforeEach(() => {
    // Reset state before each test
    cart = new ShoppingCart();
  });

  it('should add item to cart', () => {
    cart.addItem({ id: '1', price: 10 });
    expect(cart.getTotal()).toBe(10);
  });

  it('should remove item from cart', () => {
    cart.addItem({ id: '1', price: 10 });
    cart.removeItem('1');
    expect(cart.getTotal()).toBe(0);
  });
});
```

**Why**: Tests can run in any order without affecting each other

---

### 7.4 Descriptive Test Names

**Good**:

```typescript
it('should show "Out of Stock" badge when stock is 0', () => {
  // Clear what's being tested and expected outcome
});
```

**Bad**:

```typescript
it('works correctly', () => {
  // ❌ What is "works correctly"? What scenario?
});
```

**Pattern**: `should [expected behavior] when [condition]`

---

## 8. Running Tests

### 8.1 NPM Scripts

**Package.json scripts**:

```json
{
  "scripts": {
    "test": "jest", // Run all tests once
    "test:watch": "jest --watch", // Watch mode (re-run on changes)
    "test:coverage": "jest --coverage" // Generate coverage report
  }
}
```

**Usage**:

```bash
# Run all tests
pnpm test

# Watch mode (recommended during development)
pnpm test:watch

# Generate coverage report
pnpm test:coverage
```

---

### 8.2 Watch Mode Shortcuts

**While in watch mode** (`pnpm test:watch`):

- `a` - Run all tests
- `f` - Run only failed tests
- `p` - Filter by filename pattern
- `t` - Filter by test name pattern
- `q` - Quit watch mode

**Example**: Press `p`, then type `product-card` to run only ProductCard tests

---

### 8.3 Running Specific Tests

**Single file**:

```bash
pnpm test src/components/__tests__/product-card.test.tsx
```

**Pattern matching**:

```bash
pnpm test --testNamePattern="should render product name"
```

**Only changed files** (git):

```bash
pnpm test --onlyChanged
```

---

## 9. Coverage Reporting

### 9.1 Generate Coverage Report

```bash
pnpm test:coverage
```

**Output**:

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

**HTML Report**: Open `coverage/lcov-report/index.html` in browser for interactive report

---

### 9.2 Coverage Metrics Explained

**Statement Coverage** (85.32%):

- % of executable statements run during tests
- Example: `const x = 5;` is a statement

**Branch Coverage** (78.41%):

- % of `if/else`, `switch`, `ternary` branches tested
- Example: Both `if (x > 0)` and `else` paths tested

**Function Coverage** (89.67%):

- % of functions called during tests
- Example: Function `calculateTotal()` was invoked

**Line Coverage** (84.98%):

- % of code lines executed during tests
- Most common metric for "coverage"

**Target**: >80% for all metrics ✅ (currently met except branch coverage)

---

### 9.3 Identifying Uncovered Code

**Coverage report highlights**:

- 🟢 Green: Covered lines
- 🔴 Red: Uncovered lines
- 🟡 Yellow: Partially covered branches

**Example** (HTML report):

```typescript
function getStockStatus(stock: number) {
  if (stock > 10) {
    return 'inStock'; // 🟢 Covered
  } else if (stock > 0) {
    return 'lowStock'; // 🟢 Covered
  } else {
    return 'outOfStock'; // 🔴 Uncovered - needs test!
  }
}
```

**Action**: Add test for `stock = 0` case

---

## 10. Debugging Tests

### 10.1 Using `screen.debug()`

**Problem**: Test fails, need to see rendered HTML

**Solution**:

```typescript
it('should render product details', () => {
  render(<ProductCard product={mockProduct} />);

  screen.debug(); // Prints entire DOM to console

  // Or debug specific element
  const heading = screen.getByRole('heading');
  screen.debug(heading);
});
```

---

### 10.2 Using `logRoles()`

**Problem**: Not sure what ARIA roles are available

**Solution**:

```typescript
import { render, logRoles } from '@testing-library/react';

it('should have accessible structure', () => {
  const { container } = render(<ProductCard product={mockProduct} />);

  logRoles(container); // Prints all available roles
});
```

**Output**:

```
heading:
  Name "Durian Chips":
  <h3 />

link:
  Name "Durian Chips":
  <a href="/products/1" />

img:
  Name "Durian Chips":
  <img alt="Durian Chips" />
```

---

### 10.3 VSCode Debugging

**Setup** (`.vscode/launch.json`):

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Jest: Current File",
      "program": "${workspaceFolder}/node_modules/.bin/jest",
      "args": ["${relativeFile}", "--runInBand"],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}
```

**Usage**:

1. Open test file
2. Set breakpoint (click line number)
3. Press F5 or click "Run > Start Debugging"
4. Test execution pauses at breakpoint

---

## 11. Common Pitfalls & Solutions

### 11.1 Async Testing Mistakes

**Problem**: Test passes but assertion never runs

```typescript
// ❌ Bad - missing await
it('should load products', () => {
  render(<ProductList />);
  expect(screen.getByText('Product 1')).toBeInTheDocument(); // Fails - not loaded yet
});
```

**Solution**: Use `waitFor` or `findBy` queries

```typescript
// ✅ Good - wait for async render
it('should load products', async () => {
  render(<ProductList />);
  expect(await screen.findByText('Product 1')).toBeInTheDocument();
});

// Or with waitFor
it('should load products', async () => {
  render(<ProductList />);
  await waitFor(() => {
    expect(screen.getByText('Product 1')).toBeInTheDocument();
  });
});
```

---

### 11.2 Flaky Tests (Timing Issues)

**Problem**: Test sometimes passes, sometimes fails

```typescript
// ❌ Bad - arbitrary timeout
it('should show success message', async () => {
  await act(async () => {
    await new Promise(resolve => setTimeout(resolve, 100));
  });
  expect(screen.getByText('Success')).toBeInTheDocument();
});
```

**Solution**: Wait for specific condition

```typescript
// ✅ Good - explicit wait
it('should show success message', async () => {
  render(<Form />);
  fireEvent.submit(screen.getByRole('button'));

  expect(await screen.findByText('Success')).toBeInTheDocument();
});
```

---

### 11.3 Testing Implementation Details

**Problem**: Tests break during refactoring

```typescript
// ❌ Bad - testing internal state
it('should toggle menu', () => {
  const { container } = render(<Navbar />);
  expect(container.querySelector('.menu').classList.contains('open')).toBe(false);

  fireEvent.click(container.querySelector('.hamburger'));
  expect(container.querySelector('.menu').classList.contains('open')).toBe(true);
});
```

**Solution**: Test user-visible behavior

```typescript
// ✅ Good - testing behavior
it('should toggle menu', async () => {
  const user = userEvent.setup();
  render(<Navbar />);

  expect(screen.queryByRole('navigation')).not.toBeVisible();

  await user.click(screen.getByRole('button', { name: /menu/i }));
  expect(screen.getByRole('navigation')).toBeVisible();
});
```

---

## 12. CI/CD Integration

### 12.1 GitHub Actions Workflow

**File**: `.github/workflows/ci.yml`

```yaml
- name: Run Unit Tests
  run: pnpm test

- name: Check Coverage
  run: pnpm test:coverage
  if: always()
```

**Coverage Enforcement**:

- Jest configuration enforces minimum thresholds
- CI fails if coverage drops below thresholds
- Coverage report uploaded as artifact

---

### 12.2 Pre-commit Hook

**File**: `.husky/pre-commit` (via lint-staged)

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": ["pnpm test --bail --findRelatedTests --passWithNoTests"]
  }
}
```

**Behavior**:

- Runs tests for changed files only
- Fast (only affected tests)
- Catches bugs before commit

---

## 13. Performance Optimization

### 13.1 Current Performance

**Benchmark** (347 total tests):

- Unit tests: ~5 seconds (260 tests, ~19ms per test)
- Industry standard: <50ms per test
- **Status**: ✅ 2.6x faster than benchmark

---

### 13.2 Tips for Fast Tests

**DO**:

- ✅ Mock external dependencies (Prisma, APIs)
- ✅ Use `beforeEach` for common setup
- ✅ Avoid real timers (`jest.useFakeTimers()`)
- ✅ Run tests in parallel (default in Jest)

**DON'T**:

- ❌ Make real API calls
- ❌ Use real database connections (that's integration tests)
- ❌ Add unnecessary `waitFor` delays

---

## 14. Resources & References

### 14.1 Official Documentation

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Library Queries](https://testing-library.com/docs/queries/about)
- [Common Mistakes](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

### 14.2 Internal Documentation

- [Module 04: Testing Strategy](../04-testing-strategy/)
- [Test Pyramid Report](../04-testing-strategy/test-pyramid-report.md)
- [Integration Testing Approach](integration-testing-approach.md)
- [E2E Testing Approach](e2e-testing-approach.md)

---

## 15. Summary

**Unit Testing at WeirdBites**:

- ✅ **260+ tests** forming foundation of test pyramid (75%)
- ✅ **87-91% coverage** across components and business logic
- ✅ **~19ms per test** (2.6x faster than industry standard)
- ✅ **0 flaky tests** (strict wait conditions)
- ✅ **TDD workflow** ensures every line is tested

**Next Steps**:

1. Review example tests in `src/components/__tests__/`
2. Follow TDD cycle for new features (Red → Green → Refactor)
3. Maintain >80% coverage for all new code
4. Keep tests fast (<50ms per test average)

---

**Document Control**:

- **Version**: 1.0.0
- **Last Updated**: 2025-11-01
- **Next Review**: Monthly or when testing strategy changes
- **Owner**: Antonio Gomez Gallardo
