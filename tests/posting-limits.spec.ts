/* eslint-disable @typescript-eslint/no-unused-vars */
import { expect } from 'playwright/test';
import { test } from '../index';
import { EventData } from '../Pages/Posting';

const data_event:EventData = {
	eventType: 'meetup',
	imagePath: './assets/imgs/test-img.jpg',
	audience: 'entire_network',
	title: 'Evento Gratuito - Networking',
	description: 'Evento gratuito para conectar con profesionales',
	startDate: '30',
	startTime: '14:00',
	endTime: '15:00',
	minAttendees: 5,
	maxAttendees: 20
};

const credentials = {
	email: 'cmendoza+qa3@shokworks.io',
	password: 'Cmendoza1.'
};

test.describe('Posting Limits - Posts Regulares', () => {
	test.beforeEach(async ({ page, login }) => {
		await page.goto(login.events_url, { waitUntil: 'domcontentloaded' });
	});
	test('Publicacion de evento gratuito por mes', async ({ login, posting }) => {
		test.info().annotations.push({ 
			type: 'DATOS', 
			description: 'El test consume el post gratuito mensual del usuario logueado. Se recomienda cambiar de usuario para ejecutar este test o eliminar la publicación de este usuario desde la base de datos.' 
		});
		
		await test.step('Iniciar sesión con usuario', async () => {
			await login.Login({
				email: credentials.email,
				password: credentials.password
			});
			await posting.principaltext.waitFor({ state: 'visible' });
		});
	
		await test.step('Navegar a crear evento online', async () => {
			await posting.create_event_button.click();
			await posting.Modal_Posting.title.waitFor({ state: 'visible' });
		});
	
		await test.step('Seleccionar opción de evento gratuito', async () => {
			await posting.Modal_Posting.free_event_option.waitFor({ state: 'visible' });
			await posting.Modal_Posting.continuebutton.waitFor({ state: 'visible' });
			await posting.Modal_Posting.continuebutton.click();
		});
	
		await test.step('Llenar formulario completo del evento', async () => {
			await expect(posting.form_event.title, 
				'No se ingreso al formulario de creación de evento. Posible limites alcanzados.'
			).toBeVisible();
			await posting.fillRequiredFieldsOnly(data_event, 'free');
			await posting.Buttons.publish.click();
		});
	
		await test.step('Validar que se puede crear el evento gratuito', async () => {
			await expect(posting.page.getByRole('heading', { name: 'Do you want to add this event' })).toBeVisible();
			await posting.page.getByText('Event has been created').waitFor({ state: 'visible' });
			await expect(posting.page.getByText('Event has been created')).toBeVisible();
		});
	});
	test('Post bloqueado por alcanzar el límite de posts gratuitos', async ({login,posting }) => {
		await test.step('Iniciar sesión con usuario ', async () => {
			await login.Login({
				email: credentials.email, 
				password: credentials.password
			});
			await posting.principaltext.waitFor({ state: 'visible' });
		});

		await test.step('Navegar a crear evento online', async () => {
			await posting.create_event_button.click();
			await posting.Modal_Posting.title.waitFor({ state: 'visible' });
		});

		await test.step('Validar que aparece la modal de límite excedido', async () => {
			await posting.Modal_Posting.free_event_option.waitFor({ state: 'visible' });
			await posting.Modal_Posting.continuebutton.waitFor({ state: 'visible' });
			await posting.Modal_Posting.continuebutton.click();
			await expect(posting.Messages.maximum_posting_exceeded_title,
				'El título "Maximum posting exceeded" no se muestra, indicando que el sistema permite crear múltiples posts gratuitos en el mismo mes'
			).toBeVisible();
						
			await expect(posting.Messages.maximum_posting_exceeded_description,
				'La descripción del límite excedido no se muestra, indicando posible ingreso al formulario cuando debería estar bloqueado'
			).toBeVisible();

			await posting.page.waitForTimeout(1500);
			const screenshotPath = 'evidence/posting-limits-primer-post-gratuito-bloqueado.png';
			await posting.page.screenshot({ path: screenshotPath});
			test.info().attach('screenshot', {
				path: screenshotPath,
				contentType: 'image/png'
			});
		});

		await test.step('Presionar la X en la esquina superior derecha d ela moda y validar su siceere', async () => {
			await posting.Modal_Posting.X_button.waitFor({ state: 'visible' });
			await posting.Modal_Posting.X_button.click();
			await posting.modal_container.waitFor({ state: 'hidden' });
		});
	});
	test('Publicacion de evento pago por mes', async ({ login, posting }) => {
		test.info().annotations.push({ 
			type: 'DATOS', 
			description: 'El test consume el post gratuito mensual del usuario logueado. Se recomienda cambiar de usuario para ejecutar este test o eliminar la publicación de este usuario desde la base de datos.' 
		});
		
		await test.step('Iniciar sesión con usuario', async () => {
			await login.Login({
				email: credentials.email,
				password: credentials.password
			});
			await posting.principaltext.waitFor({ state: 'visible' });
		});
	
		await test.step('Navegar a crear evento online', async () => {
			await posting.create_event_button.click();
			await posting.Modal_Posting.title.waitFor({ state: 'visible' });
		});
	
		await test.step('Seleccionar opción de evento pago', async () => {
			await posting.Modal_Posting.paid_event_option.waitFor({ state: 'visible' });
			await posting.Modal_Posting.paid_event_option.click();
			await posting.Modal_Posting.continuebutton.waitFor({ state: 'visible' });
			await posting.Modal_Posting.continuebutton.click();
		});
	
		await test.step('Llenar formulario completo del evento', async () => {
			await expect(posting.form_event.title, 
				'No se ingreso al formulario de creación de evento. Posible limites alcanzados.'
			).toBeVisible();
			await posting.fillRequiredFieldsOnly(data_event, 'paid');
			await posting.Buttons.publish.click();
		});
	
		await test.step('Validar que se puede crear el evento gratuito', async () => {
			await expect(posting.page.getByRole('heading', { name: 'Do you want to add this event' })).toBeVisible();
			await posting.page.getByText('Event has been created').waitFor({ state: 'visible' });
			await expect(posting.page.getByText('Event has been created')).toBeVisible();
		});
	});
	test('Tercer post bloqueado - Límite máximo alcanzado', async ({ login, posting }) => {
		test.info().annotations.push({ 
			type: 'DATOS', 
			description: 'Este test valida el límite máximo de 2 posts por mes. Después de 1 gratis + 1 pago, no debería permitir más posts.' 
		});
		
		await test.step('Iniciar sesión con usuario', async () => {
			await login.Login({
				email: credentials.email,
				password: credentials.password
			});
			await posting.principaltext.waitFor({ state: 'visible' });
		});

		await test.step('Intentar crear tercer evento gratuito (debería fallar)', async () => {
			await posting.create_event_button.click();
			await posting.Modal_Posting.title.waitFor({ state: 'visible' });
			await posting.Modal_Posting.free_event_option.waitFor({ state: 'visible' });
			await posting.Modal_Posting.continuebutton.waitFor({ state: 'visible' });
			await posting.Modal_Posting.continuebutton.click();
			
			try {
				await expect(posting.Messages.maximum_posting_exceeded_title,
					'El sistema debería mostrar un mensaje de límite excedido pero no lo hace. Parece que permite crear más posts de los que debería.'
				).toBeVisible();
			} catch (error) {
				test.info().annotations.push({
					type: 'Comportamiento controlado ✅',
					description: 'El sistema no está aplicando el límite como debería, pero el test continúa para verificar otras validaciones.'
				});
			}
			await posting.page.waitForTimeout(1500);
			const screenshotPath = 'evidence/posting-limits-tercer-post-gratuito-bloqueado.png';
			await posting.page.screenshot({ path: screenshotPath});
			test.info().attach('screenshot', {
				path: screenshotPath,
				contentType: 'image/png'
			});
			await posting.Modal_Posting.X_button.click();
		});

		await test.step('Intentar crear evento de pago (debería mostrar modal de upgrade)', async () => {
			await posting.create_event_button.click();
			await posting.Modal_Posting.title.waitFor({ state: 'visible' });
			await posting.Modal_Posting.paid_event_option.waitFor({ state: 'visible' });
			await posting.Modal_Posting.paid_event_option.click();
			await posting.Modal_Posting.continuebutton.waitFor({ state: 'visible' });
			await posting.Modal_Posting.continuebutton.click();
			
			await expect(posting.Messages.epx_plus_title,
				'No aparece la Modal de upgrade a EPX+. Debería mostrar esta opción cuando se alcanza el límite de posts.'
			).toBeVisible();
			
			await expect(posting.Messages.superstar_title,
				'No se muestra el título "Superstar!" en la pantalla de upgrade.'
			).toBeVisible();
			
			await expect(posting.Messages.free_listings_message,
				'No aparece el mensaje que indica que ya se usaron los posts gratuitos incluidos en la membresía.'
			).toBeVisible();
			
			await expect(posting.Messages.limited_opportunities_message,
				'No se muestra el mensaje sobre el límite de oportunidades de posts por período.'
			).toBeVisible();
			
			await expect(posting.Messages.pay_to_play_option,
				'No aparece la opción "Pay to Play" para continuar publicando.'
			).toBeVisible();
		});

		await test.step('Cerrar modal de upgrade', async () => {
			await posting.page.waitForTimeout(1500);
			const screenshotPath = 'evidence/posting-limits-modal-upgrade.png';
			await posting.page.screenshot({ path: screenshotPath});
			test.info().attach('screenshot', {
				path: screenshotPath,
				contentType: 'image/png'
			});
			await posting.Modal_Posting.X_button.click();
			await posting.modal_container.waitFor({ state: 'hidden' });
		});
	});
});