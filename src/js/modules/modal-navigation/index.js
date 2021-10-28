import modal from '@stormid/modal';
import { MODAL } from '../../constants';

export default () => {
    if (document.querySelector(MODAL.SELECTOR.MODAL_NAVIGATION)) {
        return modal(MODAL.SELECTOR.MODAL_NAVIGATION);
    }
};