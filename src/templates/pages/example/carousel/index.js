import ExampleLayout from '@layouts/example';
import Code from './code';

export const title = 'Carousel example';
export const bodyClass = 'example-body';

const Carousel = () => <ExampleLayout>
    <main class="wrap soft-top">
        <h1 class="visuallyhidden">Carousel example</h1>
        <Code />
    </main>
</ExampleLayout>;

export default Carousel;
