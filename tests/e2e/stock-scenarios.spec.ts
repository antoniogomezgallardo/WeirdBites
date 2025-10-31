import { test, expect } from '@playwright/test';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * E2E Tests for Stock Status Display and Add to Cart Functionality
 *
 * Tests the complete user journey for viewing stock status and
 * attempting to add products to cart based on stock availability
 * and feature flag status.
 *
 * Test Coverage:
 * - Stock badge displays correct status (in stock, low stock, out of stock)
 * - Stock badge has correct styling based on status
 * - Add to cart button disabled when out of stock
 * - Add to cart button shows "Coming Soon" when cart feature not enabled
 * - Accessibility compliance (ARIA attributes, screen reader support)
 */

test.describe('Stock Scenarios (US-002 Slice 2.2)', () => {
  let inStockProductId: string;
  let lowStockProductId: string;
  let outOfStockProductId: string;

  // Setup: Create test products with different stock levels
  test.beforeAll(async () => {
    // Find or create products with specific stock levels for testing
    const products = await prisma.product.findMany({
      take: 3,
      orderBy: { stock: 'desc' },
    });

    if (products.length >= 3) {
      // Update existing products to have specific stock levels
      const [highStock, mediumStock, zeroStock] = products;

      await prisma.product.update({
        where: { id: highStock.id },
        data: { stock: 20 }, // In stock (> 5)
      });
      inStockProductId = highStock.id;

      await prisma.product.update({
        where: { id: mediumStock.id },
        data: { stock: 3 }, // Low stock (<= 5)
      });
      lowStockProductId = mediumStock.id;

      await prisma.product.update({
        where: { id: zeroStock.id },
        data: { stock: 0 }, // Out of stock
      });
      outOfStockProductId = zeroStock.id;
    }

    await prisma.$disconnect();
  });

  test.describe('Stock Badge Display', () => {
    test('should display green "in stock" badge for products with stock > 5', async ({ page }) => {
      // Navigate to product with high stock
      await page.goto(`/products/${inStockProductId}`);

      // Wait for page to load
      await page.waitForLoadState('networkidle');

      // Find stock badge
      const stockBadge = page.locator('[role="status"]').first();
      await expect(stockBadge).toBeVisible();

      // Verify badge shows correct message
      await expect(stockBadge).toContainText(/\d+ in stock/i);

      // Verify badge has green styling (in stock)
      const badgeClasses = await stockBadge.getAttribute('class');
      expect(badgeClasses).toContain('bg-green-100');
      expect(badgeClasses).toContain('text-green-800');

      // Verify accessibility attributes
      expect(await stockBadge.getAttribute('role')).toBe('status');
      expect(await stockBadge.getAttribute('aria-live')).toBe('polite');
    });

    test('should display yellow "low stock" badge for products with stock <= 5', async ({
      page,
    }) => {
      // Navigate to product with low stock
      await page.goto(`/products/${lowStockProductId}`);

      // Wait for page to load
      await page.waitForLoadState('networkidle');

      // Find stock badge
      const stockBadge = page.locator('[role="status"]').first();
      await expect(stockBadge).toBeVisible();

      // Verify badge shows correct message (e.g., "Only 3 left")
      await expect(stockBadge).toContainText(/only \d+ left/i);

      // Verify badge has yellow styling (low stock)
      const badgeClasses = await stockBadge.getAttribute('class');
      expect(badgeClasses).toContain('bg-yellow-100');
      expect(badgeClasses).toContain('text-yellow-800');

      // Verify accessibility attributes
      expect(await stockBadge.getAttribute('role')).toBe('status');
      expect(await stockBadge.getAttribute('aria-live')).toBe('polite');
    });

    test('should display red "out of stock" badge for products with stock = 0', async ({
      page,
    }) => {
      // Navigate to product with no stock
      await page.goto(`/products/${outOfStockProductId}`);

      // Wait for page to load
      await page.waitForLoadState('networkidle');

      // Find stock badge
      const stockBadge = page.locator('[role="status"]').first();
      await expect(stockBadge).toBeVisible();

      // Verify badge shows "Out of stock"
      await expect(stockBadge).toContainText(/out of stock/i);

      // Verify badge has red styling (out of stock)
      const badgeClasses = await stockBadge.getAttribute('class');
      expect(badgeClasses).toContain('bg-red-100');
      expect(badgeClasses).toContain('text-red-800');

      // Verify accessibility attributes
      expect(await stockBadge.getAttribute('role')).toBe('status');
      expect(await stockBadge.getAttribute('aria-live')).toBe('polite');
    });
  });

  test.describe('Add to Cart Button - Out of Stock', () => {
    test('should disable add to cart button when product is out of stock', async ({ page }) => {
      // Navigate to product with no stock
      await page.goto(`/products/${outOfStockProductId}`);

      // Wait for page to load
      await page.waitForLoadState('networkidle');

      // Find add to cart button
      const addToCartButton = page.getByRole('button', { name: /add.*cart/i });
      await expect(addToCartButton).toBeVisible();

      // Verify button shows "Out of stock" text
      await expect(addToCartButton).toContainText(/out of stock/i);

      // Verify button is disabled
      await expect(addToCartButton).toBeDisabled();

      // Verify button has disabled styling
      const buttonClasses = await addToCartButton.getAttribute('class');
      expect(buttonClasses).toContain('opacity-50');
      expect(buttonClasses).toContain('cursor-not-allowed');

      // Verify accessibility attributes
      expect(await addToCartButton.getAttribute('aria-disabled')).toBe('true');
      const ariaLabel = await addToCartButton.getAttribute('aria-label');
      expect(ariaLabel).toContain('out of stock');
    });
  });

  test.describe('Add to Cart Button - Feature Flag', () => {
    test('should show "Coming Soon" when shopping cart feature is not enabled', async ({
      page,
    }) => {
      // Navigate to product with stock available
      await page.goto(`/products/${inStockProductId}`);

      // Wait for page to load
      await page.waitForLoadState('networkidle');

      // Find add to cart button
      const addToCartButton = page.getByRole('button', { name: /add.*cart/i });
      await expect(addToCartButton).toBeVisible();

      // Verify button shows "Coming Soon" text (since shoppingCart feature flag is false)
      await expect(addToCartButton).toContainText(/coming soon/i);

      // Verify button is disabled
      await expect(addToCartButton).toBeDisabled();

      // Verify button has disabled styling
      const buttonClasses = await addToCartButton.getAttribute('class');
      expect(buttonClasses).toContain('opacity-50');
      expect(buttonClasses).toContain('cursor-not-allowed');

      // Verify accessibility attributes
      expect(await addToCartButton.getAttribute('aria-disabled')).toBe('true');
      const ariaLabel = await addToCartButton.getAttribute('aria-label');
      expect(ariaLabel).toContain('coming soon');
    });
  });

  test.describe('Stock Badge and Button Integration', () => {
    test('should display both stock badge and add to cart button on product detail page', async ({
      page,
    }) => {
      // Navigate to any product
      await page.goto(`/products/${inStockProductId}`);

      // Wait for page to load
      await page.waitForLoadState('networkidle');

      // Verify both components are present
      const stockBadge = page.locator('[role="status"]').first();
      const addToCartButton = page.getByRole('button', { name: /add.*cart/i });

      await expect(stockBadge).toBeVisible();
      await expect(addToCartButton).toBeVisible();

      // Verify they appear in correct order (stock badge before button)
      const stockBadgeBox = await stockBadge.boundingBox();
      const buttonBox = await addToCartButton.boundingBox();

      expect(stockBadgeBox).not.toBeNull();
      expect(buttonBox).not.toBeNull();

      // Stock badge should appear before (above or left of) add to cart button
      // This assumes vertical layout where Y position matters
      expect(stockBadgeBox!.y).toBeLessThan(buttonBox!.y);
    });

    test('should maintain consistent stock information between badge and button', async ({
      page,
    }) => {
      // Find an actually out of stock product in real-time
      const prisma = new PrismaClient();
      const outOfStockProduct = await prisma.product.findFirst({
        where: { stock: 0 },
      });
      await prisma.$disconnect();

      // Skip if no out of stock products exist
      if (!outOfStockProduct) {
        test.skip();
        return;
      }

      // Test with out of stock product
      await page.goto(`/products/${outOfStockProduct.id}`);
      await page.waitForLoadState('networkidle');

      // Both should indicate out of stock
      const stockBadge = page.locator('[role="status"]').first();
      const addToCartButton = page.getByRole('button', { name: /add.*cart/i });

      await expect(stockBadge).toContainText(/out of stock/i);
      await expect(addToCartButton).toContainText(/out of stock/i);
      await expect(addToCartButton).toBeDisabled();
    });
  });

  test.describe('Responsive Stock Display', () => {
    test('should display stock badge and button correctly on mobile', async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });

      // Navigate to product with faster wait strategy
      await page.goto(`/products/${inStockProductId}`, { waitUntil: 'domcontentloaded' });
      await page.waitForLoadState('networkidle', { timeout: 10000 });

      // Verify components are visible on mobile
      const stockBadge = page.locator('[role="status"]').first();
      const addToCartButton = page.getByRole('button', { name: /add.*cart/i });

      await expect(stockBadge).toBeVisible();
      await expect(addToCartButton).toBeVisible();

      // Verify button is full width on mobile
      const buttonBox = await addToCartButton.boundingBox();
      expect(buttonBox).not.toBeNull();

      // Button should take up most of the viewport width (accounting for padding)
      const viewportWidth = page.viewportSize()!.width;
      expect(buttonBox!.width).toBeGreaterThan(viewportWidth * 0.85); // At least 85% of viewport
    });

    test('should display stock badge and button correctly on tablet', async ({ page }) => {
      // Set tablet viewport
      await page.setViewportSize({ width: 768, height: 1024 });

      // Navigate to product
      await page.goto(`/products/${lowStockProductId}`);
      await page.waitForLoadState('networkidle');

      // Verify components are visible on tablet
      const stockBadge = page.locator('[role="status"]').first();
      const addToCartButton = page.getByRole('button', { name: /add.*cart/i });

      await expect(stockBadge).toBeVisible();
      await expect(addToCartButton).toBeVisible();

      // Verify low stock badge is visible with correct styling
      await expect(stockBadge).toContainText(/only \d+ left/i);
      const badgeClasses = await stockBadge.getAttribute('class');
      expect(badgeClasses).toContain('bg-yellow-100');
    });

    test('should display stock badge and button correctly on desktop', async ({ page }) => {
      // Set desktop viewport
      await page.setViewportSize({ width: 1920, height: 1080 });

      // Find a product with high stock for this test
      const prisma = new PrismaClient();
      const productWithStock = await prisma.product.findFirst({
        where: { stock: { gt: 5 } },
      });
      await prisma.$disconnect();

      // Skip test if no product with stock > 5 exists
      if (!productWithStock) {
        test.skip();
        return;
      }

      // Navigate to product
      await page.goto(`/products/${productWithStock.id}`);
      await page.waitForLoadState('networkidle');

      // Verify components are visible on desktop
      const stockBadge = page.locator('[role="status"]').first();
      const addToCartButton = page.getByRole('button', { name: /add.*cart/i });

      await expect(stockBadge).toBeVisible();
      await expect(addToCartButton).toBeVisible();

      // Verify in stock badge is visible with correct styling
      await expect(stockBadge).toContainText(/\d+ in stock/i);
      const badgeClasses = await stockBadge.getAttribute('class');
      expect(badgeClasses).toContain('bg-green-100');
    });
  });
});
