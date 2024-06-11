import { h } from 'preact';
import PatternLayout from '@layouts/pattern';
import Code from '../../example/carousel/code';
import { render } from 'preact-render-to-string';
import PatternTitle from '@components/pattern-title';
import DependencyTable from '@components/dependency-table';
import { STATUS } from '@constants';

export const title = 'Carousel';

export const status = STATUS.DEVELOPMENT;

const Carousel = () => <PatternLayout>
    <PatternTitle status={status}>Carousel</PatternTitle>
    <p class="push-bottom--double">A list of content items that can move in and out of view, using Swiper.js.</p>
    
    <h2 class="push-bottom--half plus-2 medium">Guidance</h2>
    <p class="push-bottom">Carousels should be used with caution. Content can be hard to discover and can be skipped by users, however, if the user is provided with sufficient context, carousels can be a useful pattern to maximize information density, to provide additional content within a specific and relevant context.</p>
    <p class="push-bottom">The pattern described here eschews accessible carousel conventions such as aria-roledescriptions of 'carousel' and 'slide', non-active slides being unreachable via tabbing and invisible to screen readers, announcing navigations via a live region, or treating carousels with pagination as tablists. We found these were confusing for screen reader users and made navigating the content more complicated. Instead we recommend hiding the 'carousel-ness' by treating the carousel area as a simple tabbable list.</p>
    <p class="push-bottom--double">Configuration of Swiper.js to meet the acceptance criteria of this pattern is shown here, full documentation of all options for the module, including setting the number of slides in view at different breakpoints, is available on the <a rel="noopener nofollow" href="https://swiperjs.com">Swiper.js website</a>.</p>

    <h2 class="push-bottom--half plus-2 medium">Example</h2>
    <iframe style="--height: 375px" class="example" title="Example carousel" src={'/example/carousel'}></iframe>
    <p class="push-bottom align-right"><a href="/example/carousel" rel="noopener" target="_blank">Open in a new tab</a></p>

    <h2 class="push-bottom--half plus-2 medium">Dependencies and installation</h2>
    <DependencyTable dependencies={[{ package: 'swiper', installation: 'npm i -S swiper' }]} />
    
    <h2 class="push-bottom--half plus-2 medium">Code</h2>
    <pre class="pre"><code class="code">{`${render(<Code />, null, { pretty: true })}`}</code></pre>
    <pre class="pre"><code class="code">{`import Swiper from 'swiper';
import {
    Navigation,
    FreeMode,
    A11y
} from 'swiper/modules';

const node = document.querySelector('.js-carousel');
const instance = new Swiper(node, {
    modules: [ Navigation, FreeMode, A11y ],
    lazy: true,
    freeMode: {
        enabled: true,
        sticky: true,
    },
    a11y: {
        enabled: true,
        slideLabelMessage: 'slide {{index}} of {{slidesLength}}'
    },
    navigation: {
        nextEl: node.querySelector('.swiper-button-next'),
        prevEl: node.querySelector('.swiper-button-prev'),
    },
    watchSlidesProgress: true,
    slidesPerView: 1,
    spaceBetween: 24,
    breakpoints: {
        768: { slidesPerView: 2 },
        1500: { slidesPerView: 3 },
    }
});

instance.on('beforeTransitionStart carouselMove', () => node.classList.add('is-sliding'));
instance.on('slideChangeTransitionEnd', () => node.classList.remove('is-sliding'));
`}</code></pre>
<pre class="pre"><code class="code">{`.swiper-slide {
    visibility: hidden;
}
.swiper-slide-visible {
    visibility: visible;
}
.is-sliding {
    .swiper-slide {
        visibility: visible;
    }
}`}</code></pre>
    <h2 class="push-bottom plus-2 medium">Acceptance criteria</h2>
    <p class="push-bottom--double">The following is a list of example acceptance criteria to test against when using this pattern.  These critera should test that the specific markup requirements are met, and that the carousel behaves visually and functionally as expected.</p>

    <h3 class="push-bottom--half plus-1 medium">For validation in developer tools / web inspector</h3>
    <ul class="list list--tick push-bottom--double">
        <li class="list-item">Use the native button element for controls to support native button affordances</li>
        <li class="list-item">The carousel container should have a role of region or group, or be a section element. Use role=group (which does not denote a landmark), if the carousel is not a significant region of the page</li>
        <li class="list-item">The carousel container should have an accessible name - heading or aria-label - to provide context for the list of content</li>
        <li class="list-item">Ensure slides are listitems in a list</li>
        <li class="list-item">Do not give the slides an accessible label relating to their position</li>
        {/* <li class="list-item">Use aria-roledescription to change the way a screen reader announces the role of an element if it provides clarity to the user, but not as a substitute for an accessible label, e.g. <pre><code>&lt;div role="region" aria-roledescription="carousel" aria-label="UI patterns"&gt;</code></pre></li> */}
        {/* <li class="list-item">Slides that are not in view should be visually hidden and hidden from acreen readers and tabbing until moved into view</li> */}
    </ul>

    <h3 class="push-bottom--half plus-1 medium">For visual validation</h3>
    <ul class="list list--tick push-bottom--double">
        <li class="list-item">User is provided with sufficient context about the carousel</li>
        <li class="list-item">Do not autoplay the carousel</li>
        <li class="list-item">Ensure sufficient contrast between the foreground and the background of text, links, and buttons</li>
        <li class="list-item">Ensure there is a visible focus indicator</li>
    </ul>

    <h3 class="push-bottom--half plus-1 medium">For functional validation</h3>
    <ul class="list list--tick push-bottom--double">
        <li class="list-item">All functionality, including navigating between carousel items, must be operable by keyboard</li>
        <li class="list-item">Swipe gestures on touch screen devices should move the carousel back and forwards</li>
        <li class="list-item">Navigation must be possible by pointer input, not just keyboard or touch</li>
        <li class="list-item">Controls should be before slides in the focus order</li>
        <li class="list-item">Focus should remain on the button when navigating the slides</li>
        <li class="list-item">Consider adding a bypass block to allow keyboard users to skip the carousel</li>
        {/* <li class="list-item">Changes in navigation must be communicated to users</li> */}
    </ul>

    <h2 class="push-bottom--half plus-2 medium">References</h2>
    <ul class="list push-bottom--double">
        {/* https://splidejs.com/guides/accessibility/ */}
        {/* https://bbc.github.io/gel/components/carousels/ */}
        {/* https://github.com/bbc/gel/issues/136 */}
        <li class="list-item"><a href="https://inclusive-components.design/a-content-carousel/" rel="noopener nofollow">https://inclusive-components.design/a-content-slider</a></li>
        <li class="list-item"><a href="https://webaim.org/standards/wcag/checklist" rel="noopener nofollow">https://webaim.org/standards/wcag/checklist</a></li>
        <li class="list-item"><a href="https://www.w3.org/WAI/tutorials/carousels/" rel="noopener nofollow">https://www.w3.org/WAI/tutorials/carousels</a></li>
        <li class="list-item"><a href="https://www.w3.org/WAI/ARIA/apg/patterns/carousel/" rel="noopener nofollow">https://www.w3.org/WAI/ARIA/apg/patterns/carousel</a></li>
        <li class="list-item"><a href="https://swiperjs.com/" rel="noopener nofollow">https://swiperjs.com</a></li>
        <li class="list-item"><a href="https://www.smashingmagazine.com/2022/04/designing-better-carousel-ux/" rel="noopener nofollow">https://www.smashingmagazine.com/2022/04/designing-better-carousel-ux/</a></li>
        <li class="list-item"><a href="https://www.smashingmagazine.com/2015/02/carousel-usage-exploration-on-mobile-e-commerce-websites/" rel="noopener nofollow">https://www.smashingmagazine.com/2015/02/carousel-usage-exploration-on-mobile-e-commerce-websites/</a></li>
        <li class="list-item"><a href="https://erikrunyon.com/2013/01/carousel-interaction-stats/" rel="noopener nofollow">https://erikrunyon.com/2013/01/carousel-interaction-stats/</a></li>
    </ul>
</PatternLayout>;

export default Carousel;