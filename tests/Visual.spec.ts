import { expect } from 'playwright/test';
import { test } from '../index';

const screenshotPath = './assets/screenshots/';

test.describe('Visual Capture - Figma vs Production', () => {

	test.beforeEach(async ({ page, login }) => {
		const currentTestName = test.info().title;
		if (currentTestName.includes('C.A.R.L.')) await page.goto(login.login_url, { waitUntil: 'domcontentloaded' });
		else await page.goto(login.events_url, { waitUntil: 'domcontentloaded' });
	});
	test('Captura de pantalla del chat de C.A.R.L.', async ({ page, login, carl }) => {
		test.info().annotations.push({
			type: 'INFORMACIÓN IMPORTANTE',
			description: 'Se han omitido los tests de captura de pantalla de la modal de EPX+ y el formulario de creación de evento online pago debido a que las capturas dependen de una vista estable. El sistema no controla correctamente los límites de publicaciones, lo que impide obtener una vista estable y consistente para la comparación visual.'
		});
		await test.step('Iniciar sesión con usuario de prueba', async () => {
			await login.Login({
				email: 'cmendoza+qa1@shokworks.io',
			});
			await login.principal_text.waitFor({ state: 'visible' });
		});

		await test.step('Navegar a la sección C.A.R.L.', async () => {
			await carl.access.click();
			await page.waitForURL(/carl/);
			await carl.title_Chat.waitFor({ state: 'visible' });
		});

		await test.step('Capturar screenshot del chat completo', async () => {
			await page.screenshot({ 
				path: `${screenshotPath}CARL-chat-production.png`,
				fullPage: true,
			});
		});
	});

	test('Captura de pantalla del navbar en la vista de C.A.R.L.', async ({ page, login }) => {
		await test.step('Iniciar sesión con usuario de prueba', async () => {
			await login.Login({
				email: 'cmendoza+qa1@shokworks.io',
			});
			await login.principal_text.waitFor({ state: 'visible' });
		});

		await test.step('Capturar screenshot del navbar', async () => {
			await page.locator('#main div').filter({ hasText: 'HomeAchieveExploreImproveConnectOnlineVaultTribesFutureForward™️Carl chatCarl' }).nth(1).screenshot({
				path: `${screenshotPath}CARL-navbar-production.png`,
			});
		});
	});

	test.skip('Captura de pantalla de la modal de EPX+', async ({ page, login, posting }) => {
		await test.step('Iniciar sesión con usuario de prueba', async () => {
			await login.Login({
				email: 'cmendoza+qa2@shokworks.io',
			});
		});

		await test.step('Abrir modal de creación de evento', async () => {
			await posting.create_event_button.click();
			await posting.Modal_Posting.title.waitFor({ state: 'visible' });
		});

		await test.step('Seleccionar opción de evento de pago', async () => {
			await posting.Modal_Posting.paid_event_option.waitFor({ state: 'visible' });
			await posting.Modal_Posting.paid_event_option.click();
			await posting.Modal_Posting.continuebutton.waitFor({ state: 'visible' });
			await posting.Modal_Posting.continuebutton.click();
		});

		await test.step('Capturar screenshot de la modal EPX+', async () => {
			await page.screenshot({ 
				path: `${screenshotPath}Modal-EPX-production.png`,
				fullPage: false,
			});
		});
	});

	test.skip('Captura de pantalla del formulario de creación de evento online pago', async ({ page, login, posting }) => {
		await test.step('Iniciar sesión con usuario de prueba', async () => {
			await login.Login({
				email: 'cmendoza+qa1@shokworks.io',
			});
		});

		await test.step('Abrir modal de creación de evento', async () => {
			await posting.create_event_button.click();
			await posting.Modal_Posting.title.waitFor({ state: 'visible' });
		});

		await test.step('Seleccionar opción de evento de pago', async () => {
			await posting.Modal_Posting.paid_event_option.waitFor({ state: 'visible' });
			await posting.Modal_Posting.paid_event_option.click();
			await posting.Modal_Posting.continuebutton.waitFor({ state: 'visible' });
			await posting.Modal_Posting.continuebutton.click();
		});

		await test.step('Validar que el formulario esté visible', async () => {
			await expect(posting.form_event.title).toBeVisible();
		});

		await test.step('Capturar screenshot del formulario completo', async () => {
			await page.screenshot({ 
				path: `${screenshotPath}event-form-production.png`,
				fullPage: true,
			});
		});
	});
});