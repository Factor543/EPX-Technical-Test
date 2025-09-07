import { Locator, Page } from "playwright-core";
import Locators from "../selectors";
import { expect } from "@playwright/test";

export class Carl extends Locators {

	readonly access:Locator;
	readonly input:Locator;
	readonly sendPrompt:Locator;
	readonly loading_icon:Locator;
	readonly title_Chat:Locator;
	readonly message_container:Locator;
	readonly carl_response: Locator;
	readonly history: Locator;
	readonly conversation: Locator;
	readonly delete_conversation: Locator;

	constructor( page: Page) {
		super(page);
		this.title_Chat = this.page.getByRole('heading', { name: 'Chat with C.A.R.L.', exact: true });
		this.access = this.page.locator('img[src*="carl-letters-icon"]');
		this.input = this.page.getByRole('textbox', { name: 'How can C.A.R.L. help you today?' });
		this.sendPrompt = this.page.locator('form').getByRole('button').nth(1);
		this.loading_icon = this.page.locator('svg[data-icon="loading"]').locator('..');
		this.message_container = this.page.locator('#message-container');
		this.carl_response = this.page.locator('div.bg-orange-opacity').filter({ 
			has: this.page.locator('img[alt="IA Avatar"]')
		}).last();
		this.history = this.page.getByText('History');
		this.conversation = this.page.getByText('Carl: EPX Chat').locator('../..').first();
		this.delete_conversation = this.conversation.locator('div.cursor-pointer').last();
	}
	async waitForResponseComplete(){
		// Reducimos el timeout para que la aserción falle más rápido si el ícono no aparece
		await this.loading_icon.waitFor({ state: 'visible'});
		await this.loading_icon.waitFor({ state: 'hidden' });
		await expect(this.input).toBeEnabled();
	}
	
	async clearContext() {
		await this.history.click();
		await this.conversation.click();
		await this.delete_conversation.waitFor({state: 'visible'});
		await this.delete_conversation.click();
		await expect(this.conversation).not.toBeVisible();
		await expect(this.page.getByText('Hi there! I\'m Carl.')).toBeVisible();
	}
}
