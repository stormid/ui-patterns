import { h } from 'preact';

export const Code = () => <form class="form js-validate" action="#">
    <h1><label for="fname" class="label plus-3 push-bottom--half">First Name</label></h1>
    <span class="error-message" data-valmsg-for="fname" />
    <input data-val="true" data-val-required="First name must not be empty" autocomplete="given-name" class="input push-bottom--double" id="fname" name="fname" aria-required="true" />
    <button type="submit" class="btn">Submit</button>
</form>;

export default Code;