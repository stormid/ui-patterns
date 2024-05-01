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
    <p class="push-bottom--double">Show and hide a section of content</p>
    
    <h2 class="push-bottom--half plus-2 medium">Guidance</h2>
    <p class="push-bottom--double"></p>
    
    <h2 class="push-bottom--half plus-2 medium">Example</h2>
    <iframe style="--height: 375px" class="example" title="Example expandable section" src={'/example/show-more'}></iframe>
    <p class="push-bottom align-right"><a href="/example/show-more" rel="noopener" target="_blank">Open in a new tab</a></p>

    <h2 class="push-bottom--half plus-2 medium">Dependencies and installation</h2>
    <DependencyTable dependencies={[{ package: '@stormid/toggle', installation: 'npm i -S @stormid/toggle' }]} />

    
    <h2 class="push-bottom--half plus-2 medium">Code</h2>
    <pre class="pre"><code class="code">{`${render(<Code />, null, { pretty: true })}`}</code></pre>
    <pre class="pre"><code class="code">{`mport toggle from '@stormid/toggle';
const SELECTORS = {
    NODE: '.js-show-more',
    BLOCK: '.js-show-more__block',
    MORE_BTN: '.js-show-more__btn',
}

export const init = () => {

    const nodes = Array.from(document.querySelectorAll(SELECTORS.NODE));

    nodes.forEach((node) => {
        const currentBlock = node.querySelector(SELECTORS.BLOCK);
        const currentShowMore = node.querySelector(SELECTORS.MORE_BTN);
        if(!currentBlock || !currentShowMore) return;

        const showMoreToggle = toggle(currentBlock, { 
            focus: false, 
            local: true,
            callback: (tog) => {
                if (tog.isOpen) {
                    currentBlock.setAttribute('tabindex', '-1');
                    currentBlock.focus();
                } else {
                    currentBlock.removeAttribute('tabindex', '-1');
                    currentShowMore.focus();
                }
            }
        });
    })

};

init();`}</code></pre>
    <h2 class="push-bottom plus-2 medium">Acceptance criteria</h2>
    <p class="push-bottom--double">The following is a list of example acceptance criteria to test against when using this pattern.  These critera should test that the specific markup requirements are met, and that the expanding section behaves visually and functionally as expected.</p>

    <h3 class="push-bottom--half plus-1 medium">For validation in developer tools / web inspector</h3>
    <ul class="list list--tick push-bottom--double">
        <li class="list-item"></li>
    </ul>

    <h3 class="push-bottom--half plus-1 medium">For visual validation</h3>
    <ul class="list list--tick push-bottom--double">
        <li class="list-item"></li>
    </ul>

    <h3 class="push-bottom--half plus-1 medium">For functional validation</h3>
    <ul class="list list--tick push-bottom--double">
        <li class="list-item"></li>
    </ul>

    <h2 class="push-bottom--half plus-2 medium">References</h2>
    <ul class="list push-bottom--double">
        <li class="list-item"></li>
    </ul>
</PatternLayout>;

export default ExpandableSection;