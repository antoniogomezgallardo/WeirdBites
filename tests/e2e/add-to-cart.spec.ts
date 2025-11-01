import { test, expect } from '@playwright/test';

/**
 * E2E Tests for Add to Cart Functionality (US-004 Slice 4.1)
 *
 * Tests the complete user journey from browsing products to adding items to cart.
 *
 * Test Coverage:
 * - Happy path: Add product to cart
 * - Toast notifications appear
 * - localStorage persistence
 * - Multiple product additions
 * - Disabled state for out-of-stock products
 * - Cart persistence across page reloads
 */

/**
 * Helper function to find and click an in-stock product
 * Uses the stock badge to identify available products
 * @param page - Playwright page object
 * @returns Product name
 */
async function clickInStockProduct(page: any): Promise<string | null> {
  // Wait for products to load
  await page.waitForSelector('[data-testid="product-card"]', { timeout: 10000 });

  // Find all product cards
  const allProducts = page.locator('[data-testid="product-card"]');
  const count = await allProducts.count();

  // Find first product that has stock badge with "In Stock" or "Low Stock"
  for (let i = 0; i < count; i++) {
    const product = allProducts.nth(i);
    const stockBadge = product.locator('[role="status"]');
    const stockText = await stockBadge.textContent();

    // Check if product is in stock (either "In Stock" or "Low Stock N left")
    if (stockText && (stockText.includes('In Stock') || stockText.includes('left'))) {
      const productName = await product.locator('[data-testid="product-name"]').textContent();
      await product.click();
      return productName;
    }
  }

  // If no in-stock product found, throw error
  throw new Error('No in-stock products found for testing');
}

