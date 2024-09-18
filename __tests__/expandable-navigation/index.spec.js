const { test, expect } = require("@playwright/test");
import AxeBuilder from '@axe-core/playwright';

test.beforeEach(async ({ page }) => {
	await page.goto("/example/expandable-navigation/");
});

test.describe("Expandable navigation > Functionality", { tag: '@all'}, () => {
    test('Button should expand and make navigation visible', async ({ page }) => {	
        const button = page.locator('.expandable-nav__btn');
        await button.click();
        const classChange = page.locator(".on--expandable-nav")
        await expect(classChange).toHaveCount(1);
        await expect(page.locator('#expandable-nav')).toBeVisible();
    });


	test('Focus outside navigation should not hide navigation', { tag: '@all'}, async ({ page }) => {	
        const button = page.locator('.expandable-nav__btn');
        const navigation = page.locator('#expandable-nav');
        await button.click();

        await expect(navigation).toBeVisible();
        await page.locator('main').focus();
        await expect(navigation).toBeVisible();
    });
});

test.describe("Expandable navigation > Keyboard", { tag: '@all'}, () => {
	test('Buttons should be focusable', async ({ page }) => {	
        await page.keyboard.press('Tab');
        const focussedElement = page.locator(':focus');
        await expect(focussedElement).toHaveRole("button"); 
        await expect(focussedElement).toHaveClass(/expandable-nav__btn/);
    });
});


test.describe("Expandable navigation > Markup tests", { tag: '@reduced'}, () => {
	test('Should use a button element for the navigation triggers', async ({ page }) => {	
        const button = page.locator('.expandable-nav__btn');
        await expect(button).toHaveRole("button");
    });

    test('Buttons should be within the nav element', async ({ page }) => {	
        const locator = page.locator("nav .expandable-nav__btn");
        await expect(locator).not.toHaveCount(0);
    });

    test('Either the first item in the navigation should be the next in the focus order after the button, or the first item should programmatically receive focus when navigation is opened', async ({ page }) => {	

        const FOCUSABLE = [
            'a[href]',
            'area[href]',
            'input:not([disabled]):not([type=hidden])',
            'select:not([disabled])',
            'textarea:not([disabled])',
            'button:not([disabled])',
            'iframe',
            'object',
            'embed',
            '[contenteditable]',
            '[tabindex]:not([tabindex="-1"])'
        ].join(', nav ');
        const focusableElements = page.locator("nav " + FOCUSABLE);

        let index = 0;
        for (let element of await focusableElements.all()){
            const classList = await element.evaluate(node => node.classList);
            if (Object.values(classList).includes("expandable-nav__btn")) return;
            index++;
        }
        const firstNavItem = focusableElements.nth(index+1);
        await expect(firstNavItem).toHaveClass(/expandable-nav__link/);
    });
});

test.describe("Expandable navigation > Axe", { tag: '@reduced'}, () => {
	test('Should not have any automatically detectable accessibility issues', async ({ page }) => {	
		const accessibilityScanResults = await new AxeBuilder({ page }).analyze(); 
		expect(accessibilityScanResults.violations).toEqual([]);
	});
});

test.describe("Expandable navigation > Aria", { tag: '@reduced'}, () => {
	test("Navigation should be nav element should be appropriately labelled", async ({ page }) => {
		const locator = page.locator("nav");
		await expect(locator).toHaveAttribute('aria-label', 'Primary navigation');
	});

    test('Buttons should be appropriately labelled', async ({ page }) => {
        const locator = page.locator('.expandable-nav__btn');
        await expect(locator).toHaveAttribute('aria-label', 'Show navigation menu');
    });

    test('Active navigation link should have ARIA current attribute', async ({ page }) => {
        const locator = page.locator('.is--active');
        await expect(locator).toHaveAttribute('aria-current', 'page');
    });

    test('Button should set aria expanded correctly when used', async ({ page }) => {	
        const button = page.locator('.expandable-nav__btn');
        await expect(button).toHaveAttribute('aria-expanded', 'false');
        await button.click();
        await expect(button).toHaveAttribute('aria-expanded', 'true');
        await button.click();
        await expect(button).toHaveAttribute('aria-expanded', 'false');
    });

    test('ARIA controls attribute should correctly associate button with list element', async ({ page }) => {	
        const button = page.locator('.expandable-nav__btn');
        await expect(button).toHaveAttribute('aria-controls', 'expandable-nav');
    });

    test('ARIA label attribute should correctly describe shown/hidden state', async ({ page }) => {
        const button = page.locator('.expandable-nav__btn');
        const showLabel = await button.getAttribute('data-show-label');
        const hideLabel = await button.getAttribute('data-hide-label');

        await expect(button).toHaveAttribute('aria-label', showLabel);
        await button.click();
        await expect(button).toHaveAttribute('aria-label', hideLabel);
    });

});

