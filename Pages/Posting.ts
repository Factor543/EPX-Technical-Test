import { Locator, Page } from "playwright-core";
import Locators from "../selectors";

// Estructura de datos para crear eventos
// Los campos marcados con ? son opcionales, los otros son obligatorios
export interface EventData {
	// Campos Obligatorios
	eventType: 'meetup' | 'masterclass';
	imagePath: string;
	audience: 'entire_network' | 'epx_members_only';
	title: string;
	description: string;
	startDate: string;
	startTime: string;
	endTime: string;
	
	// Campos Opcionales
	learnBulletPoints?: string[];
	valueBulletPoints?: string[]; 
	minAttendees?: number; 
	maxAttendees?: number; 
	videoUrl?: string; 
	meetingId?: string; 
	meetingPasscode?: string; 
	bannerPath?: string; 
	categories?: string[]; 
	coOwners?: string[]; 
	pricePerPerson?: number;
}

export class Posting extends Locators {
	readonly principaltext: Locator;
	readonly Modal_Posting:Record<string, Locator>;
	readonly Messages:Record<string, Locator>;
	readonly create_event_button: Locator;
	readonly modal_container: Locator;
	readonly form_event: Record<string, Locator>;
	readonly get_advice_access: Locator;
	readonly form_advice: Record<string, Locator>;

