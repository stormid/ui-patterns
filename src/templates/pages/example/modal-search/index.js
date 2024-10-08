import { h } from 'preact';
import ExampleLayout from '@layouts/example';
import Code from './code';

export const title = 'Modal search example';
export const bodyClass = 'example-body';

const ModalSearch = () => <ExampleLayout>
    <header class="modal-search__container">
        <div class="modal-search">
            <Code />
        </div>
    </header>
    <main class="main">
        <h1>Lorem ipsum</h1>
        <p>Duis pulvinar ipsum in lorem maximus faucibus. Maecenas pharetra placerat ex, id elementum felis dignissim sed. <button id="test-focus" type="button">Fusce gravida</button> sit amet sapien in interdum. Nam id leo gravida eros gravida elementum. Nulla eu dui posuere, efficitur tellus id, dapibus dolor. Duis tincidunt metus sed condimentum pharetra. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper, nibh vel finibus rutrum, urna augue ultricies velit, sed feugiat metus felis in libero.</p>
        <p>Duis pulvinar ipsum in lorem maximus faucibus. Maecenas pharetra placerat ex, id elementum felis dignissim sed. <a href="#">Fusce gravida</a> sit amet sapien in interdum. Nam id leo gravida eros gravida elementum. Nulla eu dui posuere, efficitur tellus id, dapibus dolor. Duis tincidunt metus sed condimentum pharetra. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper, nibh vel finibus rutrum, urna augue ultricies velit, sed feugiat metus felis in libero.</p>
        <p>Duis pulvinar ipsum in lorem maximus faucibus. Maecenas pharetra placerat ex, id elementum felis dignissim sed. <a href="#">Fusce gravida</a> sit amet sapien in interdum. Nam id leo gravida eros gravida elementum. Nulla eu dui posuere, efficitur tellus id, dapibus dolor. Duis tincidunt metus sed condimentum pharetra. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper, nibh vel finibus rutrum, urna augue ultricies velit, sed feugiat metus felis in libero.</p>
        <p>Duis pulvinar ipsum in lorem maximus faucibus. Maecenas pharetra placerat ex, id elementum felis dignissim sed. <a href="#">Fusce gravida</a> sit amet sapien in interdum. Nam id leo gravida eros gravida elementum. Nulla eu dui posuere, efficitur tellus id, dapibus dolor. Duis tincidunt metus sed condimentum pharetra. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper, nibh vel finibus rutrum, urna augue ultricies velit, sed feugiat metus felis in libero.</p>
        <p>Duis pulvinar ipsum in lorem maximus faucibus. Maecenas pharetra placerat ex, id elementum felis dignissim sed. <a href="#">Fusce gravida</a> sit amet sapien in interdum. Nam id leo gravida eros gravida elementum. Nulla eu dui posuere, efficitur tellus id, dapibus dolor. Duis tincidunt metus sed condimentum pharetra. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper, nibh vel finibus rutrum, urna augue ultricies velit, sed feugiat metus felis in libero.</p>
        <p>Duis pulvinar ipsum in lorem maximus faucibus. Maecenas pharetra placerat ex, id elementum felis dignissim sed. <a href="#">Fusce gravida</a> sit amet sapien in interdum. Nam id leo gravida eros gravida elementum. Nulla eu dui posuere, efficitur tellus id, dapibus dolor. Duis tincidunt metus sed condimentum pharetra. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper, nibh vel finibus rutrum, urna augue ultricies velit, sed feugiat metus felis in libero.</p>
        <p>Duis pulvinar ipsum in lorem maximus faucibus. Maecenas pharetra placerat ex, id elementum felis dignissim sed. <a href="#">Fusce gravida</a> sit amet sapien in interdum. Nam id leo gravida eros gravida elementum. Nulla eu dui posuere, efficitur tellus id, dapibus dolor. Duis tincidunt metus sed condimentum pharetra. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper, nibh vel finibus rutrum, urna augue ultricies velit, sed feugiat metus felis in libero.</p>
        <p>Duis pulvinar ipsum in lorem maximus faucibus. Maecenas pharetra placerat ex, id elementum felis dignissim sed. <a href="#">Fusce gravida</a> sit amet sapien in interdum. Nam id leo gravida eros gravida elementum. Nulla eu dui posuere, efficitur tellus id, dapibus dolor. Duis tincidunt metus sed condimentum pharetra. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper, nibh vel finibus rutrum, urna augue ultricies velit, sed feugiat metus felis in libero.</p>
        
    </main>
</ExampleLayout>;

export default ModalSearch;