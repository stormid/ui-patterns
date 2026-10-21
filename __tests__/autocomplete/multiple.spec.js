const { test, expect } = require("@playwright/test");
import { AxeBuilder } from '@axe-core/playwright';

const choose = async (page, query, option) => {
	await page.getByRole('combobox').pressSequentially(query);
	await page.getByRole('option', { name: option }).click();
};

test.beforeEach(async ({ page }) => {
	await page.goto("/example/autocomplete/multiple/");
});

test.describe("Autocomplete multiple > Functionality", { tag: '@all'}, () => {
	test('Each chosen option should be shown and submitted under the same name', async ({ page }) => {
		await choose(page, 'fr', 'France');
		await choose(page, 'sp', 'Spain');

		await expect(page.locator('.autocomplete__chip-label')).toHaveText(['France', 'Spain']);
		await expect(page.locator('input[type="hidden"][name="countries"]')).toHaveCount(2);
		const values = await page.locator('input[type="hidden"][name="countries"]').evaluateAll(inputs => inputs.map(input => input.value));
		expect(values).toEqual(['FR', 'ES']);
	});

	test('A chosen option should be removed from the list so it cannot be chosen twice', async ({ page }) => {
		await choose(page, 'land', 'Ireland');
		await page.getByRole('combobox').pressSequentially('land');

		await expect(page.getByRole('option')).toHaveText(['Finland', 'Iceland', 'Netherlands', 'New Zealand', 'Switzerland']);
	});

	test('Adding and removing an option should be announced', async ({ page }) => {
		const status = page.locator('.autocomplete__status');
		await choose(page, 'fr', 'France');
		await expect(status).toHaveText('France added');

		await page.getByRole('button', { name: 'Remove France' }).click();
		await expect(status).toHaveText('France removed');
		await expect(page.locator('.autocomplete__chip')).toHaveCount(0);
		await expect(page.locator('input[type="hidden"][name="countries"]')).toHaveCount(0);
	});
});

test.describe("Autocomplete multiple > Keyboard", { tag: '@all'}, () => {
	test('Enter should add the highlighted option and keep focus in the input', async ({ page }) => {
		const combobox = page.getByRole('combobox');
		await combobox.pressSequentially('fr');
		await page.keyboard.press('ArrowDown');
		await page.keyboard.press('Enter');

		await expect(page.locator('.autocomplete__chip-label')).toHaveText(['France']);
		await expect(combobox).toBeFocused();
	});

	test('Backspace in an empty input should remove the last chosen option', async ({ page }) => {
		await choose(page, 'fr', 'France');
		await choose(page, 'sp', 'Spain');
		const combobox = page.getByRole('combobox');
		await combobox.fill('');
		await combobox.press('Backspace');

		await expect(page.locator('.autocomplete__chip-label')).toHaveText(['France']);
	});
});

test.describe("Autocomplete multiple > Markup tests", { tag: '@reduced'}, () => {
	test('Remove buttons should be buttons labelled with the option, at least 24 by 24 pixels', async ({ page }) => {
		await choose(page, 'fr', 'France');
		const remove = page.getByRole('button', { name: 'Remove France' });

		await expect(remove).toHaveJSProperty('tagName', 'BUTTON');
		const box = await remove.boundingBox();
		expect(box.width).toBeGreaterThanOrEqual(24);
		expect(box.height).toBeGreaterThanOrEqual(24);
	});
});

test.describe("Autocomplete multiple > Axe", { tag: '@reduced'}, () => {
	test('Should not have any automatically detectable accessibility issues', async ({ page }) => {
		const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
		expect(accessibilityScanResults.violations).toEqual([]);
	});

	test('Should not have any automatically detectable accessibility issues with options chosen', async ({ page }) => {
		await choose(page, 'fr', 'France');
		await choose(page, 'sp', 'Spain');
		const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
		expect(accessibilityScanResults.violations).toEqual([]);
	});
});

test.describe("Autocomplete multiple > Without JavaScript", { tag: '@reduced'}, () => {
	test.use({ javaScriptEnabled: false });

	test('The native multiple select should be available to choose countries', async ({ page }) => {
		const select = page.getByLabel(/Countries you have visited/);
		await expect(select).toHaveJSProperty('multiple', true);
		await select.selectOption(['FR', 'ES']);
		await expect(select).toHaveValues(['FR', 'ES']);
	});
});
