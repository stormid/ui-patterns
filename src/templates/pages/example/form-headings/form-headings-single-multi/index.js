import { h } from 'preact';
import ExampleLayout from '@layouts/example';
import Code from './code';

export const title = 'Form page heading - single question multi choice';
export const bodyClass = 'example-body';

const FormPatternSingleMulti = () => <ExampleLayout>
    <main class="soft-top">
        <Code />
    </main>
</ExampleLayout>;

export default FormPatternSingleMulti;