import { Locator, Page } from "playwright-core";

export default class Buttons {
	readonly Email: Locator;
	readonly Password: Locator;

	constructor(private page: Page) {
		this.Email = this.page.getByRole('textbox', { name: 'example@email.com' });
		this.Password = this.page.getByRole('textbox', { name: 'Password' });
	}
}
