import { h } from 'preact';
import PatternLayout from '@layouts/pattern';
import Code from '../../example/exclusive-toggles/code';
import { render } from 'preact-render-to-string';
import PatternTitle from '@components/pattern-title';
import DependencyTable from '@components/dependency-table';
import { STATUS } from '@constants';

export const title = 'Exclusive toggles';

const ExclusiveToggles = () => <PatternLayout>
    <PatternTitle status={STATUS.DEVELOPMENT}>Exclusive toggles</PatternTitle>
    <p class="push-bottom--double">Mutually exclusive toggled sections.</p>
    
    <h2 class="push-bottom--half plus-1 medium">Guidance</h2>
    <p class="push-bottom--double">Use this pattern for dealing with multiple togglable sections that can only display one at a time. This pattern is commonly used for Expandable navigation and expandable search that can only be displayed independent of each other. Note that if either (or both) expandable sections are modal, this pattern is not necessary since when a modal dialog is open it should not be possible to interact with the rest of the page.</p>

    <h2 class="push-bottom--half plus-1 medium">Example</h2>
    <iframe style="--height: 375px" class="example" title="Example exclusive buttons" src={'/example/exclusive-toggles'}></iframe>
    <p class="push-bottom align-right"><a href="/example/exclusive-toggles" rel="noopener" target="_blank">Open in a new tab</a></p>
    
    <h2 class="push-bottom--half plus-1 medium">Dependencies and installation</h2>
    <DependencyTable dependencies={[{ package: '@stormid/toggle', installation: 'npm i -S @stormid/toggle' }]} />

    <h2 class="push-bottom--half plus-1 medium">Code</h2>
    <pre class="pre"><code class="code">{`${render(<Code />, null, { pretty: true })}`}</code></pre>
    <pre class="pre"><code class="code">{`import toggle from '@stormid/toggle';

const navNode = document.querySelector('.js-exclusive-nav');
const searchNode = document.querySelector('.js-exclusive-search');

const [ navToggleInstance ] = toggle(navNode);
const [ searchToggleInstance ] = toggle(searchNode);

navNode.addEventListener('toggle.open', e => {
    if (searchToggleInstance.getState().isOpen) searchToggleInstance.startToggle();
});
searchNode.addEventListener('toggle.open', e => {
    if (navToggleInstance.getState().isOpen) navToggleInstance.startToggle();
});`}</code></pre>
    <h2 class="push-bottom--half plus-1 medium">Acceptance criteria</h2>
    <ul class="list list--tick push-bottom--double">
        <li class="list-item">Acceptance criteria for each constituent toggle pattern should be met, in this example <a href="./expandable-navigation">expandable navigation</a> and <a href="./expandable-search">expandable search</a>.</li>
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