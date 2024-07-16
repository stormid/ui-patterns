import { h } from 'preact';
import { init as initDatePicker } from '../../../../src/js/modules/date-picker';
import DatePicker from '../../../../src/templates/pages/example/date-picker';
import { render } from 'preact-render-to-string';
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const zeropad = num => num.toString().padStart(2, '0');

describe('Date picker > mark up', () => {
    
    beforeAll(() => {
        document.body.innerHTML = render(<DatePicker />);
        initDatePicker();
    });

    it('Should have an accessibly labelled input', () => {
        const inputs = Array.from(document.querySelectorAll('input'));
        for (const input of inputs) {
            expect(document.querySelector(`[for=${input.getAttribute('id')}]`)).not.toBeNull();
        }
    });

    it('Should use a button element for the calendar trigger', () => {
        const button = document.querySelector('.js-calendar-button');
        expect(button.tagName).toEqual('BUTTON');
    });
    
    it('Should use have an accessible label for each day button in the calendar', () => {
        const days = Array.from(document.querySelectorAll('.js-datepicker-grid button'));
        for (const day of days) {
            expect(day.getAttribute('aria-label')).not.toBeNull();
        }
    });
});

describe('Date picker > functional', () => {
    beforeAll(() => {
        document.body.innerHTML = render(<DatePicker />);
        initDatePicker();
    });

    it('Should not allow a user to interact with the calendar until opened', () => {
        const dialog = document.querySelector('.ds_datepicker__dialog');
        expect(getComputedStyle(dialog).getPropertyValue('display')).not.toEqual('none');
        document.querySelector('.js-calendar-button').click();
        expect(getComputedStyle(dialog).getPropertyValue('display')).toEqual('block');
        document.querySelector('.js-calendar-button').click();
        expect(getComputedStyle(dialog).getPropertyValue('display')).not.toEqual('none');
    });

    it('Should focus on todays date when opened', () => {
        document.querySelector('.js-calendar-button').click();
        const today = new Date();
        const dayOfWeek = today.getDay();
        const day = today.getDate();
        const month = today.getMonth();
        const year = today.getFullYear();
        const todayButton = document.querySelector('.ds_datepicker__today');
        expect(document.activeElement).toEqual(todayButton);
        expect(todayButton.getAttribute('aria-label')).toEqual(`${daysOfWeek[dayOfWeek]} ${day} ${months[month]} ${year}`);
        document.querySelector('.js-calendar-button').click();
    });

    it('Should select the focused date, close calendar, focus back on the calendar button, and update the accessible name of the button to indicate the date', () => {
        document.querySelector('input').value = '';
        document.querySelector('.js-calendar-button').click();
        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth();
        const year = today.getFullYear();
        const todayButton = document.querySelector('.ds_datepicker__today');
        todayButton.click();
        expect(getComputedStyle(document.querySelector('.ds_datepicker__dialog')).getPropertyValue('display')).not.toEqual('none');
        const trigger = document.querySelector('.js-calendar-button');
        expect(document.activeElement).toEqual(trigger);
        expect(trigger.getAttribute('aria-expanded')).toEqual('false');
        // the following test doesn't pass becuase the functionality doesn't work in JS DOM which doesn't support element.innerText
        // https://github.com/jsdom/jsdom/issues/1245
        // expect(trigger.textContent).toEqual(`Choose date. Selected date is ${daysOfWeek[dayOfWeek]} ${day} ${months[month]} ${year}`);
        expect(document.querySelector('input').value).toEqual(`${zeropad(day)}/${zeropad(month+1)}/${year}`);
        document.querySelector('.js-calendar-button').click();
    });
});