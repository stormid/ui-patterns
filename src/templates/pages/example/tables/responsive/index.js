import { h } from 'preact';
import ExampleLayout from '@layouts/example';
import Code from './code';

export const title = 'Table example - responsive';

const TableResponsive = () => <ExampleLayout>
    <main class="soft-top soft-sides">
        <Code />
    </main>
</ExampleLayout>;

export default TableResponsive;