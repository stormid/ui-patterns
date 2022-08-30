import { h } from 'preact';
import PatternLayout from '@layouts/pattern';
import Code from '../../example/expandable-search/code';
import { render } from 'preact-render-to-string';
import PatternTitle from '@components/pattern-title';
import DependencyTable from '@components/dependency-table';
import { STATUS } from '@constants';

export const title = 'Expandable search';

const ExpandableSearch = () => <PatternLayout>
    <PatternTitle status={STATUS.DEVELOPMENT}>Expandable search</PatternTitle>
    <p class="push-bottom--double">Show and hide inline search with a button.</p>
    
    <h2 class="push-bottom--half plus-1 medium">Guidance</h2>
    <p class="push-bottom--double">Use this pattern for a search form that expands and collapses in the document flow. In contrast modal search captures focus, takes over the whole screen and prevents interaction with the rest of the page. The expandable pattern does not trap tab in the same way.</p>
    <h2 class="push-bottom--half plus-1 medium">Example</h2>
    <iframe style="--height: 375px" class="example" title="Example expandable search" src={'/example/expandable-search'}></iframe>
    <p class="push-bottom align-right"><a href="/example/expandable-search" rel="noopener" target="_blank">Open in a new tab</a></p>
    
    <h2 class="push-bottom--half plus-1 medium">Dependencies and installation</h2>
    <DependencyTable dependencies={[{ package: '@stormid/toggle', installation: 'npm i -S @stormid/toggle' }]} />
    
    <h2 class="push-bottom--half plus-1 medium">Code</h2>
    <pre class="pre"><code class="code">{`${render(<Code />, null, { pretty: true })}`}</code></pre>
    <pre class="pre"><code class="code">{`import toggle from '@stormid/toggle';

toggle('.js-expandable-search');`}</code></pre>
    <h2 class="push-bottom--half plus-1 medium">Acceptance criteria</h2>
    <ul class="list list--tick push-bottom--double">
        <li class="list-item">Use a button element for the search triggers</li>
        <li class="list-item">Button trigger should be focusable</li>
        <li class="list-item">Button trigger focus style should be visible</li>
        <li class="list-item">Button trigger should be appropriately labelled</li>
        <li class="list-item">Button trigger should be keyboard operable</li>
        <li class="list-item">Button trigger should be no less than 44px x 44px</li>
        <li class="list-item">Search form should be hidden visually and from accessibility tree when closed</li>
        <li class="list-item">Search form should be visible and in the accessibility tree when open</li>
        <li class="list-item">Either the first item in the search form should be in the focus order after the button, or the first item should programmatically receive focus when search form is opened</li>
        <li class="list-item">Search form should be tabbable when open</li>
        <li class="list-item">When open the search form should not trap tab - a user should be able to tab out</li>
        <li class="list-item">When open the search form should be in normal document flow - tabbing off the last focuable item should go to the next focuable item in the document</li>
        <li class="list-item">ARIA expanded attribute should correctly describe shown/hidden state</li>
        <li class="list-item">ARIA controls attribute should correctly associate button with expandable element</li>
        <li class="list-item">Search input should be appropriately labelled</li>
        <li class="list-item">Search input focus state should be visible</li>
    </ul>
    <h2 class="push-bottom--half plus-1 medium">References</h2>
    <ul class="list push-bottom--double">
        <li class="list-item"><a href="https://webaim.org/standards/wcag/checklist" rel="noopener nofollow">https://webaim.org/standards/wcag/checklist</a></li>
        <li class="list-item"><a href="https://inclusive-components.design/menus-menu-buttons/" rel="noopener nofollow">https://inclusive-components.design/menus-menu-buttons/</a></li>
        <li class="list-item"><a href="https://www.a11ymatters.com/pattern/mobile-nav/" rel="noopener nofollow">https://www.a11ymatters.com/pattern/mobile-nav/</a></li>
    </ul>
</PatternLayout>;

export default ExpandableSearch;