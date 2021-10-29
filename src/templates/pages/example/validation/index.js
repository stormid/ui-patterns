import { h } from 'preact';
import ExampleLayout from '@layouts/example';
import Code from './code';

export const title = 'Form validation example';

const Validation = () => <ExampleLayout>
    <main>
        <Code />
    </main>
</ExampleLayout>;

export default Validation;