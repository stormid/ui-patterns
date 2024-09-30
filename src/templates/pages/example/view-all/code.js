import { h, Fragment } from 'preact';

const Code = () => <Fragment>
    <div class="expand-all js-expand-all">
        <button type="button" class="expandable-section__btn-all js-expandable-section__btn-all" aria-expanded="false">
            <span class="expandable-section__btn-all-view">View all <span class="visually-hidden">sections about Lorem Ipsum</span></span>
            <span class="expandable-section__btn-all-hide">Hide all <span class="visually-hidden">sections about Lorem Ipsum</span></span>
        </button>
        <div class="expandable-section">
            <h2 class="expandable-section__heading">
                <button type="button" class="expandable-section__btn js-expandable-section__btn-1" aria-expanded="false" aria-controls="section-1">
                    Section title
                </button>
            </h2>
            <div id="section-1" class="expandable-section__bd js-expandable-section-all" data-toggle="js-expandable-section__btn-1">
                <p>Aenean id posuere nunc. Donec diam nisl, rhoncus vel faucibus sed, porttitor sit amet ipsum. Donec at venenatis augue. Phasellus consequat lectus non augue vestibulum, at varius diam sagittis. Morbi nec purus augue. Etiam rutrum ullamcorper arcu vitae sollicitudin. Aliquam bibendum suscipit risus, at lacinia tortor efficitur ac.</p>
                <p>Praesent vitae mi nec mauris <button type="button" id="testfocus">vehicula ultricies nec ut felis.</button> Nam vel nisi id nunc efficitur fermentum. Vestibulum mollis enim nec ultrices mattis. Curabitur placerat sed nisl lobortis iaculis. Fusce porttitor massa augue, sit amet faucibus enim finibus nec. Maecenas hendrerit metus in justo commodo viverra.</p>
            </div>
        </div>
        <div class="expandable-section">
            <h2 class="expandable-section__heading">
                <button type="button" class="expandable-section__btn js-expandable-section__btn-2" aria-expanded="false" aria-controls="section-2">
                    Section title
                </button>
            </h2>
            <div id="section-2" class="expandable-section__bd js-expandable-section-all" data-toggle="js-expandable-section__btn-2">
                <p>Aenean id posuere nunc. Donec diam nisl, rhoncus vel faucibus sed, porttitor sit amet ipsum. Donec at venenatis augue. Phasellus consequat lectus non augue vestibulum, at varius diam sagittis. Morbi nec purus augue. Etiam rutrum ullamcorper arcu vitae sollicitudin. Aliquam bibendum suscipit risus, at lacinia tortor efficitur ac.</p>
                <p>Praesent vitae mi nec mauris vehicula ultricies nec ut felis. Nam vel nisi id nunc efficitur fermentum. Vestibulum mollis enim nec ultrices mattis. Curabitur placerat sed nisl lobortis iaculis. Fusce porttitor massa augue, sit amet faucibus enim finibus nec. Maecenas hendrerit metus in justo commodo viverra.</p>
            </div>
        </div>
        <div class="expandable-section">
            <h2 class="expandable-section__heading">
                <button type="button" class="expandable-section__btn js-expandable-section__btn-3" aria-expanded="false" aria-controls="section-3">
                    Section title
                </button>
            </h2>
            <div id="section-3" class="expandable-section__bd js-expandable-section-all" data-toggle="js-expandable-section__btn-3">
                <p>Aenean id posuere nunc. Donec diam nisl, rhoncus vel faucibus sed, porttitor sit amet ipsum. Donec at venenatis augue. Phasellus consequat lectus non augue vestibulum, at varius diam sagittis. Morbi nec purus augue. Etiam rutrum ullamcorper arcu vitae sollicitudin. Aliquam bibendum suscipit risus, at lacinia tortor efficitur ac.</p>
                <p>Praesent vitae mi nec mauris vehicula ultricies nec ut felis. Nam vel nisi id nunc efficitur fermentum. Vestibulum mollis enim nec ultrices mattis. Curabitur placerat sed nisl lobortis iaculis. Fusce porttitor massa augue, sit amet faucibus enim finibus nec. Maecenas hendrerit metus in justo commodo viverra.</p>
            </div>
        </div>
        <div class="expandable-section">
            <h2 class="expandable-section__heading">
                <button type="button" class="expandable-section__btn js-expandable-section__btn-4" aria-expanded="false" aria-controls="section-4">
                    Section title
                </button>
            </h2>
            <div id="section-4" class="expandable-section__bd js-expandable-section-all" data-toggle="js-expandable-section__btn-4">
                <p>Aenean id posuere nunc. Donec diam nisl, rhoncus vel faucibus sed, porttitor sit amet ipsum. Donec at venenatis augue. Phasellus consequat lectus non augue vestibulum, at varius diam sagittis. Morbi nec purus augue. Etiam rutrum ullamcorper arcu vitae sollicitudin. Aliquam bibendum suscipit risus, at lacinia tortor efficitur ac.</p>
                <p>Praesent vitae mi nec mauris vehicula ultricies nec ut felis. Nam vel nisi id nunc efficitur fermentum. Vestibulum mollis enim nec ultrices mattis. Curabitur placerat sed nisl lobortis iaculis. Fusce porttitor massa augue, sit amet faucibus enim finibus nec. Maecenas hendrerit metus in justo commodo viverra.</p>
            </div>
        </div>
    </div>
</Fragment>;

export default Code;