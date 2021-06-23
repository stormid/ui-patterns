import { h } from 'preact';
import initOffCanvas from '../../../src/js/modules/off-canvas';
import OffCanvas from '../../../src/templates/pages/example/off-canvas';
import { render } from 'preact-render-to-string';

describe('Off-canvas > mark up', () => {
    beforeAll(() => {
        document.body.innerHTML = render(<OffCanvas />);
        initOffCanvas();
    });
    
    it('Should use a button element for the navigation triggers', () => {
        const toggleButton = document.querySelector('.off-canvas__btn');
        expect(toggleButton.tagName).toEqual('BUTTON');
    });

    it('Navigation should be nav element should be appropriately labelled', () => {
        const navigation = document.querySelector('nav');
        expect(navigation.getAttribute('aria-label')).toEqual('Primary navigation');
    });

    it('Buttons should be within the nav element', () => {
        const navigation = document.querySelector('nav');
        const toggleButton = document.querySelector('.off-canvas__btn');
        expect(toggleButton.parentNode).toEqual(navigation);
    });

    it('Buttons should be focusable', () => {
        const toggleButton = document.querySelector('.off-canvas__btn');
        toggleButton.focus();
        expect(document.activeElement).toEqual(toggleButton);
    });

    it('Buttons should be appropriately labelled', () => {
        const toggleButton = document.querySelector('.off-canvas__btn');
        expect(toggleButton.getAttribute('aria-label')).toEqual('Show or hide navigation menu');
    });

    it('Active navigation link should have ARIA current attribute', () => {
        const activeLink = document.querySelector('.is--active');
        expect(activeLink.getAttribute('aria-current')).toEqual('page');
    });


});

describe('Off-canvas > behaviour > keyboard', () => {
    let instance;
    beforeAll(() => {
        document.body.innerHTML = render(<OffCanvas />);
        [ instance ] = initOffCanvas();
    });
    afterEach(() => {
        if (instance.getState().isOpen === true) instance.toggle();
    });

    it('Buttons should be keyboard operable', () => {
        const toggleButton = document.querySelector('.off-canvas__btn');
        const enterEvent = new window.KeyboardEvent('keydown', { keyCode: 32, bubbles: true });
        toggleButton.dispatchEvent(enterEvent);
        expect(instance.getState().isOpen).toEqual(true);
    });
});

describe('Off-canvas > focus order', () => {
    let instance;
    beforeAll(() => {
        document.body.innerHTML = render(<OffCanvas />);
        [ instance ] = initOffCanvas();
    });
    afterEach(() => {
        if (instance.getState().isOpen === true) instance.toggle();
    });

    it('Either the first item in the navigation should be the next in the focus order after the button, or the first item should programmatically receive focus when navigation is opened', () => {
        const [ toggleButton ] = instance.getState().toggles;
        //First open the nav
        instance.toggle();
        //check it's open
        expect(instance.getState().isOpen).toEqual(true);

        const FOCUSABLE = [
            'a[href]',
            'area[href]',
            'input:not([disabled]):not([type=hidden])',
            'select:not([disabled])',
            'textarea:not([disabled])',
            'button:not([disabled])',
            'iframe',
            'object',
            'embed',
            '[contenteditable]',
            '[tabindex]:not([tabindex="-1"])'
        ].join(', ');
        const focusableElements = [].slice.call(document.querySelectorAll(FOCUSABLE));
        let index = 0;
        for (let element of focusableElements){
            if (element === toggleButton) return;
            index++;
        }
        const firstNavItem = document.querySelector('.off-canvas__link');
        expect(focusableElements[index + 1]).toEqual(firstNavItem);
    });

});

describe('Off-canvas > behaviour > keyboard', () => {
    let instance;
    beforeAll(() => {
        document.body.innerHTML = render(<OffCanvas />);
        [ instance ] = initOffCanvas();
    });
    afterEach(() => {
        if (instance.getState().isOpen === true) instance.toggle();
    });

    it('Focus outside navigation should hide navigation', () => {
        //First open the nav
        instance.toggle();
        //check it's open
        expect(instance.getState().isOpen).toEqual(true);

        //ain has a tabindex in order to make it selectabled for testing
        document.querySelector('main').focus();
        expect(instance.getState().isOpen).toEqual(false);
    });

});

describe('Off-canvas > axe > ARIA', () => {
    let instance;
    beforeAll(() => {
        document.body.innerHTML = render(<OffCanvas />);
        [ instance ] = initOffCanvas();
    });
    afterEach(() => {
        if (instance.getState().isOpen === true) instance.toggle();
    });

    it('ARIA controls attribute should correctly associate button with nav element', () => {
        const { toggles, node } = instance.getState();
        const [ toggle ] = toggles;
        expect(toggle.getAttribute('aria-controls')).toEqual(node.getAttribute('id'));
    });

    it('ARIA expanded attribute should correctly describe shown/hidden state', () => {
        const [ toggle ] = instance.getState().toggles;
        expect(toggle.getAttribute('aria-expanded')).toEqual("false");
        instance.toggle();
        expect(toggle.getAttribute('aria-expanded')).toEqual("true");
    });

});