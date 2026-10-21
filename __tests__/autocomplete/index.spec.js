const { test, expect } = require("@playwright/test");
import { AxeBuilder } from '@axe-core/playwright';

const LAND_COUNTRIES = ['Finland', 'Iceland', 'Ireland', 'Netherlands', 'New Zealand', 'Switzerland'];

test.beforeEach(async ({ page }) => {
	await page.goto("/example/autocomplete/");
});

test.describe("Autocomplete > Functionality", { tag: '@all'}, () => {
	test('Options should be hidden until the user types', async ({ page }) => {
		await expect(page.getByRole('listbox')).toBeHidden();
		await page.getByRole('combobox').pressSequentially('land');
		await expect(page.getByRole('listbox')).toBeVisible();
	});

	test('Options should be filtered by the typed text and the result count announced', async ({ page }) => {
		await page.getByRole('combobox').pressSequentially('land');
		await expect(page.getByRole('option')).toHaveText(LAND_COUNTRIES);
		await expect(page.locator('.autocomplete__status')).toHaveText('6 results are available');
	});

	test('A message should be shown and announced when there are no results', async ({ page }) => {
		await page.getByRole('combobox').pressSequentially('xyz');
		await expect(page.locator('.autocomplete__option--empty')).toHaveText('No results found');
		await expect(page.locator('.autocomplete__status')).toHaveText('No results found');
	});

	test('Clicking an option should choose it, show its label and submit its value', async ({ page }) => {
		const combobox = page.getByRole('combobox');
		await combobox.pressSequentially('land');
		await page.getByRole('option', { name: 'Ireland' }).click();

		await expect(combobox).toHaveValue('Ireland');
		await expect(page.locator('input[type="hidden"][name="country"]')).toHaveValue('IE');
		await expect(page.getByRole('listbox')).toBeHidden();
	});
});

test.describe("Autocomplete > Keyboard", { tag: '@all'}, () => {
	test('Arrow keys should highlight options while focus stays in the input', async ({ page }) => {
		const combobox = page.getByRole('combobox');
		await combobox.pressSequentially('land');
		await page.keyboard.press('ArrowDown');
		await page.keyboard.press('ArrowDown');

		await expect(combobox).toBeFocused();
		const highlighted = page.locator('.autocomplete__option--active');
		await expect(highlighted).toHaveText('Iceland');
		await expect(combobox).toHaveAttribute('aria-activedescendant', await highlighted.getAttribute('id'));
	});

	test('Enter should choose the highlighted option and close the list', async ({ page }) => {
		const combobox = page.getByRole('combobox');
		await combobox.pressSequentially('land');
		await page.keyboard.press('ArrowDown');
		await page.keyboard.press('Enter');

		await expect(combobox).toHaveValue('Finland');
		await expect(page.locator('input[type="hidden"][name="country"]')).toHaveValue('FI');
		await expect(page.getByRole('listbox')).toBeHidden();
	});

	test('Escape should close the list without choosing an option', async ({ page }) => {
		const combobox = page.getByRole('combobox');
		await combobox.pressSequentially('land');
		await page.keyboard.press('ArrowDown');
		await page.keyboard.press('Escape');

		await expect(page.getByRole('listbox')).toBeHidden();
		await expect(combobox).toBeFocused();
		await expect(page.locator('input[type="hidden"][name="country"]')).toHaveValue('');
	});
});

test.describe("Autocomplete > Markup tests", { tag: '@reduced'}, () => {
	test('The select should be enhanced into a text input combobox labelled by the original label', async ({ page }) => {
		const combobox = page.getByRole('combobox', { name: /Country of residence/ });
		await expect(combobox).toHaveJSProperty('tagName', 'INPUT');
		await expect(page.locator('select')).toHaveCount(0);
	});

	test('The combobox should reference the listbox and describe whether it is expanded', async ({ page }) => {
		const combobox = page.getByRole('combobox');
		const listbox = page.locator('[role="listbox"]');

		await expect(combobox).toHaveAttribute('aria-controls', await listbox.getAttribute('id'));
		await expect(combobox).toHaveAttribute('aria-expanded', 'false');
		await combobox.pressSequentially('land');
		await expect(combobox).toHaveAttribute('aria-expanded', 'true');
	});
});

test.describe("Autocomplete > Axe", { tag: '@reduced'}, () => {
	test('Should not have any automatically detectable accessibility issues', async ({ page }) => {
		const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
		expect(accessibilityScanResults.violations).toEqual([]);
	});

	test('Should not have any automatically detectable accessibility issues when the list is open', async ({ page }) => {
		await page.getByRole('combobox').pressSequentially('land');
		await page.keyboard.press('ArrowDown');
		const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
		expect(accessibilityScanResults.violations).toEqual([]);
	});
});

test.describe("Autocomplete > Without JavaScript", { tag: '@reduced'}, () => {
	test.use({ javaScriptEnabled: false });

	test('The native select should be available to choose a country', async ({ page }) => {
		const select = page.getByLabel(/Country of residence/);
		await expect(select).toHaveJSProperty('tagName', 'SELECT');
		await expect(select).toHaveAttribute('name', 'country');
		await select.selectOption('IE');
		await expect(select).toHaveValue('IE');
	});
});
