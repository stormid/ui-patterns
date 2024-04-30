import { h } from 'preact';
import PatternLayout from '@layouts/pattern';
import { CodeHeader, CodeCard } from '../../example/heading-subheading/code';
import { render } from 'preact-render-to-string';
import PatternTitle from '@components/pattern-title';
import { STATUS } from '@constants';

export const title = 'Heading with subheading';

export const status = STATUS.DEVELOPMENT;

const ExpandableSearch = () => <PatternLayout>
    <PatternTitle status={status}>Heading with subheading</PatternTitle>
    <p class="push-bottom--double">Markup for use when displaying a heading with a subheading or tagline.</p>
    
    <h2 class="push-bottom--half plus-2 medium">Guidance</h2>
    <p class="push-bottom--double"></p>
    <h2 class="push-bottom--half plus-2 medium">Examples</h2>
    <iframe style="--height: 375px" class="example" title="Example expandable search" src={'/example/heading-subheading'}></iframe>
    <p class="push-bottom align-right"><a href="/example/heading-subheading" rel="noopener" target="_blank">Open in a new tab</a></p>
    
    <h2 class="push-bottom--half plus-2 medium">Code for hero or header area</h2>
    <pre class="pre"><code class="code">{`${render(<CodeHeader />, null, { pretty: true })}`}</code></pre>

    <h2 class="push-bottom--half plus-2 medium">Code for card</h2>
    <pre class="pre"><code class="code">{`${render(<CodeCard />, null, { pretty: true })}`}</code></pre>


    <h2 class="push-bottom plus-2 medium">Acceptance criteria</h2>
    <p class="push-bottom--double">The following is a list of example acceptance criteria to test against when using this pattern.  These critera should test that the specific markup requirements are met, and that the search behaves visually and functionally as expected.</p>

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

    <h2 class="push-bottom--half plus-1 medium">References</h2>
    <ul class="list push-bottom--double">
        <li class="list-item"><a href="https://www.tpgi.com/subheadings-subtitles-alternative-titles-and-taglines-in-html/" rel="noopener nofollow">https://www.tpgi.com/subheadings-subtitles-alternative-titles-and-taglines-in-html/</a></li>
        <li class="list-item"><a href="https://adrianroselli.com/2020/08/be-wary-of-doc-subtitle.html" rel="noopener nofollow">https://adrianroselli.com/2020/08/be-wary-of-doc-subtitle.html</a></li>
    </ul>
</PatternLayout>;

export default ExpandableSearch;