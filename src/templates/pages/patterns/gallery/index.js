import PatternLayout from '@layouts/pattern';
import GalleryCode from '../../example/gallery/code';
import ModalCode from '../../example/gallery-modal/code';
import CodeSample from '@components/code-sample';
import PatternTitle from '@components/pattern-title';
import DependencyTable from '@components/dependency-table';
import { STATUS } from '@constants';

export const title = 'Gallery';

export const status = STATUS.DEVELOPMENT;

const GalleryPattern = () => <PatternLayout>
    <PatternTitle status={status}>Gallery</PatternTitle>
    <p class="push-bottom--double">A set of images shown one at a time, that users can move through with previous and next buttons, by swiping, or by following a link to a single image. A gallery can be part of the page, opening in a dialog to show the images larger, or opened in a dialog from a set of thumbnails.</p>

    <h2 class="push-bottom--half plus-2 medium">Guidance</h2>
    <p class="push-bottom">A gallery is a <a href="/patterns/carousel">carousel</a> that shows one item at a time, and is built on the carousel pattern. Follow the carousel guidance: the gallery is a named region containing a simple list, every item stays available to screen readers, the previous and next buttons come before the list and use <code>aria-disabled</code> at the start and end, and the gallery never moves on its own.</p>
    <p class="push-bottom">A gallery adds four things to the carousel:</p>
    <ul class="list push-bottom">
        <li class="list-item">A visible count of the current position, such as '3 of 6'. It is plain text, not a live region, so it is not announced as the gallery moves. Screen reader users can read it, and every image is reachable in the list.</li>
        <li class="list-item">Each item has an <code>id</code>, so a link can go straight to it. When the gallery opens in a dialog, only the items in the dialog have ids. As the user moves through the gallery the address is updated to the current item, without adding to the browser history, so the address can be shared and the back button still leaves the page.</li>
        <li class="list-item">A full screen button, using the Fullscreen API. A gallery in the page that opens in a dialog doesn't need one, as the dialog has its own. It is only shown where full screen is supported, which does not include iPhone, and it uses <code>aria-pressed</code> to show whether full screen is on.</li>
        <li class="list-item">The images next to the current one are loaded before they move into view. Native lazy loading only loads an image once it is in view, which would leave a blank space each time the gallery moved.</li>
    </ul>
    <p class="push-bottom">To show a gallery in a dialog, put it in a <a href="/patterns/modal-search">modal</a> and open it from the images in a gallery in the page, or from a list of thumbnails. Each image or thumbnail links to its full size image, so the images can still be viewed without JavaScript. With JavaScript, it opens the dialog at its image, and closing the dialog returns focus to it. Safari doesn't focus a link when it's clicked, so the link is focused before the dialog opens, to give the dialog somewhere to return focus to. The dialog has a dark background and gives the images the height of the screen, so it reads as a separate view of the images rather than more of the page, and its close button sits in the top corner like the other dialogs, apart from the gallery's controls. A link to an item in the gallery opens the dialog at that item, and the address is reset when the dialog closes, so reloading the page doesn't open it again.</p>
    <p class="push-bottom--double">The <code>@stormid/modal-gallery</code> package is an alternative for a simple set of thumbnails that open full size images, where the full gallery markup can't be rendered into the page.</p>

    <h2 class="push-bottom--half plus-2 medium">Example</h2>
    <iframe style="--height: 720px" class="example" title="Example gallery" src={'/example/gallery'} allow="fullscreen" />
    <p class="push-bottom align-right"><a href="/example/gallery" rel="noopener" target="_blank">Open in a new tab</a></p>

    <h2 class="push-bottom--half plus-2 medium">Example opened from thumbnails</h2>
    <iframe style="--height: 480px" class="example" title="Example gallery opened from thumbnails" src={'/example/gallery-modal'} allow="fullscreen" />
    <p class="push-bottom align-right"><a href="/example/gallery-modal" rel="noopener" target="_blank">Open in a new tab</a></p>

    <h2 class="push-bottom--half plus-2 medium">Code</h2>
    <p class="push-bottom">The gallery uses the <a href="/patterns/carousel">carousel</a> code, imported here as <code>carousel</code>, and the carousel CSS.</p>
    <CodeSample><GalleryCode /></CodeSample>
    <pre class="pre"><code class="code">{`import { carousel } from './carousel';

const getHashId = () => {
    try {
        return decodeURIComponent(location.hash.slice(1));
    } catch {
        return '';
    }
};

export const gallery = node => {
    const instance = carousel(node);
    if (!instance) return;

    const { embla } = instance;
    const viewport = embla.rootNode();
    const slides = embla.slideNodes();
    const count = node.querySelector('.js-gallery__count');
    const fullscreen = node.querySelector('.js-gallery__fullscreen');

    const goTo = (index, instant) => {
        // The browser scrolls the clipped viewport to show a fragment target, which puts it out of step with Embla
        viewport.scrollLeft = 0;
        embla.scrollTo(index, instant);
    };

    const goToHash = () => {
        const id = getHashId();
        const index = id ? slides.findIndex(slide => slide.id === id) : -1;
        if (index > -1) goTo(index, true);
        return index > -1;
    };

    const update = () => {
        const index = embla.selectedScrollSnap();
        count.textContent = \`\${index + 1} of \${slides.length}\`;
        // Native lazy loading waits until an image is in view, so load the neighbours before they move into it
        slides.slice(Math.max(index - 1, 0), index + 2)
            .flatMap(slide => Array.from(slide.querySelectorAll('img[loading="lazy"]')))
            .forEach(img => { img.loading = 'eager'; });
    };

    // Only write the URL once the user has moved the gallery, and only when the movement settles
    let moved = false;
    embla.on('select', () => {
        moved = true;
        update();
    });
    embla.on('settle', () => {
        const { id } = slides[embla.selectedScrollSnap()];
        if (moved && id && id !== getHashId()) history.replaceState(history.state, '', \`#\${id}\`);
    });

    // Fullscreen isn't supported on iPhone, so the button is only shown where it works
    if (document.fullscreenEnabled) {
        fullscreen.hidden = false;
        fullscreen.setAttribute('aria-pressed', 'false');
        fullscreen.addEventListener('click', () => (document.fullscreenElement === node
            ? document.exitFullscreen()
            : node.requestFullscreen()).catch(() => {}));
        document.addEventListener('fullscreenchange', () => {
            fullscreen.setAttribute('aria-pressed', String(document.fullscreenElement === node));
        });
    }

    const startedFromHash = goToHash();
    update();
    window.addEventListener('hashchange', goToHash);

    return { ...instance, startedFromHash, goTo };
};
`}</code></pre>
    <pre class="pre"><code class="code">{`/* A gallery is a carousel that shows one item at a time */
.gallery .carousel__slide {
    flex-basis: 100%;
}

/* An image that opens the gallery in a dialog */
.gallery__link {
    display: block;
    cursor: zoom-in;
}

/* The viewport clips anything outside a slide, so draw the focus ring inside the image */
.gallery__link:focus-visible {
    outline: 4px solid var(--highlight);
    outline-offset: -4px;
}

/* Images of any shape are shown whole within the same space, so the gallery doesn't change height as it moves */
.gallery__img {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 16 / 10;
    max-height: 70vh;
    object-fit: contain;
}

.gallery__fullscreen[hidden] {
    display: none;
}

.gallery:fullscreen {
    overflow: auto;
    background-color: white;
}`}</code></pre>

    <h3 class="push-bottom--half plus-1 medium">In a dialog</h3>
    <p class="push-bottom">The dialog markup is included in the example above. To open it from thumbnails instead of a gallery in the page:</p>
    <CodeSample><ModalCode /></CodeSample>
    <pre class="pre"><code class="code">{`import modal from '@stormid/modal';

const node = document.querySelector('.js-gallery-modal');
const [dialog] = modal(node);
const instance = gallery(node.querySelector('.js-gallery'));
const slides = instance.embla.slideNodes();
const indexOf = id => (id ? slides.findIndex(slide => slide.id === id) : -1);

const open = index => {
    dialog.open();
    // The gallery was measured while the dialog was hidden, so measure it again now it's visible
    instance.embla.reInit();
    instance.goTo(index, true);
};

document.querySelectorAll('.js-gallery-modal__trigger').forEach(trigger => {
    trigger.addEventListener('click', e => {
        // Without JS the images link to the full size images
        e.preventDefault();
        // Safari doesn't focus a link that's clicked, and the dialog returns focus to whatever had it when it opened
        trigger.focus({ preventScroll: true });
        open(indexOf(trigger.getAttribute('data-gallery-item')));
    });
});

// A link to an item in the gallery opens the dialog at that item
if (instance.startedFromHash) open(instance.embla.selectedScrollSnap());
window.addEventListener('hashchange', () => {
    const index = indexOf(getHashId());
    if (index > -1 && !dialog.getState().isOpen) open(index);
});

// Remove the fragment when the dialog closes, so reloading the page doesn't open it again
document.addEventListener('modal.close', e => {
    if (e.detail.getState().node === node && indexOf(getHashId()) > -1) {
        history.replaceState(history.state, '', location.pathname + location.search);
    }
});
`}</code></pre>

    <h2 class="push-bottom--half plus-2 medium">Dependencies and installation</h2>
    <DependencyTable dependencies={[
        { package: 'embla-carousel', installation: 'npm i -S embla-carousel' },
        { package: 'embla-carousel-wheel-gestures', installation: 'npm i -S embla-carousel-wheel-gestures' },
        { package: '@stormid/modal (for a gallery in a dialog)', installation: 'npm i -S @stormid/modal' }
    ]} />

    <h2 class="push-bottom plus-2 medium">Acceptance criteria</h2>
    <p class="push-bottom--double">The gallery should meet all of the <a href="/patterns/carousel">carousel</a> acceptance criteria, and the following.</p>

    <h3 class="push-bottom--half plus-1 medium">For validation in developer tools / web inspector</h3>
    <ul class="list list--tick push-bottom--double">
        <li class="list-item">Each item should have a unique <pre class="pre--inline">id</pre>, and when the gallery opens in a dialog only the items in the dialog should have ids</li>
        <li class="list-item">An image or thumbnail that opens the dialog should be a link to its full size image, with an <pre class="pre--inline">aria-haspopup="dialog"</pre> attribute</li>
        <li class="list-item">Each image should have a text alternative in its <pre class="pre--inline">alt</pre> attribute, and <pre class="pre--inline">width</pre> and <pre class="pre--inline">height</pre> attributes</li>
        <li class="list-item">The count of the current position should not be a live region</li>
        <li class="list-item">The full screen button should be an HTML <pre class="pre--inline">&lt;button&gt;</pre> element with an accessible name and an <pre class="pre--inline">aria-pressed</pre> attribute</li>
        <li class="list-item">In a dialog, the dialog should be named by the gallery heading, and the gallery should not be a separate region</li>
    </ul>

    <h3 class="push-bottom--half plus-1 medium">For visual validation</h3>
    <ul class="list list--tick push-bottom--double">
        <li class="list-item">One item should be in view at a time</li>
        <li class="list-item">Images of different shapes should be shown whole, and the gallery should not change height as it moves</li>
        <li class="list-item">The count should show the position of the item in view</li>
    </ul>

    <h3 class="push-bottom--half plus-1 medium">For functional validation</h3>
    <ul class="list list--tick push-bottom--double">
        <li class="list-item">The count should update as the gallery moves</li>
        <li class="list-item">The address should update to the item in view once the gallery stops moving, and the back button should leave the page rather than step back through the items</li>
        <li class="list-item">Loading the page with the address of an item should show that item, in the dialog if the gallery is in one</li>
        <li class="list-item">The images next to the item in view should be loaded before they move into view</li>
        <li class="list-item">The full screen button should only be shown where full screen is supported, and should turn full screen on and off</li>
        <li class="list-item">Selecting an image or thumbnail should open the dialog at its image, with focus in the dialog, and closing the dialog should return focus to the image or thumbnail, including in Safari</li>
        <li class="list-item">Without JavaScript, each image or thumbnail should link to its full size image</li>
    </ul>

    <h2 class="push-bottom--half plus-2 medium">References</h2>
    <ul class="list push-bottom--double">
        <li class="list-item"><a href="/patterns/carousel">Carousel pattern</a></li>
        <li class="list-item"><a href="https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API" rel="noopener nofollow">https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API</a></li>
        <li class="list-item"><a href="https://www.embla-carousel.com/api/events/" rel="noopener nofollow">https://www.embla-carousel.com/api/events/</a></li>
        <li class="list-item"><a href="https://github.com/stormid/components/tree/master/packages/modal" rel="noopener nofollow">https://github.com/stormid/components/tree/master/packages/modal</a></li>
    </ul>
</PatternLayout>;

export default GalleryPattern;
