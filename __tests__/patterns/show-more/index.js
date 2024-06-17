import { h } from 'preact';
import { init as initShowMore, showMoreFocus } from '../../../src/js/modules/show-more';
import ShowMore from '../../../src/templates/pages/example/show-more';
import { render } from 'preact-render-to-string';

describe('Show more > mark up', () => {
    beforeAll(() => {
        document.body.innerHTML = render(<ShowMore />);
        initShowMore();
    });

    it('Should use a button element for the section trigger', () => {
        const toggleButton = document.querySelector('.js-show-more__toggle');
        expect(toggleButton.tagName).toEqual('BUTTON');
    });

    it('Buttons should be focusable', () => {
        const toggleButton = document.querySelector('.js-show-more__toggle');
        toggleButton.focus();
        expect(document.activeElement).toEqual(toggleButton);
    });

    it('Buttons should be appropriately labelled', () => {
        const toggleButton = document.querySelector('.js-show-more__toggle');
        expect(toggleButton.getAttribute('aria-label')).toEqual('Show more about Lorem ipsum dolor sit amet');
    });

});

describe('Show more > behaviour > focus management', () => {
    let instance;
    beforeAll(() => {
        document.body.innerHTML = render(<ShowMore />);
        [ instance ] = initShowMore()[0];
    });

    it('showMoreFocus should correctly manage focus position', () => {
        const node = instance.getState().node;
        const [ show ] = instance.getState().toggles;
        expect(node.getAttribute('tabindex')).toBeNull();

        instance.toggle();
        showMoreFocus(instance.getState().isOpen, node, show);
        expect(node.getAttribute('tabindex')).toEqual("-1");
        expect(document.activeElement).toEqual(node);

        instance.toggle();
        showMoreFocus(instance.getState().isOpen, node, show);
        expect(node.getAttribute('tabindex')).toEqual(null);
        expect(document.activeElement).toEqual(show);
    });

    
    // it('Focus should move appropriately when toggle buttons used', () => {
    //     const node = instance.getState().node;
    //     const [ show, hide ] = instance.getState().toggles;
    //     show.click();
    //     expect(document.activeElement).toEqual(node);
    //     hide.click();
    //     expect(document.activeElement).toEqual(show);
    // });
});

describe('Show more > axe > ARIA', () => {
    let instance;
    beforeAll(() => {
        document.body.innerHTML = render(<ShowMore />);
        [ instance ] = initShowMore()[0];
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