test.describe('Add to Cart - Happy Path', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('should add a product to cart and show success toast', async ({ page }) => {
    // Navigate to products listing page
    await page.goto('/products');

    // Wait for products to load
    await page.waitForSelector('[data-testid="product-card"]', { timeout: 10000 });

    // Click an in-stock product
    const productName = await clickInStockProduct(page);

    // Wait for product detail page to load
    await page.waitForURL(/\/products\/.+/);
    await page.waitForSelector('button:has-text("Add to Cart")', { timeout: 5000 });

    // Click "Add to Cart" button
    const addToCartButton = page.locator('button:has-text("Add to Cart")');
    await expect(addToCartButton).toBeVisible();
    await expect(addToCartButton).toBeEnabled();
    await addToCartButton.click();

    // Verify success toast appears
    const toast = page.locator('[data-sonner-toast]');
    await expect(toast).toBeVisible({ timeout: 3000 });

    // Verify toast message contains product name
    if (productName) {
      await expect(toast).toContainText(`Added ${productName.trim()} to cart`);
    }

    // Verify cart is persisted in localStorage
    const cartData = await page.evaluate(() => {
      const stored = localStorage.getItem('weirdbites_cart');
      return stored ? JSON.parse(stored) : null;
    });

    expect(cartData).toBeTruthy();
    expect(cartData.items).toHaveLength(1);
    expect(cartData.expiresAt).toBeTruthy();
  });

  test('should add multiple quantities of the same product', async ({ page }) => {
    // Navigate to a specific product
    await page.goto('/products');
    await page.waitForSelector('[data-testid="product-card"]', { timeout: 10000 });

    await clickInStockProduct(page);

    await page.waitForURL(/\/products\/.+/);
    const addToCartButton = page.locator('button:has-text("Add to Cart")');

    // Add product to cart multiple times
    await addToCartButton.click();
    await page.waitForTimeout(500); // Wait for toast animation

    await addToCartButton.click();
    await page.waitForTimeout(500);

    await addToCartButton.click();

    // Verify cart has one item with quantity 3
    const cartData = await page.evaluate(() => {
      const stored = localStorage.getItem('weirdbites_cart');
      return stored ? JSON.parse(stored) : null;
    });

    expect(cartData).toBeTruthy();
    expect(cartData.items).toHaveLength(1);
    expect(cartData.items[0].quantity).toBe(3);
  });

  test('should persist cart across page reloads', async ({ page }) => {
    // Add product to cart
    await page.goto('/products');
    await page.waitForSelector('[data-testid="product-card"]', { timeout: 10000 });

    await clickInStockProduct(page);

    await page.waitForURL(/\/products\/.+/);
    const addToCartButton = page.locator('button:has-text("Add to Cart")');
    await addToCartButton.click();

    // Wait for localStorage to be updated
    await page.waitForTimeout(500);

    // Get cart data before reload
    const cartBeforeReload = await page.evaluate(() => {
      const stored = localStorage.getItem('weirdbites_cart');
      return stored ? JSON.parse(stored) : null;
    });

    // Reload the page
    await page.reload();

    // Verify cart is still in localStorage after reload
    const cartAfterReload = await page.evaluate(() => {
      const stored = localStorage.getItem('weirdbites_cart');
      return stored ? JSON.parse(stored) : null;
    });

    expect(cartAfterReload).toBeTruthy();
    expect(cartAfterReload.items).toHaveLength(cartBeforeReload.items.length);
    expect(cartAfterReload.items[0].productId).toBe(cartBeforeReload.items[0].productId);
    expect(cartAfterReload.items[0].quantity).toBe(cartBeforeReload.items[0].quantity);
  });

  test('should add different products to cart', async ({ page }) => {
    // Navigate to products page
    await page.goto('/products');
    await page.waitForSelector('[data-testid="product-card"]', { timeout: 10000 });

    // Find TWO different in-stock products
    const allProducts = page.locator('[data-testid="product-card"]');
    const count = await allProducts.count();

    const inStockProductIds: string[] = [];

    for (let i = 0; i < count; i++) {
      const product = allProducts.nth(i);
      const stockBadge = product.locator('[role="status"]');
      const stockText = await stockBadge.textContent();

      // Check if product is in stock (either "In Stock" or "Low Stock N left")
      if (stockText && (stockText.includes('In Stock') || stockText.includes('left'))) {
        // Get product ID from the link href
        const href = await product.getAttribute('href');
        const productId = href?.split('/').pop() || '';

        if (productId && productId !== '') {
          inStockProductIds.push(productId);

          if (inStockProductIds.length >= 2) {
            break; // Found enough products
          }
        }
      }
    }

    // Skip if we don't have at least 2 different in-stock products
    if (inStockProductIds.length < 2) {
      test.skip();
      return;
    }

    // Verify we actually have 2 DIFFERENT products
    expect(inStockProductIds[0]).not.toBe(inStockProductIds[1]);

    // Add first product by navigating directly to its detail page
    await page.goto(`/products/${inStockProductIds[0]}`);
    await page.waitForSelector('button:has-text("Add to Cart")', { timeout: 5000 });
    await page.locator('button:has-text("Add to Cart")').click();
    await page.waitForTimeout(500);

    // Add second product by navigating directly to its detail page
    await page.goto(`/products/${inStockProductIds[1]}`);
    await page.waitForSelector('button:has-text("Add to Cart")', { timeout: 5000 });
    await page.locator('button:has-text("Add to Cart")').click();
    await page.waitForTimeout(500);

    // Verify cart has 2 different items
    const cartData = await page.evaluate(() => {
      const stored = localStorage.getItem('weirdbites_cart');
      return stored ? JSON.parse(stored) : null;
    });

    expect(cartData).toBeTruthy();
    expect(cartData.items).toHaveLength(2);
    expect(cartData.items[0].productId).not.toBe(cartData.items[1].productId);
  });
});

