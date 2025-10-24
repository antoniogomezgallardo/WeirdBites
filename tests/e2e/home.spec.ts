import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should display the WeirdBites welcome page', async ({ page }) => {
    await page.goto('/');

    // Check for main heading
    await expect(page.getByRole('heading', { name: /Welcome to/i })).toBeVisible();
    await expect(page.getByText('WeirdBites')).toBeVisible();

    // Check for description
    await expect(page.getByText('Unusual snacks from around the world')).toBeVisible();

    // Check for action buttons
    await expect(page.getByRole('link', { name: /Browse Products/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Learn More/i })).toBeVisible();
  });

  test('should have proper page title', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/WeirdBites/i);
  });
});
