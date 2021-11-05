import { h } from 'preact';

const Code = () => <nav aria-label={'Primary navigation'}>
    <button class="modal-nav__btn js-modal-nav__toggle" aria-label="Show or hide navigation menu" aria-controls="modal--nav" aria-expanded="false">
        <svg focusable="false" class="modal-nav__btn-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
        </svg>
        menu
    </button>
    <div id="modal-navigation" class="js-modal-nav modal-nav__modal-container" data-modal-toggle="js-modal-nav__toggle" hidden>
        <div class="modal" role="dialog" aria-label="Navigation">
            <ul class="modal-nav__list">
                <li class="modal-nav__item">
                    <a class={`modal-nav__link`} href={'#'} >Item 1</a>
                </li>
                <li class="modal-nav__item">
                    <a  class={`modal-nav__link is--active`} href={'#'} aria-current={'page'}>Item 2</a>
                </li>
                <li class="modal-nav__item">
                    <a class={`modal-nav__link`} href={'#'} >Item 3</a>
                </li>
                <li class="modal-nav__item">
                    <a class={`modal-nav__link`} href={'#'} >Item 4</a>
                </li>
                <li class="modal-nav__item">
                    <a class={`modal-nav__link`} href={'#'} >Item 5</a>
                </li>
            </ul>
            <button class="modal__close js-modal-nav__toggle" aria-label="Close navigation">
                <svg class="modal__close-icon" focusable="false" aria-hidden="true" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
            </button>
        </div>
    </div>
</nav>;

export default Code;