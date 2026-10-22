import ExampleLayout from '@layouts/example';
import Code from './code';

export const title = 'Gallery in a dialog example';
export const bodyClass = 'example-body';

const GalleryModalExample = () => <ExampleLayout>
    <main class="wrap soft-top">
        <h1 class="visuallyhidden">Gallery in a dialog example</h1>
        <Code />
    </main>
</ExampleLayout>;

export default GalleryModalExample;
