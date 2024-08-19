import { h } from 'preact';

export const Code = () => <form class="form" novalidate>
    <fieldset>
        <h1 class="visuallyhidden">Accessible date picker</h1>
        <legend class="legend">
            Start date
            <span class="legend__hint">For example, 31 01 2023</span>
        </legend>
        <div class="ds_datepicker ds_datepicker--multiple js-date-picker" data-module="ds-datepicker">
            <div class="ds_datepicker__input-wrapper">
                <div>
                    <label class="label" for="day">Day</label>
                    <input id="day" name="day" class="input ds_input ds_input--day js-datepicker-date" />
                </div>
                <div>
                    <label class="label" for="month">Month</label>
                    <input id="month" name="month" class="input ds_input ds_input--month js-datepicker-month" />
                </div>
                <div>
                    <label class="label" for="year">Year</label>
                    <input id="year" name="year" class="input ds_input ds_input--year js-datepicker-year" />
                </div>
            </div>
        </div>
    </fieldset>
</form>;

export default Code;