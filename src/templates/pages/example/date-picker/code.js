import { h } from 'preact';

export const Code = () => <form class="form" novalidate>
    <div class="ds_datepicker  js-date-picker">
        <label class="label" for="date">Start date</label>
        <p class="">Use dd/mm/yyyy format. For example, 31/01/2023.</p>
        <div class="ds_input__wrapper">
            <input id="date" name="date" class="input" />
        </div>
    </div>
</form>;

export default Code;