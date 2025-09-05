import { test, expect } from '@playwright/test';

test.describe('Basic CARL Page Tests', () => {
	test('should load the CARL page', async ({ page }) => {
		await page.goto('http://localhost:3000/carl'); // Ajusta la URL según tu app
		await expect(page).toHaveTitle(/CARL/i);
	});

	test('should display main heading', async ({ page }) => {
		await page.goto('http://localhost:3000/carl');
		const heading = page.locator('h1');
		await expect(heading).toHaveText(/CARL/i);
	});

	test('should have a navigation bar', async ({ page }) => {
		await page.goto('http://localhost:3000/carl');
		const nav = page.locator('nav');
		await expect(nav).toBeVisible();
	});
});