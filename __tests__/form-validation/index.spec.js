const { test, expect } = require("@playwright/test");
import AxeBuilder from '@axe-core/playwright';

let tabKey;

test.beforeEach(async ({ page }, testInfo) => {
	await page.goto("/example/form-validation/");
	tabKey = testInfo.project.use.defaultBrowserType === 'webkit'
        ? "Alt+Tab"
        : "Tab";
});

test.describe("Form validation > Errors", { tag: '@all'}, () => {
	test("Error messages should not be live regions", async ({ page }) => {
		const submit = page.getByText('Submit');
		await submit.click();
		for (const message of await page.locator(".error-message").all()) {
			await expect(message).not.toHaveAttribute('role');
            await expect(message).not.toHaveAttribute('aria-live');
		}
	})
});

test.describe("Form validation > Keyboard", { tag: '@all'}, () => {
	test("Inputs should be focusable", async ({ page }) => {
		await page.keyboard.press(tabKey);
		let focusedElement = page.locator(':focus');
		const inputTag = await focusedElement.evaluate(element=> element.tagName.toLowerCase());
		expect(["textarea", "input"]).toContain(inputTag);

		const firstCheckBox = page.getByRole('checkbox').first();
		await firstCheckBox.focus();
		await page.keyboard.press(tabKey);
		focusedElement = page.locator(':focus');
		await expect(focusedElement).toHaveRole("checkbox");
	});
});


test.describe("Form validation > Markup tests", { tag: '@reduced'}, () => {
	test("All inputs must have associated labels", async ({ page }) => {
		for (const input of await page.locator("input").all()) {
			const matchingLabel = page.locator(`[for=${await input.getAttribute('id')}]`)
			await expect(matchingLabel).toHaveCount(1);  
		}
	});

	test("Grouped inputs must be within a fieldset with an appropriate legend", async ({ page }) => {
		const checkboxes = page.locator('fieldset [name=opts]');
		await expect(checkboxes).not.toHaveCount(0);  

		const legends = page.locator('fieldset legend');
		await expect(legends).not.toHaveCount(0);  
	});

	test("If appropriate, inputs should include relevant autocomplete attribute", async ({ page }) => {
		const firstName = page.getByLabel('First Name');
		const lastName = page.getByLabel('Last Name');
		const email = page.getByLabel('Email');

		await expect(firstName).toHaveAttribute('autocomplete', 'given-name');
		await expect(lastName).toHaveAttribute('autocomplete', 'family-name');
		await expect(email).toHaveAttribute('autocomplete', 'email');
	});
	
});

test.describe("Form validation > Axe", { tag: '@reduced'}, () => {
	test('Should not have any automatically detectable accessibility issues', async ({ page }) => {	
		const accessibilityScanResults = await new AxeBuilder({ page }).analyze(); 
		expect(accessibilityScanResults.violations).toEqual([]);
	});
});

test.describe("Form validation > Aria", { tag: '@reduced'}, () => {

	test("All inputs must have aria required attributes", async ({ page }) => {
		for (const input of await page.locator('[data-val-required]:not([type="checkbox"])').all()) {
			await expect(input).toHaveAttribute('aria-required');
		}
	});

	test('Error messages should be associated with a field via an aria-describedby attribute on the input', async ({ page }) => {
        const submit = page.getByText('Submit');
		await submit.click();
		for (const message of await page.locator(".error-message").all()) {
			const msgID = await message.getAttribute('id');
			expect(msgID).not.toBeNull();

			const matchingInputs = page.locator(`[aria-describedby=${msgID}]`);
			await expect(matchingInputs).not.toHaveCount(0);  

			const inputTag = await matchingInputs.first().evaluate(element=> element.tagName.toLowerCase());
			expect(["textarea", "input"]).toContain(inputTag);
		}
    });

	test('Add aria-invalid="true" to the field when error is triggered', async ({ page }) => {
		const submit = page.getByText('Submit');
		await submit.click();

        for (const input of await page.locator('input[aria-required="true"]').all()) {
            await expect(input).toHaveAttribute('aria-invalid','true');
        }
    });

});

