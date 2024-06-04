import { h } from 'preact';
import PatternLayout from '@layouts/pattern';
import Code from '../../example/show-more/code';
import { render } from 'preact-render-to-string';
import PatternTitle from '@components/pattern-title';
import DependencyTable from '@components/dependency-table';
import { STATUS } from '@constants';

export const title = 'Slider';

export const status = STATUS.DEVELOPMENT;

const Slider = () => <PatternLayout>
    <PatternTitle status={status}>Slider</PatternTitle>
    <p class="push-bottom--double">AKA carousel, a list of content items that can move in and out of view using Swiper.js.</p>
    
    <h2 class="push-bottom--half plus-2 medium">Guidance</h2>
    <p class="push-bottom">Disputed from a usability perspective because content can be hard to discover and can be skipped by users, sliders should be used with caution.</p>
    <p class="push-bottom">If the user is provided with sufficient context, sliders can be a useful pattern to maximize information density.</p>
    <p class="push-bottom--double">Full documentation of all options for the slider, including pagination and setting the number of slides in view at breakpoints is available on the <a rel="noopener nofollow" href="https://swiperjs.com">Swiper.js website</a>.</p>
    
    <h2 class="push-bottom--half plus-2 medium">Example</h2>
    <iframe style="--height: 375px" class="example" title="Example slider" src={'/example/slider'}></iframe>
    <p class="push-bottom align-right"><a href="/example/slider" rel="noopener" target="_blank">Open in a new tab</a></p>

    <h2 class="push-bottom--half plus-2 medium">Dependencies and installation</h2>
    <DependencyTable dependencies={[{ package: 'swiper', installation: 'npm i -S swiper' }]} />
    
    <h2 class="push-bottom--half plus-2 medium">Code</h2>
    <pre class="pre"><code class="code">{`${render(<Code />, null, { pretty: true })}`}</code></pre>
    <pre class="pre"><code class="code">{``}</code></pre>
    <h2 class="push-bottom plus-2 medium">Acceptance criteria</h2>
    <p class="push-bottom--double">The following is a list of example acceptance criteria to test against when using this pattern.  These critera should test that the specific markup requirements are met, and that the search behaves visually and functionally as expected.</p>

    <h3 class="push-bottom--half plus-1 medium">For validation in developer tools / web inspector</h3>
    <ul class="list list--tick push-bottom--double">
        <li class="list-item">Use semantic structure for the carousel to support proper function of assistive technology.</li>
    </ul>

    <h3 class="push-bottom--half plus-1 medium">For visual validation</h3>
    <ul class="list list--tick push-bottom--double">
        <li class="list-item">Do not autoplay the slider.</li>
        <li class="list-item">Ensure sufficient contrast between the foreground and the background of text, links, and buttons.</li>
        <li class="list-item">Pagination buttons must indicate button status</li>
    </ul>

    <h3 class="push-bottom--half plus-1 medium">For functional validation</h3>
    <ul class="list list--tick push-bottom--double">
        <li class="list-item">All functionality, including navigating between carousel items, must be operable by keyboard.</li>
        <li class="list-item">Swipe gestures on touch screen devices can move the slider back and forwards.</li>
        <li class="list-item">Changes to carousel items must be communicated to users.</li>
        <li class="list-item">The user controls keyboard focus, focus the selected carousel item</li>
        {/* <li class="list-item">Buttons and links that are not inline in a block of text should be at least 44 x 44 CSS pixels.</li> */}
    </ul>

    <h2 class="push-bottom--half plus-2 medium">References</h2>
    <ul class="list push-bottom--double">
        <li class="list-item"><a href="https://inclusive-components.design/a-content-slider/" rel="noopener nofollow">https://inclusive-components.design/a-content-slider</a></li>
        <li class="list-item"><a href="https://webaim.org/standards/wcag/checklist" rel="noopener nofollow">https://webaim.org/standards/wcag/checklist</a></li>
        <li class="list-item"><a href="https://www.w3.org/WAI/tutorials/carousels/" rel="noopener nofollow">https://www.w3.org/WAI/tutorials/carousels</a></li>
        <li class="list-item"><a href="https://www.w3.org/WAI/ARIA/apg/patterns/carousel/" rel="noopener nofollow">https://www.w3.org/WAI/ARIA/apg/patterns/carousel</a></li>
        <li class="list-item"><a href="https://swiperjs.com/" rel="noopener nofollow">https://swiperjs.com</a></li>
        <li class="list-item"><a href="https://www.smashingmagazine.com/2015/02/carousel-usage-exploration-on-mobile-e-commerce-websites/" rel="noopener nofollow">https://www.smashingmagazine.com/2015/02/carousel-usage-exploration-on-mobile-e-commerce-websites/</a></li>
        <li class="list-item"><a href="https://erikrunyon.com/2013/01/carousel-interaction-stats/" rel="noopener nofollow">https://erikrunyon.com/2013/01/carousel-interaction-stats/</a></li>
    </ul>
</PatternLayout>;

export default Slider;