import { h } from 'preact';
import TableOverflow from '../../../../src/templates/pages/example/tables/overflow';
import { render } from 'preact-render-to-string';

describe('Table with overflow > mark up', () => {

    beforeAll(() => {
        document.body.innerHTML = render(<TableOverflow />);
    });

    it('Table should have a parent container', () => {
        const tables = Array.from(document.querySelectorAll('table'));
        for (const table of tables) {
            const parentEl = table.parentNode;
            expect(parentEl.nodeName === "DIV").toBeTruthy();
            expect(parentEl.classList.contains('table__container--overflow')).toBeTruthy();
        }
    });

    it('The parent container should have a tabindex of 0', () => {
        const tables = Array.from(document.querySelectorAll('table'));
        for (const table of tables) {
            const parentEl = table.parentNode;
            expect(parentEl.getAttribute("tabindex") === "0").toBeTruthy();
        }  
    });

    it('The parent container should have an aria-labelleddby attribute', () => {
        const tables = Array.from(document.querySelectorAll('table'));
        for (const table of tables) {
            const parentEl = table.parentNode;
            expect(parentEl.hasAttribute("aria-labelledby")).toBeTruthy();
        }    
    });

    it('Tables should have a table caption', () => {
        const tables = Array.from(document.querySelectorAll('table'));
        for (const table of tables) {
            expect(table.querySelector("caption")).not.toBeNull();
        }    
    });

    it('The aria-labelleddby attribute should match the ID of the table caption', () => {
        const tables = Array.from(document.querySelectorAll('table'));
        for (const table of tables) {
            const parentEl = table.parentNode;
            const ariaLabelID = parentEl.getAttribute("aria-labelledby");
            expect(table.querySelector("caption#"+ ariaLabelID)).not.toBeNull();
        }    
    });

    it('Tables should have a thead', () => {
        const tables = Array.from(document.querySelectorAll('table'));
        for (const table of tables) {
            expect(table.querySelector("thead")).not.toBeNull();
        }    
    });

    it('Tables should have a tbody', () => {
        const tables = Array.from(document.querySelectorAll('table'));
        for (const table of tables) {
            expect(table.querySelector("tbody")).not.toBeNull();
        }    
    });

    it('Table headers should have a scope', () => {
        const headers = Array.from(document.querySelectorAll('th'));
        for (const header of headers) {
            expect(header.hasAttribute("scope")).toBeTruthy();
        }    
    });

});

describe('Table with overflow > keyboard', () => {
    beforeAll(() => {
        document.body.innerHTML = render(<TableOverflow />);
    });

    it('Should be possible to focus on the table container', () => {
        const tables = Array.from(document.querySelectorAll('table'));
        for (const table of tables) {
            const parentEl = table.parentNode;
            parentEl.focus();
            expect(document.activeElement).toBe(parentEl);
        }
    });
});
