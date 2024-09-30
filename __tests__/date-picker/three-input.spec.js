const { test, expect } = require("@playwright/test");
import AxeBuilder from '@axe-core/playwright';

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const today = new Date();
const day = today.getDate();
const month = today.getMonth();
const year = today.getFullYear();
const dayOfWeek = today.getDay();

test.beforeEach(async ({ page }) => {
	await page.goto("/example/date-picker/three-input/");
});

test.describe("Date picker mulitple input > Functionality", { tag: '@all'}, () => {
	test('Should not allow a user to interact with the calendar until opened', async ({ page }) => {
		const dialog = page.locator(".ds_datepicker__dialog");
        await expect(dialog).toBeHidden();

		const calendarButton = page.locator(".js-calendar-button");
		await calendarButton.click();
		await expect(dialog).toBeVisible();

		await calendarButton.click();
		await expect(dialog).toBeHidden();
    });

	test('Should focus on todays date when opened', async ({ page }) => {
		const calendarButton  = page.locator('.js-calendar-button');
        await calendarButton.click();
        
		const focusedElement = page.locator(':focus');
		await expect(focusedElement).toHaveRole("button");
		await expect(focusedElement).toHaveClass(/ds_datepicker__today/);
    });

	test('Should populate input value with selected date and update accessible text of button', async ({ page }) => {

		let textContentString = new RegExp(String.raw`Choose date. Selected date is ${daysOfWeek[dayOfWeek]} ${day} ${months[month]} ${year}`, "g");

		const dateInputs = page.locator('input');
		const calendarButton  = page.locator('.js-calendar-button');
		const todayButton = page.locator('.ds_datepicker__today');

		for (const input of await dateInputs.all()) {
			await input.fill("");
		}

		await calendarButton.click();
		await todayButton.click();
		await expect(calendarButton).toContainText(textContentString);

		await expect(dateInputs.first()).toHaveValue(`${day}`);
		await expect(dateInputs.nth(1)).toHaveValue(`${month+1}`);
		await expect(dateInputs.nth(2)).toHaveValue(`${year}`);
    });

	test('It should be possible to close the calendar without selecting a date', async ({ page }) => {
		const dateInputs = await page.locator('input').all();
		for (const input of dateInputs) {
			await input.fill("");
		}

		const calendarButton  = page.locator('.js-calendar-button');
        await calendarButton.click();

		const cancelButton  = page.locator('.js-datepicker-cancel');
        await cancelButton.click();

		for (const input of dateInputs) {
			await expect(input).toHaveValue("");
		}
    });

});

