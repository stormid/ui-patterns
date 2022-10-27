import { h } from 'preact';
import PatternLayout from '@layouts/pattern';
import Code from '../../example/exclusive-toggles/code';
import { render } from 'preact-render-to-string';
import PatternTitle from '@components/pattern-title';
import DependencyTable from '@components/dependency-table';
import { STATUS } from '@constants';

export const title = 'Exclusive toggles';

export const status = STATUS.RELEASE;

const ExclusiveToggles = () => <PatternLayout>
    <PatternTitle status={status}>Exclusive toggles</PatternTitle>
    <p class="push-bottom--double">Mutually exclusive toggled sections.</p>
    
    <h2 class="push-bottom--half plus-2 medium">Guidance</h2>
    <p class="push-bottom--double">Use this pattern for dealing with multiple togglable sections that can only display one at a time. This pattern is commonly used for Expandable navigation and expandable search that can only be displayed independent of each other. Note that if either (or both) expandable sections are modal, this pattern is not necessary since when a modal dialog is open it should not be possible to interact with the rest of the page.</p>

    <h2 class="push-bottom--half plus-2 medium">Example</h2>
    <iframe style="--height: 375px" class="example" title="Example exclusive buttons" src={'/example/exclusive-toggles'}></iframe>
    <p class="push-bottom align-right"><a href="/example/exclusive-toggles" rel="noopener" target="_blank">Open in a new tab</a></p>
    
    <h2 class="push-bottom--half plus-2 medium">Dependencies and installation</h2>
    <DependencyTable dependencies={[{ package: '@stormid/toggle', installation: 'npm i -S @stormid/toggle' }]} />

    <h2 class="push-bottom--half plus-2 medium">Code</h2>
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
    <h2 class="push-bottom plus-2 medium">Acceptance criteria</h2>
    <p class="push-bottom--double">The following is a list of example acceptance criteria to test against when using this pattern.  These critera should test that the specific markup requirements are met, and that the toggles behave visually and functionally as expected.</p>
    <h3 class="push-bottom--half plus-1 medium">For functional validation</h3>
    <ul class="list list--tick push-bottom--double">
        <li class="list-item">Other acceptance criteria for the toggled elements may also apply. In this example <a href="./expandable-navigation">expandable navigation</a> and <a href="./expandable-search">expandable search</a> are applicable.</li>
        <li class="list-item">Opening one of the toggles should trigger the collapse of the other.  All acceptance critera around the closing of those sections (aria-attributes, classes, etc) will then apply</li>
        <li class="list-item">Closing toggles should not interfere with screenreader notifications about the opening toggle.  A notification about the opening of a toggle should always take precedence.</li>
        <li class="list-item">Closing toggles should not interfere with visual or keyboard focus.  Focus should move to the newly opened toggle, and its opening acceptance criteria should be met.</li>
    </ul>
    <h2 class="push-bottom--half plus-2 medium">References</h2>
    <ul class="list push-bottom--double">
        <li class="list-item"><a href="https://webaim.org/standards/wcag/checklist" rel="noopener nofollow">https://webaim.org/standards/wcag/checklist</a></li>
        <li class="list-item"><a href="https://inclusive-components.design/menus-menu-buttons/" rel="noopener nofollow">https://inclusive-components.design/menus-menu-buttons/</a></li>
        <li class="list-item"><a href="https://www.a11ymatters.com/pattern/mobile-nav/" rel="noopener nofollow">https://www.a11ymatters.com/pattern/mobile-nav/</a></li>
    </ul>
</PatternLayout>;

export default ExclusiveToggles;