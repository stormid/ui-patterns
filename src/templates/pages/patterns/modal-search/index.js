import { h } from 'preact';
import PatternLayout from '@layouts/pattern';
import Code from '../../example/modal-search/code';
import { render } from 'preact-render-to-string';
import PatternTitle from '@components/pattern-title';
import DependencyTable from '@components/dependency-table';
import { STATUS } from '@constants';

export const title = 'Modal search';

export const status = STATUS.RELEASE;

const ModalSearch = () => <PatternLayout>
    <PatternTitle status={status}>Modal search</PatternTitle>
    <p class="push-bottom--double">Show and hide a modal search form.</p>
    
    <h2 class="push-bottom--half plus-2 medium">Guidance</h2>
    <p class="push-bottom--double">Use this pattern for search forms that should capture focus, take over the whole screen and prevent interaction with the rest of the page until they are closed.</p>
    
    <h2 class="push-bottom--half plus-2 medium">Example</h2>
    <iframe style="--height: 375px" class="example" title="Example modal search navigation" src={'/example/modal-search'}></iframe>
    <p class="push-bottom- align-right"><a href="/example/modal-search" rel="noopener" target="_blank">Open in a new tab</a></p>
    
    <h2 class="push-bottom--half plus-2 medium">Dependencies and installation</h2>
    <DependencyTable dependencies={[{ package: '@stormid/modal', installation: 'npm i -S @stormid/modal' }]} />

    <h2 class="push-bottom--half plus-2 medium">Code</h2>
    <pre class="pre"><code class="code">{`${render(<Code />, null, { pretty: true })}`}</code></pre>
    <pre class="pre"><code class="code">{`import modal from '@stormid/modal';

modal('.js-modal-search');
`}</code></pre>
    <h2 class="push-bottom plus-2 medium">Acceptance criteria</h2>
    <p class="push-bottom--double">The following is a list of example acceptance criteria to test against when using this pattern.  These critera should test that the specific markup requirements are met, and that the search behaves visually and functionally as expected.</p>

    <h3 class="push-bottom--half plus-1 medium">For validation in developer tools / web inspector</h3>
    <ul class="list list--tick push-bottom--double">
        <li class="list-item">An HTML <pre class="pre--inline">&lt;button&gt;</pre> element is used to open the search</li>
        <li class="list-item">An HTML <pre class="pre--inline">&lt;button&gt;</pre> element is used to close the search</li>
        <li class="list-item">The search modal should be an HTML element with a <pre class="pre--inline">role="dialog"</pre> attribute. This element must contain everything that's visible within the modal when it opens</li>
        <li class="list-item">The search modal element should either have an <pre class="pre--inline">aria-label</pre> attribute which titles the content, or an <pre class="pre--inline">aria-labelledby</pre> attribute that points to a visible <pre class="pre--inline">&lt;h2&gt;</pre> element with a matching ID</li>
    </ul>

    <h3 class="push-bottom--half plus-1 medium">For visual validation</h3>
    <ul class="list list--tick push-bottom--double">
        <li class="list-item">Search toggle buttons should have a clearly visible focus style which meets accessibility contrast requirements</li>
        <li class="list-item">Search toggle buttons should be appropriately labelled to describe their functionality.  If the design requires no visible text, a label should be added as an <pre class="pre--inline">aria-label</pre> attribute on the <pre class="pre--inline">&lt;button&gt;</pre> tag to meet accessibility requirements</li>
        <li class="list-item">Search toggle buttons should be no less than 44px x 44px in size</li>
        <li class="list-item">The search form should be hidden visually, hidden from keyboard access and not read by screenreaders when the search is closed</li>
        <li class="list-item">The search form should be visible, available for keyboard access and read by screenreaders when the search is opened</li>
        <li class="list-item">Any form inputs within the search form should have a matching form label describing its functionality.  If the design does not use a visible label (for example, it may only ask for a placholder in the input itself) then a label should still be present in the page but hidden with accessible CSS styles.</li>
        <li class="list-item">Any form inputs within the search form should have a clearly visible focus style which meets accessibility contrast requirements</li>
    </ul>

    <h3 class="push-bottom--half plus-1 medium">For functional validation</h3>
    <ul class="list list--tick push-bottom--double">
        <li class="list-item">Search open and close buttons should be available to be tabbed to and activated via keyboard</li>
        <li class="list-item">The first available form input, button or link within the search form should receive visible focus when the search is opened</li>
        <li class="list-item">When the search is open, it should not be possible to access the page content underneith via mouse, keyboard or any other means</li>
        <li class="list-item">When the search is open, the page behind must not be scrollable. The original scroll position must be restored when the search is closed</li>
        <li class="list-item">When the search is open, the user's tab should be 'trapped'.  Tabbing should loop within the search until the search is closed</li>
        <li class="list-item">Pressing the 'escape' key on the keyboard should close the modal</li>
        <li class="list-item">When the search is closed, visible focus should return to the button which opened the search</li>
    </ul>

    <h2 class="push-bottom--half plus-1 medium">References</h2>
    <ul class="list push-bottom--double">
        <li class="list-item"><a href="https://www.w3.org/TR/wai-aria-practices-1.1/#dialog_modal" rel="noopener nofollow">https://www.w3.org/TR/wai-aria-practices-1.1/#dialog_modal</a></li>
        <li class="list-item"><a href="https://w3c.github.io/aria-practices/examples/dialog-modal/dialog.html" rel="noopener nofollow">https://w3c.github.io/aria-practices/examples/dialog-modal/dialog.html</a></li>
        <li class="list-item"><a href="https://webaim.org/standards/wcag/checklist" rel="noopener nofollow">https://webaim.org/standards/wcag/checklist</a></li>
    </ul>
</PatternLayout>;

export default ModalSearch;