import { test } from 'node:test';
import assert from 'node:assert/strict';
import { render } from 'preact-render-to-string';
import PatternTitle from '../index.js';

test('PatternTitle > renders the title in a h1', () => {
    assert.equal(
        render(<PatternTitle>Tabs</PatternTitle>),
        '<h1 class="pattern-title"><span class="pattern-title__text">Tabs</span></h1>'
    );
});

test('PatternTitle > renders a lowercased status with a visually hidden label', () => {
    assert.equal(
        render(<PatternTitle status="Release">Tabs</PatternTitle>),
        '<h1 class="pattern-title"><span class="pattern-title__text">Tabs</span><span class="visually-hidden">Status</span><span class="status status--release pattern-title__status">release</span></h1>'
    );
});
