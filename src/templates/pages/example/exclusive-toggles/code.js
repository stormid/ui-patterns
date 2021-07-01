import { h, Fragment } from 'preact';

export const OffCanvasNav = () => <nav aria-label={'Primary navigation'}>
    <button class="off-canvas-nav__btn js-exclusive-nav__toggle" aria-label="Show or hide navigation menu" aria-controls="off-canvas-nav" aria-expanded="false">
        <svg focusable="false" class="off-canvas-nav__btn-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
        </svg>
    </button>
    <ul id="off-canvas-nav" class="off-canvas-nav__list js-exclusive-nav" data-toggle="js-exclusive-nav__toggle">
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
</nav>;

export const OffCanvasSearch = () => <div class="off-canvas-search__container">
    <button class="off-canvas-search__btn js-exclusive-search__btn" aria-label="Show or hide site search">
        <svg class="off-canvas-search__btn-icon" focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#fff"><path d="M0 0h24v24H0z" fill="none"/><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
    </button>
    <div class="off-canvas-search js-exclusive-search" id="off-canvas-search" data-toggle="js-exclusive-search__btn">
        <form class="off-canvas-search__form" action="#">
            <label class="off-canvas-search__label" for="q">Your search</label>
            <input class="off-canvas-search__input" type="search" id="q" name="q" />
            <button class="off-canvas-search__submit">search</button>
        </form>
    </div>
</div>;

export default () => <Fragment>
    <OffCanvasSearch />
    <OffCanvasNav />
</Fragment>