import { h } from 'preact';
import initModalSearch from '../../../src/js/modules/modal-search';
import ModalSearch from '../../../src/templates/pages/example/modal-search';
import { render } from 'preact-render-to-string';

describe('Modal search > mark up', () => {
    beforeAll(() => {
        document.body.innerHTML = render(<ModalSearch />);
        initModalSearch();
    });

    it('Should use a button element for the modal trigger', () => {
        const toggleButton = document.querySelector('.modal-search__btn');
        expect(toggleButton.tagName).toEqual('BUTTON');
    });

    it('Button should be focusable', () => {
        const toggleButton = document.querySelector('.modal-search__btn');
        toggleButton.focus();
        expect(document.activeElement).toEqual(toggleButton);
    });

    it('Trigger button should be appropriately labelled', () => {
        const toggleButton = document.querySelector('.modal-search__btn');
        expect(toggleButton.getAttribute('aria-label')).toEqual('Show or hide site search');
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
        document.body.innerHTML = render(<ModalSearch />);
        [ instance ] = initModalSearch();
    });

    it('Trigger button should be keyboard operable', () => {
        const toggleButton = document.querySelector('.modal-search__btn');
        const enterEvent = new window.KeyboardEvent('keydown', { keyCode: 32, bubbles: true });
        toggleButton.dispatchEvent(enterEvent);
        expect(instance.getState().isOpen).toEqual(true);
    });
});

describe('Modal search > behaviour > focus', () => {
    let instance;
    beforeAll(() => {
        document.body.innerHTML = render(<ModalSearch />);
        [ instance ] = initModalSearch();
    });

    it('An element within modal should be given focus when open', () => {
        const toggleButton = document.querySelector('.modal-search__btn');
        const enterEvent = new window.KeyboardEvent('keydown', { keyCode: 32, bubbles: true });
        toggleButton.dispatchEvent(enterEvent);
        expect(instance.getState().isOpen).toEqual(true);
        expect(document.activeElement).toEqual(document.getElementById('q'));
    });
});

describe('Modal search > behaviour > tab', () => {
    let instance;
    beforeAll(() => {
        document.body.innerHTML = render(<ModalSearch />);
        [ instance ] = initModalSearch();
    });

    it('An element within modal should be given focus when open', () => {
        const toggleButton = document.querySelector('.modal-search__btn');
        const enterEvent = new window.KeyboardEvent('keydown', { keyCode: 32, bubbles: true });
        toggleButton.dispatchEvent(enterEvent);
        expect(instance.getState().isOpen).toEqual(true);
        expect(document.activeElement).toEqual(document.getElementById('q'));
    });

    it('Focus must return to the trigger button when closed', () => {
        const toggleButton = document.querySelector('.modal-search__btn');
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
        document.body.innerHTML = render(<ModalSearch />);
        [ instance ] = initModalSearch();
    });

    it('Escape button should close the modal', () => {
        const toggleButton = document.querySelector('.modal-search__btn');
        const enterEvent = new window.KeyboardEvent('keydown', { keyCode: 32, bubbles: true });
        toggleButton.dispatchEvent(enterEvent);
        const escapeEvent = new window.KeyboardEvent('keydown', { keyCode: 27, bubbles: true });
        document.body.dispatchEvent(escapeEvent);
        expect(instance.getState().isOpen).toEqual(false);
    });
});