test.describe("Date picker mulitple input > Keyboard", { tag: '@all'}, () => {

	test('It should be possible to open the calendar via keyboard', async ({ page }) => {
		const calendarButton = page.locator(".js-calendar-button");
		const dialog = page.locator(".ds_datepicker__dialog");

		await calendarButton.focus();
		await page.keyboard.press('Enter');
		await expect(dialog).toBeVisible();
	});

	test('It should be possible select a date and populate the input via keyboard', async ({ page }) => {
		const calendarButton = page.locator(".js-calendar-button");
		const dateInputs = await page.locator('input');

		await calendarButton.focus();
		await page.keyboard.press('Enter');
		await page.keyboard.press('Enter');
		await expect(dateInputs.first()).toHaveValue(`${day}`);
		await expect(dateInputs.nth(1)).toHaveValue(`${month+1}`);
		await expect(dateInputs.nth(2)).toHaveValue(`${year}`); 

		const focusedElement = page.locator(':focus');
		await expect(focusedElement).toHaveRole("button");
		await expect(focusedElement).toHaveClass(/js-calendar-button/);
	});

	test('It should be possible to move through dates in the calendar via keyboard', async ({ page }) => {
		const calendarButton = page.locator(".js-calendar-button");
		const dateInputs = page.locator('input');

		await calendarButton.focus();
		await page.keyboard.press('Enter');
		await page.keyboard.press('ArrowRight');
		await page.keyboard.press('Enter');

		var tomorrowsDate = new Date();
		tomorrowsDate.setUTCDate(tomorrowsDate.getUTCDate() + 1);

		var lastWeeksDate = new Date();
		lastWeeksDate.setUTCDate(lastWeeksDate.getUTCDate() - 7);

		await expect(dateInputs.first()).toHaveValue(`${tomorrowsDate.getDate()}`);
		await expect(dateInputs.nth(1)).toHaveValue(`${tomorrowsDate.getMonth()+1}`);
		await expect(dateInputs.nth(2)).toHaveValue(`${tomorrowsDate.getFullYear()}`); 

		await page.keyboard.press('Enter');
		await page.keyboard.press('ArrowLeft');
		await page.keyboard.press('Enter');
		await expect(dateInputs.first()).toHaveValue(`${day}`);
		await expect(dateInputs.nth(1)).toHaveValue(`${month+1}`);
		await expect(dateInputs.nth(2)).toHaveValue(`${year}`); 

		await page.keyboard.press('Enter');
		await page.keyboard.press('ArrowUp');
		await page.keyboard.press('Enter');
		await expect(dateInputs.first()).toHaveValue(`${lastWeeksDate.getDate()}`);
		await expect(dateInputs.nth(1)).toHaveValue(`${lastWeeksDate.getMonth()+1}`);
		await expect(dateInputs.nth(2)).toHaveValue(`${lastWeeksDate.getFullYear()}`); 

		await page.keyboard.press('Enter');
		await page.keyboard.press('ArrowDown');
		await page.keyboard.press('Enter');
		await expect(dateInputs.first()).toHaveValue(`${day}`);
		await expect(dateInputs.nth(1)).toHaveValue(`${month+1}`);
		await expect(dateInputs.nth(2)).toHaveValue(`${year}`);
	});
});


test.describe("Date picker mulitple input > Markup tests", { tag: '@reduced'}, () => {
	test('Should have an accessibly labelled input', async ({ page }) => {
		for (const input of await page.locator("input").all()) {
			const inputID = await input.getAttribute('id');
			const label = page.locator(`[for=${inputID}]`);
			await expect(label).toHaveCount(1);
		}
	});

	test('Should use a button element for the calendar trigger', async ({ page }) => {
		const button = page.locator(".js-calendar-button");
        await expect(button).toHaveRole("button");
    });
	
});

test.describe("Date picker mulitple input > Axe", { tag: '@reduced'}, () => {
	test('Should not have any automatically detectable accessibility issues', async ({ page }) => {	
		const accessibilityScanResults = await new AxeBuilder({ page }).analyze(); 
		expect(accessibilityScanResults.violations).toEqual([]);
	});
});

test.describe("Date picker mulitple input > Aria", { tag: '@reduced'}, () => {
	
	test('Should use have an accessible label for each day button in the calendar', async ({ page }) => {	
        for (const day of await page.locator(".js-datepicker-grid button").all()) {
			await expect(day).toHaveAttribute('aria-label');
        }
    });

	test('Should toggle the calendar button as aria-expanded when opened and closed', async ({ page }) => {
		const calendarButton  = page.locator('.js-calendar-button');
		const todayButton = page.locator('.ds_datepicker__today');

        await calendarButton.click();
		await expect(calendarButton).toHaveAttribute('aria-expanded', 'true');

        await todayButton.click();
		await expect(calendarButton).toHaveAttribute('aria-expanded', 'false');
    });

	test('Should have an accurate aria label for date buttons', async ({ page }) => {

		const calendarButton  = page.locator('.js-calendar-button');
        await calendarButton.click();
        
		const focusedElement = page.locator(':focus');
		await expect(focusedElement).toHaveAttribute('aria-label', `${daysOfWeek[dayOfWeek]} ${day} ${months[month]} ${year}`)
    });
});

