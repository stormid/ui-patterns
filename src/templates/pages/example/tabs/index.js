import { h } from 'preact';
import ExampleLayout from '@layouts/example';
import Code from './code';

export const title = 'Tabs example';

const Tabs = () => <ExampleLayout>
    <main>
        <Code />
    </main>
</ExampleLayout>;

export default Tabs;