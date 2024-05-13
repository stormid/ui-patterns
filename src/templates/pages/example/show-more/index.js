import { h } from 'preact';
import ExampleLayout from '@layouts/example';
import Code from './code';

export const title = 'Expandable section example';

const ShowMore = () => <ExampleLayout>
    <main class="wrap soft-top">
        <h1 class="visuallyhidden">Show more example</h1>
        <Code />
    </main>
</ExampleLayout>;

export default ShowMore;