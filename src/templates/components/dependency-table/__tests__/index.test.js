import { test } from 'node:test';
import assert from 'node:assert/strict';
import { render } from 'preact-render-to-string';
import DependencyTable from '../index.js';

const dependencies = [
    { package: '@stormid/tabs', installation: 'npm i -S @stormid/tabs' },
    { package: '@stormid/toggle', installation: 'npm i -S @stormid/toggle' }
];

test('DependencyTable > renders a row per dependency', () => {
    const html = render(<DependencyTable dependencies={dependencies} />);

    assert.equal(html.match(/<tbody>.*<\/tbody>/)[0].match(/<tr>/g).length, 2);
});

test('DependencyTable > links each package to npm and shows its install command', () => {
    const html = render(<DependencyTable dependencies={dependencies.slice(0, 1)} />);

    assert.match(html, /<a href="https:\/\/www\.npmjs\.com\/package\/@stormid\/tabs" rel="noopener nofollow">@stormid\/tabs<\/a>/);
    assert.match(html, /<code class="code">npm i -S @stormid\/tabs<\/code>/);
});
