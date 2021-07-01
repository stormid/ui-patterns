import { h } from 'preact';
import PatternLayout from '@layouts/pattern';
import Code from '../../example/tabs/code';
import { render } from 'preact-render-to-string';

export const title = 'Tabs';

const Tabs = () => <PatternLayout>
    <h1 class="push-bottom--half plus-2 medium">Tabs</h1>
    <p class="push-bottom--double"></p>
    <h2 class="push-bottom--half plus-1 medium">Guidance</h2>
    <p class="push-bottom--double"></p>
    <h2 class="push-bottom--half plus-1 medium">Example</h2>
    <iframe style="--height: 375px" class="example" title="Example expandable section" src={'/example/tabs'}></iframe>
    <p class="push-bottom align-right"><a href="/example/tabs" target="_blank">Open in a new tab</a></p>
    <h2 class="push-bottom--half plus-1 medium">Code</h2>
    <pre class="pre"><code class="code">{`${render(<Code />, null, { pretty: true })}`}</code></pre>
    <pre class="pre"><code class="code">{``}</code></pre>   
    <h2 class="push-bottom--half plus-1 medium">Acceptance criteria</h2>
    <ul class="list list--tick push-bottom--double">
        {/* <li class="list-item">Use a button element for the expandable section trigger</li> */}
    </ul>
    <h2 class="push-bottom--half plus-1 medium">References</h2>
    <ul class="list push-bottom--double">
    <li class="list-item"><a href="https://www.w3.org/TR/wai-aria-practices/examples/tabs/tabs-2/tabs.html" rel="noopener nofollow">https://www.w3.org/TR/wai-aria-practices/examples/tabs/tabs-2/tabs.html</a></li>
       <li class="list-item"><a href="https://webaim.org/standards/wcag/checklist" rel="noopener nofollow">https://webaim.org/standards/wcag/checklist</a></li>
    </ul>
</PatternLayout>;

export default Tabs;