	constructor( page: Page) {
		super(page);
		this.principaltext = this.page.getByRole('heading', { name: 'Online', exact: true });
		this.create_event_button = this.page.getByRole('button',{name:'Create an event'}).last();
		this.get_advice_access = this.page.locator('a').filter({ hasText: 'Get Advice' });
		this.modal_container = this.page.getByRole('dialog');

		this.Modal_Posting = {
			title: this.modal_container.getByRole('heading', { name: 'Create an Event!', exact: true }),
			description: this.page.getByText('Select the type of event you want to publish.'),
			free_event_option: this.modal_container.locator('label').filter({ hasText: 'Free to Attend' }),
			paid_event_option: this.modal_container.locator('label').filter({ hasText: 'Pay to Attend' }),
			continuebutton: this.modal_container.locator(this.Buttons.continue),
			X_button: this.modal_container.locator(' h1 svg').last()
		};

		this.form_advice = {
			title: this.page.getByRole('heading', { name: 'Get Expert Advice' }),
			ai_skill: this.page.getByText('AI', { exact: true }),
			description: this.page.getByLabel('rdw-wrapper').locator('div').filter({ hasText: 'Write 4 sentences describing' }).first().getByRole('textbox'),
			way_to_go: this.page.getByRole('heading', { name: 'Way to Go!' }),
			give_advice: this.page.getByRole('heading', { name: 'Give Advice', exact: true }),
			my_requests: this.page.getByRole('tablist').filter({ hasText: 'My Requests' }),
			my_requests_description: this.page.locator('.p-6'),
		};
		
		this.Messages = {
			maximum_posting_exceeded_title: this.modal_container.getByRole('heading', { name: 'Maximum posting exceeded' }),
			maximum_posting_exceeded_description: this.modal_container.locator('p').filter({ hasText: 'You have exhausted your maximum number of posts as an EPX+ member. In a few days you will be able to continue publishing your events!' }),
			epx_plus_title: this.modal_container.locator('h1').filter({ hasText: 'EPX +' }),
			superstar_title: this.modal_container.locator('h1').filter({ hasText: 'Superstar!' }),
			free_listings_message: this.modal_container.locator('p').filter({ hasText: 'Our records indicate you have used your free listings which are included in your membership.' }),
			limited_opportunities_message: this.modal_container.locator('p').filter({ hasText: 'You are allowed a limited number of opportunities to post per period of time.' }),
			pay_to_play_option: this.modal_container.locator('span').filter({ hasText: 'Pay to Play.' }),
			upgrade_close_button: this.modal_container.locator('h1 svg').first()
		};

		this.form_event = {
			title: this.page.getByRole('heading', { name: 'Host an Online Event' }),
			image_upload: this.page.locator('#image'),
			banner_upload: this.page.locator('#banner'),
			meeting_title: this.page.getByRole('textbox', { name: 'Meeting Title *' }),
			meeting_description: this.page.getByRole('textbox', { name: 'rdw-editor' }).locator('div').nth(2),
			description_bullet_points: this.page.locator('div').filter({ hasText: /^Describe in 3-5 bullet points about what a viewer will learn\+ Add$/ }).getByPlaceholder('Describe the bullet point'),
			value_bullet_points: this.page.locator('div').filter({ hasText: /^Describe in 3-5 bullet points about why it is valuable\+ Add$/ }).getByPlaceholder('Describe the bullet point'),
			category_accounting_finance: this.page.locator('div').filter({ hasText: /^Accounting\/Finance$/ }).nth(1),
			category_building_brands: this.page.locator('div').filter({ hasText: /^Building Brands$/ }).first(),
			category_business_strategy: this.page.locator('div').filter({ hasText: /^Business Strategy$/ }).nth(1),
			category_accommodations: this.page.locator('div').filter({ hasText: /^Accommodations$/ }).nth(1),
			category_accounting: this.page.locator('div').filter({ hasText: /^Accounting$/ }).nth(1),
			category_no_poverty: this.page.locator('div').filter({ hasText: /^No Poverty$/ }).nth(1),
			category_zero_hunger: this.page.locator('div').filter({ hasText: /^Zero Hunger$/ }).nth(1),
			category_adventure: this.page.locator('div').filter({ hasText: /^Adventure$/ }).nth(1),
			category_chill: this.page.locator('div').filter({ hasText: /^Chill$/ }).nth(1),
			category_beach: this.page.locator('div').filter({ hasText: /^Beach$/ }).nth(1),
			category_family: this.page.locator('div').filter({ hasText: /^Family$/ }).nth(1),
			category_food_culture: this.page.locator('div').filter({ hasText: /^Food and Culture$/ }).nth(1),
			category_nature: this.page.locator('div').filter({ hasText: /^Nature$/ }).nth(1),
			min_attendees: this.page.getByRole('spinbutton', { name: 'Min number of attendees' }),
			max_attendees: this.page.getByRole('spinbutton', { name: 'Maximum attendees allowed *' }),
			start_date: this.page.getByRole('textbox', { name: 'Start Date *' }),
			date_picker_day_30: this.page.getByText('30'),
			start_time: this.page.getByRole('textbox', { name: 'Start Time (EST) *' }),
			end_time: this.page.getByRole('textbox', { name: 'End Time (EST)' }),
			time_now_button: this.page.getByRole('listitem').getByText('Now'),
			video_conferencing_url: this.page.getByRole('textbox', { name: 'Add video conferencing join' }),
			meeting_id: this.page.getByRole('textbox', { name: 'Meeting ID #' }),
			meeting_passcode: this.page.getByRole('textbox', { name: 'Meeting Passcode (optional)' }),
			meetup_discussion: this.page.getByText('Meetup (Discussion)'),
			notify_crew: this.page.getByText('Notify my crew'),
			entire_network: this.page.getByText('Entire Network'),
			description_placeholder: this.page.locator('div').filter({ hasText: /^Example: 'Describe the topic to be discussed'\.\.\.$/ }).first(),
			co_owners: this.page.locator('.ant-select-selector'),
			price_per_person: this.page.getByRole('spinbutton', { name: 'Price per person (USD) *' })
		};

	}
	/**
	 * Método principal para llenar todo el formulario de creación de eventos
	 * Este método llena tanto los campos obligatorios como los opcionales
	 */
	async fillEventForm(eventData: EventData) {
		await this.uploadImage(eventData.imagePath);
		await this.selectEventType(eventData.eventType);
		await this.selectAudience(eventData.audience);
		await this.fillTitle(eventData.title);
		await this.fillDescription(eventData.description);
		await this.selectDate(eventData.startDate);
		await this.selectStartTime();
		await this.selectEndTime();
		await this.configureAttendees(eventData.minAttendees || 1, eventData.maxAttendees || 10);
		
		if (eventData.bannerPath) await this.uploadBanner(eventData.bannerPath);
		if (eventData.learnBulletPoints) await this.fillBulletPoints(eventData.learnBulletPoints, 'learn');
		if (eventData.valueBulletPoints) await this.fillBulletPoints(eventData.valueBulletPoints, 'value');
		if (eventData.videoUrl && eventData.meetingId) await this.fillVideoConferencing(eventData.videoUrl, eventData.meetingId, eventData.meetingPasscode);
		if (eventData.categories) await this.selectCategories(eventData.categories);
		if (eventData.coOwners) await this.selectCoOwners(eventData.coOwners);
	}

