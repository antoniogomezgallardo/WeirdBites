import { test, expect } from '@playwright/test';

test.describe('Landing Page (IS-013)', () => {
  test.describe('Hero Section', () => {
    test('should display hero content on homepage', async ({ page }) => {
      // Navigate to homepage
      await page.goto('/');

      // Verify hero headline is visible
      const headline = page.getByRole('heading', { level: 1 });
      await expect(headline).toBeVisible();
      await expect(headline).toContainText('Discover');
      await expect(headline).toContainText('Weird Snacks');

      // Verify subheading is visible
      await expect(page.getByText(/unusual snacks from around the world/i)).toBeVisible();

      // Verify CTA button is visible
      const ctaButton = page.getByRole('link', { name: /browse products/i });
      await expect(ctaButton).toBeVisible();

      // Verify hero image is visible
      const heroImage = page.locator('img').first();
      await expect(heroImage).toBeVisible();
    });

    test('should navigate to products page when CTA button is clicked', async ({ page }) => {
      // Navigate to homepage
      await page.goto('/');

      // Click the CTA button
      const ctaButton = page.getByRole('link', { name: /browse products/i });
      await ctaButton.click();

      // Wait for navigation to /products
      await page.waitForURL(/\/products/);

      // Verify we're on the products page
      expect(page.url()).toContain('/products');

      // Verify products page loaded (should see product cards)
      await expect(page.locator('[data-testid="product-card"]').first()).toBeVisible();
    });

    test('should have accessible hero section', async ({ page }) => {
      // Navigate to homepage
      await page.goto('/');

      // Verify hero section has proper semantic HTML
      const heroSection = page.getByRole('region', { name: /hero section/i });
      await expect(heroSection).toBeVisible();

      // Verify heading hierarchy
      const h1 = page.getByRole('heading', { level: 1 });
      await expect(h1).toBeVisible();

      // Verify CTA button has sufficient size for touch targets (min 44x44px)
      const ctaButton = page.getByRole('link', { name: /browse products/i });
      const buttonBox = await ctaButton.boundingBox();
      expect(buttonBox?.height).toBeGreaterThanOrEqual(44);

      // Verify hero image has alt text
      const heroImage = page.locator('img').first();
      const altText = await heroImage.getAttribute('alt');
      expect(altText).toBeTruthy();
      expect(altText?.length).toBeGreaterThan(10);
    });

    test('should be responsive on mobile viewport', async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });

      // Navigate to homepage
      await page.goto('/');

      // Verify hero content is visible on mobile
      const headline = page.getByRole('heading', { level: 1 });
      await expect(headline).toBeVisible();

      const ctaButton = page.getByRole('link', { name: /browse products/i });
      await expect(ctaButton).toBeVisible();

      // Verify CTA button is still accessible on mobile
      const buttonBox = await ctaButton.boundingBox();
      expect(buttonBox?.height).toBeGreaterThanOrEqual(44);
    });

    test('should be responsive on tablet viewport', async ({ page }) => {
      // Set tablet viewport
      await page.setViewportSize({ width: 768, height: 1024 });

      // Navigate to homepage
      await page.goto('/');

      // Verify hero content is visible on tablet
      const headline = page.getByRole('heading', { level: 1 });
      await expect(headline).toBeVisible();

      const heroImage = page.locator('img').first();
      await expect(heroImage).toBeVisible();

      const ctaButton = page.getByRole('link', { name: /browse products/i });
      await expect(ctaButton).toBeVisible();
    });

    test('should maintain browser navigation after CTA click', async ({ page }) => {
      // Navigate to homepage
      await page.goto('/');

      // Click CTA to go to products
      await page.getByRole('link', { name: /browse products/i }).click();
      await page.waitForURL(/\/products/);

      // Verify we're on products page
      expect(page.url()).toContain('/products');

      // Go back to homepage
      await page.goBack();
      await page.waitForURL(/^(?!.*\/products)/);

      // Verify we're back on homepage (should see hero heading)
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      await expect(page.getByRole('heading', { level: 1 })).toContainText('Weird Snacks');

      // Go forward to products page
      await page.goForward();
      await page.waitForURL(/\/products/);

      // Verify we're back on products page
      await expect(page.locator('[data-testid="product-card"]').first()).toBeVisible();
    });
  });
});
