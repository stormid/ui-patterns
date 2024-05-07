import { h } from 'preact';
import ExampleLayout from '@layouts/example';
import Code from './code';

export const title = 'Modal confirmation  example';
export const bodyClass = 'example-body';

const ModalConfirmation = () => <ExampleLayout>
    <main>
        <Code />
    </main>
</ExampleLayout>;

export default ModalConfirmation;