const { test, expect } = require("@playwright/test");
import { reducedProjects } from 'playwright.config';
import AxeBuilder from '@axe-core/playwright';

// test.beforeEach(async ({ page }) => {
// 	await page.goto("/example/expandable-navigation/");
// });

// test.describe("Expandable navigation > Functionality", () => {
// 	test('Should update the visible text on the button when toggled', async ({ page }) => {
// 		const toggleBtn = page.locator(".js-expandable-section__btn-all");
// 		await expect(toggleBtn).toHaveText(/(View all)/i);
// 		await toggleBtn.click();
// 		await expect(toggleBtn).toHaveText(/(Hide all)/i);
// 		await toggleBtn.click();
// 		await expect(toggleBtn).toHaveText(/(View all)/i);
// 	});

// });

// test.describe("Expandable navigation > Keyboard", () => {
	

// });

// test.use({ projects: reducedProjects });

// test.describe("Expandable navigation > Markup tests", () => {
	
// });

// test.describe("Expandable navigation > Axe", () => {
// 	test('Should not have any automatically detectable accessibility issues', async ({ page }) => {	
// 		const accessibilityScanResults = await new AxeBuilder({ page }).analyze(); 
// 		expect(accessibilityScanResults.violations).toEqual([]);
// 	});
// });

// test.describe("Expandable navigation > Aria", () => {
	
// });

