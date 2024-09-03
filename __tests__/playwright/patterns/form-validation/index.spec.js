const { test, expect } = require("@playwright/test");
import { reducedProjects } from 'playwright.config';
import AxeBuilder from '@axe-core/playwright';

test.beforeEach(async ({ page }) => {
	await page.goto("/example/form-validation/");
});

test.describe("Form validation > Errors", () => {
	test("Error messages should not be live regions", async ({ page }) => {
		const submit = page.getByText('Submit');
		await submit.click();
		for (const message of await page.locator(".error-message").all()) {
			expect(await message.getAttribute('role')).toBeNull();
            expect(await message.getAttribute('aria-live')).toBeNull();
		}
	})
});

test.describe("Form validation > Keyboard", () => {
	test("Inputs should be focusable", async ({ page }) => {
		await page.keyboard.press('Tab');
		let focusedElement = page.locator(':focus');
		const inputTag = await focusedElement.evaluate(element=> element.tagName.toLowerCase());
		expect(["textarea", "input"]).toContain(inputTag);

		const firstCheckBox = page.getByRole('checkbox').first();
		await firstCheckBox.focus();
		await page.keyboard.press('Tab');
		focusedElement = page.locator(':focus');
		await expect(focusedElement).toHaveRole("checkbox");
	});
});

test.use({ projects: reducedProjects });

test.describe("Form validation > Markup tests", () => {
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

		expect(await firstName.getAttribute('autocomplete')).toEqual("given-name");
		expect(await lastName.getAttribute('autocomplete')).toEqual("family-name");
		expect(await email.getAttribute('autocomplete')).toEqual("email");
	});
	
});

test.describe("Form validation > Axe", () => {
	test('Should not have any automatically detectable accessibility issues', async ({ page }) => {	
		const accessibilityScanResults = await new AxeBuilder({ page }).analyze(); 
		expect(accessibilityScanResults.violations).toEqual([]);
	});
});

test.describe("Form validation > Aria", () => {

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
            expect(await input.getAttribute('aria-invalid')).toEqual('true');
        }
    });

});

