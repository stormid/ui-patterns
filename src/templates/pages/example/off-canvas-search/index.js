import { h } from 'preact';
import ExampleLayout from '@layouts/example';
import Code from './code';

export const title = 'Off-canvas search example';

const ModalSearch = () => <ExampleLayout>
    <header class="off-canvas-search__header">
        <Code />
    </header>
    <main tabindex="0" aria-label="Next focusable item on the page">

    </main>
</ExampleLayout>;

export default ModalSearch;