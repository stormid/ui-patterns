import { h } from 'preact';
import FormPatternsSingle from '../../../src/templates/pages/example/form-headings/form-headings-single';
import FormPatternsSingleMulti from '../../../src/templates/pages/example/form-headings/form-headings-single-multi';
import FormPatternsMultiple from '../../../src/templates/pages/example/form-headings/form-headings-multiple';
import { render } from 'preact-render-to-string';

describe('Form validation > Single > mark up', () => {

    beforeAll(() => {
        document.body.innerHTML = render(<FormPatternsSingle />);
    });

    it('All inputs must have associated labels', () => {
        const inputs = Array.from(document.querySelectorAll('input'));
        for (const input of inputs) {
            expect(document.querySelector(`[for=${input.getAttribute('id')}]`)).not.toBeNull();
        }
    });

    it('There should be only one h1 per page', () => {
        const headings = Array.from(document.querySelectorAll('h1'));
        expect(headings.length).toEqual(1);   
    });

    it('There should be only one label', () => {
        const labels = Array.from(document.querySelectorAll('label'));
        expect(labels.length).toEqual(1);   
    });

    it('The h1 should contain the label', () => {
        const headings = Array.from(document.querySelectorAll('h1 label'));
        expect(headings.length).toEqual(1);   
    });

});

describe('Form validation > Single with multiple choice > mark up', () => {

    beforeAll(() => {
        document.body.innerHTML = render(<FormPatternsSingleMulti />);
    });

    it('All inputs must have associated labels', () => {
        const inputs = Array.from(document.querySelectorAll('input'));
        for (const input of inputs) {
            expect(document.querySelector(`[for=${input.getAttribute('id')}]`)).not.toBeNull();
        }
    });

    it('There should be only one h1 per page', () => {
        const headings = Array.from(document.querySelectorAll('h1'));
        expect(headings.length).toEqual(1);   
    });

    it('There should be only one lagend per page', () => {
        const legends = Array.from(document.querySelectorAll('legend'));
        expect(legends.length).toEqual(1);   
    });

    it('The H1 should be contained within a legend', () => {
        const headings = Array.from(document.querySelectorAll('legend h1'));
        expect(headings.length).toEqual(1);   
    });
});

describe('Form validation > Single with multiple questions > mark up', () => {

    beforeAll(() => {
        document.body.innerHTML = render(<FormPatternsMultiple />);
    });

    it('All inputs must have associated labels', () => {
        const inputs = Array.from(document.querySelectorAll('input'));
        for (const input of inputs) {
            expect(document.querySelector(`[for=${input.getAttribute('id')}]`)).not.toBeNull();
        }
    });

    it('There should be only one h1 per page', () => {
        const headings = Array.from(document.querySelectorAll('h1'));
        expect(headings.length).toEqual(1);   
    });

    it('The h1 should be outwith any legends and not contain labels', () => {
        const headings = Array.from(document.querySelectorAll('h1 label, legend h1'));
        expect(headings.length).toEqual(0);   
    });

});