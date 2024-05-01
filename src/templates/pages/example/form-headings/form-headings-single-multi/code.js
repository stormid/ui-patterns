import { h } from 'preact';

export const Code = () => <form class="form js-validate" action="#">
    <fieldset class="fieldset">
        <legend class="legend">
            <h1 class="legend__title plus-3">Your preferences</h1>
            <p class="legend__hint">Please tick at least one option below.</p>
        </legend>
        <span class="error-message push-bottom--half" data-valmsg-for="opts" />
        <div class="checkbox">
            <input class="checkbox__input" id="opt1" name="opts" type="checkbox" data-val="true" data-val-required="Select at least one option" />
            <label class="checkbox__label" for="opt1">Option 1</label>
        </div>
        <div class="checkbox">
            <input class="checkbox__input" id="opt2" name="opts" type="checkbox" data-val="true" data-val-required="Select at least one option" />
            <label class="checkbox__label" for="opt2">Option 2</label>
        </div>
        <div class="checkbox">
            <input class="checkbox__input" id="opt3" name="opts" type="checkbox" data-val="true" data-val-required="Select at least one option" />
            <label class="checkbox__label" for="opt3">Option 3</label>
        </div>
    </fieldset>
    <button type="submit" class="btn">Submit</button>
</form>;

export default Code;