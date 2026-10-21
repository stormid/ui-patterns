import { test } from 'node:test';
import assert from 'node:assert/strict';
import utils from '../index.js';

const { getPaths, merge } = utils;

/*
 * getPaths turns the contents of the pages directory into the list of routes
 * the static site generator renders. Tested against a fixed fixture tree
 * (tools/testing/fixtures/pages) rather than the real src/templates/pages, so
 * the assertions don't change every time the scaffold gains or loses a page.
 */
const FIXTURES = 'tools/testing/fixtures/pages';

test('getPaths > maps a root index.js to the site root', () => {
    assert.ok(getPaths(FIXTURES).includes(''));
});

test('getPaths > maps a nested index.js to a directory path with a trailing slash', () => {
    assert.ok(getPaths(FIXTURES).includes('nested/'));
});

test('getPaths > maps a bare page file to its own name, without the extension', () => {
    const paths = getPaths(FIXTURES);

    assert.ok(paths.includes('about'));
    assert.ok(paths.includes('nested/deep'));
});

test('getPaths > ignores files that are not .js', () => {
    assert.deepEqual(getPaths(FIXTURES).toSorted(), ['', 'about', 'nested/', 'nested/deep']);
});

test('merge > deep-merges nested plain objects', () => {
    const result = merge(
        { output: { path: 'build', filename: 'a.js' } },
        { output: { filename: 'b.js', clean: true } }
    );

    assert.deepEqual(result, { output: { path: 'build', filename: 'b.js', clean: true } });
});

test('merge > concatenates arrays, base first', () => {
    assert.deepEqual(
        merge({ plugins: ['a', 'b'] }, { plugins: ['c'] }),
        { plugins: ['a', 'b', 'c'] }
    );
});

test('merge > overwrites scalars with the override value', () => {
    assert.deepEqual(merge({ mode: 'development' }, { mode: 'production' }), { mode: 'production' });
});

test('merge > adds keys present only in the override', () => {
    assert.deepEqual(merge({ mode: 'production' }, { devtool: 'source-map' }), {
        mode: 'production',
        devtool: 'source-map'
    });
});

test('merge > does not mutate the base config', () => {
    // The base configs are shared module singletons across the dev/build/ci
    // configs, so a mutating merge would leak plugins between build modes.
    const base = { plugins: ['a'], output: { path: 'build' } };

    merge(base, { plugins: ['b'], output: { clean: true } });

    assert.deepEqual(base, { plugins: ['a'], output: { path: 'build' } });
});

test('merge > replaces an array with a non-array override', () => {
    assert.deepEqual(merge({ target: ['web'] }, { target: 'node' }), { target: 'node' });
});
