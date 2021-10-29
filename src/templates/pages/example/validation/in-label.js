import { h } from 'preact';
import ExampleLayout from '@layouts/example';
// import Code from './code';

export const title = 'Form validation example';

const Validation = () => <ExampleLayout>
    <main>
    <form action="#" class="form">
    <div class="visually-hidden" role="alert" data-error-summary></div>
    
    <div class="push-bottom">
        <label class="label" for="Email">
            <span class="label__text">Email</span>
            <span class="error-message" data-valmsg-for="Email"></span>
        </label>
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
        <span class="error-message" data-valmsg-for="Passphrase"></span>
        </label>
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
</form>;
    </main>
</ExampleLayout>;

export default Validation;