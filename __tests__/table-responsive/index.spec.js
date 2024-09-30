const { test, expect } = require("@playwright/test");
import AxeBuilder from "@axe-core/playwright";

test.beforeEach(async ({ page }) => {
	await page.goto("/example/tables/responsive");
});

test.describe("Table with responsive cards > Functionality", () => {
	test("Traditional table headers should be visible on desktop", { tag: '@desktop'}, async ({ page }) => {
		const cells = await page.locator("tbody td").all();
		for (const cell of cells) {
			expect(await cell.evaluate((node) => window.getComputedStyle(node, "::before").content)).toEqual("none");
		}

		const tableHeader = page.locator("thead");
		await expect(tableHeader).toBeVisible();
	});

	test("Table headers should turn to titles at reduced viewport sizes", { tag: '@mobile'}, async ({ page }) => {
		const cells = await page.locator("tbody td").all();
		for (const cell of cells) {
			const dataVal = await cell.getAttribute('data-th');
			expect(await cell.evaluate((node) => window.getComputedStyle(node, "::before").content)).toEqual('\"' + dataVal+'\"');
		}
	});
});


test.describe("Table with responsive cards > Markup tests", { tag: '@reduced'}, () => {
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

	test("Table cells should have a data attribute for the header", async ({ page }) => {
		const headings = page.locator("th");
		const rows = await page.locator("tbody tr").all();
		for (const row of rows) {
			const cells = row.locator('td');
			const count = await cells.count();

			//forEach doesn't work with the asynchronous locators.  Need to go old-school if you
			//neeed to keep track of an index
			for (let i = 0; i < count; i++) {
				await expect(cells.nth(i)).toHaveAttribute("data-th");
				const dataMatch = await cells.nth(i).getAttribute("data-th");
				await expect(headings.nth(i)).toContainText(dataMatch);
			}
		}
	});
});

test.describe("Table with responsive cards > Axe", { tag: '@reduced'}, () => {
	test("Should not have any automatically detectable accessibility issues", async ({ page }) => {
		const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
		expect(accessibilityScanResults.violations).toEqual([]);
	});
});
