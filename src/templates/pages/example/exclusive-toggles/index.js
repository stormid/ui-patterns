import { h } from 'preact';
import ExampleLayout from '@layouts/example';
import { OffCanvasNav, OffCanvasSearch } from './code';

export const title = 'Exclusive toggles example';

const ExclusiveToggles = () => <ExampleLayout>
    <header class="exclusive-toggles__container">
        <OffCanvasSearch />
        <OffCanvasNav />
    </header>
    <main tabindex="0" aria-label="Next focusable item on the page">

    </main>
</ExampleLayout>;

export default ExclusiveToggles;