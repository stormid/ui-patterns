import { h } from 'preact';
import PatternLayout from '@layouts/pattern';
import Code from '../../example/modal-confirmation/code';
import { render } from 'preact-render-to-string';
import PatternTitle from '@components/pattern-title';
import DependencyTable from '@components/dependency-table';
import { STATUS } from '@constants';

export const title = 'Modal confirmation';

export const status = STATUS.RELEASE;

const ModalConfirmation = () => <PatternLayout>
    <PatternTitle status={status}>Modal confirmation</PatternTitle>
    <p class="push-bottom--double">Ask for confirmation from the user before executing an action.</p>
    
    <h2 class="push-bottom--half plus-2 medium">Guidance</h2>
    <p class="push-bottom--double">Use this pattern to add friction to severe actions to help prevent user errors.</p>
    
    <h2 class="push-bottom--half plus-2 medium">Example</h2>
    <iframe style="--height: 375px" class="example" title="Example modal confirmation" src={'/example/modal-confirmation'}></iframe>
    <p class="push-bottom align-right"><a href="/example/modal-confirmation" rel="noopener" target="_blank">Open in a new tab</a></p>

    <h2 class="push-bottom--half plus-2 medium">Dependencies and installation</h2>
    <DependencyTable dependencies={[{ package: '@stormid/modal', installation: 'npm i -S @stormid/modal' }]} />

    <h2 class="push-bottom--half plus-2 medium">Code</h2>
    <pre class="pre"><code class="code">{`${render(<Code />, null, { pretty: true })}`}</code></pre>
    <pre class="pre"><code class="code">{`import modal from '@stormid/modal';

modal('.js-modal-confirmation);
`}</code></pre>
    <h2 class="push-bottom--half plus-2 medium">Acceptance criteria</h2>
    <p class="push-bottom--double">The following is a list of example acceptance criteria to test against when using this pattern.  These critera should test that the specific markup requirements are met, and that the confirmation behaves visually and functionally as expected.</p>

    <h3 class="push-bottom--half plus-1 medium">For validation in developer tools / web inspector</h3>
    <ul class="list list--tick push-bottom--double">
        <li class="list-item">An HTML <pre class="pre--inline">&lt;button&gt;</pre> element is used to open the confirmation modal</li>
        <li class="list-item">An HTML <pre class="pre--inline">&lt;button&gt;</pre> element is used to close the confirmation modal</li>
        <li class="list-item">The confirmation modal should be an HTML element with a <pre class="pre--inline">role="alertdialog"</pre> attribute. This element must contain everything that's visible within the modal when it opens</li>
        <li class="list-item">The confirmation modal element should either have an <pre class="pre--inline">aria-describedby</pre> attribute which describes the content, or an <pre class="pre--inline">aria-labelledby</pre> attribute that points to a visible <pre class="pre--inline">&lt;h2&gt;</pre> element with a matching ID</li>
        <li class="list-item">The confirmation modal element should have an <pre class="pre--inline">aria-describedby</pre> attribute that points to a visible element with a matching ID that describes the modal content</li>
        <li class="list-item">The element containing the modal should have a role="region" attribute (or be another valid landmark element), so that the modal can be contained within a valid page landmark when moved into position</li>
    </ul>

    <h3 class="push-bottom--half plus-1 medium">For visual validation</h3>
    <ul class="list list--tick push-bottom--double">
        <li class="list-item">Confirmation buttons should have a clearly visible focus style which meets accessibility contrast requirements</li>
        <li class="list-item">Confirmation buttons should be appropriately labelled to describe their functionality.  If the design requires no visible text, a label should be added as an <pre class="pre--inline">aria-label</pre> attribute on the <pre class="pre--inline">&lt;button&gt;</pre> tag to meet accessibility requirements</li>
        <li class="list-item">Confirmation buttons should be no less than 44px x 44px in size (unless any of the allowed <a href="https://www.w3.org/TR/WCAG22/#target-size-enhanced">WCAG exceptions apply</a>)</li>
        <li class="list-item">The confirmation modal should be hidden visually, hidden from keyboard access and not read by screenreaders when closed</li>
        <li class="list-item">The confirmation modal should be visible, available for keyboard access and read by screenreaders when opened</li>
    </ul>

    <h3 class="push-bottom--half plus-1 medium">For functional validation</h3>
    <ul class="list list--tick push-bottom--double">
        <li class="list-item">The confirmation button should be available to be tabbed to and activated via keyboard</li>
        <li class="list-item">The first available form input, button or link within the modal should receive visible focus when opened</li>
        <li class="list-item">When the confirmation modal is open, it should not be possible to access the page content underneith via mouse, keyboard or any other means</li>
        <li class="list-item">When the confirmation modal is open, the page behind must not be scrollable. The original scroll position must be restored when the modal is closed</li>
        <li class="list-item">When the confirmation modal is open, the user's tab should be 'trapped'.  Tabbing should loop within the modal until the modal is closed</li>
        <li class="list-item">Pressing the 'escape' key on the keyboard should close the modal</li>
        <li class="list-item">When the modal is closed, visible focus should return to the button which opened the modal</li>
    </ul>

    <h2 class="push-bottom--half plus-2 medium">References</h2>
    <ul class="list push-bottom--double">
        <li class="list-item"><a href="https://www.smashingmagazine.com/2018/01/friction-ux-design-tool/" rel="noopener nofollow">https://www.smashingmagazine.com/2018/01/friction-ux-design-tool/</a></li>
        <li class="list-item"><a href="https://www.w3.org/TR/wai-aria-practices-1.1/#alertdialog" rel="noopener nofollow">https://www.w3.org/TR/wai-aria-practices-1.1/#alertdialog</a></li>
        <li class="list-item"><a href="https://www.w3.org/TR/wai-aria-practices-1.1/examples/dialog-modal/alertdialog.html" rel="noopener nofollow">https://www.w3.org/TR/wai-aria-practices-1.1/examples/dialog-modal/alertdialog.html</a></li>
        <li class="list-item"><a href="https://webaim.org/standards/wcag/checklist" rel="noopener nofollow">https://webaim.org/standards/wcag/checklist</a></li>
    </ul>
</PatternLayout>;

export default ModalConfirmation;