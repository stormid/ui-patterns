import { test } from 'node:test';
import assert from 'node:assert/strict';
import StaticSiteGeneratorPlugin from '../static-site-generator-plugin.js';

const { pathToAssetName } = StaticSiteGeneratorPlugin;

/*
 * pathToAssetName turns a route produced by getPaths into the HTML filename
 * emitted into the build. The three branches (explicit .html, directory index,
 * bare page) are what give pages either a pretty URL or a directly-served
 * file, so they are worth pinning down.
 */
test('pathToAssetName > maps the site root to index.html', () => {
    assert.equal(pathToAssetName(''), 'index.html');
});

test('pathToAssetName > maps a directory path to a directory index', () => {
    assert.equal(pathToAssetName('about/'), 'about/index.html');
    assert.equal(pathToAssetName('a/b/'), 'a/b/index.html');
});

test('pathToAssetName > maps a bare page name to a same-named html file', () => {
    // e.g. pages/404.js -> 404.html, which hosts serve directly as an error page
    assert.equal(pathToAssetName('404'), '404.html');
    assert.equal(pathToAssetName('nested/deep'), 'nested/deep.html');
});

test('pathToAssetName > leaves an explicit .html or .htm filename alone', () => {
    assert.equal(pathToAssetName('offline.html'), 'offline.html');
    assert.equal(pathToAssetName('legacy.htm'), 'legacy.htm');
    assert.equal(pathToAssetName('UPPER.HTML'), 'UPPER.HTML');
});

test('pathToAssetName > strips a leading slash so the asset name is relative', () => {
    // Asset names must be relative to output.path; a leading slash would emit
    // outside the build directory and 404 under the dev server.
    assert.equal(pathToAssetName('/about/'), 'about/index.html');
    assert.equal(pathToAssetName('/404'), '404.html');
});

test('resolvePaths > re-invokes a function so the page list is never stale', () => {
    // The dev server relies on this: the pages directory is re-read on every
    // compilation, so a page added while it is running gets rendered.
    let pages = ['', 'about'];
    const plugin = new StaticSiteGeneratorPlugin({ entry: 'html', paths: () => pages });

    assert.deepEqual(plugin.resolvePaths(), ['', 'about']);

    pages = ['', 'about', 'brand-new'];

    assert.deepEqual(plugin.resolvePaths(), ['', 'about', 'brand-new']);
});

test('resolvePaths > accepts a plain array and a bare string', () => {
    assert.deepEqual(new StaticSiteGeneratorPlugin({ paths: ['', '404'] }).resolvePaths(), ['', '404']);
    assert.deepEqual(new StaticSiteGeneratorPlugin({ paths: 'about/' }).resolvePaths(), ['about/']);
});

test('resolvePaths > falls back to the site root when no paths are given', () => {
    assert.deepEqual(new StaticSiteGeneratorPlugin({}).resolvePaths(), ['/']);
});
