import { h } from 'preact';
import ExampleLayout from '@layouts/example';
import Code from './code';

export const title = 'Table example - responsive';
export const bodyClass = 'example-body';

const TableResponsive = () => <ExampleLayout>
    <main class="soft-top soft-sides">
        <h1 class="visually-hidden">Table responsive example</h1>
        <Code />
    </main>
</ExampleLayout>;

export default TableResponsive;