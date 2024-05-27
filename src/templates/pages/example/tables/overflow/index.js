import { h } from 'preact';
import ExampleLayout from '@layouts/example';
import Code from './code';

export const title = 'Table example with scrollable overflow';
export const bodyClass = 'example-body';

const TableOverflow = () => <ExampleLayout>
    <main class="soft-top soft-sides">
        <Code />
    </main>
</ExampleLayout>;

export default TableOverflow;