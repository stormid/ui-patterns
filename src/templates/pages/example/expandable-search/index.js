import { h } from 'preact';
import ExampleLayout from '@layouts/example';
import Code from './code';

export const title = 'Expandable search example';
export const bodyClass = 'example-body';

const ExpandableSearch = () => <ExampleLayout>
    <header class="expandable-search__header">
        <Code />
    </header>
    <main class="main">
        <h1>Lorem ipsum</h1>
        <p>Duis pulvinar ipsum in lorem maximus faucibus. Maecenas pharetra placerat ex, id elementum felis dignissim sed. <button type="button">Fusce gravida</button> sit amet sapien in interdum. Nam id leo gravida eros gravida elementum. Nulla eu dui posuere, efficitur tellus id, dapibus dolor. Duis tincidunt metus sed condimentum pharetra. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper, nibh vel finibus rutrum, urna augue ultricies velit, sed feugiat metus felis in libero.</p>
    </main>
</ExampleLayout>;

export default ExpandableSearch;