import { h } from 'preact';
import ExampleLayout from '@layouts/example';
import Code from './code';

export const title = 'Full screen navigation example';

const ModalFullScreenNav = () => <ExampleLayout>
    <header class="full-screen-nav__header">
        <div class="full-screen-nav__header-inner">
            <Code />
        </div>
    </header>
    <main tabindex="0" aria-label="Next focusable item on the page">

    </main>
</ExampleLayout>;

export default ModalFullScreenNav;