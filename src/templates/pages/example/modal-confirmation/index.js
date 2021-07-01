import { h } from 'preact';
import ExampleLayout from '@layouts/example';
import Code from './code';

export const title = 'Modal confirmation  example';

const ModalConfirmation = () => <ExampleLayout>
    <main>
        <Code />
    </main>
</ExampleLayout>;

export default ModalConfirmation;