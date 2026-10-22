const { test, expect } = require("@playwright/test");
import { AxeBuilder } from '@axe-core/playwright';

const image = (scope, name) => scope.getByRole('img', { name });
const inline = page => page.getByRole('region', { name: 'Illustrations' });
const dialog = page => page.getByRole('dialog', { name: 'Illustrations' });

test.describe("Gallery > Functionality", { tag: '@all'}, () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/example/gallery/");
	});

	test('The count should show the position of the item in view', async ({ page }) => {
		const gallery = inline(page);
		const count = gallery.locator('.js-gallery__count');
		await expect(count).toHaveText('1 of 6');
		await expect(image(gallery, 'Placeholder image 1')).toBeInViewport({ ratio: 1 });

		await gallery.getByRole('button', { name: 'Next' }).click();
		await expect(count).toHaveText('2 of 6');
		await expect(image(gallery, 'Placeholder image 2')).toBeInViewport({ ratio: 1 });
		await expect(image(gallery, 'Placeholder image 1')).not.toBeInViewport();

		await gallery.getByRole('button', { name: 'Previous' }).click();
		await expect(count).toHaveText('1 of 6');
	});

	test('The images next to the item in view should be loaded before they move into view', async ({ page }) => {
		const gallery = inline(page);
		const loading = () => gallery.locator('.gallery__img').evaluateAll(imgs => imgs.map(img => img.loading));
		await expect.poll(loading).toEqual(['eager', 'eager', 'lazy', 'lazy', 'lazy', 'lazy']);

		await gallery.getByRole('button', { name: 'Next' }).click();
		await expect.poll(loading).toEqual(['eager', 'eager', 'eager', 'lazy', 'lazy', 'lazy']);
	});

	test('Selecting an image should open the dialog at that image, and closing it should return focus to the image', async ({ page }) => {
		const gallery = inline(page);
		await gallery.getByRole('button', { name: 'Next' }).click();
		await gallery.getByRole('button', { name: 'Next' }).click();
		const link = gallery.getByRole('link', { name: 'Placeholder image 3' });
		await expect(link).toBeInViewport({ ratio: 1 });
		await link.click();

		await expect(dialog(page)).toBeVisible();
		await expect(dialog(page).locator('.js-gallery__count')).toHaveText('3 of 6');
		await expect(image(dialog(page), 'Placeholder image 3')).toBeInViewport({ ratio: 1 });
		await expect.poll(() => page.evaluate(() => document.querySelector('[role=dialog]').contains(document.activeElement))).toBe(true);

		await dialog(page).getByRole('button', { name: 'Close' }).click();
		await expect(dialog(page)).toBeHidden();
		await expect(link).toBeFocused();
	});

	test('The address should update to the item in the dialog without adding to the history, and reset when it closes', async ({ page }) => {
		const length = await page.evaluate(() => history.length);
		await inline(page).getByRole('link', { name: 'Placeholder image 1' }).click();
		expect(new URL(page.url()).hash).toBe('');

		await dialog(page).getByRole('button', { name: 'Next' }).click();
		await expect.poll(() => new URL(page.url()).hash).toBe('#gallery-lighthouse');
		await dialog(page).getByRole('button', { name: 'Next' }).click();
		await expect.poll(() => new URL(page.url()).hash).toBe('#gallery-skyline');
		expect(await page.evaluate(() => history.length)).toBe(length);

		await dialog(page).getByRole('button', { name: 'Close' }).click();
		expect(new URL(page.url()).hash).toBe('');
	});

	test('Loading the page with the address of an item should open the dialog at that item', async ({ page }) => {
		await page.goto("/example/gallery/#gallery-boat");
		await expect(dialog(page)).toBeVisible();
		await expect(dialog(page).locator('.js-gallery__count')).toHaveText('5 of 6');
		await expect(image(dialog(page), 'Placeholder image 5')).toBeInViewport({ ratio: 1 });
	});

	test('Following a link to an item should open the dialog at that item', async ({ page }) => {
		await page.evaluate(() => { location.hash = '#gallery-apple'; });
		await expect(dialog(page)).toBeVisible();
		await expect(dialog(page).locator('.js-gallery__count')).toHaveText('4 of 6');
		await expect(image(dialog(page), 'Placeholder image 4')).toBeInViewport({ ratio: 1 });
	});

	test('The full screen button should only be shown in the dialog, where full screen is supported', async ({ page }) => {
		await expect(inline(page).getByRole('button', { name: 'Full screen' })).toHaveCount(0);
		await inline(page).getByRole('link', { name: 'Placeholder image 1' }).click();

		const button = dialog(page).getByRole('button', { name: 'Full screen' });
		const supported = await page.evaluate(() => document.fullscreenEnabled);
		if (!supported) {
			await expect(button).toBeHidden();
			return;
		}
		await expect(button).toHaveAttribute('aria-pressed', 'false');
		await button.click();
		await expect.poll(() => page.evaluate(() => document.fullscreenElement?.classList.contains('js-gallery'))).toBe(true);
		await expect(button).toHaveAttribute('aria-pressed', 'true');
		await expect(dialog(page).locator('.js-gallery__count')).toHaveText('1 of 6');

		await button.click();
		await expect.poll(() => page.evaluate(() => document.fullscreenElement)).toBe(null);
		await expect(button).toHaveAttribute('aria-pressed', 'false');
	});
});

