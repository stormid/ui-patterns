const { test, expect } = require("@playwright/test");
import AxeBuilder from '@axe-core/playwright';

test.beforeEach(async ({ page }) => {
	await page.goto("/example/heading-subheading/card");
});


test.describe("Heading with subtitle > Card > Markup tests", { tag: '@reduced'}, () => {
	test("There must be one hgroup tag in the page", async ({ page }) => {
		const hgroups = page.locator('hgroup');
		await expect(hgroups).toHaveCount(1);
	});
	
	test('There must be only one heading inside each group', async ({ page }) => {
        const hgroups = page.locator('hgroup');
		await expect(hgroups.locator('h1, h2, h3, h4, h5, h6')).toHaveCount(1);
    });	

	test('There must only be headings and paragraphs inside the group', async ({ page }) => {
        const children = await page.locator('hgroup > *').all();
		const allowedChildren = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'];

		for(const child of children) {
			const tagname = await child.evaluate(el => el.tagName.toLowerCase());
			expect(allowedChildren.includes(tagname)).toBeTruthy();
		}	
    });	
});

test.describe("Heading with subtitle > Card > Axe", { tag: '@reduced'}, () => {
	test('Should not have any automatically detectable accessibility issues', async ({ page }) => {	
		const accessibilityScanResults = await new AxeBuilder({ page }).analyze(); 
		expect(accessibilityScanResults.violations).toEqual([]);
	});
});

