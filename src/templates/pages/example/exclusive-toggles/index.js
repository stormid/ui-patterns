import { h } from 'preact';
import ExampleLayout from '@layouts/example';
import Code from './code';

export const title = 'Exclusive toggles example';

const ExclusiveToggles = () => <ExampleLayout>
    <Code />
    <main tabindex="0" aria-label="Next focusable item on the page">

    </main>
</ExampleLayout>;

export default ExclusiveToggles;