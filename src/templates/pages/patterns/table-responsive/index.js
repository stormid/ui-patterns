import { h } from 'preact';
import PatternLayout from '@layouts/pattern';
import CodeResponsive from '../../example/tables/responsive/code';
import { render } from 'preact-render-to-string';
import PatternTitle from '@components/pattern-title';
import { STATUS } from '@constants';

export const title = 'Table patterns';

export const status = STATUS.DEVELOPMENT;

const Tables = () => <PatternLayout>
    <PatternTitle status={status}>Table with responsive card layout</PatternTitle>
    <p class="push-bottom--double">An example of how to convert table rows to data cards for smaller devices</p>
    
    <h2 class="push-bottom--half plus-2 medium">Guidance</h2>
    <p class="push-bottom">Tabular data can be difficult to display at smaller breakpoints.  The reduced width of mobile screens does not allow space for table rows to stretch out and data can end up looking very compressed, or cutting off to the right of the screen.</p>
    <p class="push-bottom">One option to handle this is to convert the table rows to data cards for smaller devices.  When the correct breakpoint is hit, each table row is displayed as a card instead with the matching table headers being placed appropriately using the CSS 'content' property.</p>
    <p class="push-bottom">This pattern is good for displaying data without the user having to scroll horizontally - something that isn't naturally instinctive for a user to do.  It also allows for more of the data entry to be visible on screen at one time, as the vertical space is almost always much larger on a handheld device.</p>
    <p class="push-bottom--double">This pattern only works in a use case where the user does not need to scan a table and make direct visual comparison between the rows. If this is a requirement, you should consider the alterntative <a href="/patterns/table-overflow">overflow table</a> pattern.</p>

    <h2 class="push-bottom--half plus-2 medium">Example responsive table</h2>
    <iframe style="--height: 375px" class="example" title="Example responsive table" src={'/example/tables/responsive'}></iframe>
    <p class="push-bottom align-right"><a href="/example/tables/responsive" rel="noopener" target="_blank">Open in a new tab</a></p>
    <pre class="pre"><code class="code">{`${render(<CodeResponsive />, null, { pretty: true })}`}</code></pre>

    <h2 class="push-bottom plus-2 medium">Acceptance criteria</h2>
    <p class="push-bottom--double">The following is a list of example acceptance criteria to test against when using this pattern.  These critera should test that the specific markup requirements are met, and that the search behaves visually and functionally as expected.</p>

    <h3 class="push-bottom--half plus-1 medium">For validation in developer tools / web inspector</h3>
    <ul class="list list--tick push-bottom--double">
        <li class="list-item">The table should contain a <pre class="pre--inline">&lt;thead&gt;</pre> element which wraps a row containing all <pre class="pre--inline">&lt;th&gt;</pre> tags</li>
        <li class="list-item">Each <pre class="pre--inline">th</pre> tag should have an appropriate scope attribute</li>
        <li class="list-item">The table should contain a <pre class="pre--inline">&lt;tbody&gt;</pre> element which wraps all subsequent rows</li>
        <li class="list-item">The table should contain a <pre class="pre--inline">&lt;caption&gt;</pre> element to summarise the table data</li>
    </ul>

    <h3 class="push-bottom--half plus-1 medium">For visual validation</h3>
    <ul class="list list--tick push-bottom--double">
        <li class="list-item">At mobile breakpoints, the table rows and cells should convert to vertically stacked cards</li>
        <li class="list-item">Appropriate headings should be visible above each data element</li>
    </ul>

    <h3 class="push-bottom--half plus-1 medium">For functional validation</h3>
    <ul class="list list--tick push-bottom--double">
        <li class="list-item">When using a screenreader, the table should not be surfaced differently between breakpoints.  The markup should still be available to all table based navigation methods and keyboard shortcuts</li>
    </ul>

    <h2 class="push-bottom--half plus-1 medium">References</h2>
    <ul class="list push-bottom--double">
        <li class="list-item"><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table" rel="noopener nofollow">https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table</a></li>
        <li class="list-item"><a href="https://www.w3.org/WAI/tutorials/tables/" rel="noopener nofollow">https://www.w3.org/WAI/tutorials/tables/</a></li>
        <li class="list-item"><a href="https://adrianroselli.com/2022/07/its-mid-2022-and-browsers-mostly-safari-still-break-accessibility-via-display-properties.html" rel="noopener nofollow">https://adrianroselli.com/2022/07/its-mid-2022-and-browsers-mostly-safari-still-break-accessibility-via-display-properties.html</a></li>
    </ul>
</PatternLayout>;

export default Tables;