import { h } from 'preact';
import initModalConfirmation from '../../../src/js/modules/modal-confirmation';
import ModalConfirmation from '../../../src/templates/pages/example/modal-confirmation';
import { render } from 'preact-render-to-string';

// <li class="list-item">Use a button element for the modal trigger</li>
// <li class="list-item">Trigger button should be focusable</li>
// <li class="list-item">Trigger button focus style should be visible</li>
// <li class="list-item">Trigger button should be appropriately labelled</li>
// <li class="list-item">Trigger button should be keyboard operable</li>
// <li class="list-item">Buttons should be no less than 44px x 44px</li>
// <li class="list-item">Modal should have a role of dialog that contains all elements of the modal</li>
// <li class="list-item">Modal should be hidden visually and from accessibility tree when closed</li>
// <li class="list-item">Modal should be visible and in accessibility tree when open</li>
// <li class="list-item">Modal should be labelled with either an aria-label or an aria-labelledby that points to a visible title</li>
// <li class="list-item">An element within modal should be given focus when open</li>
// <li class="list-item">Modal should either have an aria-modal attribute or the background (rest of the page) must get an aria-hidden attribute when the modal is open</li>
// <li class="list-item">Modal must trap tab when open</li>
// <li class="list-item">Tab sequence in the modal should include a visible button that closes the dialog</li>
// <li class="list-item">Search input should be appropriately labelled</li>
// <li class="list-item">Escape button should close the modal</li>
// <li class="list-item">Focus must return to the trigger button when closed</li>

describe('Modal confirmation > mark up', () => {
    beforeAll(() => {
        document.body.innerHTML = render(<ModalConfirmation />);
        initModalConfirmation();
    });

    it('Should use a button element for the modal trigger', () => {
        const toggleButton = document.querySelector('.js-modal-confirmation__btn');
        expect(toggleButton.tagName).toEqual('BUTTON');
    });

    it('Button should be focusable', () => {
        const toggleButton = document.querySelector('.js-modal-confirmation__btn');
        toggleButton.focus();
        expect(document.activeElement).toEqual(toggleButton);
    });

    it('Trigger button should be appropriately labelled', () => {
        const toggleButton = document.querySelector('.js-modal-confirmation__btn');
        expect(toggleButton.textContent).toEqual('Delete');
    });

    it('Modal should have a role of dialog', () => {
        const modal = document.querySelector('.modal');
        expect(modal.getAttribute('role')).toEqual('dialog');
    });

    it('Modal should be labelled with either an aria-label or an aria-labelledby that points to a visible title', () => {
        const modal = document.querySelector('.modal');
        const id = modal.getAttribute('aria-labelledby');
        expect(document.getElementById(id)).toBeDefined();
        expect(document.getElementById(id).textContent).toBeDefined();
    });

    it('Modal should either have an aria-modal attribute or the background (rest of the page) must get an aria-hidden attribute when the modal is open', () => {
        const modal = document.querySelector('.modal');
        expect(modal.getAttribute('aria-modal')).toBeDefined();
    });

});

describe('Modal search > behaviour > keyboard', () => {
    let instance;
    beforeAll(() => {
        document.body.innerHTML = render(<ModalConfirmation />);
        [ instance ] = initModalConfirmation();
    });

    it('Trigger button should be keyboard operable', () => {
        const toggleButton = document.querySelector('.js-modal-confirmation__btn');
        const enterEvent = new window.KeyboardEvent('keydown', { keyCode: 32, bubbles: true });
        toggleButton.dispatchEvent(enterEvent);
        expect(instance.getState().isOpen).toEqual(true);
    });
});

describe('Modal search > behaviour > focus', () => {
    let instance;
    beforeAll(() => {
        document.body.innerHTML = render(<ModalConfirmation />);
        [ instance ] = initModalConfirmation();
    });

    it('An element within modal should be given focus when open', () => {
        const toggleButton = document.querySelector('.js-modal-confirmation__btn');
        const enterEvent = new window.KeyboardEvent('keydown', { keyCode: 32, bubbles: true });
        toggleButton.dispatchEvent(enterEvent);
        expect(instance.getState().isOpen).toEqual(true);
        expect(document.activeElement).toEqual(document.querySelector('.modal-confirmation__confirm'));
    });
});

describe('Modal search > behaviour > tab', () => {
    let instance;
    beforeAll(() => {
        document.body.innerHTML = render(<ModalConfirmation />);
        [ instance ] = initModalConfirmation();
    });

    it('An element within modal should be given focus when open', () => {
        const toggleButton = document.querySelector('.js-modal-confirmation__btn');
        const enterEvent = new window.KeyboardEvent('keydown', { keyCode: 32, bubbles: true });
        toggleButton.dispatchEvent(enterEvent);
        expect(instance.getState().isOpen).toEqual(true);
        expect(document.activeElement).toEqual(document.querySelector('.modal-confirmation__confirm'));
    });

    it('Focus must return to the trigger button when closed', () => {
        const toggleButton = document.querySelector('.js-modal-confirmation__btn');
        expect(instance.getState().isOpen).toEqual(true);
        const escapeEvent = new window.KeyboardEvent('keydown', { keyCode: 27, bubbles: true });
        document.body.dispatchEvent(escapeEvent);
        expect(instance.getState().isOpen).toEqual(false);
        expect(document.activeElement).toEqual(toggleButton);
    });

});

describe('Modal search > behaviour > escape', () => {
    let instance;
    beforeAll(() => {
        document.body.innerHTML = render(<ModalConfirmation />);
        [ instance ] = initModalConfirmation();
    });

    it('Escape button should close the modal', () => {
        const toggleButton = document.querySelector('.js-modal-confirmation__btn');
        const enterEvent = new window.KeyboardEvent('keydown', { keyCode: 32, bubbles: true });
        toggleButton.dispatchEvent(enterEvent);
        const escapeEvent = new window.KeyboardEvent('keydown', { keyCode: 27, bubbles: true });
        document.body.dispatchEvent(escapeEvent);
        expect(instance.getState().isOpen).toEqual(false);
    });
});