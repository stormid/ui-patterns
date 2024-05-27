import { h } from 'preact';
import ExampleLayout from '@layouts/example';
import Code from './code';

export const title = 'Table example with scrollable overflow and sticky column';
export const bodyClass = 'example-body';

const TableOverflow = () => <ExampleLayout>
    <main class="soft-top soft-sides">
        <Code />
    </main>
</ExampleLayout>;

export default TableOverflow;