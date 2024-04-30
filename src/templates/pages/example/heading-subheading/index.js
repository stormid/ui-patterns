import { h } from 'preact';
import ExampleLayout from '@layouts/example';
import {CodeHeader, CodeCard} from './code';

export const title = 'Heading with subheading example';

const HeadingSubheading = () => <ExampleLayout>
    <main class="wrap soft-top">
        <h1>Heading with sub heading examples</h1>
        <p>The following are examples of different scenarios where you might need to display a header followed by a subheading or tagline</p>
        <h2>Hero or page header areas</h2>
        <CodeHeader />
        <h2>Cards</h2>
        <CodeCard />
    </main>
</ExampleLayout>;

export default HeadingSubheading;