import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	testDir: './tests',
	fullyParallel: false,
	forbidOnly: !!process.env.CI,
	retries: 1,
	workers: process.env.CI ? 1 : undefined,
	outputDir: './evidence',
	
	reporter: [
		['html', {
			outputFolder: 'results',
			open: 'never'
		}]
	],
	
	use: {
		trace: 'on-first-retry',
		headless: false,
		screenshot: 'on',
		video: 'on',
		// launchOptions: {
		// 	slowMo: 500,
		// },
	},

	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},
	]
});
