const { test, expect } = require("@playwright/test");
import AxeBuilder from '@axe-core/playwright';

test.beforeEach(async ({ page }) => {
	await page.goto("/example/expandable-search/");
});

test.describe("Expandable search > Functionality", { tag: '@all'}, () => {
	test('The first available form input, button or link within the search form should receive visible focus when the search is opened', async ({ page }) => {
        const toggleButton = page.locator('.expandable-search__btn');
		await toggleButton.click();
		const focussedElement = page.locator(':focus');
		await expect(focussedElement).toBeVisible();
		await expect(focussedElement).toHaveRole("searchbox"); 
		await expect(focussedElement).toHaveClass(/expandable-search__input/);
		await toggleButton.click();
    });

	test('Search button should be at least 44 x 44px', async ({ page }) => {
    	const toggleButton = page.locator('.expandable-search__btn');
		const buttonDimensions = await toggleButton.boundingBox()
		expect(buttonDimensions.height).toBeGreaterThanOrEqual(44);
		expect(buttonDimensions.width).toBeGreaterThanOrEqual(44);
    });

	test('Search form should be initially hidden from view', async ({ page }) => {
    	const searchInput = page.locator('.expandable-search__input');
		await expect(searchInput).toBeHidden();
    });


});

test.describe("Expandable search > Keyboard", { tag: '@all'}, () => {
	test('Search button should be focusable', async ({ page }) => {
    	await page.keyboard.press('Tab');
        const focussedElement = page.locator(':focus');

        await expect(focussedElement).toHaveRole("button"); 
        await expect(focussedElement).toHaveClass(/expandable-search__btn/);
    });

	test('Search form should not be focusable when not open', async ({ page }) => {
    	await page.keyboard.press('Tab');
		await page.keyboard.press('Tab');
        const focussedElement = page.locator(':focus');

        await expect(focussedElement).not.toHaveClass(/expandable-search__input/);
    });

    
    test('Search form should not trap tab', async ({ page }) => {
    	const toggleButton = page.locator('.expandable-search__btn');
		await toggleButton.click();
        await page.keyboard.press('Tab');
		await page.keyboard.press('Tab');
        const focussedElement = page.locator(':focus');
        await expect(focussedElement).toHaveText(/(Fusce gravida)/i);
    });

});


test.describe("Expandable search > Markup tests", { tag: '@reduced'}, () => {
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

test.describe("Expandable search > Axe", { tag: '@reduced'}, () => {
	test('Should not have any automatically detectable accessibility issues', async ({ page }) => {	
		const accessibilityScanResults = await new AxeBuilder({ page }).analyze(); 
		expect(accessibilityScanResults.violations).toEqual([]);
	});
});

test.describe("Expandable search > Aria", { tag: '@reduced'}, () => {
	test('Buttons should be appropriately labelled', async ({ page }) => {
        const toggleButton = page.locator('.expandable-search__btn');
        await expect(toggleButton).toHaveAttribute('aria-label', 'Show or hide site search');
    });

	test('Button should set aria expanded correctly when used', async ({ page }) => {	
        const button = page.locator('.expandable-search__btn');
        await expect(button).toHaveAttribute('aria-expanded', 'false');
        await button.click();
        await expect(button).toHaveAttribute('aria-expanded', 'true');
        await button.click();
        await expect(button).toHaveAttribute('aria-expanded', 'false');
    });

	test('ARIA controls attribute should correctly associate button with search element', async ({ page }) => {	
        const button = page.locator('.expandable-search__btn');
        await expect(button).toHaveAttribute("aria-controls", "expandable-search");
    });
});

