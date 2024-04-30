import { h } from 'preact';
import PatternLayout from '@layouts/pattern';
import CodeHero from '../../example/heading-subheading/hero/code';
import CodeCard from '../../example/heading-subheading/card/code';
import { render } from 'preact-render-to-string';
import PatternTitle from '@components/pattern-title';
import { STATUS } from '@constants';

export const title = 'Heading with subheading';

export const status = STATUS.DEVELOPMENT;

const HeadingSubheading = () => <PatternLayout>
    <PatternTitle status={status}>Heading with subheading</PatternTitle>
    <p class="push-bottom--double">Markup for use when displaying a heading with a subheading or tagline.</p>
    
    <h2 class="push-bottom--half plus-2 medium">Guidance</h2>
    <p class="push-bottom">Often there is a requirement for a page or a component to contain a subheading or a tagline immediately below the main header of the element.  Visually this may look like a secondary heading such as an h2 or h3, but semantically this text is rarely ever useful as a heading for sectioning content</p>
    <p class="push-bottom">This content should be rendered as standard page paragraphs, but with additional markup to indicate to browsers and screenreaders what the meaning of this content is and how it connects to the heading.</p>
    <p class="push-bottom--double">At the time of writing, support of the <code class="pre--inline">role=&quot;doc-subtitle&quot;</code> attribute is patchy and implementations contain bugs that make it detrimental to the legibility of the page on some screenreaders (See references below).  For now, the recommendation is to use the <code class="pre--inline">&lt;hgroup&gt;</code> tag alone.</p>

    
    <h2 class="push-bottom--half plus-2 medium">Example page hero</h2>
    <iframe style="--height: 375px" class="example" title="Example page header with subheading" src={'/example/heading-subheading/hero'}></iframe>
    <p class="push-bottom align-right"><a href="/example/heading-subheading/hero" rel="noopener" target="_blank">Open in a new tab</a></p>
    <pre class="pre"><code class="code">{`${render(<CodeHero />, null, { pretty: true })}`}</code></pre>

    <h2 class="push-bottom--half plus-2 medium">Example card</h2>
    <iframe style="--height: 375px" class="example" title="Example card header with subheading" src={'/example/heading-subheading/card'}></iframe>
    <p class="push-bottom align-right"><a href="/example/heading-subheading/card" rel="noopener" target="_blank">Open in a new tab</a></p>
    <pre class="pre"><code class="code">{`${render(<CodeCard />, null, { pretty: true })}`}</code></pre>


    <h2 class="push-bottom plus-2 medium">Acceptance criteria</h2>
    <p class="push-bottom--double">The following is a list of example acceptance criteria to test against when using this pattern.  These critera should test that the specific markup requirements are met, and that the search behaves visually and functionally as expected.</p>

    <h3 class="push-bottom--half plus-1 medium">For validation in developer tools / web inspector</h3>
    <ul class="list list--tick push-bottom--double">
        <li class="list-item">Any headings followed by a tagline or immediate subtitle should be wrapped in an <pre class="pre--inline">&lt;hgroup&gt;</pre> tag</li>
        <li class="list-item">Any taglines or subtitles should be <pre class="pre--inline">&lt;p&gt;</pre> tag</li>
        <li class="list-item">The level of the heading within the <pre class="pre--inline">&lt;hgroup&gt;</pre> tag will depend on the surrounding page context, and should follow the page heirarchy</li>
        <li class="list-item">The <pre class="pre--inline">&lt;hgroup&gt;</pre> must follow HTML5 validation rules and contain only one heading tag with one or more supporting paragraphs</li>
    </ul>

    <h3 class="push-bottom--half plus-1 medium">For visual validation</h3>
    <ul class="list list--tick push-bottom--double">
        <li class="list-item">The heading and subtitle should give a visual indication of content heirarchy</li>
    </ul>

    <h3 class="push-bottom--half plus-1 medium">For functional validation</h3>
    <ul class="list list--tick push-bottom--double">
        <li class="list-item">The subtitle should not appear as a heading within the accessibility tree, and should not be announced as such</li>
    </ul>

    <h2 class="push-bottom--half plus-1 medium">References</h2>
    <ul class="list push-bottom--double">
        <li class="list-item"><a href="https://www.tpgi.com/subheadings-subtitles-alternative-titles-and-taglines-in-html/" rel="noopener nofollow">https://www.tpgi.com/subheadings-subtitles-alternative-titles-and-taglines-in-html/</a></li>
        <li class="list-item"><a href="https://adrianroselli.com/2020/08/be-wary-of-doc-subtitle.html" rel="noopener nofollow">https://adrianroselli.com/2020/08/be-wary-of-doc-subtitle.html</a></li>
        <li class="list-item"><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/hgroup" rel="noopener nofollow">https://developer.mozilla.org/en-US/docs/Web/HTML/Element/hgroup</a></li>
    </ul>
</PatternLayout>;

export default HeadingSubheading;