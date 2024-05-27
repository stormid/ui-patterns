import { h } from 'preact';
import ExampleLayout from '@layouts/example';
import Code from './code';

export const title = 'Expandable section example';
export const bodyClass = 'example-body';

const ExpandableSection = () => <ExampleLayout>
    <main class="wrap soft-top">
        <h1 class="visuallyhidden">Expandable section example</h1>
        <Code />
    </main>
</ExampleLayout>;

export default ExpandableSection;