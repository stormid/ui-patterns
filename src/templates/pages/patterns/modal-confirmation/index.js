import { h } from 'preact';
import PatternLayout from '@layouts/pattern';
import Code from '../../example/modal-confirmation/code';
import { render } from 'preact-render-to-string';

export const title = 'Modal confirmation';

const ModalConfirmation = () => <PatternLayout>
    <h1 class="push-bottom--half plus-2 medium">Modal confirmation</h1>
    {/* <p class="push-bottom--double"></p> */}
    <h2 class="push-bottom--half plus-1 medium">Guidance</h2>
    <p class="push-bottom--double">Use this pattern to add friction to severe actions to help prevent user errors.</p>
    <h2 class="push-bottom--half plus-1 medium">Example</h2>
    <iframe style="--height: 375px" class="example" title="Example modal-confirmation" src={'/example/modal-confirmation'}></iframe>
    <p class="push-bottom align-right"><a href="/example/modal-confirmation" target="_blank">Open in a new tab</a></p>
    <h2 class="push-bottom--half plus-1 medium">Code</h2>
    <pre class="pre"><code class="code">{`${render(<Code />, null, { pretty: true })}`}</code></pre>
    <pre class="pre"><code class="code">{`import modal from '@stormid/modal';

modal('.js-modal-confirmation);
`}</code></pre>   
    <h2 class="push-bottom--half plus-1 medium">Acceptance criteria</h2>
    <ul class="list list--tick push-bottom--double">
        <li class="list-item">Use a button element for the modal trigger</li>
        <li class="list-item">Trigger button should be focusable</li>
        <li class="list-item">Trigger button focus style should be visible</li>
        <li class="list-item">Trigger button should be appropriately labelled</li>
        <li class="list-item">Trigger button should be keyboard operable</li>
        <li class="list-item">Buttons should be no less than 44px x 44px</li>
        <li class="list-item">Modal should have a role of dialog that contains all elements of the modal</li>
        <li class="list-item">Modal should be hidden visually and from accessibility tree when closed</li>
        <li class="list-item">Modal should be visible and in accessibility tree when open</li>
        <li class="list-item">Modal should be labelled with either an aria-label or an aria-labelledby that points to a visible title</li>
        <li class="list-item">An element within modal should be given focus when open</li>
        <li class="list-item">Modal should either have an aria-modal attribute or the background (rest of the page) must get an aria-hidden attribute when the modal is open</li>
        <li class="list-item">Modal must trap tab when open</li>
        <li class="list-item">Tab sequence in the modal should include a visible button that closes the dialog</li>
        <li class="list-item">Search input should be appropriately labelled</li>
        <li class="list-item">Escape button should close the modal</li>
        <li class="list-item">Focus must return to the trigger button when closed</li>
    </ul>
    <h2 class="push-bottom--half plus-1 medium">References</h2>
    <ul class="list push-bottom--double">
        <li class="list-item"><a href="https://www.smashingmagazine.com/2018/01/friction-ux-design-tool/" rel="noopener nofollow">https://www.smashingmagazine.com/2018/01/friction-ux-design-tool/</a></li>
        <li class="list-item"><a href="https://www.w3.org/TR/wai-aria-practices-1.1/#dialog_modal" rel="noopener nofollow">https://www.w3.org/TR/wai-aria-practices-1.1/#dialog_modal</a></li>
        <li class="list-item"><a href="https://w3c.github.io/aria-practices/examples/dialog-modal/dialog.html" rel="noopener nofollow">https://w3c.github.io/aria-practices/examples/dialog-modal/dialog.html</a></li>
        <li class="list-item"><a href="https://webaim.org/standards/wcag/checklist" rel="noopener nofollow">https://webaim.org/standards/wcag/checklist</a></li>
    </ul>
</PatternLayout>;

export default ModalConfirmation;