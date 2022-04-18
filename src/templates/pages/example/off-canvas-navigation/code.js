import { h } from 'preact';

const Code = () => <nav class="off-canvas-nav__nav" aria-label={'Primary navigation'}>
    <button class="off-canvas-nav__btn js-off-canvas-nav__toggle" aria-label="Show or hide navigation menu" aria-controls="off-canvas-nav" aria-expanded="false">
        <svg focusable="false" class="off-canvas-nav__btn-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
        </svg>
        menu
    </button>
    <div id="off-canvas-nav" class="off-canvas-nav__display-wrap js-off-canvas-nav" data-toggle="js-off-canvas-nav__toggle">
        <ul class="off-canvas-nav__list">
            <li class="off-canvas-nav__item">
                <a class={`off-canvas-nav__link`} href={'#'} >Item 1</a>
            </li>
            <li class="off-canvas-nav__item">
                <a  class={`off-canvas-nav__link is--active`} href={'#'} aria-current={'page'}>Item 2</a>
            </li>
            <li class="off-canvas-nav__item">
                <a class={`off-canvas-nav__link`} href={'#'} >Item 3</a>
            </li>
            <li class="off-canvas-nav__item">
                <a class={`off-canvas-nav__link`} href={'#'} >Item 4</a>
            </li>
            <li class="off-canvas-nav__item">
                <a class={`off-canvas-nav__link`} href={'#'} >Item 5</a>
            </li>
        </ul>
    </div>
</nav>;

export default Code;