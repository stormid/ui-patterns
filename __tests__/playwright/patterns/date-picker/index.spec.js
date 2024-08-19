const { test, expect } = require("@playwright/test");
import { reducedProjects } from 'playwright.config';
import AxeBuilder from '@axe-core/playwright';

test.beforeEach(async ({ page }) => {
	await page.goto("/example/date-picker/");
});

// test.describe("Date picker > Functionality", () => {
	

// });

// test.describe("Date picker > Keyboard", () => {
	

// });

test.use({ projects: reducedProjects });

test.describe("Date picker single input > Markup tests", () => {
	test('Should have an accessibly labelled input', async ({ page }) => {
		for (const input of await page.locator("input").all()) {
			const inputID = await input.getAttribute('id');
			const label = page.locator(`[for=${inputID}]`);
			expect(label).not.toBeNull();
		}
	});

	test('Should use a button element for the calendar trigger', async ({ page }) => {
		const button = await page.locator(".js-calendar-button");
        await expect(button).toHaveRole("button");
    });
	
});

test.describe("Date picker single input > Axe", () => {
	test('Should not have any automatically detectable accessibility issues', async ({ page }) => {	
		const accessibilityScanResults = await new AxeBuilder({ page }).analyze(); 
		expect(accessibilityScanResults.violations).toEqual([]);
	});
});

test.describe("Date picker single input > Aria", () => {
	
	test('Should use have an accessible label for each day button in the calendar', async ({ page }) => {	
        for (const day of await page.locator(".js-datepicker-grid button").all()) {
			const label = await day.getAttribute('aria-label')
            expect(label).not.toBeNull();
        }
    });
});

