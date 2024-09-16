const { test, expect } = require("@playwright/test");
import { reducedProjects } from 'playwright.config';
import AxeBuilder from '@axe-core/playwright';

test.beforeEach(async ({ page }) => {
	await page.goto("/example/full-screen-navigation/");
});

test.describe("Full screen navigation > Functionality", () => {
    test('Button should expand and make navigation visible', async ({ page }) => {	
        const button = page.locator('.js-full-screen-nav__toggle').first();
        await button.click();
        const classChange = page.locator(".on--full-screen-navigation")
        await expect(classChange).toHaveCount(1);
        await expect(page.locator('#full-screen-navigation')).toBeVisible();
    });

    test('Toggle buttons should be at least 44 x 44px', async ({ page }) => {
    	const OpenButton = page.locator('.js-full-screen-nav__toggle').first();
        const CloseButton = page.locator('.js-full-screen-nav__toggle').last();

        let buttonDimensions = await OpenButton.boundingBox();
        expect(buttonDimensions.width).toBeGreaterThanOrEqual(44);
        expect(buttonDimensions.height).toBeGreaterThanOrEqual(44);

        await OpenButton.click();
        buttonDimensions = await CloseButton.boundingBox();
        expect(buttonDimensions.width).toBeGreaterThanOrEqual(44);
        expect(buttonDimensions.height).toBeGreaterThanOrEqual(44);
		
    });

});

test.describe("Full screen navigation > Keyboard", () => {
	test('Toggle buttons should be focusable', async ({ page }) => {	
        await page.keyboard.press('Tab');
        const focussedElement = page.locator(':focus');
        await expect(focussedElement).toHaveRole("button"); 
        await expect(focussedElement).toHaveClass(/js-full-screen-nav__toggle/);
    });

    test('Navigation elements should not be focusable when not open', async ({ page }) => {
    	await page.keyboard.press('Tab');
		await page.keyboard.press('Tab');
        const focussedElement = page.locator(':focus');

        await expect(focussedElement).toHaveId('test-focus');
    });

    test('The first navigation link should receive visible focus when navigation is opened', async ({ page }) => {

        await page.keyboard.press('Tab');
		await page.keyboard.press('Enter');
        let focussedElement = page.locator(':focus');

        await expect(focussedElement).toHaveText(/Item 1/);
    });

    test('When the navigation is open, it should not be possible to access the page content underneith via mouse, keyboard or any other means', async ({ page }) => {

        await page.keyboard.press('Tab');
		await page.keyboard.press('Enter');
        let mainElement = page.locator('.main');

        await expect(mainElement).toBeHidden();

        //After a number of tab presses that exceeds the number of
        //elements in the nav, focus should remain within the 
        //full screen overlay and not move to the main body
        for(let i = 0; i<=7; i++) {
            await page.keyboard.press('Tab');
        }

        await expect(mainElement).toBeHidden();
        let focussedElement = page.locator(':focus').first();
        const containerEl = page.locator('#full-screen-navigation').filter({has: focussedElement});
        await expect(containerEl).toHaveCount(1);

    });
});

test.use({ projects: reducedProjects });

test.describe("Full screen navigation > Markup tests", () => {
	test('Should use a button element for the navigation triggers', async ({ page }) => {	
        const buttons = page.locator('.js-full-screen-nav__toggle');
        for (let button of await buttons.all()){
            await expect(button).toHaveRole("button");
        }
    });

    test('Buttons should be within the nav element', async ({ page }) => {	
        const navigation = page.locator('nav .js-full-screen-nav__toggle');
        await expect(navigation).not.toHaveCount(0);
    });

});

test.describe("Full screen navigation > Axe", () => {
	test('Should not have any automatically detectable accessibility issues', async ({ page }) => {	
		const accessibilityScanResults = await new AxeBuilder({ page }).analyze(); 
		expect(accessibilityScanResults.violations).toEqual([]);
	});
});

test.describe("Full screen navigation > Aria", () => {
	test("Navigation should be nav element should be appropriately labelled", async ({ page }) => {
		const locator = page.locator("nav");
		expect(await locator.getAttribute('aria-label')).toEqual('Primary navigation');
	});

    test('Active navigation link should have ARIA current attribute', async ({ page }) => {
        const activeLink = page.locator('.is--active');
        expect(await activeLink.getAttribute('aria-current')).toEqual('page');
    });

    test('ARIA controls attribute should correctly associate button with list element', async ({ page }) => {	
        const buttons = page.locator('.js-full-screen-nav__toggle');
        for (let button of await buttons.all()){
            expect(await button.getAttribute('aria-controls')).toEqual("full-screen-navigation");
        }
    });

    test('ARIA role=menu should not be used', async ({ page }) => {	
        const menus = page.getByRole('menu');
        await expect(menus).toHaveCount(0);
    });

    test('Should use a button element for the navigation triggers', async ({ page }) => {	
        const buttons = page.locator('.js-full-screen-nav__toggle');
        expect(await buttons.first().getAttribute('aria-label')).toEqual('Open menu');
        expect(await buttons.last().getAttribute('aria-label')).toEqual('Close menu');
    });
});

