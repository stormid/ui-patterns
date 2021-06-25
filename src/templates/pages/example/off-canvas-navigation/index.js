import { h } from 'preact';
import ExampleLayout from '@layouts/example';
import Code from './code';

export const title = 'Off canvas navigation example';

const OffCanvasNav = () => <ExampleLayout>
    <header class="off-canvas-nav__container">
        <div class="off-canvas-nav">
            <Code />
        </div>
    </header>
    <main tabindex="0" aria-label="Next focusable item on the page">

    </main>
</ExampleLayout>;

export default OffCanvasNav;