import { h } from 'preact';
import ExampleLayout from '@layouts/example';

export const title = 'Modal navigation > pseudo modal';

const ModalNavigation = () => <ExampleLayout>
    <header class="modal-nav__container">
        <div class="modal-nav">
            <nav aria-label={'Primary navigation'}>
                <button class="modal-nav__btn modal-fishy-nav__btn js-modal-fishy-nav__toggle" aria-label="Show or hide navigation menu" aria-controls="modal-fishy-nav" aria-expanded="false">
                    <svg focusable="false" class="modal-nav__btn-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
                    </svg>
                    menu
                </button>
                <div id="modal-fishy-nav" class="modal-fishy-nav__container js-modal-fishy-nav" data-toggle="js-modal-fishy-nav__toggle">
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
                    <button class="modal__close modal-fishy-nav__btn js-modal-fishy-nav__toggle" aria-label="Close navigation">
                        Close
                    </button>
                </div>  
            </nav>
        </div>
    </header>
    <main tabindex="0" aria-label="Next focusable item on the page">

    </main>
</ExampleLayout>;

export default ModalNavigation;