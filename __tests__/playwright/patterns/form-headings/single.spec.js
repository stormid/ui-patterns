const { test, expect } = require("@playwright/test");
import { reducedProjects } from 'playwright.config';
import AxeBuilder from '@axe-core/playwright';

test.beforeEach(async ({ page }) => {
	await page.goto("/example/form-headings/form-headings-single/");
});

test.use({ projects: reducedProjects });

test.describe("Form headings > Single > Markup tests", () => {
	test("All inputs must have associated labels", async ({ page }) => {
		for (const input of await page.locator("input").all()) {
			const matchingLabel = page.locator(`[for=${await input.getAttribute('id')}]`)
			expect(await matchingLabel.count()).toEqual(1);
		}
	});
	
	test('There should be only one h1 per page', async ({ page }) => {
        const headings = page.locator('h1');
        expect(await headings.count()).toEqual(1);   
    });

	test('There should be only one label', async ({ page }) => {
        const labels = page.locator('label');
        expect(await labels.count()).toEqual(1);   
    });

	test('The h1 should contain the label', async ({ page }) => {
        const headings = page.locator('h1 label');
        expect(await headings.count()).toEqual(1);   
    });
	
});

test.describe("Form headings > Single > Axe", () => {
	test('Should not have any automatically detectable accessibility issues', async ({ page }) => {	
		const accessibilityScanResults = await new AxeBuilder({ page }).analyze(); 
		expect(accessibilityScanResults.violations).toEqual([]);
	});
});

