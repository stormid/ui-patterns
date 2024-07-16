import { h } from 'preact';
import { init as initExpandableSection } from '../../../../src/js/modules/expandable-section';
import ExpandableSection from '../../../../src/templates/pages/example/expandable-section';
import { render } from 'preact-render-to-string';

describe('Expandable section > mark up', () => {
    beforeAll(() => {
        document.body.innerHTML = render(<ExpandableSection />);
        initExpandableSection();
    });

    it('Should use a button element for the expandable section trigger', () => {
        const toggleButton = document.querySelector('.js-expandable-section__btn-1');
        expect(toggleButton.tagName).toEqual('BUTTON');
    });

    it('Buttons should be focusable', () => {
        const toggleButton = document.querySelector('.js-expandable-section__btn-1');
        toggleButton.focus();
        expect(document.activeElement).toEqual(toggleButton);
    });

    it('Buttons should be appropriately labelled', () => {
        const toggleButton = document.querySelector('.js-expandable-section__btn-1');
        expect(toggleButton.textContent).toEqual('Section title');
    });

});


describe('Expandable search > axe > ARIA', () => {
    let instance;
    beforeAll(() => {
        document.body.innerHTML = render(<ExpandableSection />);
        [ instance ] = initExpandableSection();
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