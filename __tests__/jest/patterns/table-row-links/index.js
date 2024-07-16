import { h } from 'preact';
import TableRowLinks from '../../../../src/templates/pages/example/tables/row-links';
import { render } from 'preact-render-to-string';

describe('Table with row links > mark up', () => {

    beforeAll(() => {
        document.body.innerHTML = render(<TableRowLinks />);
    });

    it('Tables should have a table caption', () => {
        const tables = Array.from(document.querySelectorAll('table'));
        for (const table of tables) {
            expect(table.querySelector("caption")).not.toBeNull();
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

    it('Table rows should have a single link', () => {
        const rows = Array.from(document.querySelectorAll('tbody tr'));

        for (const row of rows) {
            expect(Array.from(row.querySelectorAll("a")).length).toEqual(1);
        }  
    });

});

