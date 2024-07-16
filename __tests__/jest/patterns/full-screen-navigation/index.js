import { h } from 'preact';
import { init as initFullScreenNav } from '../../../../src/js/modules/full-screen-navigation';
import FullScreenNav from '../../../../src/templates/pages/example/full-screen-navigation';
import { render } from 'preact-render-to-string';


describe('Full screen navigation > mark up', () => {
    beforeAll(() => {
        document.body.innerHTML = render(<FullScreenNav />);
        initFullScreenNav();
    });

    it('Should use a button element for the navigation triggers', () => {
        const toggleButton = document.querySelector('.js-full-screen-nav__toggle');
        expect(toggleButton.tagName).toEqual('BUTTON');
    });

    it('Buttons should be focusable', () => {
        const toggleButton = document.querySelector('.js-full-screen-nav__toggle');
        toggleButton.focus();
        expect(document.activeElement).toEqual(toggleButton);
    });

    it('Navigation should be nav element should be appropriately labelled', () => {
        const navigation = document.querySelector('nav');
        expect(navigation.getAttribute('aria-label')).toEqual('Primary navigation');
    });

    it('Buttons should be within the nav element', () => {
        const navigation = document.querySelector('nav');
        const toggleButton = document.querySelector('.js-full-screen-nav__toggle');
        expect(toggleButton.parentNode).toEqual(navigation);
    });

    it('Active navigation link should have ARIA current attribute', () => {
        const activeLink = document.querySelector('.is--active');
        expect(activeLink.getAttribute('aria-current')).toEqual('page');
    });


});