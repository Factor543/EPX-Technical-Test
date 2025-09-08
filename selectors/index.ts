import { Page } from "playwright-core";
import Buttons from "./Buttons";
import Fields from "./Fields";

export default class {
	readonly Buttons: Buttons;
	readonly Fields: Fields;
	
	constructor(public page: Page) {
		this.Buttons = new Buttons(page);
		this.Fields = new Fields(page);
	}
}
