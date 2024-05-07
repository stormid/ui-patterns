import { h } from 'preact';
import ExampleLayout from '@layouts/example';
import Code from './code';

export const title = 'Form validation example';
export const bodyClass = 'example-body';

const FormValidation = () => <ExampleLayout>
    <main class="soft-top">
        <Code />
    </main>
</ExampleLayout>;

export default FormValidation;