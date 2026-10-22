import EmblaCarousel from 'embla-carousel';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
const SELECTORS = {
    NODE: '.js-carousel',
    VIEWPORT: '.js-carousel__viewport',
    CONTROLS: '.js-carousel__controls',
    PREV: '.js-carousel__prev',
    NEXT: '.js-carousel__next',
};

const OPTIONS = {
    align: 'start',
    containScroll: 'trimSnaps',
    slidesToScroll: 'auto',
    duration: 25,
    // Embla only follows focus that comes from the Tab key, so focus is handled by onFocus instead
    watchFocus: false
};

// aria-disabled rather than disabled, so a keyboard user who reaches the end keeps focus on the button
const setDisabled = (button, disabled) => button.setAttribute('aria-disabled', String(disabled));

const isInView = (element, viewport) => {
    const item = element.getBoundingClientRect();
    const view = viewport.getBoundingClientRect();
    return item.left >= Math.floor(view.left) && item.right <= Math.ceil(view.right);
};

export const carousel = node => {
    const viewport = node.querySelector(SELECTORS.VIEWPORT);
    const controls = node.querySelector(SELECTORS.CONTROLS);
    const prev = node.querySelector(SELECTORS.PREV);
    const next = node.querySelector(SELECTORS.NEXT);
    if (!viewport || !controls || !prev || !next) return;

    // Without JS the viewport is a native scroll-snap region; once enhanced, Embla moves the track instead
    node.classList.add('is--enhanced');
    viewport.scrollLeft = 0;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Trackpad swipes are wheel events, which Embla ignores; the plugin only takes horizontal ones, so the page still scrolls
    const embla = EmblaCarousel(viewport, { ...OPTIONS, duration: reducedMotion ? 0 : OPTIONS.duration }, [WheelGesturesPlugin()]);

    const update = () => {
        // Hide the controls when every item fits in view
        controls.hidden = !embla.canScrollPrev() && !embla.canScrollNext();
        setDisabled(prev, !embla.canScrollPrev());
        setDisabled(next, !embla.canScrollNext());
    };
    const onPrev = () => embla.scrollPrev();
    const onNext = () => embla.scrollNext();
    const bringIntoView = element => {
        // Instant scrolls render synchronously, so step towards the item until it's in view
        for (let i = embla.scrollSnapList().length; i > 0 && !isInView(element, viewport); i--) {
            const isBefore = element.getBoundingClientRect().left < viewport.getBoundingClientRect().left;
            if (isBefore ? !embla.canScrollPrev() : !embla.canScrollNext()) break;
            if (isBefore) embla.scrollPrev(true);
            else embla.scrollNext(true);
        }
    };
    const isMoving = () => Math.abs(embla.scrollProgress() - embla.scrollSnapList()[embla.selectedScrollSnap()]) > 0.001;
    let pendingFocus = null;
    const onFocus = e => {
        // The browser scrolls the clipped viewport to show a focused item, which puts it out of step with Embla
        viewport.scrollLeft = 0;
        // Ignore focus from a pointer, so pressing on a partly visible item to drag doesn't move the carousel
        if (!e.target.matches(':focus-visible')) return;
        bringIntoView(e.target);
        // An item in view now may be moved out of view by a scroll that's still running, so check again when it stops
        if (isMoving()) pendingFocus = e.target;
    };
    const onSettle = () => {
        const element = pendingFocus;
        pendingFocus = null;
        if (element && element === document.activeElement) bringIntoView(element);
    };

    prev.addEventListener('click', onPrev);
    next.addEventListener('click', onNext);
    viewport.addEventListener('focusin', onFocus);
    embla.on('select', update);
    embla.on('reInit', update);
    embla.on('settle', onSettle);
    // The user has taken over, so don't move the carousel back to the focused item
    embla.on('pointerDown', () => { pendingFocus = null; });
    update();

    return {
        embla,
        destroy() {
            prev.removeEventListener('click', onPrev);
            next.removeEventListener('click', onNext);
            viewport.removeEventListener('focusin', onFocus);
            embla.destroy();
            controls.hidden = true;
            node.classList.remove('is--enhanced');
        }
    };
};

export const init = () => Array.from(document.querySelectorAll(SELECTORS.NODE))
    .map(carousel)
    .filter(Boolean);

init();
