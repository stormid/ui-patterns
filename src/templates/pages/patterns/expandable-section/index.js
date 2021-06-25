import { h } from 'preact';
import PatternLayout from '@layouts/pattern';
import Code from '../../example/expandable-section/code';
import { render } from 'preact-render-to-string';

export const title = 'Expandable section';

const ExpandableSection = () => <PatternLayout>
    <h1 class="push-bottom--half plus-2 medium">Expandable section</h1>
    <p class="push-bottom--double">Show and hide a section of content</p>
    <h2 class="push-bottom--half plus-1 medium">Guidance</h2>
    <p class="push-bottom--double">Use this pattern for toggles and accordions that expand and collapse content into in the document flow.</p>
    <h2 class="push-bottom--half plus-1 medium">Example</h2>
    <iframe style="--height: 375px" class="example" title="Example expandable section" src={'/example/expandable-section'}></iframe>
    <p class="push-bottom align-right"><a href="/example/expandable-section" target="_blank">Open in a new tab</a></p>
    <h2 class="push-bottom--half plus-1 medium">Code</h2>
    <pre class="pre"><code class="code">{`${render(<Code />, null, { pretty: true })}`}</code></pre>
    <pre class="pre"><code class="code">{`import toggle from '@stormid/toggle';

toggle('.js-expandable-section, { focus: false, local: true });
`}</code></pre>   
    <h2 class="push-bottom--half plus-1 medium">Acceptance criteria</h2>
    <ul class="list list--tick push-bottom--double">
        <li class="list-item">Use a button element for the expandable section trigger</li>
        <li class="list-item">The button trigger has an aria-expanded attribute that is false when collapsed, and true when expanded</li>
        <li class="list-item">The button trigger has an aria-controls attribute that matches the id of the section that it expands and collapses</li>
        <li class="list-item">The button trigger supports enter and space keyboard interactions to expand and collapse the section</li>
        <li class="list-item">The button trigger is focusable</li>
        <li class="list-item">The button trigger has a focus style</li>
        <li class="list-item">Buttons should be no less than 44px x 44px</li>
        <li class="list-item">The button trigger is properly labelled with text content such as the title of the section, or an aria-label, or aria-labelledby attribute</li>
        <li class="list-item">The collapsed section is hidden visually and from the accessibility tree</li>
        <li class="list-item">The expanded section is visible and in the accessibility tree</li>
    </ul>
    <h2 class="push-bottom--half plus-1 medium">References</h2>
    <ul class="list push-bottom--double">
        <li class="list-item"><a href="https://www.w3.org/TR/wai-aria-practices-1.1/#disclosure" rel="noopener nofollow">https://www.w3.org/TR/wai-aria-practices-1.1/#disclosure</a></li>
        <li class="list-item"><a href="https://www.w3.org/TR/wai-aria-practices-1.1/examples/disclosure/disclosure-faq.html" rel="noopener nofollow">https://www.w3.org/TR/wai-aria-practices-1.1/examples/disclosure/disclosure-faq.html</a></li>
        <li class="list-item"><a href="https://inclusive-components.design/collapsible-sections/" rel="noopener nofollow">https://inclusive-components.design/collapsible-sections/</a></li>
    </ul>
</PatternLayout>;

export default ExpandableSection;