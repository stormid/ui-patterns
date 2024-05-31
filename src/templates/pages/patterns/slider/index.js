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
    <p class="push-bottom--double">Content slider, aka carousel, for a list of items that can move in and out of view using the Swiper.js package.</p>
    
    <h2 class="push-bottom--half plus-2 medium">Guidance</h2>
    <p class="push-bottom">Sliders are disputed from a usability perspective because their content can be hard to discover. </p>
    <p class="push-bottom--double">Full documentation of all options for the slider, including pagination, autoplay, and effects modules, and setting the number of slides in view at breakpoints is available on the <a rel="noopener nofollow" href="https://swiperjs.com">Swiper.js website</a>.</p>
    
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
        <li class="list-item">Do not autoplay the slider. Provide stop/start controls if you must.</li>
        <li class="list-item">Ensure sufficient contrast between the foreground and the background of text, links, and buttons.</li>
        <li class="list-item">Pagaintion buttons must indicate button status</li>
    </ul>

    <h3 class="push-bottom--half plus-1 medium">For functional validation</h3>
    <ul class="list list--tick push-bottom--double">
        <li class="list-item">All functionality, including navigating between carousel items, must be operable by keyboard.</li>
        <li class="list-item">Changes to carousel items must be communicated to all users, including screen reader users - announce the current item.</li>
        <li class="list-item">The keyboard position (“focus”) is managed in a reasonable and comprehensible fashion - allow the user to maintain control of the keyboard focus - focus the selected carousel item</li>
        <li class="list-item">Use appropriately sized buttons and links, and provide whitespace around them, to allow people with reduced dexterity to use the carousel more easily. This also benefits people using touch screens, such as on mobile devices. Buttons and links that are not inline in a block of text should be at least 44 × 44 CSS pixels.</li>
    </ul>

    <h2 class="push-bottom--half plus-2 medium">References</h2>
    <ul class="list push-bottom--double">
        <li class="list-item"><a href="https://inclusive-components.design/a-content-slider/" rel="noopener nofollow">https://inclusive-components.design/a-content-slider</a></li>
        <li class="list-item"><a href="https://webaim.org/standards/wcag/checklist" rel="noopener nofollow">https://webaim.org/standards/wcag/checklist</a></li>
        <li class="list-item"><a href="https://www.w3.org/WAI/tutorials/carousels/" rel="noopener nofollow">https://www.w3.org/WAI/tutorials/carousels</a></li>
        <li class="list-item"><a href="https://www.w3.org/WAI/ARIA/apg/patterns/carousel/" rel="noopener nofollow">https://www.w3.org/WAI/ARIA/apg/patterns/carousel</a></li>
        <li class="list-item"><a href="https://swiperjs.com/" rel="noopener nofollow">https://swiperjs.com</a></li>
    </ul>
</PatternLayout>;

export default Slider;