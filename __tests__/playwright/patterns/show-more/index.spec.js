const { test, expect } = require("@playwright/test");
import AxeBuilder from '@axe-core/playwright';

test.beforeEach(async ({ page }) => {
	await page.goto("/example/show-more/");
});

test.describe("Show more > Functionality", { tag: '@all'}, () => {
	test('Show more block should have visibility toggled by button', async ({ page }) => {
		const showButton = page.locator(".js-show-more__btn");
		const hideButton = page.locator('.js-show-more__btn-hide');
		const showMoreBlock = page.locator(".js-show-more__block");

		await expect(showMoreBlock).toBeHidden();
		await expect(hideButton).toBeHidden();
		await showButton.click();
		await expect(showMoreBlock).toBeVisible();
		await expect(hideButton).toBeVisible();
		await expect(showButton).toBeHidden();
		await hideButton.click();
		await expect(showMoreBlock).toBeHidden();
		await expect(hideButton).toBeHidden();
		await expect(showButton).toBeVisible();
	});
});

test.describe("Show more > Keyboard", { tag: '@all'}, () => {
	test("Buttons should be focusable", async ({ page }) => {
       await page.keyboard.press('Tab');
	   const locator = page.locator(":focus");
	   await expect(locator).toHaveRole('button');
	   await expect(locator).toHaveClass(/js-show-more__toggle/);
    });

	test('showMoreFocus should correctly manage focus position', async ({ page }) => {
		const showMoreBlock = page.locator(".js-show-more__block");
		const showButton = page.locator(".js-show-more__btn");
		const hideButton = page.locator('.js-show-more__btn-hide');

		expect(await showMoreBlock.getAttribute('tabindex')).toBeNull();

		await showButton.click();
		expect(await showMoreBlock.getAttribute('tabindex')).toEqual("-1");
		let focussed = page.locator(":focus");
		await expect(focussed).toHaveClass(/js-show-more__block/);

		await hideButton.click();
		expect(await showMoreBlock.getAttribute('tabindex')).toBeNull();
		focussed = page.locator(":focus");
		await expect(focussed).toHaveClass(/js-show-more__toggle/);
	});

	test('Focus should not move inside block when closed', async ({ page }) => {
		await page.keyboard.press('Tab');
		await page.keyboard.press('Tab');
		const testButton = page.locator('#test-focus');
		await expect(testButton).not.toBeFocused();
	});

	test('Focus should move inside block when open', async ({ page }) => {
		await page.keyboard.press('Tab');
		await page.keyboard.press('Enter');
		await page.keyboard.press('Tab');
		const testButton = page.locator('#test-focus');
		await expect(testButton).toBeFocused();
		await page.keyboard.press('Tab');
		const hideButton = page.locator('.js-show-more__btn-hide');
		await expect(hideButton).toBeFocused();
	});
});


test.describe("Show more > Markup tests", { tag: '@reduced'}, () => {
	test("Should use a button element for the show more trigger", async ({ page }) => {
		const toggleButtons = await page.locator(".js-show-more__toggle").all();
		for(const button of toggleButtons) {
			await expect(button).toHaveRole("button");
		}
	});
});

test.describe("Show more > Axe", { tag: '@reduced'}, () => {
	test('Should not have any automatically detectable accessibility issues', async ({ page }) => {	
		const accessibilityScanResults = await new AxeBuilder({ page }).analyze(); 
		expect(accessibilityScanResults.violations).toEqual([]);
	});
});

test.describe("Show more > Aria", { tag: '@reduced'}, () => {
	test("Buttons should be appropriately labelled", async ({ page }) => {
		const showButton = page.locator(".js-show-more__btn");
		const hideButton = page.locator('.js-show-more__btn-hide');

		expect(await showButton.getAttribute('aria-label')).toEqual("Show more about Lorem ipsum dolor sit amet");
		expect(await hideButton.getAttribute('aria-label')).toEqual("Show less about Lorem ipsum dolor sit amet");
	});

	test("ARIA controls attribute should correctly associate button with search container element", async ({ page }) => {
		const toggleButtons = await page.locator(".js-show-more__toggle").all();
		const showMoreBlock = page.locator(".js-show-more__block");
		const blockID = await showMoreBlock.getAttribute('id');

		for(const button of toggleButtons) {
			expect(await button.getAttribute('aria-controls')).toEqual(blockID);
		}
	});

	test("ARIA expanded attribute should correctly describe shown/hidden state", async ({ page }) => {
		const toggleButtons = await page.locator(".js-show-more__toggle").all();
		const showButton = page.locator(".js-show-more__btn");
		const hideButton = page.locator('.js-show-more__btn-hide');

		for(const button of toggleButtons) {
			expect(await button.getAttribute('aria-expanded')).toEqual("false");
		}

		await showButton.click();
		for(const button of toggleButtons) {
			expect(await button.getAttribute('aria-expanded')).toEqual("true");
		}
		await hideButton.click();
		for(const button of toggleButtons) {
			expect(await button.getAttribute('aria-expanded')).toEqual("false");
		}
	});
});

