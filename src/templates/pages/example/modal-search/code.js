import { h, Fragment } from 'preact';

const Code = () => <Fragment>
    <button type="button" class="modal-search__btn js-modal-search__btn" aria-label="Show or hide site search">
        <svg class="modal-search__btn-icon" focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#fff"><path d="M0 0h24v24H0z" fill="none"/><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
        search
    </button>
    <div id="modal-search" class="js-modal-search modal-container" data-modal-toggle="js-modal-search__btn" hidden>
        <div class="modal" role="dialog" aria-labelledby="modal-title">
            <h2 id="modal-title" class="modal__title">Search this site</h2>
            <form class="modal__form" action="#" role="search">
                <label class="modal__label" for="q">Your search</label>
                <input class="modal__input" type="search" id="q" name="q" />
                <button class="modal__search-btn">search</button>
            </form>
            <button type="button" class="modal__close js-modal-search__btn" aria-label="Close search">
                <svg class="modal__close-icon" focusable="false" aria-hidden="true" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
            </button>
        </div>
    </div>
</Fragment>;

export default Code;