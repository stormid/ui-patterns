import { h } from 'preact';
import PatternLayout from '@layouts/pattern';
import Code from '../../example/tabs/code';
import { render } from 'preact-render-to-string';
import PatternTitle from '@components/pattern-title';
import { STATUS } from '@constants';

export const title = 'Tabs';

const Tabs = () => <PatternLayout>
    <PatternTitle status={STATUS.DEVELOPMENT}>Tabs</PatternTitle>
    <p class="push-bottom--double">Automatically activated tabs display their panel when they receive focus.</p>
    <h2 class="push-bottom--half plus-1 medium">Guidance</h2>
    <p class="push-bottom--double">Automatic activation should be used when the tabpanel content is immediately available and present in the DOM. Manual activation (requiring a click or enter/space keydown event) should be used if the content is not immediately present, for example if it requires a network request to retrieve it.</p>
    <h2 class="push-bottom--half plus-1 medium">Example</h2>
    <iframe style="--height: 375px" class="example" title="Example expandable section" src={'/example/tabs'}></iframe>
    <p class="push-bottom align-right"><a href="/example/tabs" rel="noopener" target="_blank">Open in a new tab</a></p>
    <h2 class="push-bottom--half plus-1 medium">Code</h2>
    <pre class="pre"><code class="code">{`${render(<Code />, null, { pretty: true })}`}</code></pre>
    <pre class="pre"><code class="code">{`import modal from '@stormid/tabs';

tabs('.js-tabs');
`}</code></pre>   
    <h2 class="push-bottom--half plus-1 medium">Acceptance criteria</h2>
    <ul class="list list--tick push-bottom--double">
        <li class="list-item">The element containing the tabs should have a role of 'tablist'</li>
        <li class="list-item">The tab elements should have a role of 'tab' and be direct children of the tablist</li>
        <li class="list-item">The panels should have a role of 'tabpanel'</li>
        <li class="list-item">Tabs should be anchor linking to the id of the target panel</li>
        <li class="list-item">The URL should update with the hash from the tab anchor</li>
        <li class="list-item">Tabs should be addressable - an inbound link with hash of a tab should open the correct tab</li>
        <li class="list-item">Inactive tabs should be present in the accessibility tree but not tabbable or focusable</li>
        <li class="list-item">The active tab element should be tabbale and focusable</li>
        <li class="list-item">Closed tabpanels should be hidden from the axe tree</li>
        <li class="list-item">Closed tabpanels should not be tabbable</li>
        <li class="list-item">When focus is on a tab, right arrow moves to the next tab or to the first tab if focus on the last</li>
        <li class="list-item">When focus is on a tab, left arrow moves to the previous tab or to the last tab if focus on the first</li>
        <li class="list-item">When focus changes to a new tab the corresponding panel should open and previos panel close</li>
    </ul>
    <h2 class="push-bottom--half plus-1 medium">References</h2>
    <ul class="list push-bottom--double">
    <li class="list-item"><a href="https://www.w3.org/TR/wai-aria-practices-1.1/examples/tabs/tabs-1/tabs.html" rel="noopener nofollow">https://www.w3.org/TR/wai-aria-practices-1.1/examples/tabs/tabs-1/tabs.html</a></li>
    <li class="list-item"><a href="https://www.w3.org/TR/wai-aria-practices-1.1/#kbd_selection_follows_focus" rel="noopener nofollow">https://www.w3.org/TR/wai-aria-practices-1.1/#kbd_selection_follows_focus</a></li>
       <li class="list-item"><a href="https://webaim.org/standards/wcag/checklist" rel="noopener nofollow">https://webaim.org/standards/wcag/checklist</a></li>
    </ul>
</PatternLayout>;

export default Tabs;