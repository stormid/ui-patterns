import { h } from 'preact';
import PatternLayout from '@layouts/pattern';
import Code from '../../example/tabs/code';
import { render } from 'preact-render-to-string';
import PatternTitle from '@components/pattern-title';
import DependencyTable from '@components/dependency-table';
import { STATUS } from '@constants';

export const title = 'Date picker';

export const status = STATUS.DEVELOPMENT;

const DatePicker = () => <PatternLayout>
    <PatternTitle status={status}>Date picker</PatternTitle>
    <p class="push-bottom--double"></p>
    <h2 class="push-bottom--half plus-2 medium">Guidance</h2>
    <p class="push-bottom--double"></p>
    
    <h2 class="push-bottom--half plus-2 medium">Example</h2>
    <iframe style="--height: 375px" class="example" title="Example tabs" src={'/example/date-picker'}></iframe>
    <p class="push-bottom align-right"><a href="/example/date-picker" rel="noopener" target="_blank">Open in a new tab</a></p>
    
    <h2 class="push-bottom--half plus-2 medium">Dependencies and installation</h2>
    <DependencyTable dependencies={[{ package: '', installation: '' }]} />
    
    <h2 class="push-bottom--half plus-2 medium">Code</h2>
    <pre class="pre"><code class="code">{`${render(<Code />, null, { pretty: true })}`}</code></pre>
    <pre class="pre"><code class="code">{`
    
`}</code></pre>
    
    <h2 class="push-bottom plus-2 medium">Acceptance criteria</h2>
    <p class="push-bottom--double">The following is a list of example acceptance criteria to test against when using this pattern. These critera should test that the specific markup requirements are met, and that the date picker behave visually and functionally as expected.</p>

    <h3 class="push-bottom--half plus-1 medium">For validation in developer tools / web inspector</h3>
    <ul class="list list--tick push-bottom--double">
        <li class="list-item"></li>
    </ul>

    <h3 class="push-bottom--half plus-1 medium">For visual validation</h3>
    <ul class="list list--tick push-bottom--double">
        </ul>

    <h3 class="push-bottom--half plus-1 medium">For functional validation</h3>
    <ul class="list list--tick push-bottom--double">
        </ul>

    <h2 class="push-bottom--half plus-2 medium">References</h2>
    <ul class="list push-bottom--double">
        <li class="list-item"><a href="https://webaim.org/standards/wcag/checklist" rel="noopener nofollow">https://webaim.org/standards/wcag/checklist</a></li>
        <li class="list-item"><a href="https://designsystem.gov.scot/components/date-picker/" rel="noopener nofollow">https://designsystem.gov.scot/components/date-picker/</a></li>
    </ul>
</PatternLayout>;

export default DatePicker;