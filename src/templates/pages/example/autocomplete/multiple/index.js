import ExampleLayout from '@layouts/example';
import Code from './code';

export const title = 'Multiple selection autocomplete example';
export const bodyClass = 'example-body';

const AutocompleteMultiple = () => <ExampleLayout>
    <main class="soft-top">
        <Code />
    </main>
</ExampleLayout>;

export default AutocompleteMultiple;
