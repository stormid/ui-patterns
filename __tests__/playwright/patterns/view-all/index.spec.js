const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
	await page.goto("/example/view-all/");
})

test("View all > Should use a button element for the expandable section trigger", async ({ page }) => {
	const locator = page.locator(".js-expandable-section__btn-1");
	await expect(locator).toHaveRole("button");
});

test("View all > Buttons should be appropriately labelled", async ({ page }) => {
	const locator = page.locator(".js-expandable-section__btn-1");
	await expect(locator).toContainText(/Section title/);
});

test("View all > Should use a button element for the view all trigger", async ({ page }) => {
	const locator = page.locator(".js-expandable-section__btn-all");
	await expect(locator).toHaveRole("button");
});

test("View all > View all button should be appropriately labelled", async ({ page }) => {
	const locator = page.locator(".js-expandable-section__btn-all .visually-hidden").first();
	await expect(locator).toContainText(/sections about Lorem Ipsum/);
});

test("View all > Buttons should be focusable", async ({ page }) => {
	await page.keyboard.press('Tab');
	const focusedElement = page.locator(':focus');
	await expect(focusedElement).toHaveRole("button");
	await expect(focusedElement).toHaveClass(/js-expandable-section__btn-all/);
	await page.keyboard.press('Tab');
	await expect(focusedElement).toHaveRole("button");
	await expect(focusedElement).toHaveClass(/js-expandable-section__btn-1/);
});

// describe('View all > functionality', () => {
//     let instance;
//     beforeEach(() => {
//         document.body.innerHTML = render(<ViewAll />);
//         [ instance ] = initViewAll();
//     });

//     it('Should update the visible text on the button when toggled', () => {
//         const [ btn ] = instance.getState().btns;
//         expect(btn.textContent).toMatch(/(View all)/i);
//         btn.click();
//         expect(btn.textContent).toMatch(/(Hide all)/i);
//     });

//     it('View all button should toggle all inner expandable sections when used', () => {
//         const [ btn ] = instance.getState().btns;
//         const toggles = instance.getState().toggles;

//         const allClosed = toggles.reduce((acc, tog) => {
//             return acc && !tog.getState().isOpen;
//         }, true);
//         expect(allClosed).toBeTruthy();

//         btn.click();

//         const allOpen = toggles.reduce((acc, tog) => {
//             return acc && tog.getState().isOpen;
//         }, true);
//         expect(allOpen).toBeTruthy();
//     });

//     it('View all button should update when all toggles are manually opened', () => {
//         const [ btn ] = instance.getState().btns;
//         const toggles = instance.getState().toggles;

//         toggles.forEach((toggle) => {
//             toggle.getState().toggles[0].click();
//         });
//         expect(btn.textContent).toMatch(/(Hide all)/i);
//         expect(btn.classList.contains('is--open')).toBeTruthy();
//         expect(btn.getAttribute('aria-expanded')).toEqual("true");
//     });

// });

// describe('Expandable search > axe > ARIA', () => {
//     let instance;
//     beforeEach(() => {
//         document.body.innerHTML = render(<ViewAll />);
//         [ instance ] = initViewAll();
//     });

//     it('ARIA controls attribute should correctly associate button with search container element', () => {
//         const [ toggle ] = instance.getState().toggles;
//         const [ innerToggleBtn ] = toggle.getState().toggles;
//         expect(innerToggleBtn.getAttribute('aria-controls')).toEqual(toggle.node.getAttribute('id'));
//     });

//     it('ARIA expanded attribute should correctly describe shown/hidden state of individual toggles', () => {
//         const [ toggle ] = instance.getState().toggles;
//         const [ innerToggleBtn ] = toggle.getState().toggles;
//         expect(innerToggleBtn.getAttribute('aria-expanded')).toEqual("false");
//         toggle.toggle();
//         expect(innerToggleBtn.getAttribute('aria-expanded')).toEqual("true");
//     });

//     it('ARIA expanded attribute should correctly describe shown/hidden state of view all toggle', () => {
//         const [ btn ] = instance.getState().btns;
//         expect(btn.getAttribute('aria-expanded')).toEqual("false");
//         btn.click();
//         expect(btn.getAttribute('aria-expanded')).toEqual("true");
//     });

// });
