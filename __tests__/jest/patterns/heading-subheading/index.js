import { h, Fragment } from 'preact';
import HeadingCard from '../../../../src/templates/pages/example/heading-subheading/card';
import HeadingHero from '../../../../src/templates/pages/example/heading-subheading/hero';
import { render } from 'preact-render-to-string';

describe('Heading with subtitle > mark up ', () => {

    beforeAll(() => {
        document.body.innerHTML = render(<Fragment>
            <HeadingHero />
            <HeadingCard />
        </Fragment>);
    });

    it('There must be two hgroup tags in the page', () => {
        const groups = Array.from(document.querySelectorAll('hgroup'));
        expect(groups.length).toEqual(2);
    });

    it('There must be only one heading inside each group', () => {
        const groups = Array.from(document.querySelectorAll('hgroup'));
        let headings = [];

        groups.forEach((group) => {
            headings = headings.concat(Array.from(group.querySelectorAll('h1, h2, h3, h4, h5, h6')));
        });

        expect(headings.length).toEqual(2);
    });

    it('There must only be headings and paragraphs inside the group', () => {
        const groups = Array.from(document.querySelectorAll('hgroup'));
        const allowedChildren = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'];
        let validChildren = true;

        groups.forEach((group) => {
            const groupChildren = Array.from(group.children);
            validChildren = validChildren && groupChildren.reduce((acc, curr) => {
                return acc && allowedChildren.includes(curr.tagName.toLowerCase());
            }, true);
        });

        expect(validChildren).toBeTruthy();
    });

});