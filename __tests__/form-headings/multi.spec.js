const { test, expect } = require("@playwright/test");
import AxeBuilder from '@axe-core/playwright';

test.beforeEach(async ({ page }) => {
	await page.goto("/example/form-headings/form-headings-multiple/");
});


test.describe("Form headings > Multiple questions > Markup tests", { tag: '@reduced'}, () => {
	test("All inputs must have associated labels", async ({ page }) => {
		for (const input of await page.locator("input").all()) {
			const matchingLabel = page.locator(`[for=${await input.getAttribute('id')}]`)
			await expect(matchingLabel).toHaveCount(1);   
		}
	});
	
	test('There should be only one h1 per page', async ({ page }) => {
        const headings = page.locator('h1');
        await expect(headings).toHaveCount(1);   
    });

	test('The h1 should be outwith any legends and not contain labels', async ({ page }) => {
        const headings = page.locator('h1 label, legend h1');
        await expect(headings).toHaveCount(0);   
    });
	
});

test.describe("Form headings > Multiple questions > Axe", { tag: '@reduced'}, () => {
	test('Should not have any automatically detectable accessibility issues', async ({ page }) => {	
		const accessibilityScanResults = await new AxeBuilder({ page }).analyze(); 
		expect(accessibilityScanResults.violations).toEqual([]);
	});
});

