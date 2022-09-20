import { h } from 'preact';
import PatternLayout from '@layouts/pattern';
import Code from '../../example/full-screen-navigation/code';
import PatternTitle from '@components/pattern-title';
import DependencyTable from '@components/dependency-table';
import { render } from 'preact-render-to-string';
import { STATUS } from '@constants';

export const title = 'Full screen navigation';

const FullScreenNavigation = () => <PatternLayout>
    <PatternTitle status={STATUS.DEVELOPMENT}>Full screen navigation</PatternTitle>
    <p class="push-bottom--double">Show and hide full screen navigation.</p>
    
    <h2 class="push-bottom--half plus-1 medium">Guidance</h2>
    <p class="push-bottom">Use this pattern for navigation that take over the whole screen and prevent interaction with the rest of the page until it is closed.</p>
    <p class="push-bottom--double">This pattern differs from a modal dialog because it is CSS-based and does not require being marked up as a dialog. This is useful if you want the same nav mark up used as both inline navigation (visible on large screens) and off-canvas or modal-like navigation on small screens.</p>
    
    <h2 class="push-bottom--half plus-1 medium">Example</h2>
    <iframe style="--height: 375px" class="example" title="Example Full screen navigation" src={'/example/full-screen-navigation'}></iframe>
    <p class="push-bottom align-right"><a href="/example/full-screen-navigation" target="_blank">Open in a new tab</a></p>
    
    <h2 class="push-bottom--half plus-1 medium">Dependencies and installation</h2>
    <DependencyTable dependencies={[{ package: '@stormid/toggle', installation: 'npm i -S @stormid/toggle' }]} />

    <h2 class="push-bottom--half plus-1 medium">Code</h2>
    <pre class="pre"><code class="code">{`${render(<Code />, null, { pretty: true })}`}</code></pre>
    <pre class="pre"><code class="code">{`import toggle from '@stormid/toggle';

toggle('.js-full-screen-navigation');
`}</code></pre>
    <h2 class="push-bottom--half plus-1 medium">Acceptance criteria</h2>
    <ul class="list list--tick push-bottom--double">
        <li class="list-item">Use a button element for the trigger</li>
        <li class="list-item">Trigger button should be focusable</li>
        <li class="list-item">Trigger button focus style should be visible</li>
        <li class="list-item">Trigger button should be appropriately labelled</li>
        <li class="list-item">Trigger button should be keyboard operable</li>
        <li class="list-item">Buttons should be no less than 44px x 44px</li>
        <li class="list-item">Active navigation link should have ARIA current attribute</li>
        <li class="list-item">Nav must not use a modal dialog</li>
        <li class="list-item">When the nav is open it should not trap tab</li>
        <li class="list-item">When the nav is open, the background (rest of the elements on the page) must be untabbable using (<code>display: none !important;visibility: hidden !important;</code>)</li>
        <li class="list-item">When the nav is open, the background (rest of the elements on the page) must be hidden visually and from accessibility tree</li>
        <li class="list-item">Tab sequence in the nav should include a visible button that closes the dialog</li>
        <li class="list-item">Close button should be appropriately labelled</li>
        <li class="list-item">Close button should receive focus in a logical order, it is OK for it to be positioned top right (for example) but be last in the source order as long as focus order does not appear to be 'jumping around randomly'</li>
    </ul>
    <h2 class="push-bottom--half plus-1 medium">References</h2>
    <ul class="list push-bottom--double">
        <li class="list-item"><a href="https://webaim.org/standards/wcag/checklist" rel="noopener nofollow">https://webaim.org/standards/wcag/checklist</a></li>
        <li class="list-item"><a href="https://github.com/stormid/components/issues/204#issuecomment-1096521237" rel="noopener nofollow">https://github.com/stormid/components/issues/204#issuecomment-1096521237</a></li>
        <li class="list-item"><a href="https://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-focus-order.html" rel="noopener nofollow">https://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-focus-order.html</a></li>
    </ul>
</PatternLayout>;

export default FullScreenNavigation;