import { Locator, Page } from "playwright-core";
import Locators from "../selectors";

export class Login extends Locators {
	readonly base_url: string;
	readonly events_url: string;
	readonly advice_url: string;
	readonly login_url: string;
	readonly principal_text: Locator;
	
	constructor( page: Page) {
		super(page);
		this.base_url = 'https://app-stg.epxworldwide.com';
		this.login_url = this.base_url + '/log-in';
		this.events_url = this.base_url + '/online';
		this.advice_url = this.base_url + '/achieve';
		this.principal_text = this.page.getByRole('heading', { name: 'Feed', exact: true });

	}
	async Login(credentials:{email: string, password?: string}) {
		await this.Fields.Email.fill(credentials.email);
		await this.Fields.Password.fill(credentials.password || 'Cmendoza1.');
		await this.Buttons.Login.click();
	}
}
