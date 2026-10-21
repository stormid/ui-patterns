import PatternLayout from '@layouts/pattern';
import Code from '../../example/autocomplete/code';
import MultipleCode from '../../example/autocomplete/multiple/code';
import CodeSample from '@components/code-sample';
import PatternTitle from '@components/pattern-title';
import DependencyTable from '@components/dependency-table';
import { STATUS } from '@constants';

export const title = 'Autocomplete';

export const status = STATUS.DEVELOPMENT;

const Autocomplete = () => <PatternLayout>
    <PatternTitle status={status}>Autocomplete</PatternTitle>
    <p class="push-bottom--double">Help users choose one or more options from a long list by typing to filter the list as they go.</p>
    <h2 class="push-bottom--half plus-2 medium">Guidance</h2>
    <p class="push-bottom">An autocomplete is suitable when users need to choose from a list that is too long to scan comfortably, for example more than around 15 options, and they are likely to know the name of what they are looking for, such as a country or an organisation.</p>
    <p class="push-bottom">For a short list, use radio buttons or checkboxes so that every option is visible at once. Do not use an autocomplete where users need to compare or browse the options.</p>
    <p class="push-bottom">Use the single selection variant when only one answer is allowed. Use the multiple selection variant when users need to choose several options from a long list. Each choice is shown as a removable item and is announced to screen reader users as it is added or removed.</p>
    <p class="push-bottom--double">This pattern progressively enhances a native <code>&lt;select&gt;</code>, or <code>&lt;select multiple&gt;</code> for multiple selection, so the field still works without JavaScript. The options, field name, any pre-selected options and the label association are taken from the <code>&lt;select&gt;</code>. The option text is shown and searched, and the option value is submitted with the form.</p>

    <h2 class="push-bottom--half plus-2 medium">Single selection example</h2>
    <iframe style="--height: 375px" class="example" title="Example single selection autocomplete" src={'/example/autocomplete'} />
    <p class="push-bottom align-right"><a href="/example/autocomplete" rel="noopener" target="_blank">Open in a new tab</a></p>

    <h2 class="push-bottom--half plus-2 medium">Code</h2>
    <CodeSample><Code /></CodeSample>
    <pre class="pre"><code class="code">{`import autocomplete from '@stormid/autocomplete';

autocomplete('.js-autocomplete', { displayTemplate: option => option.label });
`}</code></pre>

    <h2 class="push-bottom--half plus-2 medium">Multiple selection example</h2>
    <iframe style="--height: 375px" class="example" title="Example multiple selection autocomplete" src={'/example/autocomplete/multiple'} />
    <p class="push-bottom align-right"><a href="/example/autocomplete/multiple" rel="noopener" target="_blank">Open in a new tab</a></p>

    <h2 class="push-bottom--half plus-2 medium">Code</h2>
    <CodeSample><MultipleCode /></CodeSample>
    <pre class="pre"><code class="code">{`import autocomplete from '@stormid/autocomplete';

autocomplete('.js-autocomplete', { displayTemplate: option => option.label });
`}</code></pre>
    <p class="push-bottom--double">Multiple selection is set by the <code>multiple</code> attribute on the <code>&lt;select&gt;</code>. Each selected value is submitted under the same field name.</p>

    <h2 class="push-bottom--half plus-2 medium">Dependencies and installation</h2>
    <DependencyTable dependencies={[{ package: '@stormid/autocomplete', installation: 'npm i -S @stormid/autocomplete' }]} />

    <h2 class="push-bottom plus-2 medium">Acceptance criteria</h2>
    <p class="push-bottom--double">The following is a list of example acceptance criteria to test against when using this pattern. These criteria should test that the specific markup requirements are met, and that the autocomplete behaves visually and functionally as expected.</p>

    <h3 class="push-bottom--half plus-1 medium">For validation in developer tools / web inspector</h3>
    <ul class="list list--tick push-bottom--double">
        <li class="list-item">The text <pre class="pre--inline">&lt;input&gt;</pre> element should have an attribute of <pre class="pre--inline">role="combobox"</pre> and a matching <pre class="pre--inline">&lt;label&gt;</pre> element</li>
        <li class="list-item">The combobox should have an <pre class="pre--inline">aria-controls</pre> attribute that matches the ID of the list of options, and an <pre class="pre--inline">aria-expanded</pre> attribute that describes whether the list is shown</li>
        <li class="list-item">The list of options should have an attribute of <pre class="pre--inline">role="listbox"</pre>, and each option should have an attribute of <pre class="pre--inline">role="option"</pre></li>
        <li class="list-item">The highlighted option should be referenced by the <pre class="pre--inline">aria-activedescendant</pre> attribute of the combobox</li>
        <li class="list-item">The selected value should be submitted with the form, using the name of the original <pre class="pre--inline">&lt;select&gt;</pre></li>
        <li class="list-item">In the multiple selection variant, the button to remove each selected option should be an HTML <pre class="pre--inline">&lt;button&gt;</pre> with an accessible name that includes the option, for example 'Remove France'</li>
    </ul>

    <h3 class="push-bottom--half plus-1 medium">For visual validation</h3>
    <ul class="list list--tick push-bottom--double">
        <li class="list-item">The text input should have a clearly visible focus style which meets accessibility contrast requirements</li>
        <li class="list-item">The highlighted option should be clearly visually distinguishable from the other options</li>
        <li class="list-item">The list of options should be hidden until the user types into the input</li>
        <li class="list-item">In the multiple selection variant, each selected option should be visible, and its remove button should be at least 24 by 24 pixels with a clearly visible focus style</li>
    </ul>

    <h3 class="push-bottom--half plus-1 medium">For functional validation</h3>
    <ul class="list list--tick push-bottom--double">
        <li class="list-item">Without JavaScript, the native <pre class="pre--inline">&lt;select&gt;</pre> should be shown and submit the chosen value(s)</li>
        <li class="list-item">The list of options should be filtered to those that contain the text typed into the input, once at least two characters have been typed</li>
        <li class="list-item">The number of available results should be announced to screen readers, and a message should be shown and announced when there are no results</li>
        <li class="list-item">The 'down arrow' and 'up arrow' keys should move the highlight through the options, while keyboard focus stays in the input</li>
        <li class="list-item">The 'Enter' key, or a click, should choose the highlighted option and close the list</li>
        <li class="list-item">The 'Escape' key should close the list without choosing an option</li>
        <li class="list-item">In the single selection variant, the chosen option should be shown in the input</li>
        <li class="list-item">In the multiple selection variant, a chosen option should be removed from the list of options, so it can't be chosen twice</li>
        <li class="list-item">In the multiple selection variant, adding or removing an option should be announced to screen readers</li>
        <li class="list-item">In the multiple selection variant, pressing 'Backspace' in an empty input should remove the last selected option</li>
    </ul>

    <h2 class="push-bottom--half plus-2 medium">References</h2>
    <ul class="list push-bottom--double">
        <li class="list-item"><a href="https://www.w3.org/WAI/ARIA/apg/patterns/combobox/" rel="noopener nofollow">https://www.w3.org/WAI/ARIA/apg/patterns/combobox/</a></li>
        <li class="list-item"><a href="https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-autocomplete-list/" rel="noopener nofollow">https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-autocomplete-list/</a></li>
        <li class="list-item"><a href="https://design-system.service.gov.uk/components/select/" rel="noopener nofollow">https://design-system.service.gov.uk/components/select/</a></li>
        <li class="list-item"><a href="https://webaim.org/standards/wcag/checklist" rel="noopener nofollow">https://webaim.org/standards/wcag/checklist</a></li>
    </ul>
</PatternLayout>;

export default Autocomplete;
