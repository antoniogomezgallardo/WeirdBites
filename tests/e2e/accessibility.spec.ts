import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';

test.describe('Accessibility Tests', () => {
  test.describe('Happy Path', () => {
    test('homepage passes axe-core accessibility scan', async ({ page }) => {
      await page.goto('/');

      // Wait for page to be fully loaded
      await page.waitForSelector('[data-testid="product-card"]');

      // Inject axe-core
      await injectAxe(page);

      // Run axe accessibility scan (will throw if violations found)
      await checkA11y(page);
    });

    test('all product images have descriptive alt text', async ({ page }) => {
      await page.goto('/');

      // Wait for products to load
      await page.waitForSelector('[data-testid="product-card"]');

      // Get all images
      const images = await page.locator('img').all();

      // Verify each image has alt text
      for (const image of images) {
        const alt = await image.getAttribute('alt');
        expect(alt).not.toBeNull();
        expect(alt).not.toBe('');
        expect(alt!.length).toBeGreaterThan(0);
      }
    });
  });

  test.describe('Error Scenarios', () => {
    test('error messages are properly announced to screen readers', async ({ page }) => {
      // Navigate to a page that triggers an error (e.g., page beyond total pages)
      await page.goto('/?page=9999');

      // Wait for page to load
      await page.waitForLoadState('networkidle');

      // If there's an empty state or error message, it should have proper ARIA
      const errorElements = await page
        .locator('[role="status"], [role="alert"], [aria-live]')
        .all();

      // At least one element should exist for screen readers
      expect(errorElements.length).toBeGreaterThan(0);
    });
  });
});
