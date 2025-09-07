import { Page } from "playwright-core";
import Buttons from "./Buttons";
import Fields from "./Fields";
import Alerts from "./Alerts";

export default class {
	readonly Buttons: Buttons;
	readonly Fields: Fields;
	readonly Alerts: Alerts;
	
	constructor(public page: Page) {
		this.Buttons = new Buttons(page);
		this.Fields = new Fields(page);
		this.Alerts = new Alerts(page);
	}
}
