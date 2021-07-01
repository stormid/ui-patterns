import { h } from 'preact';
import PatternLayout from '@layouts/pattern';
import Code from '../../example/cookie-banner/code';
import { render } from 'preact-render-to-string';

export const title = 'Cookie banner';

const CookieBanner = () => <PatternLayout>
    <h1 class="push-bottom--half plus-2 medium">Cookie banner</h1>
    <p class="push-bottom--double"></p>
    <h2 class="push-bottom--half plus-1 medium">Guidance</h2>
    <p class="push-bottom--double"></p>
    <h2 class="push-bottom--half plus-1 medium">Example</h2>
    <iframe style="--height: 375px" class="example" title="Example expandable section" src={'/example/cookie-banner'}></iframe>
    <p class="push-bottom align-right"><a href="/example/cookie-banner" target="_blank">Open in a new tab</a></p>
    <h2 class="push-bottom--half plus-1 medium">Code</h2>
    <pre class="pre"><code class="code">{`${render(<Code />, null, { pretty: true })}`}</code></pre>
    <pre class="pre"><code class="code">{``}</code></pre>   
    <h2 class="push-bottom--half plus-1 medium">Acceptance criteria</h2>
    <ul class="list list--tick push-bottom--double">
        {/* <li class="list-item">Use a button element for the expandable section trigger</li> */}
    </ul>
    <h2 class="push-bottom--half plus-1 medium">References</h2>
    <ul class="list push-bottom--double">
       <li class="list-item"><a href="https://webaim.org/standards/wcag/checklist" rel="noopener nofollow">https://webaim.org/standards/wcag/checklist</a></li>
    </ul>
</PatternLayout>;

export default CookieBanner;