import { test } from 'node:test';
import assert from 'node:assert/strict';
import { render } from 'preact-render-to-string';
import Status from '../index.js';
import { STATUS } from '@constants';

test('Status > renders the status type as text and modifier class', () => {
    assert.equal(
        render(<Status type={STATUS.RELEASE} />),
        '<span class="status status--release">release</span>'
    );
});

test('Status > appends an extra className', () => {
    assert.equal(
        render(<Status type={STATUS.DEVELOPMENT} className="pattern-title__status" />),
        '<span class="status status--development pattern-title__status">development</span>'
    );
});

test('Status > passes through other attributes', () => {
    assert.match(render(<Status type={STATUS.RELEASE} id="status" />), /<span [^>]*id="status"/);
});
