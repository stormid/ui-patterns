import { h, Fragment } from 'preact';

const Hero = () => <Fragment>
    <section class="hero">
        <hgroup>
            <h1 class="hero__title">Lorem ipsum dolor sit amet</h1>
            <p class="hero__subtitle" aria-roledescription="subtitle">Mauris consectetur varius ullamcorper. Aliquam erat volutpat.</p>
        </hgroup>
        <div class="hero__body push-top">
            <a href="#" class="btn" aria-label="Read more about Lorem ipsum dolor sit amet">Read more</a>
        </div>
    </section>
</Fragment>;

export default Hero;

