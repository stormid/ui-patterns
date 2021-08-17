import { h, Fragment } from 'preact';

const Code = () => <Fragment>
    <button class="modal-confirmation__btn js-modal-confirmation__btn">Delete</button>
    <div id="modal-confirmation" class="js-modal-confirmation modal-confirmation modal-container" data-modal-toggle="js-modal-confirmation__btn">
        <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-label">
            <h1 class="modal-confirmation__title" id="modal-label">Are you sure?</h1>
            <form class="modal__form modal-confirmation__form" action="#">
                <p>This will permanently remove this item</p>
                <div class="modal-confirmation__row">
                    <button class="modal-confirmation__confirm">Delete</button>
                    <button class="modal-confirmation__cancel js-modal-confirmation__btn">Cancel</button>
                </div>
            </form>
        </div>
    </div>
</Fragment>;

export default Code;