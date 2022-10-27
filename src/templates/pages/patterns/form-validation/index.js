import { h } from 'preact';
import PatternLayout from '@layouts/pattern';
import Code from '../../example/form-validation/code';
import { render } from 'preact-render-to-string';
import PatternTitle from '@components/pattern-title';
import DependencyTable from '@components/dependency-table';
import { STATUS } from '@constants';

export const title = 'Form validation';

export const status = STATUS.RELEASE;

const FormValidation = () => <PatternLayout>
    <PatternTitle status={status}>Form validation</PatternTitle>
    <p class="push-bottom--double">Check the information the user gives you to make sure it's valid</p>
    
    <h2 class="push-bottom--half plus-2 medium">Guidance</h2>
    <p class="push-bottom">Use this pattern to verify information provided by the user is suitable.</p>
    <p class="push-bottom--double">For more information on different types of validator, writing cutom validators, error messages and more <a href="https://github.com/stormid/components/tree/master/packages/validate" rel="noopener nofollow">see the validation library documentation</a>.</p>
    
    <h2 class="push-bottom--half plus-2 medium">Example</h2>
    <iframe style="--height: 375px" class="example" title="Example form validation section" src={'/example/form-validation'}></iframe>
    <p class="push-bottom align-right"><a href="/example/form-validation" rel="noopener" target="_blank">Open in a new tab</a></p>
    
    <h2 class="push-bottom--half plus-2 medium">Dependencies and installation</h2>
    <DependencyTable dependencies={[{ package: '@stormid/validate', installation: 'npm i -S @stormid/validate' }]} />
    
    <h2 class="push-bottom--half plus-2 medium">Code</h2>
    <pre class="pre"><code class="code">{`${render(<Code />, null, { pretty: true })}`}</code></pre>
    <pre class="pre"><code class="code">{`import validate from '@stormid/validate';

validate('.js-validate');
`}</code></pre>
    <h2 class="push-bottom plus-2 medium">Acceptance criteria</h2>
    <p class="push-bottom--double">The following is a list of example acceptance criteria to test against when using this pattern.  These critera should test that the specific markup requirements are met, and that the validation behaves visually and functionally as expected.</p>

    <h3 class="push-bottom--half plus-1 medium">For validation in developer tools / web inspector</h3>
    <ul class="list list--tick push-bottom--double">
        <li class="list-item">All form <pre class="pre--inline">&lt;input&gt;</pre>, <pre class="pre--inline">&lt;select&gt;</pre> or <pre class="pre--inline">&lt;textarea&gt;</pre> tags must have a matching <pre class="pre--inline">&lt;label&gt;</pre> tag</li>
        <li class="list-item">Any inputs that are related to each other (eg. address inputs) should be grouped inside a <pre class="pre--inline">&lt;fieldset&gt;</pre> tag with a <pre class="pre--inline">&lt;legend&gt;</pre> tag describing the group</li>
        <li class="list-item">Error messages should <em>not</em> have <pre class="pre--inline">role="alert"</pre> or <pre class="pre--inline">aria-live</pre> attributes</li>
        <li class="list-item">Error messages should be associated with an input. The invalid <pre class="pre--inline">&lt;input&gt;</pre>, <pre class="pre--inline">&lt;select&gt;</pre> or <pre class="pre--inline">&lt;textarea&gt;</pre> should have an <pre class="pre--inline">aria-describedby</pre> attribute which matches the ID of the error message to achieve this</li>
        <li class="list-item">Required <pre class="pre--inline">&lt;input&gt;</pre>, <pre class="pre--inline">&lt;select&gt;</pre> or <pre class="pre--inline">&lt;textarea&gt;</pre> tags should have an <pre class="pre--inline">aria-required</pre> attribute</li>
        <li class="list-item">Any invalid <pre class="pre--inline">&lt;input&gt;</pre>, <pre class="pre--inline">&lt;select&gt;</pre> or <pre class="pre--inline">&lt;textarea&gt;</pre> tags should have an <pre class="pre--inline">aria-invalid="true"</pre> attribute</li>
    </ul>

    <h3 class="push-bottom--half plus-1 medium">For visual validation</h3>
    <ul class="list list--tick push-bottom--double">
        <li class="list-item">All form inputs should have a clearly visible focus style which meets accessibility contrast requirements</li>
        <li class="list-item">Required and optional fields should be visibly indicated and announced to a screenreader as such</li>
        <li class="list-item">Error messages must be visible and heard via screenreader</li>
    </ul>

    <h3 class="push-bottom--half plus-1 medium">For functional validation</h3>
    <ul class="list list--tick push-bottom--double">
        <li class="list-item">All inputs must be reachable and function correctly via keyboard</li>
        <li class="list-item">Form inputs collecting <a href="https://www.w3.org/TR/WCAG21/#input-purposes" rel="noopener nofollow">certain types of user-specific information</a> should use autocomplete</li>
        <li class="list-item">At least one error prevention technique should be used: validation on submission with error messages allowing the user to correct them; or subsmisisons are reversible; or user input can be reviewed and confirmed before submission</li>
        <li class="list-item">Error messages which update as you type should not be announced a screen reader to avoid excess noise</li>
    </ul>

    <h2 class="push-bottom--half plus-2 medium">References</h2>
    <ul class="list push-bottom--double">
        <li class="list-item"><a href="https://www.davidmacd.com/blog/test-aria-describedby-errormessage-aria-live.html" rel="noopener nofollow">https://www.davidmacd.com/blog/test-aria-describedby-errormessage-aria-live.html</a></li>
        <li class="list-item"><a href="https://dequeuniversity.com/checklists/web/form-validation-feedback" rel="noopener nofollow">https://dequeuniversity.com/checklists/web/form-validation-feedback</a></li>
        <li class="list-item"><a href="https://www.w3.org/TR/WCAG21/#input-purposes" rel="noopener nofollow">https://www.w3.org/TR/WCAG21/#input-purposes</a></li>
        <li class="list-item"><a href="https://webaim.org/standards/wcag/checklist" rel="noopener nofollow">https://webaim.org/standards/wcag/checklist</a></li>
        <li class="list-item"><a href="https://webaim.org/techniques/forms/" rel="noopener nofollow">https://webaim.org/techniques/forms/</a></li>
        <li class="list-item"><a href="https://design-system.service.gov.uk/patterns/validation/" rel="noopener nofollow">https://design-system.service.gov.uk/patterns/validation/</a></li>
        <li class="list-item"><a href="https://design-system.service.gov.uk/components/error-message/" rel="noopener nofollow">https://design-system.service.gov.uk/components/error-message/</a></li>
        <li class="list-item"><a href="https://github.com/stormid/components/tree/master/packages/validate" rel="noopener nofollow">https://github.com/stormid/components/tree/master/packages/validate</a></li>
        <li class="list-item"><a href="https://github.com/stormid/components/pull/166" rel="noopener nofollow">https://github.com/stormid/components/pull/166</a></li>
    </ul>
</PatternLayout>;

export default FormValidation;