	/**
	 * Método para llenar únicamente los campos obligatorios
	 * Útil cuando solo queremos probar el flujo básico sin datos adicionales
	 */
	async fillRequiredFieldsOnly(eventData: EventData, type: 'free' | 'paid') {
		await this.uploadImage(eventData.imagePath);
		await this.selectEventType(eventData.eventType);
		await this.selectAudience(eventData.audience);
		await this.fillTitle(eventData.title);
		await this.fillDescription(eventData.description);
		await this.selectDate(eventData.startDate);
		await this.selectStartTime();
		await this.selectEndTime();
		await this.configureAttendees(eventData.minAttendees || 1, eventData.maxAttendees || 10);
		if (type === 'paid') await this.fillPricePerPerson(eventData.pricePerPerson || 10);
	}

	private async fillPricePerPerson(price: number) {
		await this.fillNumericField(this.form_event.price_per_person, price);
	}

	private async fillTextField(selector: Locator, value: string) {
		await selector.fill(value);
	}

	private async uploadFile(inputId: string, filePath: string) {
		await this.page.setInputFiles(inputId, filePath);
	}

	private async fillNumericField(selector: Locator, value: number) {
		await selector.fill(value.toString());
	}

	private async selectEventType(eventType: 'meetup' | 'masterclass') {
		if (eventType === 'meetup') {
			await this.form_event.meetup_discussion.click();
		} else {
			await this.page.getByText('Masterclass').click();
		}
	}

	private async selectAudience(audience: 'entire_network' | 'epx_members_only') {
		if (audience === 'entire_network') {
			await this.form_event.entire_network.click();
		} else {
			await this.page.getByText('EPX Members Only').click();
		}
	}

	private async fillTitle(title: string) {
		await this.fillTextField(this.form_event.meeting_title, title);
	}

	private async fillDescription(description: string) {
		await this.fillTextField(this.form_event.meeting_description, description);
	}

	private async selectDate(day: string) {
		await this.form_event.start_date.click();
		await this.page.getByText(day).click();
	}

	private async selectStartTime() {
		await this.form_event.start_time.click();
		await this.form_event.time_now_button.waitFor({ state: 'visible' });
		await this.form_event.time_now_button.click();
	}

	private async selectEndTime() {
		await this.form_event.end_time.click();
		await this.form_event.time_now_button.waitFor({ state: 'visible' });
		await this.form_event.time_now_button.click();
	}

	private async fillBulletPoints(bulletPoints: string[], type: 'learn' | 'value') {
		const selector = type === 'learn' 
			? this.form_event.description_bullet_points 
			: this.form_event.value_bullet_points;
		
		for (const bulletPoint of bulletPoints) {
			await selector.fill(bulletPoint);
		}
	}

	private async configureAttendees(min: number, max: number) {
		await this.fillNumericField(this.form_event.min_attendees, min);
		await this.fillNumericField(this.form_event.max_attendees, max);
	}

	private async selectCategories(categories: string[]) {
		const categorySelectors: Record<string, Locator> = {
			'accounting_finance': this.form_event.category_accounting_finance,
			'building_brands': this.form_event.category_building_brands,
			'business_strategy': this.form_event.category_business_strategy,
			'accommodations': this.form_event.category_accommodations,
			'accounting': this.form_event.category_accounting,
			'no_poverty': this.form_event.category_no_poverty,
			'zero_hunger': this.form_event.category_zero_hunger,
			'adventure': this.form_event.category_adventure,
			'chill': this.form_event.category_chill,
			'beach': this.form_event.category_beach,
			'family': this.form_event.category_family,
			'food_culture': this.form_event.category_food_culture,
			'nature': this.form_event.category_nature
		};
		
		for (const category of categories) {
			if (categorySelectors[category]) {
				await categorySelectors[category].click();
			}
		}
	}

	private async selectCoOwners(coOwners: string[]) {
		for (const coOwner of coOwners) {
			await this.form_event.co_owners.click();
			await this.page.getByText(coOwner).click();
		}
	}

	async uploadImage(imagePath: string) {
		await this.uploadFile('#image', imagePath);
	}

	async uploadBanner(imagePath: string) {
		await this.uploadFile('#banner', imagePath);
	}

	private async fillVideoConferencing(url: string, meetingId: string, passcode?: string) {
		await this.form_event.video_conferencing_url.fill(url);
		await this.form_event.meeting_id.fill(meetingId);
		if (passcode) {
			await this.form_event.meeting_passcode.fill(passcode);
		}
	}
}
