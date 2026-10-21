import { test } from 'node:test';
import assert from 'node:assert/strict';
import { render } from 'preact-render-to-string';
import Table from '../index.js';

const head = [{ value: 'Name' }, { value: 'Count', isNumeric: true }];

test('Table > renders column headers with scope', () => {
    const html = render(<Table head={head} />);

    assert.match(html, /<th class="table__th" scope="col">Name<\/th>/);
    assert.match(html, /<th class="table__th table__th--right" scope="col">Count<\/th>/);
});

test('Table > labels each cell with its column header for the responsive layout', () => {
    const html = render(<Table head={head} rows={[{ cells: [{ value: 'Apples' }, { value: 3, isNumeric: true }] }]} />);

    assert.match(html, /<td data-th="Name" class="table__td">Apples<\/td>/);
    assert.match(html, /<td data-th="Count" class="table__td table__td--right">3<\/td>/);
});

test('Table > renders the empty message across all columns when there are no rows', () => {
    assert.match(
        render(<Table head={head} emptyMessage="Nothing here" />),
        /<td colspan="2" class="table__td align-center">Nothing here<\/td>/
    );
});

test('Table > adds a hidden link column and link cell for linked rows', () => {
    const html = render(<Table head={head} rows={[{ link: { href: '/apples', label: 'View apples' }, cells: [{ value: 'Apples' }, { value: 3 }] }]} />);

    assert.match(html, /<th class="table__th table__th--hidden" scope="col">Link<\/th>/);
    assert.match(html, /<tr class="table__row table__row--link">/);
    assert.match(html, /<a class="table__link" href="\/apples"><span class="visually-hidden">View apples<\/span><\/a>/);
});

test('Table > associates the container with the caption', () => {
    const html = render(<Table head={head} caption="Fruit" id="fruit-caption" tabindex="0" />);

    assert.match(html, /<div class="table__container" tabindex="0" aria-labelledby="fruit-caption">/);
    assert.match(html, /<caption id="fruit-caption" class="table__caption">Fruit<\/caption>/);
});
