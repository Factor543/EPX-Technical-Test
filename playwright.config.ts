import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	testDir: './tests',
	fullyParallel: false,
	forbidOnly: !!process.env.CI,
	retries: 1,
	workers: 1,
	outputDir: './evidence',
	timeout: 45_000,
	reporter: [
		['html', {
			outputFolder: 'results',
			open: 'always'
		}]
	],
	
	use: {
		trace: 'on-first-retry',
		headless: false, //--- comentar si NO se quiere ver la ejecucion en el navegador
		screenshot: 'on',
		video: 'on',
		actionTimeout: 15_000,
		launchOptions: {
			slowMo: 800,
		},
	},

	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		}
	]
});
