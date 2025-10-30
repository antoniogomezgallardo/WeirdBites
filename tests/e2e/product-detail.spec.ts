import { test, expect } from '@playwright/test';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

test.describe('Product Detail Page', () => {
  let testProductId: string;

  // Get a real product ID before tests
  test.beforeAll(async () => {
    const product = await prisma.product.findFirst();
    if (product) {
      testProductId = product.id;
    }
    await prisma.$disconnect();
  });

  /**
   * User Journey Tests
   *
   * These tests validate complete user flows, simulating real user behavior.
   * They test the full journey from browsing products to viewing details.
   *
   * Purpose: Catch integration issues between pages and verify real-world usage patterns.
   */
  test.describe('User Journey: Browse to Detail', () => {
    test('should navigate from products page to product detail via card click', async ({
      page,
    }) => {
      // 1. Start at /products page (entry point)
      await page.goto('/products');

      // 2. Wait for product cards to load
      await page.waitForSelector('[data-testid="product-card"]', { timeout: 10000 });

      // 3. Get the first product card
      const firstProductCard = page.locator('[data-testid="product-card"]').first();
      await expect(firstProductCard).toBeVisible();

      // 4. Click on the product card
      await firstProductCard.click();

      // 5. Verify navigation to product detail page
      await page.waitForURL(/\/products\/[a-z0-9-]+/);
      expect(page.url()).toMatch(/\/products\/[a-z0-9-]+/);

      // 6. Verify product detail page renders correctly
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.getByText(/\$/)).toBeVisible();
      await expect(page.locator('img').first()).toBeVisible();
    });

    test('should display complete product information after navigation from products page', async ({
      page,
    }) => {
      // 1. Start at /products page
      await page.goto('/products');

      // 2. Wait for product cards to load
      await page.waitForSelector('[data-testid="product-card"]', { timeout: 10000 });

      // 3. Get product name from card (for verification later)
      const firstProductCard = page.locator('[data-testid="product-card"]').first();
      const productNameInCard = await firstProductCard
        .locator('[data-testid="product-name"]')
        .textContent();

      // 4. Click on the product card
      await firstProductCard.click();

      // 5. Wait for navigation
      await page.waitForURL(/\/products\/[a-z0-9-]+/);

      // 6. Verify product name matches what we clicked
      const productNameInDetail = await page.locator('h1').textContent();
      expect(productNameInDetail).toBe(productNameInCard);

      // 7. Verify all product details are displayed
      await expect(page.getByText(/\$/)).toBeVisible();
      await expect(page.locator('img').first()).toBeVisible();
      await expect(page.getByText('Category:')).toBeVisible();
      await expect(page.getByText('Origin:')).toBeVisible();
      await expect(page.getByText('Description')).toBeVisible();
    });

    test('should maintain proper browser navigation after clicking through from products', async ({
      page,
    }) => {
      // 1. Start at /products page
      await page.goto('/products');

      // 2. Wait for and click first product
      await page.waitForSelector('[data-testid="product-card"]', { timeout: 10000 });
      await page.locator('[data-testid="product-card"]').first().click();

      // 3. Wait for navigation to detail page
      await page.waitForURL(/\/products\/[a-z0-9-]+/);

      // 4. Verify browser back button works (goes back to /products)
      await page.goBack();
      expect(page.url()).toContain('/products');
      // Verify we're back on products page (should have product cards)
      await expect(page.locator('[data-testid="product-card"]').first()).toBeVisible();

      // 5. Verify browser forward button works (returns to detail page)
      await page.goForward();
      await page.waitForURL(/\/products\/[a-z0-9-]+/);
      await expect(page.locator('h1')).toBeVisible();
    });
  });

  /**
   * Direct Navigation Tests (Smoke Tests)
   *
   * These tests verify that product detail pages can be accessed directly via URL.
   * They serve as smoke tests to ensure the page works when users:
   * - Share direct links
   * - Bookmark pages
   * - Use browser refresh
   *
   * Purpose: Verify page works in isolation without depending on navigation flow.
   */
  test.describe('Direct Navigation (Smoke Tests)', () => {
    test('should display product detail page for valid product ID', async ({ page }) => {
      // Navigate directly to product detail page (simulates shared link or bookmark)
      await page.goto(`/products/${testProductId}`);

      // Verify page loaded
      await expect(page.locator('h1')).toBeVisible();

      // Verify we're on the product detail page (URL matches)
      expect(page.url()).toContain(`/products/${testProductId}`);
    });

    test('should display correct product information on detail page', async ({ page }) => {
      // Navigate directly to product detail page (simulates browser refresh)
      await page.goto(`/products/${testProductId}`);

      // Verify product name heading exists
      const productName = page.locator('h1');
      await expect(productName).toBeVisible();

      // Verify product price is displayed
      await expect(page.getByText(/\$/)).toBeVisible();

      // Verify product image is displayed
      const productImage = page.locator('img').first();
      await expect(productImage).toBeVisible();

      // Verify category and origin sections exist
      await expect(page.getByText('Category:')).toBeVisible();
      await expect(page.getByText('Origin:')).toBeVisible();

      // Verify description section exists
      await expect(page.getByText('Description')).toBeVisible();
    });
  });
});
