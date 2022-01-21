import { h } from 'preact';
import ExampleLayout from '@layouts/example';
import Code from './code';

export const title = 'Show more example';

const ShowMore = () => <ExampleLayout>
    <main>
        <Code />
    </main>
</ExampleLayout>;

export default ShowMore;