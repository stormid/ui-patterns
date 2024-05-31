import { h } from 'preact';
import ExampleLayout from '@layouts/example';
import Code from './code';

export const title = 'Slider example';

const Slider = () => <ExampleLayout>
    <main class="wrap soft-top">
        <h1 class="visuallyhidden">Slider example</h1>
        <Code />
    </main>
</ExampleLayout>;

export default Slider;