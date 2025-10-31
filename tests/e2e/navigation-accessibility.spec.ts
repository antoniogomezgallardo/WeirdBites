import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';

test.describe('Navigation Accessibility E2E Tests', () => {
  test.describe('Accessibility Compliance', () => {
    test('should pass axe accessibility scan on desktop navigation', async ({ page }) => {
      await page.goto('/');

      // Inject axe-core
      await injectAxe(page);

      // Run accessibility scan on navbar
      await checkA11y(page, 'nav', {
        detailedReport: true,
        detailedReportOptions: {
          html: true,
        },
      });
    });

    test('should pass axe accessibility scan on mobile navigation', async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });

      await page.goto('/');

      // Open mobile menu
      await page.getByRole('button', { name: /open menu/i }).click();

      // Inject axe-core
      await injectAxe(page);

      // Run accessibility scan on mobile drawer
      await checkA11y(page, '[role="dialog"]', {
        detailedReport: true,
      });
    });
  });

  test.describe('Keyboard Navigation', () => {
    test('should support keyboard navigation through all nav links', async ({ page }) => {
      await page.goto('/');

      // Focus on first link (WeirdBites logo)
      await page.keyboard.press('Tab');
      const logoLink = page.getByRole('link', { name: 'WeirdBites' });
      await expect(logoLink).toBeFocused();

      // Tab to Products link (navbar link, not the hero CTA)
      await page.keyboard.press('Tab');
      const productsLink = page.getByRole('link', { name: 'Products', exact: true });
      await expect(productsLink).toBeFocused();

      // Tab to Cart link
      await page.keyboard.press('Tab');
      const cartLink = page.getByRole('link', { name: /cart/i });
      await expect(cartLink).toBeFocused();

      // Tab to Account link
      await page.keyboard.press('Tab');
      const accountLink = page.getByRole('link', { name: 'Account' });
      await expect(accountLink).toBeFocused();

      // Activate link with Enter key
      await page.keyboard.press('Enter');

      // Verify navigation to account page
      await expect(page).toHaveURL('/account');
    });

    test('should support keyboard navigation in mobile menu', async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });

      await page.goto('/');

      // Tab to hamburger button
      await page.keyboard.press('Tab'); // Logo
      await page.keyboard.press('Tab'); // Hamburger

      const hamburgerButton = page.getByRole('button', { name: /open menu/i });
      await expect(hamburgerButton).toBeFocused();

      // Open menu with Space key
      await page.keyboard.press('Space');

      // Verify drawer opened
      const mobileDrawer = page.getByRole('dialog', { name: 'Mobile navigation' });
      await expect(mobileDrawer).toBeVisible();

      // Tab to first link in drawer
      await page.keyboard.press('Tab');
      const productsLink = mobileDrawer.getByRole('link', { name: 'Products' });
      await expect(productsLink).toBeFocused();

      // Navigate with Enter
      await page.keyboard.press('Enter');

      // Verify navigation
      await expect(page).toHaveURL('/products');
    });
  });

  test.describe('Screen Reader Support', () => {
    test('should have proper ARIA labels for cart icon', async ({ page }) => {
      await page.goto('/');

      // Get cart link
      const cartLink = page.getByRole('link', { name: /cart/i });

      // Verify it has accessible name
      await expect(cartLink).toBeVisible();

      // Verify aria-label is present (getByRole uses accessible name)
      const ariaLabel = await cartLink.getAttribute('aria-label');
      expect(ariaLabel).toBeTruthy();
      expect(ariaLabel?.toLowerCase()).toContain('cart');
    });

    test('should have proper ARIA labels for mobile menu button', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      await page.goto('/');

      // Verify hamburger button has aria-label
      const openButton = page.getByRole('button', { name: /open menu/i });
      await expect(openButton).toBeVisible();

      const openAriaLabel = await openButton.getAttribute('aria-label');
      expect(openAriaLabel).toBe('Open menu');

      // Open menu
      await openButton.click();

      // Verify close button has aria-label
      const closeButton = page.getByRole('button', { name: /close menu/i });
      await expect(closeButton).toBeVisible();

      const closeAriaLabel = await closeButton.getAttribute('aria-label');
      expect(closeAriaLabel).toBe('Close menu');
    });

    test('should have proper role for mobile navigation dialog', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      await page.goto('/');

      // Open mobile menu
      await page.getByRole('button', { name: /open menu/i }).click();

      // Verify dialog has proper role and aria-label
      const dialog = page.getByRole('dialog');
      await expect(dialog).toBeVisible();

      const ariaLabel = await dialog.getAttribute('aria-label');
      expect(ariaLabel).toBe('Mobile navigation');
    });
  });

  test.describe('Color Contrast', () => {
    test('should have sufficient color contrast for navigation links', async ({ page }) => {
      await page.goto('/');

      // Inject axe-core
      await injectAxe(page);

      // Run accessibility scan (includes color-contrast by default)
      await checkA11y(page, 'nav a', {
        detailedReport: true,
      });
    });
  });
});
