import { h } from 'preact';
import ExampleLayout from '@layouts/example';
import Code from './code';

export const title = 'Form page headings - single question example';
export const bodyClass = 'example-body';

const FormPatternSingle = () => <ExampleLayout>
    <main class="soft-top">
        <Code />
    </main>
</ExampleLayout>;

export default FormPatternSingle;