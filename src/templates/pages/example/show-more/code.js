import { h, Fragment } from 'preact';

const Code = () => <Fragment>
    <div class="show-more js-show-more">
        <h2 class="show-more__heading">
            Lorem ipsum dolor sit amet
        </h2>
        <p>Aenean id posuere nunc. Donec diam nisl, rhoncus vel faucibus sed, porttitor sit amet ipsum. Donec at venenatis augue. Phasellus consequat lectus non augue vestibulum, at varius diam sagittis. Morbi nec purus augue. Etiam rutrum ullamcorper arcu vitae sollicitudin. Aliquam bibendum suscipit risus, at lacinia tortor efficitur ac.</p>
        <button type="button" class="btn btn--text show-more__btn js-show-more__toggle js-show-more__btn" aria-expanded="false" aria-controls="more-content" aria-label="Show more about Lorem ipsum dolor sit amet">
            Show more...
        </button>
        <div id="more-content" class="show-more__bd js-show-more__block" data-toggle="js-show-more__toggle">
            <p>Aenean id posuere nunc. Donec diam nisl, <button type="button" id="test-focus">rhoncus vel faucibus sed</button>, porttitor sit amet ipsum. Donec at venenatis augue. Phasellus consequat lectus non augue vestibulum, at varius diam sagittis. Morbi nec purus augue. Etiam rutrum ullamcorper arcu vitae sollicitudin. Aliquam bibendum suscipit risus, at lacinia tortor efficitur ac.</p>
            <p>Praesent vitae mi nec mauris vehicula ultricies nec ut felis. Nam vel nisi id nunc efficitur fermentum. Vestibulum mollis enim nec ultrices mattis. Curabitur placerat sed nisl lobortis iaculis. Fusce porttitor massa augue, sit amet faucibus enim finibus nec. Maecenas hendrerit metus in justo commodo viverra.</p>
        </div>
        <button type="button" class="btn btn--text show-more__btn--hide js-show-more__toggle js-show-more__btn-hide" aria-expanded="false" aria-controls="more-content" aria-label="Show less about Lorem ipsum dolor sit amet">
            ...Show less
        </button>
    </div>
</Fragment>;

export default Code;