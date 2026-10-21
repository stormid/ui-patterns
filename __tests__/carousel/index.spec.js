const { test, expect } = require("@playwright/test");
import { AxeBuilder } from '@axe-core/playwright';

let tabKey;

test.beforeEach(async ({ page }, testInfo) => {
	await page.goto("/example/carousel/");
	tabKey = testInfo.project.use.defaultBrowserType === 'webkit'
		? "Alt+Tab"
		: "Tab";
});

test.describe("Carousel > Functionality", { tag: '@all'}, () => {
	test('The previous button should be inactive at the start of the list', async ({ page }) => {
		await expect(page.getByRole('button', { name: 'Previous' })).toHaveAttribute('aria-disabled', 'true');
		await expect(page.getByRole('button', { name: 'Next' })).toHaveAttribute('aria-disabled', 'false');
	});

	test('The next and previous buttons should move the carousel', async ({ page }) => {
		const firstLink = page.getByRole('link', { name: 'Planning your visit' });
		await expect(firstLink).toBeInViewport();

		await page.getByRole('button', { name: 'Next' }).click();
		await expect(firstLink).not.toBeInViewport();
		await expect(page.getByRole('button', { name: 'Previous' })).toHaveAttribute('aria-disabled', 'false');

		await page.getByRole('button', { name: 'Previous' }).click();
		await expect(firstLink).toBeInViewport();
		await expect(page.getByRole('button', { name: 'Previous' })).toHaveAttribute('aria-disabled', 'true');
	});

	test('An item out of view should be moved into view when it receives focus', async ({ page }) => {
		const lastLink = page.getByRole('link', { name: 'Frequently asked questions' });
		await expect(lastLink).not.toBeInViewport();

		await lastLink.focus();
		await expect(lastLink).toBeInViewport();
		await expect(page.getByRole('button', { name: 'Next' })).toHaveAttribute('aria-disabled', 'true');
	});

	test('An item focused while the carousel is moving should be in view when it stops', async ({ page }) => {
		// The third item is still in view when focused, but on desktop the carousel is moving it out of view
		await page.evaluate(() => {
			document.querySelector('.js-carousel__next').click();
			document.querySelectorAll('.carousel__link')[2].focus();
		});
		const link = page.locator('.carousel__link').nth(2);
		await expect(link).toBeFocused();

		const isStill = () => page.evaluate(() => new Promise(resolve => {
			const track = document.querySelector('.carousel__track');
			const transform = track.style.transform;
			requestAnimationFrame(() => requestAnimationFrame(() => resolve(track.style.transform === transform)));
		}));
		await expect.poll(isStill).toBe(true);
		await expect(link).toBeInViewport({ ratio: 1 });
	});
});

test.describe("Carousel > Keyboard", { tag: '@all'}, () => {
	test('Focus should stay on the next button when the end of the list is reached', async ({ page }) => {
		const next = page.getByRole('button', { name: 'Next' });
		await next.focus();
		for (let i = 0; i < 7; i++) await page.keyboard.press('Enter');

		await expect(next).toHaveAttribute('aria-disabled', 'true');
		await expect(next).toBeFocused();
		await expect(page.getByRole('link', { name: 'Frequently asked questions' })).toBeInViewport();
	});

	test('Tabbing through the items should move each one into view', async ({ page }) => {
		await page.getByRole('button', { name: 'Next' }).focus();
		const links = page.locator('.carousel__link');
		const count = await links.count();
		for (let i = 0; i < count; i++) {
			await page.keyboard.press(tabKey);
			await expect(links.nth(i)).toBeFocused();
			await expect(links.nth(i)).toBeInViewport({ ratio: 1 });
		}
	});
});

test.describe("Carousel > Pointer", { tag: '@desktop'}, () => {
	test('Dragging should move the carousel', async ({ page }) => {
		const firstLink = page.getByRole('link', { name: 'Planning your visit' });
		const box = await page.locator('.carousel__viewport').boundingBox();
		const y = box.y + box.height / 2;

		await page.mouse.move(box.x + box.width - 20, y);
		await page.mouse.down();
		await page.mouse.move(box.x + 20, y, { steps: 10 });
		await page.mouse.up();

		await expect(firstLink).not.toBeInViewport();
	});

	test('A horizontal trackpad swipe should move the carousel', async ({ page }) => {
		const firstLink = page.getByRole('link', { name: 'Planning your visit' });
		const box = await page.locator('.carousel__viewport').boundingBox();

		await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
		for (let i = 0; i < 10; i++) await page.mouse.wheel(40, 0);

		await expect(firstLink).not.toBeInViewport();
	});

	test('A vertical scroll over the carousel should scroll the page, not the carousel', async ({ page }) => {
		await page.setViewportSize({ width: 1280, height: 300 });
		const firstLink = page.getByRole('link', { name: 'Planning your visit' });
		const box = await page.locator('.carousel__viewport').boundingBox();

		await page.mouse.move(box.x + box.width / 2, box.y + 20);
		await page.mouse.wheel(0, 200);

		await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
		await expect(page.getByRole('button', { name: 'Previous' })).toHaveAttribute('aria-disabled', 'true');
		await expect(firstLink).toBeAttached();
	});
});

test.describe("Carousel > Markup tests", { tag: '@reduced'}, () => {
	test('The carousel should be a region named by its heading, containing a list of items', async ({ page }) => {
		const region = page.getByRole('region', { name: 'Plan your visit' });
		await expect(region).toBeVisible();
		await expect(region.getByRole('list')).toHaveCount(1);
		await expect(region.getByRole('listitem')).toHaveCount(7);
	});

	test('Items should not have carousel roles, position labels or be hidden from screen readers', async ({ page }) => {
		await expect(page.locator('[aria-roledescription]')).toHaveCount(0);
		await expect(page.locator('[aria-live]')).toHaveCount(0);
		await expect(page.locator('.carousel__slide[aria-label], .carousel__slide[aria-hidden]')).toHaveCount(0);
	});

	test('The buttons should come before the list and use aria-disabled rather than disabled', async ({ page }) => {
		const precedes = await page.evaluate(() => {
			const controls = document.querySelector('.js-carousel__controls');
			const list = document.querySelector('.carousel__track');
			return Boolean(controls.compareDocumentPosition(list) & Node.DOCUMENT_POSITION_FOLLOWING);
		});
		expect(precedes).toBe(true);
		await expect(page.locator('.carousel__btn[disabled]')).toHaveCount(0);
	});
});

test.describe("Carousel > Axe", { tag: '@reduced'}, () => {
	test('Should not have any automatically detectable accessibility issues', async ({ page }) => {
		const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
		expect(accessibilityScanResults.violations).toEqual([]);
	});
});

test.describe("Carousel > Without JavaScript", { tag: '@reduced'}, () => {
	test.use({ javaScriptEnabled: false });

	test('The buttons should be hidden and the list should scroll to every item', async ({ page }) => {
		await expect(page.getByRole('button', { name: 'Next' })).toBeHidden();

		const viewport = page.locator('.carousel__viewport');
		expect(await viewport.evaluate(node => node.scrollWidth > node.clientWidth)).toBe(true);

		const lastLink = page.getByRole('link', { name: 'Frequently asked questions' });
		await lastLink.focus();
		await expect(lastLink).toBeInViewport();
	});
});
