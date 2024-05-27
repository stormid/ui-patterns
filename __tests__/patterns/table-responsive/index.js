import { h } from 'preact';
import TableResponsive from '../../../src/templates/pages/example/tables/responsive';
import { render } from 'preact-render-to-string';

describe('Table with responsive cards > mark up', () => {

    beforeAll(() => {
        document.body.innerHTML = render(<TableResponsive />);
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

    it('Table cells should have a data attribute for the header', () => {
        const tables = Array.from(document.querySelectorAll('table'));
        for (const table of tables) {
            const headers = Array.from(table.querySelectorAll('th'));
            const rows = Array.from(document.querySelectorAll('tr'));

            for (const row of rows) {
                const cells = Array.from(row.querySelectorAll('td'));
                cells.forEach((cell, index) => {
                    expect(cell.getAttribute("data-th")).toEqual(headers[index].textContent);
                })
            }  
        }  
    });

});

