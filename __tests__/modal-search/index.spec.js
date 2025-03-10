const { test, expect } = require("@playwright/test");
import AxeBuilder from '@axe-core/playwright';

let tabKey;

test.beforeEach(async ({ page }, testInfo) => {
	await page.goto("/example/modal-search/");
    tabKey = testInfo.project.use.defaultBrowserType === 'webkit'
        ? "Alt+Tab"
        : "Tab";
});

test.describe("Modal search > Functionality", { tag: '@all'}, () => {

    test('Buttons should open and close the modal', async ({ page }) => {
        const modal = page.locator('.modal');
    	const openButton = page.locator('.modal-search__btn');
        const closeButton = page.locator('.modal__close');

        await openButton.click();
        await expect(modal).toBeVisible();

        await closeButton.click();
        await expect(modal).toBeHidden();
    });

    test('Content in main page should not be visible when search modal is open', async ({ page }) => {
		const showButton = page.locator(".modal-search__btn");
		const hideButton = page.locator('.modal__close');
		const main = page.getByRole('main');

		await expect(main).toBeVisible();
		await showButton.click();
		await expect(main).toBeHidden();
		await hideButton.click();
		await expect(main).toBeVisible();
	});

    test('Page should not be scrollable when modal search is open', async ({ page }) => {
		const showButton = page.locator(".modal-search__btn");
		const hideButton = page.locator('.modal__close');

		const canScroll = () => {
			return (document.documentElement.clientHeight < document.documentElement.scrollHeight) && (window.getComputedStyle(document.documentElement)['overflow']!=='hidden');
		};

        expect(await showButton.evaluate(canScroll)).toBeTruthy();
		await showButton.click();
		expect(await hideButton.evaluate(canScroll)).toBeFalsy();

		await hideButton.click();
		expect(await showButton.evaluate(canScroll)).toBeTruthy();
	});

});

test.describe("Modal search > Keyboard", { tag: '@all'}, () => {
	test('Buttons and form elements should be focusable', async ({ page }) => {
    	const openButton = page.locator('.modal-search__btn');
        const closeButton = page.locator('.modal__close');
        const searchInput = page.locator('.modal__input');
        const searchButton = page.locator('.modal__search-btn');

        await page.keyboard.press(tabKey);
        await expect(openButton).toBeFocused();

        await page.keyboard.press('Enter');
        await expect(searchInput).toBeFocused();

        await page.keyboard.press(tabKey);
        await expect(searchButton).toBeFocused();

        await page.keyboard.press(tabKey);
        await expect(closeButton).toBeFocused();
    });

    test('Escape key should close the modal', async ({ page }) => {
        const modal = page.locator('.modal');
        await expect(modal).toBeHidden();

        await page.keyboard.press(tabKey);
        await page.keyboard.press('Enter');
        await expect(modal).toBeVisible();

        await page.keyboard.press('Escape');
        await expect(modal).toBeHidden();
    });

    test('Content of dialog should not be reachable while closed', async ({ page }) => {
        const searchInput = page.locator('.modal__input');
        await page.keyboard.press(tabKey);
        await page.keyboard.press(tabKey);
        await expect(searchInput).not.toBeFocused();
    });

    test('Content of page should not be reachable when search open', async ({ page }) => {
        const testButton = page.locator('#test-focus');
        await page.keyboard.press(tabKey);
        await page.keyboard.press('Enter');

        for(let i = 0; i<=2; i++) {
            await page.keyboard.press(tabKey);
        }

        await expect(testButton).not.toBeFocused();
    });
});


test.describe("Modal search > Markup tests", { tag: '@reduced'}, () => {

	test('Should use a button element for modal triggers', async ({ page }) => {
    	const buttons = await page.locator('.modal-search__btn, .modal__close').all();
        for(const button of buttons) {
            await expect(button).toHaveRole('button');
        }
    });

    test('Buttons should be at least 44x44px', async ({ page }) => {
        const openButton = page.locator('.modal-search__btn');
        const closeButton = page.locator('.modal__close');

        await openButton.click();
        const buttonDimensions = await closeButton.boundingBox();
        expect(buttonDimensions.width).toBeGreaterThanOrEqual(44);
        expect(buttonDimensions.height).toBeGreaterThanOrEqual(44);
    });

    test('Input should have a matching label', async ({ page }) => {
        const searchInput = page.locator('.modal__input');
        const inputId = await searchInput.getAttribute('id');
        await expect(page.locator('[for='+inputId+']')).toHaveCount(1);
    });
});

test.describe("Modal search > Axe", { tag: '@reduced'}, () => {
	test('Should not have any automatically detectable accessibility issues', async ({ page }) => {	
		const accessibilityScanResults = await new AxeBuilder({ page }).analyze(); 
		expect(accessibilityScanResults.violations).toEqual([]);
	});
});

test.describe("Modal search > Aria", { tag: '@reduced'}, () => {
	test('Buttons should be appropriately labelled', async ({ page }) => {
    	const openButton = page.locator('.modal-search__btn');
        const closeButton = page.locator('.modal__close');

        await expect(openButton).toHaveAttribute('aria-label','Show or hide site search');
        await expect(closeButton).toHaveAttribute('aria-label','Close search');
    });

    test('Open button should have an aria-haspopup attribute', async ({ page }) => {
    	const openButton = page.locator('.modal-search__btn');
        await expect(openButton).toHaveAttribute('aria-haspopup','dialog');
    });

    test('Modal should have role of dialog', async ({ page }) => {
    	const modal = page.locator('.modal');
        await expect(modal).toHaveRole('dialog');
    });

    test('Modal container should have role of ragion', async ({ page }) => {
    	const modal = page.locator('#modal-search');
        await expect(modal).toHaveRole('region');
    });

    test('Modal should be labelled with either an aria-label or an aria-labelledby that points to a visible title', async ({ page }) => {
    	const modal = page.locator('.modal');
        const ariaLabel = await modal.getAttribute('aria-labelledby');

        expect(ariaLabel).not.toBeNull();
        const label = page.locator('#'+ariaLabel);
        await expect(label).toHaveCount(1);
        expect(await label.evaluate((el) => el.textContent)).not.toEqual("");
    });
});

