import { h } from 'preact';
import ExampleLayout from '@layouts/example';

export const title = 'Form validation example';

const Validation = () => <ExampleLayout>
    <main>
        <form action="#" class="form js-aria-describedby">
            <div class="visually-hidden" role="alert" data-error-summary></div>
    
            <div class="push-bottom">
                <label class="label" for="Email">
                    <span class="label__text">Email</span>
                </label>
                <span class="error-message" data-valmsg-for="Email"></span>
                <input
                    class="input"
                    type="email"
                    data-val="true"
                    data-val-email="'Email' is not a valid email address."
                    data-val-required="'Email' must not be empty."
                    id="Email"
                    name="Email"
                />
            </div>
            <div class="push-bottom">
                <label class="label" for="Passphrase">
                    <span class="label__text">Passphrase</span>
                </label>
                <span class="error-message" data-valmsg-for="Passphrase"></span>
                <input
                    class="input"
                    type="password"
                    data-val="true"
                    data-val-required="'Passphrase' must not be empty."
                    id="Passphrase"
                    name="Passphrase"
                />
            </div>
            <button type="submit" class="btn">Log in</button>
        </form>
    </main>
</ExampleLayout>;

export default Validation;