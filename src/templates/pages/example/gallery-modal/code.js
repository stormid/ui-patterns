import { Fragment } from 'preact';
import { GalleryDialog, ITEMS } from '../gallery/code';

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
    <GalleryDialog />
</Fragment>;

export default Code;
