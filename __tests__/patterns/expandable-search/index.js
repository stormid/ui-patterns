import { h } from 'preact';
import initExpandableSearch from '../../../src/js/modules/expandable-search';
import ExpandableSearch from '../../../src/templates/pages/example/expandable-search';
import { render } from 'preact-render-to-string';

describe('Expandable search > mark up', () => {
    beforeAll(() => {
        document.body.innerHTML = render(<ExpandableSearch />);
        initExpandableSearch();
    });
    
    it('Should use a button element for the search triggers', () => {
        const toggleButton = document.querySelector('.expandable-search__btn');
        expect(toggleButton.tagName).toEqual('BUTTON');
    });


    it('Buttons should be focusable', () => {
        const toggleButton = document.querySelector('.expandable-search__btn');
        toggleButton.focus();
        expect(document.activeElement).toEqual(toggleButton);
    });

    it('Buttons should be appropriately labelled', () => {
        const toggleButton = document.querySelector('.expandable-search__btn');
        expect(toggleButton.getAttribute('aria-label')).toEqual('Show or hide site search');
    });
    
    it('Search input should be appropriately labelled', () => {
        const input = document.querySelector('.expandable-search__input');
        const id = input.getAttribute('id');
        expect(document.querySelector(`[for="${id}"]`)).toBeDefined();
    });

});

describe('expandable search > behaviour > keyboard', () => {
    let instance;
    beforeAll(() => {
        document.body.innerHTML = render(<ExpandableSearch />);
        [ instance ] = initExpandableSearch();
    });
    afterEach(() => {
        if (instance.getState().isOpen === true) instance.toggle();
    });
});

describe('expandable search > focus order', () => {
    let instance;
    beforeAll(() => {
        document.body.innerHTML = render(<ExpandableSearch />);
        [ instance ] = initExpandableSearch();
    });
    afterEach(() => {
        if (instance.getState().isOpen === true) instance.toggle();
    });

    it('Either the first item in the navigation should be the next in the focus order after the button, or the first item should programmatically receive focus when navigation is opened', () => {
        //First open the nav
        instance.toggle();
        //check it's open
        expect(instance.getState().isOpen).toEqual(true);

        const input = document.querySelector('.expandable-search__input');
        expect(document.activeElement).toEqual(input);
    });

});

describe('expandable search > behaviour > keyboard', () => {
    let instance;
    beforeAll(() => {
        document.body.innerHTML = render(<ExpandableSearch />);
        [ instance ] = initExpandableSearch();
    });
    afterEach(() => {
        if (instance.getState().isOpen === true) instance.toggle();
    });
});

describe('expandable search > axe > ARIA', () => {
    let instance;
    beforeAll(() => {
        document.body.innerHTML = render(<ExpandableSearch />);
        [ instance ] = initExpandableSearch();
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