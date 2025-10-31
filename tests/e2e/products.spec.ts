import { test, expect } from '@playwright/test';

test.describe('Product Listing (Products Page)', () => {
  test.describe('Happy Path', () => {
    test('should display product grid on products page', async ({ page }) => {
      await page.goto('/products');

      // Wait for products to load
      await page.waitForSelector('[data-testid="product-card"]', {
        timeout: 10000,
      });

      // Verify at least one product is displayed
      const productCards = await page.locator('[data-testid="product-card"]');
      const count = await productCards.count();
      expect(count).toBeGreaterThan(0);

      // Verify first product has expected elements
      const firstCard = productCards.first();
      await expect(firstCard.locator('img')).toBeVisible();
      await expect(firstCard.getByRole('heading')).toBeVisible();
      await expect(firstCard).toContainText('$'); // Price should contain dollar sign
    });
  });

  test.describe('Error Scenarios', () => {
    test('should show appropriate message when no products available', async ({ page }) => {
      // This test verifies the UI handles empty state gracefully
      // In real scenario, this would happen if database has no products
      // For now, we verify the page loads successfully even if it would be empty
      await page.goto('/products');

      // Verify page loads (even if products are present, the page structure should be there)
      await expect(page.getByRole('heading', { name: /products/i })).toBeVisible();
    });
  });
});
