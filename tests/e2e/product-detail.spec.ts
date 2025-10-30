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

  test.describe('Direct Navigation', () => {
    test('should display product detail page for valid product ID', async ({ page }) => {
      // Navigate directly to product detail page
      await page.goto(`/products/${testProductId}`);

      // Verify page loaded
      await expect(page.locator('h1')).toBeVisible();

      // Verify we're on the product detail page (URL matches)
      expect(page.url()).toContain(`/products/${testProductId}`);
    });

    test('should display correct product information on detail page', async ({ page }) => {
      // Navigate directly to product detail page
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