test.describe("Gallery > Markup tests", { tag: '@reduced'}, () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/example/gallery/");
	});

	test('The gallery should be a region named by its heading, containing a list of images that open the dialog', async ({ page }) => {
		const region = inline(page);
		await expect(region).toBeVisible();
		await expect(region.getByRole('listitem')).toHaveCount(6);
		await expect(region.locator('a[aria-haspopup="dialog"]')).toHaveCount(6);
	});

	test('The items in the dialog should have unique ids', async ({ page }) => {
		const ids = await page.locator('.js-gallery-modal .carousel__slide').evaluateAll(items => items.map(item => item.id));
		expect(new Set(ids.filter(Boolean)).size).toBe(6);
		expect(await page.locator('.carousel__slide[id]').count()).toBe(6);
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

	test('Should not have any automatically detectable accessibility issues with the dialog open', async ({ page }) => {
		await inline(page).getByRole('link', { name: 'Placeholder image 1' }).click();
		await expect(dialog(page)).toBeVisible();
		const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
		expect(accessibilityScanResults.violations).toEqual([]);
	});
});

test.describe("Gallery > Thumbnails", { tag: '@all'}, () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/example/gallery-modal/");
	});

	test('A thumbnail should open the dialog at its image, and closing it should return focus to the thumbnail', async ({ page }) => {
		const thumbnail = page.getByRole('link', { name: 'Placeholder image 3' });
		await thumbnail.focus();
		await page.keyboard.press('Enter');

		await expect(dialog(page)).toBeVisible();
		await expect(dialog(page).locator('.js-gallery__count')).toHaveText('3 of 6');
		await expect(image(dialog(page), 'Placeholder image 3')).toBeInViewport({ ratio: 1 });
		await expect.poll(() => page.evaluate(() => document.querySelector('[role=dialog]').contains(document.activeElement))).toBe(true);

		await dialog(page).getByRole('button', { name: 'Close' }).click();
		await expect(dialog(page)).toBeHidden();
		await expect(thumbnail).toBeFocused();
	});

	test('Loading the page with the address of an item should open the dialog at that item', async ({ page }) => {
		await page.goto("/example/gallery-modal/#gallery-tree");
		await expect(dialog(page)).toBeVisible();
		await expect(dialog(page).locator('.js-gallery__count')).toHaveText('6 of 6');
		await expect(image(dialog(page), 'Placeholder image 6')).toBeInViewport({ ratio: 1 });
	});
});

test.describe("Gallery > Thumbnails > Axe", { tag: '@reduced'}, () => {
	test('Should not have any automatically detectable accessibility issues with the dialog open', async ({ page }) => {
		await page.goto("/example/gallery-modal/");
		await page.getByRole('link', { name: 'Placeholder image 4' }).click();
		await expect(page.getByRole('dialog')).toBeVisible();
		const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
		expect(accessibilityScanResults.violations).toEqual([]);
	});
});

test.describe("Gallery > Without JavaScript", { tag: '@reduced'}, () => {
	test.use({ javaScriptEnabled: false });

	test('The buttons should be hidden, the list should scroll to every item, and each image should link to its full size image', async ({ page }) => {
		await page.goto("/example/gallery/");
		await expect(page.getByRole('dialog')).toBeHidden();
		await expect(page.getByRole('button', { name: 'Next' })).toBeHidden();
		const viewport = inline(page).locator('.carousel__viewport');
		expect(await viewport.evaluate(node => node.scrollWidth > node.clientWidth)).toBe(true);
		await expect(inline(page).getByRole('link', { name: 'Placeholder image 6' })).toHaveAttribute('href', '/static/img/gallery/tree.svg');
	});

	test('Each thumbnail should link to its full size image', async ({ page }) => {
		await page.goto("/example/gallery-modal/");
		await expect(page.getByRole('dialog')).toBeHidden();
		await expect(page.getByRole('link', { name: 'Placeholder image 6' })).toHaveAttribute('href', '/static/img/gallery/tree.svg');
	});
});
