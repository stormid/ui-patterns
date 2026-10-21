import ExampleLayout from '@layouts/example';
import Code from './code';

export const title = 'Autocomplete example';
export const bodyClass = 'example-body';

const Autocomplete = () => <ExampleLayout>
    <main class="soft-top">
        <Code />
    </main>
</ExampleLayout>;

export default Autocomplete;
