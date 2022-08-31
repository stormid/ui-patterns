import { h } from 'preact';

export const Code = () => <form class="form js-validate" action="#">
    <p class="push-bottom">All fields are required unless marked as optional.</p>
    <fieldset class="fieldset">
        <legend class="legend">Your details</legend>
        <div class="form-row">
            <label for="fname" class="label">First Name</label>
            <span class="error-message" data-valmsg-for="fname" />
            <input data-val="true" data-val-required="First name must not be empty" autocomplete="given-name" class="input" id="fname" name="fname" aria-required="true" />
        </div>
        <div class="form-row">
            <label for="lname" class="label">Last Name</label>
            <span class="error-message" data-valmsg-for="lname" />
            <input data-val="true" data-val-required="Last name must not be empty" autocomplete="family-name" class="input" id="lname" name="lname" aria-required="true" />
        </div>
        <div class="form-row">
            <label for="aka" class="label">Also known as <span class="label__hint">Optional</span></label>
            <input class="input" id="aka" autocomplete="nickname " name="aka" />
        </div>
        <div class="form-row">
            <label for="email" class="label">Email</label>
            <span class="error-message" data-valmsg-for="email" />
            <input data-val="true" data-val-required="Email must not be empty" data-val-email="Email must be correct format" class="input" type="email" id="email" autocomplete="email" name="email" />
        </div>
    </fieldset>
    <fieldset class="fieldset">
        <legend class="legend">Your preferences</legend>
        <div class="push-bottom--half">Please tick at least one option below.</div>
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
        <div class="checkbox">
            <input class="checkbox__input" id="opt4" name="opts" type="checkbox" data-val="true" data-val-required="Select at least one option" />
            <label class="checkbox__label" for="opt4">Option 4</label>
        </div>
        <div class="checkbox">
            <input class="checkbox__input" id="opt5" name="opts" type="checkbox" data-val="true" data-val-required="Select at least one option" />
            <label class="checkbox__label" for="opt5">Option 5</label>
        </div>
    </fieldset>
    <fieldset class="fieldset">
        <legend class="legend">Terms and conditions</legend>
        <div class="checkbox">
            <input data-val="true" data-val-required="You must agree to proceed" class="checkbox__input" id="tcs" name="tcs" type="checkbox" />
            <label class="checkbox__label" for="tcs">
                I have read and agree to the <a href="#">terms and conditions</a>
            </label>
            <span class="field-validation-error" data-valmsg-for="tcs" />
        </div>
    </fieldset>
    <button type="submit" class="btn">Submit</button>
</form>;

export default Code;