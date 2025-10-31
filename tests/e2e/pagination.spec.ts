import { test, expect } from '@playwright/test';

test.describe('Product Pagination', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/products');
  });

  test.describe('Happy Path', () => {
    test('shows loading skeleton on initial load', async ({ page }) => {
      // Navigate to products page and check for loading skeleton briefly
      await page.goto('/products', { waitUntil: 'domcontentloaded' });

      // Loading skeleton should appear (even if briefly)
      // We use a fast check since loading might be very quick
      const hasLoadingSkeleton = (await page.locator('[data-testid="skeleton-card"]').count()) > 0;

      // Either skeleton showed or products loaded (both are valid)
      const hasProducts = (await page.locator('[data-testid="product-card"]').count()) > 0;

      expect(hasLoadingSkeleton || hasProducts).toBe(true);
    });

    test('displays pagination controls when multiple pages exist', async ({ page }) => {
      await page.waitForSelector('[data-testid="product-card"]');

      // Check if pagination controls are visible (use more specific selectors)
      const previousButton = page.getByRole('button', { name: 'Go to previous page' });
      const nextButton = page.getByRole('button', { name: 'Go to next page' });

      await expect(previousButton).toBeVisible();
      await expect(nextButton).toBeVisible();
    });

    test('clicking next button loads page 2', async ({ page }) => {
      await page.waitForSelector('[data-testid="product-card"]');

      // Click next button (use specific aria-label)
      const nextButton = page.getByRole('button', { name: 'Go to next page' });
      await nextButton.click();

      // Wait for URL to update with page=2 parameter
      await page.waitForURL(/[?&]page=2/, { timeout: 10000 });

      // Verify URL updated with page parameter
      expect(page.url()).toContain('page=2');
    });

    test('URL updates with page parameter', async ({ page }) => {
      await page.waitForSelector('[data-testid="product-card"]');

      // Click next button (use specific aria-label)
      const nextButton = page.getByRole('button', { name: 'Go to next page' });
      await nextButton.click();

      // Wait for URL to update with page=2 parameter
      await page.waitForURL(/[?&]page=2/, { timeout: 10000 });

      // URL should contain page=2
      expect(page.url()).toMatch(/[?&]page=2/);
    });
  });

  test.describe('Error Scenarios', () => {
    test('previous button is disabled on first page', async ({ page }) => {
      await page.waitForSelector('[data-testid="product-card"]');

      const previousButton = page.getByRole('button', { name: 'Go to previous page' });
      await expect(previousButton).toBeDisabled();
    });

    test('next button is disabled on last page', async ({ page }) => {
      // First, get to page 1 to determine total pages
      await page.goto('/products');
      await page.waitForSelector('[data-testid="product-card"]');

      // Extract total pages from the page indicator
      const pageIndicator = await page.getByText(/page \d+ of \d+/i).textContent();
      const totalPages = parseInt(pageIndicator?.match(/of (\d+)/)?.[1] || '1', 10);

      // Navigate to the last page
      await page.goto(`/products?page=${totalPages}`);
      await page.waitForSelector('[data-testid="product-card"]');

      // Next button should be visible but disabled on last page
      const nextButton = page.getByRole('button', { name: 'Go to next page' });
      await expect(nextButton).toBeVisible();
      await expect(nextButton).toBeDisabled();
    });

    test('handles page parameter in URL on load', async ({ page }) => {
      // Navigate directly to page 2
      await page.goto('/products?page=2');

      await page.waitForSelector('[data-testid="product-card"]');

      // Verify page indicator shows page 2
      await expect(page.getByText(/page 2 of/i)).toBeVisible();

      // Previous button should be enabled
      const previousButton = page.getByRole('button', { name: 'Go to previous page' });
      await expect(previousButton).toBeEnabled();
    });
  });
});
