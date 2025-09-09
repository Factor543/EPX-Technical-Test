import { Locator, Page } from "playwright-core";

export default class Buttons {
	readonly Login: Locator;
	readonly continue: Locator;
	readonly publish: Locator;
	readonly cancel: Locator;
	readonly submit: Locator;

	constructor(private page: Page) {
		this.Login = this.page.locator('form').getByRole('button', { name: 'Login' });
		this.continue = this.page.getByRole('button', { name: 'Continue' });
		this.publish = this.page.getByRole('button', { name: 'Publish' });
		this.cancel = this.page.getByRole('button', { name: 'cancel' }); 
		this.submit = this.page.getByRole('button', { name: 'Submit' });
	}
}
