import { h } from 'preact';
import PatternLayout from '@layouts/pattern';
import Code from '../../example/exclusive-toggles/code';
import { render } from 'preact-render-to-string';
import PatternTitle from '@components/pattern-title';
import { STATUS } from '@constants';

export const title = 'Exclusive toggles';

const ExclusiveToggles = () => <PatternLayout>
    <PatternTitle status={STATUS.DEVELOPMENT}>Exclusive toggles</PatternTitle>
    <p class="push-bottom--double">Mutually exclusive toggled sections.</p>
    <h2 class="push-bottom--half plus-1 medium">Guidance</h2>
    <p class="push-bottom--double">Use this pattern for dealing with multiple togglable sections that can only display one at a time. This pattern is commonly used for Expandable navigation and off-canvas search that can only be displayed independent of each other. Note that if either (or both) expandable sections are modal, this pattern is not necessary since when a modal dialog is open it should not be possibnle to interact with the rest of the page.</p>
    <h2 class="push-bottom--half plus-1 medium">Example</h2>
    <iframe style="--height: 375px" class="example" title="Example exclusive buttons" src={'/example/exclusive-toggles'}></iframe>
    <p class="push-bottom align-right"><a href="/example/exclusive-toggles" rel="noopener" target="_blank">Open in a new tab</a></p>
    <h2 class="push-bottom--half plus-1 medium">Code</h2>
    <pre class="pre"><code class="code">{`${render(<Code />, null, { pretty: true })}`}</code></pre>
    <pre class="pre"><code class="code">{`import toggle from '@stormid/toggle';
    
toggle('.js-exclusive-nav', { focus: false, closeOnBlur: true });
toggle('.js-exclusive-search', { closeOnBlur: true });`}</code></pre>
    <h2 class="push-bottom--half plus-1 medium">Acceptance criteria</h2>
    <ul class="list list--tick push-bottom--double">
        <li class="list-item">Acceptance criteria for each constituent toggle pattern should be met</li>
        <li class="list-item">Expansion of one section should trigger the collapse lifecycle (and all associated aria, className, and state changes) in all associated toggles</li>
        <li class="list-item">Closing toggles should not interfere with notifications about opening toggle attribute changes</li>
        <li class="list-item">Closing toggles should not interfere with focus behaviour</li>
    </ul>
    <h2 class="push-bottom--half plus-1 medium">References</h2>
    <ul class="list push-bottom--double">
        <li class="list-item"><a href="https://webaim.org/standards/wcag/checklist" rel="noopener nofollow">https://webaim.org/standards/wcag/checklist</a></li>
        <li class="list-item"><a href="https://inclusive-components.design/menus-menu-buttons/" rel="noopener nofollow">https://inclusive-components.design/menus-menu-buttons/</a></li>
        <li class="list-item"><a href="https://www.a11ymatters.com/pattern/mobile-nav/" rel="noopener nofollow">https://www.a11ymatters.com/pattern/mobile-nav/</a></li>
    </ul>
</PatternLayout>;

export default ExclusiveToggles;