test.describe('Add to Cart - Disabled State', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('should disable button for out-of-stock products', async ({ page }) => {
    // Find a product with stock = 0 in the database
    // For this test, we'll navigate to products and look for "Out of Stock" badge
    await page.goto('/products');
    await page.waitForSelector('[data-testid="product-card"]', { timeout: 10000 });

    // Look for a product with "Out of Stock" badge
    const outOfStockProduct = page
      .locator('[data-testid="product-card"]:has-text("Out of Stock")')
      .first();

    // Only run this test if we find an out-of-stock product
    const hasOutOfStock = (await outOfStockProduct.count()) > 0;
    if (!hasOutOfStock) {
      test.skip();
      return;
    }

    // Click on out-of-stock product
    await outOfStockProduct.click();
    await page.waitForURL(/\/products\/.+/);

    // Verify "Out of Stock" button is disabled
    const addToCartButton = page.locator('button:has-text("Out of Stock")');
    await expect(addToCartButton).toBeVisible();
    await expect(addToCartButton).toBeDisabled();

    // Verify button has disabled styling
    const buttonClasses = await addToCartButton.getAttribute('class');
    expect(buttonClasses).toContain('opacity-50');
    expect(buttonClasses).toContain('cursor-not-allowed');

    // Try to click (should not add to cart)
    await addToCartButton.click({ force: true });

    // Wait a bit to ensure no toast appears
    await page.waitForTimeout(1000);

    // Verify no toast appeared
    const toast = page.locator('[data-sonner-toast]');
    await expect(toast).not.toBeVisible();

    // Verify cart is empty (cart may exist from previous tests but should have no items)
    const cartData = await page.evaluate(() => {
      const stored = localStorage.getItem('weirdbites_cart');
      return stored ? JSON.parse(stored) : null;
    });

    // Cart data may exist but items array should be empty
    if (cartData) {
      expect(cartData.items).toHaveLength(0);
    } else {
      expect(cartData).toBeNull();
    }
  });
});

test.describe('Add to Cart - Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('should be keyboard accessible', async ({ page }) => {
    // Navigate to product detail page
    await page.goto('/products');
    await page.waitForSelector('[data-testid="product-card"]', { timeout: 10000 });

    await clickInStockProduct(page);

    await page.waitForURL(/\/products\/.+/);

    // Focus the "Add to Cart" button using keyboard (Tab)
    const addToCartButton = page.locator('button:has-text("Add to Cart")');
    await addToCartButton.focus();

    // Verify button has focus
    await expect(addToCartButton).toBeFocused();

    // Verify button has focus ring (visual indicator)
    const buttonClasses = await addToCartButton.getAttribute('class');
    expect(buttonClasses).toContain('focus:ring-2');

    // Activate button using Enter key
    await page.keyboard.press('Enter');

    // Verify toast appears
    const toast = page.locator('[data-sonner-toast]');
    await expect(toast).toBeVisible({ timeout: 3000 });
  });

  test('should have proper ARIA labels', async ({ page }) => {
    // Navigate to product detail page
    await page.goto('/products');
    await page.waitForSelector('[data-testid="product-card"]', { timeout: 10000 });

    const productName = await clickInStockProduct(page);

    await page.waitForURL(/\/products\/.+/);

    const addToCartButton = page.locator('button:has-text("Add to Cart")');

    // Verify button has aria-label
    const ariaLabel = await addToCartButton.getAttribute('aria-label');
    expect(ariaLabel).toBeTruthy();

    if (productName) {
      expect(ariaLabel).toContain(productName.trim());
    }

    // Verify shopping cart icon has aria-hidden
    const icon = addToCartButton.locator('svg');
    const iconAriaHidden = await icon.getAttribute('aria-hidden');
    expect(iconAriaHidden).toBe('true');
  });
});

test.describe('Add to Cart - Toast Notifications', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('should show toast with product name', async ({ page }) => {
    await page.goto('/products');
    await page.waitForSelector('[data-testid="product-card"]', { timeout: 10000 });

    const productName = await clickInStockProduct(page);

    await page.waitForURL(/\/products\/.+/);
    await page.locator('button:has-text("Add to Cart")').click();

    // Verify toast appears with product name
    const toast = page.locator('[data-sonner-toast]');
    await expect(toast).toBeVisible({ timeout: 3000 });

    if (productName) {
      await expect(toast).toContainText(`Added ${productName.trim()} to cart`);
    }

    // Verify toast has success styling
    const toastClasses = await toast.getAttribute('data-type');
    expect(toastClasses).toBe('success');
  });

  test('should auto-dismiss toast after delay', async ({ page }) => {
    await page.goto('/products');
    await page.waitForSelector('[data-testid="product-card"]', { timeout: 10000 });

    await clickInStockProduct(page);

    await page.waitForURL(/\/products\/.+/);
    await page.locator('button:has-text("Add to Cart")').click();

    // Verify toast appears
    const toast = page.locator('[data-sonner-toast]');
    await expect(toast).toBeVisible({ timeout: 3000 });

    // Wait for toast to auto-dismiss (Sonner default is 4 seconds)
    await page.waitForTimeout(5000);

    // Verify toast is no longer visible
    await expect(toast).not.toBeVisible();
  });
});
