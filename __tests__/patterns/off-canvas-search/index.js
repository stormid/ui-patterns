import { h } from 'preact';
import initOffCanvasSearch from '../../../src/js/modules/off-canvas-search';
import OffCanvasSearch from '../../../src/templates/pages/example/off-canvas-search';
import { render } from 'preact-render-to-string';

describe('Off-canvas search > mark up', () => {
    beforeAll(() => {
        document.body.innerHTML = render(<OffCanvasSearch />);
        initOffCanvasSearch();
    });
    
    it('Should use a button element for the search triggers', () => {
        const toggleButton = document.querySelector('.off-canvas-search__btn');
        expect(toggleButton.tagName).toEqual('BUTTON');
    });


    it('Buttons should be focusable', () => {
        const toggleButton = document.querySelector('.off-canvas-search__btn');
        toggleButton.focus();
        expect(document.activeElement).toEqual(toggleButton);
    });

    it('Buttons should be appropriately labelled', () => {
        const toggleButton = document.querySelector('.off-canvas-search__btn');
        expect(toggleButton.getAttribute('aria-label')).toEqual('Show or hide site search');
    });
    
    it('Search input should be appropriately labelled', () => {
        const input = document.querySelector('.off-canvas-search__input');
        const id = input.getAttribute('id');
        expect(document.querySelector(`[for="${id}"]`)).toBeDefined();
    });

});

describe('Off-canvas search > behaviour > keyboard', () => {
    let instance;
    beforeAll(() => {
        document.body.innerHTML = render(<OffCanvasSearch />);
        [ instance ] = initOffCanvasSearch();
    });
    afterEach(() => {
        if (instance.getState().isOpen === true) instance.toggle();
    });

    it('Buttons should be keyboard operable', () => {
        const toggleButton = document.querySelector('.off-canvas-search__btn');
        const enterEvent = new window.KeyboardEvent('keydown', { keyCode: 32, bubbles: true });
        toggleButton.dispatchEvent(enterEvent);
        expect(instance.getState().isOpen).toEqual(true);
    });
});

describe('Off-canvas search > focus order', () => {
    let instance;
    beforeAll(() => {
        document.body.innerHTML = render(<OffCanvasSearch />);
        [ instance ] = initOffCanvasSearch();
    });
    afterEach(() => {
        if (instance.getState().isOpen === true) instance.toggle();
    });

    it('Either the first item in the navigation should be the next in the focus order after the button, or the first item should programmatically receive focus when navigation is opened', () => {
        //First open the nav
        instance.toggle();
        //check it's open
        expect(instance.getState().isOpen).toEqual(true);

        const input = document.querySelector('.off-canvas-search__input');
        expect(document.activeElement).toEqual(input);
    });

});

describe('Off-canvas search > behaviour > keyboard', () => {
    let instance;
    beforeAll(() => {
        document.body.innerHTML = render(<OffCanvasSearch />);
        [ instance ] = initOffCanvasSearch();
    });
    afterEach(() => {
        if (instance.getState().isOpen === true) instance.toggle();
    });

    it('Focus outside search should hide navigation', () => {
        //First open the nav
        instance.toggle();
        //check it's open
        expect(instance.getState().isOpen).toEqual(true);

        //ain has a tabindex in order to make it selectabled for testing
        document.querySelector('main').focus();
        expect(instance.getState().isOpen).toEqual(false);
    });

});

describe('Off-canvas search > axe > ARIA', () => {
    let instance;
    beforeAll(() => {
        document.body.innerHTML = render(<OffCanvasSearch />);
        [ instance ] = initOffCanvasSearch();
    });
    afterEach(() => {
        if (instance.getState().isOpen === true) instance.toggle();
    });

    it('ARIA controls attribute should correctly associate button with search container element', () => {
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