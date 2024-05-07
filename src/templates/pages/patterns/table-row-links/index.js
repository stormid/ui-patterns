import { h } from 'preact';
import PatternLayout from '@layouts/pattern';
import CodeRowLinks from '../../example/tables/row-links/code';
import { render } from 'preact-render-to-string';
import PatternTitle from '@components/pattern-title';
import { STATUS } from '@constants';

export const title = 'Table patterns';

export const status = STATUS.DEVELOPMENT;

const Tables = () => <PatternLayout>
    <PatternTitle status={status}>Table with linked rows</PatternTitle>
    <p class="push-bottom--double"></p>
    
    <h2 class="push-bottom--half plus-2 medium">Guidance</h2>
    <p class="push-bottom">Tables are a useful pattern for summarising a list of data, and sometimes it is necessary for each entry to link onwards to further details.</p>
    <p class="push-bottom--double">This pattern shows a way to mark up the table when the design requires the whole table row to be linked, rather than a single cell.</p>

    <h2 class="push-bottom--half plus-2 medium">Example with linked rows</h2>
    <iframe style="--height: 375px" class="example" title="Example table with row links" src={'/example/tables/row-links'}></iframe>
    <p class="push-bottom align-right"><a href="/example/tables/row-links" rel="noopener" target="_blank">Open in a new tab</a></p>
    <pre class="pre"><code class="code">{`${render(<CodeRowLinks />, null, { pretty: true })}`}</code></pre>


    <h2 class="push-bottom plus-2 medium">Acceptance criteria</h2>
    <p class="push-bottom--double">The following is a list of example acceptance criteria to test against when using this pattern.  These critera should test that the specific markup requirements are met, and that the search behaves visually and functionally as expected.</p>

    <h3 class="push-bottom--half plus-1 medium">For validation in developer tools / web inspector</h3>
    <ul class="list list--tick push-bottom--double">
        <li class="list-item">The table should contain a <pre class="pre--inline">thead</pre> element which wraps a row containing all <pre class="pre--inline">th</pre> tags</li>
        <li class="list-item">Each <pre class="pre--inline">&lt;th&gt;</pre> tag should have an appropriate scope attribute</li>
        <li class="list-item">The table should contain a <pre class="pre--inline">&lt;tbody&gt;</pre> element which wraps all subsequent rows</li>
        <li class="list-item">The table should contain a <pre class="pre--inline">&lt;caption&gt;</pre> element to summarise the table data</li>
        <li class="list-item">Each table row should contain only one <pre class="pre--inline">&lt;a&gt;</pre> tag</li>
        <li class="list-item">The <pre class="pre--inline">&lt;a&gt;</pre> tag should be within the last cell and should be accessibly labelled</li>
    </ul>

    <h3 class="push-bottom--half plus-1 medium">For visual validation</h3>
    <ul class="list list--tick push-bottom--double">
        <li class="list-item">Visually, the link should appear across the whole table row, with an appropriate hover effect to show that the row is clickable</li>
        <li class="list-item">A visual focus indicator should appear around the whole table row when the link is activated via the keyboard</li>
    </ul>

    <h3 class="push-bottom--half plus-1 medium">For functional validation</h3>
    <ul class="list list--tick push-bottom--double">
        <li class="list-item">The link should be reachable and possible to activate via keyboard</li>
        <li class="list-item">The link should be read by a screenreader without duplication of content</li>
    </ul>

    <h2 class="push-bottom--half plus-1 medium">References</h2>
    <ul class="list push-bottom--double">
        <li class="list-item"><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table" rel="noopener nofollow">https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table</a></li>
        <li class="list-item"><a href="https://www.w3.org/WAI/tutorials/tables/" rel="noopener nofollow">https://www.w3.org/WAI/tutorials/tables/</a></li>
    </ul>
</PatternLayout>;

export default Tables;