import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	testDir: './tests',
	fullyParallel: false,
	forbidOnly: !!process.env.CI,
	retries: 1,
	workers: 1,
	outputDir: './evidence',
	
	reporter: [
		['html', {
			outputFolder: 'results',
			open: 'always'
		}]
	],
	
	use: {
		trace: 'on-first-retry',
		headless: false,
		screenshot: 'on',
		video: 'on',
		// Habilitar para que las pruebas se ejecuten mas lento
		// launchOptions: {
		// 	slowMo: 600,
		// },
	},

	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},
		// {
		// 	name: 'firefox',
		// 	use: { ...devices['Desktop Firefox'] },
		// },
		// {
		// 	name: 'edge',
		// 	use: { ...devices['Desktop Edge'] },
		// },
		// {
		// 	name: 'chrome',
		// 	use: { ...devices['Desktop Chrome'] },
		// }
	]
});
