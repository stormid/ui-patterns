import { h } from 'preact';
import PatternLayout from '@layouts/pattern';
import Code from '../../example/full-screen-navigation/code';
import { render } from 'preact-render-to-string';

export const title = 'Full screen navigation';

const FullScreenNavigation = () => <PatternLayout>
    <h1 class="push-bottom--half plus-2 medium">Full screen navigation</h1>
    <p class="push-bottom--double">Show and hide full screen navigation.</p>
    <h2 class="push-bottom--half plus-1 medium">Guidance</h2>
    <p class="push-bottom">Use this pattern for navigation that take over the whole screen and prevent interaction with the rest of the page until it is closed.</p>
    <p class="push-bottom--double"><b>This pattern cannot be used for full screen navigation at one screen size and inline navigation at another</b>. </p>
    <h2 class="push-bottom--half plus-1 medium">Example</h2>
    <iframe style="--height: 375px" class="example" title="Example Full screen navigation" src={'/example/full-screen-navigation'}></iframe>
    <p class="push-bottom- align-right"><a href="/example/full-screen-navigation" target="_blank">Open in a new tab</a></p>
    <h2 class="push-bottom--half plus-1 medium">Code</h2>
    <pre class="pre"><code class="code">{`${render(<Code />, null, { pretty: true })}`}</code></pre>
    <pre class="pre"><code class="code">{`import modal from '@stormid/modal';

modal('.js-full-screen-navigation');
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
        <li class="list-item">An element within the modal should be given focus when open</li>
        <li class="list-item">When the modal is open the background (rest of the elements on the page) must get an aria-hidden attribute</li>
        <li class="list-item">Modal must trap tab when open</li>
        <li class="list-item">Tab sequence in the modal should include a visible button that closes the dialog</li>
        <li class="list-item">Search input should be appropriately labelled</li>
        <li class="list-item">Escape button should close the modal</li>
        <li class="list-item">Focus must return to the trigger button when closed</li>
        <li class="list-item">Full screen navigation must not be non-modal at a different screen size.</li>
    </ul>
    <h2 class="push-bottom--half plus-1 medium">References</h2>
    <ul class="list push-bottom--double">
        <li class="list-item"><a href="https://www.w3.org/TR/wai-aria-practices-1.1/#dialog_modal" rel="noopener nofollow">https://www.w3.org/TR/wai-aria-practices-1.1/#dialog_modal</a></li>
        <li class="list-item"><a href="https://w3c.github.io/aria-practices/examples/dialog-modal/dialog.html" rel="noopener nofollow">https://w3c.github.io/aria-practices/examples/dialog-modal/dialog.html</a></li>
        <li class="list-item"><a href="https://webaim.org/standards/wcag/checklist" rel="noopener nofollow">https://webaim.org/standards/wcag/checklist</a></li>
    </ul>
</PatternLayout>;

export default FullScreenNavigation;