import { h } from 'preact';
import ExampleLayout from '@layouts/example';
import Code from './code';

export const title = 'Tabs example';
export const bodyClass = 'example-body';

const Tabs = () => <ExampleLayout>
    <main>
        <Code />
    </main>
</ExampleLayout>;

export default Tabs;