import { h } from 'preact';
import PatternLayout from '@layouts/pattern';
import Code from '../../example/full-screen-navigation/code';
import PatternTitle from '@components/pattern-title';
import DependencyTable from '@components/dependency-table';
import { render } from 'preact-render-to-string';
import { STATUS } from '@constants';

export const title = 'Full screen navigation';

export const status = STATUS.RELEASE;

const FullScreenNavigation = () => <PatternLayout>
    <PatternTitle status={status}>Full screen navigation</PatternTitle>
    <p class="push-bottom--double">Show and hide full screen navigation.</p>
    
    <h2 class="push-bottom--half plus-2 medium">Guidance</h2>
    <p class="push-bottom">Use this pattern for navigation that take over the whole screen and prevent interaction with the rest of the page until it is closed.</p>
    <p class="push-bottom">This pattern differs from a modal dialog because it is CSS-based and does not require being marked up as a dialog. This is useful if you want the same nav mark up used as both inline navigation (visible on large screens) and off-canvas or modal-like navigation on small screens.</p>
    <p class="push-bottom--double">When the full screen menu is open, it shouldn't be possible for the user to access the content underneith via mouse, keyboard or other means.  At the time of writing, the most cross-device compaitble way to achive this was by setting all other elements to <code>display: none !important;visibility: hidden !important;</code> in CSS using the toggle classes provided on the body tag</p>
    
    <h2 class="push-bottom--half plus-2 medium">Example</h2>
    <iframe style="--height: 375px" class="example" title="Example Full screen navigation" src={'/example/full-screen-navigation'}></iframe>
    <p class="push-bottom align-right"><a href="/example/full-screen-navigation" target="_blank">Open in a new tab</a></p>
    
    <h2 class="push-bottom--half plus-1 medium">Dependencies and installation</h2>
    <DependencyTable dependencies={[{ package: '@stormid/toggle', installation: 'npm i -S @stormid/toggle' }]} />

    <h2 class="push-bottom--half plus-1 medium">Code</h2>
    <pre class="pre"><code class="code">{`${render(<Code />, null, { pretty: true })}`}</code></pre>
    <pre class="pre"><code class="code">{`import toggle from '@stormid/toggle';

toggle('.js-full-screen-navigation');
`}</code></pre>
    <h2 class="push-bottom--half plus-2 medium">Acceptance criteria</h2>
    <p class="push-bottom--double">The following is a list of example acceptance criteria to test against when using this pattern.  These critera should test that the specific markup requirements are met, and that the navigation behaves visually and functionally as expected.</p>

    <h3 class="push-bottom--half plus-1 medium">For validation in developer tools / web inspector</h3>
    <ul class="list list--tick push-bottom--double">
        <li class="list-item">An HTML <pre class="pre--inline">&lt;button&gt;</pre> element is used to open the navigation</li>
        <li class="list-item">An HTML <pre class="pre--inline">&lt;button&gt;</pre> element is used to close the navigation</li>
        <li class="list-item">The open and close <pre class="pre--inline">&lt;button&gt;</pre> elements should have an <pre class="pre--inline">aria-controls</pre> attribute.  The value of this should match the ID of the element being shown/hidden.</li>
        <li class="list-item">The navigation should be contained within an HTML <pre class="pre--inline">&lt;nav&gt;</pre> element</li> 
        <li class="list-item">Buttons should be contained within the <pre class="pre--inline">&lt;nav&gt;</pre> element</li>
        <li class="list-item">The <pre class="pre--inline">&lt;nav&gt;</pre> element should <em>not</em> have a <pre class="pre--inline">role=dialog</pre> attribute</li>
        <li class="list-item">The navigation should be labelled appropriately to describe its function (e.g. 'Primary Navigation').  This can be done by an HTML heading element being the first item in the navigation, or an <pre class="pre--inline">aria-label</pre> on the <pre class="pre--inline">&lt;nav&gt;</pre> element itself</li>
        <li class="list-item">The currently active navigation link should have <pre class="pre--inline">aria-current</pre> attribute with its value set to 'page'</li>
    </ul>

    <h3 class="push-bottom--half plus-1 medium">For visual validation</h3>
    <ul class="list list--tick push-bottom--double">
        <li class="list-item">Navigation open and close buttons should have a clearly visible focus style which meets accessibility contrast requirements</li>
        <li class="list-item">Navigation open and close buttons should be appropriately labelled to describe their functionality.  If the design requires no visible text, a label should be added as an <pre class="pre--inline">aria-label</pre> attribute on the <pre class="pre--inline">&lt;button&gt;</pre> tag to meet accessibility requirements</li>
        <li class="list-item">Navigation toggle buttons should be no less than 44px x 44px in size</li>
        <li class="list-item">Navigation links should be hidden visually, hidden from keyboard access and not read by screenreaders when the menu is closed</li>
        <li class="list-item">Navigation links should be visible, available for keyboard access and read by screenreaders when the menu is opened</li>
        <li class="list-item">Navigation link text should accurately describe the link destination to meet accessibility requirements</li>
    </ul>

    <h3 class="push-bottom--half plus-1 medium">For functional validation</h3>
    <ul class="list list--tick push-bottom--double">
        <li class="list-item">Navigation open and close buttons should be available to be tabbed to and activated via keyboard</li>
        <li class="list-item">The navigation close button should receive keyboard focus in a logical order. The design may require it to be positioned top right (for example) but the <pre class="pre--inline">&lt;button&gt;</pre> can be the last HTML element in the navigation, so long as tabbing behaves consistently</li>
        <li class="list-item">Navigation links should be available to be tabbed to and activated via keyboard</li>
        <li class="list-item">The first navigation link should receive visible focus when navigation is opened</li>
        <li class="list-item">When the navigation is open, it should not be possible to access the page content underneith via mouse, keyboard or any other means</li>
    </ul>
    <h2 class="push-bottom--half plus-1 medium">References</h2>
    <ul class="list push-bottom--double">
        <li class="list-item"><a href="https://webaim.org/standards/wcag/checklist" rel="noopener nofollow">https://webaim.org/standards/wcag/checklist</a></li>
        <li class="list-item"><a href="https://github.com/stormid/components/issues/204#issuecomment-1096521237" rel="noopener nofollow">https://github.com/stormid/components/issues/204#issuecomment-1096521237</a></li>
        <li class="list-item"><a href="https://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-focus-order.html" rel="noopener nofollow">https://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-focus-order.html</a></li>
    </ul>
</PatternLayout>;

export default FullScreenNavigation;