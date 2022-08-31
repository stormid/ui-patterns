import { h } from 'preact';
import PatternLayout from '@layouts/pattern';
import Code from '../../example/form-validation/code';
import { render } from 'preact-render-to-string';
import PatternTitle from '@components/pattern-title';
import DependencyTable from '@components/dependency-table';
import { STATUS } from '@constants';

export const title = 'Form validation';

const FormValidation = () => <PatternLayout>
    <PatternTitle status={STATUS.DEVELOPMENT}>Form validation</PatternTitle>
    <p class="push-bottom--double">Check the information the user gives you to make sure it's valid</p>
    
    <h2 class="push-bottom--half plus-1 medium">Guidance</h2>
    <p class="push-bottom">Use this pattern to verify information provided by the user is suitable.</p>
    <p class="push-bottom--double">For more information on different types of validator, writing cutom validators, error messages and more <a href="https://github.com/stormid/components/tree/master/packages/validate" rel="noopener nofollow">see the validation library documentation</a>.</p>
    
    <h2 class="push-bottom--half plus-1 medium">Example</h2>
    <iframe style="--height: 375px" class="example" title="Example form validation section" src={'/example/form-validation'}></iframe>
    <p class="push-bottom align-right"><a href="/example/form-validation" rel="noopener" target="_blank">Open in a new tab</a></p>
    
    <h2 class="push-bottom--half plus-1 medium">Dependencies and installation</h2>
    <DependencyTable dependencies={[{ package: '@stormid/toggle', installation: 'npm i -S @stormid/toggle' }]} />
    
    <h2 class="push-bottom--half plus-1 medium">Code</h2>
    <pre class="pre"><code class="code">{`${render(<Code />, null, { pretty: true })}`}</code></pre>
    <pre class="pre"><code class="code">{`import validate from '@stormid/validate';

validate('.js-validate');
`}</code></pre>
    <h2 class="push-bottom--half plus-1 medium">Acceptance criteria</h2>
    <ul class="list list--tick push-bottom--double">
        <li class="list-item">All inputs must have associated labels</li>
        <li class="list-item">Groups of inputs should be grouped as a fieldset with a legend</li>
        <li class="list-item">All inputs must be keyboard accessible</li>
        <li class="list-item">All inputs must have visual focus state</li>
        <li class="list-item">Form fields collecting <a href="https://www.w3.org/TR/WCAG21/#input-purposes" rel="noopener nofollow">certain types of user-specific information</a> need appropriate autocomplete attributes</li>
        <li class="list-item">At least one error prevention technique should be used: validation and error messages allowing the user to correct them; or subsmisisons are reversible; or submissions can be reviewed and confirmed before submission</li>
        <li class="list-item">Required and optional fields should be indicated</li>
        <li class="list-item">Real-time error messages should not be announced a screen reader</li>
        <li class="list-item">Error messages should not be live regions (no <code>role="alert"</code> or <code>aria-live</code>)</li>
        <li class="list-item">Error messages should be associated with a field via an aria-describedby attribute on the input</li>
        <li class="list-item">Error messages must be visible</li>
        <li class="list-item">Required inputs should have an aria-required attribute</li>
        <li class="list-item">Add <code>aria-invalid="true"</code> to the field when error is triggered</li>
    </ul>
    <h2 class="push-bottom--half plus-1 medium">References</h2>
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