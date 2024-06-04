import { h, Fragment } from 'preact';

const Card = ({ i }) => <div class="slider__card">
    <svg class="slider__card-img" xmlns="http://www.w3.org/2000/svg" width="724" height="407" viewBox="0 0 724 407">
        <rect fill="#ddd" width="724" height="407" />
        <text fill="rgba(0,0,0,0.5)" font-family="sans-serif" font-size="30" dy="10.5" font-weight="bold" x="50%" y="50%" text-anchor="middle">Slide {i}</text>
    </svg>
    <div class="slider__card-bd">
        <a class="slider__link" href="#">Slide {i}</a>
    </div>
</div>;

const Code = () => <Fragment>
<div class="swiper js-slider">
    <hgroup>
        <h2 class="slider__heading">Slider</h2>
        <p>A list of items that you might wish to browse through.</p>
    </hgroup>
    <div class="slider__navigation">
        <button type="button" class="swiper-button-prev">
            <svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#5f6368"><path d="M400-240 160-480l241-241 43 42-169 169h526v60H275l168 168-43 42Z" /></svg>
        </button>
        <button type="button" class="swiper-button-next">
            <svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#5f6368"><path d="m560-242-43-42 168-168H160v-60h525L516-681l43-42 241 241-240 240Z" /></svg>
        </button>
    </div>
    <div class="swiper-wrapper">
        <div class="swiper-slide">
            <Card i={1} />
        </div>
        <div class="swiper-slide">
            <Card i={2} />
        </div>
        <div class="swiper-slide">
            <Card i={3} />
        </div>
        <div class="swiper-slide">
            <Card i={4} />
        </div>
        <div class="swiper-slide">
            <Card i={5} />
        </div>
        <div class="swiper-slide">
            <Card i={6} />
        </div>
        <div class="swiper-slide">
            <Card i={7} />
        </div>
    </div>
</div>
</Fragment>;

export default Code;