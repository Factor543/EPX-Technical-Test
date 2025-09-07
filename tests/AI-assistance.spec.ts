/* eslint-disable @typescript-eslint/no-unused-vars */
import { expect } from 'playwright/test';
import { test } from '../index';

const promts = {
	networking: 'Dame una lista breve de eventos de networking en Miami este mes. Si no hay, responde brevemente indicándolo.',
	structure: 'Dame una lista de 2 eventos próximos. Solo responde con: Titulo: [título], Fecha: [fecha], Hora: [hora]. NADA MÁS. Sin saludos, sin explicaciones, sin texto adicional.',
	json: 'UN evento próximo en JSON válido dentro de code. ESTRUCTURA: {"titulo": "[título]", "fecha": "[fecha]", "hora": "[hora]"} - CIERRA EL JSON. NADA MÁS.',
	empty: '',
	spaces: '   ',
	interaction: '¿Cuáles son los mejores eventos de networking en Miami?'
};

test.describe('C.A.R.L. - Flujo principal', () => {
	test.beforeEach(async ({ page, login, carl }) => {
		await page.goto(login.url, { waitUntil: 'domcontentloaded' });
		await login.Login({
			email: 'cmendoza+qa1@shokworks.io', 
			password: 'Cmendoza1.'
		});
		await page.getByRole('heading', { name: 'Online', exact: true }).waitFor({ state: 'visible' });
		await carl.access.click();
		await page.waitForURL(/carl/);
		await carl.title_Chat.waitFor({ state: 'visible' });
	});

	test('Pregunta sobre eventos de networking', async ({ carl }) => {
		test.info().annotations.push({ 
			type: 'BUG ❌',
			description: 'C.A.R.L. no responde al primer mensaje en conversaciones nuevas. ' +
			'El test inicializa en contexto limpio (afterEach ejecuta clearContext), pero C.A.R.L. falla sistemáticamente en la primera interacción de cada conversación nueva.' +
			' Evidencias ⏬⏬' 
		});
		await test.step('Enviar pregunta y verificar que se ve reflejada en el chat', async () => {
			await carl.input.waitFor({ state: 'visible' });
			await carl.input.fill(promts.networking);
			await carl.sendPrompt.click();
			await carl.page.getByText(promts.networking).last().waitFor({ state: 'visible' });
		});

		await test.step('Verificar que la respuesta se completa y el input se desbloquea', async () => {
			await carl.waitForResponseComplete();
		});

		await test.step('Validar respuesta de C.A.R.L.', async () => {
			await carl.page.waitForTimeout(5_000);
			
			const responseExists = await carl.carl_response.isVisible();
			
			if (responseExists) {
				const responseText = carl.carl_response.locator('.carl-chat-item p').last();
				await expect(responseText, 'C.A.R.L. no respondió').not.toBeEmpty();
				await expect(responseText).toContainText(/eventos|miami|networking/i);
			} else {
				throw new Error(`C.A.R.L. no respondió después de 3s. Prompt enviado: "${promts.networking}". Verificar conectividad o estado del servicio.`);
			}
		});
	});

	test.afterEach(async ({ carl },) => {
		try {
			await carl.clearContext();
		} catch (e) {
			test.info().annotations.push({
				type: 'Comportamiento controlado',
				description: 'No afecta validación del test principal'
			});
		}
	});
});

