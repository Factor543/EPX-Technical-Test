import { test as base } from '@playwright/test';
import selectors from './selectors';
import { Carl } from './Pages/CARL';
import { Login } from './Pages/Login';
import { Posting } from './Pages/Posting';

type MyFixtures = {
	locators: selectors;
	carl: Carl;
	login: Login;
	posting: Posting;
};

export const test = base.extend<MyFixtures>({
	locators: async ({ page }, use) => {
		const locators = new selectors(page);
		await use(locators);
	},
	login: async ({ page }, use) => {
		const login = new Login(page);
		await use(login);
	},
	carl: async ({ page }, use) => {
		const carl = new Carl(page);
		await use(carl);
	},
	posting: async ({ page }, use) => {
		const posting = new Posting(page);
		await use(posting);
	},
});