import { h } from 'preact';
import PatternLayout from '@layouts/pattern';
import Code from '../../example/expandable-search/code';
import { render } from 'preact-render-to-string';
import PatternTitle from '@components/pattern-title';
import DependencyTable from '@components/dependency-table';
import { STATUS } from '@constants';

export const title = 'Expandable search';

export const status = STATUS.RELEASE;

const ExpandableSearch = () => <PatternLayout>
    <PatternTitle status={status}>Expandable search</PatternTitle>
    <p class="push-bottom--double">Show and hide inline search with a button.</p>
    
    <h2 class="push-bottom--half plus-2 medium">Guidance</h2>
    <p class="push-bottom--double">Use this pattern for a search form that expands and collapses in the document flow. In contrast modal search captures focus, takes over the whole screen and prevents interaction with the rest of the page. The expandable pattern does not trap tab in the same way.</p>
    <h2 class="push-bottom--half plus-2 medium">Example</h2>
    <iframe style="--height: 375px" class="example" title="Example expandable search" src={'/example/expandable-search'}></iframe>
    <p class="push-bottom align-right"><a href="/example/expandable-search" rel="noopener" target="_blank">Open in a new tab</a></p>
    
    <h2 class="push-bottom--half plus-2 medium">Dependencies and installation</h2>
    <DependencyTable dependencies={[{ package: '@stormid/toggle', installation: 'npm i -S @stormid/toggle' }]} />
    
    <h2 class="push-bottom--half plus-2 medium">Code</h2>
    <pre class="pre"><code class="code">{`${render(<Code />, null, { pretty: true })}`}</code></pre>
    <pre class="pre"><code class="code">{`import toggle from '@stormid/toggle';

toggle('.js-expandable-search');`}</code></pre>
    <h2 class="push-bottom plus-2 medium">Acceptance criteria</h2>
    <p class="push-bottom--double">The following is a list of example acceptance criteria to test against when using this pattern.  These critera should test that the specific markup requirements are met, and that the search behaves visually and functionally as expected.</p>

    <h3 class="push-bottom--half plus-1 medium">For validation in developer tools / web inspector</h3>
    <ul class="list list--tick push-bottom--double">
        <li class="list-item">An HTML <pre class="pre--inline">&lt;button&gt;</pre> element is used to open/close the search</li>
        <li class="list-item">An <pre class="pre--inline">aria-expanded</pre> attribute should be present on the toggle <pre class="pre--inline">&lt;button&gt;</pre>. The value of this should be 'true' when the search is visible, and 'false' when the search is hidden.</li>
        <li class="list-item">The toggle <pre class="pre--inline">&lt;button&gt;</pre> element should have an <pre class="pre--inline">aria-controls</pre> attribute. The value of this should match the ID of the element being shown/hidden.</li>
    </ul>

    <h3 class="push-bottom--half plus-1 medium">For visual validation</h3>
    <ul class="list list--tick push-bottom--double">
        <li class="list-item">Search toggle buttons should have a clearly visible focus style which meets accessibility contrast requirements</li>
        <li class="list-item">Search toggle buttons should be appropriately labelled to describe their functionality.  If the design requires no visible text, a label should be added as an <pre class="pre--inline">aria-label</pre> attribute on the <pre class="pre--inline">&lt;button&gt;</pre> element.</li>
        <li class="list-item">Search toggle buttons should be no less than 44px x 44px in size (unless any of the allowed <a href="https://www.w3.org/TR/WCAG22/#target-size-enhanced">WCAG exceptions apply</a>)</li>
        <li class="list-item">The search form should be hidden visually, hidden from keyboard access and not read by screen readers when the search is closed</li>
        <li class="list-item">The search form should be visible, available for keyboard access and read by screen readers when the search is open</li>
        <li class="list-item">Any form inputs within the search form should have a matching label describing its functionality. If the design does not use a visible label (for example, it may only ask for a placholder in the input itself) then the input should still be labelled either with an <pre class="pre--inline">aria-label</pre> attribute, or a visually hidden label</li>
        <li class="list-item">Any form inputs within the search form should have a clearly visible focus style which meets accessibility contrast requirements</li>
    </ul>

    <h3 class="push-bottom--half plus-1 medium">For functional validation</h3>
    <ul class="list list--tick push-bottom--double">
        <li class="list-item">Search toggle buttons should be available to be tabbed to and activated via keyboard</li>
        <li class="list-item">The first available form input, button or link within the search form should receive visible focus when the search is opened</li>
        <li class="list-item">It should be possible to tab into the search form if the search is open</li>
        <li class="list-item">When open, the search should not trap tab - a user should be able to tab out of the menu to page content below</li>
    </ul>

    <h2 class="push-bottom--half plus-1 medium">References</h2>
    <ul class="list push-bottom--double">
        <li class="list-item"><a href="https://webaim.org/standards/wcag/checklist" rel="noopener nofollow">https://webaim.org/standards/wcag/checklist</a></li>
        <li class="list-item"><a href="https://inclusive-components.design/menus-menu-buttons/" rel="noopener nofollow">https://inclusive-components.design/menus-menu-buttons/</a></li>
        <li class="list-item"><a href="https://www.a11ymatters.com/pattern/mobile-nav/" rel="noopener nofollow">https://www.a11ymatters.com/pattern/mobile-nav/</a></li>
    </ul>
</PatternLayout>;

export default ExpandableSearch;