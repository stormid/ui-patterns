import { h } from 'preact';
import PatternLayout from '@layouts/pattern';

export const title = 'Off canvas';


const OffCanvas = () => <PatternLayout>
    <h1 class="push-bottom--half plus-2 medium">Off canvas</h1>
    <p class="push-bottom">Show and hide navigation with a button.</p>
    <h2 class="push-bottom--half plus-1 medium">Example</h2>
    <iframe style="--height: 375px" class="example" title="Example off-canvas navigation" src={'/example/off-canvas'}></iframe>
    <p class="push-bottom align-right"><a href="/example/off-canvas" target="_blank">Open in a new tab</a></p>
    <h2 class="push-bottom--half plus-1 medium">Code</h2>
    <pre class="pre"><code class="code">
{`<nav aria-label="Primary navigation">
    <button class="off-canvas__btn js-off-canvas__toggle" aria-label="Show or hide navigation menu">
        <svg focusable="false" class="off-canvas__btn-icon" aria-hidden="true" fill="#fff" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
        </svg>
        menu
    </button>
    <ul id="off-canvas" class="off-canvas__list js-off-canvas" data-toggle="js-off-canvas__toggle">
        <li class="off-canvas__item">
            <a class="off-canvas__link" href="#">Item 1</a>
        </li>
        <li class="off-canvas__item">
            <a class="off-canvas__link is--active" href="#" aria-current="true">Item 2</a>
        </li>
        <li class="off-canvas__item">
            <a class="off-canvas__link" href="#">Item 3</a>
        </li>
        <li class="off-canvas__item">
            <a class="off-canvas__link" href="#">Item 4</a>
        </li>
        <li class="off-canvas__item">
            <a class="off-canvas__link" href="#">Item 5</a>
        </li>
    </ul>
</nav>`}</code></pre>
    <pre class="pre"><code class="code">{`import toggle from '@stormid/toggle';

toggle('.js-off-canvas', { focus: false, closeOnBlur: true });`}</code></pre>
    <h2 class="push-bottom--half plus-1 medium">Acceptance criteria</h2>
    <ul class="list list--tick push-bottom">
        <li class="list-item">Use a button tag for the navigation triggers</li>
        <li class="list-item">Navigation should be nav element should be appropriately labelled</li>
        <li class="list-item">Buttons should be within the nav element</li>
        <li class="list-item">Buttons should be focusable</li>
        <li class="list-item">Button focus style should be visible</li>
        <li class="list-item">Buttons should be appropriately labelled</li>
        <li class="list-item">Buttons should be keyboard operable</li>
        <li class="list-item">Navigation should be hidden visually and from accessibility tree when closed</li>
        <li class="list-item">Navigation should be visible and in  the accessibility tree when open</li>
        <li class="list-item">Navigation should be tabable</li>
        <li class="list-item">Either the first item in the navigation should be the next in the focus order after the button, or the first item should programmatically receive focus when navigation is opened</li>
        <li class="list-item">Should not trap tab - a user should be able to tab out of the navigation</li>
        <li class="list-item">Focus outside navigation should hide navigation</li>
        <li class="list-item">ARIA expanded attribute should correctly describe shown/hidden state</li>
        <li class="list-item">ARIA controls attribute should correctly associate button with nav element</li>
        <li class="list-item">Navigation links should be appropriately labelled</li>
        <li class="list-item">Active navigation link should have ARIA current attribute</li>
        {/* <li class="list-item">The navigation should be usable without JavaScript</li> */}
    </ul>
    <h2 class="push-bottom--half plus-1 medium">References</h2>
    <ul class="list push-bottom">
        <li class="list-item"><a href="https://www.w3.org/WAI/tutorials/menus" rel="noopener nofollow">https://www.w3.org/WAI/tutorials/menus</a></li>
        <li class="list-item"><a href="https://webaim.org/standards/wcag/checklist" rel="noopener nofollow">https://webaim.org/standards/wcag/checklist</a></li>
        <li class="list-item"><a href="https://inclusive-components.design/menus-menu-buttons/" rel="noopener nofollow">https://inclusive-components.design/menus-menu-buttons/</a></li>
        <li class="list-item"><a href="https://www.a11ymatters.com/pattern/mobile-nav/" rel="noopener nofollow">https://www.a11ymatters.com/pattern/mobile-nav/</a></li>
    </ul>
</PatternLayout>;

export default OffCanvas;