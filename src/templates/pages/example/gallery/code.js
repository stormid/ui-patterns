import { Fragment } from 'preact';

export const ITEMS = [
    { id: 'gallery-hills', src: '/static/img/gallery/hills.svg', width: 1600, height: 1000, alt: 'Placeholder image 1', caption: 'Morning over the hills' },
    { id: 'gallery-lighthouse', src: '/static/img/gallery/lighthouse.svg', width: 1000, height: 1400, alt: 'Placeholder image 2', caption: 'The lighthouse at night' },
    { id: 'gallery-skyline', src: '/static/img/gallery/skyline.svg', width: 1600, height: 900, alt: 'Placeholder image 3', caption: 'The city at sunset' },
    { id: 'gallery-apple', src: '/static/img/gallery/apple.svg', width: 1200, height: 1200, alt: 'Placeholder image 4', caption: 'Still life with apple' },
    { id: 'gallery-boat', src: '/static/img/gallery/boat.svg', width: 1600, height: 1067, alt: 'Placeholder image 5', caption: 'Out on the water' },
    { id: 'gallery-tree', src: '/static/img/gallery/tree.svg', width: 900, height: 1350, alt: 'Placeholder image 6', caption: 'The old oak' }
];

const Item = ({ id, src, width, height, alt, caption, index, opensDialog }) => {
    // The first image is in view on load; the rest load as the gallery moves towards them
    const img = <img class="gallery__img" src={src} width={width} height={height} alt={alt} loading={index === 0 ? 'eager' : 'lazy'} />;
    // When the gallery opens in a dialog the dialog's items have the ids, so a link to an item opens the dialog
    return <li id={opensDialog ? undefined : id} class="carousel__slide gallery__slide">
        <figure class="gallery__figure">
            {/* Without JS each image links to its full size image */}
            {opensDialog
                ? <a class="gallery__link js-gallery-modal__trigger" href={src} data-gallery-item={id} aria-haspopup="dialog">{img}</a>
                : img}
            <figcaption class="gallery__caption">{caption}</figcaption>
        </figure>
    </li>;
};

export const Gallery = ({ headingId = 'gallery-heading', inDialog = false, opensDialog = false } = {}) => {
    // In a dialog the dialog is already named by the heading, so the gallery doesn't need to be a region as well
    const Container = inDialog ? 'div' : 'section';
    return <Container class="carousel gallery js-gallery" aria-labelledby={inDialog ? undefined : headingId}>
        <div class="carousel__hd">
            <h2 class="carousel__heading" id={headingId}>Illustrations</h2>
            <div class="gallery__actions">
                <div class="carousel__controls js-carousel__controls" hidden>
                    <p class="gallery__count js-gallery__count"></p>
                    <button type="button" class="carousel__btn js-carousel__prev">
                        <span class="visuallyhidden">Previous</span>
                        <svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 -960 960 960" fill="currentColor"><path d="M400-240 160-480l241-241 43 42-169 169h526v60H275l168 168-43 42Z" /></svg>
                    </button>
                    <button type="button" class="carousel__btn js-carousel__next">
                        <span class="visuallyhidden">Next</span>
                        <svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 -960 960 960" fill="currentColor"><path d="m560-242-43-42 168-168H160v-60h525L516-681l43-42 241 241-240 240Z" /></svg>
                    </button>
                </div>
                {/* A gallery that opens in a dialog is made bigger by opening the dialog, which has its own full screen button */}
                {!opensDialog && <button type="button" class="carousel__btn gallery__fullscreen js-gallery__fullscreen" hidden>
                    <span class="visuallyhidden">Full screen</span>
                    <svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 -960 960 960" fill="currentColor"><path d="M120-120v-200h80v120h120v80H120Zm520 0v-80h120v-120h80v200H640ZM120-640v-200h200v80H200v120h-80Zm640 0v-120H640v-80h200v200h-80Z" /></svg>
                </button>}
            </div>
        </div>
        <div class="carousel__viewport js-carousel__viewport">
            <ul class="carousel__track" role="list">
                {ITEMS.map((item, index) => <Item key={item.id} index={index} opensDialog={opensDialog} {...item} />)}
            </ul>
        </div>
    </Container>;
};

export const GalleryDialog = () => <div id="gallery-modal" class="gallery-modal js-gallery-modal" data-modal-toggle="js-gallery-modal__close" hidden>
    <div class="gallery-modal__dialog" role="dialog" aria-labelledby="gallery-modal-heading">
        <button type="button" class="gallery-modal__close js-gallery-modal__close">
            <span class="visuallyhidden">Close</span>
            <svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" /></svg>
        </button>
        <Gallery headingId="gallery-modal-heading" inDialog />
    </div>
</div>;

// Selecting an image opens the gallery in a dialog at that image
const Code = () => <Fragment>
    <Gallery opensDialog />
    <GalleryDialog />
</Fragment>;

export default Code;
