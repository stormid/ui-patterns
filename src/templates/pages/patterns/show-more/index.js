import { h } from 'preact';
import PatternLayout from '@layouts/pattern';
import Code from '../../example/show-more/code';
import { render } from 'preact-render-to-string';
import PatternTitle from '@components/pattern-title';
import { STATUS } from '@constants';

export const title = 'Read more';

const ShowMore = () => <PatternLayout>
    <PatternTitle status={STATUS.DEVELOPMENT}>Show more</PatternTitle>
    <p class="push-bottom--double">Inline progressive disclosure with expandable content.</p>
    <h2 class="push-bottom--half plus-1 medium">Guidance</h2>
    <p class="push-bottom--double">Hide content from the user can reduce cognitive load but understand that longer pages can benefit users, and this pattern increases the interaction cost.</p>
    <h2 class="push-bottom--half plus-1 medium">Example</h2>
    <iframe style="--height: 375px" class="example" title="Example read more" src={'/example/show-more'} />
    <p class="push-bottom align-right"><a href="/example/show-more" rel="noopener" target="_blank">Open in a new tab</a></p>
    <h2 class="push-bottom--half plus-1 medium">Code</h2>
    <pre class="pre"><code class="code">{`${render(<Code />, null, { pretty: true })}`}</code></pre>
    <pre class="pre"><code class="code">{`import toggle from '@stormid/toggle';

toggle('.js-show-more', {
    local: true,
    focus: false,
    callback({ node, toggles, isOpen }){
        if (isOpen) {
            toggles[0].textContent = 'Show less';
            toggles[0].previousElementSibling.focus();
        } else {
            toggles[0].textContent = 'Show more';
        }
    }
});`}</code></pre>
    <h2 class="push-bottom--half plus-1 medium">Acceptance criteria</h2>
    <ul class="list list--tick push-bottom--double">
        <li class="list-item">Use a button element for the trigger</li>
        <li class="list-item">Button trigger should be focusable</li>
        <li class="list-item">Button trigger focus style should be visible</li>
        <li class="list-item">Button trigger should be appropriately labelled</li>
        <li class="list-item">Button trigger should be keyboard operable</li>
        <li class="list-item">Button trigger should be no less than 44px x 44px</li>
        <li class="list-item">ARIA expanded attribute should correctly describe shown/hidden state</li>
        <li class="list-item">ARIA controls attribute should correctly associate button with expandable element</li>
        <li class="list-item">If the trigger is after the expanded content in the source order, when opened focus should go to the first focusable element in the expanded area, or to the expanded area itself</li>
        <li class="list-item">If focusing on the expanded element, add tabindex of -1 to ensure that it is not tabbable, only programmatically focused once</li>
    </ul>
    <h2 class="push-bottom--half plus-1 medium">References</h2>
    <ul class="list push-bottom--double">
        <li class="list-item"><a href="https://webaim.org/standards/wcag/checklist" rel="noopener nofollow">https://webaim.org/standards/wcag/checklist</a></li>
        <li class="list-item"><a href="https://www.accede-web.com/en/guidelines/rich-interface-components/show-more-buttons/" rel="noopener nofollow">https://www.accede-web.com/en/guidelines/rich-interface-components/show-more-buttons/</a></li>
        <li class="list-item"><a href="https://www.nngroup.com/articles/accordions-complex-content/" rel="noopener nofollow">https://www.nngroup.com/articles/accordions-complex-content/</a></li>
    </ul>
</PatternLayout>;

export default ShowMore;