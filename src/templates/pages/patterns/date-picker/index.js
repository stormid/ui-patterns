import { h } from 'preact';
import PatternLayout from '@layouts/pattern';
import Code from '../../example/date-picker/code';
import { render } from 'preact-render-to-string';
import PatternTitle from '@components/pattern-title';
import DependencyTable from '@components/dependency-table';
import { STATUS } from '@constants';

export const title = 'Date picker';

export const status = STATUS.DEVELOPMENT;

const DatePicker = () => <PatternLayout>
    <PatternTitle status={status}>Date picker</PatternTitle>
    <p class="push-bottom--double">Help users enter a date into a form with a calendar interface.</p>
    <h2 class="push-bottom--half plus-2 medium">Guidance</h2>
    <p class="push-bottom">This pattern progressively enhances a text input that a user can enter a date into by adding a selectable calendar interface. The date picker pattern is suitable for date fields that require a user to:</p>
    <ul class="list push-bottom">
        <li class="list__item">pick a date in the near future or recent past</li>
        <li class="list__item">know the exact day of the week, or week of the month, in addition to the date</li>
        <li class="list__item">see dates in relation to other dates</li>
        <li class="list__item">select a date constrained by range</li>
    </ul>
    <p class="push-bottom">This pattern is not recommended for memorable dates (e.g. date of birth), dates from documents or cards (e.g. passport or credit card), or for approximate or partial dates (e.g. January 1970), or relative dates (e.g. 2 days ago).</p>
    
    <h2 class="push-bottom--half plus-2 medium">Example</h2>
    <iframe style="--height: 375px" class="example" title="Example tabs" src={'/example/date-picker'}></iframe>
    <p class="push-bottom align-right"><a href="/example/date-picker" rel="noopener" target="_blank">Open in a new tab</a></p>
    
    <h2 class="push-bottom--half plus-2 medium">Dependencies and installation</h2>
    <DependencyTable dependencies={[{ package: '@scottish-government/pattern-library', installation: 'npm i -S @scottish-government/pattern-library' }]} />
    
    <h2 class="push-bottom--half plus-2 medium">Code</h2>
    <pre class="pre"><code class="code">{`${render(<Code />, null, { pretty: true })}`}</code></pre>
    <pre class="pre"><code class="code">{`import DSDatePicker from '@scottish-government/pattern-library/src/components/date-picker/date-picker';
const datepicker = new DSDatePicker(document.querySelector('.js-date-picker'), { imagePath: '/static/img/' });
return datepicker.init();    
`}</code></pre>
    
    <h2 class="push-bottom plus-2 medium">Acceptance criteria</h2>
    <p class="push-bottom--double">The following is a list of example acceptance criteria to test against when using this pattern. These critera should test that the specific markup requirements are met, and that the date picker behave visually and functionally as expected.</p>

    <h3 class="push-bottom--half plus-1 medium">For validation in developer tools / web inspector</h3>
    <ul class="list list--tick push-bottom--double">
        <li class="list-item">The text <pre class="pre--inline">&lt;input&gt;</pre> element must have a matching <pre class="pre--inline">&lt;label&gt;</pre> element or <pre class="pre--inline">aria-label</pre></li>
        <li class="list-item">All buttons should use an HTML <pre class="pre--inline">&lt;button&gt;</pre> element</li>
        <li class="list-item">Each day in the calendar should have an accessible label describing the full date</li>
    </ul>

    <h3 class="push-bottom--half plus-1 medium">For visual validation</h3>
    <ul class="list list--tick push-bottom--double">
        <li class="list-item">The text <pre class="pre--inline">&lt;input&gt;</pre> element should have a clearly visible focus style which meets accessibility contrast requirements</li>
        <li class="list-item">The date format expected by the text input should be described in the label</li>
        <li class="list-item">Buttons  should have a clearly visible focus style which meets accessibility contrast requirements</li>
        <li class="list-item">Buttons should be appropriately labelled to describe their functionality. If the design requires no visible text, the button should contain a hidden label or an <pre class="pre--inline">aria-label</pre> attribute</li>
    </ul>

    <h3 class="push-bottom--half plus-1 medium">For functional validation</h3>
        <ul class="list list--tick push-bottom--double">
            <li class="list-item">The input must allow the user to enter a date manually without using the calendar interface</li>
            <li class="list-item">The celendar must not be able to interact with the calendar unless they open it</li>
            <li class="list-item">The calendar interface should be reachable and operable using the keyboard only</li>
            <li class="list-item">Focus should move to the selected date or current date if none selected when the calendar opens</li>
            <li class="list-item">The current date, selected date, and focused date should be visually distinguishable from each other</li>
            <li class="list-item">The current date, selected date, and focused date should be visually distinguishable from each other</li>
            <li class="list-item">Space/enter keys should select the focussed date, close calendar, focus back on the calendar button, and update the accessible name of the button to indicate the date</li>
            <li class="list-item">Left/right keys should navigate previous/next days</li>
            <li class="list-item">Up/down keys should navigate to the same day in the previous/next week</li>
            <li class="list-item">it should be possible to close the calendar without selecting a date</li>
        </ul>

    <h2 class="push-bottom--half plus-2 medium">References</h2>
    <ul class="list push-bottom--double">
        <li class="list-item"><a href="https://webaim.org/standards/wcag/checklist" rel="noopener nofollow">https://webaim.org/standards/wcag/checklist</a></li>
        <li class="list-item"><a href="https://designsystem.gov.scot/components/date-picker/" rel="noopener nofollow">https://designsystem.gov.scot/components/date-picker/</a></li>
        <li class="list-item"><a href="https://design-system.service.gov.uk/patterns/dates/" rel="noopener nofollow">https://design-system.service.gov.uk/patterns/dates/</a></li>
        <li class="list-item"><a href="https://design-system.service.gov.uk/components/date-input/" rel="noopener nofollow">https://design-system.service.gov.uk/components/date-input/</a></li>
    </ul>
</PatternLayout>;

export default DatePicker;