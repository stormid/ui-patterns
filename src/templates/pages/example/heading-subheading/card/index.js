import { h } from 'preact';
import ExampleLayout from '@layouts/example';
import Code from './code';

export const title = 'Heading with subheading example card';

const HeadingSubheadingCard = () => <ExampleLayout>
    <main class="wrap soft-top">
        <Code />
    </main>
</ExampleLayout>;

export default HeadingSubheadingCard;