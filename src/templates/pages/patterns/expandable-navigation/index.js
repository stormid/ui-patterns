import { h } from 'preact';
import PatternLayout from '@layouts/pattern';
import Code from '../../example/expandable-navigation/code';
import { render } from 'preact-render-to-string';
import PatternTitle from '@components/pattern-title';
import DependencyTable from '@components/dependency-table';
import { STATUS } from '@constants';

export const title = 'Expandable navigation';

export const status = STATUS.RELEASE;

const ExpandableNavigation = () => <PatternLayout>
    <PatternTitle status={status}>Expandable navigation</PatternTitle>
    <p class="push-bottom--double">Show and hide navigation with a button.</p>
    
    <h2 class="push-bottom--half plus-2 medium">Guidance</h2>
    <p class="push-bottom--double">Use this pattern for hamburger-type navigation that expands and collapses in the document flow. The expandable navigation pattern remains open when the focus moves out of the navigation and allows interaction with the rest of the page while it is open.</p>

    <h2 class="push-bottom--half plus-2 medium">Example</h2>
    <iframe style="--height: 375px" class="example" title="Example Expandable navigation" src={'/example/expandable-navigation'}></iframe>
    <p class="push-bottom align-right"><a href="/example/expandable-navigation" rel="noopener" target="_blank">Open in a new tab</a></p>

    <h2 class="push-bottom--half plus-2 medium">Dependencies and installation</h2>
    <DependencyTable dependencies={[{ package: '@stormid/toggle', installation: 'npm i -S @stormid/toggle' }]} />
    
    <h2 class="push-bottom--half plus-1 medium">Code</h2>
    <pre class="pre"><code class="code">{`${render(<Code />, null, { pretty: true })}`}</code></pre>
    <pre class="pre"><code class="code">{`import toggle from '@stormid/toggle';

const toggleInstances = toggle('.js-expandable-nav', { focus: false });

//to change the aria-label when navigation is toggled
const SHOW_LABEL_ATTRIBUTE = 'data-show-label';
const HIDE_LABEL_ATTRIBUTE = 'data-hide-label';
const toggleAriaLabel = e => {
    const { toggles } = e.detail.getState();
    toggles.forEach(btn => {
        if (!btn.hasAttribute(SHOW_LABEL_ATTRIBUTE) && !!btn.hasAttribute(SHOW_LABEL_ATTRIBUTE)) return;
        btn.setAttribute('aria-label', (btn.getAttribute('aria-expanded') === 'true') ? btn.getAttribute(HIDE_LABEL_ATTRIBUTE) : btn.getAttribute(SHOW_LABEL_ATTRIBUTE));
    });
};
toggleInstances.forEach(instance => {
    instance.getState().node.addEventListener('toggle.open', toggleAriaLabel);
    instance.getState().node.addEventListener('toggle.close', toggleAriaLabel);
});`}</code></pre>
    <h2 class="push-bottom plus-2 medium">Acceptance criteria</h2>
    <p class="push-bottom--double">The following is a list of example acceptance criteria to test against when using this pattern.  These critera should test that the specific markup requirements are met, and that the navigation behaves visually and functionally as expected.</p>

    <h3 class="push-bottom--half plus-1 medium">For validation in developer tools / web inspector</h3>
    <ul class="list list--tick push-bottom--double">
        <li class="list-item">An HTML <pre class="pre--inline">&lt;button&gt;</pre> element is used to open/close the navigation</li>
        <li class="list-item">The navigation should be contained within an HTML <pre class="pre--inline">&lt;nav&gt;</pre> element</li>
        <li class="list-item">The navigation should be labelled appropriately to describe its function (e.g. 'Primary Navigation').  This can be done by an HTML heading element being the first item in the navigation, or an <pre class="pre--inline">aria-label</pre> on the <pre class="pre--inline">&lt;nav&gt;</pre> element itself</li>
        <li class="list-item">Buttons should be contained within the <pre class="pre--inline">&lt;nav&gt;</pre> element</li>
        <li class="list-item">An <pre class="pre--inline">aria-expanded</pre> attribute should be present on the toggle <pre class="pre--inline">&lt;button&gt;</pre>.  The value of this should be 'true' when the navigation is visible, and 'false' when the navigation is hidden.</li>
        <li class="list-item">The toggle <pre class="pre--inline">&lt;button&gt;</pre> element should have an <pre class="pre--inline">aria-controls</pre> attribute. The value of this should match the ID of the element being shown/hidden.</li>
        <li class="list-item">The currently active navigation link should have <pre class="pre--inline">aria-current</pre> attribute with its value set to 'page'</li>
        <li class="list-item">Navigation toggle button labels that describe the state of the navigationshould update when toggled, e.g. 'Open' should change to 'Close'.</li>
    </ul>

    <h3 class="push-bottom--half plus-1 medium">For visual validation</h3>
    <ul class="list list--tick push-bottom--double">
        <li class="list-item">Navigation toggle buttons should have a clearly visible focus style which meets accessibility contrast requirements</li>
        <li class="list-item">Navigation toggle buttons should be appropriately labelled to describe their functionality. If the design requires no visible text, a label should be added as an <pre class="pre--inline">aria-label</pre> attribute on the <pre class="pre--inline">&lt;button&gt;</pre> element</li>
        <li class="list-item">Navigation toggle buttons should be no less than 44px x 44px in size</li>
        <li class="list-item">Navigation links should be hidden visually, hidden from keyboard access, and not read by screenreaders when the menu is closed</li>
        <li class="list-item">Navigation links should be visible, available for keyboard access, and read by screenreaders when the menu is opened</li>
        <li class="list-item">Navigation links should push down - not overlay - any page content when opened</li>
        <li class="list-item">Moving page focus to outside of the navigation via mouse, keyboard or any other means should leave the navigation open</li>
        <li class="list-item">Navigation link text should accurately describe the link destination</li>
    </ul>

    <h3 class="push-bottom--half plus-1 medium">For functional validation</h3>
    <ul class="list list--tick push-bottom--double">
        <li class="list-item">Navigation toggle buttons should be available to be tabbed to and activated via keyboard</li>
        <li class="list-item">Navigation links should be available to be tabbed to and activated via keyboard</li>
        <li class="list-item">The close button should receive visible focus when navigation is opened</li>
        <li class="list-item">When open, the navigation should not trap tab - a user should be able to tab out of the menu to page content below</li>
    </ul>
    <h2 class="push-bottom--half plus-1 medium">References</h2>
    <ul class="list push-bottom--double">
        <li class="list-item"><a href="https://www.w3.org/WAI/tutorials/menus" rel="noopener nofollow">https://www.w3.org/WAI/tutorials/menus</a></li>
        <li class="list-item"><a href="https://webaim.org/standards/wcag/checklist" rel="noopener nofollow">https://webaim.org/standards/wcag/checklist</a></li>
        <li class="list-item"><a href="https://inclusive-components.design/menus-menu-buttons/" rel="noopener nofollow">https://inclusive-components.design/menus-menu-buttons/</a></li>
        <li class="list-item"><a href="https://www.a11ymatters.com/pattern/mobile-nav/" rel="noopener nofollow">https://www.a11ymatters.com/pattern/mobile-nav/</a></li>
    </ul>
</PatternLayout>;

export default ExpandableNavigation;