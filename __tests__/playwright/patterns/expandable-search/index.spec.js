const { test, expect } = require("@playwright/test");
import { reducedProjects } from 'playwright.config';
import AxeBuilder from '@axe-core/playwright';

test.beforeEach(async ({ page }) => {
	await page.goto("/example/expandable-search/");
});

test.describe("Expandable search > Functionality", () => {
	test('Either the search input should be the next in the focus order after the button, or the first item should programmatically receive focus when navigation is opened', async ({ page }) => {
        const toggleButton = page.locator('.expandable-search__btn');
		await toggleButton.click();
		const focussedElement = page.locator(':focus');
		await expect(focussedElement).toBeVisible();
		await expect(focussedElement).toHaveRole("searchbox"); 
		await expect(focussedElement).toHaveClass(/expandable-search__input/);

		await toggleButton.click();
		const newFocussedElement = page.locator(':focus');
		await expect(newFocussedElement).toHaveRole("button"); 
		await expect(newFocussedElement).toHaveClass(/expandable-search__btn/);

    });

});

test.describe("Expandable search > Keyboard", () => {
	test('Search button should be focusable', async ({ page }) => {
    	await page.keyboard.press('Tab');
        const focussedElement = page.locator(':focus');

        await expect(focussedElement).toHaveRole("button"); 
        await expect(focussedElement).toHaveClass(/expandable-search__btn/);
    });

});

test.use({ projects: reducedProjects });

test.describe("Expandable search > Markup tests", () => {
	test('Should use a button element for the search triggers', async ({ page }) => {
        const toggleButton = page.locator('.expandable-search__btn');
        await expect(toggleButton).toHaveRole("button");
    });

	test('Search input should be appropriately labelled', async ({ page }) => {
        const input = page.locator('.expandable-search__input');
        const id = await input.getAttribute('id');
		const label = page.locator(`[for="${id}"]`);
        await expect(label).toHaveCount(1);
    });
	
});

test.describe("Expandable search > Axe", () => {
	test('Should not have any automatically detectable accessibility issues', async ({ page }) => {	
		const accessibilityScanResults = await new AxeBuilder({ page }).analyze(); 
		expect(accessibilityScanResults.violations).toEqual([]);
	});
});

test.describe("Expandable search > Aria", () => {
	test('Buttons should be appropriately labelled', async ({ page }) => {
        const toggleButton = page.locator('.expandable-search__btn');
        expect(await toggleButton.getAttribute('aria-label')).toEqual('Show or hide site search');
    });
});

