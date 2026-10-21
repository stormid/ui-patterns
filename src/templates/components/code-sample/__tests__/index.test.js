import { test } from 'node:test';
import assert from 'node:assert/strict';
import { render } from 'preact-render-to-string';
import CodeSample from '../index.js';

const Example = () => <ul class="list"><li>One</li><li>Two</li></ul>;

test('CodeSample > renders example markup as indented, escaped HTML source', () => {
    assert.equal(
        render(<CodeSample><Example /></CodeSample>),
        '<pre class="pre"><code class="code">&lt;ul class=&quot;list&quot;>\n    &lt;li>One&lt;/li>\n    &lt;li>Two&lt;/li>\n&lt;/ul></code></pre>'
    );
});
