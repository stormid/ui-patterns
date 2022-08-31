import { h } from 'preact';
import initFormValidation from '../../../src/js/modules/form-validation';
import FormValidation from '../../../src/templates/pages/example/form-validation';
import { render } from 'preact-render-to-string';

describe('Form validation > mark up', () => {

    beforeAll(() => {
        document.body.innerHTML = render(<FormValidation />);
        initFormValidation();
    });

    it('All inputs must have associated labels', () => {
        const inputs = Array.from(document.querySelectorAll('input'));
        for (const input of inputs) {
            expect(document.querySelector(`[for=${input.getAttribute('id')}]`)).not.toBeNull();
        }
    });

    it('Required inputs should have an aria-required attribute', () => {
        const inputs = Array.from(document.querySelectorAll('input'));
        for (const input of inputs) {
            if (input.hasAttribute('data-val-required')){
                expect(input.hasAttribute('aria-required')).toEqual(true);
            }
        }
    });

});

describe('Form validation > errors', () => {

    beforeAll(() => {
        document.body.innerHTML = render(<FormValidation />);
        initFormValidation();
        document.querySelector('form').submit();
    });

    it('Error messages should not be live regions', () => {
        const messages = Array.from(document.querySelectorAll('.error-message'));
        for (const message of messages) {
            expect(message.getAttribute('role')).toBeNull();
            expect(message.getAttribute('aria-live')).toBeNull();
        }
    });

    it('Error messages should be associated with a field via an aria-describedby attribute on the input', () => {
        const messages = Array.from(document.querySelectorAll('.error-message'));
        for (const message of messages) {
            expect(document.querySelector(`[aria-describedby=${message.getAttribute('id')}]`).tagName).toEqual('INPUT');
        }
    });

    it('Add aria-invalid="true" to the field when error is triggered', () => {
        const inputs = Array.from(document.querySelectorAll('input'));
        for (const input of inputs) {
            if (input.hasAttribute('data-val-required')){
                expect(input.getAttribute('aria-invalid')).toEqual('true');
            }
        }
    });


});