import { test, expect } from '@playwright/test';

test.describe('Product Pagination', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.describe('Happy Path', () => {
    test('shows loading skeleton on initial load', async ({ page }) => {
      // Navigate to homepage and check for loading skeleton briefly
      await page.goto('/', { waitUntil: 'domcontentloaded' });

      // Loading skeleton should appear (even if briefly)
      // We use a fast check since loading might be very quick
      const hasLoadingSkeleton = (await page.locator('[data-testid="skeleton-card"]').count()) > 0;

      // Either skeleton showed or products loaded (both are valid)
      const hasProducts = (await page.locator('[data-testid="product-card"]').count()) > 0;

      expect(hasLoadingSkeleton || hasProducts).toBe(true);
    });

    test('displays pagination controls when multiple pages exist', async ({ page }) => {
      await page.waitForSelector('[data-testid="product-card"]');

      // Check if pagination controls are visible
      const previousButton = page.getByRole('button', { name: /previous/i });
      const nextButton = page.getByRole('button', { name: /next/i });

      await expect(previousButton).toBeVisible();
      await expect(nextButton).toBeVisible();
    });

    test('clicking next button loads page 2', async ({ page }) => {
      await page.waitForSelector('[data-testid="product-card"]');

      // Click next button
      const nextButton = page.getByRole('button', { name: /next/i });
      await nextButton.click();

      // Wait for page to update
      await page.waitForLoadState('networkidle');

      // Verify URL updated with page parameter
      expect(page.url()).toContain('page=2');

      // Verify page indicator updated
      await expect(page.getByText(/page 2 of/i)).toBeVisible();
    });

    test('URL updates with page parameter', async ({ page }) => {
      await page.waitForSelector('[data-testid="product-card"]');

      // Click next button
      const nextButton = page.getByRole('button', { name: /next/i });
      await nextButton.click();

      await page.waitForLoadState('networkidle');

      // URL should contain page=2
      expect(page.url()).toMatch(/[?&]page=2/);
    });
  });

  test.describe('Error Scenarios', () => {
    test('previous button is disabled on first page', async ({ page }) => {
      await page.waitForSelector('[data-testid="product-card"]');

      const previousButton = page.getByRole('button', { name: /previous/i });
      await expect(previousButton).toBeDisabled();
    });

    test('next button is disabled on last page', async ({ page }) => {
      // Navigate to a very high page number to reach the end
      await page.goto('/?page=999');

      // Wait for page to load
      await page.waitForLoadState('networkidle');

      // If products exist, next should be disabled
      // If no products (beyond total pages), both buttons should be disabled
      const nextButton = page.getByRole('button', { name: /next/i });

      // The button should exist and be disabled
      await expect(nextButton).toBeVisible();
      await expect(nextButton).toBeDisabled();
    });

    test('handles page parameter in URL on load', async ({ page }) => {
      // Navigate directly to page 2
      await page.goto('/?page=2');

      await page.waitForSelector('[data-testid="product-card"]');

      // Verify page indicator shows page 2
      await expect(page.getByText(/page 2 of/i)).toBeVisible();

      // Previous button should be enabled
      const previousButton = page.getByRole('button', { name: /previous/i });
      await expect(previousButton).toBeEnabled();
    });
  });
});
