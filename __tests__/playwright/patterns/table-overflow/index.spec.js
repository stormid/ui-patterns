const { test, expect } = require("@playwright/test");
import AxeBuilder from "@axe-core/playwright";

test.beforeEach(async ({ page }) => {
	await page.goto("/example/tables/overflow");
});

test.describe("Table with scrolling overflow > Functionality", () => {
	test("The container element should be scrollable", { tag: '@mobile'}, async ({ page }) => {
		const container = page.locator(".table__container--overflow");
		const clientWidth = await container.evaluate((el) => el.clientWidth);
		const scrollWidth = await container.evaluate((el) => el.scrollWidth);

		expect(scrollWidth).toBeGreaterThan(clientWidth);

		const lastHeader = page.getByText(/Status/);
		await expect(lastHeader).not.toBeInViewport();
		await lastHeader.scrollIntoViewIfNeeded();
		await expect(lastHeader).toBeInViewport();
	});
});

test.describe("Table with scrolling overflow > Keyboard", { tag: '@all'}, () => {
	test("The container element should be focusable", async ({ page }) => {
		await page.keyboard.press('Tab');
		let focusedElement = page.locator(':focus');
		await expect(focusedElement).toHaveClass(/table__container--overflow/);
	});
});


test.describe("Table with scrolling overflow > Markup tests", { tag: '@reduced'}, () => {
	test("Tables should have a table caption", async ({ page }) => {
		const tables = await page.locator("table").all();
		for (const table of tables) {
			await expect(table.locator("caption")).toHaveCount(1);
		}
	});

	test("Tables should have a thead", async ({ page }) => {
		const tables = await page.locator("table").all();
		for (const table of tables) {
			await expect(table.locator("thead")).toHaveCount(1);
		}
	});

	test("Tables should have a tbody", async ({ page }) => {
		const tables = await page.locator("table").all();
		for (const table of tables) {
			await expect(table.locator("tbody")).toHaveCount(1);
		}
	});

	test("Tables headers should have a scope", async ({ page }) => {
		const headings = await page.locator("th").all();
		for (const header of headings) {
			expect(await header.getAttribute("scope")).not.toBeNull();
		}
	});

	test("Table container should have a tabindex to allow for keyboard focus", async ({ page }) => {
		const container = page.locator(".table__container--overflow");
		expect(await container.getAttribute('tabindex')).toEqual("0");
	});

});

test.describe("Table with scrolling overflow > Axe", { tag: '@reduced'}, () => {
	test("Should not have any automatically detectable accessibility issues", async ({ page }) => {
		const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
		expect(accessibilityScanResults.violations).toEqual([]);
	});
});

test.describe("Table with scrolling overflow > Aria", { tag: '@reduced'}, () => {
	test("Table container should have an aria-labelledby matching the caption", async ({ page }) => {
		const container = page.locator(".table__container--overflow");
		const caption = page.locator("caption");

		const aria = await container.getAttribute('aria-labelledby');
		expect(aria).not.toBeNull();
		await expect(caption).toHaveId(aria)
	});
});
