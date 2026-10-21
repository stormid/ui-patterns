import PatternLayout from '@layouts/pattern';
import Code from '../../example/carousel/code';
import CodeSample from '@components/code-sample';
import PatternTitle from '@components/pattern-title';
import DependencyTable from '@components/dependency-table';
import { STATUS } from '@constants';

export const title = 'Carousel';

export const status = STATUS.DEVELOPMENT;

const Carousel = () => <PatternLayout>
    <PatternTitle status={status}>Carousel</PatternTitle>
    <p class="push-bottom--double">A horizontal list of related content items that users can move through with previous and next buttons, by swiping, or by tabbing.</p>

    <h2 class="push-bottom--half plus-2 medium">Guidance</h2>
    <p class="push-bottom">Use carousels with caution. Content that starts out of view is easy to miss, so do not put anything users need in a carousel. A carousel can be useful to show a set of related, optional items, such as related articles, in a small space, as long as the heading gives users enough context to decide whether to browse them.</p>
    <p class="push-bottom">This pattern does not use the common accessible carousel conventions: <code>aria-roledescription</code> values of 'carousel' and 'slide', 'slide 1 of 7' labels, hiding items that are out of view from screen readers and the tab order, and announcing changes in a live region. In our testing these confused screen reader users and made the content harder to navigate. Instead, the carousel is presented as a named region containing a simple list, in which every item can be reached by tabbing. When an item that is out of view receives focus, the carousel moves to show it.</p>
    <p class="push-bottom">The previous and next buttons come before the list in the source order, so keyboard users can use them without tabbing through every item. At the start and end of the list the buttons use <code>aria-disabled</code> rather than <code>disabled</code>, so focus stays on the button instead of being lost.</p>
    <p class="push-bottom">Do not autoplay a carousel. Movement that starts automatically distracts users and moves content away while they are reading it.</p>
    <p class="push-bottom--double">The pattern progressively enhances a list that scrolls horizontally. Without JavaScript, users can scroll through the list and every item can be reached. With JavaScript, <a rel="noopener nofollow" href="https://www.embla-carousel.com">Embla Carousel</a> adds the buttons and moves the list, and movement is instant when the user prefers reduced motion.</p>

    <h2 class="push-bottom--half plus-2 medium">Example</h2>
    <iframe style="--height: 480px" class="example" title="Example carousel" src={'/example/carousel'} />
    <p class="push-bottom align-right"><a href="/example/carousel" rel="noopener" target="_blank">Open in a new tab</a></p>

    <h2 class="push-bottom--half plus-2 medium">Code</h2>
    <CodeSample><Code /></CodeSample>
    <pre class="pre"><code class="code">{`import EmblaCarousel from 'embla-carousel';

const node = document.querySelector('.js-carousel');
const viewport = node.querySelector('.js-carousel__viewport');
const controls = node.querySelector('.js-carousel__controls');
const prev = node.querySelector('.js-carousel__prev');
const next = node.querySelector('.js-carousel__next');

node.classList.add('is--enhanced');
viewport.scrollLeft = 0;

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const embla = EmblaCarousel(viewport, {
    align: 'start',
    containScroll: 'trimSnaps',
    slidesToScroll: 'auto',
    duration: reducedMotion ? 0 : 25,
    // Embla only follows focus that comes from the Tab key, so focus is handled below instead
    watchFocus: false
});

const update = () => {
    controls.hidden = !embla.canScrollPrev() && !embla.canScrollNext();
    prev.setAttribute('aria-disabled', String(!embla.canScrollPrev()));
    next.setAttribute('aria-disabled', String(!embla.canScrollNext()));
};

const isInView = element => {
    const item = element.getBoundingClientRect();
    const view = viewport.getBoundingClientRect();
    return item.left >= Math.floor(view.left) && item.right <= Math.ceil(view.right);
};

prev.addEventListener('click', () => embla.scrollPrev());
next.addEventListener('click', () => embla.scrollNext());
viewport.addEventListener('focusin', e => {
    // The browser scrolls the clipped viewport to show a focused item, which puts it out of step with Embla
    viewport.scrollLeft = 0;
    // Ignore focus from a pointer, so pressing on a partly visible item to drag doesn't move the carousel
    if (!e.target.matches(':focus-visible') || isInView(e.target)) return;
    const index = embla.slideNodes().findIndex(slide => slide.contains(e.target));
    const snap = embla.internalEngine().slideRegistry.findIndex(group => group.includes(index));
    if (snap > -1) embla.scrollTo(snap, true);
});
embla.on('select', update);
embla.on('reInit', update);
update();
`}</code></pre>
    <pre class="pre"><code class="code">{`/* Without JS the viewport scrolls natively, snapping to each item */
.carousel__viewport {
    overflow-x: auto;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
}

/* Once enhanced, Embla moves the track */
.carousel.is--enhanced .carousel__viewport {
    overflow: hidden;
    scroll-snap-type: none;
}

.carousel__track {
    display: flex;
    margin-left: calc(var(--gutter) * -1);
    touch-action: pan-y pinch-zoom;
}

.carousel__slide {
    flex: 0 0 85%;
    min-width: 0;
    padding-left: var(--gutter);
    scroll-snap-align: start;
}

/* The viewport clips anything outside a slide, so draw the focus ring inside the card */
.carousel__card:has(.carousel__link:focus-visible) {
    outline: 4px solid var(--highlight);
    outline-offset: -4px;
}`}</code></pre>
    <p class="push-bottom--double">The number of items in view at each breakpoint is set by the width of <code>.carousel__slide</code> in CSS. Full documentation of the options is available on the <a rel="noopener nofollow" href="https://www.embla-carousel.com/api/options/">Embla Carousel website</a>.</p>

    <h2 class="push-bottom--half plus-2 medium">Dependencies and installation</h2>
    <DependencyTable dependencies={[{ package: 'embla-carousel', installation: 'npm i -S embla-carousel' }]} />

    <h2 class="push-bottom plus-2 medium">Acceptance criteria</h2>
    <p class="push-bottom--double">The following is a list of example acceptance criteria to test against when using this pattern. These criteria should test that the specific markup requirements are met, and that the carousel behaves visually and functionally as expected.</p>

    <h3 class="push-bottom--half plus-1 medium">For validation in developer tools / web inspector</h3>
    <ul class="list list--tick push-bottom--double">
        <li class="list-item">The carousel container should be a <pre class="pre--inline">&lt;section&gt;</pre> element, or have a role of region, with an accessible name taken from its heading. Use <pre class="pre--inline">role="group"</pre>, which is not a landmark, if the carousel is not a significant region of the page</li>
        <li class="list-item">The items should be list items in a list. Add <pre class="pre--inline">role="list"</pre> to the list, as some browsers remove list semantics when list styles are removed</li>
        <li class="list-item">The items should not have an <pre class="pre--inline">aria-roledescription</pre>, or an accessible name describing their position, such as 'slide 1 of 7'</li>
        <li class="list-item">Items that are out of view should not be hidden from screen readers with <pre class="pre--inline">aria-hidden</pre> or <pre class="pre--inline">visibility: hidden</pre></li>
        <li class="list-item">The previous and next controls should be HTML <pre class="pre--inline">&lt;button&gt;</pre> elements with accessible names</li>
        <li class="list-item">At the start or end of the list, the relevant button should have <pre class="pre--inline">aria-disabled="true"</pre>, not the <pre class="pre--inline">disabled</pre> attribute</li>
    </ul>

    <h3 class="push-bottom--half plus-1 medium">For visual validation</h3>
    <ul class="list list--tick push-bottom--double">
        <li class="list-item">The heading should give users enough context about the items in the carousel</li>
        <li class="list-item">Part of the next item should be visible on small screens, to show that there is more content</li>
        <li class="list-item">The buttons should be at least 24 by 24 pixels, and should look inactive when they have no effect</li>
        <li class="list-item">The buttons and every item should have a clearly visible focus style, which is not cut off by the edges of the carousel</li>
        <li class="list-item">There should be sufficient contrast between the foreground and background of text, links and buttons</li>
    </ul>

    <h3 class="push-bottom--half plus-1 medium">For functional validation</h3>
    <ul class="list list--tick push-bottom--double">
        <li class="list-item">The carousel should not move unless the user moves it</li>
        <li class="list-item">The previous and next buttons should come before the list in the focus order</li>
        <li class="list-item">The previous and next buttons should move the carousel by the number of items in view</li>
        <li class="list-item">Focus should stay on a button when it is used, including when the start or end of the list is reached</li>
        <li class="list-item">Every item should be reachable by tabbing, and an item that is out of view should be moved into view when it receives focus</li>
        <li class="list-item">Swiping on a touch screen should move the carousel</li>
        <li class="list-item">Movement should be instant when the user has set a preference for reduced motion</li>
        <li class="list-item">The buttons should be hidden when all items fit in view</li>
        <li class="list-item">Without JavaScript, the list should scroll horizontally and the buttons should be hidden</li>
    </ul>

    <h2 class="push-bottom--half plus-2 medium">References</h2>
    <ul class="list push-bottom--double">
        <li class="list-item"><a href="https://inclusive-components.design/a-content-slider/" rel="noopener nofollow">https://inclusive-components.design/a-content-slider/</a></li>
        <li class="list-item"><a href="https://www.w3.org/WAI/tutorials/carousels/" rel="noopener nofollow">https://www.w3.org/WAI/tutorials/carousels/</a></li>
        <li class="list-item"><a href="https://www.w3.org/WAI/ARIA/apg/patterns/carousel/" rel="noopener nofollow">https://www.w3.org/WAI/ARIA/apg/patterns/carousel/</a></li>
        <li class="list-item"><a href="https://www.embla-carousel.com" rel="noopener nofollow">https://www.embla-carousel.com</a></li>
        <li class="list-item"><a href="https://www.smashingmagazine.com/2022/04/designing-better-carousel-ux/" rel="noopener nofollow">https://www.smashingmagazine.com/2022/04/designing-better-carousel-ux/</a></li>
        <li class="list-item"><a href="https://webaim.org/standards/wcag/checklist" rel="noopener nofollow">https://webaim.org/standards/wcag/checklist</a></li>
    </ul>
</PatternLayout>;

export default Carousel;
