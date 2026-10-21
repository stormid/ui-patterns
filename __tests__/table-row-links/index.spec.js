const { test, expect } = require("@playwright/test");
import { AxeBuilder } from "@axe-core/playwright";

let tabKey;

test.beforeEach(async ({ page }, testInfo) => {
	await page.goto("/example/tables/row-links");
	tabKey = testInfo.project.use.defaultBrowserType === 'webkit'
        ? "Alt+Tab"
        : "Tab";
});

test.describe("Table with row links > Keyboard", { tag: '@all'}, () => {
	test("Links inside tables should be keyboard accessible", async ({ page }) => {
		const link = page.locator("tr a").first();
		const secondLink = page.locator("tr a").nth(1);
		await page.keyboard.press(tabKey);
		await expect(link).toBeFocused();
		await page.keyboard.press(tabKey);
		await expect(secondLink).toBeFocused();
	});
});


test.describe("Table with row links > Markup tests", { tag: '@reduced'}, () => {
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
			await expect(header).toHaveAttribute("scope");
		}
	});

	test("Tables rows should have a max of one link", async ({ page }) => {
		const rows = await page.locator("tr").all();
		for (const row of rows) {
			expect(await row.locator("a").count()).toBeLessThanOrEqual(1);
		}
	});
});

test.describe("Table with row links > Axe", { tag: '@reduced'}, () => {
	test("Should not have any automatically detectable accessibility issues", async ({ page }) => {
		const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
		expect(accessibilityScanResults.violations).toEqual([]);
	});
});
