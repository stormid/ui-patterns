const { test, expect } = require("@playwright/test");
import { reducedProjects } from 'playwright.config';
import AxeBuilder from '@axe-core/playwright';

test.beforeEach(async ({ page }) => {
	await page.goto("/example/view-all/");
});

test.describe("View all > Markup tests", () => {
	test("Should use a button element for the expandable section trigger", async ({ page }) => {
		const locator = page.locator(".js-expandable-section__btn-1");
		await expect(locator).toHaveRole("button");
	});
	
	test("Buttons should be appropriately labelled", async ({ page }) => {
		const locator = page.locator(".js-expandable-section__btn-1");
		await expect(locator).toContainText(/Section title/);
	});
	
	test("Should use a button element for the view all trigger", async ({ page }) => {
		const locator = page.locator(".js-expandable-section__btn-all");
		await expect(locator).toHaveRole("button");
	});
	
	test("View all button should be appropriately labelled", async ({ page }) => {
		const locator = page.locator(".js-expandable-section__btn-all .visually-hidden").first();
		await expect(locator).toContainText(/sections about Lorem Ipsum/);
	});
	
	test("Buttons should be focusable", async ({ page }) => {
		await page.keyboard.press('Tab');
		const focusedElement = page.locator(':focus');
		await expect(focusedElement).toHaveRole("button");
		await expect(focusedElement).toHaveClass(/js-expandable-section__btn-all/);
		await page.keyboard.press('Tab');
		await expect(focusedElement).toHaveRole("button");
		await expect(focusedElement).toHaveClass(/js-expandable-section__btn-1/);
	});
});

test.describe("View all > Functionality", () => {
	test('Should update the visible text on the button when toggled', async ({ page }) => {
		const toggleBtn = page.locator(".js-expandable-section__btn-all");
		await expect(toggleBtn).toHaveText(/(View all)/i);
		await toggleBtn.click();
		await expect(toggleBtn).toHaveText(/(Hide all)/i);
		await toggleBtn.click();
		await expect(toggleBtn).toHaveText(/(View all)/i);
	});

	test('View all button should toggle all inner expandable sections when used', async ({ page }) => {

		for (const toggle of await page.locator(".js-expandable-section-all").all()) {
			await expect(toggle).toBeHidden();
		}

		const toggleBtn = page.locator(".js-expandable-section__btn-all");
		await toggleBtn.click();

		for (const toggle of await page.locator(".js-expandable-section-all").all()) {
			await expect(toggle).toBeVisible();
		}

		await toggleBtn.click();

		for (const toggle of await page.locator(".js-expandable-section-all").all()) {
			await expect(toggle).toBeHidden();
		}
	});

	test('View all button should update when all toggles are manually opened', async ({ page }) => {
		const toggleBtn = page.locator(".js-expandable-section__btn-all");
		await expect(toggleBtn).toHaveText(/(View all)/i);

		for (const toggle of await page.locator(".js-expandable-section-all").all()) {
			const toggleBtn = page.locator("."+ await toggle.getAttribute("data-toggle")).first();
			await toggleBtn.click();
		}

		await expect(toggleBtn).toHaveText(/(Hide all)/i);
		await expect(toggleBtn).toHaveClass(/is--open/);
		expect(await toggleBtn.getAttribute('aria-expanded')).toEqual("true");

		const toggle = page.locator(".js-expandable-section-all").first();
		const toggleBtnSingle = page.locator("."+ await toggle.getAttribute("data-toggle")).first();
		await toggleBtnSingle.click();

		await expect(toggleBtn).toHaveText(/(View all)/i);
		await expect(toggleBtn).not.toHaveClass(/is--open/);
		expect(await toggleBtn.getAttribute('aria-expanded')).toEqual("false");
    });
});

test.use({ projects: reducedProjects });

test.describe("View all > Axe", () => {
	test('Should not have any automatically detectable accessibility issues', async ({ page }) => {	
		const accessibilityScanResults = await new AxeBuilder({ page }).analyze(); 
		expect(accessibilityScanResults.violations).toEqual([]);
	});
});

test.describe("View all > Aria", () => {
	test('ARIA controls attribute should correctly associate button with search container element', async ({ page }) => {
		for (const toggle of await page.locator(".js-expandable-section-all").all()) {
			const toggleID = await toggle.getAttribute('id');
			for (const toggleBtn of await page.locator("."+ await toggle.getAttribute("data-toggle")).all()) {
				expect(await toggleBtn.getAttribute('aria-controls')).toEqual(toggleID);
			}
		}	
	});

	test('ARIA expanded attribute should correctly describe shown/hidden state of individual toggles', async ({ page }) => {

		for (const toggle of await page.locator(".js-expandable-section-all").all()) {
			const toggleBtn = page.locator("."+ await toggle.getAttribute("data-toggle")).first();
			expect(await toggleBtn.getAttribute('aria-expanded')).toEqual('false');
			await toggleBtn.click();
			expect(await toggleBtn.getAttribute('aria-expanded')).toEqual('true');
			await toggleBtn.click();
			expect(await toggleBtn.getAttribute('aria-expanded')).toEqual('false');
		}
    });

	test('ARIA expanded attribute should correctly describe shown/hidden state of View all toggle', async ({ page }) => {
			const toggleBtn = page.locator(".js-expandable-section__btn-all");
			expect(await toggleBtn.getAttribute('aria-expanded')).toEqual('false');
			await toggleBtn.click();
			expect(await toggleBtn.getAttribute('aria-expanded')).toEqual('true');
			await toggleBtn.click();
			expect(await toggleBtn.getAttribute('aria-expanded')).toEqual('false');
    });
});

