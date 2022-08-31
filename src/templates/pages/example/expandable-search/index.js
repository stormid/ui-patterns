import { h } from 'preact';
import ExampleLayout from '@layouts/example';
import Code from './code';

export const title = 'Expandable search example';

const ExpandableSearch = () => <ExampleLayout>
    <header class="expandable-search__header">
        <Code />
    </header>
    <main tabindex="0" aria-label="Next focusable item on the page">

    </main>
</ExampleLayout>;

export default ExpandableSearch;