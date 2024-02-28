import { h } from 'preact';
import PatternLayout from '@layouts/pattern';
import Code from '../../example/expandable-section/code';
import { render } from 'preact-render-to-string';
import PatternTitle from '@components/pattern-title';
import DependencyTable from '@components/dependency-table';
import { STATUS } from '@constants';

export const title = 'Expandable section';

export const status = STATUS.RELEASE;

const ExpandableSection = () => <PatternLayout>
    <PatternTitle status={status}>Expandable section</PatternTitle>
    <p class="push-bottom--double">Show and hide a section of content</p>
    
    <h2 class="push-bottom--half plus-2 medium">Guidance</h2>
    <p class="push-bottom--double">Use this pattern for toggles and accordions that expand and collapse content into in the document flow. This is an alterantive to the <a rel="noopener nofollow" href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details" target="_blank">HTML details element</a> which has some accessibility issues and constraints (see references below).</p>
    
    <h2 class="push-bottom--half plus-2 medium">Example</h2>
    <iframe style="--height: 375px" class="example" title="Example expandable section" src={'/example/expandable-section'}></iframe>
    <p class="push-bottom align-right"><a href="/example/expandable-section" rel="noopener" target="_blank">Open in a new tab</a></p>

    <h2 class="push-bottom--half plus-2 medium">Dependencies and installation</h2>
    <DependencyTable dependencies={[{ package: '@stormid/toggle', installation: 'npm i -S @stormid/toggle' }]} />

    
    <h2 class="push-bottom--half plus-2 medium">Code</h2>
    <pre class="pre"><code class="code">{`${render(<Code />, null, { pretty: true })}`}</code></pre>
    <pre class="pre"><code class="code">{`import toggle from '@stormid/toggle';

toggle('.js-expandable-section, { focus: false, local: true });
`}</code></pre>
    <h2 class="push-bottom plus-2 medium">Acceptance criteria</h2>
    <p class="push-bottom--double">The following is a list of example acceptance criteria to test against when using this pattern.  These critera should test that the specific markup requirements are met, and that the expanding section behaves visually and functionally as expected.</p>

    <h3 class="push-bottom--half plus-1 medium">For validation in developer tools / web inspector</h3>
    <ul class="list list--tick push-bottom--double">
        <li class="list-item">An HTML <pre class="pre--inline">&lt;button&gt;</pre> element is used to expand/collapse the section</li>
        <li class="list-item">An <pre class="pre--inline">aria-expanded</pre> attribute should be present on the toggle <pre class="pre--inline">&lt;button&gt;</pre>.  The value of this should be 'true' when the section is expanded, and false when the section is collapsed.</li>
        <li class="list-item">The toggle <pre class="pre--inline">&lt;button&gt;</pre> element should have an <pre class="pre--inline">aria-controls</pre> attribute.  The value of this should match the ID of the section being expanded/collapsed.</li>
    </ul>

    <h3 class="push-bottom--half plus-1 medium">For visual validation</h3>
    <ul class="list list--tick push-bottom--double">
        <li class="list-item">Section toggle buttons should have a clearly visible focus style which meets accessibility contrast requirements</li>
        <li class="list-item">Section toggle buttons should be no less than 44px x 44px in size (unless any of the allowed <a href="https://www.w3.org/TR/WCAG22/#target-size-enhanced">WCAG exceptions apply</a>)</li>
        <li class="list-item">Section toggle buttons should be appropriately labelled to describe their functionality. If the design requires no visible text, a label should be added as an <pre class="pre--inline">aria-label</pre> attribute on the <pre class="pre--inline">&lt;button&gt;</pre> element</li>
        <li class="list-item">The collapsed section should be hidden visually, hidden from keyboard access, and not read by screen readers</li>
        <li class="list-item">The expanded section should be visible, available for keyboard access, and read by screen readers</li>
    </ul>

    <h3 class="push-bottom--half plus-1 medium">For functional validation</h3>
    <ul class="list list--tick push-bottom--double">
        <li class="list-item">Section toggle buttons should be available to be tabbed to and activated via keyboard</li>
    </ul>

    <h2 class="push-bottom--half plus-2 medium">References</h2>
    <ul class="list push-bottom--double">
        <li class="list-item"><a href="https://www.w3.org/TR/wai-aria-practices-1.1/#disclosure" rel="noopener nofollow">https://www.w3.org/TR/wai-aria-practices-1.1/#disclosure</a></li>
        <li class="list-item"><a href="https://www.w3.org/TR/wai-aria-practices-1.1/examples/disclosure/disclosure-faq.html" rel="noopener nofollow">https://www.w3.org/TR/wai-aria-practices-1.1/examples/disclosure/disclosure-faq.html</a></li>
        <li class="list-item"><a href="https://inclusive-components.design/collapsible-sections/" rel="noopener nofollow">https://inclusive-components.design/collapsible-sections/</a></li>
        <li class="list-item"><a href="https://webaim.org/standards/wcag/checklist" rel="noopener nofollow">https://webaim.org/standards/wcag/checklist</a></li>
        <li class="list-item"><a href="https://adrianroselli.com/2019/04/details-summary-are-not-insert-control-here.html" rel="noopener nofollow">https://adrianroselli.com/2019/04/details-summary-are-not-insert-control-here.html</a></li>
        <li class="list-item"><a href="https://www.scottohara.me//blog/2022/09/12/details-summary.html" rel="noopener nofollow">https://www.scottohara.me//blog/2022/09/12/details-summary.html</a></li>
    </ul>
</PatternLayout>;

export default ExpandableSection;