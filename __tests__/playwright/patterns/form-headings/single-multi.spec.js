const { test, expect } = require("@playwright/test");
import { reducedProjects } from 'playwright.config';
import AxeBuilder from '@axe-core/playwright';

test.beforeEach(async ({ page }) => {
	await page.goto("/example/form-headings/form-headings-single-multi/");
});

test.use({ projects: reducedProjects });

test.describe("Form headings > Single with multiple choice > Markup tests", () => {
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

	test('There should be only one legend', async ({ page }) => {
        const legends = page.locator('legend');
		await expect(legends).toHaveCount(1);  
    });

	test('The H1 should be contained within a legend', async ({ page }) => {
        const headings = page.locator('legend h1');
        await expect(headings).toHaveCount(1);  
    });
	
});

test.describe("Form headings > Single with multiple choice > Axe", () => {
	test('Should not have any automatically detectable accessibility issues', async ({ page }) => {	
		const accessibilityScanResults = await new AxeBuilder({ page }).analyze(); 
		expect(accessibilityScanResults.violations).toEqual([]);
	});
});

