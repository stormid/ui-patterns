import modal from '@stormid/modal';
import { carousel } from '../carousel';

const SELECTORS = {
    NODE: '.js-gallery',
    COUNT: '.js-gallery__count',
    FULLSCREEN: '.js-gallery__fullscreen',
    MODAL: '.js-gallery-modal',
    MODAL_TRIGGER: '.js-gallery-modal__trigger'
};

const getHashId = () => {
    try {
        return decodeURIComponent(location.hash.slice(1));
    } catch {
        return '';
    }
};

// A gallery is a carousel that shows one item at a time, so each scroll snap is one item
export const gallery = node => {
    const instance = carousel(node);
    if (!instance) return;

    const { embla } = instance;
    const viewport = embla.rootNode();
    const slides = embla.slideNodes();
    const count = node.querySelector(SELECTORS.COUNT);
    const fullscreen = node.querySelector(SELECTORS.FULLSCREEN);

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
        if (count) count.textContent = `${index + 1} of ${slides.length}`;
        // Native lazy loading waits until an image is in view, so load the neighbours before they move into it
        slides.slice(Math.max(index - 1, 0), index + 2)
            .flatMap(slide => Array.from(slide.querySelectorAll('img[loading="lazy"]')))
            .forEach(img => { img.loading = 'eager'; });
    };

    // Only write the URL once the user has moved the gallery, so a page without a fragment keeps a clean URL.
    // It's written when the movement settles rather than on every select, as browsers limit how often history can change
    let moved = false;
    const onSelect = () => {
        moved = true;
        update();
    };
    const onSettle = () => {
        const { id } = slides[embla.selectedScrollSnap()];
        if (!moved || !id || id === getHashId()) return;
        history.replaceState(history.state, '', `#${id}`);
    };

    const onFullscreen = () => (document.fullscreenElement === node
        ? document.exitFullscreen()
        : node.requestFullscreen()).catch(() => {});
    const onFullscreenChange = () => fullscreen.setAttribute('aria-pressed', String(document.fullscreenElement === node));
    // Fullscreen isn't supported on iPhone, so the button is only shown where it works
    const canFullscreen = fullscreen && document.fullscreenEnabled;
    if (canFullscreen) {
        fullscreen.hidden = false;
        fullscreen.setAttribute('aria-pressed', 'false');
        fullscreen.addEventListener('click', onFullscreen);
        document.addEventListener('fullscreenchange', onFullscreenChange);
    }

    const startedFromHash = goToHash();
    update();
    embla.on('select', onSelect);
    embla.on('settle', onSettle);
    window.addEventListener('hashchange', goToHash);

    return {
        ...instance,
        startedFromHash,
        goTo,
        destroy() {
            window.removeEventListener('hashchange', goToHash);
            if (canFullscreen) {
                fullscreen.removeEventListener('click', onFullscreen);
                document.removeEventListener('fullscreenchange', onFullscreenChange);
                fullscreen.hidden = true;
            }
            instance.destroy();
        }
    };
};

// A gallery in a @stormid/modal dialog, opened at the item named by the thumbnail that was clicked
export const modalGallery = node => {
    const galleryNode = node.querySelector(SELECTORS.NODE);
    const [dialog] = modal(node);
    if (!galleryNode || !dialog) return;

    const instance = gallery(galleryNode);
    if (!instance) return;

    const slides = instance.embla.slideNodes();
    const indexOf = id => (id ? slides.findIndex(slide => slide.id === id) : -1);
    const triggers = Array.from(document.querySelectorAll(SELECTORS.MODAL_TRIGGER))
        .filter(trigger => indexOf(trigger.getAttribute('data-gallery-item')) > -1);

    const open = index => {
        dialog.open();
        // The gallery was measured while the dialog was hidden, so measure it again now it's visible
        instance.embla.reInit();
        instance.goTo(index, true);
    };
    const onTrigger = e => {
        // Without JS the thumbnails link to the full size images
        e.preventDefault();
        open(indexOf(e.currentTarget.getAttribute('data-gallery-item')));
    };
    // A link to an item in the gallery opens the dialog at that item
    const onHashChange = () => {
        const index = indexOf(getHashId());
        if (index > -1 && !dialog.getState().isOpen) open(index);
    };
    const onClose = e => {
        if (e.detail.getState().node !== node) return;
        // Remove the fragment, so reloading the page doesn't open the dialog again
        if (indexOf(getHashId()) > -1) history.replaceState(history.state, '', location.pathname + location.search);
    };

    triggers.forEach(trigger => trigger.addEventListener('click', onTrigger));
    window.addEventListener('hashchange', onHashChange);
    document.addEventListener('modal.close', onClose);
    if (instance.startedFromHash) open(instance.embla.selectedScrollSnap());

    return {
        ...instance,
        open,
        destroy() {
            triggers.forEach(trigger => trigger.removeEventListener('click', onTrigger));
            window.removeEventListener('hashchange', onHashChange);
            document.removeEventListener('modal.close', onClose);
            instance.destroy();
            dialog.destroy();
        }
    };
};

export const init = () => {
    const modalNodes = Array.from(document.querySelectorAll(SELECTORS.MODAL));
    return [
        ...Array.from(document.querySelectorAll(SELECTORS.NODE))
            .filter(node => !modalNodes.some(modalNode => modalNode.contains(node)))
            .map(gallery),
        ...modalNodes.map(modalGallery)
    ].filter(Boolean);
};

init();
