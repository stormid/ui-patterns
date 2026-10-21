import ExampleLayout from '@layouts/example';
import Gallery from './code';

export const title = 'Gallery example';
export const bodyClass = 'example-body';

const GalleryExample = () => <ExampleLayout>
    <main class="wrap soft-top">
        <h1 class="visuallyhidden">Gallery example</h1>
        <Gallery />
    </main>
</ExampleLayout>;

export default GalleryExample;
