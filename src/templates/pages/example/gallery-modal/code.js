import { Fragment } from 'preact';
import Gallery, { ITEMS } from '../gallery/code';

const Code = () => <Fragment>
    <h2 class="gallery-thumbs__heading">Illustrations</h2>
    <ul class="gallery-thumbs" role="list">
        {ITEMS.map(({ id, src, width, height, alt }) => <li key={id}>
            {/* Without JS each thumbnail links to its full size image */}
            <a class="gallery-thumbs__link js-gallery-modal__trigger" href={src} data-gallery-item={id} aria-haspopup="dialog">
                <img class="gallery-thumbs__img" src={src} width={width} height={height} alt={alt} loading="lazy" />
            </a>
        </li>)}
    </ul>
    <div id="gallery-modal" class="gallery-modal js-gallery-modal" data-modal-toggle="js-gallery-modal__close" hidden>
        <div class="gallery-modal__dialog" role="dialog" aria-labelledby="gallery-modal-heading">
            <button type="button" class="carousel__btn gallery-modal__close js-gallery-modal__close">
                <span class="visuallyhidden">Close</span>
                <svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" /></svg>
            </button>
            <Gallery headingId="gallery-modal-heading" inDialog />
        </div>
    </div>
</Fragment>;

export default Code;