test.describe('C.A.R.L. - Respuestas Estructuradas', () => {
	test.beforeEach(async ({ page, login, carl }) => {
		await page.goto(login.url, { waitUntil: 'domcontentloaded' });
		await login.Login({
			email: 'cmendoza+qa1@shokworks.io', 
			password: 'Cmendoza1.'
		});
		await page.getByRole('heading', { name: 'Online', exact: true }).waitFor({ state: 'visible' });
		await carl.access.click();
		await page.waitForURL(/carl/);
		await carl.title_Chat.waitFor({ state: 'visible' });
		await carl.input.fill('hola, respondeme con un saludo corto');
		await carl.sendPrompt.click();
		await page.waitForTimeout(2000);
	});

	test('Respuesta con estructura - Formato específico', async ({ carl }) => {
		test.info().annotations.push({ 
			type: 'FIX ⚠️',
			description: 'Se ejecuta interacción previa en beforeEach (líneas 75-76) para evitar el bug del primer mensaje. ' +
			'Esta solución permite probar la funcionalidad real de C.A.R.L. Saltandonos el fallo conocido en conversaciones nuevas previamente mencionado.' +
			'Evidencias ⏬⏬' 
		});
		
		await test.step('Enviar solicitud de respuesta estructurada', async () => {
			
			await carl.input.waitFor({ state: 'visible' });
			await carl.input.fill(promts.structure);
			await carl.sendPrompt.click();
			await carl.message_container.locator('div').filter({ hasText: promts.structure }).last().waitFor({ state: 'visible' });
		});

		await test.step('Verificar que la respuesta se completa', async () => {
			await carl.waitForResponseComplete();
		});

		await test.step('Validar respuesta estructurada', async () => {
			await carl.page.waitForTimeout(3_000);
			
			// Verificar que C.A.R.L. respondió
			await expect(carl.carl_response, 'C.A.R.L. no respondió después de 3s').toBeVisible();
			
			// Capturar TODO el texto de la respuesta
			const fullResponseText = await carl.carl_response.textContent();
			expect(fullResponseText, 'C.A.R.L. no respondió').not.toBe('');
			
			// Validar que siguió el formato específico solicitado
			await expect(carl.carl_response).toContainText(/titulo:/i);
			await expect(carl.carl_response).toContainText(/fecha:/i);
			await expect(carl.carl_response).toContainText(/hora:/i);
			
			// Validar que contiene al menos 2 eventos (como se solicitó)
			const tituloCount = (fullResponseText?.match(/titulo:/gi) || []).length;
			expect(tituloCount, 'C.A.R.L. no respondió con formato "Titulo:", "Fecha:" y "Hora:"').toBeGreaterThanOrEqual(2);
			
			// Validar que no contiene texto extra como saludos o explicaciones
			await expect(carl.carl_response).not.toContainText(/Hola|Carla|tienes|ideal|gran/i);
		});
	});

	test('Respuesta con estructura - Formato JSON', async ({ carl }) => {
		test.info().annotations.push({ 		
			type: 'BUG ❌',
			description: 'C.A.R.L. genera JSON malformado, omitiendo sistemáticamente la llave de cierre. ' +
			'El test valida formato JSON correcto pero C.A.R.L. entrega estructura incompleta, fallando la validación de sintaxis. de un JSON válido.' +
			' Evidencias ⏬⏬' 
		});
		
		await test.step('Enviar solicitud de respuesta en JSON', async () => {
			await carl.input.waitFor({ state: 'visible' });
			await carl.input.fill(promts.json);
			await carl.sendPrompt.click();
			await carl.message_container.locator('div').filter({ hasText: promts.json }).last().waitFor({ state: 'visible' });
		});

		await test.step('Verificar que la respuesta se completa', async () => {
			await carl.waitForResponseComplete();
		});

		await test.step('Validar respuesta en formato JSON', async () => {
			await carl.page.waitForTimeout(5_000);
			
			const responseExists = await carl.carl_response.isVisible();
			
			if (responseExists) {
				// Captura específicamente el contenido de <code>
				const codeContent = await carl.carl_response.locator('code').textContent();
				
				expect(codeContent, 'C.A.R.L. no respondió').not.toBe('');
				
				// Validar que contiene estructura JSON válida
				expect(codeContent, 'JSON debe tener llave de apertura').toContain('{');
				expect(codeContent, 'JSON debe contener campo titulo').toContain('titulo');
				expect(codeContent, 'JSON debe contener campo fecha').toContain('fecha');
				expect(codeContent, 'JSON debe contener campo hora').toContain('hora');
				expect(codeContent, 'JSON debe tener llave de cierre').toContain('}');
				
				// Validar que no contiene texto extra como saludos o explicaciones
				await expect(carl.carl_response).not.toContainText(/Hola|Carla|solicitaste|valido|gran/i);
			} else {
				throw new Error(`C.A.R.L. no respondió después de 3s. Prompt enviado: "${promts.json}". Verificar conectividad o estado del servicio.`);
			}
		});
	});

	test.afterEach(async ({ carl }) => {
		try {
		  await carl.clearContext();
		} catch (e) {
		  test.info().annotations.push({
				type: 'Comportamiento controlado',
				description: 'No afecta validación del test principal'
		  });
		}
	  });
});

test.describe('C.A.R.L. - Validaciones de Entrada', () => {
	test.beforeEach(async ({ page, login, carl }) => {
		await page.goto(login.url, { waitUntil: 'domcontentloaded' });
		await login.Login({
			email: 'cmendoza+qa1@shokworks.io', 
			password: 'Cmendoza1.'
		});
		await page.getByRole('heading', { name: 'Online', exact: true }).waitFor({ state: 'visible' });
		await carl.access.click();
		await page.waitForURL(/carl/);
		await carl.title_Chat.waitFor({ state: 'visible' });
		await carl.input.fill('hola, respondeme con un saludo corto');
		await carl.sendPrompt.click();
		await page.waitForTimeout(2000);
	});
	test('Interacción seguida - Input bloqueado durante respuesta', async ({ carl }) => {
		test.info().annotations.push({ 
			type: 'FIX ⚠️', 
			description: 'Se ejecuta interacción previa para evitar bug del primer mensaje y poder validar bloqueo del input correctamente. Evidencias ⏬⏬' 
		});

		await test.step('Enviar mensaje y validar bloqueo del input', async () => {
			await carl.input.waitFor({ state: 'visible' });
			await carl.input.fill(promts.networking);
			await carl.sendPrompt.click();
			await carl.page.getByText(promts.networking).last().waitFor({ state: 'visible' });
			
			// Validar que input está bloqueado mientras responde
			await expect(carl.input).toBeDisabled();
		});

		await test.step('Esperar respuesta y validar que input se habilita', async () => {
			// Esperar que termine y se habilite
			await carl.waitForResponseComplete();
			await expect(carl.input).toBeEnabled();
		});
	});

	test.afterEach(async ({ carl }) => {
		try {
			await carl.clearContext();
		} catch (e) {
			test.info().annotations.push({
				type: 'Comportamiento controlado ✅',
				description: 'falla porque no hay conversacion que eliminar. el test pasa ✅'
			});
		}
	});
});