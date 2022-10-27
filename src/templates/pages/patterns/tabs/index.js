import { h } from 'preact';
import PatternLayout from '@layouts/pattern';
import Code from '../../example/tabs/code';
import { render } from 'preact-render-to-string';
import PatternTitle from '@components/pattern-title';
import DependencyTable from '@components/dependency-table';
import { STATUS } from '@constants';

export const title = 'Tabs';

export const status = STATUS.RELEASE;

const Tabs = () => <PatternLayout>
    <PatternTitle status={status}>Tabs</PatternTitle>
    <p class="push-bottom--double">Automatically activated tabs display their panel when they receive focus.</p>
    <h2 class="push-bottom--half plus-2 medium">Guidance</h2>
    <p class="push-bottom--double">Automatic activation should be used when the tabpanel content is immediately available and present in the DOM. Manual activation (requiring a click or enter/space keydown event) should be used if the content is not immediately present, for example if it requires a network request to retrieve it. Automatic activation can be enabled by setting <pre class="pre--inline">activation: true</pre> when initialising the tabs.</p>
    
    <h2 class="push-bottom--half plus-2 medium">Example</h2>
    <iframe style="--height: 375px" class="example" title="Example tabs" src={'/example/tabs'}></iframe>
    <p class="push-bottom align-right"><a href="/example/tabs" rel="noopener" target="_blank">Open in a new tab</a></p>
    
    <h2 class="push-bottom--half plus-2 medium">Dependencies and installation</h2>
    <DependencyTable dependencies={[{ package: '@stormid/tabs', installation: 'npm i -S @stormid/tabs' }]} />
    
    <h2 class="push-bottom--half plus-2 medium">Code</h2>
    <pre class="pre"><code class="code">{`${render(<Code />, null, { pretty: true })}`}</code></pre>
    <pre class="pre"><code class="code">{`import tabs from '@stormid/tabs';

tabs('.js-tabs');
`}</code></pre>
    
    <h2 class="push-bottom plus-2 medium">Acceptance criteria</h2>
    <p class="push-bottom--double">The following is a list of example acceptance criteria to test against when using this pattern.  These critera should test that the specific markup requirements are met, and that the tabs behave visually and functionally as expected.</p>

    <h3 class="push-bottom--half plus-1 medium">For validation in developer tools / web inspector</h3>
    <ul class="list list--tick push-bottom--double">
        <li class="list-item">The HTML element containing the tabs should have an attribute of <pre class="pre--inline">role="tablist"</pre></li>
        <li class="list-item">The tablist element should immediately contain one or more HTML <pre class="pre--inline">&lt;a&gt;</pre> tags representing the clickable tabs</li>
        <li class="list-item">Each of the <pre class="pre--inline">&lt;a&gt;</pre> tags should have an attribute of <pre class="pre--inline">role="tab"</pre></li>
        <li class="list-item">Each of the <pre class="pre--inline">&lt;a&gt;</pre> tags should have an <pre class="pre--inline">href="#mytabpanelid"</pre> where #mytabpanelid matches the ID of the panel that should activate when the tab is clicked</li>
        <li class="list-item">The page should also contain one or more HTML elements representing the content filled panels to be activated.  These elements should have an attribute of <pre class="pre--inline">role="tabpanel"</pre> and an <pre class="pre--inline">id</pre> attribute which matches one of the clickable tabs, as above</li>

    </ul>

    <h3 class="push-bottom--half plus-1 medium">For visual validation</h3>
    <ul class="list list--tick push-bottom--double">
        <li class="list-item">Each tab should have a clearly visible focus style which meets accessibility contrast requirements</li>
        <li class="list-item">The active tab should have a clearly visible 'active' style to show that it corresponds to the currently visible content</li>
        <li class="list-item">Tab panels that are not currently active should hidden visually, hidden from keyboard access, and not read by screen readers</li>
        <li class="list-item">The active tab panel should be visible, available for keyboard access, and read by screen readers</li>
    </ul>

    <h3 class="push-bottom--half plus-1 medium">For functional validation</h3>
    <ul class="list list--tick push-bottom--double">
        <li class="list-item">When a tab is clicked/activated the corresponding tab panel should become visible, keyboard accessible and be able to be read by screen readers</li>
        <li class="list-item">When a tab is clicked/activated, the address of the page should update to set a hash string ('#') that matches the ID of the active tab</li>
        <li class="list-item">If a user visits an address which contains a hash, if that hash string matches the ID of a tab panel then that panel will open immediately. This is to allow users to share links directly to tabs within the page</li>
        <li class="list-item">When keyboard focus is on a tab, pressing the 'right arrow' key moves to the next tab or loops back to the first tab if focus was on the last</li>
        <li class="list-item">When keyboard focus is on a tab, pressing the 'left arrow' key moves to the previous tab or loops to the last tab if focus was on the first</li>
        <li class="list-item">When keyboard focus changes to a new tab, the corresponding panel activates and the previous panel is hidden</li>
    </ul>

    <h2 class="push-bottom--half plus-2 medium">References</h2>
    <ul class="list push-bottom--double">
        <li class="list-item"><a href="https://www.w3.org/TR/wai-aria-practices-1.1/examples/tabs/tabs-1/tabs.html" rel="noopener nofollow">https://www.w3.org/TR/wai-aria-practices-1.1/examples/tabs/tabs-1/tabs.html</a></li>
        <li class="list-item"><a href="https://www.w3.org/TR/wai-aria-practices-1.1/#kbd_selection_follows_focus" rel="noopener nofollow">https://www.w3.org/TR/wai-aria-practices-1.1/#kbd_selection_follows_focus</a></li>
       <li class="list-item"><a href="https://webaim.org/standards/wcag/checklist" rel="noopener nofollow">https://webaim.org/standards/wcag/checklist</a></li>
    </ul>
</PatternLayout>;

export default Tabs;