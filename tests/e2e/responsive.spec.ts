import { test, expect } from '@playwright/test';

test.describe('Responsive Layout Tests', () => {
  test.describe('Happy Path', () => {
    test('product grid displays 1 column on mobile (375px)', async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/products');

      // Wait for products to load
      await page.waitForSelector('[data-testid="product-card"]');

      // Get all product cards
      const productCards = await page.locator('[data-testid="product-card"]').all();

      // Should have products (at least 1 on first page)
      expect(productCards.length).toBeGreaterThan(0);

      // Verify grid has 1-column class
      const grid = page.locator('.grid').first();
      await expect(grid).toHaveClass(/grid-cols-1/);
    });

    test('product grid displays 2 columns on tablet (768px)', async ({ page }) => {
      // Set tablet viewport
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto('/products');

      // Wait for products to load
      await page.waitForSelector('[data-testid="product-card"]');

      // Verify grid has 2-column class at sm breakpoint
      const grid = page.locator('.grid').first();
      await expect(grid).toHaveClass(/sm:grid-cols-2/);
    });

    test('product grid displays 3 columns on desktop (1024px)', async ({ page }) => {
      // Set desktop viewport
      await page.setViewportSize({ width: 1024, height: 768 });
      await page.goto('/products');

      // Wait for products to load
      await page.waitForSelector('[data-testid="product-card"]');

      // Verify grid has 3-column class at lg breakpoint
      const grid = page.locator('.grid').first();
      await expect(grid).toHaveClass(/lg:grid-cols-3/);
    });

    test('product grid displays 4 columns on large desktop (1440px)', async ({ page }) => {
      // Set large desktop viewport
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto('/products');

      // Wait for products to load
      await page.waitForSelector('[data-testid="product-card"]');

      // Verify grid has 4-column class at xl breakpoint
      const grid = page.locator('.grid').first();
      await expect(grid).toHaveClass(/xl:grid-cols-4/);
    });
  });
});
