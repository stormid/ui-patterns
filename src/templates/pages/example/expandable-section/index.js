import { h } from 'preact';
import ExampleLayout from '@layouts/example';
import Code from './code';

export const title = 'Expandable section example';

const ModalSearch = () => <ExampleLayout>
    <main class="wrap soft-top">
        <h1 class="visuallyhidden">Expandable section example</h1>
        <Code />
    </main>
</ExampleLayout>;

export default ModalSearch;