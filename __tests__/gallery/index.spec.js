const { test, expect } = require("@playwright/test");
import { AxeBuilder } from '@axe-core/playwright';

const image = (scope, name) => scope.getByRole('img', { name });

test.describe("Gallery > Functionality", { tag: '@all'}, () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/example/gallery/");
	});

	test('The count should show the position of the item in view', async ({ page }) => {
		const count = page.locator('.js-gallery__count');
		await expect(count).toHaveText('1 of 6');
		await expect(image(page, 'A yellow sun above two rolling green hills')).toBeInViewport({ ratio: 1 });

		await page.getByRole('button', { name: 'Next' }).click();
		await expect(count).toHaveText('2 of 6');
		await expect(image(page, 'A white lighthouse with red stripes against a night sky')).toBeInViewport({ ratio: 1 });
		await expect(image(page, 'A yellow sun above two rolling green hills')).not.toBeInViewport();

		await page.getByRole('button', { name: 'Previous' }).click();
		await expect(count).toHaveText('1 of 6');
	});

	test('The address should update to the item in view without adding to the history', async ({ page }) => {
		expect(new URL(page.url()).hash).toBe('');
		const length = await page.evaluate(() => history.length);

		await page.getByRole('button', { name: 'Next' }).click();
		await expect.poll(() => new URL(page.url()).hash).toBe('#gallery-lighthouse');
		await page.getByRole('button', { name: 'Next' }).click();
		await expect.poll(() => new URL(page.url()).hash).toBe('#gallery-skyline');

		expect(await page.evaluate(() => history.length)).toBe(length);
	});

	test('Loading the page with the address of an item should show that item', async ({ page }) => {
		await page.goto("/example/gallery/#gallery-boat");
		await expect(page.locator('.js-gallery__count')).toHaveText('5 of 6');
		await expect(image(page, 'A sailing boat with white and yellow sails on a blue sea')).toBeInViewport({ ratio: 1 });
	});

	test('Following a link to an item should move the gallery to it', async ({ page }) => {
		await page.evaluate(() => { location.hash = '#gallery-apple'; });
		await expect(page.locator('.js-gallery__count')).toHaveText('4 of 6');
		await expect(image(page, 'A red apple with a single green leaf')).toBeInViewport({ ratio: 1 });
	});

	test('The images next to the item in view should be loaded before they move into view', async ({ page }) => {
		const loading = () => page.locator('.gallery__img').evaluateAll(imgs => imgs.map(img => img.loading));
		await expect.poll(loading).toEqual(['eager', 'eager', 'lazy', 'lazy', 'lazy', 'lazy']);

		await page.getByRole('button', { name: 'Next' }).click();
		await expect.poll(loading).toEqual(['eager', 'eager', 'eager', 'lazy', 'lazy', 'lazy']);
	});

	test('The full screen button should only be shown where full screen is supported', async ({ page }) => {
		const button = page.getByRole('button', { name: 'Full screen' });
		const supported = await page.evaluate(() => document.fullscreenEnabled);
		if (!supported) {
			await expect(button).toBeHidden();
			return;
		}
		await expect(button).toHaveAttribute('aria-pressed', 'false');
		await button.click();
		await expect.poll(() => page.evaluate(() => document.fullscreenElement?.classList.contains('js-gallery'))).toBe(true);
		await expect(button).toHaveAttribute('aria-pressed', 'true');
		await expect(page.locator('.js-gallery__count')).toHaveText('1 of 6');

		await button.click();
		await expect.poll(() => page.evaluate(() => document.fullscreenElement)).toBe(null);
		await expect(button).toHaveAttribute('aria-pressed', 'false');
	});
});

