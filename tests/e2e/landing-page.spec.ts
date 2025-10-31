import { test, expect } from '@playwright/test';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

test.describe('Landing Page (IS-013)', () => {
  test.beforeAll(async () => {
    // Ensure we have featured products for testing
    const featuredCount = await prisma.product.count({
      where: { isFeatured: true },
    });

    if (featuredCount === 0) {
      // Mark first 6 products as featured
      const products = await prisma.product.findMany({ take: 6 });
      await Promise.all(
        products.map(p =>
          prisma.product.update({ where: { id: p.id }, data: { isFeatured: true } })
        )
      );
    }
    await prisma.$disconnect();
  });

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

  test.describe('Featured Products Section (IS-013 Slice 13.2)', () => {
    test('should display featured products section heading', async ({ page }) => {
      await page.goto('/');

      const heading = page.getByRole('heading', { name: /featured snacks/i, level: 2 });
      await expect(heading).toBeVisible();
    });

    test('should display featured products section subheading', async ({ page }) => {
      await page.goto('/');

      const subheading = page.getByText(
        /handpicked weird and wonderful snacks from around the world/i
      );
      await expect(subheading).toBeVisible();
    });

    test('should display featured product cards', async ({ page }) => {
      await page.goto('/');

      const productCards = page.locator('[data-testid="featured-product-card"]');
      const count = await productCards.count();

      expect(count).toBeGreaterThan(0);
      expect(count).toBeLessThanOrEqual(6);
    });

    test('should display featured badge on product cards', async ({ page }) => {
      await page.goto('/');

      const featuredBadges = page.getByText('Featured');
      const count = await featuredBadges.count();

      expect(count).toBeGreaterThan(0);
    });

    test('should display product information on cards', async ({ page }) => {
      await page.goto('/');

      const firstCard = page.locator('[data-testid="featured-product-card"]').first();
      await expect(firstCard).toBeVisible();

      // Product should have name (h3)
      await expect(firstCard.locator('h3')).toBeVisible();

      // Product should have price
      await expect(firstCard.getByText(/\$/)).toBeVisible();

      // Product should have image
      await expect(firstCard.locator('img')).toBeVisible();
    });

    test('should display "View All Products" button', async ({ page }) => {
      await page.goto('/');

      const viewAllButton = page.getByRole('link', { name: /view all products/i });
      await expect(viewAllButton).toBeVisible();
      await expect(viewAllButton).toHaveAttribute('href', '/products');
    });

    test('should navigate to products page when clicking "View All Products"', async ({ page }) => {
      await page.goto('/');

      const viewAllButton = page.getByRole('link', { name: /view all products/i });
      await viewAllButton.click();

      await page.waitForURL('/products');
      expect(page.url()).toContain('/products');
    });

    test('should navigate from landing page to product detail via featured card', async ({
      page,
    }) => {
      // 1. Start at landing page
      await page.goto('/');

      // 2. Wait for featured product cards to load
      await page.waitForSelector('[data-testid="featured-product-card"]', { timeout: 10000 });

      // 3. Get the first featured product card
      const firstCard = page.locator('[data-testid="featured-product-card"]').first();
      await expect(firstCard).toBeVisible();

      // 4. Get product name for verification
      const productName = await firstCard.locator('h3').textContent();

      // 5. Click on the featured product card
      await firstCard.click();

      // 6. Verify navigation to product detail page
      await page.waitForURL(/\/products\/[a-z0-9-]+/);
      expect(page.url()).toMatch(/\/products\/[a-z0-9-]+/);

      // 7. Verify product detail page displays correct product
      const detailPageTitle = await page.locator('h1').textContent();
      expect(detailPageTitle).toBe(productName);
    });

    test('should maintain product information across navigation', async ({ page }) => {
      // 1. Start at landing page
      await page.goto('/');

      // 2. Get featured product information
      const firstCard = page.locator('[data-testid="featured-product-card"]').first();
      const productName = await firstCard.locator('h3').textContent();
      const productPrice = await firstCard.getByText(/\$/).textContent();

      // 3. Click product card
      await firstCard.click();

      // 4. Wait for navigation
      await page.waitForURL(/\/products\/[a-z0-9-]+/);

      // 5. Verify product name matches
      const detailPageTitle = await page.locator('h1').textContent();
      expect(detailPageTitle).toBe(productName);

      // 6. Verify price matches
      const detailPagePrice = await page.getByText(/\$/).first().textContent();
      expect(detailPagePrice).toBe(productPrice);
    });

    test('should support browser back navigation from product detail to landing', async ({
      page,
    }) => {
      // 1. Start at landing page
      await page.goto('/');

      // 2. Click featured product
      const firstCard = page.locator('[data-testid="featured-product-card"]').first();
      await firstCard.click();

      // 3. Wait for navigation to product detail
      await page.waitForURL(/\/products\/[a-z0-9-]+/);

      // 4. Go back
      await page.goBack();

      // 5. Verify we're back on landing page
      await page.waitForURL('/');
      expect(page.url()).toMatch(/\/$/);

      // 6. Verify featured products section is visible
      await expect(page.getByRole('heading', { name: /featured snacks/i, level: 2 })).toBeVisible();
    });

    test('should be responsive on mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
      await page.goto('/');

      // Featured products should be visible
      await expect(page.getByRole('heading', { name: /featured snacks/i })).toBeVisible();

      // At least one product card should be visible
      await expect(page.locator('[data-testid="featured-product-card"]').first()).toBeVisible();
    });

    test('should be accessible', async ({ page }) => {
      await page.goto('/');

      const featuredSection = page.getByRole('region', { name: /featured snacks/i });
      await expect(featuredSection).toBeVisible();
    });
  });

  test.describe('Why WeirdBites Section (IS-013 Slice 13.2)', () => {
    test('should display Why WeirdBites section heading', async ({ page }) => {
      await page.goto('/');

      const heading = page.getByRole('heading', { name: /why weirdbites\?/i, level: 2 });
      await expect(heading).toBeVisible();
    });

    test('should display Why WeirdBites tagline', async ({ page }) => {
      await page.goto('/');

      const tagline = page.getByText(/we believe the best way to understand a culture/i);
      await expect(tagline).toBeVisible();

      const secondLine = page.getByText(/experience the world one bite at a time/i);
      await expect(secondLine).toBeVisible();
    });

    test('should display all three feature cards', async ({ page }) => {
      await page.goto('/');

      const featureCards = page.locator('[data-testid="why-weirdbites-feature"]');
      const count = await featureCards.count();

      expect(count).toBe(3);
    });

    test('should display Global Discovery feature', async ({ page }) => {
      await page.goto('/');

      await expect(page.getByText(/global discovery/i)).toBeVisible();
      await expect(page.getByText(/explore unique snacks from over 20 countries/i)).toBeVisible();
    });

    test('should display Quality Guaranteed feature', async ({ page }) => {
      await page.goto('/');

      await expect(page.getByText(/quality guaranteed/i)).toBeVisible();
      await expect(
        page.getByText(/all products are sourced from certified manufacturers/i)
      ).toBeVisible();
    });

    test('should display Fast & Secure Shipping feature', async ({ page }) => {
      await page.goto('/');

      await expect(page.getByText(/fast & secure shipping/i)).toBeVisible();
      await expect(page.getByText(/free shipping on orders over \$50/i)).toBeVisible();
    });

    test('should display trust indicators', async ({ page }) => {
      await page.goto('/');

      await expect(page.getByText(/secure checkout/i)).toBeVisible();
      await expect(page.getByText(/free shipping over \$50/i)).toBeVisible();
      await expect(page.getByText(/30-day returns/i)).toBeVisible();
    });

    test('should display feature icons', async ({ page }) => {
      await page.goto('/');

      // Each feature should have an icon (SVG)
      const featureCards = page.locator('[data-testid="why-weirdbites-feature"]');
      const firstCard = featureCards.first();

      await expect(firstCard.locator('svg')).toBeVisible();
    });

    test('should be responsive on mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
      await page.goto('/');

      // Why WeirdBites should be visible
      await expect(page.getByRole('heading', { name: /why weirdbites\?/i })).toBeVisible();

      // Features should be visible (stacked vertically on mobile)
      await expect(page.locator('[data-testid="why-weirdbites-feature"]').first()).toBeVisible();
    });

    test('should be accessible', async ({ page }) => {
      await page.goto('/');

      const whySection = page.getByRole('region', { name: /why weirdbites\?/i });
      await expect(whySection).toBeVisible();
    });
  });

  test.describe('Complete Landing Page Layout', () => {
    test('should display all sections in correct order', async ({ page }) => {
      await page.goto('/');

      // Get all section headings
      const heroHeading = page.getByRole('heading', {
        name: /discover weird snacks from around the world/i,
      });
      const featuredHeading = page.getByRole('heading', { name: /featured snacks/i, level: 2 });
      const whyHeading = page.getByRole('heading', { name: /why weirdbites\?/i, level: 2 });

      // Verify all are visible
      await expect(heroHeading).toBeVisible();
      await expect(featuredHeading).toBeVisible();
      await expect(whyHeading).toBeVisible();

      // Verify order (Hero → Featured → Why)
      const heroBox = await heroHeading.boundingBox();
      const featuredBox = await featuredHeading.boundingBox();
      const whyBox = await whyHeading.boundingBox();

      expect(heroBox!.y).toBeLessThan(featuredBox!.y);
      expect(featuredBox!.y).toBeLessThan(whyBox!.y);
    });

    test('should load landing page quickly', async ({ page }) => {
      const startTime = Date.now();
      await page.goto('/');
      const loadTime = Date.now() - startTime;

      // Page should load in less than 10 seconds (increased for dynamic rendering)
      // Note: Landing page uses dynamic rendering to fetch featured products at request time
      expect(loadTime).toBeLessThan(10000);
    });

    test('should be fully responsive', async ({ page }) => {
      test.setTimeout(90000); // Increased timeout for dynamic rendering with multiple viewports

      const viewports = [
        { width: 375, height: 667, name: 'mobile' }, // iPhone SE
        { width: 768, height: 1024, name: 'tablet' }, // iPad
        { width: 1920, height: 1080, name: 'desktop' }, // Full HD
      ];

      for (const viewport of viewports) {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.goto('/');

        // All sections should be visible on all viewports
        await expect(
          page.getByRole('heading', { name: /discover weird snacks from around the world/i })
        ).toBeVisible();
        await expect(page.getByRole('heading', { name: /featured snacks/i })).toBeVisible();
        await expect(page.getByRole('heading', { name: /why weirdbites\?/i })).toBeVisible();
      }
    });
  });
});
