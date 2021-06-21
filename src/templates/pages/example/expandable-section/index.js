import { h } from 'preact';
import ExampleLayout from '@layouts/example';

export const title = 'Expandable section example';

const ModalSearch = () => <ExampleLayout>
    <main class="wrap soft-top">
        <h1 class="visuallyhidden">Expandable section example</h1>
        <div class="expandable-section">
            <h2 class="expandable-section__heading">
                <button class="expandable-section__btn js-expandable-section__btn-1" aria-expanded="false" aria-controls="section-1">
                    Section title
                </button>
            </h2>
            <div id="section-1" class="expandable-section__bd js-expandable-section" data-toggle="js-expandable-section__btn-1">
                <p>Aenean id posuere nunc. Donec diam nisl, rhoncus vel faucibus sed, porttitor sit amet ipsum. Donec at venenatis augue. Phasellus consequat lectus non augue vestibulum, at varius diam sagittis. Morbi nec purus augue. Etiam rutrum ullamcorper arcu vitae sollicitudin. Aliquam bibendum suscipit risus, at lacinia tortor efficitur ac.</p>
                <p>Praesent vitae mi nec mauris vehicula ultricies nec ut felis. Nam vel nisi id nunc efficitur fermentum. Vestibulum mollis enim nec ultrices mattis. Curabitur placerat sed nisl lobortis iaculis. Fusce porttitor massa augue, sit amet faucibus enim finibus nec. Maecenas hendrerit metus in justo commodo viverra.</p>
            </div>
        </div>
        <div class="expandable-section">
            <h2 class="expandable-section__heading">
                <button class="expandable-section__btn js-expandable-section__btn-2" aria-expanded="false" aria-controls="section-2">
                    Section title
                </button>
            </h2>
            <div id="section-2" class="expandable-section__bd js-expandable-section" data-toggle="js-expandable-section__btn-2">
                <p>Aenean id posuere nunc. Donec diam nisl, rhoncus vel faucibus sed, porttitor sit amet ipsum. Donec at venenatis augue. Phasellus consequat lectus non augue vestibulum, at varius diam sagittis. Morbi nec purus augue. Etiam rutrum ullamcorper arcu vitae sollicitudin. Aliquam bibendum suscipit risus, at lacinia tortor efficitur ac.</p>
                <p>Praesent vitae mi nec mauris vehicula ultricies nec ut felis. Nam vel nisi id nunc efficitur fermentum. Vestibulum mollis enim nec ultrices mattis. Curabitur placerat sed nisl lobortis iaculis. Fusce porttitor massa augue, sit amet faucibus enim finibus nec. Maecenas hendrerit metus in justo commodo viverra.</p>
            </div>
        </div>
    </main>
</ExampleLayout>;

export default ModalSearch;