test.describe("Gallery > Markup tests", { tag: '@reduced'}, () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/example/gallery/");
	});

	test('The gallery should be a region named by its heading, containing a list of items with ids', async ({ page }) => {
		const region = page.getByRole('region', { name: 'Illustrations' });
		await expect(region).toBeVisible();
		await expect(region.getByRole('listitem')).toHaveCount(6);
		const ids = await region.getByRole('listitem').evaluateAll(items => items.map(item => item.id));
		expect(new Set(ids.filter(Boolean)).size).toBe(6);
	});

	test('The count should not be announced, and items should not have carousel roles or be hidden', async ({ page }) => {
		await expect(page.locator('[aria-live]')).toHaveCount(0);
		await expect(page.locator('[aria-roledescription]')).toHaveCount(0);
		await expect(page.locator('.carousel__slide[aria-label], .carousel__slide[aria-hidden]')).toHaveCount(0);
	});

	test('Should not have any automatically detectable accessibility issues', async ({ page }) => {
		const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
		expect(accessibilityScanResults.violations).toEqual([]);
	});
});

test.describe("Gallery > Dialog", { tag: '@all'}, () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/example/gallery-modal/");
	});

	test('A thumbnail should open the dialog at its image, and closing it should return focus to the thumbnail', async ({ page }) => {
		const thumbnail = page.getByRole('link', { name: 'Dark tower blocks against an orange sunset' });
		await thumbnail.focus();
		await page.keyboard.press('Enter');

		const dialog = page.getByRole('dialog', { name: 'Illustrations' });
		await expect(dialog).toBeVisible();
		await expect(dialog.locator('.js-gallery__count')).toHaveText('3 of 6');
		await expect(image(dialog, 'Dark tower blocks against an orange sunset')).toBeInViewport({ ratio: 1 });
		await expect.poll(() => page.evaluate(() => document.querySelector('[role=dialog]').contains(document.activeElement))).toBe(true);

		await dialog.getByRole('button', { name: 'Next' }).click();
		await expect(dialog.locator('.js-gallery__count')).toHaveText('4 of 6');
		await expect.poll(() => new URL(page.url()).hash).toBe('#gallery-apple');

		await dialog.getByRole('button', { name: 'Close' }).click();
		await expect(dialog).toBeHidden();
		await expect(thumbnail).toBeFocused();
		expect(new URL(page.url()).hash).toBe('');
	});

	test('Loading the page with the address of an item should open the dialog at that item', async ({ page }) => {
		await page.goto("/example/gallery-modal/#gallery-tree");
		const dialog = page.getByRole('dialog', { name: 'Illustrations' });
		await expect(dialog).toBeVisible();
		await expect(dialog.locator('.js-gallery__count')).toHaveText('6 of 6');
		await expect(image(dialog, 'A tall green tree standing in a meadow')).toBeInViewport({ ratio: 1 });
	});
});

test.describe("Gallery > Dialog > Axe", { tag: '@reduced'}, () => {
	test('Should not have any automatically detectable accessibility issues with the dialog open', async ({ page }) => {
		await page.goto("/example/gallery-modal/");
		await page.getByRole('link', { name: 'A red apple with a single green leaf' }).click();
		await expect(page.getByRole('dialog')).toBeVisible();
		const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
		expect(accessibilityScanResults.violations).toEqual([]);
	});
});

test.describe("Gallery > Without JavaScript", { tag: '@reduced'}, () => {
	test.use({ javaScriptEnabled: false });

	test('The buttons should be hidden and the list should scroll to every item', async ({ page }) => {
		await page.goto("/example/gallery/");
		await expect(page.getByRole('button', { name: 'Next' })).toBeHidden();
		await expect(page.getByRole('button', { name: 'Full screen' })).toBeHidden();
		const viewport = page.locator('.carousel__viewport');
		expect(await viewport.evaluate(node => node.scrollWidth > node.clientWidth)).toBe(true);
	});

	test('Each thumbnail should link to its full size image', async ({ page }) => {
		await page.goto("/example/gallery-modal/");
		await expect(page.getByRole('dialog')).toBeHidden();
		await expect(page.getByRole('link', { name: 'A tall green tree standing in a meadow' })).toHaveAttribute('href', '/static/img/gallery/tree.svg');
	});
});
