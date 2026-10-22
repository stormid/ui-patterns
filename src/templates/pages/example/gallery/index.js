import ExampleLayout from '@layouts/example';
import Code from './code';

export const title = 'Gallery example';
export const bodyClass = 'example-body';

const GalleryExample = () => <ExampleLayout>
    <main class="wrap soft-top">
        <h1 class="visuallyhidden">Gallery example</h1>
        <Code />
    </main>
</ExampleLayout>;

export default GalleryExample;
