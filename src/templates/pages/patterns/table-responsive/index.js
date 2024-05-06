import { h } from 'preact';
import PatternLayout from '@layouts/pattern';
import CodeResponsive from '../../example/tables/responsive/code';
import { render } from 'preact-render-to-string';
import PatternTitle from '@components/pattern-title';
import { STATUS } from '@constants';

export const title = 'Table patterns';

export const status = STATUS.DEVELOPMENT;

const Tables = () => <PatternLayout>
    <PatternTitle status={status}>Table with responsive layout</PatternTitle>
    <p class="push-bottom--double"></p>
    
    <h2 class="push-bottom--half plus-2 medium">Guidance</h2>
    <p class="push-bottom"></p>
    <p class="push-bottom--double"></p>

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