/**
 * E2E Tests for Category Filter (US-003)
 *
 * Tests the complete user journey for filtering products by category.
 *
 * Test Coverage:
 * - Category filter buttons display with counts
 * - Clicking category filters products
 * - URL updates with ?category= query param
 * - "All Products" button clears filter
 * - Products update correctly when filtered
 * - Accessibility (keyboard navigation, ARIA attributes)
 */

import { test, expect } from '@playwright/test';

test.describe('Category Filter (US-003)', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to products page
    await page.goto('/products');
    await page.waitForLoadState('networkidle');
  });

  test.describe('Category Filter Display', () => {
    test('should display category filter with "All Products" and category buttons', async ({
      page,
    }) => {
      // Find category filter section
      const categoryFilter = page.locator('[role="group"][aria-label*="Filter products"]');
      await expect(categoryFilter).toBeVisible();

      // "All Products" button should be visible
      const allProductsButton = page.getByRole('button', { name: /all products/i });
      await expect(allProductsButton).toBeVisible();

      // At least one category button should be visible
      const categoryButtons = page.getByRole('button').filter({ hasText: /\(\d+\)/ });
      await expect(categoryButtons.first()).toBeVisible();
    });

    test('should display category buttons with product counts', async ({ page }) => {
      // Check that category buttons show counts in format: "Category (count)"
      const categoryButtons = page.getByRole('button').filter({ hasText: /\w+\s*\(\d+\)/ });
      const buttonCount = await categoryButtons.count();

      expect(buttonCount).toBeGreaterThan(0);

      // Verify each button has the correct format
      for (let i = 0; i < buttonCount; i++) {
        const buttonText = await categoryButtons.nth(i).textContent();
        expect(buttonText).toMatch(/\w+\s*\(\d+\)/); // e.g., "Snacks (5)" or "Chocolate (2)"
      }
    });

    test('should highlight "All Products" by default', async ({ page }) => {
      const allProductsButton = page.getByRole('button', { name: /all products/i });

      // Active button should have green background
      await expect(allProductsButton).toHaveClass(/bg-green-700/);
    });
  });

  test.describe('Category Filtering', () => {
    test('should filter products when clicking a category button', async ({ page }) => {
      // Get initial product count
      const initialProducts = page.locator('[data-testid="product-card"]');
      const initialCount = await initialProducts.count();

      // Find and click a category button (not "All Products")
      const categoryButton = page
        .getByRole('button')
        .filter({ hasText: /\w+\s*\(\d+\)/ })
        .first();
      const categoryText = await categoryButton.textContent();
      const categoryName = categoryText?.match(/^(\w+)\s*\(/)?.[1] || '';

      await categoryButton.click();

      // Wait for URL to update (Next.js client-side navigation)
      await page.waitForURL(`**/products?category=${categoryName}`, { waitUntil: 'networkidle' });

      // URL should update with ?category= param
      expect(page.url()).toContain(`?category=${categoryName}`);

      // Category button should now be highlighted
      await expect(categoryButton).toHaveClass(/bg-green-700/);

      // "All Products" should not be highlighted
      const allProductsButton = page.getByRole('button', { name: /all products/i });
      await expect(allProductsButton).toHaveClass(/bg-white/);

      // Products should be visible (filtered products)
      const filteredProducts = page.locator('[data-testid="product-card"]');
      await expect(filteredProducts.first()).toBeVisible();

      // Product count may be different than initial (depending on category)
      const filteredCount = await filteredProducts.count();
      expect(filteredCount).toBeGreaterThan(0);
      expect(filteredCount).toBeLessThanOrEqual(initialCount);
    });

    test('should clear filter when clicking "All Products"', async ({ page }) => {
      // First, filter by a category
      const categoryButton = page
        .getByRole('button')
        .filter({ hasText: /\w+\s*\(\d+\)/ })
        .first();
      const categoryText = await categoryButton.textContent();
      const categoryName = categoryText?.match(/^(\w+)\s*\(/)?.[1] || '';

      await categoryButton.click();

      // Wait for URL to update (Next.js client-side navigation)
      await page.waitForURL(`**/products?category=${categoryName}`, { waitUntil: 'networkidle' });

      // Verify we're filtered
      expect(page.url()).toContain('?category=');

      // Click "All Products" to clear filter
      const allProductsButton = page.getByRole('button', { name: /all products/i });
      await allProductsButton.click();

      // Wait for URL to update (Next.js client-side navigation)
      await page.waitForURL('**/products', { waitUntil: 'networkidle' });

      // URL should not have category param
      expect(page.url()).not.toContain('?category=');

      // "All Products" should be highlighted
      await expect(allProductsButton).toHaveClass(/bg-green-700/);

      // Category button should not be highlighted
      await expect(categoryButton).toHaveClass(/bg-white/);

      // All products should be visible again
      const allProducts = page.locator('[data-testid="product-card"]');
      await expect(allProducts.first()).toBeVisible();
    });

    test('should maintain filter state on page reload', async ({ page }) => {
      // Filter by a category
      const categoryButton = page
        .getByRole('button')
        .filter({ hasText: /\w+\s*\(\d+\)/ })
        .first();
      const categoryText = await categoryButton.textContent();
      const categoryName = categoryText?.match(/^(\w+)\s*\(/)?.[1] || '';

      await categoryButton.click();

      // Wait for URL to update (Next.js client-side navigation)
      await page.waitForURL(`**/products?category=${categoryName}`, { waitUntil: 'networkidle' });

      const urlBeforeReload = page.url();

      // Reload the page
      await page.reload({ waitUntil: 'load' });
      // Wait for category button to be visible (more reliable than networkidle)
      await page
        .getByRole('button', { name: new RegExp(categoryName, 'i') })
        .waitFor({ state: 'visible', timeout: 10000 });

      // URL should still have category param
      expect(page.url()).toBe(urlBeforeReload);
      expect(page.url()).toContain(`?category=${categoryName}`);

      // Category button should still be highlighted
      await expect(categoryButton).toHaveClass(/bg-green-700/);
    });
  });

  test.describe('User Interactions', () => {
    test('should support keyboard navigation (Focus + Enter)', async ({ page }) => {
      // Focus on a category button directly
      const categoryButton = page
        .getByRole('button')
        .filter({ hasText: /\w+\s*\(\d+\)/ })
        .first();
      const categoryText = await categoryButton.textContent();
      const categoryName = categoryText?.match(/^(\w+)\s*\(/)?.[1] || '';

      await categoryButton.focus();

      // Verify button is focused
      const focusedElement = page.locator(':focus');
      await expect(focusedElement).toHaveAttribute('type', 'button');

      // Press Enter to activate
      await page.keyboard.press('Enter');

      // Wait for URL to update (Next.js client-side navigation)
      await page.waitForURL(`**/products?category=${categoryName}`, { waitUntil: 'networkidle' });

      // URL should have category param
      expect(page.url()).toContain(`?category=${categoryName}`);
    });

    test('should update product list immediately after category selection', async ({ page }) => {
      // Click a category
      const categoryButton = page
        .getByRole('button')
        .filter({ hasText: /\w+\s*\(\d+\)/ })
        .first();
      const categoryText = await categoryButton.textContent();
      const categoryName = categoryText?.match(/^(\w+)\s*\(/)?.[1] || '';

      await categoryButton.click();

      // Wait for URL to update and page to re-render (Next.js client-side navigation)
      await page.waitForURL(`**/products?category=${categoryName}`, { waitUntil: 'networkidle' });

      // Products should be visible after filtering
      const products = page.locator('[data-testid="product-card"]');
      await expect(products.first()).toBeVisible({ timeout: 5000 });
    });
  });

  test.describe('Accessibility', () => {
    test('should have proper ARIA attributes on category filter', async ({ page }) => {
      const categoryFilter = page.locator('[role="group"][aria-label*="Filter products"]');
      await expect(categoryFilter).toBeVisible();

      // Should have aria-label
      const ariaLabel = await categoryFilter.getAttribute('aria-label');
      expect(ariaLabel).toContain('Filter products');
    });

    test('should have aria-pressed on category buttons', async ({ page }) => {
      // "All Products" should have aria-pressed="true" initially
      const allProductsButton = page.getByRole('button', { name: /all products/i });
      await expect(allProductsButton).toHaveAttribute('aria-pressed', 'true');

      // Category buttons should have aria-pressed="false" initially
      const categoryButton = page
        .getByRole('button')
        .filter({ hasText: /\w+\s*\(\d+\)/ })
        .first();
      await expect(categoryButton).toHaveAttribute('aria-pressed', 'false');

      // After clicking, aria-pressed should update
      const categoryText = await categoryButton.textContent();
      const categoryName = categoryText?.match(/^(\w+)\s*\(/)?.[1] || '';

      await categoryButton.click();

      // Wait for URL to update (Next.js client-side navigation)
      await page.waitForURL(`**/products?category=${categoryName}`, { waitUntil: 'networkidle' });

      await expect(categoryButton).toHaveAttribute('aria-pressed', 'true');
    });

    test('should have descriptive aria-label for category buttons', async ({ page }) => {
      const categoryButton = page
        .getByRole('button')
        .filter({ hasText: /\w+\s*\(\d+\)/ })
        .first();
      const ariaLabel = await categoryButton.getAttribute('aria-label');

      // Should include category name and product count
      expect(ariaLabel).toMatch(/\w+.*\d+.*products/i);
    });
  });

  test.describe('Edge Cases', () => {
    test('should handle direct navigation to filtered URL', async ({ page }) => {
      // Navigate directly to a filtered URL
      await page.goto('/products?category=Snacks');
      await page.waitForLoadState('networkidle');

      // Category filter should reflect the selected category
      const snacksButton = page.getByRole('button', { name: /snacks/i });
      await expect(snacksButton).toHaveClass(/bg-green-700/);

      // Products should be filtered
      const products = page.locator('[data-testid="product-card"]');
      await expect(products.first()).toBeVisible();
    });

    test('should handle invalid category gracefully', async ({ page }) => {
      // Navigate to URL with invalid category
      await page.goto('/products?category=InvalidCategory123');
      await page.waitForLoadState('networkidle');

      // Page should still load (even if no products match)
      const categoryFilter = page.locator('[role="group"][aria-label*="Filter products"]');
      await expect(categoryFilter).toBeVisible();

      // "All Products" should not be highlighted (invalid category selected)
      const allProductsButton = page.getByRole('button', { name: /all products/i });
      await expect(allProductsButton).toHaveClass(/bg-white/);
    });

    test('should handle rapid category switching', async ({ page }) => {
      // Get multiple category buttons
      const categoryButtons = page.getByRole('button').filter({ hasText: /\w+\s*\(\d+\)/ });
      const buttonCount = Math.min(await categoryButtons.count(), 3);

      // Rapidly click different categories
      for (let i = 0; i < buttonCount; i++) {
        await categoryButtons.nth(i).click();
        // Don't wait for networkidle - test rapid switching
      }

      // Wait for final state to settle
      await page.waitForLoadState('networkidle');

      // Last clicked button should be highlighted
      await expect(categoryButtons.nth(buttonCount - 1)).toHaveClass(/bg-green-700/);

      // Products should be visible
      const products = page.locator('[data-testid="product-card"]');
      await expect(products.first()).toBeVisible();
    });
  });
});
