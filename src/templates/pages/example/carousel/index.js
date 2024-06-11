import { h } from 'preact';
import ExampleLayout from '@layouts/example';
import Code from './code';

export const title = 'Carousel example';

const Carousel = () => <ExampleLayout>
    <main class="wrap soft-top">
        <h1 class="visuallyhidden">Carousel example</h1>
        <Code />
    </main>
</ExampleLayout>;

export default Carousel;