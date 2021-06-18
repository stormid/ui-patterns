import { h } from 'preact';
import PatternLayout from '@layouts/pattern';

export const title = 'Modal search';

const OffCanvas = () => <PatternLayout>
    <h1 class="push-bottom--half plus-2 medium">Modal search</h1>
    <p class="push-bottom">Show and hide a modal search form.</p>
    <h2 class="push-bottom--half plus-1 medium">Example</h2>
    <iframe style="--height: 375px" class="example" title="Example modal search navigation" src={'/example/modal-search'}></iframe>
    <p class="push-bottom align-right"><a href="/example/modal-search" target="_blank">Open in a new tab</a></p>
    <h2 class="push-bottom--half plus-1 medium">Code</h2>
    <pre class="pre"><code class="code">{``}</code></pre>
    <h2 class="push-bottom--half plus-1 medium">Acceptance criteria</h2>
    <ul class="list list--tick push-bottom">
        <li class="list-item">Use a button tag for the navigation triggers</li>
        {/* <li class="list-item">The navigation should be usable without JavaScript</li> */}
    </ul>
    <h2 class="push-bottom--half plus-1 medium">References</h2>
    {/* <ul class="list push-bottom">
        <li class="list-item"><a href="https://www.w3.org/WAI/tutorials/menus" rel="noopener nofollow">https://www.w3.org/WAI/tutorials/menus</a></li>
    </ul> */}
</PatternLayout>;

export default OffCanvas;