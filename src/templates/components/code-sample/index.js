import render from 'preact-render-to-string/jsx';

// Renders example markup as indented HTML source for display in a pattern page.
// Pretty-printing lives in the /jsx entry point; the default renderer ignores it.
const CodeSample = ({ children }) => <pre class="pre"><code class="code">{render(children, {}, { pretty: '    ', jsx: false })}</code></pre>;

export default CodeSample;
