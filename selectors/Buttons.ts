import { Locator, Page } from "playwright-core";

export default class Buttons {
	readonly Login: Locator;

	constructor(private page: Page) {
		this.Login = this.page.locator('form').getByRole('button', { name: 'Login' });
	}
}
