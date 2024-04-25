import { h } from 'preact';
import PatternLayout from '@layouts/pattern';
import CodeSingle from '../../example/form-patterns/form-patterns-single/code';
import CodeSingleMulti from '../../example/form-patterns/form-patterns-single-multi/code';
import CodeMultiple from '../../example/form-patterns/form-patterns-multiple/code';
import { render } from 'preact-render-to-string';
import PatternTitle from '@components/pattern-title';
import { STATUS } from '@constants';

export const title = 'Form patterns';

export const status = STATUS.DEVELOPMENT;

const FormPatterns = () => <PatternLayout>
    <PatternTitle status={status}>Form patterns</PatternTitle>
    <p class="push-bottom--double">Markup examples when asking single or multiple questions per form page.</p>
    
    <h2 class="push-bottom--half plus-2 medium">Guidance</h2>
    <p class="push-bottom">If you are asking just one question per page of a form, you can set the contents of the as the page heading. This is good practice as it means that users of screen readers will only hear the contents once. </p>
    <p class="push-bottom--double">If you’re asking more than one question on the page, do not set the contents of the as the page heading.  Instead, this should be a title which summarises the form.</p>

    <h2 class="push-bottom--half plus-2 medium">Example - single question, single input</h2>
    <iframe style="--height: 375px" class="example" title="Example form validation section" src={'/example/form-patterns/form-patterns-single'}></iframe>
    <p class="push-bottom align-right"><a href="/example/form-patterns/form-patterns-single" rel="noopener" target="_blank">Open in a new tab</a></p>
    <pre class="pre"><code class="code">{`${render(<CodeSingle />, null, { pretty: true })}`}</code></pre>
    
    <h2 class="push-bottom--half plus-2 medium">Example - single question, multiple choice</h2>
    <iframe style="--height: 375px" class="example" title="Example form validation section" src={'/example/form-patterns/form-patterns-single-multi'}></iframe>
    <p class="push-bottom align-right"><a href="/example/form-patterns/form-patterns-single-multi" rel="noopener" target="_blank">Open in a new tab</a></p>
    <pre class="pre"><code class="code">{`${render(<CodeSingleMulti />, null, { pretty: true })}`}</code></pre>

    <h2 class="push-bottom--half plus-2 medium">Example - multiple questions</h2>
    <iframe style="--height: 375px" class="example" title="Example form validation section" src={'/example/form-patterns/form-patterns-multiple'}></iframe>
    <p class="push-bottom align-right"><a href="/example/form-patterns/form-patterns-multiple" rel="noopener" target="_blank">Open in a new tab</a></p>
    <pre class="pre"><code class="code">{`${render(<CodeMultiple />, null, { pretty: true })}`}</code></pre>

    <h2 class="push-bottom plus-2 medium">Acceptance criteria</h2>
    <p class="push-bottom--double">The following is a list of example acceptance criteria to test against when using this pattern. These critera should test that the specific markup requirements are met, and that the forms behave visually and functionally as expected.</p>

    <h3 class="push-bottom--half plus-1 medium">For validation in developer tools / web inspector</h3>
    <ul class="list list--tick push-bottom--double">
        <li class="list-item">Only one <pre class="pre--inline">h1</pre> element should exist per page</li>
        <li class="list-item">For form pages asking a single question with multiple choices, the <pre class="pre--inline">h1</pre> should be inside the <pre class="pre--inline">legend</pre> tag.</li>
        <li class="list-item">For form pages asking a single question with a single input, the <pre class="pre--inline">h1</pre> tag should contain the appropriate <pre class="pre--inline">label</pre>.</li>
        <li class="list-item">For form pages asking multiple questions, the <pre class="pre--inline">h1</pre> tag should be above all form inputs and summarise the entire form</li>
    </ul>

    <h3 class="push-bottom--half plus-1 medium">For visual validation</h3>
    <ul class="list list--tick push-bottom--double">
        <li class="list-item">The form should visually make sense and be easily scanned</li>
        <li class="list-item">There should be a clear visual heirarchy of headings, legends and labels.</li>
    </ul>

    <h3 class="push-bottom--half plus-1 medium">For functional validation</h3>
    <ul class="list list--tick push-bottom--double">
        <li class="list-item">Screenreaders should only read the title of the page once. There should be no duplication of the question text.</li>
        <li class="list-item">A screenreader user should be able to navigate the page via headings or form inputs and the context should still make sense.</li>
    </ul>

    <h2 class="push-bottom--half plus-2 medium">References</h2>
    <ul class="list push-bottom--double">
        <li class="list-item"><a href="https://design-system.service.gov.uk/patterns/question-pages/#asking-multiple-questions-on-a-page" rel="noopener nofollow">https://design-system.service.gov.uk/patterns/question-pages/#asking-multiple-questions-on-a-page</a></li>
        <li class="list-item"><a href="https://design-system.service.gov.uk/get-started/labels-legends-headings/" rel="noopener nofollow">https://design-system.service.gov.uk/get-started/labels-legends-headings/</a></li>
    </ul>
</PatternLayout>;

export default FormPatterns;