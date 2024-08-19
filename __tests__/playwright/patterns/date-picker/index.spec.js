const { test, expect } = require("@playwright/test");
import { reducedProjects } from 'playwright.config';
import AxeBuilder from '@axe-core/playwright';

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const zeropad = num => num.toString().padStart(2, '0');

test.beforeEach(async ({ page }) => {
	await page.goto("/example/date-picker/");
});

test.describe("Date picker single input > Functionality", () => {
	test('Should not allow a user to interact with the calendar until opened', async ({ page }) => {
		const dialog = page.locator(".ds_datepicker__dialog");
        await expect(dialog).not.toBeVisible();

		const calendarButton = page.locator(".js-calendar-button");
		await calendarButton.click();
		await expect(dialog).toBeVisible();

		await calendarButton.click();
		await expect(dialog).not.toBeVisible();
    });

	test('Should focus on todays date when opened', async ({ page }) => {
		const calendarButton  = page.locator('.js-calendar-button');
        await calendarButton.click();
        
		const focusedElement = page.locator(':focus');
		await expect(focusedElement).toHaveRole("button");
		await expect(focusedElement).toHaveClass(/ds_datepicker__today/);
        await calendarButton.click();
    });

	test('Should populate input value with selected date and update accessible text of button', async ({ page }) => {
		const today = new Date();
        const day = today.getDate();
        const month = today.getMonth();
        const year = today.getFullYear();
		const dayOfWeek = today.getDay();
		let textContentString = new RegExp(String.raw`Choose date. Selected date is ${daysOfWeek[dayOfWeek]} ${day} ${months[month]} ${year}`, "g");

		const dateInput = page.locator('input');
		const calendarButton  = page.locator('.js-calendar-button');
		const todayButton = page.locator('.ds_datepicker__today');

		await dateInput.fill("");

		await todayButton.click();
		await expect(calendarButton).toContainText(textContentString);
		await expect(dateInput).toHaveValue(`${zeropad(day)}/${zeropad(month+1)}/${year}`);
		await calendarButton.click();
        
    });

});

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
		const button = page.locator(".js-calendar-button");
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

	test('Should toggle the calendar button as aria-expanded when opened and closed', async ({ page }) => {
		const calendarButton  = page.locator('.js-calendar-button');
		const todayButton = page.locator('.ds_datepicker__today');

        await calendarButton.click();
		expect(await calendarButton.getAttribute('aria-expanded')).toEqual('true');

        await todayButton.click();
		expect(await calendarButton.getAttribute('aria-expanded')).toEqual('false');
    });

	test('Should have an accurate aria label for date buttons', async ({ page }) => {
		const today = new Date();
        const dayOfWeek = today.getDay();
        const day = today.getDate();
        const month = today.getMonth();
        const year = today.getFullYear();

		const calendarButton  = page.locator('.js-calendar-button');
        await calendarButton.click();
        
		const focusedElement = page.locator(':focus');
		const focusedAria = await focusedElement.getAttribute('aria-label')
        expect(focusedAria).toEqual(`${daysOfWeek[dayOfWeek]} ${day} ${months[month]} ${year}`);
        await calendarButton.click();
    });
});

