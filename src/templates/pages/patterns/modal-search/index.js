import { h } from 'preact';
import PatternLayout from '@layouts/pattern';

export const title = 'Modal search';

const ModalSearch = () => <PatternLayout>
    <h1 class="push-bottom--half plus-2 medium">Modal search</h1>
    <p class="push-bottom">Show and hide a modal search form.</p>
    <h2 class="push-bottom--half plus-1 medium">Guidance</h2>
    <p class="push-bottom">Use this pattern for search forms that should capture focus, take over the whole screen and prevent interaction with the rest of the page until they are closed.</p>
    <h2 class="push-bottom--half plus-1 medium">Example</h2>
    <iframe style="--height: 375px" class="example" title="Example modal search navigation" src={'/example/modal-search'}></iframe>
    <p class="push-bottom align-right"><a href="/example/modal-search" target="_blank">Open in a new tab</a></p>
    <h2 class="push-bottom--half plus-1 medium">Code</h2>
    <pre class="pre"><code class="code">{`<button class="modal-search__btn js-modal-search__btn" aria-label="Show or hide search form">
    <svg class="modal-search__btn-icon" focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" ><path d="M0 0h24v24H0z" fill="none"/><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
    search
</button>
<div id="modal-search" class="js-modal-search modal-container" data-modal-toggle="js-modal-search__btn">
    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <h2 id="modal-title" class="modal__title">Search this site</h2>
        <form class="modal__form" action="#">
            <label class="modal__label" for="q">Your search</label>
            <input class="modal__input" type="text" id="q" name="q" />
            <button class="modal__search-btn">search</button>
        </form>
        <button class="modal__close js-modal-search__btn" aria-label="Close search">
            <svg focusable="false" aria-hidden="true" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
        </button>
    </div>
</div>`}</code></pre>
    <pre class="pre"><code class="code">{`import modal from '@stormid/modal';

modal('.js-modal-search');
`}</code></pre>   
    <h2 class="push-bottom--half plus-1 medium">Acceptance criteria</h2>
    <ul class="list list--tick push-bottom">
        <li class="list-item">Use a button element for the modal trigger</li>
        <li class="list-item">Trigger button should be focusable</li>
        <li class="list-item">Trigger button focus style should be visible</li>
        <li class="list-item">Trigger button should be appropriately labelled</li>
        <li class="list-item">Trigger button should be keyboard operable</li>
        <li class="list-item">Buttons should be no less than 44px x 44px</li>
        <li class="list-item">Modal should have a role of dialog that contains all elements of the modal</li>
        <li class="list-item">Modal should be hidden visually and from accessibility tree when closed</li>
        <li class="list-item">Modal should be visible and in accessibility tree when open</li>
        <li class="list-item">Modal should be labelled with either an aria-label or an aria-labelledby that points to a visible title</li>
        <li class="list-item">An element within modal should be given focus when open</li>
        <li class="list-item">Modal should either have an aria-modal attribute or the background (rest of the page) must get an aria-hidden attribute when the modal is open</li>
        <li class="list-item">Modal must trap tab when open</li>
        <li class="list-item">Tab sequence in the modal should include a visible button that closes the dialog</li>
        <li class="list-item">Escape button should close the modal</li>
        <li class="list-item">Focus must return to the trigger button when closed</li>
    </ul>
    <h2 class="push-bottom--half plus-1 medium">References</h2>
    <ul class="list push-bottom">
        <li class="list-item"><a href="https://www.w3.org/TR/wai-aria-practices-1.1/#dialog_modal" rel="noopener nofollow">https://www.w3.org/TR/wai-aria-practices-1.1/#dialog_modal</a></li>
        <li class="list-item"><a href="https://w3c.github.io/aria-practices/examples/dialog-modal/dialog.html" rel="noopener nofollow">https://w3c.github.io/aria-practices/examples/dialog-modal/dialog.html</a></li>
    </ul>
</PatternLayout>;

export default ModalSearch;