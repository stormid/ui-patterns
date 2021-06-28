import { h } from 'preact';
import PatternLayout from '@layouts/pattern';
import Code from '../../example/exclusive-toggles/code';
import { render } from 'preact-render-to-string';

export const title = 'Exclusive toggles';

const ExclusiveToggles = () => <PatternLayout>
    <h1 class="push-bottom--half plus-2 medium">Exclusive toggles</h1>
    <p class="push-bottom--double"></p>
    <h2 class="push-bottom--half plus-1 medium">Guidance</h2>
    <p class="push-bottom--double"></p>
    <h2 class="push-bottom--half plus-1 medium">Example</h2>
    <iframe style="--height: 375px" class="example" title="Example exclusive buttons" src={'/example/exclusive-toggles'}></iframe>
    <p class="push-bottom align-right"><a href="/example/exclusive-toggles" target="_blank">Open in a new tab</a></p>
    <h2 class="push-bottom--half plus-1 medium">Code</h2>
    <pre class="pre"><code class="code">{`${render(<Code />, null, { pretty: true })}`}</code></pre>
    <pre class="pre"><code class="code">{``}</code></pre>
    <h2 class="push-bottom--half plus-1 medium">Acceptance criteria</h2>
    <ul class="list list--tick push-bottom--double">
        <li class="list-item"></li>
        {/* <li class="list-item">The navigation should be usable without JavaScript</li> */}
    </ul>
    <h2 class="push-bottom--half plus-1 medium">References</h2>
    <ul class="list push-bottom--double">
        <li class="list-item"><a href="https://webaim.org/standards/wcag/checklist" rel="noopener nofollow">https://webaim.org/standards/wcag/checklist</a></li>
        <li class="list-item"><a href="https://inclusive-components.design/menus-menu-buttons/" rel="noopener nofollow">https://inclusive-components.design/menus-menu-buttons/</a></li>
        <li class="list-item"><a href="https://www.a11ymatters.com/pattern/mobile-nav/" rel="noopener nofollow">https://www.a11ymatters.com/pattern/mobile-nav/</a></li>
    </ul>
</PatternLayout>;

export default ExclusiveToggles;