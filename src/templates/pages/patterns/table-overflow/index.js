import { h } from 'preact';
import PatternLayout from '@layouts/pattern';
import Code from '../../example/tables/overflow/code';
import CodeSticky from '../../example/tables/overflow-sticky/code';
import { render } from 'preact-render-to-string';
import PatternTitle from '@components/pattern-title';
import { STATUS } from '@constants';

export const title = 'Table patterns';

export const status = STATUS.DEVELOPMENT;

const Tables = () => <PatternLayout>
    <PatternTitle status={status}>Table with scrolling overflow</PatternTitle>
    <p class="push-bottom--double">An example of markup and styling for a scrollable table wrapper</p>
    
    <h2 class="push-bottom--half plus-2 medium">Guidance</h2>
    <p class="push-bottom">Tabular data can be difficult to display at smaller breakpoints.  The reduced width of mobile screens does not allow space for table rows to stretch out and data can end up looking very compressed, or cutting off to the right of the screen.</p>
    <p class="push-bottom">One option to handle this is to wrap the table in a container. This container is styled to scroll horizontally when it needs to, while keeping the rest of the page contained within the screen width.</p>
    <p class="push-bottom">This pattern is best used when the tabular data needs to be scanned by the user in the context of the other rows around it.  It allows for easier visual comparison between table row entries.</p>
    <p class="push-bottom--double">If this is not necessary, you may wish to consider the alterntative <a href="/patterns/table-responsive">responsive card table</a> pattern.</p>
    
    <h2 class="push-bottom--half plus-2 medium">Example with scrolling overflow</h2>
    <iframe style="--height: 500px" class="example" title="Example table with scrolling overflow" src={'/example/tables/overflow'}></iframe>
    <p class="push-bottom align-right"><a href="/example/tables/overflow" rel="noopener" target="_blank">Open in a new tab</a></p>
    <pre class="pre"><code class="code">{`${render(<Code />, null, { pretty: true })}`}</code></pre>

    <h2 class="push-bottom--half plus-2 medium">Example with scrolling overflow and sticky column</h2>
    <iframe style="--height: 500px" class="example" title="Example table with scrolling overflow and sticky column" src={'/example/tables/overflow-sticky'}></iframe>
    <p class="push-bottom align-right"><a href="/example/tables/overflow-sticky" rel="noopener" target="_blank">Open in a new tab</a></p>
    <pre class="pre"><code class="code">{`${render(<CodeSticky />, null, { pretty: true })}`}</code></pre>

    <h2 class="push-bottom plus-2 medium">Acceptance criteria</h2>
    <p class="push-bottom--double">The following is a list of example acceptance criteria to test against when using this pattern.  These critera should test that the specific markup requirements are met, and that the search behaves visually and functionally as expected.</p>

    <h3 class="push-bottom--half plus-1 medium">For validation in developer tools / web inspector</h3>
    <ul class="list list--tick push-bottom--double">
        <li class="list-item">There should be an HTML <pre class="pre--inline">&lt;div&gt;</pre> element with a container class as the immediate parent of the table</li>
        <li class="list-item">The container <pre class="pre--inline">&lt;div&gt;</pre> element should have a <pre class="pre--inline">tabindex="0"</pre> attribute to allow for keyboard access</li>
        <li class="list-item">The container <pre class="pre--inline">div</pre> element should have an <pre class="pre--inline">aria-labelledby</pre> attribute which matches the id of the table caption</li>
        <li class="list-item">The table should contain a <pre class="pre--inline">&lt;thead&gt;</pre> element which wraps a row containing <pre class="pre--inline">&lt;th&gt;</pre> tags</li>
        <li class="list-item">Each <pre class="pre--inline">&lt;th&gt;</pre> tag should have an appropriate scope attribute</li>
        <li class="list-item">The table should contain a <pre class="pre--inline">&lt;tbody&gt;</pre> element which wraps all subsequent rows</li>
        <li class="list-item">The table should contain a <pre class="pre--inline">&lt;caption&gt;</pre> element to summarise the and title the table</li>
        <li class="list-item">The <pre class="pre--inline">&lt;caption&gt;</pre> element should have an id which matches the <pre class="pre--inline">aria-labelledby</pre> attribute on the scrollable container</li>
    </ul>

    <h3 class="push-bottom--half plus-1 medium">For visual validation</h3>
    <ul class="list list--tick push-bottom--double">
        <li class="list-item">At mobile breakpoints the table cells should continue to have a comfortable amount of whitespace and not become too compressed</li>
        <li class="list-item">At mobile breakpoints the table container should have some visual indication that the area is scrollable, such as a scrollbar, shadow or icon</li>
    </ul>

    <h2 class="push-bottom--half plus-1 medium">References</h2>
    <ul class="list push-bottom--double">
        <li class="list-item"><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table" rel="noopener nofollow">https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table</a></li>
        <li class="list-item"><a href="https://www.w3.org/WAI/tutorials/tables/" rel="noopener nofollow">https://www.w3.org/WAI/tutorials/tables/</a></li>
        <li class="list-item"><a href="https://www.w3.org/WAI/standards-guidelines/act/rules/0ssw9k/" rel="noopener nofollow">https://www.w3.org/WAI/standards-guidelines/act/rules/0ssw9k/</a></li>
        <li class="list-item"><a href="https://design-system.w3.org/styles/tables.html#responsive-tables" rel="noopener nofollow">https://design-system.w3.org/styles/tables.html#responsive-tables</a></li>
    </ul>
</PatternLayout>;

export default Tables;