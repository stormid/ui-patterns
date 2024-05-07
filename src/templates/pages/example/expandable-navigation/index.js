import { h } from 'preact';
import ExampleLayout from '@layouts/example';
import Code from './code';

export const title = 'Expandable navigation example';
export const bodyClass = 'example-body';

const OffCanvasNav = () => <ExampleLayout>
    <header class="expandable-nav__container">
        <div class="expandable-nav">
            <Code />
        </div>
    </header>
    <main class="example__main" aria-label="Next focusable item on the page">
        <h1>HTML Ipsum Presents</h1>
        <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>
        <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. <a href="#">Donec eu libero sit</a> amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>
    </main>
</ExampleLayout>;

export default OffCanvasNav;