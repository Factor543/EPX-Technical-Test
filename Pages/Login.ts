import { Page } from "playwright-core";
import Locators from "../selectors";

export class Login extends Locators {
	readonly url: string;
	constructor( page: Page) {
		super(page);
		this.url = 'https://app-stg.epxworldwide.com/log-in';

	}
	async Login(credentials:{email: string, password: string}) {
		await this.Fields.Email.fill(credentials.email);
		await this.Fields.Password.fill(credentials.password);
		await this.Buttons.Login.click();
	}
}
