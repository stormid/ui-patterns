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
    <p class="push-bottom">Tabular data can be difficult to display at smaller breakpoints.  The reduced width of mobile screens does not allow space for table rows to stretch out and data can end up looking very compressed, or cutting off on the right of the screen.</p>
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
        <li class="list-item"></li>
    </ul>

    <h3 class="push-bottom--half plus-1 medium">For visual validation</h3>
    <ul class="list list--tick push-bottom--double">
        <li class="list-item"></li>
    </ul>

    <h3 class="push-bottom--half plus-1 medium">For functional validation</h3>
    <ul class="list list--tick push-bottom--double">
        <li class="list-item"></li>
    </ul>

    <h2 class="push-bottom--half plus-1 medium">References</h2>
    <ul class="list push-bottom--double">
        <li class="list-item"></li>
    </ul>
</PatternLayout>;

export default Tables;