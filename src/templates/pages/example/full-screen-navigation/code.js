import { h } from 'preact';

const Code = () => <nav aria-label={'Primary navigation'}>
    <button type="button" class="full-screen-nav__btn js-full-screen-nav__toggle" aria-label="Open menu" aria-controls="full-screen-navigation" aria-expanded="false">
        <svg focusable="false" class="full-screen-nav__btn-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
        </svg>
        menu
    </button>
    <div id="full-screen-navigation" class="js-full-screen-nav full-screen-nav" data-toggle="js-full-screen-nav__toggle">
        <ul class="wrap full-screen-nav__list">
            <li class="full-screen-nav__item">
                <a class={`full-screen-nav__link`} href={'#'} >Item 1</a>
            </li>
            <li class="full-screen-nav__item">
                <a  class={`full-screen-nav__link is--active`} href={'#'} aria-current={'page'}>Item 2</a>
            </li>
            <li class="full-screen-nav__item">
                <a class={`full-screen-nav__link`} href={'#'} >Item 3</a>
            </li>
            <li class="full-screen-nav__item">
                <a class={`full-screen-nav__link`} href={'#'} >Item 4</a>
            </li>
            <li class="full-screen-nav__item">
                <a class={`full-screen-nav__link`} href={'#'} >Item 5</a>
            </li>
        </ul>
        <button type="button" class="full-screen-navigation__close js-full-screen-nav__toggle" aria-label="Close menu">
            close
        </button>
    </div>
</nav>;

export default Code;