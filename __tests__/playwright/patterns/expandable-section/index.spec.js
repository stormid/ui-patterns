const { test, expect } = require("@playwright/test");
import AxeBuilder from '@axe-core/playwright';

test.beforeEach(async ({ page }) => {
	await page.goto("/example/expandable-section/");
});

test.describe("Expandable section > Keyboard", { tag: '@all'}, () => {
	test("Buttons should be focusable", async ({ page }) => {
		await page.keyboard.press('Tab');
		const focusedElement = page.locator(':focus');
		await expect(focusedElement).toHaveRole("button");
		await expect(focusedElement).toHaveClass(/js-expandable-section__btn-1/);
	});

	test('Enter key should trigger the button', async ({ page }) => {
		const toggleBtn = page.locator(".js-expandable-section__btn-1");
		await toggleBtn.focus();
		const panel = page.locator('#'+ await toggleBtn.getAttribute('aria-controls'));
		await page.keyboard.press('Enter');
		await expect(panel).toBeVisible();
		await page.keyboard.press('Enter');
		await expect(panel).toBeHidden();
	});

	test('Keyboard focus should not move into toggles if they are not open', async ({ page }) => {
		const toggleBtn = page.locator(".js-expandable-section__btn-1");
		const panel = page.locator('#'+ await toggleBtn.getAttribute('aria-controls'));
		await expect(panel).toBeHidden();

		await toggleBtn.focus();
		await page.keyboard.press('Tab');
		const focusedElement = page.locator(':focus');
		await expect(focusedElement).toHaveRole("button");
		await expect(focusedElement).toHaveClass(/js-expandable-section__btn-2/);
	});

	test('Keyboard focus should move into toggles if they are open', async ({ page }) => {
		const toggleBtn = page.locator(".js-expandable-section__btn-1");
		const panel = page.locator('#'+ await toggleBtn.getAttribute('aria-controls'));
		await expect(panel).toBeHidden();

		await toggleBtn.focus();
		await page.keyboard.press('Enter');
		await expect(panel).toBeVisible();
		await expect(toggleBtn).toBeFocused();
		
		//Created test button in content.  Links are currently ignored by tabbing in Playwright webkit
		//see https://github.com/microsoft/playwright/issues/29820
		await page.keyboard.press('Tab');
		const testButton = page.locator('#testfocus');
		await expect(testButton).toBeFocused();
	});

});


test.describe("Expandable section > Markup tests", { tag: '@reduced'}, () => {
	test("Should use a button element for the expandable section trigger", async ({ page }) => {
		const locator = page.locator(".js-expandable-section__btn-1");
		await expect(locator).toHaveRole("button");
	});
	
	test("Buttons should be appropriately labelled", async ({ page }) => {
		const locator = page.locator(".js-expandable-section__btn-1");
		await expect(locator).toContainText(/Section title/);
	});

	test("Trigger should be a button element", async ({ page }) => {
		for (const toggle of await page.locator(".expandable-section__btn").all()) {
			await expect(toggle).toHaveRole("button");
		}
	});
	
});

test.describe("Expandable section > Axe", { tag: '@reduced'}, () => {
	test('Should not have any automatically detectable accessibility issues', async ({ page }) => {	
		const accessibilityScanResults = await new AxeBuilder({ page }).analyze(); 
		expect(accessibilityScanResults.violations).toEqual([]);
	});
});

test.describe("Expandable section > Aria", { tag: '@reduced'}, () => {

	test('Toggle buttons should have matching aria controls', async ({ page }) => {
		for (const toggle of await page.locator(".expandable-section__btn").all()) {
			const controls = await toggle.getAttribute('aria-controls');
			expect(controls).not.toBeNull();
			const panel = page.locator('#'+ controls);
			await expect(panel).toHaveCount(1);
		}		
	});
	
	test('ARIA expanded attribute should correctly describe shown/hidden state of toggles', async ({ page }) => {
		for (const toggle of await page.locator(".expandable-section__bd").all()) {
			const toggleBtn = page.locator("."+ await toggle.getAttribute("data-toggle")).first();
			expect(await toggleBtn.getAttribute('aria-expanded')).toEqual('false');
			await toggleBtn.click();
			expect(await toggleBtn.getAttribute('aria-expanded')).toEqual('true');
			await toggleBtn.click();
			expect(await toggleBtn.getAttribute('aria-expanded')).toEqual('false');
		}
    });

});

