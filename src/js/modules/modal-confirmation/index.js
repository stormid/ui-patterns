import modal from '@stormid/modal';
import { MODAL } from '../../constants';

export default () => {
    if (document.querySelector(MODAL.SELECTOR.MODAL_CONFIRMATION)) {
        return modal(MODAL.SELECTOR.MODAL_CONFIRMATION);
    }
};