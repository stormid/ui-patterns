import { h } from 'preact';

const Code = () => <div class="expandable-search__container">
    <button class="expandable-search__btn js-expandable-search__btn" aria-label="Show or hide site search">
        <svg class="expandable-search__btn-icon" focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#fff"><path d="M0 0h24v24H0z" fill="none"/><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
    </button>
    <div class="expandable-search js-expandable-search" id="expandable-search" data-toggle="js-expandable-search__btn">
        <form class="expandable-search__form" action="#">
            <label class="expandable-search__label" for="q">Your search</label>
            <input class="expandable-search__input" type="search" id="q" name="q" />
            <button class="expandable-search__submit">search</button>
        </form>
    </div>
</div>;

export default Code;