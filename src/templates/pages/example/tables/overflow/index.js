import { h } from 'preact';
import ExampleLayout from '@layouts/example';
import Code from './code';

export const title = 'Table example with scrollable overflow';
export const bodyClass = 'example-body';

const TableOverflow = () => <ExampleLayout>
    <main class="soft-top soft-sides">
        <h1 class="visually-hidden">Table with scrolling overflow</h1>
        <Code />
    </main>
</ExampleLayout>;

export default TableOverflow;