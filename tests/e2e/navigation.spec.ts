import { test, expect } from '@playwright/test';

test.describe('Navigation Bar E2E Tests', () => {
  test.describe('Happy Path - Navigation Flows', () => {
    test('should navigate from homepage to products page via navbar', async ({ page }) => {
      // Start at homepage
      await page.goto('/');

      // Verify navbar is visible
      const navbar = page.locator('nav').first(); // Use first() to handle multiple nav elements
      await expect(navbar).toBeVisible();

      // Click Products link in navbar
      await page.getByRole('link', { name: 'Products' }).click();

      // Verify navigation to products page
      await expect(page).toHaveURL('/products');
    });

    test('should navigate from homepage to account page via navbar', async ({ page }) => {
      // Start at homepage
      await page.goto('/');

      // Click Account link in navbar
      await page.getByRole('link', { name: 'Account' }).click();

      // Verify navigation to account page
      await expect(page).toHaveURL('/account');
    });

    test('should navigate to cart page via navbar cart icon', async ({ page }) => {
      // Start at homepage
      await page.goto('/');

      // Click Cart link (using aria-label since it's an icon)
      await page.getByRole('link', { name: /cart/i }).click();

      // Verify navigation to cart page
      await expect(page).toHaveURL('/cart');
    });
  });

  test.describe('Mobile Navigation', () => {
    test.use({ viewport: { width: 375, height: 667 } }); // iPhone SE viewport

    test('should open and close mobile menu', async ({ page }) => {
      await page.goto('/');

      // Verify hamburger button is visible on mobile
      const hamburgerButton = page.getByRole('button', { name: /open menu/i });
      await expect(hamburgerButton).toBeVisible();

      // Click to open menu
      await hamburgerButton.click();

      // Verify mobile drawer is visible
      const mobileDrawer = page.getByRole('dialog', { name: 'Mobile navigation' });
      await expect(mobileDrawer).toBeVisible();

      // Verify close button (hamburger changes to X)
      const closeButton = page.getByRole('button', { name: /close menu/i });
      await expect(closeButton).toBeVisible();

      // Click to close
      await closeButton.click();

      // Verify drawer is hidden
      await expect(mobileDrawer).not.toBeVisible();
    });

    test('should close mobile menu when clicking a navigation link', async ({ page }) => {
      await page.goto('/');

      // Open mobile menu
      await page.getByRole('button', { name: /open menu/i }).click();

      // Verify drawer is visible
      const mobileDrawer = page.getByRole('dialog', { name: 'Mobile navigation' });
      await expect(mobileDrawer).toBeVisible();

      // Click Products link in mobile drawer
      await mobileDrawer.getByRole('link', { name: 'Products' }).click();

      // Verify navigation occurred
      await expect(page).toHaveURL('/products');

      // Verify drawer closed (after navigation, go back and check)
      await page.goBack();
      await expect(mobileDrawer).not.toBeVisible();
    });
  });

  test.describe('Navbar Persistence', () => {
    test('should show navbar on all pages', async ({ page }) => {
      const pages = ['/', '/products', '/account', '/cart'];

      for (const path of pages) {
        await page.goto(path);

        // Verify navbar exists
        const navbar = page.locator('nav').first(); // Use first() to handle multiple nav elements
        await expect(navbar).toBeVisible();

        // Verify logo/brand is visible
        await expect(page.getByRole('link', { name: 'WeirdBites' })).toBeVisible();
      }
    });

    test('should highlight active link based on current page', async ({ page }) => {
      // Go to products page
      await page.goto('/products');

      // Get Products link
      const productsLink = page.getByRole('link', { name: 'Products' }).first();

      // Verify it has active styling (border-b-2 border-gray-900)
      await expect(productsLink).toHaveClass(/border-b-2/);
      await expect(productsLink).toHaveClass(/border-gray-900/);
    });
  });

  test.describe('Sticky Navigation', () => {
    test('should remain visible when scrolling', async ({ page }) => {
      await page.goto('/');

      // Get navbar
      const navbar = page.locator('nav').first(); // Use first() to handle multiple nav elements

      // Verify navbar is visible at top
      await expect(navbar).toBeVisible();

      // Scroll down (simulate long page)
      await page.evaluate(() => window.scrollTo(0, 1000));

      // Navbar should still be visible (sticky positioning)
      await expect(navbar).toBeVisible();

      // Verify it's in viewport
      const navbarBox = await navbar.boundingBox();
      expect(navbarBox?.y).toBeLessThanOrEqual(10); // Should be at top (within 10px)
    });
  });
});
