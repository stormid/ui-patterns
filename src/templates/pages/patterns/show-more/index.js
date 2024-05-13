import { h } from 'preact';
import PatternLayout from '@layouts/pattern';
import Code from '../../example/show-more/code';
import { render } from 'preact-render-to-string';
import PatternTitle from '@components/pattern-title';
import DependencyTable from '@components/dependency-table';
import { STATUS } from '@constants';

export const title = 'Show more';

export const status = STATUS.DEVELOPMENT;

const ExpandableSection = () => <PatternLayout>
    <PatternTitle status={status}>Show more</PatternTitle>
    <p class="push-bottom--double">An example pattern for progressive disclosure of content</p>
    
    <h2 class="push-bottom--half plus-2 medium">Guidance</h2>
    <p class="push-bottom">Sometimes there may be a requirement to present users with key pieces of information only, to focus their attention.  Additional, more detailed information can be presented to them if they choose to display it.  This is known as <a href="https://www.nngroup.com/articles/progressive-disclosure/" rel="nofollow noopener">progessive disclosure</a>.</p>
    <p class="push-bottom--double">The pattern below shows how this can be achieved using the StormID toggle component.</p>
    
    <h2 class="push-bottom--half plus-2 medium">Example</h2>
    <iframe style="--height: 375px" class="example" title="Example expandable section" src={'/example/show-more'}></iframe>
    <p class="push-bottom align-right"><a href="/example/show-more" rel="noopener" target="_blank">Open in a new tab</a></p>

    <h2 class="push-bottom--half plus-2 medium">Dependencies and installation</h2>
    <DependencyTable dependencies={[{ package: '@stormid/toggle', installation: 'npm i -S @stormid/toggle' }]} />

    
    <h2 class="push-bottom--half plus-2 medium">Code</h2>
    <pre class="pre"><code class="code">{`${render(<Code />, null, { pretty: true })}`}</code></pre>
    <pre class="pre"><code class="code">{`import toggle from '@stormid/toggle';
const SELECTORS = {
    NODE: '.js-show-more',
    BLOCK: '.js-show-more__block',
    MORE_BTN: '.js-show-more__btn',
}

export const showMoreFocus = (isOpen, currentBlock, currentShowMore) => {
    if (isOpen) {
        currentBlock.setAttribute('tabindex', '-1');
        currentBlock.focus();
    } else {
        currentBlock.removeAttribute('tabindex', '-1');
        currentShowMore.focus();
    }
}

export const init = () => {

    const nodes = Array.from(document.querySelectorAll(SELECTORS.NODE));
    const initialised = [];

    nodes.forEach((node) => {
        const currentBlock = node.querySelector(SELECTORS.BLOCK);
        const currentShowMore = node.querySelector(SELECTORS.MORE_BTN);
        if(!currentBlock || !currentShowMore) return;

        const showMoreToggle = toggle(currentBlock, { 
            focus: false, 
            local: true,
            callback: (tog) => showMoreFocus(tog.isOpen, currentBlock, currentShowMore)
        });
        initialised.push(showMoreToggle);
    })

    return initialised;
};

init();`}</code></pre>
    <h2 class="push-bottom plus-2 medium">Acceptance criteria</h2>
    <p class="push-bottom--double">The following is a list of example acceptance criteria to test against when using this pattern.  These critera should test that the specific markup requirements are met, and that the expanding section behaves visually and functionally as expected.</p>

    <h3 class="push-bottom--half plus-1 medium">For validation in developer tools / web inspector</h3>
    <ul class="list list--tick push-bottom--double">
        <li class="list-item">An HTML <pre class="pre--inline">&lt;button&gt;</pre> element is used to show the section</li>
        <li class="list-item">An HTML <pre class="pre--inline">&lt;button&gt;</pre> element is used to hide the section</li>
        <li class="list-item">An <pre class="pre--inline">aria-expanded</pre> attribute should be present on both <pre class="pre--inline">&lt;button&gt;</pre> elements.  The value of this should be 'true' when the section is expanded, and false when the section is collapsed.</li>
        <li class="list-item">Both buttons <pre class="pre--inline">&lt;button&gt;</pre> should have an <pre class="pre--inline">aria-controls</pre> attribute.  The value of this should match the ID of the section being shown/hidden.</li>
    </ul>

    <h3 class="push-bottom--half plus-1 medium">For visual validation</h3>
    <ul class="list list--tick push-bottom--double">
        <li class="list-item">Section show and hide buttons should have a clearly visible focus style which meets accessibility contrast requirements</li>
        <li class="list-item">Section show/hide buttons should be no less than 44px x 44px in size (unless any of the allowed <a href="https://www.w3.org/TR/WCAG22/#target-size-enhanced">WCAG exceptions apply</a>)</li>
        <li class="list-item">Show/hide buttons should be appropriately labelled to describe their functionality. If the design requires no visible text, a label should be added as an <pre class="pre--inline">aria-label</pre> attribute on the <pre class="pre--inline">&lt;button&gt;</pre> element</li>
        <li class="list-item">The collapsed content should be hidden visually, hidden from keyboard access, and not read by screen readers</li>
        <li class="list-item">The expanded content should be visible, available for keyboard access, and read by screen readers</li>
    </ul>

    <h3 class="push-bottom--half plus-1 medium">For functional validation</h3>
    <ul class="list list--tick push-bottom--double">
        <li class="list-item">Show/hide buttons should be available to be tabbed to and activated via keyboard</li>
        <li class="list-item">When expanded, keyboard focus should continue through the expanded content to any focusable elements within</li>
        <li class="list-item">If content is hidden again after being expanded, focus should return to the 'show' button</li>
    </ul>

    <h2 class="push-bottom--half plus-2 medium">References</h2>
    <ul class="list push-bottom--double">
        <li class="list-item"><a href="https://inclusive-components.design/collapsible-sections/" rel="noopener nofollow">https://inclusive-components.design/collapsible-sections/</a></li>
        <li class="list-item"><a href="https://webaim.org/standards/wcag/checklist" rel="noopener nofollow">https://webaim.org/standards/wcag/checklist</a></li>
        <li class="list-item"><a href="https://www.nngroup.com/articles/progressive-disclosure/" rel="noopener nofollow">https://www.nngroup.com/articles/progressive-disclosure/</a></li>
        <li class="list-item"><a href="https://www.nngroup.com/articles/progressive-disclosure/" rel="noopener nofollow">https://www.nngroup.com/articles/progressive-disclosure/</a></li>
        <li class="list-item"><a href="https://www.accede-web.com/en/guidelines/rich-interface-components/show-more-buttons/" rel="noopener nofollow">https://www.accede-web.com/en/guidelines/rich-interface-components/show-more-buttons//</a></li>
    </ul>
</PatternLayout>;

export default ExpandableSection;