import { h } from 'preact';
import PatternLayout from '@layouts/pattern';
import CodeSingle from '../../example/form-headings/form-headings-single/code';
import CodeSingleMulti from '../../example/form-headings/form-headings-single-multi/code';
import CodeMultiple from '../../example/form-headings/form-headings-multiple/code';
import { render } from 'preact-render-to-string';
import PatternTitle from '@components/pattern-title';
import { STATUS } from '@constants';

export const title = 'Form page headings';

export const status = STATUS.DEVELOPMENT;

const FormHeadings = () => <PatternLayout>
    <PatternTitle status={status}>Form page headings</PatternTitle>
    <p class="push-bottom--double">Titling pages containing a single form</p>
    
    <h2 class="push-bottom--half plus-2 medium">Guidance</h2>
    <p class="push-bottom">In transactional services it is common to have a page containing a single form as the main action. This pattern describes how to mark-up the page heading (h1) depending whether the page contains a form with a single question, a form with single question or fieldset with multiple answers, or a form with multiple questions.</p>
    <p class="push-bottom">Pages with a form asking a single question with a single answer should combine the label with the h1. </p>
    <p class="push-bottom">Pages with a form asking a single question with multiple answers (such as checkbox or radio groups), or multiple questions that are related under the a single fieldset, should combine the fieldset legend and the h1.</p>
    <p class="push-bottom--double">Pages with more complex forms with multiple questions or multiple fieldsets should use the page heading to title the form.</p>

    <h2 class="push-bottom--half plus-2 medium">Example - single question, single input</h2>
    <iframe style="--height: 375px" class="example" title="Example form with single question" src={'/example/form-headings/form-headings-single'}></iframe>
    <p class="push-bottom align-right"><a href="/example/form-headings/form-headings-single" rel="noopener" target="_blank">Open in a new tab</a></p>
    <pre class="pre"><code class="code">{`${render(<CodeSingle />, null, { pretty: true })}`}</code></pre>
    
    <h2 class="push-bottom--half plus-2 medium">Example - single question, multiple choice</h2>
    <iframe style="--height: 375px" class="example" title="Example form with multiple choice" src={'/example/form-headings/form-headings-single-multi'}></iframe>
    <p class="push-bottom align-right"><a href="/example/form-headings/form-headings-single-multi" rel="noopener" target="_blank">Open in a new tab</a></p>
    <pre class="pre"><code class="code">{`${render(<CodeSingleMulti />, null, { pretty: true })}`}</code></pre>

    <h2 class="push-bottom--half plus-2 medium">Example - multiple questions</h2>
    <iframe style="--height: 375px" class="example" title="Example form with multiple questions" src={'/example/form-headings/form-headings-multiple'}></iframe>
    <p class="push-bottom align-right"><a href="/example/form-headings/form-headings-multiple" rel="noopener" target="_blank">Open in a new tab</a></p>
    <pre class="pre"><code class="code">{`${render(<CodeMultiple />, null, { pretty: true })}`}</code></pre>

    <h2 class="push-bottom plus-2 medium">Acceptance criteria</h2>
    <p class="push-bottom--double">The following is a list of example acceptance criteria to test against when using this pattern. These critera should test that the specific markup requirements are met, and that the forms behave visually and functionally as expected.</p>

    <h3 class="push-bottom--half plus-1 medium">For validation in developer tools / web inspector</h3>
    <ul class="list list--tick push-bottom--double">
        <li class="list-item">Only one <pre class="pre--inline">h1</pre> element should exist per page</li>
        <li class="list-item">For form pages asking a single question with a single input, the <pre class="pre--inline">h1</pre> tag should contain the appropriate <pre class="pre--inline">label</pre>.</li>
        <li class="list-item">For form pages asking a single question with multiple choices, the <pre class="pre--inline">h1</pre> should be inside the <pre class="pre--inline">legend</pre> tag.</li>
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

export default FormHeadings;