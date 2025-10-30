import { test, expect } from '@playwright/test';

test.describe('Product Detail Page', () => {
  test.describe('Navigation', () => {
    test('should navigate to product detail page when clicking product card', async ({ page }) => {
      // Navigate to products page
      await page.goto('/products');

      // Wait for products to load
      await page.waitForSelector('[data-testid="product-card"]', {
        timeout: 5000,
      });

      // Get the first product card
      const firstProductCard = page.locator('[data-testid="product-card"]').first();

      // Get the product name from the card before clicking
      const productName = await firstProductCard
        .locator('[data-testid="product-name"]')
        .textContent();

      // Click the product card
      await firstProductCard.click();

      // Wait for navigation to complete
      await page.waitForURL(/\/products\/[a-zA-Z0-9_-]+/);

      // Verify we're on the product detail page
      expect(page.url()).toMatch(/\/products\/[a-zA-Z0-9_-]+/);

      // Verify the product name is displayed on the detail page
      await expect(page.locator('h1')).toContainText(productName || '');
    });

    test('should display correct product information on detail page', async ({ page }) => {
      // Navigate to products page
      await page.goto('/products');

      // Wait for products to load
      await page.waitForSelector('[data-testid="product-card"]', {
        timeout: 5000,
      });

      // Get the first product card
      const firstProductCard = page.locator('[data-testid="product-card"]').first();

      // Get product information before clicking
      const productName = await firstProductCard
        .locator('[data-testid="product-name"]')
        .textContent();
      const productPrice = await firstProductCard
        .locator('[data-testid="product-price"]')
        .textContent();

      // Click to navigate to detail page
      await firstProductCard.click();

      // Wait for detail page to load
      await page.waitForURL(/\/products\/[a-zA-Z0-9_-]+/);

      // Verify product name is displayed
      await expect(page.locator('h1')).toContainText(productName || '');

      // Verify product price is displayed
      await expect(page.getByText(productPrice || '')).toBeVisible();

      // Verify product image is displayed
      const productImage = page.locator('img').first();
      await expect(productImage).toBeVisible();
      await expect(productImage).toHaveAttribute('alt', productName || '');

      // Verify category and origin sections exist
      await expect(page.getByText('Category:')).toBeVisible();
      await expect(page.getByText('Origin:')).toBeVisible();

      // Verify description section exists
      await expect(page.getByText('Description')).toBeVisible();
    });
  });
});
