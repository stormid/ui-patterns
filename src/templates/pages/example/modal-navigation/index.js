import { h } from 'preact';
import ExampleLayout from '@layouts/example';
import Code from './code';

export const title = 'Modal navigation example';

const ModalSearch = () => <ExampleLayout>
    <header class="modal-search__container">
        <div class="modal-search">
            <Code />
        </div>
    </header>
    <main tabindex="0" aria-label="Next focusable item on the page">

    </main>
</ExampleLayout>;

export default ModalSearch;